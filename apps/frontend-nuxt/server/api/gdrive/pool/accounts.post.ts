export default defineEventHandler(async (event) => {
  const body = await readBody(event) || {}
  const { name, clientId, clientSecret, refreshToken } = body

  if (!clientId || !clientSecret || !refreshToken) {
    throw createError({ statusCode: 400, statusMessage: 'Harap isi Client ID, Client Secret, dan Refresh Token Google Drive.' })
  }

  const accounts = loadAccounts()
  const accountId = `gdrive_acc_${Date.now()}`

  const newAccount: GDriveAccountConfig = {
    id: accountId,
    name: name || `Google Drive Account ${accounts.length + 1}`,
    email: name || 'Google Account',
    clientId,
    clientSecret,
    refreshToken,
    quotaBytesTotal: 15 * 1024 * 1024 * 1024,
    quotaBytesUsed: 0,
    status: 'active',
    createdAt: new Date().toISOString()
  }

  try {
    // Validate credentials and fetch real quota
    const q = await fetchAccountQuota(newAccount)
    newAccount.quotaBytesTotal = q.total
    newAccount.quotaBytesUsed = q.used
    if (q.email) newAccount.email = q.email
    newAccount.status = q.used >= q.total - 100 * 1024 * 1024 ? 'full' : 'active'

    accounts.push(newAccount)
    saveAccounts(accounts)

    return {
      success: true,
      message: `Akun Google Drive (${newAccount.email}) berhasil ditambahkan ke storage pool!`,
      data: newAccount
    }
  } catch (err: any) {
    throw createError({ statusCode: 400, statusMessage: `Kredensial Google Drive tidak valid: ${err.message}` })
  }
})
