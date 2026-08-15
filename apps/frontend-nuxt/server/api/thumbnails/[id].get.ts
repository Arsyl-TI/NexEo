import fs from 'fs'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Thumbnail ID is required' })
  }

  const video = await getVideoById(id)
  if (video && video.path) {
    const thumbnailPath = await getOrGenerateThumbnail(video.path)
    if (thumbnailPath && fs.existsSync(thumbnailPath)) {
      setHeader(event, 'Content-Type', 'image/jpeg')
      setHeader(event, 'Cache-Control', 'public, max-age=86400')
      return sendStream(event, fs.createReadStream(thumbnailPath))
    }
  }

  // Fallback to SVG placeholder
  setHeader(event, 'Content-Type', 'image/svg+xml')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="#111827">
    <rect width="640" height="360" fill="#1f2937"/>
    <circle cx="320" cy="180" r="48" fill="#7c3aed" opacity="0.8"/>
    <polygon points="308,160 340,180 308,200" fill="#ffffff"/>
  </svg>`
})
