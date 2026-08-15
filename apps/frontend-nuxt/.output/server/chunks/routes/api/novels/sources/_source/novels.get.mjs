import { c as defineEventHandler, g as getRouterParam } from '../../../../../_/nitro.mjs';
import { g as getSourceCatalog } from '../../../../../_/catalogScraper.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'axios';
import 'cheerio';

const novels_get = defineEventHandler(async (event) => {
  const sourceId = getRouterParam(event, "source") || "";
  return await getSourceCatalog(sourceId);
});

export { novels_get as default };
//# sourceMappingURL=novels.get.mjs.map
