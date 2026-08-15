import fs from 'fs'
import path from 'path'
import { serverConfig } from '../../../utils/config'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'slug novel wajib diisi' })
  }

  const novelDir = path.join(serverConfig.novel.dir, slug)
  if (!fs.existsSync(novelDir)) {
    throw createError({ statusCode: 404, statusMessage: 'Folder novel tidak ditemukan' })
  }

  // Load Meta JSON if exists
  let meta: any = { title: slug, author: '', description: '' }
  const metaPath = path.join(novelDir, 'meta.json')
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
    } catch {}
  }

  // Find all .txt files
  const files = fs.readdirSync(novelDir)
  const txtFiles = files.filter(f => f.toLowerCase().endsWith('.txt')).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0', 10)
    const numB = parseInt(b.replace(/\D/g, '') || '0', 10)
    return numA - numB
  })

  if (txtFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada berkas chapter dalam novel ini' })
  }

  let fullContent = `==================================================\n`
  fullContent += `JUDUL: ${meta.title || slug}\n`
  if (meta.author) fullContent += `AUTHOR: ${meta.author}\n`
  if (meta.description) fullContent += `SINOPSIS: ${meta.description.replace(/<[^>]*>?/gm, '')}\n`
  fullContent += `TOTAL CHAPTER: ${txtFiles.length}\n`
  fullContent += `DIEKSPOR DARI: NexEo Local App\n`
  fullContent += `==================================================\n\n\n`

  txtFiles.forEach((fileName, index) => {
    const filePath = path.join(novelDir, fileName)
    const chapterText = fs.readFileSync(filePath, 'utf-8')
    fullContent += `--------------------------------------------------\n`
    fullContent += `CHAPTER ${index + 1}: ${fileName.replace(/\.txt$/i, '')}\n`
    fullContent += `--------------------------------------------------\n\n`
    fullContent += chapterText + `\n\n\n`
  })

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setResponseHeader(event, 'Content-Disposition', `attachment; filename="${encodeURIComponent(slug)}-full.txt"`)

  return fullContent
})
