const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const baseUrl = 'https://dreamy-translations.com';
const outputDir = config.NOVEL_DIR;
const thumbnailsDir = config.NOVEL_THUMBNAILS_DIR;

// Fungsi untuk mengunduh gambar cover
async function downloadThumbnail(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('finish', () => resolve())
            .on('error', e => reject(e));
    });
}

// Fungsi untuk mengambil metadata dari halaman detail novel
async function fetchMetadata(sourceUrl) {
    try {
        const response = await axios.get(sourceUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 10000
        });
        const $ = cheerio.load(response.data);

        let author = '';
        $('p').each((i, el) => {
            const text = $(el).text().trim();
            if (text.startsWith('by ')) author = text.replace('by ', '').trim();
        });

        let description = '';
        let descHtml = $('div.text-base.text-muted-foreground.leading-relaxed').first().html();
        if (descHtml) {
            description = descHtml;
        } else {
            description = $('meta[name="description"]').attr('content') || '';
        }

        const tagsSet = new Set();
        $('span.rounded-full.text-xs.font-medium').each((i, el) => {
            tagsSet.add($(el).text().trim());
        });
        
        const hashtagsSet = new Set();
        $('span.text-xs.text-muted-foreground\\/70').each((i, el) => {
             const text = $(el).text().trim();
             if (text.startsWith('#')) hashtagsSet.add(text);
        });

        return {
            author,
            description,
            tags: Array.from(tagsSet),
            hashtags: Array.from(hashtagsSet)
        };
    } catch (error) {
        console.error(`Gagal mengambil metadata dari ${sourceUrl}: ${error.message}`);
        return null;
    }
}

async function scrapeCatalog() {
    console.log(`🔍 Membaca data dari file catalog.html lokal...`);
    
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    if (!fs.existsSync(thumbnailsDir)) fs.mkdirSync(thumbnailsDir, { recursive: true });

    try {
        // 1. MEMBACA FILE HTML LOKAL (Bukan dari Axios)
        // You must manually put catalog.html in the scripts directory or data directory
        const htmlPath = path.join(__dirname, 'catalog.html');
        if (!fs.existsSync(htmlPath)) {
            console.error('❌ File catalog.html tidak ditemukan! Taruh file catalog.html di dalam folder scripts.');
            return;
        }
        
        const html = fs.readFileSync(htmlPath, 'utf-8');
        const $ = cheerio.load(html);
        
        let libraryMap = new Map();

        // 2. MENCARI NOVEL (Menggunakan logika Tailwind yang sudah disesuaikan)
        $('a[href^="/novel/"]').each((i, el) => {
            const href = $(el).attr('href');
            const slug = href.replace('/novel/', '').replace(/\//g, ''); 
            
            if (!slug || slug.includes('chapter')) return; 

            const novelUrl = baseUrl + href;
            
            // Mengambil judul dari tag <h3> pertama
            const title = $(el).find('h3').first().text().trim();
            
            // Mengambil URL gambar cover vertikal (tag <img> terakhir)
            let imgUrl = $(el).find('img').last().attr('src');
            if (!imgUrl) {
                imgUrl = $(el).find('img').first().attr('src');
            }

            if (slug && !libraryMap.has(slug)) {
                libraryMap.set(slug, {
                    id: slug,
                    title: title || `Novel ${slug}`,
                    sourceUrl: novelUrl,
                    thumbnailUrl: imgUrl,
                    folderName: slug 
                });
            }
        });

        const library = Array.from(libraryMap.values());
        console.log(`📚 Ditemukan ${library.length} novel. Memulai pengunduhan thumbnail...`);

        // 3. MENGUNDUH THUMBNAIL & MENGAMBIL METADATA
        let i = 1;
        for (let novel of library) {
            console.log(`[${i++}/${library.length}] Memproses: ${novel.title}`);
            
            // Mengambil Metadata Detail (Tags, Deskripsi, Author)
            const metadata = await fetchMetadata(novel.sourceUrl);
            if (metadata) {
                novel.author = metadata.author;
                novel.description = metadata.description;
                novel.tags = metadata.tags;
                novel.hashtags = metadata.hashtags;
            }

            if (novel.thumbnailUrl) {
                let fullImgUrl = novel.thumbnailUrl;
                if (fullImgUrl.startsWith('/')) fullImgUrl = baseUrl + fullImgUrl;

                const ext = path.extname(fullImgUrl.split('?')[0]) || '.jpg';
                const filename = `${novel.id}${ext}`;
                const filepath = path.join(thumbnailsDir, filename);

                try {
                    await downloadThumbnail(fullImgUrl, filepath);
                    novel.localThumbnail = `thumbnails/${filename}`;
                    console.log(`  ✅ Cover diunduh`);
                } catch (e) {
                    console.error(`  ⚠️ Gagal mengunduh cover: ${e.message}`);
                    novel.localThumbnail = null;
                }
            } else {
                novel.localThumbnail = null;
            }
            
            delete novel.thumbnailUrl; 
        }

        // 4. MENYIMPAN KE LIBRARY.JSON
        const libraryPath = path.join(outputDir, 'library.json');
        fs.writeFileSync(libraryPath, JSON.stringify(library, null, 2));

        console.log(`\n🎉 Selesai! Katalog tersimpan di: ${libraryPath}`);

    } catch (error) {
        console.error('\n❌ Gagal memindai katalog:', error.message);
    }
}

scrapeCatalog();
