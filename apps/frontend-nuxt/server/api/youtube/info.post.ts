export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { url } = body || {}

  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'URL YouTube wajib diisi' })
  }

  try {
    const meta = await getYoutubeMetadata(url)
    return { success: true, data: meta }
  } catch (err: any) {
    throw createError({ statusCode: 400, statusMessage: err?.message || 'Gagal mengambil informasi video YouTube' })
  }
})
