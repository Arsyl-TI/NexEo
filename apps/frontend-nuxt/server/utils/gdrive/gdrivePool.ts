import fs from 'fs'
import path from 'path'
import axios from 'axios'

export interface GDriveAccountConfig {
  id: string
  name: string
  email: string
  clientId: string
  clientSecret: string
  refreshToken: string
  quotaBytesTotal: number
  quotaBytesUsed: number
  status: 'active' | 'full' | 'error'
  createdAt: string
}

export interface GDrivePooledFileItem {
  id: string
  name: string
  size: number
  sizeFormatted: string
  mimeType: string
  gdriveAccountId: string
  gdriveAccountEmail: string
  gdriveFileId: string
  uploadedAt: string
}

const DATA_DIR = path.join(process.cwd(), 'server', 'data')
const ACCOUNTS_FILE = path.join(DATA_DIR, 'gdrive_accounts.json')
const FILES_FILE = path.join(DATA_DIR, 'gdrive_pooled_files.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function loadAccounts(): GDriveAccountConfig[] {
  ensureDataDir()
  if (!fs.existsSync(ACCOUNTS_FILE)) return []
  try {
    const raw = fs.readFileSync(ACCOUNTS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveAccounts(accounts: GDriveAccountConfig[]) {
  ensureDataDir()
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), 'utf-8')
}

export function loadPooledFiles(): GDrivePooledFileItem[] {
  ensureDataDir()
  if (!fs.existsSync(FILES_FILE)) return []
  try {
    const raw = fs.readFileSync(FILES_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function savePooledFiles(files: GDrivePooledFileItem[]) {
  ensureDataDir()
  fs.writeFileSync(FILES_FILE, JSON.stringify(files, null, 2), 'utf-8')
}

// Format bytes helper
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// ----------------------------------------------------
// GOOGLE OAUTH2 TOKEN REFRESH & QUOTA ENGINE
// ----------------------------------------------------

export async function getAccessToken(account: GDriveAccountConfig): Promise<string> {
  try {
    const res = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: account.clientId,
      client_secret: account.clientSecret,
      refresh_token: account.refreshToken,
      grant_type: 'refresh_token'
    })

    if (res.data && res.data.access_token) {
      return res.data.access_token
    }
    throw new Error('No access_token returned in Google OAuth response')
  } catch (err: any) {
    const msg = err.response?.data?.error_description || err.message
    throw new Error(`Gagal mendapatkan token akses Google Drive (${account.email}): ${msg}`)
  }
}

export async function fetchAccountQuota(account: GDriveAccountConfig): Promise<{ total: number; used: number; email?: string }> {
  const token = await getAccessToken(account)
  const res = await axios.get('https://www.googleapis.com/drive/v3/about?fields=user,storageQuota', {
    headers: { Authorization: `Bearer ${token}` }
  })

  const userEmail = res.data?.user?.emailAddress || account.email
  const quota = res.data?.storageQuota || {}
  const total = parseInt(quota.limit || String(15 * 1024 * 1024 * 1024), 10)
  const used = parseInt(quota.usage || '0', 10)

  return { total, used, email: userEmail }
}

export async function syncAllAccountsQuota(): Promise<GDriveAccountConfig[]> {
  const accounts = loadAccounts()
  for (const acc of accounts) {
    try {
      const q = await fetchAccountQuota(acc)
      acc.quotaBytesTotal = q.total
      acc.quotaBytesUsed = q.used
      if (q.email) acc.email = q.email
      acc.status = q.used >= q.total - 100 * 1024 * 1024 ? 'full' : 'active'
    } catch (e: any) {
      console.error(`[GDrive Quota Error] Account ${acc.name}:`, e.message)
      acc.status = 'error'
    }
  }
  saveAccounts(accounts)
  return accounts
}

// ----------------------------------------------------
// AUTO-FAILOVER ACCOUNT SELECTOR
// ----------------------------------------------------

export async function selectAccountForUpload(fileSizeBytes: number): Promise<{ account: GDriveAccountConfig; accessToken: string }> {
  const accounts = await syncAllAccountsQuota()
  const activeAccounts = accounts.filter(a => a.status === 'active')

  if (activeAccounts.length === 0) {
    throw new Error('Tidak ada akun Google Drive aktif yang tersedia di storage pool. Harap tambahkan akun baru!')
  }

  // Find first account with enough remaining space
  for (const acc of activeAccounts) {
    const remaining = acc.quotaBytesTotal - acc.quotaBytesUsed
    if (remaining > fileSizeBytes + 10 * 1024 * 1024) { // keep 10MB safety margin
      const token = await getAccessToken(acc)
      return { account: acc, accessToken: token }
    } else {
      // Mark as full and continue to next account (auto-failover!)
      acc.status = 'full'
    }
  }

  saveAccounts(accounts)
  throw new Error(`Seluruh akun Google Drive di storage pool sudah penuh untuk mengunggah berkas sebesar ${formatBytes(fileSizeBytes)}. Harap tambahkan akun Google Drive baru!`)
}

// ----------------------------------------------------
// UPLOAD FILE TO GDRIVE API VIA MULTIPART
// ----------------------------------------------------

export async function uploadFileToGDrive(
  account: GDriveAccountConfig,
  token: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<{ fileId: string; webViewLink?: string }> {
  const metadata = {
    name: fileName,
    mimeType: mimeType || 'application/octet-stream'
  }

  const boundary = '-------314159265358979323846'
  const delimiter = `\r\n--${boundary}\r\n`
  const closeDelimiter = `\r\n--${boundary}--`

  let multipartRequestBody = delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType || 'application/octet-stream'}\r\n\r\n`

  const payload = Buffer.concat([
    Buffer.from(multipartRequestBody, 'utf-8'),
    buffer,
    Buffer.from(closeDelimiter, 'utf-8')
  ])

  const res = await axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', payload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
      'Content-Length': payload.length
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity
  })

  if (res.data && res.data.id) {
    return { fileId: res.data.id, webViewLink: res.data.webViewLink }
  }

  throw new Error('Google Drive API tidak mengembalikan ID berkas setelah upload.')
}

// ----------------------------------------------------
// DELETE FILE FROM GDRIVE API
// ----------------------------------------------------

export async function deleteFileFromGDrive(account: GDriveAccountConfig, gdriveFileId: string): Promise<boolean> {
  try {
    const token = await getAccessToken(account)
    await axios.delete(`https://www.googleapis.com/drive/v3/files/${gdriveFileId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return true
  } catch (err: any) {
    console.error(`[GDrive Delete Error] File ${gdriveFileId}:`, err.message)
    return false
  }
}
