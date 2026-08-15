import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { s as startYoutubeDownload } from '../../../_/youtubeDownloader.mjs';
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

const download_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url, targetCategory, customSubfolder } = body || {};
  if (!url || typeof url !== "string") {
    throw createError({ statusCode: 400, statusMessage: "URL YouTube wajib diisi" });
  }
  try {
    const result = await startYoutubeDownload(url, targetCategory || "youtube", customSubfolder || "");
    return { success: true, data: result };
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: (err == null ? void 0 : err.message) || "Gagal memulai unduhan video YouTube" });
  }
});

export { download_post as default };
//# sourceMappingURL=download.post.mjs.map
