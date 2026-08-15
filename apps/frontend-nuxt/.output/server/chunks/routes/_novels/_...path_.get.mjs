import { c as defineEventHandler, g as getRouterParam, e as createError, f as setHeader, h as sendStream } from '../../_/nitro.mjs';
import fs from 'fs';
import path from 'path';
import { s as serverConfig } from '../../_/config.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml"
};
const ____path__get = defineEventHandler((event) => {
  const rawPath = getRouterParam(event, "path");
  if (!rawPath) {
    throw createError({ statusCode: 400, statusMessage: "Path required" });
  }
  const safePath = path.normalize(decodeURIComponent(rawPath)).replace(/^(\.\.[\/\\])+/, "");
  const fullPath = path.join(serverConfig.novel.dir, safePath);
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    throw createError({ statusCode: 404, statusMessage: "Novel image not found" });
  }
  const ext = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Cache-Control", "public, max-age=86400");
  return sendStream(event, fs.createReadStream(fullPath));
});

export { ____path__get as default };
//# sourceMappingURL=_...path_.get.mjs.map
