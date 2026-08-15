import fs from 'fs'
import path from 'path'
import { serverConfig } from '../../utils/config'
import { translateBatch } from '../../utils/novel/translator'

function shouldTranslateItem(item: any): boolean {
  if (typeof item === 'string' && item.trim().length > 0) return true
  if (item && typeof item === 'object') {
    if (item.type === 'image') return false // NEVER touch or translate image nodes!
    if (item.type === 'text' && typeof item.value === 'string' && item.value.trim().length > 0) return true
    if (item.type === 'paragraph' && typeof item.text === 'string' && item.text.trim().length > 0) return true
    if (!item.type && typeof item.value === 'string' && !item.value.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) && item.value.trim().length > 0) return true
    if (!item.type && typeof item.text === 'string' && item.text.trim().length > 0) return true
  }
  return false
}

function getItemText(item: any): string {
  if (typeof item === 'string') return item.trim()
  if (item && typeof item === 'object') {
    if (item.type === 'text' && typeof item.value === 'string') return item.value.trim()
    if (item.type === 'paragraph' && typeof item.text === 'string') return item.text.trim()
    if (!item.type && typeof item.value === 'string') return item.value.trim()
    if (!item.type && typeof item.text === 'string') return item.text.trim()
  }
  return ''
}

function updateItemText(item: any, newText: string): any {
  if (typeof item === 'string') return newText
  if (item && typeof item === 'object') {
    if (item.type === 'text' && typeof item.value === 'string') {
      item.value = newText
    } else if (item.type === 'paragraph' && typeof item.text === 'string') {
      item.text = newText
    } else if (!item.type && typeof item.value === 'string') {
      item.value = newText
    } else if (!item.type && typeof item.text === 'string') {
      item.text = newText
    }
  }
  return item
}

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

    const filePath = path.join(novelDir, fileName)
    const ext = path.extname(fileName).toLowerCase()

    try {
      if (ext === '.txt') {
        const content = fs.readFileSync(filePath, 'utf-8')
        const paragraphs = content.split(/\r?\n/).filter(p => p.trim().length > 0)

        console.log(`[Batch Translate] (${i + 1}/${chapterFiles.length}) Chapter ${fileName} (.txt): found ${paragraphs.length} paragraphs. Translating via '${engine || 'google'}'...`)

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

        const extractedParagraphs: string[] = []

        if (Array.isArray(jsonData)) {
          for (const item of jsonData) {
            if (shouldTranslateItem(item)) {
              const txt = getItemText(item)
              if (txt) extractedParagraphs.push(txt)
            }
          }
        } else if (jsonData && typeof jsonData === 'object') {
          const contentArr = Array.isArray(jsonData.content) ? jsonData.content : (Array.isArray(jsonData.paragraphs) ? jsonData.paragraphs : [])
          for (const item of contentArr) {
            if (shouldTranslateItem(item)) {
              const txt = getItemText(item)
              if (txt) extractedParagraphs.push(txt)
            }
          }
        }

        console.log(`[Batch Translate] (${i + 1}/${chapterFiles.length}) Chapter ${fileName} (.json): found ${extractedParagraphs.length} text paragraphs. Translating via '${engine || 'google'}'...`)

        if (extractedParagraphs.length > 0) {
          const translatedParagraphs = await translateBatch(extractedParagraphs, {
            engine,
            geminiApiKey,
            deeplApiKey,
            libreUrl,
            libreApiKey
          })

          if (translatedParagraphs && translatedParagraphs.length > 0) {
            let tIdx = 0
            if (Array.isArray(jsonData)) {
              for (let k = 0; k < jsonData.length; k++) {
                const item = jsonData[k]
                if (shouldTranslateItem(item)) {
                  const newTxt = translatedParagraphs[tIdx++]
                  if (newTxt) {
                    jsonData[k] = updateItemText(item, newTxt)
                  }
                }
              }
              fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8')
            } else if (jsonData && typeof jsonData === 'object') {
              const contentArr = Array.isArray(jsonData.content) ? jsonData.content : (Array.isArray(jsonData.paragraphs) ? jsonData.paragraphs : [])
              for (let k = 0; k < contentArr.length; k++) {
                const item = contentArr[k]
                if (shouldTranslateItem(item)) {
                  const newTxt = translatedParagraphs[tIdx++]
                  if (newTxt) {
                    contentArr[k] = updateItemText(item, newTxt)
                  }
                }
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
