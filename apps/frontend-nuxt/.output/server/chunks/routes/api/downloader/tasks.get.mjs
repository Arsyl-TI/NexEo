import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { g as getDownloadTasks } from '../../../_/downloader.mjs';
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

const tasks_get = defineEventHandler(() => {
  const tasks = getDownloadTasks();
  return { success: true, data: tasks };
});

export { tasks_get as default };
//# sourceMappingURL=tasks.get.mjs.map
