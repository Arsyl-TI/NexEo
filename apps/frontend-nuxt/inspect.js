const fs = require('fs');
const html = fs.readFileSync('./test_series.html', 'utf-8');

// 1. Build ID -> Cover map from HTML
const coverMap = new Map();
const coverRegex = /\\"(\d+)\\":\\"(https:\/\/supabase\.dreamy-translations\.com\/storage\/v1\/object\/public\/covers\/[^\\"]+)\\"/g;
let cMatch;
while ((cMatch = coverRegex.exec(html)) !== null) {
  coverMap.set(cMatch[1], cMatch[2].replace(/\\\\/g, ''));
}
console.log('Total covers in map:', coverMap.size);

// 2. Build Series Map (id, slug, title)
const seriesMap = new Map();
const seriesRegex = /\\"id\\":(\d+),\\"title\\":\\"((?:\\\\.|[^\\"])*)\\",\\"slug\\":\\"([^\\"]+)\\"/g;
let sMatch;
while ((sMatch = seriesRegex.exec(html)) !== null) {
  const id = sMatch[1];
  const title = JSON.parse(`"${sMatch[2]}"`);
  const slug = sMatch[3];
  const cover = coverMap.get(id);

  seriesMap.set(slug, { id, title, slug, cover });
}

console.log('Total series extracted:', seriesMap.size);
const sampleList = Array.from(seriesMap.values());
console.log('Sample item 0:', sampleList[0]);
console.log('Sample item 1:', sampleList[1]);
console.log('Sample item 2:', sampleList[2]);
