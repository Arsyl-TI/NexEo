import fs from 'fs'
import path from 'path'
import { serverConfig } from '../../utils/config'
import { translateBatch } from '../../utils/novel/translator'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { slug, engine, geminiApiKey, deeplApiKey, libreUrl, libreApiKey } = body || {}

  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'slug novel wajib diisi' })
  }

  const novelDir = path.join(serverConfig.novel.dir, slug)
  if (!fs.existsSync(novelDir)) {
    throw createError({ statusCode: 404, statusMessage: 'Folder novel tidak ditemukan' })
  }

  const files = fs.readdirSync(novelDir)
  const txtFiles = files.filter(f => f.toLowerCase().endsWith('.txt')).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0', 10)
    const numB = parseInt(b.replace(/\D/g, '') || '0', 10)
    return numA - numB
  })

  if (txtFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada berkas chapter .txt dalam novel ini' })
  }

  let translatedCount = 0

  for (let i = 0; i < txtFiles.length; i++) {
    const fileName = txtFiles[i]
    if (!fileName) continue

    const filePath = path.join(novelDir, fileName)
    const content = fs.readFileSync(filePath, 'utf-8')
    const paragraphs = content.split(/\r?\n/).filter(p => p.trim().length > 0)

    if (paragraphs.length > 0) {
      try {
        const translatedParagraphs = await translateBatch(paragraphs, {
          engine,
          geminiApiKey,
          deeplApiKey,
          libreUrl,
          libreApiKey
        })

        if (translatedParagraphs && translatedParagraphs.length > 0) {
          const newContent = translatedParagraphs.join('\n\n')
          fs.writeFileSync(filePath, newContent, 'utf-8')
          translatedCount++
        }
      } catch (err) {
        console.error(`Failed to translate chapter ${fileName}:`, err)
      }
    }
  }

  return {
    success: true,
    totalChapters: txtFiles.length,
    translatedCount,
    message: `Berhasil menerjemahkan ${translatedCount} dari ${txtFiles.length} chapter secara permanen!`
  }
})
