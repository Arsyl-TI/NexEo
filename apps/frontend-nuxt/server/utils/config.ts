import path from 'path'
import fs from 'fs'

export interface VideoCategoryConfig {
  id: string
  name: string
  icon: string
  path: string
}

export interface VideoConfig {
  categories: VideoCategoryConfig[]
  supportedFormats: readonly string[]
  cacheTtl: number
  thumbnailDir: string
}

export interface NovelConfig {
  dir: string
  thumbnailDir: string
}

export interface ServerConfig {
  port: number
  video: VideoConfig
  novel: NovelConfig
  uploadDir: string
  sharedFilesDir: string
  cacheDir: string
  dataDir: string
}

const rootDir = process.env['NEXE_ROOT_DIR'] ?? path.resolve('.').replace(/\\/g, '/')
const dataPath = path.join(rootDir, 'data')

function resolveCategoryPath(baseDir: string, categoryFolderName: string): string {
  const targetPath = path.join(baseDir, categoryFolderName)
  if (fs.existsSync(targetPath)) {
    return targetPath
  }
  const lowerPath = path.join(baseDir, categoryFolderName.toLowerCase())
  if (fs.existsSync(lowerPath)) {
    return lowerPath
  }
  return targetPath
}

const baseVideoDir = process.env['VIDEO_DIR'] ?? 'D:\\Video'

export const serverConfig: ServerConfig = {
  port: process.env['NEXE_PORT'] ? Number(process.env['NEXE_PORT']) : 3000,
  video: {
    categories: [
      {
        id: 'anime',
        name: 'List Anime',
        icon: 'film',
        path: resolveCategoryPath(baseVideoDir, 'Anime')
      },
      {
        id: 'youtube',
        name: 'List YouTube',
        icon: 'youtube',
        path: resolveCategoryPath(baseVideoDir, 'YouTube')
      }
    ],
    supportedFormats: ['.mp4', '.mkv', '.webm', '.mov', '.avi'],
    cacheTtl: 60_000,
    thumbnailDir: path.join(dataPath, 'thumbnails')
  },
  novel: {
    dir: path.join(rootDir, 'data', 'novels'),
    thumbnailDir: path.join(rootDir, 'data', 'novels', 'thumbnails')
  },
  uploadDir: path.join(rootDir, 'uploads'),
  sharedFilesDir: path.join(rootDir, 'uploads'),
  cacheDir: path.join(rootDir, 'cache'),
  dataDir: dataPath
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
