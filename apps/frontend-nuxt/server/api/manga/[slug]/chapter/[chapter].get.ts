import { getMangaChapterPages } from '../../../../utils/manga'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const chapter = getRouterParam(event, 'chapter')

  if (!slug || !chapter) {
    throw createError({ statusCode: 400, statusMessage: 'slug and chapter parameters are required' })
  }

  const pages = getMangaChapterPages(slug, chapter)
  return {
    success: true,
    data: pages
  }
})
