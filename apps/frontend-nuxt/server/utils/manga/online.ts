import fs from 'fs'
import path from 'path'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { serverConfig } from '../config'

export type MangaProviderType = 'mangadex' | 'westmanga' | 'komiku' | 'komikcast'

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
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
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
// 2. WESTMANGA PROVIDER (INDONESIAN SCANLATION SPECIALIST)
// -------------------------------------------------------------
const WESTMANGA_BASE = 'https://westmanga.fun'

export async function searchWestManga(query: string): Promise<OnlineMangaItem[]> {
  const cacheKey = `westmanga_${query.trim().toLowerCase()}`
  const now = Date.now()
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  try {
    const url = query && query.trim() 
      ? `${WESTMANGA_BASE}/?s=${encodeURIComponent(query.trim())}`
      : `${WESTMANGA_BASE}/manga/`

    const res = await axios.get(url, {
      timeout: 12000,
      headers: { ...DEFAULT_HEADERS, 'Referer': WESTMANGA_BASE }
    })

    const $ = cheerio.load(res.data)
    const results: OnlineMangaItem[] = []

    $('.listupd .bs, .listupd .bsx').each((_, el) => {
      const a = $(el).find('a').first()
      const link = a.attr('href') || ''
      const title = $(el).find('.tt, .bigor .tt, h4').first().text().trim() || a.attr('title') || ''
      const img = $(el).find('img').first()
      const cover = img.attr('data-src') || img.attr('src') || null
      const status = $(el).find('.status, .type').first().text().trim() || 'Ongoing'

      if (title && link) {
        const id = Buffer.from(link).toString('base64url')
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || id

        results.push({
          id,
          title,
          slug,
          cover,
          author: 'WestManga Team',
          description: 'Komik terjemahan Bahasa Indonesia dari WestManga.',
          status,
          tags: ['Manhwa', 'Indonesia', 'WestManga'],
          provider: 'westmanga',
          availableLanguages: ['id'],
          url: link
        })
      }
    })

    searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL })
    return results
  } catch (err: any) {
    console.error('[WestManga Search Error]', err.message)
    return []
  }
}

export async function getWestMangaDetail(mangaIdOrUrl: string): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  const cacheKey = `westmanga_detail_${mangaIdOrUrl}`
  const now = Date.now()
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  try {
    let url = mangaIdOrUrl
    if (!url.startsWith('http')) {
      url = Buffer.from(mangaIdOrUrl, 'base64url').toString('utf-8')
    }

    const res = await axios.get(url, {
      timeout: 12000,
      headers: { ...DEFAULT_HEADERS, 'Referer': WESTMANGA_BASE }
    })

    const $ = cheerio.load(res.data)
    const title = $('.entry-title, .infox h1, h1.title').first().text().trim() || 'Unknown Manga'
    const imgEl = $('.thumb img, .infox img').first()
    const cover = imgEl.attr('data-src') || imgEl.attr('src') || null
    const desc = $('.desc, .sinopsis, .entry-content p').first().text().trim() || 'Sinopsis belum tersedia.'
    const author = $('.infotable tr:contains("Author"), .spe span:contains("Author")').text().replace(/Author\s*:/i, '').trim() || 'WestManga'

    const tags: string[] = []
    $('.genres a, .mgen a, .seriestagenre a').each((_, el) => {
      const t = $(el).text().trim()
      if (t) tags.push(t)
    })

    const chapters: OnlineMangaChapter[] = []
    $('.clx li, .eplister li, #chapterlist li').each((_, el) => {
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

    // Sort ascending by chapter number
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
      provider: 'westmanga',
      availableLanguages: ['id'],
      chapterCount: chapters.length,
      url
    }

    const result = { manga, chapters }
    detailCache.set(cacheKey, { data: result, expiry: now + CACHE_TTL })
    return result
  } catch (err: any) {
    console.error('[WestManga Detail Error]', err.message)
    return null
  }
}

export async function getWestMangaChapterPages(chapterIdOrUrl: string): Promise<string[]> {
  try {
    let url = chapterIdOrUrl
    if (!url.startsWith('http')) {
      url = Buffer.from(chapterIdOrUrl, 'base64url').toString('utf-8')
    }

    const res = await axios.get(url, {
      timeout: 12000,
      headers: { ...DEFAULT_HEADERS, 'Referer': WESTMANGA_BASE }
    })

    const $ = cheerio.load(res.data)
    const images: string[] = []

    // 1. Check for inline JSON script (ts_reader)
    const scriptContent = $('script:contains("ts_reader")').html() || ''
    if (scriptContent) {
      const match = scriptContent.match(/ts_reader\.run\((.*?)\);/s)
      if (match && match[1]) {
        try {
          const json = JSON.parse(match[1])
          if (json.sources?.[0]?.images) {
            return json.sources[0].images
          }
        } catch {}
      }
    }

    // 2. Parse HTML readerarea images
    $('#readerarea img').each((_, el) => {
      const src = $(el).attr('data-src') || $(el).attr('src') || ''
      if (src && src.startsWith('http') && !src.includes('banner') && !src.includes('iklan')) {
        images.push(src.trim())
      }
    })

    return images
  } catch (err: any) {
    console.error('[WestManga Pages Error]', err.message)
    return []
  }
}

// -------------------------------------------------------------
// 3. KOMIKU.ID PROVIDER (POPULAR JAPANESE MANGA IN ID)
// -------------------------------------------------------------
const KOMIKU_BASE = 'https://komiku.id'

export async function searchKomiku(query: string): Promise<OnlineMangaItem[]> {
  const cacheKey = `komiku_${query.trim().toLowerCase()}`
  const now = Date.now()
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey)!
    if (cached.expiry > now) return cached.data
  }

  try {
    const url = query && query.trim()
      ? `https://api.komiku.id/manga/page/1/?s=${encodeURIComponent(query.trim())}`
      : `https://komiku.id/daftar-komik/`

    const res = await axios.get(url, {
      timeout: 12000,
      headers: { ...DEFAULT_HEADERS, 'Referer': KOMIKU_BASE }
    })

    const $ = cheerio.load(res.data)
    const results: OnlineMangaItem[] = []

    $('.bvl, .animepost').each((_, el) => {
      const a = $(el).find('a').first()
      const link = a.attr('href') || ''
      const title = $(el).find('h3, .title, h4').first().text().trim() || a.attr('title') || ''
      const img = $(el).find('img').first()
      const cover = img.attr('data-src') || img.attr('src') || null

      if (title && link) {
        const id = Buffer.from(link.startsWith('http') ? link : `${KOMIKU_BASE}${link}`).toString('base64url')
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || id

        results.push({
          id,
          title,
          slug,
          cover,
          author: 'Komiku Author',
          description: 'Manga terjemahan Bahasa Indonesia dari Komiku.id.',
          status: 'Ongoing',
          tags: ['Manga', 'Komiku.id', 'Indonesia'],
          provider: 'komiku',
          availableLanguages: ['id'],
          url: link.startsWith('http') ? link : `${KOMIKU_BASE}${link}`
        })
      }
    })

    searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL })
    return results
  } catch (err: any) {
    console.error('[Komiku Search Error]', err.message)
    return []
  }
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
      url = Buffer.from(mangaIdOrUrl, 'base64url').toString('utf-8')
    }

    const res = await axios.get(url, {
      timeout: 12000,
      headers: { ...DEFAULT_HEADERS, 'Referer': KOMIKU_BASE }
    })

    const $ = cheerio.load(res.data)
    const title = $('#Judul h1, h1.entry-title').first().text().trim() || 'Unknown Manga'
    const imgEl = $('.ims img, .thumb img').first()
    const cover = imgEl.attr('data-src') || imgEl.attr('src') || null
    const desc = $('.desc, .sinopsis, p.desc').first().text().trim() || 'Sinopsis belum tersedia.'
    const author = $('.informasi table tr:contains("Penulis") td:last-child').text().trim() || 'Komiku'

    const tags: string[] = []
    $('.genre li a').each((_, el) => {
      const t = $(el).text().trim()
      if (t) tags.push(t)
    })

    const chapters: OnlineMangaChapter[] = []
    $('#Daftar_Chapter tbody tr, .chapter-list li').each((_, el) => {
      const a = $(el).find('a').first()
      const chUrl = a.attr('href') || ''
      const chTitle = a.text().trim() || $(el).find('.judulseries').text().trim()
      const date = $(el).find('.tanggal, .date').text().trim()

      if (chUrl && chTitle) {
        const fullChUrl = chUrl.startsWith('http') ? chUrl : `${KOMIKU_BASE}${chUrl}`
        const numMatch = chTitle.match(/\d+(\.\d+)?/)
        const chapterNum = numMatch ? numMatch[0] : String(chapters.length + 1)
        const chId = Buffer.from(fullChUrl).toString('base64url')

        chapters.push({
          id: chId,
          chapter: chapterNum,
          title: chTitle,
          language: 'id',
          publishDate: date,
          scanlationGroup: 'Komiku.id',
          url: fullChUrl
        })
      }
    })

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
      headers: { ...DEFAULT_HEADERS, 'Referer': KOMIKU_BASE }
    })

    const $ = cheerio.load(res.data)
    const images: string[] = []

    $('#Baca_Komik img, .main-reading-area img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src') || ''
      if (src && src.startsWith('http') && !src.includes('banner')) {
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
// 4. UNIFIED MULTI-PROVIDER ROUTER
// -------------------------------------------------------------
export async function searchUniversalManga(query: string, provider: MangaProviderType = 'mangadex', lang = 'id'): Promise<OnlineMangaItem[]> {
  if (provider === 'westmanga') {
    return searchWestManga(query)
  }
  if (provider === 'komiku') {
    return searchKomiku(query)
  }
  return searchMangaDex(query, lang)
}

export async function getUniversalMangaDetail(id: string, provider: MangaProviderType = 'mangadex', lang = 'id'): Promise<{ manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } | null> {
  if (provider === 'westmanga') {
    return getWestMangaDetail(id)
  }
  if (provider === 'komiku') {
    return getKomikuDetail(id)
  }
  return getMangaDexDetail(id, lang)
}

export async function getUniversalChapterPages(chapterId: string, provider: MangaProviderType = 'mangadex'): Promise<string[]> {
  if (provider === 'westmanga') {
    return getWestMangaChapterPages(chapterId)
  }
  if (provider === 'komiku') {
    return getKomikuChapterPages(chapterId)
  }
  return getMangaDexChapterPages(chapterId)
}

// -------------------------------------------------------------
// 5. HIGH-SPEED CONCURRENT DOWNLOADER
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
              'Referer': current.referer || 'https://mangadex.org/'
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

    const referer = provider === 'westmanga' 
      ? WESTMANGA_BASE 
      : (provider === 'komiku' ? KOMIKU_BASE : 'https://mangadex.org/')

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
