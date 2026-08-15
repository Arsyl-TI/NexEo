const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('./noveldex_series.html', 'utf-8');
const $ = cheerio.load(html);

console.log('--- NOVELDEX HTML ANALYSIS ---');

// Check script tags (NEXT_DATA or RSC)
const nextData = $('#__NEXT_DATA__').html();
console.log('__NEXT_DATA__ exists:', !!nextData);

const imgElements = $('img');
console.log('Total img elements:', imgElements.length);
imgElements.slice(0, 10).each((i, el) => {
  console.log(`IMG [${i}]:`, $(el).attr('src'), ' | alt:', $(el).attr('alt'));
});

// Check links to /series/ or /novel/ or /novels/
const links = $('a[href]');
console.log('Total <a> links:', links.length);

const seriesLinks = new Map();
links.each((_, el) => {
  const href = $(el).attr('href') || '';
  if (href.includes('/series/') || href.includes('/novel/') || href.includes('/novels/')) {
    const slug = href.split('/').filter(Boolean).pop();
    const title = $(el).find('h1, h2, h3, h4, span, div, p').first().text().trim() || $(el).text().trim();
    let img = $(el).find('img').attr('src') || $(el).closest('div').find('img').attr('src');
    if (slug && !seriesLinks.has(slug)) {
      seriesLinks.set(slug, { href, slug, title, img });
    }
  }
});

console.log('Unique series links extracted:', seriesLinks.size);
const sampleSeries = Array.from(seriesLinks.values()).slice(0, 5);
console.log('Sample series items:', sampleSeries);

// Search for cover URL patterns in raw HTML
const covers = [...html.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)];
console.log('Raw image URL matches count:', covers.length);
if (covers.length > 0) {
  console.log('Sample raw image URLs:', covers.slice(0, 10).map(m => m[0]));
}
