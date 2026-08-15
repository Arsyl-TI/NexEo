import { c as defineEventHandler } from '../../_/nitro.mjs';
import { l as listLocalNovels } from '../../_/novel.mjs';
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
import '../../_/config.mjs';

const index_get = defineEventHandler(() => {
  const novels = listLocalNovels();
  return { success: true, data: novels };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
