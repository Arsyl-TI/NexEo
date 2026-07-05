const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const os = require('os');
const config = require('./config');
const qrcode = require('qrcode');

// FFmpeg setup
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegStatic);

const app = express();

// ============================================================
// State & Caches
// ============================================================
let videoCache = [];      // Array of all videos
let categoryCache = [];   // Array of categories with counts
let folderCache = [];     // Array of folders grouped by category
let cacheTimestamp = 0;

// Thumbnail Queue
const thumbnailQueue = [];
let isProcessingThumbnails = false;

if (!fs.existsSync(config.THUMBNAIL_DIR)) {
  fs.mkdirSync(config.THUMBNAIL_DIR, { recursive: true });
}

// ============================================================
// Utility Functions
// ============================================================

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let fallbackIp = 'localhost';
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        // Prefer 192.168.* or 10.* over VPN IPs (like 26.*)
        if (iface.address.startsWith('192.168.') || iface.address.startsWith('10.') || iface.address.startsWith('172.')) {
          return iface.address;
        }
        fallbackIp = iface.address;
      }
    }
  }
  return fallbackIp;
}

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function scanVideos(dir, baseDir, categoryId) {
  let videos = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return videos; // Safely return empty if directory doesn't exist
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      videos = videos.concat(scanVideos(fullPath, baseDir, categoryId));
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!config.SUPPORTED_FORMATS.includes(ext)) continue;

    let stats;
    try {
      stats = fs.statSync(fullPath);
    } catch {
      continue;
    }

    const relativePath = path.relative(baseDir, fullPath);
    const folder = path.dirname(relativePath);
    const id = Buffer.from(fullPath).toString('base64url');

    videos.push({
      id,
      categoryId,
      name: path.basename(entry.name, ext),
      filename: entry.name,
      path: fullPath,
      relativePath,
      folder: folder === '.' ? 'Root' : folder,
      size: stats.size,
      sizeFormatted: formatSize(stats.size),
      format: ext.slice(1).toUpperCase(),
      modified: stats.mtime.toISOString(),
      hasThumbnail: fs.existsSync(path.join(config.THUMBNAIL_DIR, `${id}.jpg`))
    });
  }

  return videos;
}

function processThumbnailQueue() {
  if (isProcessingThumbnails || thumbnailQueue.length === 0) return;
  
  isProcessingThumbnails = true;
  const video = thumbnailQueue.shift();
  const thumbPath = path.join(config.THUMBNAIL_DIR, `${video.id}.jpg`);

  if (fs.existsSync(thumbPath)) {
    isProcessingThumbnails = false;
    processThumbnailQueue();
    return;
  }

  ffmpeg(video.path)
    .screenshots({
      timestamps: [5],
      filename: `${video.id}.jpg`,
      folder: config.THUMBNAIL_DIR,
      size: '480x?'
    })
    .on('end', () => {
      const cacheItem = videoCache.find(v => v.id === video.id);
      if (cacheItem) cacheItem.hasThumbnail = true;
      isProcessingThumbnails = false;
      processThumbnailQueue();
    })
    .on('error', (err) => {
      fs.writeFileSync(thumbPath, ''); 
      isProcessingThumbnails = false;
      processThumbnailQueue();
    });
}

function refreshCache(force = false) {
  const now = Date.now();
  if (!force && now - cacheTimestamp < config.CACHE_TTL) return;

  videoCache = [];
  
  // 1. Scan all categories
  for (const cat of config.CATEGORIES) {
    if (fs.existsSync(cat.path)) {
      videoCache = videoCache.concat(scanVideos(cat.path, cat.path, cat.id));
    } else {
      console.warn(`  ⚠ Category path not found: ${cat.path} (${cat.name})`);
    }
  }

  // 2. Build Category Cache
  categoryCache = config.CATEGORIES.map(cat => {
    const videosInCat = videoCache.filter(v => v.categoryId === cat.id);
    return {
      ...cat,
      videoCount: videosInCat.length
    };
  });

  // 3. Build Folder Cache (grouped by categoryId)
  folderCache = [];
  const folderMap = new Map(); // key: "categoryId::folderName"
  
  for (const v of videoCache) {
    const key = `${v.categoryId}::${v.folder}`;
    if (!folderMap.has(key)) {
      folderMap.set(key, {
        categoryId: v.categoryId,
        name: v.folder,
        videoCount: 0,
        coverId: v.id, // Use the first found video as the folder cover
        hasCoverThumbnail: v.hasThumbnail,
        coverName: v.name
      });
    }
    const fData = folderMap.get(key);
    fData.videoCount++;
    // If the cover we picked doesn't have a thumbnail yet, but this one does, use this one
    if (!fData.hasCoverThumbnail && v.hasThumbnail) {
      fData.coverId = v.id;
      fData.hasCoverThumbnail = true;
      fData.coverName = v.name;
    }
    
    if (!v.hasThumbnail) {
      thumbnailQueue.push(v);
    }
  }

  folderCache = Array.from(folderMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  cacheTimestamp = now;
  console.log(`  ✓ Cache refreshed: ${videoCache.length} videos, ${folderCache.length} folders`);
  
  if (thumbnailQueue.length > 0) {
    console.log(`  ✓ Added ${thumbnailQueue.length} videos to thumbnail processing queue`);
    processThumbnailQueue();
  }
}

// ============================================================
// Middleware
// ============================================================

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================
// API Routes
// ============================================================

// Serve Novel Images & Data statically for the frontend to access
if (fs.existsSync(config.NOVEL_DIR)) {
  app.use('/api/novels/static', express.static(config.NOVEL_DIR));
}

// ============================================================
// Novel API Routes
// ============================================================

app.get('/api/novels/library', (req, res) => {
  const libraryPath = path.join(config.NOVEL_DIR, 'library.json');
  if (fs.existsSync(libraryPath)) {
    res.sendFile(libraryPath);
  } else {
    res.json([]);
  }
});

app.get('/api/novels/:slug/index', (req, res) => {
  const safeSlug = path.basename(req.params.slug);
  const indexPath = path.join(config.NOVEL_DIR, safeSlug, 'master_index.json');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json([]);
  }
});

app.get('/api/novels/:slug/chapter/:filename', (req, res) => {
  const safeFilename = path.basename(req.params.filename);
  const safeSlug = path.basename(req.params.slug);
  const chapterPath = path.join(config.NOVEL_DIR, safeSlug, safeFilename);
  if (fs.existsSync(chapterPath)) {
    res.sendFile(chapterPath);
  } else {
    res.status(404).json({ error: 'Chapter not found' });
  }
});

const { spawn } = require('child_process');

app.post('/api/novels/update', (req, res) => {
  const scriptPath = path.join(__dirname, 'scripts', 'catalog_scraper.js');
  if (!fs.existsSync(scriptPath)) {
    return res.status(404).json({ error: 'Scraper script not found' });
  }

  const child = spawn('node', [scriptPath], { detached: true, stdio: 'ignore' });
  child.unref();

  res.json({ message: 'Scraping started in background' });
});

app.get('/api/info', (_req, res) => {
  const ip = getLocalIP();
  res.json({ ip, port: config.PORT, url: `http://${ip}:${config.PORT}` });
});

/** Return all categories */
app.get('/api/categories', (_req, res) => {
  refreshCache();
  res.json(categoryCache);
});

/** Return folders for a specific category */
app.get('/api/folders', (req, res) => {
  refreshCache();
  const { categoryId } = req.query;
  if (!categoryId) return res.status(400).json({error: "categoryId required"});
  
  const folders = folderCache.filter(f => f.categoryId === categoryId);
  res.json(folders);
});

/** Return videos (paginated) for a specific category and folder */
app.get('/api/videos', (req, res) => {
  refreshCache();
  const { categoryId, folder, sort, page = 1, limit = 50 } = req.query;
  let videos = [...videoCache];

  if (categoryId) videos = videos.filter(v => v.categoryId === categoryId);
  if (folder && folder !== 'all') videos = videos.filter(v => v.folder === folder);

  switch (sort) {
    case 'name-asc': videos.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc': videos.sort((a, b) => b.name.localeCompare(a.name)); break;
    case 'size-desc': videos.sort((a, b) => b.size - a.size); break;
    case 'size-asc': videos.sort((a, b) => a.size - b.size); break;
    case 'date-desc': videos.sort((a, b) => new Date(b.modified) - new Date(a.modified)); break;
    case 'date-asc': videos.sort((a, b) => new Date(a.modified) - new Date(b.modified)); break;
    default: videos.sort((a, b) => a.name.localeCompare(b.name));
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedVideos = videos.slice(startIndex, endIndex);

  res.json({
    videos: paginatedVideos,
    total: videos.length,
    page: parseInt(page),
    totalPages: Math.ceil(videos.length / parseInt(limit)),
    hasMore: endIndex < videos.length
  });
});

app.get('/api/search', (req, res) => {
  refreshCache();
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json({ videos: [] });

  const results = videoCache.filter(v =>
    v.name.toLowerCase().includes(q) ||
    v.filename.toLowerCase().includes(q) ||
    v.folder.toLowerCase().includes(q)
  );
  
  res.json({ videos: results, total: results.length, hasMore: false });
});

app.get('/api/thumbnails/:id', (req, res) => {
  const thumbPath = path.join(config.THUMBNAIL_DIR, `${req.params.id}.jpg`);
  if (fs.existsSync(thumbPath)) {
    const stat = fs.statSync(thumbPath);
    if (stat.size === 0) return res.status(404).end();
    res.sendFile(thumbPath);
  } else {
    res.status(404).end();
  }
});

app.get('/api/videos/:id', (req, res) => {
  const video = videoCache.find(v => v.id === req.params.id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

app.get('/api/videos/:id/stream', (req, res) => {
  refreshCache();
  const video = videoCache.find(v => v.id === req.params.id);
  if (!video) return res.status(404).json({ error: 'Video not found' });

  const filePath = video.path;
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not accessible' });

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  let mimeType = mime.lookup(filePath) || 'video/mp4';
  if (mimeType === 'video/x-matroska') mimeType = 'video/webm';

  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + 5 * 1024 * 1024 - 1, fileSize - 1);
    const chunkSize = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=3600',
    });

    const stream = fs.createReadStream(filePath, { start, end });
    stream.on('error', () => res.end());
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': mimeType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
    });
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => res.end());
    stream.pipe(res);
  }
});

app.post('/api/refresh', (req, res) => {
  refreshCache();
  res.json({ success: true });
});

app.get('/api/qrcode', async (req, res) => {
  try {
    const ip = getLocalIP();
    const url = `http://${ip}:${config.PORT}`;
    const qrDataUrl = await qrcode.toDataURL(url, {
      color: { dark: '#ffffff', light: '#0000' }, // White QR on transparent bg
      width: 150
    });
    res.json({ qrcode: qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// ============================================================
// File Sharing (V4) API Routes
// ============================================================

const multer = require('multer');

if (!fs.existsSync(config.UPLOAD_DIR)) {
  fs.mkdirSync(config.UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // Keep original filename but prepend timestamp if exists to avoid overwrite
    let safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    if (fs.existsSync(path.join(config.UPLOAD_DIR, safeName))) {
      const ext = path.extname(safeName);
      const base = path.basename(safeName, ext);
      safeName = `${base}_${Date.now()}${ext}`;
    }
    cb(null, safeName);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 } // 10 GB max
});

app.post('/api/upload', (req, res, next) => {
  // Increase timeout for large file uploads (30 minutes)
  req.setTimeout(30 * 60 * 1000);
  res.setTimeout(30 * 60 * 1000);
  next();
}, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
}, (err, req, res, next) => {
  // Multer error handler
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'File terlalu besar (maks 10GB)' });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) return res.status(500).json({ error: 'Upload gagal: ' + err.message });
  next();
});

app.delete('/api/shared-files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(config.UPLOAD_DIR, filename);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'File deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete file' });
    }
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.get('/api/shared-files', (req, res) => {
  let files = [];
  try {
    const entries = fs.readdirSync(config.UPLOAD_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const fullPath = path.join(config.UPLOAD_DIR, entry.name);
        const stats = fs.statSync(fullPath);
        files.push({
          name: entry.name,
          size: stats.size,
          sizeFormatted: formatSize(stats.size),
          modified: stats.mtime.toISOString(),
        });
      }
    }
  } catch (err) {
    console.error('Error reading upload dir:', err);
  }
  
  // Sort newest first
  files.sort((a, b) => new Date(b.modified) - new Date(a.modified));
  res.json(files);
});

app.get('/api/download/:filename', (req, res) => {
  const safeFilename = path.basename(req.params.filename);
  const filePath = path.join(config.UPLOAD_DIR, safeFilename);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

// SPA Fallback Route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// Start Server
// ============================================================

const localIP = getLocalIP();
const server = app.listen(config.PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  ╔═══════════════════════════════════════════╗');
  console.log('  ║           🎬  NexEo V5 is running!        ║');
  console.log('  ╠═══════════════════════════════════════════╣');
  console.log(`  ║  Local:    http://localhost:${config.PORT}           ║`);
  console.log(`  ║  Network:  http://${localIP}:${config.PORT}     ║`);
  console.log('  ╚═══════════════════════════════════════════╝');
  console.log('');
  refreshCache(true);
});

// Allow long uploads without socket timeout (30 min)
server.timeout = 30 * 60 * 1000;
server.keepAliveTimeout = 30 * 60 * 1000;
server.headersTimeout = 31 * 60 * 1000;
