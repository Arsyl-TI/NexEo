import { c as defineEventHandler, g as getRouterParam, e as createError, f as setHeader, h as sendStream } from '../../../../_/nitro.mjs';
import { g as getSharedFilePath } from '../../../../_/sharedFiles.mjs';
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

const _filename__get = defineEventHandler((event) => {
  const filename = getRouterParam(event, "filename");
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: "Filename is required" });
  }
  const filePath = getSharedFilePath(filename);
  if (!filePath) {
    throw createError({ statusCode: 404, statusMessage: "File not found" });
  }
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);
  return sendStream(event, fs.createReadStream(filePath));
});

export { _filename__get as default };
//# sourceMappingURL=_filename_.get.mjs.map
