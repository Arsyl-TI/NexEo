const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('./noveldex_detail.html', 'utf-8');
const $ = cheerio.load(html);

console.log('--- NOVELDEX DETAIL PARSER ---');

const title = $('h1').first().text().trim();
console.log('Title:', title);

let cover = $('img[alt*="' + title + '"]').attr('src') || $('img').first().attr('src');
if (cover && cover.includes('url=')) {
  cover = decodeURIComponent(cover.split('url=')[1].split('&')[0]);
}
console.log('Cover:', cover);

// Extract Author, Description, Tags
let author = '';
$('p, div, span').each((_, el) => {
  const text = $(el).text().trim();
  if (text.startsWith('Author:') || text.startsWith('Author :')) {
    author = text.replace(/Author\s*:/i, '').trim();
  }
});
console.log('Author:', author);

let description = $('meta[name="description"]').attr('content') || '';
console.log('Description:', description.substring(0, 150));

// Extract Chapters
const chapters = [];
$('a[href*="/chapter/"]').each((i, el) => {
  const href = $(el).attr('href') || '';
  const chTitle = $(el).text().trim();
  if (href && !chapters.some(c => c.url === href)) {
    const fullUrl = href.startsWith('http') ? href : `https://noveldex.io${href}`;
    chapters.push({
      title: chTitle || `Chapter ${chapters.length + 1}`,
      url: fullUrl,
      file: `chapter-${chapters.length + 1}.json`
    })
  }
});

console.log('Total Chapters extracted:', chapters.length);
console.log('Sample Chapter 0:', chapters[0]);
console.log('Sample Chapter 1:', chapters[1]);
