import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { s as serverConfig } from './config.mjs';

const QUEUE_FILE = path.join(process.cwd(), "data", "downloader_queue.json");
const activeCancelTokens = /* @__PURE__ */ new Map();
let isProcessingQueue = false;
function ensureQueueFileExists() {
  const dir = path.dirname(QUEUE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(QUEUE_FILE)) {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify([], null, 2));
  }
}
function loadTasksFromFile() {
  ensureQueueFileExists();
  const map = /* @__PURE__ */ new Map();
  try {
    const raw = fs.readFileSync(QUEUE_FILE, "utf-8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      list.forEach((t) => {
        if (t.status === "downloading") t.status = "pending";
        map.set(t.id, t);
      });
    }
  } catch {
  }
  return map;
}
const tasksMap = loadTasksFromFile();
function saveTasksToFile() {
  ensureQueueFileExists();
  try {
    const list = Array.from(tasksMap.values());
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("Failed to save downloader queue to file:", err);
  }
}
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
function getDownloadTasks() {
  return Array.from(tasksMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
function createDownloadTask(title, source, targetFolder = "uploads") {
  const id = Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64url");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const task = {
    id,
    title,
    source,
    status: "pending",
    progress: 0,
    targetFolder,
    createdAt: now,
    updatedAt: now
  };
  tasksMap.set(id, task);
  saveTasksToFile();
  void processQueue();
  return task;
}
function cancelDownloadTask(id) {
  const task = tasksMap.get(id);
  if (!task) return false;
  const cancelToken = activeCancelTokens.get(id);
  if (cancelToken) {
    cancelToken.cancel("Download task cancelled by user");
    activeCancelTokens.delete(id);
  }
  task.status = "cancelled";
  task.speedFormatted = void 0;
  task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  tasksMap.set(id, task);
  saveTasksToFile();
  return true;
}
function deleteDownloadTask(id) {
  cancelDownloadTask(id);
  const deleted = tasksMap.delete(id);
  if (deleted) saveTasksToFile();
  return deleted;
}
async function processQueue() {
  if (isProcessingQueue) return;
  isProcessingQueue = true;
  try {
    const pendingTask = Array.from(tasksMap.values()).find((t) => t.status === "pending");
    if (!pendingTask) {
      isProcessingQueue = false;
      return;
    }
    await runSingleDownload(pendingTask);
  } catch (err) {
    console.error("[DownloaderEngine] Queue processing error:", err);
  } finally {
    isProcessingQueue = false;
    const nextPending = Array.from(tasksMap.values()).find((t) => t.status === "pending");
    if (nextPending) void processQueue();
  }
}
async function runSingleDownload(task) {
  var _a;
  if (task.source.type === "youtube") {
    return;
  }
  task.status = "downloading";
  task.progress = 0;
  task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  saveTasksToFile();
  const cancelSource = axios.CancelToken.source();
  activeCancelTokens.set(task.id, cancelSource);
  let destDir = serverConfig.uploadDir;
  if (task.targetFolder === "novels") {
    destDir = serverConfig.novel.dir;
  } else if (task.targetFolder === "video" || task.targetFolder === "youtube" || task.targetFolder === "anime") {
    const catFound = serverConfig.video.categories.find((c) => c.id === task.targetFolder);
    destDir = (catFound == null ? void 0 : catFound.path) || ((_a = serverConfig.video.categories[0]) == null ? void 0 : _a.path) || serverConfig.uploadDir;
  }
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const rawUrl = task.source.url;
  let filename = path.basename(new URL(rawUrl).pathname);
  if (!filename || filename === "/" || !filename.includes(".")) {
    const ext = task.source.type === "video" ? ".mp4" : task.source.type === "novel" ? ".epub" : ".bin";
    filename = `${task.title.replace(/[^a-zA-Z0-9_-]/g, "_")}${ext}`;
  }
  const destPath = path.join(destDir, filename);
  try {
    const response = await axios({
      method: "GET",
      url: task.source.url,
      responseType: "stream",
      cancelToken: cancelSource.token,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 6e4
    });
    const rawLen = response.headers["content-length"];
    const totalBytes = parseInt(String(rawLen || "0"), 10);
    task.totalBytes = totalBytes > 0 ? totalBytes : void 0;
    let downloadedBytes = 0;
    let lastTime = Date.now();
    let lastBytes = 0;
    const writer = fs.createWriteStream(destPath);
    response.data.on("data", (chunk) => {
      downloadedBytes += chunk.length;
      task.downloadedBytes = downloadedBytes;
      if (totalBytes > 0) {
        task.progress = Math.min(100, Math.round(downloadedBytes / totalBytes * 100));
      }
      const now = Date.now();
      const timeDiff = (now - lastTime) / 1e3;
      if (timeDiff >= 0.5) {
        const bytesDiff = downloadedBytes - lastBytes;
        const bytesPerSec = bytesDiff / timeDiff;
        task.speedFormatted = `${formatBytes(bytesPerSec)}`;
        lastTime = now;
        lastBytes = downloadedBytes;
        saveTasksToFile();
      }
    });
    await new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(true));
      writer.on("error", (err) => reject(err));
      response.data.on("error", (err) => reject(err));
    });
    task.status = "completed";
    task.progress = 100;
    task.speedFormatted = void 0;
    task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    activeCancelTokens.delete(task.id);
    saveTasksToFile();
  } catch (err) {
    activeCancelTokens.delete(task.id);
    if (axios.isCancel(err)) {
      task.status = "cancelled";
    } else {
      task.status = "failed";
      task.error = (err == null ? void 0 : err.message) || "Download failed";
    }
    task.speedFormatted = void 0;
    task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    saveTasksToFile();
    if (fs.existsSync(destPath)) {
      try {
        fs.unlinkSync(destPath);
      } catch {
      }
    }
  }
}

export { cancelDownloadTask as a, createDownloadTask as c, deleteDownloadTask as d, getDownloadTasks as g, saveTasksToFile as s };
//# sourceMappingURL=downloader.mjs.map
