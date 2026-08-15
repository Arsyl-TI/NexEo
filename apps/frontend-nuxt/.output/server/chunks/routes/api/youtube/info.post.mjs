import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { g as getYoutubeMetadata } from '../../../_/youtubeDownloader.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'fs';
import 'path';
import 'axios';
import 'child_process';
import '../../../_/config.mjs';
import '../../../_/downloader.mjs';

const info_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url } = body || {};
  if (!url || typeof url !== "string") {
    throw createError({ statusCode: 400, statusMessage: "URL YouTube wajib diisi" });
  }
  try {
    const meta = await getYoutubeMetadata(url);
    return { success: true, data: meta };
  } catch (err) {
    throw createError({ statusCode: 400, statusMessage: (err == null ? void 0 : err.message) || "Gagal mengambil informasi video YouTube" });
  }
});

export { info_post as default };
//# sourceMappingURL=info.post.mjs.map
