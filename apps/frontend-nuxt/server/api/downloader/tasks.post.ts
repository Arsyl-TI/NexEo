export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { title, source, targetFolder } = body || {}
  if (!title || !source || !source.url) {
    throw createError({ statusCode: 400, statusMessage: 'Title and valid source URL are required' })
  }

  const task = createDownloadTask(title, source, targetFolder || 'uploads')
  setResponseStatus(event, 201)
  return { success: true, data: task }
})
