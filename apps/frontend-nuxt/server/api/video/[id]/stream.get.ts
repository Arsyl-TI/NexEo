import fs from 'fs'
import path from 'path'

const MIME_TYPES: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.mkv': 'video/x-matroska',
  '.webm': 'video/webm',
  '.avi': 'video/x-msvideo',
  '.mov': 'video/quicktime',
  '.wmv': 'video/x-ms-wmv',
  '.flv': 'video/x-flv',
  '.m4v': 'video/mp4',
  '.ts': 'video/mp2t',
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Video ID required' })
  }

  const video = await getVideoById(id)
  if (!video) {
    throw createError({ statusCode: 404, statusMessage: 'Video not found' })
  }

  const filePath = video.path
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'Video file not found on disk' })
  }

  const stat = fs.statSync(filePath)
  const fileSize = stat.size
  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  const range = getRequestHeader(event, 'range')

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0] ?? '0', 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
    const chunkSize = end - start + 1

    setResponseStatus(event, 206)
    setHeader(event, 'Content-Range', `bytes ${start}-${end}/${fileSize}`)
    setHeader(event, 'Accept-Ranges', 'bytes')
    setHeader(event, 'Content-Length', chunkSize)
    setHeader(event, 'Content-Type', contentType)

    return sendStream(event, fs.createReadStream(filePath, { start, end }))
  }

  setHeader(event, 'Content-Length', fileSize)
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Accept-Ranges', 'bytes')

  return sendStream(event, fs.createReadStream(filePath))
})
