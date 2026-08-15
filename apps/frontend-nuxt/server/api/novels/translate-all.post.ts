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
  // Support both .txt and .json chapter files
  const chapterFiles = files.filter(f => {
    const l = f.toLowerCase()
    return (l.endsWith('.txt') || l.endsWith('.json')) && !l.includes('meta') && !l.includes('index') && !l.includes('cover')
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0', 10)
    const numB = parseInt(b.replace(/\D/g, '') || '0', 10)
    return numA - numB
  })

  if (chapterFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada berkas chapter (.txt / .json) dalam novel ini' })
  }

  let translatedCount = 0

  for (let i = 0; i < chapterFiles.length; i++) {
    const fileName = chapterFiles[i]
    if (!fileName) continue

    console.log(`[Batch Translate] (${i + 1}/${chapterFiles.length}) Translating chapter ${fileName} using engine '${engine || 'google'}'...`)

    const filePath = path.join(novelDir, fileName)
    const ext = path.extname(fileName).toLowerCase()

    try {
      if (ext === '.txt') {
        const content = fs.readFileSync(filePath, 'utf-8')
        const paragraphs = content.split(/\r?\n/).filter(p => p.trim().length > 0)

        if (paragraphs.length > 0) {
          const translatedParagraphs = await translateBatch(paragraphs, {
            engine,
            geminiApiKey,
            deeplApiKey,
            libreUrl,
            libreApiKey
          })

          if (translatedParagraphs && translatedParagraphs.length > 0) {
            fs.writeFileSync(filePath, translatedParagraphs.join('\n\n'), 'utf-8')
            translatedCount++
          }
        }
      } else if (ext === '.json') {
        const rawJson = fs.readFileSync(filePath, 'utf-8')
        const jsonData = JSON.parse(rawJson)

        let paragraphsToTranslate: string[] = []

        if (Array.isArray(jsonData)) {
          paragraphsToTranslate = jsonData.filter(p => typeof p === 'string' && p.trim().length > 0)
        } else if (jsonData && typeof jsonData === 'object') {
          if (Array.isArray(jsonData.paragraphs)) {
            paragraphsToTranslate = jsonData.paragraphs.filter((p: any) => typeof p === 'string' && p.trim().length > 0)
          } else if (Array.isArray(jsonData.content)) {
            paragraphsToTranslate = jsonData.content.filter((p: any) => typeof p === 'string' && p.trim().length > 0)
          }
        }

        if (paragraphsToTranslate.length > 0) {
          const translatedParagraphs = await translateBatch(paragraphsToTranslate, {
            engine,
            geminiApiKey,
            deeplApiKey,
            libreUrl,
            libreApiKey
          })

          if (translatedParagraphs && translatedParagraphs.length > 0) {
            if (Array.isArray(jsonData)) {
              fs.writeFileSync(filePath, JSON.stringify(translatedParagraphs, null, 2), 'utf-8')
            } else if (jsonData && typeof jsonData === 'object') {
              if (Array.isArray(jsonData.paragraphs)) {
                jsonData.paragraphs = translatedParagraphs
              } else if (Array.isArray(jsonData.content)) {
                jsonData.content = translatedParagraphs
              } else {
                jsonData.paragraphs = translatedParagraphs
              }
              fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8')
            }
            translatedCount++
          }
        }
      }
    } catch (err) {
      console.error(`Failed to translate chapter ${fileName}:`, err)
    }
  }

  return {
    success: true,
    totalChapters: chapterFiles.length,
    translatedCount,
    message: `Berhasil menerjemahkan ${translatedCount} dari ${chapterFiles.length} chapter secara permanen!`
  }
})
