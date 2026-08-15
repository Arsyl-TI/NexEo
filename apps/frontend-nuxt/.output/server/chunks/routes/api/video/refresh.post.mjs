import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { i as invalidateVideoCache } from '../../../_/video.mjs';
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

const refresh_post = defineEventHandler(() => {
  invalidateVideoCache();
  return { success: true, message: "Video cache refreshed" };
});

export { refresh_post as default };
//# sourceMappingURL=refresh.post.mjs.map
