import axios from 'axios'
import * as cheerio from 'cheerio'

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

async function testChapterImages() {
  const url = 'https://komikindo.ch/the-transcendent-holy-swordsman-regresses-as-the-youngest-son-of-a-magic-swordsman-family-chapter-14/'
  const res = await axios.get(url, { headers: DEFAULT_HEADERS })
  const $ = cheerio.load(res.data)
  
  console.log('All image elements count:', $('img').length)
  $('img').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || ''
    console.log(i, $(el).parent().attr('class') || $(el).parent().attr('id'), '->', src)
  })
}

testChapterImages()
