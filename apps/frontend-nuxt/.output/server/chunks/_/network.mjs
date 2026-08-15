import os from 'os';

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let fallbackIp = "localhost";
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (!iface) continue;
    for (const addr of iface) {
      if (addr.family === "IPv4" && !addr.internal) {
        if (addr.address.startsWith("192.168.") || addr.address.startsWith("10.") || !fallbackIp) {
          return addr.address;
        }
        fallbackIp = addr.address;
      }
    }
  }
  return fallbackIp;
}

export { getLocalIP as g };
//# sourceMappingURL=network.mjs.map
