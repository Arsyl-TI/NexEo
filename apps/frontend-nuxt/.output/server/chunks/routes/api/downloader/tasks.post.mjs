import { c as defineEventHandler, r as readBody, e as createError, i as setResponseStatus } from '../../../_/nitro.mjs';
import { c as createDownloadTask } from '../../../_/downloader.mjs';
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
import '../../../_/config.mjs';

const tasks_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, source, targetFolder } = body || {};
  if (!title || !source || !source.url) {
    throw createError({ statusCode: 400, statusMessage: "Title and valid source URL are required" });
  }
  const task = createDownloadTask(title, source, targetFolder || "uploads");
  setResponseStatus(event, 201);
  return { success: true, data: task };
});

export { tasks_post as default };
//# sourceMappingURL=tasks.post.mjs.map
