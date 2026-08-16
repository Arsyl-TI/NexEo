export default defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, 'id') || ''
  const files = loadPooledFiles()
  const fileItem = files.find(f => f.id === fileId)

  if (!fileItem) {
    throw createError({ statusCode: 404, statusMessage: 'Berkas tidak ditemukan di Storage Pool.' })
  }

  // Delete from GDrive API
  const accounts = loadAccounts()
  const account = accounts.find(a => a.id === fileItem.gdriveAccountId)
  if (account) {
    await deleteFileFromGDrive(account, fileItem.gdriveFileId)
  }

  const updatedFiles = files.filter(f => f.id !== fileId)
  savePooledFiles(updatedFiles)
  await syncAllAccountsQuota()

  return {
    success: true,
    message: `Berkas "${fileItem.name}" berhasil dihapus dari Google Drive & Storage Pool.`
  }
})
