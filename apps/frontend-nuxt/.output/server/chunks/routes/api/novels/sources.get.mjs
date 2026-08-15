import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { N as NOVEL_SOURCES } from '../../../_/catalogScraper.mjs';
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

const sources_get = defineEventHandler(() => {
  return NOVEL_SOURCES;
});

export { sources_get as default };
//# sourceMappingURL=sources.get.mjs.map
