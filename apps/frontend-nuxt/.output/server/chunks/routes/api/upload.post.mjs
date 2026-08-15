import { c as defineEventHandler, k as readMultipartFormData, e as createError } from '../../_/nitro.mjs';
import { s as serverConfig } from '../../_/config.mjs';
import fs from 'fs';
import path from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const upload_post = defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }
  const filePart = parts.find((p) => p.filename && p.data);
  if (!filePart || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file payload" });
  }
  const uploadDir = serverConfig.uploadDir;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const safeFilename = path.basename(filePart.filename);
  const targetPath = path.join(uploadDir, safeFilename);
  fs.writeFileSync(targetPath, filePart.data);
  return {
    success: true,
    message: "File uploaded successfully",
    filename: safeFilename
  };
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
