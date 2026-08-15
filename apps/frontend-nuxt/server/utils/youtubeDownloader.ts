import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { spawn } from 'child_process'
import { serverConfig } from './config'
import { createDownloadTask, saveTasksToFile } from './downloader'

export interface YoutubeVideoMetadata {
  title: string
  author: string
  durationSeconds: number
  durationFormatted: string
  description: string
  thumbnailUrl: string
  videoUrl: string
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export async function ensureYtDlpBinary(): Promise<string> {
  const binDir = path.join(process.cwd(), 'bin')
  if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true })
  const exePath = path.join(binDir, 'yt-dlp.exe')

  if (fs.existsSync(exePath) && fs.statSync(exePath).size > 10000000) {
    return exePath
  }

  const url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe'
  const res = await axios({ method: 'GET', url, responseType: 'stream' })
  const writer = fs.createWriteStream(exePath)
  res.data.pipe(writer)

  await new Promise<void>((resolve, reject) => {
    writer.on('finish', () => resolve())
    writer.on('error', reject)
  })

  return exePath
}

export async function getYoutubeMetadata(url: string): Promise<YoutubeVideoMetadata> {
  const exePath = await ensureYtDlpBinary()

  return new Promise((resolve, reject) => {
    const args = [
      '-j',
      '--no-playlist',
      '--js-runtimes', 'node',
      '--extractor-args', 'youtube:player_client=mweb,ios',
      url
    ]
    const child = spawn(exePath, args)
    let stdoutData = ''
    let stderrData = ''

    child.stdout.on('data', chunk => {
      stdoutData += chunk.toString()
    })

    child.stderr.on('data', chunk => {
      stderrData += chunk.toString()
    })

    child.on('close', code => {
      if (code !== 0 || !stdoutData.trim()) {
        return reject(new Error('Gagal mengambil metadata YouTube: ' + (stderrData || 'URL tidak valid')))
      }

      try {
        const json = JSON.parse(stdoutData)
        const durationSec = json.duration || 0
        resolve({
          title: json.title || 'YouTube Video',
          author: json.uploader || json.channel || 'YouTube',
          durationSeconds: durationSec,
          durationFormatted: formatDuration(durationSec),
          description: json.description || '',
          thumbnailUrl: json.thumbnail || '',
          videoUrl: json.webpage_url || url
        })
      } catch (err) {
        reject(new Error('Gagal membaca format JSON metadata YouTube'))
      }
    })
  })
}

export async function startYoutubeDownload(
  url: string, 
  targetCategory: string = 'youtube',
  customSubfolder: string = ''
): Promise<{ taskId: string; targetPath: string }> {
  const meta = await getYoutubeMetadata(url)
  const exePath = await ensureYtDlpBinary()

  let baseDir = serverConfig.video.categories.find(c => c.id === targetCategory)?.path
  if (!baseDir) {
    baseDir = serverConfig.video.categories[0]?.path || serverConfig.uploadDir
  }

  let destDir = baseDir
  if (customSubfolder.trim()) {
    destDir = path.join(baseDir, customSubfolder.trim())
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }

  const sanitizedTitle = meta.title.replace(/["'/\\?%*:|"<>]/g, '_')
  const videoFileName = `${sanitizedTitle}.mp4`
  const metaFileName = `${sanitizedTitle}.json`
  const destVideoPath = path.join(destDir, videoFileName)
  const destMetaPath = path.join(destDir, metaFileName)

  // Save metadata JSON file for video player description & author display
  try {
    fs.writeFileSync(destMetaPath, JSON.stringify({
      title: meta.title,
      author: meta.author,
      description: meta.description,
      durationSeconds: meta.durationSeconds,
      thumbnailUrl: meta.thumbnailUrl,
      videoUrl: meta.videoUrl,
      downloadedAt: new Date().toISOString()
    }, null, 2))
  } catch {}

  // Create task in Downloader Queue with type 'youtube'
  const task = createDownloadTask(meta.title, { type: 'youtube', url }, targetCategory)
  task.status = 'downloading'
  saveTasksToFile()

  // Spawn yt-dlp process in background directly to the target YouTube / Anime video folder
  void (async () => {
    const args = [
      url,
      '-P', destDir,
      '-o', `${sanitizedTitle}.%(ext)s`,
      '--no-playlist',
      '--newline',
      '--js-runtimes', 'node',
      '--extractor-args', 'youtube:player_client=mweb,ios'
    ]

    const child = spawn(exePath, args)

    child.stdout.on('data', data => {
      const line = data.toString()
      // Match yt-dlp progress line: [download] 45.2% of 15.20MiB at 3.50MiB/s ETA 00:05
      const pctMatch = line.match(/\[download\]\s+(\d+\.\d+)%\s+of\s+~\s*([^\s]+)\s+at\s+([^\s]+)/) || line.match(/\[download\]\s+(\d+\.\d+)%/)
      if (pctMatch) {
        const pct = parseFloat(pctMatch[1])
        task.status = 'downloading'
        task.progress = Math.min(100, Math.round(pct))
        if (pctMatch[3]) {
          task.speedFormatted = pctMatch[3]
        }
        task.updatedAt = new Date().toISOString()
        saveTasksToFile()
      }
    })

    child.on('close', code => {
      if (code === 0) {
        task.status = 'completed'
        task.progress = 100
        task.speedFormatted = undefined
        task.updatedAt = new Date().toISOString()
      } else {
        if (task.status !== 'cancelled') {
          task.status = 'failed'
          task.error = 'yt-dlp process exited with code ' + code
          task.speedFormatted = undefined
          task.updatedAt = new Date().toISOString()
        }
      }
      saveTasksToFile()
    })
  })()

  return {
    taskId: task.id,
    targetPath: destVideoPath
  }
}
