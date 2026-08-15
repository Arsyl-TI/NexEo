import { c as defineEventHandler } from '../../../_/nitro.mjs';
import { l as listLocalManga } from '../../../_/manga.mjs';
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

const library_get = defineEventHandler(async () => {
  const mangaList = listLocalManga();
  return {
    success: true,
    data: mangaList
  };
});

export { library_get as default };
//# sourceMappingURL=library.get.mjs.map
