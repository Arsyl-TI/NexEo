export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  // Check if it's asking for static files
  if (slug === 'library') {
    const novels = listLocalNovels()
    return { success: true, data: novels }
  }

  const novel = getLocalNovel(slug)
  if (!novel) {
    throw createError({ statusCode: 404, statusMessage: 'Novel not found' })
  }
  return { success: true, data: novel }
})
