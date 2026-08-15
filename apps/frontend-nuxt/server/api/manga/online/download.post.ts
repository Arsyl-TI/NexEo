import { getUniversalChapterPages, downloadChapterToLocal, type MangaProviderType } from '../../../utils/manga/online'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { mangaId, mangaTitle, mangaSlug, chapterId, chapterNum, chapterTitle, coverUrl, author, description, provider } = body

  if (!chapterId || !chapterNum || !mangaSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Parameter unduhan chapter tidak lengkap' })
  }

  const selectedProvider = (provider || 'mangadex') as MangaProviderType

  try {
    // 1. Fetch Page URLs using the provider
    const pageUrls = await getUniversalChapterPages(chapterId, selectedProvider)
    if (!pageUrls || pageUrls.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Tidak dapat menemukan halaman gambar untuk chapter ini' })
    }

    // 2. Download to local disk
    const result = await downloadChapterToLocal({
      mangaTitle: mangaTitle || mangaSlug,
      mangaSlug,
      chapterNum: String(chapterNum),
      chapterTitle: chapterTitle || `Chapter ${chapterNum}`,
      coverUrl,
      author,
      description,
      pageUrls,
      provider: selectedProvider
    })

    if (!result.success) {
      throw createError({ statusCode: 500, statusMessage: result.error || 'Gagal mengunduh chapter ke disk lokal' })
    }

    return {
      success: true,
      message: `Chapter ${chapterNum} berhasil disimpan ke koleksi lokal!`,
      pageCount: pageUrls.length
    }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Gagal memproses unduhan chapter manga'
    })
  }
})
