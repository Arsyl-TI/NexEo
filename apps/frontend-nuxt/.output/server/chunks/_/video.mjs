import fs from 'fs';
import path from 'path';
import { s as serverConfig, f as formatFileSize } from './config.mjs';

let cachedTimestamp = 0;
let cachedResult = null;
function isCacheExpired() {
  return Date.now() - cachedTimestamp > serverConfig.video.cacheTtl;
}
function scanDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch (e) {
    return [];
  }
}
function scanVideos(dir, relativeBase, categoryId, supportedFormats) {
  const videos = [];
  try {
    if (!fs.existsSync(dir)) return [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relPath = path.relative(relativeBase, fullPath).replace(/\\/g, "/");
      const id = `${categoryId}/${relPath.toLowerCase()}`;
      if (item.isDirectory()) {
        videos.push(...scanVideos(fullPath, relativeBase, categoryId, supportedFormats));
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (supportedFormats.includes(ext)) {
          try {
            const stat = fs.statSync(fullPath);
            let description = void 0;
            let author = void 0;
            const jsonPath = fullPath.substring(0, fullPath.lastIndexOf(".")) + ".json";
            if (fs.existsSync(jsonPath)) {
              try {
                const meta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
                description = meta.description;
                author = meta.author;
              } catch {
              }
            }
            videos.push({
              id,
              title: item.name,
              path: fullPath.replace(/\\/g, "/"),
              categoryId,
              folderId: categoryId,
              folder: path.dirname(relPath).replace(/\\/g, "/"),
              name: item.name,
              size: stat.size,
              sizeFormatted: formatFileSize(stat.size),
              format: ext.toUpperCase().replace(".", ""),
              hasThumbnail: stat.size > 0,
              description,
              author
            });
          } catch (e) {
          }
        }
      }
    }
  } catch (err) {
    console.error("Scan videos error:", err);
  }
  return videos;
}
async function scan() {
  const categories = serverConfig.video.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    folder: cat.path,
    path: cat.path,
    icon: cat.icon
  }));
  const folders = [];
  const videos = [];
  const videoMap = /* @__PURE__ */ new Map();
  for (const cat of serverConfig.video.categories) {
    if (!fs.existsSync(cat.path)) continue;
    let folderVideoCount = 0;
    const categoryDirectVideos = scanVideos(cat.path, cat.path, cat.id, serverConfig.video.supportedFormats).filter((v) => !v.folder || v.folder === "." || v.folder === "Root");
    if (categoryDirectVideos.length > 0) {
      folderVideoCount += categoryDirectVideos.length;
      const firstVideo = categoryDirectVideos[0];
      folders.push({
        id: `${cat.id}/root`,
        name: "General",
        path: cat.path.replace(/\\/g, "/"),
        categoryId: cat.id,
        videoCount: categoryDirectVideos.length,
        coverId: firstVideo == null ? void 0 : firstVideo.id,
        hasCoverThumbnail: true
      });
      for (const v of categoryDirectVideos) {
        videos.push(v);
        videoMap.set(v.id, v);
      }
    }
    const subfolders = scanDirectory(cat.path);
    for (const folderName of subfolders) {
      const folderPath = path.join(cat.path, folderName);
      const folderVideos = scanVideos(folderPath, cat.path, cat.id, serverConfig.video.supportedFormats);
      folderVideoCount += folderVideos.length;
      const firstVideo = folderVideos.length > 0 ? folderVideos[0] : void 0;
      folders.push({
        id: `${cat.id}/${folderName.toLowerCase()}`,
        name: folderName,
        path: folderPath.replace(/\\/g, "/"),
        categoryId: cat.id,
        videoCount: folderVideos.length,
        coverId: firstVideo == null ? void 0 : firstVideo.id,
        hasCoverThumbnail: folderVideos.length > 0
      });
      for (const v of folderVideos) {
        videos.push(v);
        videoMap.set(v.id, v);
      }
    }
    const catIndex = categories.findIndex((c) => c.id === cat.id);
    if (catIndex >= 0) {
      const existing = categories[catIndex];
      if (existing) {
        existing.videoCount = folderVideoCount;
      }
    }
  }
  return { categories, folders, videos, videoMap };
}
async function ensureCache() {
  if (isCacheExpired() || !cachedResult) {
    cachedResult = await scan();
    cachedTimestamp = Date.now();
  }
  return cachedResult;
}
async function getVideoCategories() {
  const result = await ensureCache();
  return result.categories;
}
async function getFoldersByCategory(categoryId) {
  const result = await ensureCache();
  return result.folders.filter((f) => f.categoryId === categoryId);
}
async function getVideosByFolder(categoryId, folderName) {
  const result = await ensureCache();
  const normFolder = folderName === "Root" ? "" : folderName;
  return result.videos.filter((v) => v.categoryId === categoryId && (normFolder === "" || v.folderId === normFolder || v.folder === folderName || folderName === "General" && (!v.folder || v.folder === ".")));
}
async function getVideoById(id) {
  const result = await ensureCache();
  return result.videoMap.get(decodeURIComponent(id)) || null;
}
async function searchVideos(query) {
  const result = await ensureCache();
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return result.videos.filter((v) => {
    var _a, _b;
    const text = ((_b = (_a = v.title) != null ? _a : v.name) != null ? _b : "").toLowerCase();
    return text.includes(q);
  });
}
function invalidateVideoCache() {
  cachedTimestamp = 0;
  cachedResult = null;
}

export { getVideoById as a, getFoldersByCategory as b, getVideosByFolder as c, getVideoCategories as g, invalidateVideoCache as i, searchVideos as s };
//# sourceMappingURL=video.mjs.map
