import fs from 'fs'
import path from 'path'
import { serverConfig } from '../../utils/config'

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
}

export default defineEventHandler((event) => {
  const rawPath = getRouterParam(event, 'path')
  if (!rawPath) {
    throw createError({ statusCode: 400, statusMessage: 'Path required' })
  }

  const safePath = path.normalize(decodeURIComponent(rawPath)).replace(/^(\.\.[\/\\])+/, '')
  const fullPath = path.join(serverConfig.novel.dir, safePath)

  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    throw createError({ statusCode: 404, statusMessage: 'Novel image not found' })
  }

  const ext = path.extname(fullPath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=86400')
  return sendStream(event, fs.createReadStream(fullPath))
})
