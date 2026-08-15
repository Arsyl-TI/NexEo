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

const qrcode_get = defineEventHandler(() => {
  const ip = getLocalIP();
  const url = `http://${ip}:3000`;
  return {
    success: true,
    url,
    ip
  };
});

export { qrcode_get as default };
//# sourceMappingURL=qrcode.get.mjs.map
