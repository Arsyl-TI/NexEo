import axios from 'axios'
import * as cheerio from 'cheerio'

async function test() {
  const res = await axios.get('https://kiryuu.io/?s=Solo', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
  })
  const $ = cheerio.load(res.data)
  
  $('a').each((i, el) => {
    const text = $(el).text().trim()
    const href = $(el).attr('href')
    if (text || href) {
      if (href && (href.includes('manga') || href.includes('komik') || href.includes('chapter') || text.toLowerCase().includes('solo'))) {
        console.log(i, text, '->', href)
      }
    }
  })
}

test()
