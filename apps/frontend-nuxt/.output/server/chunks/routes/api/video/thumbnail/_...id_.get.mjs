import { c as defineEventHandler, g as getRouterParam, e as createError, f as setHeader, h as sendStream } from '../../../../_/nitro.mjs';
import { a as getVideoById } from '../../../../_/video.mjs';
import { g as getOrGenerateThumbnail } from '../../../../_/thumbnail.mjs';
import fs from 'fs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'path';
import '../../../../_/config.mjs';
import 'crypto';
import 'fluent-ffmpeg';
import 'ffmpeg-static';

const ____id__get = defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, "id");
  if (!rawId) {
    throw createError({ statusCode: 400, statusMessage: "Thumbnail ID is required" });
  }
  const id = decodeURIComponent(rawId);
  const video = await getVideoById(id);
  if (video && video.path) {
    const thumbnailPath = await getOrGenerateThumbnail(video.path);
    if (thumbnailPath && fs.existsSync(thumbnailPath)) {
      setHeader(event, "Content-Type", "image/jpeg");
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return sendStream(event, fs.createReadStream(thumbnailPath));
    }
  }
  setHeader(event, "Content-Type", "image/svg+xml");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="#111827">
    <rect width="640" height="360" fill="#1f2937"/>
    <circle cx="320" cy="180" r="48" fill="#7c3aed" opacity="0.8"/>
    <polygon points="308,160 340,180 308,200" fill="#ffffff"/>
  </svg>`;
});

export { ____id__get as default };
//# sourceMappingURL=_...id_.get.mjs.map
