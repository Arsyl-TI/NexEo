export default defineEventHandler((event) => {
  const filename = getRouterParam(event, 'filename')
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: 'Filename is required' })
  }

  const success = deleteSharedFile(filename)
  if (success) {
    return { success: true, message: 'File deleted' }
  } else {
    throw createError({ statusCode: 404, statusMessage: 'File not found or failed to delete' })
  }
})
