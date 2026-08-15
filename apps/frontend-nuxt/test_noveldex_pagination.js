const axios = require('axios');
const cheerio = require('cheerio');

async function testPagination() {
  console.log('--- TESTING NOVELDEX PAGINATION & API ENDPOINTS ---');

  // Test 1: Page query parameter https://noveldex.io/series?page=2
  try {
    const res2 = await axios.get('https://noveldex.io/series?page=2', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(res2.data);
    const novels2 = [];
    $('a[href*="/series/novel/"]').each((_, el) => {
      const href = $(el).attr('href') || '';
      if (!href.includes('/chapter/')) {
        const slug = href.split('/series/novel/')[1]?.split('?')[0]?.split('/')[0];
        if (slug && !novels2.some(n => n.slug === slug)) novels2.push(slug);
      }
    });
    console.log('Page 2 novels count:', novels2.length);
    console.log('Page 2 sample slugs:', novels2.slice(0, 3));
  } catch (e) {
    console.error('Page 2 error:', e.message);
  }

  // Test 2: Try JSON API endpoints
  const apiUrls = [
    'https://noveldex.io/api/series?page=1&limit=500',
    'https://noveldex.io/api/series?page=1',
    'https://noveldex.io/api/novels?page=1',
    'https://noveldex.io/api/browse?page=1'
  ];

  for (const url of apiUrls) {
    try {
      const res = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      console.log(`API URL [${url}] status:`, res.status);
      console.log(`API response sample:`, JSON.stringify(res.data).substring(0, 200));
    } catch (e) {
      console.log(`API URL [${url}] failed:`, e.message);
    }
  }
}

testPagination();
