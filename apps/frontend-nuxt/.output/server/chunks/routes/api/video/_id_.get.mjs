import { c as defineEventHandler, g as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { a as getVideoById } from '../../../_/video.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Video ID required" });
  }
  const video = await getVideoById(id);
  if (!video) {
    throw createError({ statusCode: 404, statusMessage: "Video not found" });
  }
  return video;
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
