import { c as defineEventHandler } from '../../_/nitro.mjs';
import { g as getLocalIP } from '../../_/network.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'os';

const info_get = defineEventHandler(() => {
  const ip = getLocalIP();
  return {
    success: true,
    ip,
    status: "online"
  };
});

export { info_get as default };
//# sourceMappingURL=info.get.mjs.map
