const ytdl = require('@distube/ytdl-core');
const fs = require('fs');

async function testNativeStream() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  console.log('Testing native ytdl stream download...');
  try {
    const stream = ytdl(url, {
      filter: 'audioandvideo',
      quality: 'lowest'
    });

    let downloadedBytes = 0;
    const writer = fs.createWriteStream('./test_video2.mp4');

    stream.on('data', chunk => {
      downloadedBytes += chunk.length;
      process.stdout.write(`\rDownloaded: ${downloadedBytes} bytes`);
    });

    stream.on('info', (info, format) => {
      console.log('\nStream info event fired! Format container:', format.container, 'contentLength:', format.contentLength);
    });

    stream.on('progress', (chunkLength, downloaded, total) => {
      const pct = Math.round((downloaded / total) * 100);
      process.stdout.write(`\rProgress event: ${pct}% (${downloaded}/${total} bytes)`);
    });

    stream.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
      stream.on('error', reject);
    });

    console.log('\nNative stream finished successfully! File size:', fs.statSync('./test_video2.mp4').size);
  } catch (e) {
    console.error('\nNative stream error:', e.message);
  }
}

testNativeStream();
