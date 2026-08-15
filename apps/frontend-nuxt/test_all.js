const axios = require('axios');

async function testAll() {
  try {
    const res = await axios.get('https://noveldex.io/api/series?limit=1000', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const items = res.data?.data || [];
    console.log('Total items returned with limit=1000:', items.length);

    // If API caps at 100 per page, let's fetch all pages until empty
    if (items.length === 100) {
      console.log('API caps at 100 per page. Loop pages...');
      const allNovels = [];
      for (let page = 1; page <= 10; page++) {
        const pRes = await axios.get(`https://noveldex.io/api/series?page=${page}&limit=100`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const pItems = pRes.data?.data || [];
        if (pItems.length === 0) break;
        allNovels.push(...pItems);
      }
      console.log('Total novels accumulated across pages:', allNovels.length);
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testAll();
