import { getMangaDexDetail } from '../../../utils/manga/online'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = typeof query.id === 'string' ? query.id : ''
  const lang = typeof query.lang === 'string' ? query.lang : 'id'

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manga wajib diisi' })
  }

  try {
    const detail = await getMangaDexDetail(id, lang)
    if (!detail) {
      throw createError({ statusCode: 404, statusMessage: 'Manga online tidak ditemukan' })
    }

    return {
      success: true,
      data: detail
    }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Gagal memuat detail manga online'
    })
  }
})
