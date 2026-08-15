import { getMangaDexChapterPages, downloadChapterToLocal } from '../../../utils/manga/online'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { mangaTitle, mangaSlug, chapterId, chapterNum, chapterTitle, coverUrl, author, description } = body

  if (!chapterId || !chapterNum || !mangaSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Parameter unduhan chapter tidak lengkap' })
  }

  try {
    // 1. Fetch Page URLs for the chapter
    const pageUrls = await getMangaDexChapterPages(chapterId)
    if (!pageUrls || pageUrls.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Tidak dapat menemukan halaman untuk chapter ini' })
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
      pageUrls
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
