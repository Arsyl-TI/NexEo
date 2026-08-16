import axios from 'axios'
import * as cheerio from 'cheerio'

export interface NovelSource {
  id: string
  name: string
  url: string
}

export interface CatalogNovel {
  id: string
  slug: string
  title: string
  author?: string
  description?: string
  tags?: string[]
  cover?: string
  sourceUrl: string
}

export const NOVEL_SOURCES: NovelSource[] = [
  { id: 'sakuranovel', name: 'SakuraNovel.id (Indo)', url: 'https://sakuranovel.id' },
  { id: 'indowebnovel', name: 'Indowebnovel.id (Indo)', url: 'https://indowebnovel.id' },
  { id: 'meionovel', name: 'Meionovel.id (Indo)', url: 'https://meionovel.id' },
  { id: 'vanovel', name: 'Vanovel.com (Indo)', url: 'https://vanovel.com' },
  { id: 'bacalightnovel', name: 'BacaLightNovel (Indo)', url: 'https://bacalightnovel.co' },
  { id: 'novelbookid', name: 'NovelBookId (Indo)', url: 'https://novelbook.id' },
  { id: 'dreamy-translations', name: 'Dreamy Translations', url: 'https://dreamy-translations.com' },
  { id: 'noveldex', name: 'Noveldex', url: 'https://noveldex.io' }
]

function extractNextData(html: string): any {
  try {
    const $ = cheerio.load(html)
    const script = $('#__NEXT_DATA__').html()
    if (script) {
      return JSON.parse(script)
    }
  } catch {}
  return null
}

// ----------------------------------------------------
// 1. DREAMY TRANSLATIONS SCRAPER
// ----------------------------------------------------

export async function scrapeDreamyCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://dreamy-translations.com'
  try {
    const response = await axios.get(`${baseUrl}/series`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 30000
    })

    const html = response.data
    const libraryMap = new Map<string, CatalogNovel>()

    // Build Cover Map (id -> Supabase Cover URL)
    const coverMap = new Map<string, string>()
    const coverRegex = /\\"(\d+)\\":\\"(https:\/\/[^\\"]*?\/(?:covers|storage)\/[^\\"]+)\\"/gi
    let cMatch: RegExpExecArray | null
    while ((cMatch = coverRegex.exec(html)) !== null) {
      coverMap.set(cMatch[1], cMatch[2].replace(/\\\\/g, '').replace(/\\"/g, ''))
    }

    const directCoverMatches = [...html.matchAll(/(https:\/\/supabase\.dreamy-translations\.com\/storage\/v1\/object\/public\/covers\/\d+\/[^\\"\s<>]+)/gi)]
    for (const dMatch of directCoverMatches) {
      const cleanUrl = dMatch[1].replace(/\\/g, '')
      const idMatch = cleanUrl.match(/\/covers\/(\d+)\//)
      if (idMatch && idMatch[1] && !coverMap.has(idMatch[1])) {
        coverMap.set(idMatch[1], cleanUrl)
      }
    }

    // Extract series items (id, title, slug)
    const seriesRegex = /\\"id\\":(\d+),\\"title\\":\\"((?:\\\\.|[^\\"])*)\\",\\"slug\\":\\"([^\\"]+)\\"/g
    let sMatch: RegExpExecArray | null

    while ((sMatch = seriesRegex.exec(html)) !== null) {
      try {
        const id = sMatch[1]
        const rawTitle = sMatch[2]
        const title = JSON.parse(`"${rawTitle}"`)
        const slug = sMatch[3]
        const cover = coverMap.get(id)

        if (slug && !libraryMap.has(slug)) {
          libraryMap.set(slug, {
            id: slug,
            slug,
            title: title || `Novel ${slug}`,
            sourceUrl: `${baseUrl}/novel/${slug}`,
            cover: cover || undefined
          })
        }
      } catch {}
    }

    // Fallback Next.js __NEXT_DATA__
    const nextData = extractNextData(html)
    const seriesList = nextData?.props?.pageProps?.series || nextData?.props?.pageProps?.initialState?.series || nextData?.props?.pageProps?.novels
    if (Array.isArray(seriesList) && seriesList.length > 0) {
      for (const item of seriesList) {
        if (item.slug) {
          let cover = item.cover || item.coverUrl || item.image || (item.id ? coverMap.get(String(item.id)) : undefined)
          if (cover && !cover.startsWith('http')) {
            cover = `${baseUrl}/${cover.replace(/^\//, '')}`
          }

          const existing = libraryMap.get(item.slug)
          if (existing) {
            if (cover) existing.cover = cover
          } else {
            libraryMap.set(item.slug, {
              id: item.slug,
              slug: item.slug,
              title: item.title || `Novel ${item.slug}`,
              author: item.author,
              description: item.description,
              cover: cover || undefined,
              sourceUrl: `${baseUrl}/novel/${item.slug}`
            })
          }
        }
      }
    }

    return Array.from(libraryMap.values())
  } catch (err: any) {
    console.warn(`[CatalogScraper] Dreamy Translations unavailable: ${err?.message}`)
    return []
  }
}

export async function scrapeDreamyNovelDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string }> }> {
  const baseUrl = 'https://dreamy-translations.com'
  const sourceUrl = `${baseUrl}/novel/${slug}`

  const response = await axios.get(sourceUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    timeout: 15000
  })

  const html = response.data
  const $ = cheerio.load(html)

  let title = $('h1').first().text().trim() || slug
  let cover = $('img[src*="covers/"]').first().attr('src')
  let author = ''
  let description = ''
  const tagsSet = new Set<string>()
  const chapters: Array<{ title: string; url: string; file: string }> = []

  const nextData = extractNextData(html)
  const pageProps = nextData?.props?.pageProps
  const novelObj = pageProps?.novel || pageProps?.series || pageProps?.initialState?.novel

  if (novelObj) {
    if (novelObj.title) title = novelObj.title
    if (novelObj.author) author = novelObj.author
    if (novelObj.description) description = novelObj.description
    if (novelObj.cover) cover = novelObj.cover
    if (Array.isArray(novelObj.tags)) {
      novelObj.tags.forEach((t: any) => tagsSet.add(typeof t === 'string' ? t : t.name || ''))
    }

    if (Array.isArray(novelObj.chapters) && novelObj.chapters.length > 0) {
      novelObj.chapters.forEach((ch: any, i: number) => {
        const chTitle = ch.title || ch.name || `Chapter ${i + 1}`
        const chSlug = ch.slug || ch.id || `${i + 1}`
        const chUrl = ch.url || `${baseUrl}/read/${slug}/${chSlug}`
        chapters.push({
          title: chTitle,
          url: chUrl.startsWith('http') ? chUrl : `${baseUrl}${chUrl.startsWith('/') ? '' : '/'}${chUrl}`,
          file: `chapter-${i + 1}.json`
        })
      })
    }
  }

  if (cover && cover.startsWith('//')) cover = 'https:' + cover
  if (cover && cover.startsWith('/')) cover = baseUrl + cover

  if (!author) {
    $('p').each((_, el) => {
      const text = $(el).text().trim()
      if (text.startsWith('by ')) author = text.replace('by ', '').trim()
    })
  }

  if (!description) {
    const descEl = $('div.text-base.text-muted-foreground.leading-relaxed').first()
    description = descEl.length ? (descEl.html() || '') : ($('meta[name="description"]').attr('content') || '')
  }

  if (tagsSet.size === 0) {
    $('span.rounded-full.text-xs.font-medium').each((_, el) => {
      const tag = $(el).text().trim()
      if (tag) tagsSet.add(tag)
    })
  }

  if (chapters.length === 0) {
    $('a[href]').each((i, el) => {
      const href = $(el).attr('href') || ''
      const chTitle = $(el).text().trim() || `Chapter ${i + 1}`
      if (href.includes('/read/') || href.includes('/chapter') || (href.includes(slug) && href !== `/novel/${slug}`)) {
        const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`
        if (!chapters.some(c => c.url === fullUrl)) {
          chapters.push({
            title: chTitle,
            url: fullUrl,
            file: `chapter-${chapters.length + 1}.json`
          })
        }
      }
    })
  }

  return {
    id: slug,
    slug,
    title,
    author,
    description,
    tags: Array.from(tagsSet),
    cover: cover || undefined,
    sourceUrl,
    chapters
  }
}

// ----------------------------------------------------
// 2. NOVELDEX SCRAPER (API-POWERED PAGINATION)
// ----------------------------------------------------

export async function scrapeNoveldexCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://noveldex.io'
  const novelsMap = new Map<string, CatalogNovel>()

  // 1. Fetch paginated series from Noveldex REST API
  try {
    for (let page = 1; page <= 10; page++) {
      const res = await axios.get(`${baseUrl}/api/series?page=${page}&limit=100`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        timeout: 15000
      })

      const items = res.data?.data || res.data?.series || (Array.isArray(res.data) ? res.data : [])
      if (!Array.isArray(items) || items.length === 0) break

      let addedInThisPage = 0
      for (const item of items) {
        const slug = item.urlSlug || item.slug
        if (slug && !novelsMap.has(slug)) {
          let cover: string | undefined = undefined
          if (item.coverImage) {
            cover = item.coverImage.startsWith('http') ? item.coverImage : `${baseUrl}${item.coverImage}`
          }

          novelsMap.set(slug, {
            id: slug,
            slug,
            title: item.title || slug,
            author: item.author || undefined,
            cover,
            sourceUrl: `${baseUrl}/series/novel/${slug}`
          })
          addedInThisPage++
        }
      }

      if (addedInThisPage === 0) break
    }

    if (novelsMap.size > 0) {
      return Array.from(novelsMap.values())
    }
  } catch (err: any) {
    console.warn(`[CatalogScraper] Noveldex API error, using HTML fallback: ${err?.message}`)
  }

  // 2. Fallback HTML Scraping
  try {
    const response = await axios.get(`${baseUrl}/series`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 15000
    })

    const $ = cheerio.load(response.data)

    $('a[href*="/series/novel/"]').each((_, el) => {
      const href = $(el).attr('href') || ''
      if (!href.includes('/chapter/')) {
        const slug = href.split('/series/novel/')[1]?.split('?')[0]?.split('/')[0]
        if (slug && !novelsMap.has(slug)) {
          let img = $(el).find('img').attr('src') || $(el).closest('div').find('img').attr('src')
          let cover: string | undefined = undefined
          if (img) {
            if (img.includes('url=')) {
              const rawUrl = img.split('url=')[1]?.split('&')[0]
              if (rawUrl) cover = decodeURIComponent(rawUrl)
            } else {
              cover = img.startsWith('/') ? `${baseUrl}${img}` : img
            }
          }

          const altTitle = $(el).find('img').attr('alt')
          const textTitle = $(el).text().trim()
          const title = altTitle || (textTitle && textTitle !== 'WEB NOVEL' ? textTitle : slug)

          novelsMap.set(slug, {
            id: slug,
            slug,
            title,
            cover,
            sourceUrl: `${baseUrl}/series/novel/${slug}`
          })
        }
      }
    })
  } catch {}

  return Array.from(novelsMap.values())
}

export async function scrapeNoveldexNovelDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string }> }> {
  const baseUrl = 'https://noveldex.io'
  const sourceUrl = `${baseUrl}/series/novel/${slug}`

  const response = await axios.get(sourceUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    timeout: 20000
  })

  const html = response.data
  const $ = cheerio.load(html)

  let title = $('h1').first().text().trim() || slug
  let cover: string | undefined = undefined

  const imgEl = $('img[alt*="' + title + '"]').first() || $('img').first()
  let imgSrc = imgEl.attr('src')
  if (imgSrc) {
    if (imgSrc.includes('url=')) {
      cover = decodeURIComponent(imgSrc.split('url=')[1].split('&')[0])
    } else {
      cover = imgSrc.startsWith('/') ? `${baseUrl}${imgSrc}` : imgSrc
    }
  }

  let description = $('meta[name="description"]').attr('content') || ''
  let author = ''

  $('p, div, span').each((_, el) => {
    const text = $(el).text().trim()
    if (text.startsWith('Author:') || text.startsWith('Author :')) {
      author = text.replace(/Author\s*:/i, '').trim()
    }
  })

  const chapters: Array<{ title: string; url: string; file: string }> = []

  // Extract chapters array from Noveldex RSC JSON payload
  const chaptersMatch = html.match(/\\"chapters\\":(\[\{[\s\S]*?\}\])/)
  if (chaptersMatch) {
    try {
      const jsonStr = chaptersMatch[1].replace(/\\\\/g, '\\').replace(/\\"/g, '"')
      const parsedChapters = JSON.parse(jsonStr)

      if (Array.isArray(parsedChapters)) {
        parsedChapters.forEach((ch: any, idx: number) => {
          const chNum = ch.number ?? (idx + 1)
          const chTitle = ch.title || `Chapter ${chNum}`
          const chUrl = `${baseUrl}/series/novel/${slug}/chapter/${chNum}`
          chapters.push({
            title: chTitle,
            url: chUrl,
            file: `chapter-${chNum}.json`
          })
        })
      }
    } catch {}
  }

  if (chapters.length === 0) {
    $('a[href*="/chapter/"]').each((i, el) => {
      const href = $(el).attr('href') || ''
      const chTitle = $(el).text().trim() || `Chapter ${i + 1}`
      if (href) {
        const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`
        if (!chapters.some(c => c.url === fullUrl)) {
          chapters.push({
            title: chTitle,
            url: fullUrl,
            file: `chapter-${chapters.length + 1}.json`
          })
        }
      }
    })
  }

  return {
    id: slug,
    slug,
    title,
    author,
    description,
    tags: [],
    cover: cover || undefined,
    sourceUrl,
    chapters
  }
}

// ----------------------------------------------------
// 3. SAKURANOVEL.ID SCRAPER (WP REST API)
// ----------------------------------------------------

export async function scrapeSakuraCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://sakuranovel.id'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  const novels: CatalogNovel[] = []

  try {
    for (let page = 1; page <= 3; page++) {
      const res = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?per_page=100&page=${page}&orderby=count&order=desc`, { headers, timeout: 15000 })
      const categories = res.data
      if (!Array.isArray(categories) || categories.length === 0) break

      for (const cat of categories) {
        if (cat.count > 0 && cat.slug !== 'uncategorized') {
          novels.push({
            id: cat.slug,
            slug: cat.slug,
            title: cat.name,
            sourceUrl: `${baseUrl}/category/${cat.slug}/`,
            description: `Novel terjemahan Bahasa Indonesia: ${cat.name} (${cat.count} chapter).`
          })
        }
      }
    }
  } catch (err: any) {
    console.error('[SakuraCatalog Error]', err.message)
  }
  return novels
}

export async function scrapeSakuraNovelDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> }> {
  const baseUrl = 'https://sakuranovel.id'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }

  // 1. Fetch category by slug
  const catRes = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`, { headers, timeout: 15000 })
  const categories = catRes.data
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error(`Category not found for slug: ${slug}`)
  }

  const cat = categories[0]
  const catId = cat.id
  const title = cat.name

  // 2. Fetch all chapter posts for this category
  const chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> = []
  let page = 1
  let totalPages = 1

  do {
    const postsRes = await axios.get(`${baseUrl}/wp-json/wp/v2/posts?categories=${catId}&per_page=100&page=${page}&order=asc`, { headers, timeout: 20000 })
    const posts = postsRes.data
    totalPages = parseInt(postsRes.headers['x-wp-totalpages'] || '1', 10)

    if (Array.isArray(posts)) {
      for (const p of posts) {
        const chTitle = p.title?.rendered ? cheerio.load(p.title.rendered).text().trim() : `Chapter ${chapters.length + 1}`
        const chUrl = p.link || `${baseUrl}/${p.slug}`
        chapters.push({
          title: chTitle,
          url: chUrl,
          file: `chapter-${chapters.length + 1}.json`,
          contentHtml: p.content?.rendered
        })
      }
    }
    page++
  } while (page <= totalPages && page <= 10)

  return {
    id: slug,
    slug,
    title,
    author: 'SakuraNovel',
    description: `Novel terjemahan Bahasa Indonesia dari SakuraNovel: ${title} (${chapters.length} chapter).`,
    tags: ['SakuraNovel', 'Bahasa Indonesia'],
    sourceUrl: `${baseUrl}/category/${slug}/`,
    chapters
  }
}

// ----------------------------------------------------
// 4. INDOWEBNOVEL.ID SCRAPER (WP REST API & TAXONOMY 'SERI')
// ----------------------------------------------------

export async function scrapeIndowebnovelCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://indowebnovel.id'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  const novels: CatalogNovel[] = []

  try {
    for (let page = 1; page <= 3; page++) {
      const res = await axios.get(`${baseUrl}/wp-json/wp/v2/seri?per_page=100&page=${page}&orderby=count&order=desc`, { headers, timeout: 15000 })
      const series = res.data
      if (!Array.isArray(series) || series.length === 0) break

      for (const item of series) {
        if (item.count > 0) {
          novels.push({
            id: item.slug,
            slug: item.slug,
            title: item.name,
            sourceUrl: `${baseUrl}/seri/${item.slug}/`,
            description: `Novel terjemahan Bahasa Indonesia dari Indowebnovel: ${item.name} (${item.count} chapter).`
          })
        }
      }
    }
  } catch (err: any) {
    console.error('[Indowebnovel Catalog Error]', err.message)
  }
  return novels
}

export async function scrapeIndowebnovelDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> }> {
  const baseUrl = 'https://indowebnovel.id'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }

  // 1. Fetch series taxonomy term by slug
  const seriRes = await axios.get(`${baseUrl}/wp-json/wp/v2/seri?slug=${encodeURIComponent(slug)}`, { headers, timeout: 15000 })
  const seriesList = seriRes.data
  let catId: number | null = null
  let title = slug

  if (Array.isArray(seriesList) && seriesList.length > 0) {
    catId = seriesList[0].id
    title = seriesList[0].name
  } else {
    // Fallback: try category
    const catRes = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`, { headers, timeout: 15000 })
    if (Array.isArray(catRes.data) && catRes.data.length > 0) {
      catId = catRes.data[0].id
      title = catRes.data[0].name
    }
  }

  if (!catId) {
    throw new Error(`Novel series not found on Indowebnovel for slug: ${slug}`)
  }

  // 2. Fetch posts
  const chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> = []
  let page = 1
  let totalPages = 1

  do {
    const postsRes = await axios.get(`${baseUrl}/wp-json/wp/v2/posts?seri=${catId}&per_page=100&page=${page}&order=asc`, { headers, timeout: 20000 })
    const posts = postsRes.data
    totalPages = parseInt(postsRes.headers['x-wp-totalpages'] || '1', 10)

    if (Array.isArray(posts)) {
      for (const p of posts) {
        const chTitle = p.title?.rendered ? cheerio.load(p.title.rendered).text().trim() : `Chapter ${chapters.length + 1}`
        chapters.push({
          title: chTitle,
          url: p.link || `${baseUrl}/${p.slug}`,
          file: `chapter-${chapters.length + 1}.json`,
          contentHtml: p.content?.rendered
        })
      }
    }
    page++
  } while (page <= totalPages && page <= 10)

  return {
    id: slug,
    slug,
    title,
    author: 'Indowebnovel',
    description: `Novel terjemahan Bahasa Indonesia dari Indowebnovel: ${title} (${chapters.length} chapter).`,
    tags: ['Indowebnovel', 'Bahasa Indonesia'],
    sourceUrl: `${baseUrl}/seri/${slug}/`,
    chapters
  }
}

// ----------------------------------------------------
// 5. MEIONOVEL.ID SCRAPER
// ----------------------------------------------------

export async function scrapeMeionovelCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://meionovels.com'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  const novelsMap = new Map<string, CatalogNovel>()

  try {
    const res = await axios.get(`${baseUrl}/novel/`, { headers, timeout: 15000 })
    const $ = cheerio.load(res.data)

    $('a[href*="/novel/"]').each((_, el) => {
      const href = $(el).attr('href') || ''
      const title = $(el).text().trim() || $(el).find('img').attr('alt') || ''
      if (href && !href.endsWith('/novel/') && !href.includes('/pengumuman/')) {
        const parts = href.replace(/\/$/, '').split('/')
        const slug = parts.pop() || ''
        if (slug && title && title !== 'HTL' && !title.startsWith('Chapter') && !novelsMap.has(slug)) {
          novelsMap.set(slug, {
            id: slug,
            slug,
            title,
            sourceUrl: href,
            description: `Novel terjemahan Bahasa Indonesia dari Meionovel: ${title}.`
          })
        }
      }
    })
  } catch (err: any) {
    console.error('[Meionovel Catalog Error]', err.message)
  }

  return Array.from(novelsMap.values())
}

export async function scrapeMeionovelDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> }> {
  const baseUrl = 'https://meionovels.com'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' }
  const urlsToTry = [
    `${baseUrl}/novel/${slug}/`,
    `${baseUrl}/${slug}/`,
    `${baseUrl}/series/${slug}/`
  ]

  let htmlData = ''
  let finalSourceUrl = `${baseUrl}/novel/${slug}/`

  for (const url of urlsToTry) {
    try {
      const res = await axios.get(url, { headers, timeout: 15000 })
      if (res.data && typeof res.data === 'string') {
        htmlData = res.data
        finalSourceUrl = url
        break
      }
    } catch {}
  }

  if (!htmlData) {
    return {
      id: slug,
      slug,
      title: slug.replace(/-/g, ' '),
      author: 'Meionovel',
      description: `Novel Meionovel: ${slug}`,
      cover: undefined,
      tags: ['Meionovel', 'Bahasa Indonesia'],
      sourceUrl: finalSourceUrl,
      chapters: []
    }
  }

  const $ = cheerio.load(htmlData)

  const title = $('h1').first().text().trim() || slug.replace(/-/g, ' ')
  const desc = $('.entry-content p, .sinopsis p, .desc p').first().text().trim() || `Novel Meionovel: ${title}`
  const cover = $('.thumb img, .summary_image img').attr('src') || undefined

  const chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> = []
  $('a[href*="/chapter-"], .wp-manga-chapter a').each((i, el) => {
    const chUrl = $(el).attr('href') || ''
    const chTitle = $(el).text().trim() || `Chapter ${i + 1}`
    if (chUrl && !chapters.some(c => c.url === chUrl)) {
      chapters.push({
        title: chTitle,
        url: chUrl,
        file: `chapter-${chapters.length + 1}.json`
      })
    }
  })

  return {
    id: slug,
    slug,
    title,
    author: 'Meionovel',
    description: desc,
    cover,
    tags: ['Meionovel', 'Bahasa Indonesia'],
    sourceUrl: finalSourceUrl,
    chapters
  }
}

// ----------------------------------------------------
// 6. VANOVEL.COM SCRAPER
// ----------------------------------------------------

export async function scrapeVanovelCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://vanovel.com'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  const novelsMap = new Map<string, CatalogNovel>()

  try {
    const res = await axios.get(`${baseUrl}/`, { headers, timeout: 15000 })
    const $ = cheerio.load(res.data)

    $('a[href*="/manga/"]').each((_, el) => {
      const href = $(el).attr('href') || ''
      const title = $(el).text().trim() || $(el).find('img').attr('alt') || ''
      if (href && !href.includes('/manga-genre/') && !href.includes('/chapter-')) {
        const parts = href.replace(/\/$/, '').split('/')
        const slug = parts.pop() || ''
        if (slug && title && !novelsMap.has(slug)) {
          novelsMap.set(slug, {
            id: slug,
            slug,
            title,
            sourceUrl: href,
            description: `Novel terjemahan Bahasa Indonesia dari Vanovel: ${title}.`
          })
        }
      }
    })
  } catch (err: any) {
    console.error('[Vanovel Catalog Error]', err.message)
  }

  return Array.from(novelsMap.values())
}

export async function scrapeVanovelDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> }> {
  const baseUrl = 'https://vanovel.com'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  const sourceUrl = `${baseUrl}/manga/${slug}/`

  const res = await axios.get(sourceUrl, { headers, timeout: 20000 })
  const $ = cheerio.load(res.data)

  const title = $('h1.entry-title, h1').first().text().trim() || slug
  const desc = $('.entry-content p, .sinopsis p').first().text().trim() || `Novel Vanovel: ${title}`
  const cover = $('.thumb img').attr('src') || undefined

  const chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> = []
  $('.clx li a, #chapterlist li a, .eplister li a').each((i, el) => {
    const chUrl = $(el).attr('href') || ''
    const chTitle = $(el).find('.chapternum').text().trim() || $(el).text().trim() || `Chapter ${i + 1}`
    if (chUrl && !chapters.some(c => c.url === chUrl)) {
      chapters.push({
        title: chTitle,
        url: chUrl,
        file: `chapter-${chapters.length + 1}.json`
      })
    }
  })

  return {
    id: slug,
    slug,
    title,
    author: 'Vanovel',
    description: desc,
    cover,
    tags: ['Vanovel', 'Bahasa Indonesia'],
    sourceUrl,
    chapters
  }
}

// ----------------------------------------------------
// 7. BACALIGHTNOVEL.CO SCRAPER
// ----------------------------------------------------

export async function scrapeBacalightnovelCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://bacalightnovel.co'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  const novels: CatalogNovel[] = []

  try {
    const res = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`, { headers, timeout: 15000 })
    if (Array.isArray(res.data)) {
      for (const cat of res.data) {
        if (cat.count > 0 && cat.slug !== 'uncategorized') {
          novels.push({
            id: cat.slug,
            slug: cat.slug,
            title: cat.name,
            sourceUrl: `${baseUrl}/category/${cat.slug}/`,
            description: `Novel BacaLightNovel: ${cat.name} (${cat.count} chapter).`
          })
        }
      }
    }
  } catch {}

  return novels
}

export async function scrapeBacalightnovelDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> }> {
  return await scrapeSakuraNovelDetail(slug)
}

// ----------------------------------------------------
// 8. NOVELBOOKID SCRAPER
// ----------------------------------------------------

export async function scrapeNovelbookidCatalog(): Promise<CatalogNovel[]> {
  const baseUrl = 'https://novelbook.id'
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  const novels: CatalogNovel[] = []

  try {
    const res = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`, { headers, timeout: 15000 })
    if (Array.isArray(res.data)) {
      for (const cat of res.data) {
        if (cat.count > 0 && cat.slug !== 'uncategorized') {
          novels.push({
            id: cat.slug,
            slug: cat.slug,
            title: cat.name,
            sourceUrl: `${baseUrl}/category/${cat.slug}/`,
            description: `Novel NovelBookId: ${cat.name} (${cat.count} chapter).`
          })
        }
      }
    }
  } catch {}

  return novels
}

export async function scrapeNovelbookidDetail(slug: string): Promise<CatalogNovel & { chapters: Array<{ title: string; url: string; file: string; contentHtml?: string }> }> {
  return await scrapeSakuraNovelDetail(slug)
}

export async function getSourceCatalog(sourceId: string): Promise<CatalogNovel[]> {
  if (sourceId === 'sakuranovel') {
    return await scrapeSakuraCatalog()
  } else if (sourceId === 'indowebnovel') {
    return await scrapeIndowebnovelCatalog()
  } else if (sourceId === 'meionovel') {
    return await scrapeMeionovelCatalog()
  } else if (sourceId === 'vanovel') {
    return await scrapeVanovelCatalog()
  } else if (sourceId === 'bacalightnovel') {
    return await scrapeBacalightnovelCatalog()
  } else if (sourceId === 'novelbookid') {
    return await scrapeNovelbookidCatalog()
  } else if (sourceId === 'dreamy-translations') {
    return await scrapeDreamyCatalog()
  } else if (sourceId === 'noveldex') {
    return await scrapeNoveldexCatalog()
  }
  return []
}
