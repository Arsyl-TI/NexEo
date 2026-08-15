import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import { getMangaDir } from '../../../../../utils/manga'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const chapter = getRouterParam(event, 'chapter')
  const query = getQuery(event)
  const format = (query.format as string)?.toLowerCase() === 'zip' ? 'zip' : 'cbz'

  if (!slug || !chapter) {
    throw createError({ statusCode: 400, statusMessage: 'Slug dan Chapter manga wajib diisi' })
  }

  const mangaDir = getMangaDir()
  const chapterDir = path.join(mangaDir, slug, chapter)

  if (!fs.existsSync(chapterDir)) {
    throw createError({ statusCode: 404, statusMessage: 'Folder chapter manga tidak ditemukan' })
  }

  const files = fs.readdirSync(chapterDir).filter(f => {
    const l = f.toLowerCase()
    return l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp') || l.endsWith('.gif')
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0', 10)
    const numB = parseInt(b.replace(/\D/g, '') || '0', 10)
    return numA - numB
  })

  if (files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada gambar halaman dalam chapter ini' })
  }

  const zip = new AdmZip()

  for (const file of files) {
    const filePath = path.join(chapterDir, file)
    zip.addLocalFile(filePath)
  }

  const buffer = zip.toBuffer()
  const safeFilename = `${slug}_${chapter}.${format}`

  setHeader(event, 'Content-Type', format === 'zip' ? 'application/zip' : 'application/vnd.comicbook+zip')
  setHeader(event, 'Content-Disposition', `attachment; filename="${encodeURIComponent(safeFilename)}"`)
  setHeader(event, 'Content-Length', buffer.length)

  return buffer
})
