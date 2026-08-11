# Sistem Ekstensi Multi-Sumber untuk NexEo

## Konsep
NexEo sekarang mendukung sistem ekstensi seperti Tachiyomi/LNReader, di mana setiap website novel memiliki plugin scraper terpisah yang bisa dimuat secara otomatis.

## Struktur File

```
server/
└── sources/
    ├── BaseSource.js          # Abstract base class untuk semua plugin
    ├── DreamySource.js        # Plugin untuk Dreamy Translations
    ├── SourceManager.js       # Manajer load & register plugin
    └── *.js                   # Plugin tambahan (bisa ditambahkan)
```

## Cara Kerja

### 1. BaseSource Interface
Setiap plugin harus extend `BaseSource` dan mengimplementasikan:
- `search(query, page)` - Cari novel
- `getNovelDetail(slug)` - Get detail novel
- `getChapterContent(slug, chapterFile)` - Get konten chapter

### 2. Auto-Load
SourceManager otomatis me-load semua file `*.js` dari folder `server/sources/` saat server start.

### 3. API Endpoints
```
GET  /api/novels/sources                          # List semua sources
GET  /api/novels/sources/:sourceId/search?q=...   # Cari novel
GET  /api/novels/sources/:sourceId/novel/:slug    # Detail novel
GET  /api/novels/sources/:sourceId/novel/:slug/chapter/:chapterFile  # Konten chapter
```

## Cara Membuat Plugin Baru

1. Buat file baru: `server/sources/SourceName.js`

2. Implementasikan:

```javascript
const BaseSource = require('./BaseSource');

class SourceNameSource extends BaseSource {
  constructor() {
    super();
    this.id = 'sourcename';
    this.name = 'Source Name';
    this.baseUrl = 'https://example.com';
  }

  async search(query, page = 1) {
    // Implement search logic
    return [{ title, slug, cover, author }];
  }

  async getNovelDetail(slug) {
    // Implement detail fetching
    return { title, author, description, chapters: [...] };
  }

  async getChapterContent(slug, chapterFile) {
    // Implement chapter content fetching
    return [{ type: 'text', value: 'content' }];
  }
}

module.exports = SourceNameSource;
```

3. Restart server dan plugin akan otomatis ter-load.

## Keunggulan Sistem Ini

- **Modular** - Setiap sumber terpisah dan independen
- **Extensible** - Mudah tambah website baru
- **Maintainable** - Bug di satu sumber tidak affect yang lain
- **Server-side** - Tidak ada masalah CORS karena semua di backend
- **Caching** - Bisa implement caching di setiap plugin

## Perbandingan dengan Tachiyomi/LNReader

| Fitur | Tachiyomi | NexEo (Our System) |
|-------|-----------|-------------------|
| Platform | Android/Desktop App | Web (Node.js + Vue) |
| Eksekusi | Client-side (Android) | Server-side (Node.js) |
| CORS | Tidak masalah | Ditangani server |
| Install | APK / Extension | Auto-load dari folder |
| Performance | Faster (native) | Good enough (HTTP) |

## Contoh Plugin yang Bisa Ditambahkan

1. **NovelFullSource** - scraper untuk novelfull.com
2. **ReadLightNovelSource** - scraper untuk readlightnovel.net
3. **LightNovelSource** - scraper untuk lightnovel.us
4. **WebtoonSource** - scraper untuk webtoon.com (comics)
5. **WuxiaWorldSource** - scraper untuk wuxiaworld.com

## Development Notes

- Jangan lupa set `User-Agent` header
- Handle timeout dan error dengan baik
- Gunakan `cheerio` untuk parse HTML
- Gunakan `axios` untuk HTTP requests
- Simpan file gambar ke folder thumbnails
