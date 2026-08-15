export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Task ID is required' })
  }

  const success = cancelDownloadTask(id)
  if (success) {
    return { success: true, message: 'Task cancelled' }
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }
})
