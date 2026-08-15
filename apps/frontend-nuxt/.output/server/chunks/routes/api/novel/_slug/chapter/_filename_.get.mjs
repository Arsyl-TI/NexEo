import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../../../_/nitro.mjs';
import { a as getLocalChapterContent } from '../../../../../_/novel.mjs';
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

const _filename__get = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  const filename = getRouterParam(event, "filename");
  if (!slug || !filename) {
    throw createError({ statusCode: 400, statusMessage: "Slug and filename are required" });
  }
  const content = getLocalChapterContent(slug, filename);
  if (!content) {
    throw createError({ statusCode: 404, statusMessage: "Chapter content not found" });
  }
  return { success: true, data: content };
});

export { _filename__get as default };
//# sourceMappingURL=_filename_.get.mjs.map
