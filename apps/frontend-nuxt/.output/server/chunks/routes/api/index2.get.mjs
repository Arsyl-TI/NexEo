import { c as defineEventHandler } from '../../_/nitro.mjs';
import { l as listSharedFiles } from '../../_/sharedFiles.mjs';
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
  return listSharedFiles();
});

export { index_get as default };
//# sourceMappingURL=index2.get.mjs.map
