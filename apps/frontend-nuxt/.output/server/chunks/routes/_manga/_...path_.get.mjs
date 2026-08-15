import { c as defineEventHandler, e as createError, j as setResponseHeader } from '../../_/nitro.mjs';
import fs from 'fs';
import path from 'path';
import { c as getMangaDir } from '../../_/manga.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../../_/config.mjs';

const ____path__get = defineEventHandler((event) => {
  var _a;
  const relPath = (_a = event.context.params) == null ? void 0 : _a.path;
  if (!relPath) {
    throw createError({ statusCode: 404, statusMessage: "Path image not specified" });
  }
  const mangaDir = getMangaDir();
  const filePath = path.join(mangaDir, ...relPath.split("/"));
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: "Manga page image file not found" });
  }
  const ext = path.extname(filePath).toLowerCase();
  let contentType = "image/jpeg";
  if (ext === ".png") contentType = "image/png";
  else if (ext === ".webp") contentType = "image/webp";
  else if (ext === ".gif") contentType = "image/gif";
  setResponseHeader(event, "Content-Type", contentType);
  setResponseHeader(event, "Cache-Control", "public, max-age=86400");
  return fs.createReadStream(filePath);
});

export { ____path__get as default };
//# sourceMappingURL=_...path_.get.mjs.map
