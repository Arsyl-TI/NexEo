export default defineEventHandler(() => {
  invalidateVideoCache()
  return { success: true, message: 'Video cache refreshed' }
})
