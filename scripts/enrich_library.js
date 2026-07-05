const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const libraryPath = path.join(config.NOVEL_DIR, 'library.json');

// Helper sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchMetadata(sourceUrl) {
    try {
        const response = await axios.get(sourceUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 10000
        });
        const $ = cheerio.load(response.data);

        // Author
        let author = '';
        $('p').each((i, el) => {
            const text = $(el).text().trim();
            if (text.startsWith('by ')) {
                author = text.replace('by ', '').trim();
            }
        });

        // Description
        // Find div with text-base text-muted-foreground leading-relaxed
        let description = '';
        let descHtml = $('div.text-base.text-muted-foreground.leading-relaxed').first().html();
        if (descHtml) {
            description = descHtml;
        } else {
             // Fallback to meta description if HTML is different
            description = $('meta[name="description"]').attr('content') || '';
        }

        // Tags (Genres)
        const tagsSet = new Set();
        $('span.rounded-full.text-xs.font-medium').each((i, el) => {
            tagsSet.add($(el).text().trim());
        });
        const tags = Array.from(tagsSet);

        // Hashtags
        const hashtagsSet = new Set();
        $('span.text-xs.text-muted-foreground\\/70').each((i, el) => {
             const text = $(el).text().trim();
             if (text.startsWith('#')) {
                 hashtagsSet.add(text);
             }
        });
        const hashtags = Array.from(hashtagsSet);

        return {
            author,
            description,
            tags,
            hashtags
        };
    } catch (error) {
        console.error(`Failed to fetch metadata for ${sourceUrl}: ${error.message}`);
        return null;
    }
}

async function runEnrichment() {
    if (!fs.existsSync(libraryPath)) {
        console.error('library.json not found!');
        return;
    }

    const library = JSON.parse(fs.readFileSync(libraryPath, 'utf8'));
    let updatedCount = 0;

    console.log(`Checking ${library.length} novels for missing metadata...`);

    for (let i = 0; i < library.length; i++) {
        const novel = library[i];
        
        // Check if metadata is missing
        if (!novel.author || !novel.description || !novel.tags) {
            console.log(`[${i+1}/${library.length}] Fetching metadata for: ${novel.title}`);
            const metadata = await fetchMetadata(novel.sourceUrl);
            
            if (metadata) {
                novel.author = metadata.author || novel.author;
                novel.description = metadata.description || novel.description;
                novel.tags = metadata.tags || novel.tags;
                novel.hashtags = metadata.hashtags || novel.hashtags;
                updatedCount++;
            }
            // Small delay to prevent rate limiting
            await sleep(1000);
        }
    }

    if (updatedCount > 0) {
        fs.writeFileSync(libraryPath, JSON.stringify(library, null, 2));
        console.log(`\nSuccessfully updated metadata for ${updatedCount} novels.`);
    } else {
        console.log('\nAll novels are up to date. No updates needed.');
    }
}

runEnrichment();
