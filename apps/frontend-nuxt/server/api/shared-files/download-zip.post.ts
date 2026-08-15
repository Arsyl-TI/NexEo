import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import { serverConfig } from '../../utils/config'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const filenames: string[] = body?.filenames || []

  if (!Array.isArray(filenames) || filenames.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Daftar nama file tidak valid atau kosong'
    })
  }

  const uploadDir = serverConfig.uploadDir
  if (!fs.existsSync(uploadDir)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Direktori berkas terbagi tidak ditemukan'
    })
  }

  const zip = new AdmZip()
  let addedCount = 0

  for (const filename of filenames) {
    const safeName = path.basename(filename)
    const filePath = path.join(uploadDir, safeName)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      zip.addLocalFile(filePath)
      addedCount++
    }
  }

  if (addedCount === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Tidak ada berkas valid yang dapat dikemas ke ZIP'
    })
  }

  const zipBuffer = zip.toBuffer()

  setHeader(event, 'Content-Type', 'application/zip')
  setHeader(event, 'Content-Disposition', 'attachment; filename="nexeo-shared-files.zip"')
  setHeader(event, 'Content-Length', zipBuffer.length)

  return zipBuffer
})
