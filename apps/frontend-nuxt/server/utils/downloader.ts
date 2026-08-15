import fs from 'fs'
import path from 'path'
import axios, { type CancelTokenSource } from 'axios'
import type { DownloadTask, DownloadSource } from '@nexeo/shared/types/downloader'
import { serverConfig } from './config'

const QUEUE_FILE = path.join(process.cwd(), 'data', 'downloader_queue.json')
const activeCancelTokens = new Map<string, CancelTokenSource>()
let isProcessingQueue = false

function ensureQueueFileExists() {
  const dir = path.dirname(QUEUE_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(QUEUE_FILE)) {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify([], null, 2))
  }
}

function loadTasksFromFile(): Map<string, DownloadTask> {
  ensureQueueFileExists()
  const map = new Map<string, DownloadTask>()
  try {
    const raw = fs.readFileSync(QUEUE_FILE, 'utf-8')
    const list: DownloadTask[] = JSON.parse(raw)
    if (Array.isArray(list)) {
      list.forEach(t => {
        if (t.status === 'downloading') t.status = 'pending'
        map.set(t.id, t)
      })
    }
  } catch {}
  return map
}

const tasksMap = loadTasksFromFile()

export function saveTasksToFile() {
  ensureQueueFileExists()
  try {
    const list = Array.from(tasksMap.values())
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(list, null, 2))
  } catch (err) {
    console.error('Failed to save downloader queue to file:', err)
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function getDownloadTasks(): DownloadTask[] {
  return Array.from(tasksMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function createDownloadTask(title: string, source: DownloadSource, targetFolder: string = 'uploads'): DownloadTask {
  const id = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64url')
  const now = new Date().toISOString()

  const task: DownloadTask = {
    id,
    title,
    source,
    status: 'pending',
    progress: 0,
    targetFolder,
    createdAt: now,
    updatedAt: now
  }

  tasksMap.set(id, task)
  saveTasksToFile()

  void processQueue()
  return task
}

export function cancelDownloadTask(id: string): boolean {
  const task = tasksMap.get(id)
  if (!task) return false

  const cancelToken = activeCancelTokens.get(id)
  if (cancelToken) {
    cancelToken.cancel('Download task cancelled by user')
    activeCancelTokens.delete(id)
  }

  task.status = 'cancelled'
  task.speedFormatted = undefined
  task.updatedAt = new Date().toISOString()
  tasksMap.set(id, task)
  saveTasksToFile()
  return true
}

export function deleteDownloadTask(id: string): boolean {
  cancelDownloadTask(id)
  const deleted = tasksMap.delete(id)
  if (deleted) saveTasksToFile()
  return deleted
}

async function processQueue() {
  if (isProcessingQueue) return
  isProcessingQueue = true

  try {
    const pendingTask = Array.from(tasksMap.values()).find(t => t.status === 'pending')
    if (!pendingTask) {
      isProcessingQueue = false
      return
    }

    await runSingleDownload(pendingTask)
  } catch (err) {
    console.error('[DownloaderEngine] Queue processing error:', err)
  } finally {
    isProcessingQueue = false
    const nextPending = Array.from(tasksMap.values()).find(t => t.status === 'pending')
    if (nextPending) void processQueue()
  }
}

async function runSingleDownload(task: DownloadTask): Promise<void> {
  // If task type is youtube, it's processed by yt-dlp in youtubeDownloader.ts
  if (task.source.type === 'youtube') {
    return
  }

  task.status = 'downloading'
  task.progress = 0
  task.updatedAt = new Date().toISOString()
  saveTasksToFile()

  const cancelSource = axios.CancelToken.source()
  activeCancelTokens.set(task.id, cancelSource)

  let destDir = serverConfig.uploadDir
  if (task.targetFolder === 'novels') {
    destDir = serverConfig.novel.dir
  } else if (task.targetFolder === 'video' || task.targetFolder === 'youtube' || task.targetFolder === 'anime') {
    const catFound = serverConfig.video.categories.find(c => c.id === task.targetFolder)
    destDir = catFound?.path || serverConfig.video.categories[0]?.path || serverConfig.uploadDir
  }

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

  const rawUrl = task.source.url
  let filename = path.basename(new URL(rawUrl).pathname)
  if (!filename || filename === '/' || !filename.includes('.')) {
    const ext = task.source.type === 'video' ? '.mp4' : task.source.type === 'novel' ? '.epub' : '.bin'
    filename = `${task.title.replace(/[^a-zA-Z0-9_-]/g, '_')}${ext}`
  }

  const destPath = path.join(destDir, filename)

  try {
    const response = await axios({
      method: 'GET',
      url: task.source.url,
      responseType: 'stream',
      cancelToken: cancelSource.token,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 60000
    })

    const rawLen = response.headers['content-length']
    const totalBytes = parseInt(String(rawLen || '0'), 10)
    task.totalBytes = totalBytes > 0 ? totalBytes : undefined

    let downloadedBytes = 0
    let lastTime = Date.now()
    let lastBytes = 0

    const writer = fs.createWriteStream(destPath)

    response.data.on('data', (chunk: Buffer) => {
      downloadedBytes += chunk.length;
      task.downloadedBytes = downloadedBytes

      if (totalBytes > 0) {
        task.progress = Math.min(100, Math.round((downloadedBytes / totalBytes) * 100))
      }

      const now = Date.now()
      const timeDiff = (now - lastTime) / 1000
      if (timeDiff >= 0.5) {
        const bytesDiff = downloadedBytes - lastBytes
        const bytesPerSec = bytesDiff / timeDiff
        task.speedFormatted = `${formatBytes(bytesPerSec)}`
        lastTime = now
        lastBytes = downloadedBytes
        saveTasksToFile()
      }
    })

    await new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(true))
      writer.on('error', err => reject(err))
      response.data.on('error', (err: any) => reject(err))
    })

    task.status = 'completed'
    task.progress = 100
    task.speedFormatted = undefined
    task.updatedAt = new Date().toISOString()
    activeCancelTokens.delete(task.id)
    saveTasksToFile()
  } catch (err: any) {
    activeCancelTokens.delete(task.id)
    if (axios.isCancel(err)) {
      task.status = 'cancelled'
    } else {
      task.status = 'failed'
      task.error = err?.message || 'Download failed'
    }
    task.speedFormatted = undefined
    task.updatedAt = new Date().toISOString()
    saveTasksToFile()

    if (fs.existsSync(destPath)) {
      try { fs.unlinkSync(destPath) } catch {}
    }
  }
}
