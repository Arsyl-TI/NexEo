import fs from 'fs'

export default defineEventHandler((event) => {
  const filename = getRouterParam(event, 'filename')
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: 'Filename is required' })
  }

  const filePath = getSharedFilePath(filename)
  if (!filePath) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)
  return sendStream(event, fs.createReadStream(filePath))
})
