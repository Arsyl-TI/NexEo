import { c as defineEventHandler } from '../../_/nitro.mjs';
import { g as getVideoCategories } from '../../_/video.mjs';
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
import '../../_/config.mjs';

const categories_get = defineEventHandler(async () => {
  return await getVideoCategories();
});

export { categories_get as default };
//# sourceMappingURL=categories.get.mjs.map
