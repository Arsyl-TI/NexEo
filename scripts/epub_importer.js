const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const xml2js = require('xml2js');
const cheerio = require('cheerio');
const crypto = require('crypto');
const config = require('../config');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

function decodeBuffer(buffer, filename = '') {
    const detected = jschardet.detect(buffer);
    console.log(`[DEBUG] File ${filename}: detected encoding ${detected.encoding} with confidence ${detected.confidence}`);
    
    // Dump a sample file to scratch for analysis if it looks garbled
    if (filename.includes('opf') || filename.includes('chapter-10') || filename.includes('Chapter-10')) {
        try {
            const dumpPath = path.join(__dirname, '..', 'scratch', 'dump_' + path.basename(filename));
            fs.writeFileSync(dumpPath, buffer);
            console.log(`[DEBUG] Dumped raw buffer to ${dumpPath}`);
        } catch (e) {
            console.error('Failed to dump debug buffer', e);
        }
    }

    if (detected && detected.encoding) {
        // Lower confidence threshold since XML tags can reduce confidence
        if (detected.confidence > 0.3) {
            try {
                return iconv.decode(buffer, detected.encoding);
            } catch (err) {
                console.error(`Failed to decode with iconv using ${detected.encoding}`, err);
            }
        }
    }
    return buffer.toString('utf8');
}

// Helper to sanitize folder name
function sanitizeFolderName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().substring(0, 15) || 'novel_' + Date.now();
}

async function parseXml(xmlContent) {
    const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: false });
    return parser.parseStringPromise(xmlContent);
}

/**
 * Memproses import file EPUB ke dalam pustaka NexEo
 * @param {string} epubFilePath Path menuju file .epub yang diunggah
 * @param {string} originalFilename Nama asli file
 */
async function importEpub(epubFilePath, originalFilename) {
    try {
        console.log(`Mengekstrak EPUB: ${originalFilename}`);
        const zip = new AdmZip(epubFilePath);
        const zipEntries = zip.getEntries();
        
        // 1. Cari file container.xml
        const containerEntry = zipEntries.find(e => e.entryName === 'META-INF/container.xml');
        if (!containerEntry) throw new Error('Format EPUB tidak valid: META-INF/container.xml tidak ditemukan');
        
        const containerXml = decodeBuffer(containerEntry.getData(), 'container.xml');
        const containerParsed = await parseXml(containerXml);
        
        let opfPath = '';
        try {
            opfPath = containerParsed.container.rootfiles.rootfile['$']['full-path'];
        } catch (e) {
            throw new Error('Gagal membaca path .opf dari container.xml');
        }
        
        // 2. Baca file OPF
        const opfEntry = zipEntries.find(e => e.entryName === opfPath);
        if (!opfEntry) throw new Error(`File OPF tidak ditemukan: ${opfPath}`);
        
        const opfXml = decodeBuffer(opfEntry.getData(), opfPath);
        const opfParsed = await parseXml(opfXml);
        
        const opfDir = path.dirname(opfPath);
        
        // 3. Ekstrak Metadata
        const metadata = opfParsed.package.metadata;
        const title = metadata['dc:title'] || 'Unknown Title';
        const author = metadata['dc:creator'] ? (typeof metadata['dc:creator'] === 'string' ? metadata['dc:creator'] : metadata['dc:creator']['_']) : 'Unknown Author';
        let description = '';
        if (metadata['dc:description']) {
            description = typeof metadata['dc:description'] === 'string' ? metadata['dc:description'] : metadata['dc:description']['_'] || '';
            description = description.replace(/<[^>]*>?/gm, ''); // Hapus HTML tags dari deskripsi
        }
        
        // Buat folder novel
        const folderName = sanitizeFolderName(typeof title === 'string' ? title : title[0] || 'novel');
        const novelDir = path.join(config.NOVEL_DIR, folderName);
        const imagesDir = path.join(novelDir, 'images');
        
        if (!fs.existsSync(novelDir)) fs.mkdirSync(novelDir, { recursive: true });
        if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
        
        // 4. Ekstrak Manifest (Semua File)
        const manifest = opfParsed.package.manifest.item;
        const manifestMap = {};
        let coverImageId = null;
        
        // Coba cari cover dari meta tag jika ada
        if (metadata.meta) {
            const metas = Array.isArray(metadata.meta) ? metadata.meta : [metadata.meta];
            const coverMeta = metas.find(m => m['$'] && m['$'].name === 'cover');
            if (coverMeta) coverImageId = coverMeta['$'].content;
        }

        const items = Array.isArray(manifest) ? manifest : [manifest];
        for (const item of items) {
            const id = item['$'].id;
            const href = item['$'].href;
            const mediaType = item['$']['media-type'];
            
            manifestMap[id] = { href, mediaType };
            
            // Alternatif cari cover dari manifest properties
            if (item['$'].properties && item['$'].properties.includes('cover-image')) {
                coverImageId = id;
            }
        }
        
        // Ekstrak dan simpan semua gambar (termasuk .webp)
        const imageFileMap = {}; // mapping dari path dalam epub ke path lokal
        for (const key of Object.keys(manifestMap)) {
            const item = manifestMap[key];
            if (item.mediaType.startsWith('image/')) {
                const imgPathInEpub = opfDir === '.' ? item.href : path.join(opfDir, item.href).replace(/\\/g, '/');
                const imgEntry = zipEntries.find(e => e.entryName === imgPathInEpub);
                if (imgEntry) {
                    const imgFilename = path.basename(item.href);
                    const localImgPath = path.join(imagesDir, imgFilename);
                    fs.writeFileSync(localImgPath, imgEntry.getData());
                    imageFileMap[item.href] = `images/${imgFilename}`;
                }
            }
        }
        
        // Simpan thumbnail utama (cover)
        if (coverImageId && manifestMap[coverImageId]) {
            const coverHref = manifestMap[coverImageId].href;
            const coverFilename = path.basename(coverHref);
            const sourcePath = path.join(imagesDir, coverFilename);
            if (fs.existsSync(sourcePath)) {
                if (!fs.existsSync(config.NOVEL_THUMBNAILS_DIR)) {
                    fs.mkdirSync(config.NOVEL_THUMBNAILS_DIR, { recursive: true });
                }
                const targetThumbPath = path.join(config.NOVEL_THUMBNAILS_DIR, `${folderName}.jpg`);
                fs.copyFileSync(sourcePath, targetThumbPath);
            }
        }
        
        // 5. Proses Bab dari Spine
        const spine = opfParsed.package.spine.itemref;
        const itemrefs = Array.isArray(spine) ? spine : [spine];
        
        const masterIndex = [];
        let chapterCounter = 1;
        
        for (const ref of itemrefs) {
            const idref = ref['$'].idref;
            const item = manifestMap[idref];
            if (!item) continue;
            
            const htmlPathInEpub = opfDir === '.' ? item.href : path.join(opfDir, item.href).replace(/\\/g, '/');
            const htmlEntry = zipEntries.find(e => e.entryName === htmlPathInEpub);
            if (!htmlEntry) continue;
            
            const htmlContent = decodeBuffer(htmlEntry.getData(), htmlPathInEpub);
            const $ = cheerio.load(htmlContent);
            
            // Ekstrak judul bab (coba dari <h1>, <h2>, atau <title>)
            let chapterTitle = $('h1, h2, h3').first().text().trim() || $('title').text().trim() || `Chapter ${chapterCounter}`;
            
            const elements = [];
            
            // Iterasi elemen HTML untuk teks dan gambar
            $('body').find('*').each((i, el) => {
                const tagName = el.tagName.toLowerCase();
                
                if (tagName === 'img') {
                    let src = $(el).attr('src');
                    if (src) {
                        const htmlDir = path.dirname(item.href);
                        let resolvedSrc = path.basename(src);
                        const matchedHref = Object.keys(imageFileMap).find(href => path.basename(href) === resolvedSrc);
                        
                        if (matchedHref) {
                            elements.push({ type: 'image', value: imageFileMap[matchedHref] });
                        }
                    }
                } else if (['p', 'div', 'span', 'h1', 'h2', 'h3'].includes(tagName)) {
                    // Cegah duplikasi teks dari div yang bersarang
                    const childrenTags = $(el).children().map((i, child) => child.tagName ? child.tagName.toLowerCase() : '').get();
                    const hasBlockChildren = childrenTags.some(tag => ['p', 'div', 'ul', 'ol', 'table', 'blockquote'].includes(tag));
                    
                    if (!hasBlockChildren) {
                        // Jangan ekstrak spasi kosong
                        const text = $(el).text().replace(/\s+/g, ' ').trim();
                        // Filter teks kosong atau duplikat berurutan
                        if (text && (elements.length === 0 || elements[elements.length - 1].value !== text)) {
                            elements.push({ type: 'text', value: text, translatedValue: text });
                        }
                    }
                }
            });
            
            if (elements.length > 0) {
                const chapterFileName = `chapter-${chapterCounter}.json`;
                const chapterDataObj = {
                    id: chapterCounter,
                    title: chapterTitle,
                    content: elements
                };
                fs.writeFileSync(path.join(novelDir, chapterFileName), JSON.stringify(chapterDataObj, null, 2));
                
                masterIndex.push({
                    file: chapterFileName,
                    title: chapterTitle
                });
                chapterCounter++;
            }
        }
        
        // Simpan master_index
        fs.writeFileSync(path.join(novelDir, 'master_index.json'), JSON.stringify(masterIndex, null, 2));
        
        // Update Metadata
        fs.writeFileSync(path.join(novelDir, 'metadata.json'), JSON.stringify({
            title: title,
            author: author,
            description: description,
            tags: ["EPUB Import"]
        }, null, 2));
        
        // Update library.json
        const libraryPath = path.join(config.NOVEL_DIR, 'library.json');
        let library = [];
        if (fs.existsSync(libraryPath)) {
            library = JSON.parse(fs.readFileSync(libraryPath, 'utf8'));
        }
        
        const existingIdx = library.findIndex(n => n.folderName === folderName);
        const novelInfo = {
            title: typeof title === 'string' ? title : title[0],
            folderName: folderName,
            totalChapters: masterIndex.length,
            author: author,
            tags: ["EPUB Import"]
        };
        
        // Tambahkan thumbnail jika berhasil diekstrak
        if (coverImageId && manifestMap[coverImageId]) {
            novelInfo.localThumbnail = `thumbnails/${folderName}.jpg`;
        }
        
        if (existingIdx >= 0) {
            library[existingIdx] = novelInfo;
        } else {
            library.push(novelInfo);
        }
        
        fs.writeFileSync(libraryPath, JSON.stringify(library, null, 2));
        
        console.log(`✅ EPUB berhasil diimport: ${title} (${masterIndex.length} bab)`);
        return { success: true, folderName, title, chapters: masterIndex.length };
        
    } catch (err) {
        console.error('❌ Error saat import EPUB:', err);
        throw err;
    }
}

module.exports = { importEpub };
