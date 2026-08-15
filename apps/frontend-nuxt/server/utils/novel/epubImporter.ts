import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import xml2js from 'xml2js'
import * as cheerio from 'cheerio'
import jschardet from 'jschardet'
import iconv from 'iconv-lite'
import { serverConfig } from '../config'

function decodeBuffer(buffer: Buffer, filename = ''): string {
  const detected = jschardet.detect(buffer)
  if (detected && detected.encoding && detected.confidence > 0.3) {
    try {
      return iconv.decode(buffer, detected.encoding)
    } catch {}
  }
  return buffer.toString('utf8')
}

function sanitizeFolderName(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 15) || 'novel_' + Date.now()
}

async function parseXml(xmlContent: string): Promise<any> {
  const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: false })
  return parser.parseStringPromise(xmlContent)
}

export interface EpubImportResult {
  success: boolean
  slug: string
  title: string
  chapterCount: number
  error?: string
}

export async function importEpubFile(epubFilePath: string, originalFilename: string): Promise<EpubImportResult> {
  try {
    const zip = new AdmZip(epubFilePath)
    const zipEntries = zip.getEntries()

    const containerEntry = zipEntries.find(e => e.entryName === 'META-INF/container.xml')
    if (!containerEntry) throw new Error('Invalid EPUB: META-INF/container.xml not found')

    const containerXml = decodeBuffer(containerEntry.getData(), 'container.xml')
    const containerParsed = await parseXml(containerXml)

    const opfPath = containerParsed?.container?.rootfiles?.rootfile?.['$']?.['full-path']
    if (!opfPath) throw new Error('Could not parse OPF full-path from container.xml')

    const opfEntry = zipEntries.find(e => e.entryName === opfPath)
    if (!opfEntry) throw new Error(`OPF file not found: ${opfPath}`)

    const opfXml = decodeBuffer(opfEntry.getData(), opfPath)
    const opfParsed = await parseXml(opfXml)
    const opfDir = path.dirname(opfPath)

    const metadata = opfParsed.package.metadata
    const rawTitle = metadata['dc:title'] || 'Unknown Title'
    const title = typeof rawTitle === 'string' ? rawTitle : (Array.isArray(rawTitle) ? rawTitle[0] : rawTitle['_'] || 'Unknown Title')

    const rawAuthor = metadata['dc:creator'] || 'Unknown Author'
    const author = typeof rawAuthor === 'string' ? rawAuthor : (rawAuthor['_'] || 'Unknown Author')

    let description = ''
    if (metadata['dc:description']) {
      description = typeof metadata['dc:description'] === 'string' ? metadata['dc:description'] : metadata['dc:description']['_'] || ''
      description = description.replace(/<[^>]*>?/gm, '')
    }

    const folderName = sanitizeFolderName(title)
    const novelDir = path.join(serverConfig.novel.dir, folderName)
    const imagesDir = path.join(novelDir, 'images')

    if (!fs.existsSync(novelDir)) fs.mkdirSync(novelDir, { recursive: true })
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true })

    // Parse Manifest
    const manifestItem = opfParsed.package.manifest.item
    const manifestMap: Record<string, { href: string; mediaType: string }> = {}
    let coverImageId: string | null = null

    if (metadata.meta) {
      const metas = Array.isArray(metadata.meta) ? metadata.meta : [metadata.meta]
      const coverMeta = metas.find((m: any) => m['$'] && m['$'].name === 'cover')
      if (coverMeta) coverImageId = coverMeta['$'].content
    }

    const items = Array.isArray(manifestItem) ? manifestItem : [manifestItem]
    for (const item of items) {
      const id = item['$'].id
      const href = item['$'].href
      const mediaType = item['$']['media-type']

      manifestMap[id] = { href, mediaType }
      if (item['$'].properties && item['$'].properties.includes('cover-image')) {
        coverImageId = id
      }
    }

    // Extract Images
    const imageFileMap: Record<string, string> = {}
    for (const key of Object.keys(manifestMap)) {
      const item = manifestMap[key]
      if (item && item.mediaType.startsWith('image/')) {
        const imgPathInEpub = opfDir === '.' ? item.href : path.join(opfDir, item.href).replace(/\\/g, '/')
        const imgEntry = zipEntries.find(e => e.entryName === imgPathInEpub)
        if (imgEntry) {
          const imgFilename = path.basename(item.href)
          const localImgPath = path.join(imagesDir, imgFilename)
          fs.writeFileSync(localImgPath, imgEntry.getData())
          imageFileMap[item.href] = `images/${imgFilename}`
        }
      }
    }

    // Save Cover
    if (coverImageId && manifestMap[coverImageId]) {
      const coverHref = manifestMap[coverImageId].href
      const coverFilename = path.basename(coverHref)
      const sourcePath = path.join(imagesDir, coverFilename)
      if (fs.existsSync(sourcePath)) {
        const thumbDir = serverConfig.novel.thumbnailDir
        if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true })
        fs.copyFileSync(sourcePath, path.join(thumbDir, `${folderName}.jpg`))
        fs.copyFileSync(sourcePath, path.join(imagesDir, 'cover.jpg'))
      }
    }

    // Process Chapters from Spine
    const spine = opfParsed.package.spine.itemref
    const itemrefs = Array.isArray(spine) ? spine : [spine]

    const masterIndex: Array<{ id: number; title: string; file: string }> = []
    let chapterCounter = 1

    for (const ref of itemrefs) {
      const idref = ref['$'].idref
      const item = manifestMap[idref]
      if (!item) continue

      const htmlPathInEpub = opfDir === '.' ? item.href : path.join(opfDir, item.href).replace(/\\/g, '/')
      const htmlEntry = zipEntries.find(e => e.entryName === htmlPathInEpub)
      if (!htmlEntry) continue

      const htmlContent = decodeBuffer(htmlEntry.getData(), htmlPathInEpub)
      const $ = cheerio.load(htmlContent)

      const chapterTitle = $('h1, h2, h3').first().text().trim() || $('title').text().trim() || `Chapter ${chapterCounter}`
      const elements: Array<{ type: 'text' | 'image'; value: string }> = []

      $('body').find('p, img').each((_, el) => {
        const tagName = el.tagName ? el.tagName.toLowerCase() : ''
        if (tagName === 'img') {
          const src = $(el).attr('src')
          if (src) {
            const resolvedSrc = path.basename(src)
            const matchedHref = Object.keys(imageFileMap).find(href => path.basename(href) === resolvedSrc)
            if (matchedHref && imageFileMap[matchedHref]) {
              elements.push({ type: 'image', value: imageFileMap[matchedHref] })
            }
          }
        } else {
          const text = $(el).text().trim()
          if (text) elements.push({ type: 'text', value: text })
        }
      })

      if (elements.length > 0) {
        const chapterFileName = `chapter-${chapterCounter}.json`
        fs.writeFileSync(
          path.join(novelDir, chapterFileName),
          JSON.stringify({ id: chapterCounter, title: chapterTitle, content: elements }, null, 2)
        )

        masterIndex.push({ id: chapterCounter, title: chapterTitle, file: chapterFileName })
        chapterCounter++
      }
    }

    fs.writeFileSync(path.join(novelDir, 'master_index.json'), JSON.stringify(masterIndex, null, 2))
    fs.writeFileSync(path.join(novelDir, 'metadata.json'), JSON.stringify({
      id: folderName,
      slug: folderName,
      title,
      author,
      description,
      tags: []
    }, null, 2))

    return {
      success: true,
      slug: folderName,
      title,
      chapterCount: masterIndex.length
    }
  } catch (err: any) {
    return {
      success: false,
      slug: '',
      title: originalFilename,
      chapterCount: 0,
      error: err?.message || 'Failed to import EPUB'
    }
  }
}
