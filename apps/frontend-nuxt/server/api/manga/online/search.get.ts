import { searchUniversalManga, type MangaProviderType } from '../../../utils/manga/online'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q : ''
  const lang = typeof query.lang === 'string' ? query.lang : 'id'
  const provider = (typeof query.provider === 'string' ? query.provider : 'mangadex') as MangaProviderType

  try {
    const results = await searchUniversalManga(q, provider, lang)
    return {
      success: true,
      data: results
    }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Gagal mencari manga online'
    })
  }
})
