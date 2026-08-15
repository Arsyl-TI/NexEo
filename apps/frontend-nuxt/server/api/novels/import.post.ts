export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { sourceId, slug, chapterFilter, translationConfig } = body || {}

  if (!sourceId || !slug) {
    throw createError({ statusCode: 400, statusMessage: 'sourceId and slug are required' })
  }

  const result = await importNovelFromSource({
    sourceId,
    slug,
    chapterFilter,
    translationConfig
  })

  return result
})
