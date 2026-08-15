import fs, { type Dirent } from 'fs'
import path from 'path'
import { serverConfig } from './config'
import type { MangaItem, MangaChapter } from '@nexeo/shared/types/manga'

export function getMangaDir(): string {
  const dir = serverConfig.manga.dir
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function listLocalManga(): MangaItem[] {
  const mangaDir = getMangaDir()
  if (!fs.existsSync(mangaDir)) return []

  const entries = fs.readdirSync(mangaDir, { withFileTypes: true })
  const result: MangaItem[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const slug = entry.name
    const item = getLocalMangaDetail(slug)
    if (item) {
      result.push(item)
    }
  }

  return result.sort((a, b) => a.title.localeCompare(b.title))
}

export function getLocalMangaDetail(slug: string): MangaItem | null {
  const mangaDir = getMangaDir()
  const targetDir = path.join(mangaDir, slug)
  if (!fs.existsSync(targetDir)) return null

  let title = slug.replace(/_/g, ' ').replace(/-/g, ' ')
  let author: string | undefined
  let description: string | undefined
  let cover: string | undefined
  let tags: string[] = []

  // Check metadata.json
  const metaPath = path.join(targetDir, 'meta.json')
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
      title = meta.title || title
      author = meta.author
      description = meta.description
      tags = meta.tags || []
      if (meta.cover) cover = meta.cover
    } catch {}
  }

  // Check Cover Image in folder
  if (!cover) {
    const rootFiles = fs.readdirSync(targetDir)
    const coverFile = rootFiles.find(f => {
      const l = f.toLowerCase()
      return (l.includes('cover') || l.endsWith('.jpg') || l.endsWith('.png') || l.endsWith('.webp')) && !fs.statSync(path.join(targetDir, f)).isDirectory()
    })
    if (coverFile) {
      cover = `/_manga/${slug}/${coverFile}`
    }
  }

  const chapters = getLocalMangaChapters(slug)

  return {
    id: slug,
    slug,
    title,
    author,
    description,
    cover,
    tags,
    chapterCount: chapters.length,
    chapters
  }
}

export function getLocalMangaChapters(slug: string): MangaChapter[] {
  const mangaDir = getMangaDir()
  const targetDir = path.join(mangaDir, slug)
  if (!fs.existsSync(targetDir)) return []

  const entries = fs.readdirSync(targetDir, { withFileTypes: true })
  const chapterFolders = entries.filter(e => e.isDirectory()).sort((a, b) => {
    const numA = parseFloat(a.name.replace(/\D/g, '') || '0')
    const numB = parseFloat(b.name.replace(/\D/g, '') || '0')
    return numA - numB
  })

  return chapterFolders.map((c, idx) => {
    const chapterPath = path.join(targetDir, c.name)
    const files = fs.readdirSync(chapterPath).filter(f => {
      const l = f.toLowerCase()
      return l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp')
    })

    const chapterNum = parseFloat(c.name.replace(/\D/g, '') || String(idx + 1))

    return {
      id: c.name,
      title: c.name.replace(/_/g, ' ').replace(/-/g, ' '),
      file: c.name,
      chapterNumber: chapterNum,
      pageCount: files.length
    }
  })
}

export function getMangaChapterPages(slug: string, chapter: string): string[] {
  const mangaDir = getMangaDir()
  const chapterDir = path.join(mangaDir, slug, chapter)
  if (!fs.existsSync(chapterDir)) return []

  const files = fs.readdirSync(chapterDir).filter(f => {
    const l = f.toLowerCase()
    return l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp')
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0', 10)
    const numB = parseInt(b.replace(/\D/g, '') || '0', 10)
    return numA - numB
  })

  return files.map(f => `/_manga/${encodeURIComponent(slug)}/${encodeURIComponent(chapter)}/${encodeURIComponent(f)}`)
}
