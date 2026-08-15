import fs from 'fs';
import path from 'path';
import { s as serverConfig, f as formatFileSize } from './config.mjs';

function listSharedFiles() {
  const uploadDir = serverConfig.uploadDir;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const files = [];
  try {
    const entries = fs.readdirSync(uploadDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const fullPath = path.join(uploadDir, entry.name);
        const stats = fs.statSync(fullPath);
        files.push({
          name: entry.name,
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
          modified: stats.mtime.toISOString()
        });
      }
    }
  } catch (err) {
    console.error("Error reading upload dir:", err);
  }
  files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
  return files;
}
function getSharedFilePath(filename) {
  const safeFilename = path.basename(filename);
  const filePath = path.join(serverConfig.uploadDir, safeFilename);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  return null;
}
function deleteSharedFile(filename) {
  const filePath = getSharedFilePath(filename);
  if (!filePath) return false;
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (err) {
    console.error(`Failed to delete file ${filename}:`, err);
    return false;
  }
}

export { deleteSharedFile as d, getSharedFilePath as g, listSharedFiles as l };
//# sourceMappingURL=sharedFiles.mjs.map
