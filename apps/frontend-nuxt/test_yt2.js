const ytdl = require('@distube/ytdl-core');
const axios = require('axios');
const fs = require('fs');

async function testDirectDownload() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  console.log('Testing direct HTTP stream download from format.url...');
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { filter: 'audioandvideo' });

    if (!format || !format.url) {
      console.error('No format URL found');
      return;
    }

    console.log('Got direct format URL length:', format.url.length);
    console.log('Downloading to test_video.mp4...');

    const res = await axios({
      method: 'GET',
      url: format.url,
      responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });

    const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
    console.log('Content-Length total bytes:', totalBytes);

    let downloadedBytes = 0;
    const writer = fs.createWriteStream('./test_video.mp4');

    res.data.on('data', chunk => {
      downloadedBytes += chunk.length;
      if (totalBytes > 0) {
        const pct = Math.round((downloadedBytes / totalBytes) * 100);
        process.stdout.write(`\rProgress: ${pct}% (${downloadedBytes}/${totalBytes} bytes)`);
      }
    });

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    console.log('\nDirect download completed successfully! File size:', fs.statSync('./test_video.mp4').size);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testDirectDownload();
