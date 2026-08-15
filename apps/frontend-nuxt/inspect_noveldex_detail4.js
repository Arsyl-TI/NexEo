const fs = require('fs');
const html = fs.readFileSync('./noveldex_detail.html', 'utf-8');

// Match "chapters":[{ ... }] array in RSC payload
const chaptersMatch = html.match(/\\"chapters\\":(\[\{[\s\S]*?\}\])/);
if (chaptersMatch) {
  try {
    const jsonStr = chaptersMatch[1].replace(/\\\\/g, '\\').replace(/\\"/g, '"');
    const chapters = JSON.parse(jsonStr);
    console.log('Successfully parsed Noveldex chapters array!');
    console.log('Total chapters count:', chapters.length);
    console.log('Sample chapter 0:', chapters[0]);
    console.log('Sample chapter 1:', chapters[1]);
    console.log('Sample chapter 2:', chapters[2]);
  } catch (e) {
    console.error('Parse error:', e.message);
  }
} else {
  console.log('No chapters match found');
}
