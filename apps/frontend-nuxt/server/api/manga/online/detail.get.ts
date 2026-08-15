import { getUniversalMangaDetail, type MangaProviderType } from '../../../utils/manga/online'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = typeof query.id === 'string' ? query.id : ''
  const lang = typeof query.lang === 'string' ? query.lang : 'id'
  const provider = (typeof query.provider === 'string' ? query.provider : 'mangadex') as MangaProviderType

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID manga wajib diisi' })
  }

  try {
    const detail = await getUniversalMangaDetail(id, provider, lang)
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
