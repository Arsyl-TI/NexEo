import fs from 'fs'
import path from 'path'
import type { SharedFileEntry } from '@nexeo/shared/types/files'
import { serverConfig, formatFileSize } from './config'

export function listSharedFiles(): SharedFileEntry[] {
  const uploadDir = serverConfig.uploadDir
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  const files: SharedFileEntry[] = []

  try {
    const entries = fs.readdirSync(uploadDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isFile()) {
        const fullPath = path.join(uploadDir, entry.name)
        const stats = fs.statSync(fullPath)
        files.push({
          name: entry.name,
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
          modified: stats.mtime.toISOString()
        })
      }
    }
  } catch (err) {
    console.error('Error reading upload dir:', err)
  }

  files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
  return files
}

export function getSharedFilePath(filename: string): string | null {
  const safeFilename = path.basename(filename)
  const filePath = path.join(serverConfig.uploadDir, safeFilename)

  if (fs.existsSync(filePath)) {
    return filePath
  }
  return null
}

export function deleteSharedFile(filename: string): boolean {
  const filePath = getSharedFilePath(filename)
  if (!filePath) return false

  try {
    fs.unlinkSync(filePath)
    return true
  } catch (err) {
    console.error(`Failed to delete file ${filename}:`, err)
    return false
  }
}
