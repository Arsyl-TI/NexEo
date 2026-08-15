import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { d as deleteSharedFile } from '../../../_/sharedFiles.mjs';
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
import '../../../_/config.mjs';

const _filename__delete = defineEventHandler((event) => {
  const filename = getRouterParam(event, "filename");
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: "Filename is required" });
  }
  const success = deleteSharedFile(filename);
  if (success) {
    return { success: true, message: "File deleted" };
  } else {
    throw createError({ statusCode: 404, statusMessage: "File not found or failed to delete" });
  }
});

export { _filename__delete as default };
//# sourceMappingURL=_filename_.delete.mjs.map
