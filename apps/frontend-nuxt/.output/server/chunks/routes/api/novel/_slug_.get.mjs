import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { g as getLocalNovel } from '../../../_/novel.mjs';
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

const _slug__get = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required" });
  }
  const novel = getLocalNovel(slug);
  if (!novel) {
    throw createError({ statusCode: 404, statusMessage: "Novel not found" });
  }
  return { success: true, data: novel };
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
