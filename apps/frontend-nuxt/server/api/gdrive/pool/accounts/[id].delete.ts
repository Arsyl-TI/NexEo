export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, 'id') || ''
  const accounts = loadAccounts()
  const filtered = accounts.filter(a => a.id !== accountId)

  if (filtered.length === accounts.length) {
    throw createError({ statusCode: 404, statusMessage: 'Akun Google Drive tidak ditemukan di storage pool.' })
  }

  saveAccounts(filtered)
  return {
    success: true,
    message: 'Akun Google Drive telah dihapus dari storage pool.'
  }
})
