import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { serverConfig } from '../config'

export interface OnlineMangaItem {
  id: string
  title: string
  slug: string
  cover: string | null
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

// -------------------------------------------------------------
// 1. MANGADEX OFFICIAL API PROVIDER
// -------------------------------------------------------------
export async function searchMangaDex(query: string, lang = 'id'): Promise<OnlineMangaItem[]> {
  try {
    const params: any = {
      limit: 24,
      'includes[]': ['cover_art', 'author'],
      'contentRating[]': ['safe', 'suggestive', 'erotica'],
      'order[relevance]': 'desc'
    }
    if (query && query.trim()) {
      params.title = query.trim()
    } else {
      params['order[followedCount]'] = 'desc'
    }

    if (lang && lang !== 'all') {
      params['availableTranslatedLanguage[]'] = [lang]
    }

    const res = await axios.get('https://api.mangadex.org/manga', {
      params,
      timeout: 15000,
      headers: {
        'User-Agent': 'NexEo-LocalApp/1.0'
      }
    })

    const data = res.data?.data || []
    return data.map((item: any) => {
      const attrs = item.attributes || {}
      const titleObj = attrs.title || {}
      const title = titleObj[lang] || titleObj['en'] || titleObj['ja-ro'] || Object.values(titleObj)[0] || 'Unknown Title'

      const descObj = attrs.description || {}
      const description = descObj[lang] || descObj['en'] || Object.values(descObj)[0] || ''

      // Relationships
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

      const cover = coverFile ? `https://uploads.mangadex.org/covers/${item.id}/${coverFile}.256.jpg` : null
      const tags = (attrs.tags || []).map((t: any) => t.attributes?.name?.en || '').filter(Boolean)

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || item.id

      return {
        id: item.id,
        title,
        slug,
        cover,
        author,
        description,
        status: attrs.status || 'ongoing',
        tags,
        provider: 'mangadex' as const,
        availableLanguages: attrs.availableTranslatedLanguages || []
      }
    })
  } catch (err: any) {
    console.error('[MangaDex Search Error]', err.message)
    return []
  }
}

export async function getMangaDexDetail(mangaId: string, lang = 'id'): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  try {
    // 1. Fetch Manga Metadata
    const mangaRes = await axios.get(`https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art&includes[]=author`, {
      timeout: 15000,
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

    const cover = coverFile ? `https://uploads.mangadex.org/covers/${item.id}/${coverFile}.512.jpg` : null
    const tags = (attrs.tags || []).map((t: any) => t.attributes?.name?.en || '').filter(Boolean)
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || item.id

    const manga: OnlineMangaItem = {
      id: item.id,
      title,
      slug,
      cover,
      author,
      description,
      status: attrs.status || 'ongoing',
      tags,
      provider: 'mangadex',
      availableLanguages: attrs.availableTranslatedLanguages || []
    }

    // 2. Fetch Chapters Feed (Indonesian priority or fallback)
    const feedParams: any = {
      limit: 300,
      'order[chapter]': 'asc',
      'includes[]': ['scanlation_group']
    }
    if (lang && lang !== 'all') {
      feedParams['translatedLanguage[]'] = [lang]
    }

    const feedRes = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`, {
      params: feedParams,
      timeout: 15000,
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

    return { manga, chapters }
  } catch (err: any) {
    console.error('[MangaDex Detail Error]', err.message)
    return null
  }
}

export async function getMangaDexChapterPages(chapterId: string): Promise<string[]> {
  try {
    const res = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`, {
      timeout: 15000,
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
// 2. DOWNLOAD ENGINE TO LOCAL DISK (data/manga/[slug]/[chapter])
// -------------------------------------------------------------
export async function downloadChapterToLocal(options: {
  mangaTitle: string
  mangaSlug: string
  chapterNum: string
  chapterTitle: string
  coverUrl?: string | null
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
          const coverRes = await axios.get(coverUrl, { responseType: 'arraybuffer', timeout: 15000 })
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

    // Download each page image
    for (let i = 0; i < pageUrls.length; i++) {
      const pageUrl = pageUrls[i]
      const ext = path.extname(pageUrl.split('?')[0]) || '.jpg'
      const pageFileName = `${(i + 1).toString().padStart(3, '0')}${ext}`
      const pageFilePath = path.join(chapterDir, pageFileName)

      if (!fs.existsSync(pageFilePath)) {
        const pageRes = await axios.get(pageUrl, {
          responseType: 'arraybuffer',
          timeout: 20000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Referer': 'https://mangadex.org/'
          }
        })
        fs.writeFileSync(pageFilePath, Buffer.from(pageRes.data))
      }
    }

    return { success: true, path: chapterDir }
  } catch (err: any) {
    console.error('[Manga Download Error]', err.message)
    return { success: false, error: err.message }
  }
}
