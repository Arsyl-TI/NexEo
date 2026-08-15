import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../../../_/nitro.mjs';
import { a as getMangaChapterPages } from '../../../../../_/manga.mjs';
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

const _chapter__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const chapter = getRouterParam(event, "chapter");
  if (!slug || !chapter) {
    throw createError({ statusCode: 400, statusMessage: "slug and chapter parameters are required" });
  }
  const pages = getMangaChapterPages(slug, chapter);
  return {
    success: true,
    data: pages
  };
});

export { _chapter__get as default };
//# sourceMappingURL=_chapter_.get.mjs.map
