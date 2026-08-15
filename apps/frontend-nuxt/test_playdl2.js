const play = require('play-dl');
const fs = require('fs');

async function testPlayDl2() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  console.log('Testing play.stream_from_info...');
  try {
    const info = await play.video_info(url);
    console.log('Title:', info.video_details.title);

    const stream = await play.stream_from_info(info, { quality: 1 });
    console.log('Got stream type:', stream.type, 'url length:', stream.url?.length);

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

    console.log('\nFinished successfully! Size:', fs.statSync('./test_playdl.mp4').size);
  } catch (e) {
    console.error('\nError:', e.message);
  }
}

testPlayDl2();
