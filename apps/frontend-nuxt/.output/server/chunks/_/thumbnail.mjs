import fs from 'fs';
import path from 'path';
import require$$1 from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { s as serverConfig } from './config.mjs';

const hasFfmpegBinary = typeof ffmpegStatic === "string" && fs.existsSync(ffmpegStatic);
if (hasFfmpegBinary && ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}
async function getOrGenerateThumbnail(videoPath) {
  try {
    if (!fs.existsSync(videoPath)) return null;
    if (!hasFfmpegBinary) {
      return null;
    }
    const thumbnailDir = serverConfig.video.thumbnailDir;
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }
    const hash = require$$1.createHash("md5").update(videoPath).digest("hex");
    const thumbnailFileName = `${hash}.jpg`;
    const thumbnailPath = path.join(thumbnailDir, thumbnailFileName);
    if (fs.existsSync(thumbnailPath)) {
      return thumbnailPath;
    }
    const success = await new Promise((resolve) => {
      ffmpeg(videoPath).seekInput(3).frames(1).output(thumbnailPath).size("640x360").on("end", () => resolve(true)).on("error", (err) => {
        ffmpeg(videoPath).frames(1).output(thumbnailPath).size("640x360").on("end", () => resolve(true)).on("error", (retryErr) => {
          console.error("Thumbnail extraction error:", retryErr);
          resolve(false);
        }).run();
      }).run();
    });
    if (success && fs.existsSync(thumbnailPath)) {
      return thumbnailPath;
    }
  } catch (err) {
    console.error("getOrGenerateThumbnail error:", err);
  }
  return null;
}

export { getOrGenerateThumbnail as g };
//# sourceMappingURL=thumbnail.mjs.map
