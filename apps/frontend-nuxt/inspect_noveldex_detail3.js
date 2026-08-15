const fs = require('fs');
const html = fs.readFileSync('./noveldex_detail.html', 'utf-8');

// Search for any occurrence of "chapter" in html
const matches = [...html.matchAll(/.{0,50}chapter.{0,50}/gi)];
console.log('Total chapter text occurrences:', matches.length);
matches.slice(0, 10).forEach((m, i) => console.log(`[${i}]:`, m[0].replace(/\n/g, ' ')));
