export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { url, targetCategory, customSubfolder } = body || {}

  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'URL YouTube wajib diisi' })
  }

  try {
    const result = await startYoutubeDownload(url, targetCategory || 'youtube', customSubfolder || '')
    return { success: true, data: result }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Gagal memulai unduhan video YouTube' })
  }
})
