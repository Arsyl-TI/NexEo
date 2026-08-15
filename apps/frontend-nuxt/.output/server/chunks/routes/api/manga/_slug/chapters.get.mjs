import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../../_/nitro.mjs';
import { b as getLocalMangaChapters } from '../../../../_/manga.mjs';
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
import '../../../../_/config.mjs';

const chapters_get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "slug is required" });
  }
  const chapters = getLocalMangaChapters(slug);
  return {
    success: true,
    data: chapters
  };
});

export { chapters_get as default };
//# sourceMappingURL=chapters.get.mjs.map
