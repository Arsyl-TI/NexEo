import fs from 'fs'
import path from 'path'
import { getMangaDir } from '../../utils/manga'

export default defineEventHandler((event) => {
  const relPath = event.context.params?.path
  if (!relPath) {
    throw createError({ statusCode: 404, statusMessage: 'Path image not specified' })
  }

  const mangaDir = getMangaDir()
  const filePath = path.join(mangaDir, ...relPath.split('/'))

  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'Manga page image file not found' })
  }

  const ext = path.extname(filePath).toLowerCase()
  let contentType = 'image/jpeg'
  if (ext === '.png') contentType = 'image/png'
  else if (ext === '.webp') contentType = 'image/webp'
  else if (ext === '.gif') contentType = 'image/gif'

  setResponseHeader(event, 'Content-Type', contentType)
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400')

  return fs.createReadStream(filePath)
})
