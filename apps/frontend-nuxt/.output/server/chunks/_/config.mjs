import path from 'path';
import fs from 'fs';

var _a, _b;
const rootDir = (_a = process.env["NEXE_ROOT_DIR"]) != null ? _a : path.resolve(".").replace(/\\/g, "/");
const dataPath = path.join(rootDir, "data");
function resolveCategoryPath(baseDir, categoryFolderName) {
  const targetPath = path.join(baseDir, categoryFolderName);
  if (fs.existsSync(targetPath)) {
    return targetPath;
  }
  const lowerPath = path.join(baseDir, categoryFolderName.toLowerCase());
  if (fs.existsSync(lowerPath)) {
    return lowerPath;
  }
  return targetPath;
}
const baseVideoDir = (_b = process.env["VIDEO_DIR"]) != null ? _b : "D:\\Video";
const serverConfig = {
  port: process.env["NEXE_PORT"] ? Number(process.env["NEXE_PORT"]) : 3e3,
  video: {
    categories: [
      {
        id: "anime",
        name: "List Anime",
        icon: "film",
        path: resolveCategoryPath(baseVideoDir, "Anime")
      },
      {
        id: "youtube",
        name: "List YouTube",
        icon: "youtube",
        path: resolveCategoryPath(baseVideoDir, "YouTube")
      }
    ],
    supportedFormats: [".mp4", ".mkv", ".webm", ".mov", ".avi"],
    cacheTtl: 6e4,
    thumbnailDir: path.join(dataPath, "thumbnails")
  },
  novel: {
    dir: path.join(rootDir, "data", "novels"),
    thumbnailDir: path.join(rootDir, "data", "novels", "thumbnails")
  },
  uploadDir: path.join(rootDir, "uploads"),
  sharedFilesDir: path.join(rootDir, "uploads"),
  cacheDir: path.join(rootDir, "cache"),
  dataDir: dataPath
};
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export { formatFileSize as f, serverConfig as s };
//# sourceMappingURL=config.mjs.map
