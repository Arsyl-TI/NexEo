import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../../_/nitro.mjs';
import { d as deleteDownloadTask } from '../../../../_/downloader.mjs';
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
import '../../../../_/config.mjs';

const _id__delete = defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Task ID is required" });
  }
  const success = deleteDownloadTask(id);
  if (success) {
    return { success: true, message: "Task deleted" };
  } else {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
