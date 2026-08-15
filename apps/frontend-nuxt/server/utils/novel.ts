import fs, { type Dirent } from 'fs'
import path from 'path'
import type { NovelLibraryItem, NovelMetadata, MasterIndexEntry } from '@nexeo/shared/types/novel'
import { serverConfig } from './config'

export interface LocalChapter {
  id: string
  title: string
  file: string
  number?: number
  url?: string
}

export interface NovelDetail {
  id: string
  slug: string
  title: string
  author?: string
  cover?: string
  tags?: string[]
  description?: string
  sourceUrl?: string
  updatedAt?: string
  chapters?: LocalChapter[]
}

export class NovelServerRepository {
  private get novelDir(): string {
    return serverConfig.novel.dir
  }

  private ensureNovelDir(slug: string): string {
    return path.join(this.novelDir, slug)
  }

  private getIndexPath(slug: string): string {
    return path.join(this.ensureNovelDir(slug), 'master_index.json')
  }

  private getMetadataPath(slug: string): string {
    return path.join(this.ensureNovelDir(slug), 'metadata.json')
  }

  public getNovelDirs(): NovelLibraryItem[] {
    if (!fs.existsSync(this.novelDir)) {
      return []
    }

    const entries = fs.readdirSync(this.novelDir, { withFileTypes: true })
    return entries
      .filter((entry: Dirent) => entry.isDirectory() && entry.name !== 'thumbnails')
      .map((entry: Dirent) => {
        const slug = entry.name
        const indexPath = this.getIndexPath(slug)
        const metadataPath = this.getMetadataPath(slug)

        let title = slug
        let author: string | undefined
        let tags: string[] = []
        let cover: string | null = null

        if (fs.existsSync(metadataPath)) {
          try {
            const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) as NovelMetadata
            title = metadata.title ?? title
            author = metadata.author
            tags = metadata.tags ?? []
            cover = metadata.coverUrl ?? null
          } catch {}
        }

        if (title === slug && fs.existsSync(indexPath)) {
          try {
            const index: MasterIndexEntry[] = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
            if (index.length > 0 && index[0]) {
              title = index[0].title ?? title
            }
          } catch {}
        }

        // Check local image files
        const rootCover = path.join(this.ensureNovelDir(slug), 'cover.jpg')
        const coversDir = path.join(this.ensureNovelDir(slug), 'images')

        if (fs.existsSync(rootCover)) {
          cover = `/_novels/${slug}/cover.jpg`
        } else if (fs.existsSync(coversDir)) {
          const coverFiles = fs.readdirSync(coversDir)
          const found = coverFiles.find((f: string) => f.toLowerCase().includes('cover') || f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'))
          if (found) {
            cover = `/_novels/${slug}/images/${found}`
          }
        }

        return {
          id: slug,
          slug,
          title,
          author,
          tags,
          cover: cover ?? undefined
        }
      })
      .filter((item: NovelLibraryItem) => item.title)
  }

  public getNovelMetadata(slug: string): NovelMetadata | null {
    const metadataPath = this.getMetadataPath(slug)
    if (!fs.existsSync(metadataPath)) return null
    try {
      return JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) as NovelMetadata
    } catch {
      return null
    }
  }

  public getMasterIndex(slug: string): MasterIndexEntry[] {
    const indexPath = this.getIndexPath(slug)
    if (!fs.existsSync(indexPath)) return []
    try {
      return JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as MasterIndexEntry[]
    } catch {
      return []
    }
  }

  public getChapterContent(slug: string, chapterId: string): any | null {
    const safeChapter = path.basename(chapterId)
    const chapterPath = path.join(this.ensureNovelDir(slug), safeChapter.endsWith('.json') ? safeChapter : `${safeChapter}.json`)
    if (!fs.existsSync(chapterPath)) return null
    try {
      return JSON.parse(fs.readFileSync(chapterPath, 'utf-8'))
    } catch {
      return null
    }
  }
}

export const novelServerRepo = new NovelServerRepository()

export function listLocalNovels(): NovelLibraryItem[] {
  return novelServerRepo.getNovelDirs().sort((a, b) => a.title.localeCompare(b.title))
}

export function getLocalNovel(slug: string): NovelDetail | null {
  const novelDir = path.join(serverConfig.novel.dir, slug)
  if (!fs.existsSync(novelDir)) return null

  const metadata = novelServerRepo.getNovelMetadata(slug)
  const masterIndex = novelServerRepo.getMasterIndex(slug)

  let title = metadata?.title || slug
  let author = metadata?.author
  let tags = metadata?.tags || []
  let description = metadata?.description
  let sourceUrl = (metadata as any)?.sourceUrl
  let cover = metadata?.coverUrl || null

  const rootCover = path.join(novelDir, 'cover.jpg')
  const coversDir = path.join(novelDir, 'images')

  if (fs.existsSync(rootCover)) {
    cover = `/_novels/${slug}/cover.jpg`
  } else if (fs.existsSync(coversDir)) {
    const coverFiles = fs.readdirSync(coversDir)
    const found = coverFiles.find((f: string) => f.toLowerCase().includes('cover') || f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'))
    if (found) {
      cover = `/_novels/${slug}/images/${found}`
    }
  }

  const chapters: LocalChapter[] = getLocalChapters(slug)

  return {
    id: slug,
    slug,
    title,
    author,
    description,
    sourceUrl,
    cover: cover || undefined,
    tags,
    chapters
  }
}

export function getLocalChapters(slug: string): LocalChapter[] {
  const masterIndex = novelServerRepo.getMasterIndex(slug)
  if (masterIndex.length > 0) {
    return masterIndex.map(c => ({
      id: String(c.id),
      title: c.title,
      file: (c as any).file || `chapter-${c.id}.json`,
      number: c.number,
      url: c.url
    }))
  }

  // Fallback: Scan .txt and .json files in novel directory if master_index.json is missing
  const novelDir = path.join(serverConfig.novel.dir, slug)
  if (!fs.existsSync(novelDir)) return []

  const files = fs.readdirSync(novelDir)
  const chapterFiles = files.filter(f => {
    const l = f.toLowerCase()
    return (l.endsWith('.txt') || l.endsWith('.json')) && !l.includes('meta') && !l.includes('index') && !l.includes('cover')
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0', 10)
    const numB = parseInt(b.replace(/\D/g, '') || '0', 10)
    return numA - numB
  })

  return chapterFiles.map((fileName, idx) => ({
    id: String(idx + 1),
    title: fileName.replace(/\.(txt|json)$/i, ''),
    file: fileName,
    number: idx + 1
  }))
}

export function getLocalChapterContent(slug: string, filename: string): any | null {
  return novelServerRepo.getChapterContent(slug, filename)
}
