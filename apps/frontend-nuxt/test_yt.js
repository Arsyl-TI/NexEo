const ytdl = require('@distube/ytdl-core');

async function test() {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  try {
    console.log('Testing ytdl info with filter audioandvideo...');
    const info = await ytdl.getInfo(url);
    console.log('Title:', info.videoDetails.title);
    
    // Choose format with video and audio
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });
    console.log('Chosen format URL exists:', !!format?.url, 'container:', format?.container, 'quality:', format?.qualityLabel);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

test();
