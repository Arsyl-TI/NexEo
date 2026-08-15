import { getLocalMangaChapters } from '../../../utils/manga'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const chapters = getLocalMangaChapters(slug)
  return {
    success: true,
    data: chapters
  }
})
