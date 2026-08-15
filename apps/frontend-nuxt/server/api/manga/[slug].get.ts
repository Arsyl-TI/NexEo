import { getLocalMangaDetail } from '../../utils/manga'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }

  const manga = getLocalMangaDetail(slug)
  if (!manga) {
    throw createError({ statusCode: 404, statusMessage: 'Manga not found' })
  }

  return {
    success: true,
    data: manga
  }
})
