export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }
  const chapters = getLocalChapters(slug)
  return { success: true, data: chapters }
})
