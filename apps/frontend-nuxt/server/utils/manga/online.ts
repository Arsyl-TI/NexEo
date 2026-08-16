import fs from 'fs'
import path from 'path'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { serverConfig } from '../config'

export type MangaProviderType = 'mangadex' | 'westmanga' | 'komiku' | 'mikoroku'

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
  provider: MangaProviderType
  availableLanguages: string[]
  chapterCount?: number
  url?: string
}

export interface OnlineMangaChapter {
  id: string
  chapter: string
  title: string
  language: string
  publishDate?: string
  scanlationGroup?: string
  url?: string
}

// In-memory High Performance Caches
const searchCache = new Map<string, { data: OnlineMangaItem[]; expiry: number }>()
const detailCache = new Map<string, { data: { manga: OnlineMangaItem; chapters: OnlineMangaChapter[] }; expiry: number }>()
const CACHE_TTL = 15 * 60 * 1000 // 15 Minutes

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'id,en-US;q=0.9,en;q=0.8'
}

// -------------------------------------------------------------
// 1. MANGADEX OFFICIAL API PROVIDER
// -------------------------------------------------------------
export async function searchMangaDex(query: string, lang = 'id'): Promise<OnlineMangaItem[]> {
  const cacheKey = `mangadex_${query.trim().toLowerCase()}_${lang}`
  const now = Date.now()
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
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
      headers: { 'User-Agent': 'NexEo-LocalApp/1.0' }
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
  const cacheKey = `mangadex_${mangaId}_${lang}`
  const now = Date.now()
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  try {
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
// 2. KOMIKU (KOMIKU.ORG / KOMIKU.ID / KOMIKU.COM.ID)
// -------------------------------------------------------------
const KOMIKU_DOMAINS = [
  'https://komiku.org',
  'https://komiku.id',
  'https://komiku.com.id'
]
const KOMIKU_HOST = KOMIKU_DOMAINS[0]

export async function searchKomiku(query: string): Promise<OnlineMangaItem[]> {
  const cacheKey = `komiku_${query.trim().toLowerCase()}`
  const now = Date.now()
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  for (const domain of KOMIKU_DOMAINS) {
    try {
      const searchUrls = query && query.trim()
        ? [
            `${domain}/?post_type=manga&s=${encodeURIComponent(query.trim())}`,
            `${domain}/?s=${encodeURIComponent(query.trim())}`,
            `https://api.komiku.org/?s=${encodeURIComponent(query.trim())}`
          ]
        : [
            `${domain}/other/hot/`,
            `${domain}/pustaka/?orderby=date`,
            `${domain}/manga/`
          ]

      for (const searchUrl of searchUrls) {
        try {
          const res = await axios.get(searchUrl, {
            timeout: 8000,
            headers: { ...DEFAULT_HEADERS, 'Referer': `${domain}/` }
          })
          if (!res.data || typeof res.data !== 'string') continue

          const $ = cheerio.load(res.data)
          const results: OnlineMangaItem[] = []

          $('.bge, .bvl, .ls4, .ls23, .kan, .listupd > div, .bgei, article, .item').each((_, el) => {
            const a = $(el).find('.kan a, .bgei a, h3 a, h4 a, a').first()
            let link = a.attr('href') || ''
            const title = $(el).find('h3, h4, .title, .kan h3').first().text().trim() || a.attr('title') || ''
            const img = $(el).find('img').first()
            const cover = img.attr('data-src') || img.attr('src') || img.attr('data-lazy-src') || null
            const desc = $(el).find('p, .desc').first().text().trim() || 'Komik Bahasa Indonesia'

            if (title && link && title.length > 1) {
              if (!link.startsWith('http')) link = `${domain}${link}`
              const id = Buffer.from(link).toString('base64url')
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || id

              if (!results.some(r => r.title === title || r.url === link)) {
                results.push({
                  id,
                  title,
                  slug,
                  cover,
                  author: 'Komiku Author',
                  description: desc,
                  status: 'Ongoing',
                  tags: ['Manga', 'Komiku', 'Bahasa Indonesia'],
                  provider: 'komiku',
                  availableLanguages: ['id'],
                  url: link
                })
              }
            }
          })

          if (results.length > 0) {
            searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL })
            return results
          }
        } catch {}
      }
    } catch {}
  }

  // Backup fallback: Use Mikoroku catalog items tagged strictly with provider: 'komiku'
  const mikorokuResults = await searchMikoroku(query)
  const mappedResults = mikorokuResults.map(item => ({
    ...item,
    provider: 'komiku' as const
  }))
  searchCache.set(cacheKey, { data: mappedResults, expiry: now + CACHE_TTL })
  return mappedResults
}

export async function getKomikuDetail(mangaIdOrUrl: string): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  const cacheKey = `komiku_detail_${mangaIdOrUrl}`
  const now = Date.now()
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  try {
    let url = mangaIdOrUrl
    if (!url.startsWith('http')) {
      try {
        url = Buffer.from(mangaIdOrUrl, 'base64url').toString('utf-8')
      } catch {
        url = mangaIdOrUrl
      }
    }

    if (!url.startsWith('http')) {
      // Delegate to Mikoroku detail for non-HTTP fallback IDs
      const mikorokuDetail = await getMikorokuDetail(mangaIdOrUrl)
      if (mikorokuDetail) {
        mikorokuDetail.manga.provider = 'komiku'
        detailCache.set(cacheKey, { data: mikorokuDetail, expiry: now + CACHE_TTL })
        return mikorokuDetail
      }
    }

    const res = await axios.get(url, {
      timeout: 12000,
      headers: { ...DEFAULT_HEADERS, 'Referer': KOMIKU_HOST }
    })

    const $ = cheerio.load(res.data)
    const title = $('#Judul h1, h1.entry-title, h1').first().text().trim() || 'Unknown Manga'
    const imgEl = $('.ims img, .thumb img').first()
    const cover = imgEl.attr('data-src') || imgEl.attr('src') || null
    const desc = $('.desc, .sinopsis, p.desc').first().text().trim() || 'Sinopsis komik Bahasa Indonesia.'
    const author = $('.informasi table tr:contains("Penulis") td:last-child').text().trim() || 'Komiku'

    const tags: string[] = []
    $('.genre li a, .genres a').each((_, el) => {
      const t = $(el).text().trim()
      if (t) tags.push(t)
    })

    const chapters: OnlineMangaChapter[] = []
    $('#Daftar_Chapter tr, .judulseries').each((_, el) => {
      const chA = $(el).find('a').first()
      const chUrl = chA.attr('href') || ''
      const chTitle = chA.text().trim() || chA.attr('title') || $(el).text().trim()
      const date = $(el).find('.tanggal, .date').text().trim()

      if (chUrl && chTitle && !chUrl.includes('iklan')) {
        const fullChUrl = chUrl.startsWith('http') ? chUrl : `${KOMIKU_HOST}${chUrl}`
        const numMatch = chTitle.match(/\d+(\.\d+)?/)
        const chapterNum = numMatch ? numMatch[0] : String(chapters.length + 1)
        const chId = Buffer.from(fullChUrl).toString('base64url')

        chapters.push({
          id: chId,
          chapter: chapterNum,
          title: chTitle.replace(/\s+/g, ' '),
          language: 'id',
          publishDate: date,
          scanlationGroup: 'Komiku.id',
          url: fullChUrl
        })
      }
    })

    // Sort ascending
    chapters.sort((a, b) => parseFloat(a.chapter || '0') - parseFloat(b.chapter || '0'))

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || mangaIdOrUrl
    const manga: OnlineMangaItem = {
      id: mangaIdOrUrl,
      title,
      slug,
      cover,
      author,
      description: desc,
      status: 'ongoing',
      tags,
      provider: 'komiku',
      availableLanguages: ['id'],
      chapterCount: chapters.length,
      url
    }

    const result = { manga, chapters }
    detailCache.set(cacheKey, { data: result, expiry: now + CACHE_TTL })
    return result
  } catch (err: any) {
    console.error('[Komiku Detail Error]', err.message)
    const mikorokuDetail = await getMikorokuDetail(mangaIdOrUrl)
    if (mikorokuDetail) {
      mikorokuDetail.manga.provider = 'komiku'
      return mikorokuDetail
    }
    return null
  }
}

export async function getKomikuChapterPages(chapterIdOrUrl: string): Promise<string[]> {
  try {
    let url = chapterIdOrUrl
    if (!url.startsWith('http')) {
      url = Buffer.from(chapterIdOrUrl, 'base64url').toString('utf-8')
    }

    const res = await axios.get(url, {
      timeout: 12000,
      headers: { ...DEFAULT_HEADERS, 'Referer': KOMIKU_HOST }
    })

    const $ = cheerio.load(res.data)
    const images: string[] = []

    $('#Baca_Komik img, .main-reading-area img, .chapter-image img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src') || ''
      if (src && src.startsWith('http') && !src.includes('banner') && !src.includes('iklan')) {
        images.push(src.trim())
      }
    })

    return images
  } catch (err: any) {
    console.error('[Komiku Pages Error]', err.message)
    return []
  }
}

// -------------------------------------------------------------
// 3. MIKOROKU (MIKOROKU.COM / MIKOROKU.TOP)
// -------------------------------------------------------------
const MIKOROKU_DB_URL = 'https://raw.githubusercontent.com/moemaomao/mymangadata/main/all-manga.json'

let mikorokuCatalogCache: any[] | null = null
let mikorokuCatalogExpiry = 0

async function fetchMikorokuCatalog(): Promise<any[]> {
  const now = Date.now()
  if (mikorokuCatalogCache && mikorokuCatalogExpiry > now) {
    return mikorokuCatalogCache
  }
  try {
    const res = await axios.get(MIKOROKU_DB_URL, { timeout: 10000 })
    if (Array.isArray(res.data)) {
      mikorokuCatalogCache = res.data
      mikorokuCatalogExpiry = now + CACHE_TTL
      return res.data
    }
  } catch (err: any) {
    console.error('[Mikoroku DB Error]', err.message)
  }
  return mikorokuCatalogCache || []
}

export async function searchMikoroku(query: string): Promise<OnlineMangaItem[]> {
  const cacheKey = `mikoroku_${query.trim().toLowerCase()}`
  const now = Date.now()
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  try {
    const catalog = await fetchMikorokuCatalog()
    const q = query.trim().toLowerCase()

    const filtered = q
      ? catalog.filter(m => 
          m.title?.toLowerCase().includes(q) || 
          m.altTitle?.toLowerCase().includes(q) ||
          m.slug?.toLowerCase().includes(q) ||
          m.desc?.toLowerCase().includes(q)
        )
      : catalog

    const results: OnlineMangaItem[] = filtered.map(item => {
      const title = item.title || 'Untitled'
      const slug = item.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      let cover = item.img || item.cover || null
      if (cover && !cover.startsWith('http')) {
        cover = `https://mikoroku.com/${cover}`
      }

      return {
        id: slug,
        title,
        slug,
        cover,
        author: item.author || item.artist || 'Mikoroku',
        description: item.desc || item.synopsis || 'Komik Bahasa Indonesia dari Mikoroku.',
        status: item.status || 'Ongoing',
        tags: Array.isArray(item.genres) ? item.genres : ['Manga', 'Mikoroku', 'Bahasa Indonesia'],
        provider: 'mikoroku',
        availableLanguages: ['id'],
        url: `https://mikoroku.com/detail?slug=${slug}`
      }
    })

    searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL })
    return results
  } catch (err: any) {
    console.error('[Mikoroku Search Error]', err.message)
    return []
  }
}

export async function getMikorokuDetail(slug: string): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  const cacheKey = `mikoroku_detail_${slug}`
  const now = Date.now()
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  try {
    const catalog = await fetchMikorokuCatalog()
    const item = catalog.find(m => m.slug === slug || m.title?.toLowerCase() === slug.replace(/-/g, ' '))
    if (!item) return null

    const title = item.title || slug
    let cover = item.img || item.cover || null
    if (cover && !cover.startsWith('http')) {
      cover = `https://mikoroku.com/${cover}`
    }

    const feedUrl = `https://www.mikoroku.top/feeds/posts/default?alt=json&max-results=200&q=${encodeURIComponent(title)}`
    const feedRes = await axios.get(feedUrl, { timeout: 10000 })
    const entries = feedRes.data?.feed?.entry || []

    const chapters: OnlineMangaChapter[] = entries.map((e: any, idx: number) => {
      const chTitle = e.title?.$t || `Chapter ${idx + 1}`
      const contentHtml = e.content?.$t || e.summary?.$t || ''
      const numMatch = chTitle.match(/chapter\s*(\d+(\.\d+)?)/i) || chTitle.match(/\bch\b\.?\s*(\d+(\.\d+)?)/i) || chTitle.match(/\d+/)
      const chapterNum = numMatch ? numMatch[1] || numMatch[0] : String(idx + 1)

      const chPayload = JSON.stringify({ title: chTitle, html: contentHtml })
      const chId = Buffer.from(chPayload).toString('base64url')

      return {
        id: chId,
        chapter: chapterNum,
        title: chTitle,
        language: 'id',
        publishDate: e.published?.$t || e.updated?.$t,
        scanlationGroup: 'Mikoroku'
      }
    })

    chapters.sort((a, b) => parseFloat(a.chapter || '0') - parseFloat(b.chapter || '0'))

    const manga: OnlineMangaItem = {
      id: slug,
      title,
      slug,
      cover,
      author: item.author || 'Mikoroku',
      description: item.desc || 'Komik Bahasa Indonesia dari Mikoroku.',
      status: item.status || 'ongoing',
      tags: Array.isArray(item.genres) ? item.genres : ['Manga', 'Mikoroku'],
      provider: 'mikoroku',
      availableLanguages: ['id'],
      chapterCount: chapters.length,
      url: `https://mikoroku.com/detail?slug=${slug}`
    }

    const result = { manga, chapters }
    detailCache.set(cacheKey, { data: result, expiry: now + CACHE_TTL })
    return result
  } catch (err: any) {
    console.error('[Mikoroku Detail Error]', err.message)
    return null
  }
}

export async function getMikorokuChapterPages(chapterId: string): Promise<string[]> {
  try {
    const raw = Buffer.from(chapterId, 'base64url').toString('utf-8')
    const payload = JSON.parse(raw)
    const html = payload.html || ''

    const $ = cheerio.load(html)
    const images: string[] = []

    $('img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src') || ''
      if (src && src.startsWith('http') && !src.includes('banner')) {
        images.push(src.trim())
      }
    })

    return images
  } catch (err: any) {
    console.error('[Mikoroku Pages Error]', err.message)
    return []
  }
}

// -------------------------------------------------------------
// 4. WESTMANGA MULTI-MIRROR PROVIDER
// (westmanga.info, westmanga.fun, westmanga.co, v1.westmanga.my, v1.westmanga.top, westmanga.me)
// -------------------------------------------------------------
const WESTMANGA_MIRRORS = [
  'https://westmanga.info',
  'https://westmanga.fun',
  'https://westmanga.co',
  'https://v1.westmanga.my',
  'https://v1.westmanga.top',
  'https://westmanga.me'
]

export async function searchWestManga(query: string): Promise<OnlineMangaItem[]> {
  const cacheKey = `westmanga_${query.trim().toLowerCase()}`
  const now = Date.now()
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  for (const mirror of WESTMANGA_MIRRORS) {
    try {
      const urlsToTry = query && query.trim()
        ? [
            `${mirror}/?s=${encodeURIComponent(query.trim())}`,
            `${mirror}/contents?q=${encodeURIComponent(query.trim())}`,
            `${mirror}/search?s=${encodeURIComponent(query.trim())}`
          ]
        : [
            `${mirror}/manga/?order=latest`,
            `${mirror}/manga/?page=1`,
            `${mirror}/project-list/`,
            `${mirror}/contents`
          ]

      for (const url of urlsToTry) {
        try {
          const res = await axios.get(url, {
            timeout: 7000,
            headers: { ...DEFAULT_HEADERS, 'Referer': `${mirror}/` }
          })
          if (!res.data || typeof res.data !== 'string') continue

          const $ = cheerio.load(res.data)
          const results: OnlineMangaItem[] = []

          $('article, .card, .grid > div, .bs, .bsx, .listupd > div, .utao, .uta, .animepos, .post-item').each((_, el) => {
            const a = $(el).find('a').first()
            let link = a.attr('href') || ''
            const title = $(el).find('h2, h3, h4, .tt, .title').first().text().trim() || a.attr('title') || ''
            const img = $(el).find('img').first()
            const cover = img.attr('data-src') || img.attr('src') || img.attr('data-lazy-src') || null

            if (title && link && title.length > 1) {
              if (!link.startsWith('http')) link = `${mirror}${link}`
              const id = Buffer.from(link).toString('base64url')
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || id

              if (!results.some(r => r.title === title || r.url === link)) {
                results.push({
                  id,
                  title,
                  slug,
                  cover,
                  author: 'WestManga',
                  description: 'Komik Manhwa/Manga Bahasa Indonesia dari WestManga.',
                  status: 'Ongoing',
                  tags: ['Manhwa', 'WestManga', 'Bahasa Indonesia'],
                  provider: 'westmanga',
                  availableLanguages: ['id'],
                  url: link
                })
              }
            }
          })

          if (results.length > 0) {
            searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL })
            return results
          }
        } catch {}
      }
    } catch {}
  }

  // Backup fallback: Use Mikoroku catalog items tagged strictly with provider: 'westmanga'
  const mikorokuResults = await searchMikoroku(query)
  const mappedResults = mikorokuResults.map(item => ({
    ...item,
    provider: 'westmanga' as const
  }))
  searchCache.set(cacheKey, { data: mappedResults, expiry: now + CACHE_TTL })
  return mappedResults
}

export async function getWestMangaDetail(mangaIdOrUrl: string): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  let url = mangaIdOrUrl
  if (!url.startsWith('http')) {
    try {
      url = Buffer.from(mangaIdOrUrl, 'base64url').toString('utf-8')
    } catch {
      url = mangaIdOrUrl
    }
  }

  if (!url.startsWith('http')) {
    // Delegate to Mikoroku detail for non-HTTP fallback IDs
    const mikorokuDetail = await getMikorokuDetail(mangaIdOrUrl)
    if (mikorokuDetail) {
      mikorokuDetail.manga.provider = 'westmanga'
      return mikorokuDetail
    }
  }

  for (const mirror of WESTMANGA_MIRRORS) {
    try {
      const res = await axios.get(url, {
        timeout: 8000,
        headers: { ...DEFAULT_HEADERS, 'Referer': `${mirror}/` }
      })

      const $ = cheerio.load(res.data)
      const title = $('.entry-title, .infox h1, h1').first().text().trim()
      if (!title) continue

      const imgEl = $('.thumb img, .infox img').first()
      const cover = imgEl.attr('data-src') || imgEl.attr('src') || null
      const desc = $('.desc, .sinopsis, p').first().text().trim()

      const chapters: OnlineMangaChapter[] = []
      $('.clx li, .eplister li, #chapterlist li, .chapter-list li').each((_, el) => {
        const a = $(el).find('a').first()
        const chUrl = a.attr('href') || ''
        const chTitle = $(el).find('.chapternum, .epl-num').first().text().trim() || a.text().trim()
        const date = $(el).find('.chapterdate, .epl-date').first().text().trim() || ''

        if (chUrl && chTitle) {
          const numMatch = chTitle.match(/\d+(\.\d+)?/)
          const chapterNum = numMatch ? numMatch[0] : String(chapters.length + 1)
          const chId = Buffer.from(chUrl).toString('base64url')

          chapters.push({
            id: chId,
            chapter: chapterNum,
            title: chTitle,
            language: 'id',
            publishDate: date,
            scanlationGroup: 'WestManga',
            url: chUrl
          })
        }
      })

      if (chapters.length > 0) {
        chapters.sort((a, b) => parseFloat(a.chapter || '0') - parseFloat(b.chapter || '0'))
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || mangaIdOrUrl
        return {
          manga: {
            id: mangaIdOrUrl,
            title,
            slug,
            cover,
            author: 'WestManga',
            description: desc || 'Komik Bahasa Indonesia',
            status: 'ongoing',
            tags: ['Manhwa', 'WestManga'],
            provider: 'westmanga',
            availableLanguages: ['id'],
            chapterCount: chapters.length,
            url
          },
          chapters
        }
      }
    } catch {}
  }

  // Backup fallback to Mikoroku detail tagged with westmanga
  const mikorokuDetail = await getMikorokuDetail(mangaIdOrUrl)
  if (mikorokuDetail) {
    mikorokuDetail.manga.provider = 'westmanga'
    return mikorokuDetail
  }
  return null
}

export async function getWestMangaChapterPages(chapterIdOrUrl: string): Promise<string[]> {
  let url = chapterIdOrUrl
  if (!url.startsWith('http')) {
    url = Buffer.from(chapterIdOrUrl, 'base64url').toString('utf-8')
  }

  for (const mirror of WESTMANGA_MIRRORS) {
    try {
      const res = await axios.get(url, {
        timeout: 8000,
        headers: { ...DEFAULT_HEADERS, 'Referer': `${mirror}/` }
      })

      const $ = cheerio.load(res.data)
      const images: string[] = []

      $('#readerarea img, .chapter-image img, .reading-content img').each((_, el) => {
        const src = $(el).attr('data-src') || $(el).attr('src') || ''
        if (src && src.startsWith('http') && !src.includes('banner')) {
          images.push(src.trim())
        }
      })

      if (images.length > 0) return images
    } catch {}
  }

  return getKomikuChapterPages(chapterIdOrUrl)
}

// -------------------------------------------------------------
// 5. UNIFIED MULTI-PROVIDER ROUTER
// -------------------------------------------------------------
export async function searchUniversalManga(query: string, provider: MangaProviderType = 'mangadex', lang = 'id'): Promise<OnlineMangaItem[]> {
  if (provider === 'mikoroku') {
    return searchMikoroku(query)
  }
  if (provider === 'westmanga') {
    return searchWestManga(query)
  }
  if (provider === 'komiku') {
    return searchKomiku(query)
  }
  return searchMangaDex(query, lang)
}

export async function getUniversalMangaDetail(id: string, provider: MangaProviderType = 'mangadex', lang = 'id'): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  if (provider === 'mikoroku') {
    return getMikorokuDetail(id)
  }
  if (provider === 'westmanga') {
    return getWestMangaDetail(id)
  }
  if (provider === 'komiku') {
    return getKomikuDetail(id)
  }
  return getMangaDexDetail(id, lang)
}

export async function getUniversalChapterPages(chapterId: string, provider: MangaProviderType = 'mangadex'): Promise<string[]> {
  if (provider === 'mikoroku') {
    return getMikorokuChapterPages(chapterId)
  }
  if (provider === 'westmanga') {
    return getWestMangaChapterPages(chapterId)
  }
  if (provider === 'komiku') {
    return getKomikuChapterPages(chapterId)
  }
  return getMangaDexChapterPages(chapterId)
}

// -------------------------------------------------------------
// 6. HIGH-SPEED CONCURRENT DOWNLOAD ENGINE (POOL OF 4 WORKERS)
// -------------------------------------------------------------
async function downloadWorker(urls: { url: string; dest: string; referer?: string }[], concurrency = 4): Promise<void> {
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
              'User-Agent': DEFAULT_HEADERS['User-Agent'],
              'Referer': current.referer || 'https://mikoroku.com/'
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
  author?: string
  description?: string
  pageUrls: string[]
  provider?: MangaProviderType
}): Promise<{ success: boolean; path?: string; error?: string }> {
  const { mangaTitle, mangaSlug, chapterNum, coverUrl, author, description, pageUrls, provider } = options

  try {
    const mangaDir = path.join(serverConfig.manga.dir, mangaSlug)
    if (!fs.existsSync(mangaDir)) {
      fs.mkdirSync(mangaDir, { recursive: true })
    }

    // Save meta.json
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

    // Save cover
    if (coverUrl) {
      const coverPath = path.join(mangaDir, 'cover.jpg')
      if (!fs.existsSync(coverPath)) {
        try {
          const actualUrl = coverUrl.startsWith('/api') 
            ? `http://127.0.0.1:${serverConfig.port}${coverUrl}`
            : coverUrl
          const coverRes = await axios.get(actualUrl, { 
            responseType: 'arraybuffer', 
            timeout: 10000,
            headers: { 'User-Agent': DEFAULT_HEADERS['User-Agent'] }
          })
          fs.writeFileSync(coverPath, Buffer.from(coverRes.data))
        } catch {}
      }
    }

    // Prepare chapter directory
    const padNum = chapterNum.padStart(2, '0')
    const chapterDir = path.join(mangaDir, `chapter-${padNum}`)
    if (!fs.existsSync(chapterDir)) {
      fs.mkdirSync(chapterDir, { recursive: true })
    }

    const referer = provider === 'mikoroku'
      ? 'https://mikoroku.com/'
      : (provider === 'westmanga' 
        ? 'https://westmanga.co/' 
        : (provider === 'komiku' ? 'https://komiku.org/' : 'https://mangadex.org/'))

    const tasks = pageUrls.map((pageUrl, i) => {
      const ext = path.extname(pageUrl.split('?')[0]) || '.jpg'
      const pageFileName = `${(i + 1).toString().padStart(3, '0')}${ext}`
      const pageFilePath = path.join(chapterDir, pageFileName)
      return { url: pageUrl, dest: pageFilePath, referer }
    })

    await downloadWorker(tasks, 4)

    return { success: true, path: chapterDir }
  } catch (err: any) {
    console.error('[Manga Download Error]', err.message)
    return { success: false, error: err.message }
  }
}
