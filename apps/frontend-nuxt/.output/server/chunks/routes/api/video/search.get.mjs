import { c as defineEventHandler, l as getQuery } from '../../../_/nitro.mjs';
import { s as searchVideos } from '../../../_/video.mjs';
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

const search_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const q = typeof query.q === "string" ? query.q : "";
  return await searchVideos(q);
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
