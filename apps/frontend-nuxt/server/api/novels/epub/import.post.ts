import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  const filePart = parts.find(p => p.filename && p.data)
  if (!filePart || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file payload' })
  }

  const tempDir = path.join(serverConfig.dataDir, 'temp')
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

  const tempFilePath = path.join(tempDir, `upload-${Date.now()}-${filePart.filename}`)
  fs.writeFileSync(tempFilePath, filePart.data)

  try {
    const result = await importEpubFile(tempFilePath, filePart.filename)
    return result
  } finally {
    if (fs.existsSync(tempFilePath)) {
      try { fs.unlinkSync(tempFilePath) } catch {}
    }
  }
})
