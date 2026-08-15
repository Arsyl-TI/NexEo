const fs = require('fs');
const html = fs.readFileSync('./noveldex_detail.html', 'utf-8');

const chapterMatches = [...html.matchAll(/\/series\/novel\/[^\s"'\\]+\/chapter\/(\d+)/gi)];
console.log('Chapter regex matches count:', chapterMatches.length);

const uniqueChapters = [...new Set(chapterMatches.map(m => m[1]))];
console.log('Unique chapter numbers count:', uniqueChapters.length);
console.log('Sample chapter numbers:', uniqueChapters.slice(0, 15));
