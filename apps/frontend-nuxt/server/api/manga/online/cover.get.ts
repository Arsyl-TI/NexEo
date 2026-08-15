import axios from 'axios'

const coverCache = new Map<string, { data: Buffer; contentType: string; expiry: number }>()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = typeof query.id === 'string' ? query.id : ''
  const file = typeof query.file === 'string' ? query.file : ''

  if (!id || !file) {
    throw createError({ statusCode: 400, statusMessage: 'Manga ID and Cover file required' })
  }

  const cacheKey = `${id}_${file}`
  const now = Date.now()
  if (coverCache.has(cacheKey)) {
    const cached = coverCache.get(cacheKey)!
    if (cached.expiry > now) {
      setHeader(event, 'Content-Type', cached.contentType)
      setHeader(event, 'Cache-Control', 'public, max-age=604800, immutable')
      return cached.data
    }
  }

  try {
    const targetUrl = `https://uploads.mangadex.org/covers/${id}/${file}.256.jpg`
    const res = await axios.get(targetUrl, {
      responseType: 'arraybuffer',
      timeout: 8000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    })

    const buffer = Buffer.from(res.data)
    const rawType = res.headers['content-type']
    const contentType = typeof rawType === 'string' ? rawType : 'image/jpeg'

    // Cache in memory for 1 hour
    coverCache.set(cacheKey, {
      data: buffer,
      contentType,
      expiry: now + 3600 * 1000
    })

    setHeader(event, 'Content-Type', contentType)
    setHeader(event, 'Cache-Control', 'public, max-age=604800, immutable')
    return buffer
  } catch (err: any) {
    // If .256.jpg fails, try fallback without .256
    try {
      const fallbackUrl = `https://uploads.mangadex.org/covers/${id}/${file}`
      const res = await axios.get(fallbackUrl, {
        responseType: 'arraybuffer',
        timeout: 8000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      })
      const buffer = Buffer.from(res.data)
      const rawType = res.headers['content-type']
      const contentType = typeof rawType === 'string' ? rawType : 'image/jpeg'
      setHeader(event, 'Content-Type', contentType)
      setHeader(event, 'Cache-Control', 'public, max-age=604800, immutable')
      return buffer
    } catch {
      throw createError({ statusCode: 404, statusMessage: 'Cover image not found' })
    }
  }
})
