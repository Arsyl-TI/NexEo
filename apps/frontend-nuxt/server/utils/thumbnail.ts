import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import { serverConfig } from './config'

const hasFfmpegBinary = typeof ffmpegStatic === 'string' && fs.existsSync(ffmpegStatic)

if (hasFfmpegBinary && ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic)
}

export async function getOrGenerateThumbnail(videoPath: string): Promise<string | null> {
  try {
    if (!fs.existsSync(videoPath)) return null

    // If ffmpeg binary is missing on host machine, safely return null (serving SVG placeholder)
    if (!hasFfmpegBinary) {
      return null
    }

    const thumbnailDir = serverConfig.video.thumbnailDir
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true })
    }

    const hash = crypto.createHash('md5').update(videoPath).digest('hex')
    const thumbnailFileName = `${hash}.jpg`
    const thumbnailPath = path.join(thumbnailDir, thumbnailFileName)

    if (fs.existsSync(thumbnailPath)) {
      return thumbnailPath
    }

    const success = await new Promise<boolean>((resolve) => {
      ffmpeg(videoPath)
        .seekInput(3)
        .frames(1)
        .output(thumbnailPath)
        .size('640x360')
        .on('end', () => resolve(true))
        .on('error', (err) => {
          // Retry at timestamp 0 if seeking 3 seconds failed (e.g. very short video)
          ffmpeg(videoPath)
            .frames(1)
            .output(thumbnailPath)
            .size('640x360')
            .on('end', () => resolve(true))
            .on('error', (retryErr) => {
              console.error('Thumbnail extraction error:', retryErr)
              resolve(false)
            })
            .run()
        })
        .run()
    })

    if (success && fs.existsSync(thumbnailPath)) {
      return thumbnailPath
    }
  } catch (err) {
    console.error('getOrGenerateThumbnail error:', err)
  }
  return null
}
