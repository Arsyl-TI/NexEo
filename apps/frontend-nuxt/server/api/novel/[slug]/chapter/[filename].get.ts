export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const filename = getRouterParam(event, 'filename')
  if (!slug || !filename) {
    throw createError({ statusCode: 400, statusMessage: 'Slug and filename are required' })
  }
  const content = getLocalChapterContent(slug, filename)
  if (!content) {
    throw createError({ statusCode: 404, statusMessage: 'Chapter content not found' })
  }
  return { success: true, data: content }
})
