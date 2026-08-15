import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../../_/nitro.mjs';
import { b as getLocalChapters } from '../../../../_/novel.mjs';
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

const chapters_get = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required" });
  }
  const chapters = getLocalChapters(slug);
  return { success: true, data: chapters };
});

export { chapters_get as default };
//# sourceMappingURL=chapters.get.mjs.map
