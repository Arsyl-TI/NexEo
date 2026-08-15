import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { serverConfig } from '../config'

export interface OnlineMangaItem {
  id: string
  title: string
  slug: string
  cover: string | null
  coverFile?: string
  author: string
  description: string
  status: string
  tags: string[]
  provider: 'mangadex' | 'westmanga'
  availableLanguages: string[]
  chapterCount?: number
}

export interface OnlineMangaChapter {
  id: string
  chapter: string
  title: string
  language: string
  publishDate?: string
  scanlationGroup?: string
}

// In-memory High Performance Caches
const searchCache = new Map<string, { data: OnlineMangaItem[]; expiry: number }>()
const detailCache = new Map<string, { data: { manga: OnlineMangaItem; chapters: OnlineMangaChapter[] }; expiry: number }>()
const CACHE_TTL = 15 * 60 * 1000 // 15 Minutes

// -------------------------------------------------------------
// 1. MANGADEX OFFICIAL API PROVIDER (OPTIMIZED + CACHED)
// -------------------------------------------------------------
export async function searchMangaDex(query: string, lang = 'id'): Promise<OnlineMangaItem[]> {
  const cacheKey = `${query.trim().toLowerCase()}_${lang}`
  const now = Date.now()
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!
    if (cached.expiry > now) {
      return cached.data
    }
  }

  try {
    const params: any = {
      limit: 24,
      'includes[]': ['cover_art', 'author'],
      'contentRating[]': ['safe', 'suggestive', 'erotica']
    }
    if (query && query.trim()) {
      params.title = query.trim()
      params['order[relevance]'] = 'desc'
    } else {
      params['order[followedCount]'] = 'desc'
    }

    if (lang && lang !== 'all') {
      params['availableTranslatedLanguage[]'] = [lang]
    }

    const res = await axios.get('https://api.mangadex.org/manga', {
      params,
      timeout: 10000,
      headers: {
        'User-Agent': 'NexEo-LocalApp/1.0'
      }
    })

    const data = res.data?.data || []
    const results: OnlineMangaItem[] = data.map((item: any) => {
      const attrs = item.attributes || {}
      const titleObj = attrs.title || {}
      const title = titleObj[lang] || titleObj['en'] || titleObj['ja-ro'] || Object.values(titleObj)[0] || 'Unknown Title'

      const descObj = attrs.description || {}
      const description = descObj[lang] || descObj['en'] || Object.values(descObj)[0] || ''

      let coverFile = ''
      let author = 'Unknown'
      if (Array.isArray(item.relationships)) {
        for (const rel of item.relationships) {
          if (rel.type === 'cover_art' && rel.attributes?.fileName) {
            coverFile = rel.attributes.fileName
          }
          if (rel.type === 'author' && rel.attributes?.name) {
            author = rel.attributes.name
          }
        }
      }

      // Use local fast proxy caching endpoint to avoid MangaDex CDN rate-limiting/CORS lag
      const cover = coverFile ? `/api/manga/online/cover?id=${item.id}&file=${encodeURIComponent(coverFile)}` : null
      const tags = (attrs.tags || []).map((t: any) => t.attributes?.name?.en || '').filter(Boolean)
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || item.id

      return {
        id: item.id,
        title,
        slug,
        cover,
        coverFile,
        author,
        description,
        status: attrs.status || 'ongoing',
        tags,
        provider: 'mangadex' as const,
        availableLanguages: attrs.availableTranslatedLanguages || []
      }
    })

    searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL })
    return results
  } catch (err: any) {
    console.error('[MangaDex Search Error]', err.message)
    return []
  }
}

export async function getMangaDexDetail(mangaId: string, lang = 'id'): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  const cacheKey = `${mangaId}_${lang}`
  const now = Date.now()
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey)!
    if (cached.expiry > now) {
      return cached.data
    }
  }

  try {
    // 1. Fetch Manga Metadata
    const mangaRes = await axios.get(`https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art&includes[]=author`, {
      timeout: 10000,
      headers: { 'User-Agent': 'NexEo-LocalApp/1.0' }
    })
    const item = mangaRes.data?.data
    if (!item) return null

    const attrs = item.attributes || {}
    const titleObj = attrs.title || {}
    const title = titleObj[lang] || titleObj['en'] || titleObj['ja-ro'] || Object.values(titleObj)[0] || 'Unknown Title'
    const descObj = attrs.description || {}
    const description = descObj[lang] || descObj['en'] || Object.values(descObj)[0] || ''

    let coverFile = ''
    let author = 'Unknown'
    if (Array.isArray(item.relationships)) {
      for (const rel of item.relationships) {
        if (rel.type === 'cover_art' && rel.attributes?.fileName) {
          coverFile = rel.attributes.fileName
        }
        if (rel.type === 'author' && rel.attributes?.name) {
          author = rel.attributes.name
        }
      }
    }

    const cover = coverFile ? `/api/manga/online/cover?id=${item.id}&file=${encodeURIComponent(coverFile)}` : null
    const tags = (attrs.tags || []).map((t: any) => t.attributes?.name?.en || '').filter(Boolean)
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || item.id

    const manga: OnlineMangaItem = {
      id: item.id,
      title,
      slug,
      cover,
      coverFile,
      author,
      description,
      status: attrs.status || 'ongoing',
      tags,
      provider: 'mangadex',
      availableLanguages: attrs.availableTranslatedLanguages || []
    }

    // 2. Fetch Chapters Feed (limit to 150 for maximum responsiveness)
    const feedParams: any = {
      limit: 150,
      'order[chapter]': 'asc',
      'includes[]': ['scanlation_group']
    }
    if (lang && lang !== 'all') {
      feedParams['translatedLanguage[]'] = [lang]
    }

    const feedRes = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`, {
      params: feedParams,
      timeout: 10000,
      headers: { 'User-Agent': 'NexEo-LocalApp/1.0' }
    })

    const rawChapters = feedRes.data?.data || []
    const chapters: OnlineMangaChapter[] = rawChapters.map((ch: any) => {
      const chAttr = ch.attributes || {}
      let scanlationGroup = 'Indonesian Scan'
      if (Array.isArray(ch.relationships)) {
        const group = ch.relationships.find((r: any) => r.type === 'scanlation_group')
        if (group?.attributes?.name) {
          scanlationGroup = group.attributes.name
        }
      }

      return {
        id: ch.id,
        chapter: chAttr.chapter || '1',
        title: chAttr.title ? `Ch. ${chAttr.chapter} - ${chAttr.title}` : `Chapter ${chAttr.chapter || '1'}`,
        language: chAttr.translatedLanguage || 'id',
        publishDate: chAttr.publishAt,
        scanlationGroup
      }
    })

    manga.chapterCount = chapters.length
    const result = { manga, chapters }

    detailCache.set(cacheKey, { data: result, expiry: now + CACHE_TTL })
    return result
  } catch (err: any) {
    console.error('[MangaDex Detail Error]', err.message)
    return null
  }
}

export async function getMangaDexChapterPages(chapterId: string): Promise<string[]> {
  try {
    const res = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`, {
      timeout: 10000,
      headers: { 'User-Agent': 'NexEo-LocalApp/1.0' }
    })

    const baseUrl = res.data?.baseUrl
    const chapter = res.data?.chapter
    if (!baseUrl || !chapter) return []

    const hash = chapter.hash
    const files = chapter.data || chapter.dataSaver || []

    return files.map((file: string) => `${baseUrl}/data/${hash}/${file}`)
  } catch (err: any) {
    console.error('[MangaDex Pages Error]', err.message)
    return []
  }
}

// -------------------------------------------------------------
// 2. CONCURRENT HIGH-SPEED DOWNLOAD ENGINE
// -------------------------------------------------------------
async function downloadWorker(urls: { url: string; dest: string }[], concurrency = 4): Promise<void> {
  let index = 0
  const total = urls.length

  async function worker() {
    while (index < total) {
      const current = urls[index++]
      if (!current) break

      if (!fs.existsSync(current.dest)) {
        try {
          const res = await axios.get(current.url, {
            responseType: 'arraybuffer',
            timeout: 20000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              'Referer': 'https://mangadex.org/'
            }
          })
          fs.writeFileSync(current.dest, Buffer.from(res.data))
        } catch (err: any) {
          console.warn(`[Download warning for ${current.dest}]:`, err.message)
        }
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, total) }, () => worker())
  await Promise.all(workers)
}

export async function downloadChapterToLocal(options: {
  mangaTitle: string
  mangaSlug: string
  chapterNum: string
  chapterTitle: string
  coverUrl?: string | null
  coverFile?: string
  author?: string
  description?: string
  pageUrls: string[]
}): Promise<{ success: boolean; path?: string; error?: string }> {
  const { mangaTitle, mangaSlug, chapterNum, coverUrl, author, description, pageUrls } = options

  try {
    const mangaDir = path.join(serverConfig.manga.dir, mangaSlug)
    if (!fs.existsSync(mangaDir)) {
      fs.mkdirSync(mangaDir, { recursive: true })
    }

    // Save meta.json if not existing
    const metaPath = path.join(mangaDir, 'meta.json')
    if (!fs.existsSync(metaPath)) {
      const meta = {
        title: mangaTitle,
        slug: mangaSlug,
        author: author || 'Unknown',
        description: description || '',
        updatedAt: new Date().toISOString()
      }
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), 'utf-8')
    }

    // Save cover if available and not yet saved
    if (coverUrl) {
      const coverPath = path.join(mangaDir, 'cover.jpg')
      if (!fs.existsSync(coverPath)) {
        try {
          const actualUrl = coverUrl.startsWith('/api') 
            ? `http://127.0.0.1:${serverConfig.port}${coverUrl}`
            : coverUrl
          const coverRes = await axios.get(actualUrl, { responseType: 'arraybuffer', timeout: 10000 })
          fs.writeFileSync(coverPath, Buffer.from(coverRes.data))
        } catch {}
      }
    }

    // Normalize chapter folder name: e.g. "chapter-01" or "chapter-12"
    const padNum = chapterNum.padStart(2, '0')
    const chapterDir = path.join(mangaDir, `chapter-${padNum}`)
    if (!fs.existsSync(chapterDir)) {
      fs.mkdirSync(chapterDir, { recursive: true })
    }

    // Prepare download tasks
    const tasks = pageUrls.map((pageUrl, i) => {
      const ext = path.extname(pageUrl.split('?')[0]) || '.jpg'
      const pageFileName = `${(i + 1).toString().padStart(3, '0')}${ext}`
      const pageFilePath = path.join(chapterDir, pageFileName)
      return { url: pageUrl, dest: pageFilePath }
    })

    // Execute with 4 parallel concurrent workers
    await downloadWorker(tasks, 4)

    return { success: true, path: chapterDir }
  } catch (err: any) {
    console.error('[Manga Download Error]', err.message)
    return { success: false, error: err.message }
  }
}
