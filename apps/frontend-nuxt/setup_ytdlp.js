const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function downloadYtDlp() {
  const binDir = path.join(__dirname, 'bin');
  if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });
  const exePath = path.join(binDir, 'yt-dlp.exe');

  if (fs.existsSync(exePath) && fs.statSync(exePath).size > 10000000) {
    console.log('yt-dlp.exe already exists at:', exePath);
    return exePath;
  }

  console.log('Downloading latest yt-dlp.exe from GitHub releases...');
  const url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
  
  const res = await axios({
    method: 'GET',
    url,
    responseType: 'stream'
  });

  const writer = fs.createWriteStream(exePath);
  res.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  console.log('yt-dlp.exe downloaded successfully! Size:', fs.statSync(exePath).size);
  return exePath;
}

async function testSpawn() {
  const exePath = await downloadYtDlp();
  console.log('Testing yt-dlp.exe with test video URL...');

  const args = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    '-f', 'b[ext=mp4]/best[ext=mp4]/best',
    '-o', path.join(__dirname, 'test_ytdlp_video.mp4'),
    '--no-playlist',
    '--newline'
  ];

  const child = spawn(exePath, args);

  child.stdout.on('data', data => {
    const str = data.toString();
    console.log('yt-dlp stdout:', str.trim());
  });

  child.stderr.on('data', data => {
    console.error('yt-dlp stderr:', data.toString().trim());
  });

  child.on('close', code => {
    console.log('yt-dlp process finished with exit code:', code);
    if (fs.existsSync(path.join(__dirname, 'test_ytdlp_video.mp4'))) {
      console.log('Video downloaded successfully! Size:', fs.statSync(path.join(__dirname, 'test_ytdlp_video.mp4')).size);
    }
  });
}

testSpawn();
