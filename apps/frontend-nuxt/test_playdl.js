const play = require('play-dl');
const fs = require('fs');

async function testPlayDl() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  console.log('Testing play-dl info & stream...');
  try {
    const info = await play.video_info(url);
    console.log('Title:', info.video_details.title);
    console.log('Author:', info.video_details.channel?.name);
    console.log('Duration:', info.video_details.durationInSec);

    const stream = await play.stream(url, { quality: 2 }); // quality 2 is video + audio format
    console.log('Got play-dl stream type:', stream.type);

    let downloadedBytes = 0;
    const writer = fs.createWriteStream('./test_playdl.mp4');

    stream.stream.on('data', chunk => {
      downloadedBytes += chunk.length;
      process.stdout.write(`\rDownloaded: ${downloadedBytes} bytes`);
    });

    stream.stream.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
      stream.stream.on('error', reject);
    });

    console.log('\nplay-dl stream finished successfully! File size:', fs.statSync('./test_playdl.mp4').size);
  } catch (e) {
    console.error('\nplay-dl error:', e.message);
  }
}

testPlayDl();
