import { c as defineEventHandler, g as getRouterParam, l as getQuery } from '../../../../../_/nitro.mjs';
import { c as getVideosByFolder } from '../../../../../_/video.mjs';
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

const videos_get = defineEventHandler(async (event) => {
  const folderName = getRouterParam(event, "folder") || "";
  const query = getQuery(event);
  const categoryId = typeof query.categoryId === "string" ? query.categoryId : "";
  return await getVideosByFolder(categoryId, folderName);
});

export { videos_get as default };
//# sourceMappingURL=videos.get.mjs.map
