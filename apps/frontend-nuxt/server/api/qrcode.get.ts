export default defineEventHandler(() => {
  const ip = getLocalIP()
  const url = `http://${ip}:3000`
  return {
    success: true,
    url,
    ip
  }
})
