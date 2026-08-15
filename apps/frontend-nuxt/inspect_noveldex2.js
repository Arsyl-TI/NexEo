const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('./noveldex_series.html', 'utf-8');
const $ = cheerio.load(html);

console.log('--- NOVELDEX CARD PARSER ---');

const novels = [];

// Look for links matching /series/novel/
$('a[href*="/series/novel/"]').each((_, el) => {
  const href = $(el).attr('href') || '';
  // Check if it's a novel main link (not a chapter link like /chapter/123)
  if (!href.includes('/chapter/')) {
    const slug = href.split('/series/novel/')[1]?.split('?')[0]?.split('/')[0];
    if (slug && !novels.some(n => n.slug === slug)) {
      // Find img inside or nearby
      let img = $(el).find('img').attr('src') || $(el).closest('div').find('img').attr('src');
      let cover = undefined;
      if (img) {
        if (img.includes('url=')) {
          const rawUrl = img.split('url=')[1]?.split('&')[0];
          if (rawUrl) cover = decodeURIComponent(rawUrl);
        } else {
          cover = img;
        }
      }

      const altTitle = $(el).find('img').attr('alt');
      const textTitle = $(el).text().trim();
      const title = altTitle || (textTitle && textTitle !== 'WEB NOVEL' ? textTitle : slug);

      novels.push({
        id: slug,
        slug,
        title,
        cover,
        sourceUrl: `https://noveldex.io/series/novel/${slug}`
      });
    }
  }
});

console.log('Extracted Noveldex Novels:', novels.length);
console.log('Sample 0:', novels[0]);
console.log('Sample 1:', novels[1]);
console.log('Sample 2:', novels[2]);
console.log('Sample 3:', novels[3]);
