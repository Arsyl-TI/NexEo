import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import { serverConfig } from '../../../utils/config'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'slug novel wajib diisi' })
  }

  const novelDir = path.join(serverConfig.novel.dir, slug)
  if (!fs.existsSync(novelDir)) {
    throw createError({ statusCode: 404, statusMessage: 'Folder novel tidak ditemukan' })
  }

  // Load Metadata
  let meta: any = { title: slug, author: 'Unknown Author', description: '', tags: [] }
  const metaPath = path.join(novelDir, 'meta.json')
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
    } catch {}
  }

  const novelTitle = meta.title || slug
  const novelAuthor = meta.author || 'Unknown'
  const novelDescription = meta.description ? meta.description.replace(/<[^>]*>?/gm, '') : ''

  // Find all chapter files (.txt and .json)
  const files = fs.readdirSync(novelDir)
  const chapterFiles = files.filter(f => {
    const l = f.toLowerCase()
    return (l.endsWith('.txt') || l.endsWith('.json')) && !l.includes('meta') && !l.includes('index') && !l.includes('cover')
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, '') || '0', 10)
    const numB = parseInt(b.replace(/\D/g, '') || '0', 10)
    return numA - numB
  })

  if (chapterFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada berkas chapter dalam novel ini' })
  }

  const zip = new AdmZip()

  // 1. mimetype (MUST be first and uncompressed)
  zip.addFile('mimetype', Buffer.from('application/epub+zip', 'utf-8'))

  // 2. META-INF/container.xml
  const containerXml = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
  zip.addFile('META-INF/container.xml', Buffer.from(containerXml, 'utf-8'))

  // 3. OEBPS/style.css
  const styleCss = `
body {
  font-family: Georgia, serif;
  line-height: 1.8;
  padding: 5%;
  color: #1a1a1a;
}
h1, h2 {
  font-family: sans-serif;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
p {
  margin-bottom: 1.25rem;
  text-indent: 1.5em;
  text-align: justify;
}
.cover-page {
  text-align: center;
  padding: 10% 5%;
}
.cover-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.cover-author {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}
`
  zip.addFile('OEBPS/style.css', Buffer.from(styleCss, 'utf-8'))

  // 4. Chapters generation
  const manifestItems: { id: string; href: string; mediaType: string; title: string }[] = [
    { id: 'style', href: 'style.css', mediaType: 'text/css', title: 'Styles' }
  ]
  const spineItems: string[] = []

  // Check Cover Image
  let coverFilename: string | null = null
  for (const f of files) {
    const l = f.toLowerCase()
    if ((l.startsWith('cover') || l.includes('cover')) && (l.endsWith('.jpg') || l.endsWith('.jpeg') || l.endsWith('.png') || l.endsWith('.webp'))) {
      coverFilename = f
      break
    }
  }

  if (coverFilename) {
    const coverPath = path.join(novelDir, coverFilename)
    const coverExt = path.extname(coverFilename).toLowerCase().replace('.', '')
    const coverMime = coverExt === 'png' ? 'image/png' : (coverExt === 'webp' ? 'image/webp' : 'image/jpeg')
    zip.addLocalFile(coverPath, 'OEBPS')
    manifestItems.push({ id: 'cover-image', href: coverFilename, mediaType: coverMime, title: 'Cover Image' })
  }

  // Cover / Title Page
  const titlePageXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${escapeXml(novelTitle)}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="cover-page">
    <h1 class="cover-title">${escapeXml(novelTitle)}</h1>
    <p class="cover-author">Oleh: ${escapeXml(novelAuthor)}</p>
    ${novelDescription ? `<div class="cover-desc"><p>${escapeXml(novelDescription)}</p></div>` : ''}
  </div>
</body>
</html>`
  zip.addFile('OEBPS/title.xhtml', Buffer.from(titlePageXhtml, 'utf-8'))
  manifestItems.push({ id: 'title-page', href: 'title.xhtml', mediaType: 'application/xhtml+xml', title: 'Halaman Judul' })
  spineItems.push('title-page')

  // Generate Each Chapter XHTML
  chapterFiles.forEach((fileName, idx) => {
    const chapNum = idx + 1
    const chapId = `chapter_${chapNum}`
    const chapHref = `chapter_${chapNum}.xhtml`
    const chapTitle = `Bab ${chapNum}: ${fileName.replace(/\.(txt|json)$/i, '').replace(/_/g, ' ')}`

    const filePath = path.join(novelDir, fileName)
    let paragraphs: string[] = []

    if (fileName.toLowerCase().endsWith('.txt')) {
      const content = fs.readFileSync(filePath, 'utf-8')
      paragraphs = content.split(/\r?\n/).map(p => p.trim()).filter(Boolean)
    } else {
      try {
        const rawJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        if (Array.isArray(rawJson)) {
          paragraphs = rawJson.map(item => typeof item === 'string' ? item : (item.value || item.text || '')).filter(Boolean)
        } else if (rawJson && typeof rawJson === 'object') {
          const arr = rawJson.content || rawJson.paragraphs || []
          paragraphs = arr.map((item: any) => typeof item === 'string' ? item : (item.value || item.text || '')).filter(Boolean)
        }
      } catch {}
    }

    const chapBody = paragraphs.map(p => `<p>${escapeXml(p)}</p>`).join('\n')

    const chapterXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${escapeXml(chapTitle)}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <h2>${escapeXml(chapTitle)}</h2>
  ${chapBody}
</body>
</html>`

    zip.addFile(`OEBPS/${chapHref}`, Buffer.from(chapterXhtml, 'utf-8'))
    manifestItems.push({ id: chapId, href: chapHref, mediaType: 'application/xhtml+xml', title: chapTitle })
    spineItems.push(chapId)
  })

  // 5. OEBPS/toc.ncx (EPUB 2 / Backward Navigation)
  const tocNavPoints = manifestItems
    .filter(item => item.mediaType === 'application/xhtml+xml')
    .map((item, i) => `
    <navPoint id="navPoint-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${escapeXml(item.title)}</text></navLabel>
      <content src="${item.href}"/>
    </navPoint>`).join('')

  const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${slug}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${escapeXml(novelTitle)}</text></docTitle>
  <navMap>
    ${tocNavPoints}
  </navMap>
</ncx>`
  zip.addFile('OEBPS/toc.ncx', Buffer.from(tocNcx, 'utf-8'))
  manifestItems.push({ id: 'ncx', href: 'toc.ncx', mediaType: 'application/x-dtbncx+xml', title: 'Table of Contents' })

  // 6. OEBPS/nav.xhtml (EPUB 3 Table of Contents)
  const navListItems = manifestItems
    .filter(item => item.mediaType === 'application/xhtml+xml')
    .map(item => `<li><a href="${item.href}">${escapeXml(item.title)}</a></li>`).join('\n      ')

  const navXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>Daftar Isi</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Daftar Isi</h1>
    <ol>
      ${navListItems}
    </ol>
  </nav>
</body>
</html>`
  zip.addFile('OEBPS/nav.xhtml', Buffer.from(navXhtml, 'utf-8'))
  manifestItems.push({ id: 'nav', href: 'nav.xhtml', mediaType: 'application/xhtml+xml', title: 'Navigation' })

  // 7. OEBPS/content.opf (Package Document)
  const manifestXml = manifestItems.map(item => `<item id="${item.id}" href="${item.href}" media-type="${item.mediaType}" ${item.id === 'nav' ? 'properties="nav"' : ''}/>`).join('\n    ')
  const spineXml = spineItems.map(id => `<itemref idref="${id}"/>`).join('\n    ')

  const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">urn:uuid:${slug}</dc:identifier>
    <dc:title>${escapeXml(novelTitle)}</dc:title>
    <dc:creator>${escapeXml(novelAuthor)}</dc:creator>
    <dc:language>id</dc:language>
    <meta property="dcterms:modified">${new Date().toISOString().replace(/\.\d+Z$/, 'Z')}</meta>
    ${coverFilename ? `<meta name="cover" content="cover-image"/>` : ''}
  </metadata>
  <manifest>
    ${manifestXml}
  </manifest>
  <spine toc="ncx">
    ${spineXml}
  </spine>
</package>`
  zip.addFile('OEBPS/content.opf', Buffer.from(contentOpf, 'utf-8'))

  const epubBuffer = zip.toBuffer()

  setHeader(event, 'Content-Type', 'application/epub+zip')
  setHeader(event, 'Content-Disposition', `attachment; filename="${encodeURIComponent(slug)}.epub"`)
  setHeader(event, 'Content-Length', epubBuffer.length)

  return epubBuffer
})
