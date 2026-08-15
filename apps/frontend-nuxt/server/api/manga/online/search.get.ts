import { searchMangaDex } from '../../../utils/manga/online'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = typeof query.q === 'string' ? query.q : ''
  const lang = typeof query.lang === 'string' ? query.lang : 'id'

  try {
    const results = await searchMangaDex(q, lang)
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
