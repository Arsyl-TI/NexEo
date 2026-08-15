import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../../../../_/nitro.mjs';
import { a as scrapeDreamyNovelDetail, s as scrapeNoveldexNovelDetail } from '../../../../../../_/catalogScraper.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const sourceId = getRouterParam(event, "source") || "";
  const slug = getRouterParam(event, "slug") || "";
  if (sourceId === "dreamy-translations") {
    return await scrapeDreamyNovelDetail(slug);
  } else if (sourceId === "noveldex") {
    return await scrapeNoveldexNovelDetail(slug);
  }
  throw createError({ statusCode: 404, statusMessage: "Novel detail scraper for this source is not supported" });
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
