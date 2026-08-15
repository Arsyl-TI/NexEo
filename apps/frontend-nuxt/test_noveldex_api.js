const axios = require('axios');

async function testApi() {
  try {
    const res = await axios.get('https://noveldex.io/api/series?limit=500', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });

    const items = res.data?.data || res.data?.series || (Array.isArray(res.data) ? res.data : []);
    console.log('Total novels returned by API:', items.length);
    console.log('Sample item 0:', items[0]);
    console.log('Sample item 1:', items[1]);
    console.log('Sample item 2:', items[2]);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testApi();
