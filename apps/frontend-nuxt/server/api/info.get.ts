export default defineEventHandler(() => {
  const ip = getLocalIP()
  return {
    success: true,
    ip,
    status: 'online'
  }
})
