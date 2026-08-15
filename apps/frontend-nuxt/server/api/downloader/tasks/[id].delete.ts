export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Task ID is required' })
  }

  const success = deleteDownloadTask(id)
  if (success) {
    return { success: true, message: 'Task deleted' }
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }
})
