import axios from 'axios'

export default defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, 'id') || ''
  const files = loadPooledFiles()
  const fileItem = files.find(f => f.id === fileId)

  if (!fileItem) {
    throw createError({ statusCode: 404, statusMessage: 'Berkas tidak ditemukan di Storage Pool.' })
  }

  const accounts = loadAccounts()
  const account = accounts.find(a => a.id === fileItem.gdriveAccountId)
  if (!account) {
    throw createError({ statusCode: 404, statusMessage: 'Akun Google Drive penyimpan berkas ini tidak ditemukan.' })
  }

  try {
    const token = await getAccessToken(account)
    const rangeHeader = getHeader(event, 'range')

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`
    }
    if (rangeHeader) {
      headers.Range = rangeHeader
    }

    const gdriveRes = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileItem.gdriveFileId}?alt=media`, {
      headers,
      responseType: 'stream',
      validateStatus: () => true
    })

    setResponseStatus(event, gdriveRes.status)
    const contentType = String(gdriveRes.headers['content-type'] || fileItem.mimeType || 'application/octet-stream')
    setResponseHeader(event, 'Content-Type', contentType)

    if (gdriveRes.headers['content-length']) {
      setResponseHeader(event, 'Content-Length', Number(gdriveRes.headers['content-length']))
    }
    if (gdriveRes.headers['content-range']) {
      setResponseHeader(event, 'Content-Range', String(gdriveRes.headers['content-range']))
    }
    setResponseHeader(event, 'Accept-Ranges', 'bytes')
    setResponseHeader(event, 'Content-Disposition', `inline; filename="${encodeURIComponent(fileItem.name)}"`)

    return sendStream(event, gdriveRes.data)
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: `Gagal melakukan streaming dari Google Drive: ${err.message}` })
  }
})
