import fs, { type Dirent } from 'fs'
import path from 'path'
import type { VideoCategory, VideoFolder, VideoItem } from '@nexeo/shared/types/video'
import { serverConfig, formatFileSize } from './config'

export interface VideoScanResult {
  categories: VideoCategory[]
  folders: VideoFolder[]
  videos: VideoItem[]
  videoMap: Map<string, VideoItem>
}

let cachedTimestamp = 0
let cachedResult: VideoScanResult | null = null

function isCacheExpired(): boolean {
  return Date.now() - cachedTimestamp > serverConfig.video.cacheTtl
}

function scanDirectory(dirPath: string): string[] {
  try {
    if (!fs.existsSync(dirPath)) return []
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .filter((d: Dirent) => d.isDirectory()).map((d: Dirent) => d.name)
  } catch (e) { return [] }
}

export function scanVideos(dir: string, relativeBase: string, categoryId: string, supportedFormats: readonly string[], recursive: boolean = true): VideoItem[] {
  const videos: VideoItem[] = []
  try {
    if (!fs.existsSync(dir)) return []
    const items = fs.readdirSync(dir, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      const relPath = path.relative(relativeBase, fullPath).replace(/\\/g, '/')
      const id = `${categoryId}/${relPath.toLowerCase()}`

      if (item.isDirectory()) {
        if (recursive) {
          videos.push(...scanVideos(fullPath, relativeBase, categoryId, supportedFormats, true))
        }
      } else {
        const ext = path.extname(fullPath).toLowerCase()
        if (supportedFormats.includes(ext)) {
          try {
            const stat = fs.statSync(fullPath)

            let description: string | undefined = undefined
            let author: string | undefined = undefined
            const jsonPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.json'
            if (fs.existsSync(jsonPath)) {
              try {
                const meta = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
                description = meta.description
                author = meta.author
              } catch {}
            }

            videos.push({
              id,
              title: item.name,
              path: fullPath.replace(/\\/g, '/'),
              categoryId,
              folderId: categoryId,
              folder: path.dirname(relPath).replace(/\\/g, '/'),
              name: item.name,
              size: stat.size,
              sizeFormatted: formatFileSize(stat.size),
              format: ext.toUpperCase().replace('.', ''),
              hasThumbnail: stat.size > 0,
              description,
              author
            })
          } catch (e) {}
        }
      }
    }
  } catch (err) {
    console.error('Scan videos error:', err)
  }
  return videos
}

async function scan(): Promise<VideoScanResult> {
  const categories: VideoCategory[] = serverConfig.video.categories.map(cat => ({
    id: cat.id, name: cat.name, folder: cat.path, path: cat.path, icon: cat.icon
  }))
  const folders: VideoFolder[] = []
  const videos: VideoItem[] = []
  const videoMap = new Map<string, VideoItem>()

  for (const cat of serverConfig.video.categories) {
    if (!fs.existsSync(cat.path)) continue
    let folderVideoCount = 0

    // Direct videos in category root folder only (non-recursive)
    const categoryDirectVideos = scanVideos(cat.path, cat.path, cat.id, serverConfig.video.supportedFormats, false)
    if (categoryDirectVideos.length > 0) {
      folderVideoCount += categoryDirectVideos.length
      const firstVideo = categoryDirectVideos[0]
      folders.push({
        id: `${cat.id}/root`,
        name: 'General',
        path: cat.path.replace(/\\/g, '/'),
        categoryId: cat.id,
        videoCount: categoryDirectVideos.length,
        coverId: firstVideo?.id,
        hasCoverThumbnail: true
      })
      for (const v of categoryDirectVideos) {
        videos.push(v)
        videoMap.set(v.id, v)
      }
    }

    // Subdirectories in category folder
    const subfolders = scanDirectory(cat.path)
    for (const folderName of subfolders) {
      const folderPath = path.join(cat.path, folderName)
      const folderVideos = scanVideos(folderPath, cat.path, cat.id, serverConfig.video.supportedFormats)
      folderVideoCount += folderVideos.length

      const firstVideo = folderVideos.length > 0 ? folderVideos[0] : undefined
      folders.push({
        id: `${cat.id}/${folderName.toLowerCase()}`,
        name: folderName,
        path: folderPath.replace(/\\/g, '/'),
        categoryId: cat.id,
        videoCount: folderVideos.length,
        coverId: firstVideo?.id,
        hasCoverThumbnail: folderVideos.length > 0
      })

      for (const v of folderVideos) {
        videos.push(v)
        videoMap.set(v.id, v)
      }
    }

    const catIndex = categories.findIndex(c => c.id === cat.id)
    if (catIndex >= 0) {
      const existing = categories[catIndex]
      if (existing) {
        existing.videoCount = folderVideoCount
      }
    }
  }
  return { categories, folders, videos, videoMap }
}

async function ensureCache(): Promise<VideoScanResult> {
  if (isCacheExpired() || !cachedResult) {
    cachedResult = await scan()
    cachedTimestamp = Date.now()
  }
  return cachedResult
}

export async function getVideoCategories(): Promise<VideoCategory[]> {
  const result = await ensureCache()
  return result.categories
}

export async function getFoldersByCategory(categoryId: string): Promise<VideoFolder[]> {
  const result = await ensureCache()
  return result.folders.filter(f => f.categoryId === categoryId)
}

export async function getVideosByFolder(categoryId: string, folderName: string): Promise<VideoItem[]> {
  const result = await ensureCache()
  const normFolder = folderName === 'Root' ? '' : folderName
  return result.videos.filter(v => v.categoryId === categoryId && (normFolder === '' || v.folderId === normFolder || v.folder === folderName || (folderName === 'General' && (!v.folder || v.folder === '.'))))
}

export async function getVideoById(id: string): Promise<VideoItem | null> {
  const result = await ensureCache()
  return result.videoMap.get(decodeURIComponent(id)) || null
}

export async function searchVideos(query: string): Promise<VideoItem[]> {
  const result = await ensureCache()
  const q = query.toLowerCase().trim()
  if (!q) return []
  return result.videos.filter(v => {
    const text = (v.title ?? v.name ?? '').toLowerCase()
    return text.includes(q)
  })
}

export function invalidateVideoCache(): void {
  cachedTimestamp = 0
  cachedResult = null
}
