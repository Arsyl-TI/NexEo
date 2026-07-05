const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const translate = require('google-translate-api-x');
const readline = require('readline');
const config = require('../config');

const baseUrl = 'https://dreamy-translations.com';
const outputDir = config.NOVEL_DIR;

const delayBetweenChapters = 5000; 
const delayBetweenBatches = 2000; // Jeda 2 detik per paket terjemahan agar sangat aman

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function downloadImage(url, filepath) {
    const response = await axios({
        url, method: 'GET', responseType: 'stream',
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('finish', () => resolve())
            .on('error', e => reject(e));
    });
}

async function translateWithGemini(texts, apiKey) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are a professional light novel translator. Translate the following JSON array of English strings to natural-sounding, contextually accurate Indonesian suitable for a novel reader. Keep the original expressions and formatting. Return a JSON array of strings in the exact same order and length. Return ONLY the JSON, without markdown formatting or code blocks.\n\nInput JSON:\n${JSON.stringify(texts)}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    responseMimeType: "application/json"
                }
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const text = response.data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length === texts.length) {
            return parsed;
        }
        throw new Error("Length mismatch or invalid format");
    } catch (error) {
        throw error;
    }
}

async function translateSingleGemini(text, apiKey) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [{ role: "user", parts: [{ text: `Translate the following English title to Indonesian. Return ONLY the translated string, no explanations, no JSON:\n\n${text}` }] }]
            },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data.candidates[0].content.parts[0].text.trim();
    } catch (error) { throw error; }
}

async function translateBatchDeepL(texts, apiKey) {
    try {
        const isFree = apiKey.endsWith(':fx');
        const endpoint = isFree ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';
        const response = await axios.post(endpoint, {
            text: texts,
            target_lang: 'ID'
        }, {
            headers: {
                'Authorization': `DeepL-Auth-Key ${apiKey.trim()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.translations.map(t => t.text);
    } catch (error) { throw error; }
}

async function translateBatchLibre(texts, apiUrl, apiKey) {
    try {
        const promises = texts.map(t => axios.post(`${apiUrl.replace(/\/$/, '')}/translate`, {
            q: t,
            source: 'en',
            target: 'id',
            format: 'text',
            api_key: apiKey.trim() || undefined
        }, { headers: { 'Content-Type': 'application/json' } }));
        
        const responses = await Promise.all(promises);
        return responses.map(r => r.data.translatedText);
    } catch (error) { throw error; }
}

async function startInteractiveScraper() {
    console.log('============================================');
    console.log('🤖 MESIN PENGUNDUH BATCH-TRANSLATE AKTIF 🤖');
    console.log('============================================\n');

    const libraryPath = path.join(outputDir, 'library.json');
    if (!fs.existsSync(libraryPath)) {
        console.error('❌ File library.json tidak ditemukan! Jalankan catalog_scraper.js dulu.');
        rl.close();
        return;
    }

    const library = JSON.parse(fs.readFileSync(libraryPath, 'utf-8'));
    
    console.log('📚 Daftar Novel Tersedia:');
    library.forEach((novel, index) => {
        console.log(`[${index + 1}] ${novel.title}`);
    });

    const novelChoice = await askQuestion('\n👉 Pilih nomor novel yang ingin diunduh: ');
    const selectedIndex = parseInt(novelChoice) - 1;

    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= library.length) {
        console.log('❌ Pilihan tidak valid. Skrip dihentikan.');
        rl.close();
        return;
    }

    const selectedNovel = library[selectedIndex];
    console.log(`\n✅ Anda memilih: ${selectedNovel.title}`);

    let startUrl = await askQuestion('🔗 Masukkan URL Bab Awal: \nURL: ');
    if (!startUrl.startsWith('http')) {
        console.log('❌ URL tidak valid.');
        rl.close();
        return;
    }

    let startChapterNumber = await askQuestion('🔢 Mulai penomoran dari bab berapa?: ');
    let chapterCounter = parseInt(startChapterNumber);
    if (isNaN(chapterCounter)) chapterCounter = 1;

    console.log('\n🌐 Pilih Mesin Penerjemah:');
    console.log('[1] Google Translate (Gratis, bawaan)');
    console.log('[2] Gemini API (Disarankan, butuh API Key)');
    console.log('[3] DeepL API (Kualitas sastra terbaik, butuh API Key)');
    console.log('[4] LibreTranslate (Self-hosted)');
    const engineChoice = await askQuestion('👉 Masukkan pilihan (1-4) [default: 1]: ');
    
    let engine = 'google';
    let apiKey = '';
    let apiUrl = '';
    
    if (engineChoice === '2') {
        engine = 'gemini';
        apiKey = await askQuestion('🔑 Masukkan Gemini API Key: ');
    } else if (engineChoice === '3') {
        engine = 'deepl';
        apiKey = await askQuestion('🔑 Masukkan DeepL API Key (akhiri dengan :fx jika gratis): ');
    } else if (engineChoice === '4') {
        engine = 'libre';
        apiUrl = await askQuestion('🔗 Masukkan URL LibreTranslate (contoh: http://localhost:5000): ');
        apiKey = await askQuestion('🔑 Masukkan API Key LibreTranslate (opsional, tekan Enter jika tidak ada): ');
    }

    rl.close(); 

    const novelDir = path.join(outputDir, selectedNovel.folderName);
    const imagesDir = path.join(novelDir, 'images');
    const indexPath = path.join(novelDir, 'master_index.json');

    if (!fs.existsSync(novelDir)) fs.mkdirSync(novelDir, { recursive: true });
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

    let masterIndex = [];
    if (fs.existsSync(indexPath)) {
        masterIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    }

    console.log('\n🚀 Mulai Mengunduh & Menerjemahkan (Mode Batch)...\n');

    let currentUrl = startUrl;

    while (currentUrl) {
        console.log(`[Bab ${chapterCounter}] Mengambil data dari: ${currentUrl}`);
        
        try {
            const response = await axios.get(currentUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const $ = cheerio.load(response.data);

            let rawTitle = $('button.text-2xl span span').first().text().trim(); 
            if (!rawTitle) rawTitle = $('title').text().trim(); 
            
            let title = rawTitle;
            try {
                if (engine === 'gemini' && apiKey) {
                    try {
                        title = await translateSingleGemini(rawTitle, apiKey);
                    } catch (e) {
                        console.error("  ⚠️ Gemini gagal menerjemahkan judul. Fallback ke Google Translate...");
                        const translatedTitle = await translate(rawTitle, { to: 'id' });
                        title = translatedTitle.text;
                    }
                } else if (engine === 'deepl' && apiKey) {
                    try {
                        const t = await translateBatchDeepL([rawTitle], apiKey);
                        title = t[0];
                    } catch (e) {
                        console.error("  ⚠️ DeepL gagal menerjemahkan judul. Fallback ke Google Translate...");
                        const translatedTitle = await translate(rawTitle, { to: 'id' });
                        title = translatedTitle.text;
                    }
                } else if (engine === 'libre' && apiUrl) {
                    try {
                        const t = await translateBatchLibre([rawTitle], apiUrl, apiKey);
                        title = t[0];
                    } catch (e) {
                        console.error("  ⚠️ LibreTranslate gagal menerjemahkan judul. Fallback ke Google Translate...");
                        const translatedTitle = await translate(rawTitle, { to: 'id' });
                        title = translatedTitle.text;
                    }
                } else {
                    const translatedTitle = await translate(rawTitle, { to: 'id' });
                    title = translatedTitle.text;
                }
                console.log(`  -> Judul: ${title}`);
            } catch (err) {
                console.error("  ⚠️ Gagal menerjemahkan judul. Menggunakan judul asli.");
            }

            const contentDiv = $('article.chapter-content'); 
            
            // 1. Kumpulkan semua elemen mentah secara berurutan
            let rawElements = [];
            let imageDownloads = [];
            const elements = contentDiv.find('p.line, img').toArray();

            for (let i = 0; i < elements.length; i++) {
                const el = elements[i];
                if (el.tagName.toLowerCase() === 'p') {
                    const text = $(el).text().trim();
                    if (text) rawElements.push({ type: 'text', value: text });
                } else if (el.tagName.toLowerCase() === 'img') {
                    const imgUrl = $(el).attr('src');
                    if (imgUrl) {
                        const filename = `chapter-${chapterCounter}-img-${imageDownloads.length + 1}.jpg`; 
                        const filepath = path.join(imagesDir, filename);
                        const localPath = `images/${filename}`; 
                        
                        rawElements.push({ type: 'image', value: localPath });
                        imageDownloads.push({ url: imgUrl, filepath: filepath });
                    }
                }
            }

            // 2. Pisahkan hanya elemen teks untuk diterjemahkan
            let textElements = rawElements.filter(e => e.type === 'text');
            console.log(`  -> Memproses ${textElements.length} paragraf dengan Teknik Batch...`);

            // 3. Teknik Batching
            const batchSize = engine === 'google' ? 10 : 15;
            const delay = engine === 'google' ? delayBetweenBatches : 500;
            for (let i = 0; i < textElements.length; i += batchSize) {
                const batch = textElements.slice(i, i + batchSize);
                const textsToTranslate = batch.map(item => item.value);

                let translatedArray = null;
                try {
                    try {
                        if (engine === 'gemini' && apiKey) {
                            translatedArray = await translateWithGemini(textsToTranslate, apiKey);
                        } else if (engine === 'deepl' && apiKey) {
                            translatedArray = await translateBatchDeepL(textsToTranslate, apiKey);
                        } else if (engine === 'libre' && apiUrl) {
                            translatedArray = await translateBatchLibre(textsToTranslate, apiUrl, apiKey);
                        } else {
                            throw new Error("Force fallback"); // If google or no key
                        }
                    } catch (apiErr) {
                        if (engine !== 'google') {
                            let detailedError = apiErr.message;
                            if (apiErr.response && apiErr.response.data) {
                                detailedError = JSON.stringify(apiErr.response.data);
                            }
                            console.error(`  ⚠️ ${engine} gagal pada paket ${i/batchSize + 1} (${detailedError}). Mencoba Google Translate...`);
                        }
                        // Fallback to Google Translate
                        const res = await translate(textsToTranslate, { to: 'id' });
                        const rawArr = Array.isArray(res) ? res : [res];
                        translatedArray = rawArr.map(item => item.text);
                    }

                    // Kembalikan teks bahasa Indonesia ke objek aslinya
                    for (let j = 0; j < batch.length; j++) {
                        batch[j].translatedValue = translatedArray[j] || batch[j].value;
                    }
                    
                    // Jeda sebentar antar paket (batch) agar aman
                    await sleep(delay);
                } catch (err) {
                    console.error(`  ⚠️ Paket ${i/batchSize + 1} gagal diterjemahkan sepenuhnya, menggunakan bahasa asli.`);
                    for (let j = 0; j < batch.length; j++) {
                        batch[j].translatedValue = batch[j].value; // Fallback
                    }
                }
            }

            // 4. Eksekusi pengunduhan gambar
            for (let i = 0; i < imageDownloads.length; i++) {
                try {
                    await downloadImage(imageDownloads[i].url, imageDownloads[i].filepath);
                } catch (e) {
                    console.error(`  ⚠️ Gagal unduh ilustrasi.`);
                }
            }

            // 5. Susun kembali teks terjemahan dan gambar sesuai urutan aslinya
            let finalContentData = rawElements.map(el => {
                if (el.type === 'text') {
                    return { type: 'text', value: el.translatedValue };
                } else {
                    return { type: 'image', value: el.value };
                }
            });

            // 6. Simpan JSON Final
            const chapterFileName = `chapter-${chapterCounter}.json`;
            const chapterData = {
                id: chapterCounter,
                title: title,
                sourceUrl: currentUrl,
                content: finalContentData
            };
            
            fs.writeFileSync(path.join(novelDir, chapterFileName), JSON.stringify(chapterData, null, 2));
            console.log(`  ✅ Bab ${chapterCounter} Tersimpan!`);

            const existingIndex = masterIndex.findIndex(item => item.id === chapterCounter);
            if (existingIndex !== -1) {
                masterIndex[existingIndex] = { id: chapterCounter, title: title, file: chapterFileName };
            } else {
                masterIndex.push({ id: chapterCounter, title: title, file: chapterFileName });
            }
            
            fs.writeFileSync(indexPath, JSON.stringify(masterIndex, null, 2));

            // Mencari URL bab selanjutnya
            let nextUrl = null;
            $('a').each((i, el) => {
                const linkText = $(el).text().toLowerCase();
                if (linkText.includes('next')) {
                    nextUrl = $(el).attr('href');
                }
            });

            if (nextUrl && nextUrl.startsWith('/')) {
                nextUrl = baseUrl + nextUrl;
            }

            currentUrl = nextUrl;
            
            if (currentUrl) {
                console.log(`  ⏳ Jeda ${delayBetweenChapters/1000} detik menuju bab berikutnya...\n`);
                await sleep(delayBetweenChapters);
                chapterCounter++;
            } else {
                console.log('\n🛑 Halaman terakhir dicapai. Scraping selesai!');
            }

        } catch (error) {
            console.error(`\n❌ Gagal memproses URL: ${currentUrl}`);
            break; 
        }
    }
}

startInteractiveScraper();
