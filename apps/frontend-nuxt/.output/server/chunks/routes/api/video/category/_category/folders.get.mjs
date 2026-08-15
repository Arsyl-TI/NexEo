import { c as defineEventHandler, g as getRouterParam } from '../../../../../_/nitro.mjs';
import { b as getFoldersByCategory } from '../../../../../_/video.mjs';
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
import '../../../../../_/config.mjs';

const folders_get = defineEventHandler(async (event) => {
  const categoryId = getRouterParam(event, "category") || "";
  return await getFoldersByCategory(categoryId);
});

export { folders_get as default };
//# sourceMappingURL=folders.get.mjs.map
