export default defineEventHandler(async (event) => {
  try {
    const parts = await readMultipartFormData(event)
    if (!parts || parts.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'Tidak ada berkas yang dikirim untuk diunggah.' })
    }

    const uploadedItems: GDrivePooledFileItem[] = []
    const pooledFiles = loadPooledFiles()

    for (const part of parts) {
      if (part.name === 'file' && part.filename && part.data) {
        const fileName = part.filename
        const mimeType = part.type || 'application/octet-stream'
        const buffer = part.data
        const size = buffer.length

        // Select available account with auto-failover overflow router!
        const { account, accessToken } = await selectAccountForUpload(size)

        // Upload to selected GDrive account
        const gdriveRes = await uploadFileToGDrive(account, accessToken, fileName, mimeType, buffer)

        const fileItem: GDrivePooledFileItem = {
          id: `pool_file_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          name: fileName,
          size,
          sizeFormatted: formatBytes(size),
          mimeType,
          gdriveAccountId: account.id,
          gdriveAccountEmail: account.email,
          gdriveFileId: gdriveRes.fileId,
          uploadedAt: new Date().toISOString()
        }

        pooledFiles.unshift(fileItem)
        uploadedItems.push(fileItem)

        // Update local quota cache
        account.quotaBytesUsed += size
      }
    }

    savePooledFiles(pooledFiles)
    await syncAllAccountsQuota()

    return {
      success: true,
      message: `Berhasil mengunggah ${uploadedItems.length} berkas ke Storage Pool Google Drive!`,
      data: uploadedItems
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
