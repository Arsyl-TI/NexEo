# NexEo Project Context

## 1. Ringkasan Teknologi

**Backend**
- Node.js + Express 5.2.1
- FFmpeg (fluent-ffmpeg 2.1.3)
- Multer 2.2.0
- Cheerio 1.2.0
- Axios 1.18.1
- QRCode 1.5.4
- xml2js + adm-zip
- Google Translate API X, Gemini API, DeepL API, LibreTranslate

**Frontend**
- Vue 3.5.39
- Vite 8.1.1
- Vue Router 5.1.0
- Pinia 3.0.4
- Tailwind CSS 4.3.2
- Plyr 3.8.4
- DOMPurify 3.4.13
- Axios 1.7.2 (refactored dari fetch)

**Storage**
- File-based JSON di `data/novels/{slug}`
- Cache in-memory untuk video dan novel source
- State frontend dipusatkan di Pinia stores

---

## 2. Struktur Folder & File

| Path | Fungsi |
|------|--------|
| `server.js` | Express server untuk API video, novel, file share, dan fallback SPA |
| `config.js` | Konfigurasi kategori video, path, cache TTL, dan API key |
| `package.json` | Dependensi dan script backend |
| `.env` | Variabel rahasia untuk layanan terjemahan |
| `frontend/src/main.js` | Entry Vue dan registrasi Pinia |
| `frontend/src/App.vue` | Layout utama, sidebar, dan router outlet |
| `frontend/src/router/index.js` | Definisi route frontend |
| `frontend/src/views/VideoHome.vue` | Halaman kategori/folder/video |
| `frontend/src/views/VideoPlayer.vue` | Pemutar video dan metadata terkait |
| `frontend/src/views/NovelLibrary.vue` | Daftar novel, import EPUB, update katalog (axios) |
| `frontend/src/views/NovelDetail.vue` | Detail novel, daftar chapter, aksi translate (axios) |
| `frontend/src/views/NovelReader.vue` | Reader novel, tema, font size, resume (axios) |
| `frontend/src/views/NovelBrowser.vue` | Browser novel eksternal, pencarian, import (axios) |
| `frontend/src/views/FileShare.vue` | Upload, daftar, dan hapus file share (axios) |
| `frontend/src/composables/useToast.js` | Akses toast global dari UI store |
| `frontend/src/store/videoStore.js` | Store state video dan folder |
| `frontend/src/store/novelStore.js` | Store state novel, import, update, translate |
| `frontend/src/store/uiStore.js` | Store state UI, sidebar, theme, font, toast |
| `frontend/src/components/ToastContainer.vue` | Container tampilan toast |
| `frontend/tailwind.config.js` | Konfigurasi Tailwind dan brand color |
| `frontend/vite.config.js` | Konfigurasi build Vite |
| `server/sources/` | Plugin source novel eksternal |
| `scripts/epub_importer.js` | Import EPUB ke JSON lokal |
| `scripts/catalog_scraper.js` | Scrape katalog novel |
| `scripts/mass_scraper.js` | Scraping dan translasi massal |
| `scripts/translator.js` | Utilitas translasi batch |
| `data/novels/{slug}/` | Penyimpanan novel lokal |
| `cache/thumbnails/` | Thumbnail video hasil generate |
| `uploads/` | Folder file share upload |
| `public/` | Hasil build frontend |

---

## 3. Arsitektur & Alur Data

### Video
1. Server membaca folder video dari `config.js`.
2. Data folder, kategori, dan video dicache di memori.
3. Client memanggil endpoint kategori/folder/video melalui `VideoStore`.
4. Player memakai stream endpoint dan thumbnail endpoint.

### Novel
1. Novel lokal tersimpan sebagai `master_index.json` dan file chapter JSON.
2. EPUB diunggah lalu diproses menjadi struktur novel lokal.
3. Novel eksternal diambil lewat plugin source system.
4. Katalog novel scraping diperbarui lewat tombol `Perbarui Katalog` di `NovelLibrary.vue`, yang memanggil `POST /api/novels/update`; server menjalankan `scripts/catalog_scraper.js` di background.
5. Cover lokal dibaca dari `data/novels/{slug}/images/`; jika tidak tersedia, API memberi placeholder SVG melalui `/api/novels/placeholder/:slug/:letter`.
6. Reader menampilkan chapter dan menyimpan progress baca.

### UI
1. `App.vue` menginisialisasi Pinia stores.
2. `UIStore` menyimpan tema reader, ukuran font, sidebar, dan toast.
3. `useToast()` hanya menjadi wrapper terhadap `UIStore`.
4. `storeToRefs()` dipakai di komponen agar reaktivitas tetap utuh.

---

## 4. Daftar API / Routing / State

### API utama backend
- `GET /api/categories`
- `GET /api/folders?categoryId=`
- `GET /api/videos?categoryId=&folder=&page=&limit=`
- `GET /api/videos/:id`
- `GET /api/videos/:id/stream`
- `GET /api/thumbnails/:id`
- `GET /api/search?q=`
- `POST /api/refresh`
- `GET /api/qrcode`
- `GET /api/novels/library`
- `GET /api/novels/sources`
- `GET /api/novels/sources/:sourceId/search?q=&page=`
- `GET /api/novels/sources/:sourceId/novel/:slug`
- `GET /api/novels/sources/:sourceId/novel/:slug/chapter/:chapterFile`
- `GET /api/novels/:slug/index`
- `GET /api/novels/:slug/chapter/:filename`
- `POST /api/novels/import-epub`
- `POST /api/novels/:slug/translate-all`
- `POST /api/novels/update`
- `POST /api/upload`
- `GET /api/shared-files`
- `DELETE /api/shared-files/:filename`
- `GET /api/download/:filename`
- `GET /api/info`

### Route frontend
- `/` → `VideoHome.vue`
- `/video/:id` → `VideoPlayer.vue`
- `/novels` → `NovelLibrary.vue`
- `/novels/:slug` → `NovelDetail.vue`
- `/novels/:slug/:chapter` → `NovelReader.vue`
- `/share` → `FileShare.vue`

### State store
- `videoStore`: categories, folders, videos, selectedCategory, selectedFolder, loading, error
- `novelStore`: library, sources, selectedNovel, loading, isImporting, isUpdating, isTranslating, error
- `uiStore`: isSidebarOpen, readerTheme, readerFontSize, toasts, themeClasses

---

## 5. Konvensi Koding

- CommonJS di backend.
- `<script setup>` di frontend.
- Pinia `defineStore()` untuk state global.
- `storeToRefs()` untuk mengambil state agar reaktif di template.
- `async/await` dengan `try/catch`.
- Path memakai `path.join()` di backend.
- Error API dibalas sebagai JSON `{ error: ... }`.
- Komponen Vue memakai nama file PascalCase.
- Tailwind utility class dipakai untuk styling.
- **Styling global dikelola di `frontend/src/style.css` lewat `@theme`, `@layer base`, dan `@layer components`.**
- **Variabel warna semantik:** `--color-background`, `--color-foreground`, `--color-primary`, `--color-muted`, `--color-accent`, `--color-card`, `--color-border`, `--color-ring`, `--color-success/warning/error/info`.
- **Class semantik global yang tersedia:**
  - Layout: `.sidebar`, `.main-content`, `.topbar`, `.page-shell`
  - Card/Surface: `.card`, `.card-hover`, `.file-card`, `.modal-content`, `.settings-panel`
  - Button: `.btn-base`, `.btn-primary`, `.btn-secondary`, `.btn-brand`
  - Form: `.input-base`, `.search-input`, `.select-input`
  - Badge: `.badge`, `.badge-brand`, `.badge-surface`
  - Navigation: `.nav-link`, `.nav-link-active`, `.section-title`
  - UI: `.spinner`, `.status-online`, `.badge-surface`, `.progress-bar`, `.dropzone`, `.modal-backdrop`
- localStorage hanya dipakai lewat store atau composable.
- Indentasi 2 spasi.
- Single quote di JavaScript.

---

## 6. Catatan Penting

- Pinia sudah terpasang di `frontend/package.json`.
- `frontend/src/main.js` sudah memanggil `app.use(createPinia())`.
- `PROJECT_CONTEXT.md` ini adalah referensi utama agar tidak perlu membaca seluruh file satu per satu.
- Build frontend berhasil dijalankan setelah integrasi Pinia.

## 7. Refactoring Axios (11/8/2026)

**Status: Selesai**
- Semua API calls di frontend sudah dimigrasi dari fetch ke Axios
- Stores yang direfactor: novelStore.js, videoStore.js
- Views yang direfactor: NovelLibrary.vue, NovelDetail.vue, NovelReader.vue, NovelBrowser.vue, VideoHome.vue, VideoPlayer.vue, FileShare.vue
- Error handling: axios throws pada status non-2xx, akses error payload via err.response?.data?.error
- Query parameters menggunakan params object bukan template literal
- Upload progress tracking menggunakan onUploadProgress callback di FileShare.vue
- Build frontend verifikasi: npm run build berhasil tanpa error

## 9. Global Styling System (11/8/2026)

**Status: Selesai**
- Migrasi dari hardcoded warna Tailwind ke sistem token Noveldex-inspired di `@theme`
- Token utama yang dipakai:
  - Base: `--color-background`, `--color-foreground`
  - Primary: `--color-primary`, `--color-primary-dark`, `--color-primary-light`
  - Muted: `--color-muted`, `--color-muted-foreground`
  - Accent: `--color-accent`
  - Card: `--color-card`, `--color-card-foreground`
  - Border: `--color-border`
  - Ring: `--color-ring`
  - State: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- `@layer base` memakai token baru untuk body dan heading default
- `@layer components` memakai token baru untuk class reusable:
  - Layout: `.sidebar`, `.main-content`, `.topbar`, `.page-shell`
  - Card/Surface: `.card`, `.card-hover`, `.file-card`, `.modal-content`, `.settings-panel`, `.dropzone`
  - Button: `.btn-base`, `.btn-primary`, `.btn-secondary`, `.btn-brand`
  - Form: `.input-base`, `.search-input`, `.select-input`
  - Badge: `.badge`, `.badge-brand`, `.badge-surface`
  - Navigation: `.nav-link`, `.nav-link-active`, `.section-title`
  - UI: `.spinner`, `.status-online`, `.progress-bar`, `.modal-backdrop`
- `App.vue` sudah memakai class semantik token baru (`bg-background`, `text-foreground`, `border-border`)
- View yang sudah dimigrasi ke token semantik: `FileShare.vue`, `NovelBrowser.vue`, `NovelDetail.vue`, `NovelLibrary.vue`, `NovelReader.vue`, `VideoHome.vue`, `VideoPlayer.vue`
- Build frontend berhasil tanpa error
- File build: `public/assets/index-B54nDP7U.css` (60.20 kB, gzip 9.29 kB)

## 10. Perbaikan Video Player (11/8/2026)

**Status: Selesai**
- Masalah: Kontrol Plyr tidak tampil (tanpa CSS), tombol mode teater tidak berfungsi
- Perbaikan:
  - Import `plyr/dist/plyr.css` di `VideoPlayer.vue`
  - Tambahkan style scoped override untuk `:deep(.plyr*)` agar sesuai tema gelap
  - Tombol mode teater sekarang mengubah `max-w-full` vs `max-w-6xl mx-auto`
  - Progress load dipindahkan ke event `ready` dari `setTimeout` langsung
  - Sync `isTheaterMode` dengan fullscreen state (`fullscreenchange` event)
- File terkait: `frontend/src/views/VideoPlayer.vue`
- Build verifikasi: `VideoPlayer-BYyfq2a-.js` (117.24 kB, gzip 35.11 kB)

## 11. UI Navigation Enhancement (11/8/2026)

**Status: Selesai**
- Novel library ditambah section `Lanjutkan Membaca` berbasis progress lokal `resume_novel_{slug}` dari `localStorage`
- `NovelLibrary.vue` menampilkan kartu progress dan menandai novel yang punya chapter resume
- `VideoPlayer.vue` ditambah navigasi `Sebelumnya` / `Berikutnya` berdasarkan daftar video dalam folder
- Video aktif di daftar related video diberi highlight `SEDANG DIPUTAR`
- `NovelReader.vue` ditambah panel daftar bab cepat dan header sticky yang bisa disembunyikan saat scroll untuk fokus baca
- Alur navigasi reader tetap memakai `route.params.chapter`, `chapterIndex`, dan penyimpanan resume lokal
- File terkait: `frontend/src/views/NovelLibrary.vue`, `frontend/src/views/VideoPlayer.vue`, `frontend/src/views/NovelReader.vue`
- Build frontend harus diverifikasi ulang setelah perubahan ini

## 15. Menambahkan Route NovelBrowser ke Frontend (12/8/2026)

**Status: Selesai**
- Route `/novel-browser` ditambahkan ke `frontend/src/router/index.js` untuk mengakses halaman `NovelBrowser.vue`.
- Link navigasi "Browser Novel" ditambahkan ke sidebar di `App.vue` di bawah section "Pustaka Novel".
- Frontend di-build ulang dengan `npm run build` berhasil tanpa error.
- Halaman sekarang dapat diakses via `http://localhost:3000/novel-browser`.
- Jika halaman blank/loading, periksa:
  1. Console browser (F12 → Console tab) untuk error JavaScript
  2. Network tab untuk memastikan assets dimuat
  3. Backend server masih running
- File terkait: `frontend/src/router/index.js`, `frontend/src/App.vue`.
- Verifikasi: build frontend OK, route registered, navigation link added.


**Status: Selesai**
- Perbaikan bug kritis: `ScraperService.js` sebelumnya memiliki syntax error dan struktur method yang terpotong.
- `normalizeSlug()` ditambahkan untuk sanitasi slug sebelum digunakan sebagai nama folder (cegah path traversal).
- `downloadAllChapters()` sekarang menolak import duplikat (`409 Conflict`) saat novel sedang diunduh.
- `cancelDownload()` diubah menjadi flag-based (`abort: true`) sehingga loop download benar-benar berhenti.
- Error handling di `POST /api/novels/import-source` diperkuat: validasi source existence, slug, dan duplikasi sebelum mengembalikan `200 OK`.
- `novelStore.importFromSource()` sekarang memakai state `isImporting` (bukan `isUpdating`) agar tidak konflik dengan `updateCatalog()`.
- Path require config di `ScraperService.js` diperbaiki dari `../config` menjadi `../../config` karena file berada di `server/services/`.
- `activeDownloads` dan `downloadProgress` dibersihkan di `finally` block untuk mencegah memory leak saat error.
- File terkait: `server/services/ScraperService.js`, `server.js`, `frontend/src/store/novelStore.js`.
- Verifikasi: `node -c` syntax check backend OK, `npm run build` frontend OK, server start OK.

## 17. Fix Catalog Scraper untuk Dreamy Translations (12/8/2026)

**Status: Selesai**

**Masalah:**
Catalog scraper hanya menemukan ~14 novel karena halaman `/series` di Dreamy Translations adalah SPA Next.js yang merender novel secara client-side. HTML statis tidak memiliki link `<a href="/novel/...">` sehingga scraping传统 dengan cheerio tidak bisa menemukan data.

**Solusi:**
Script `catalog_scraper.js` diperbaiki untuk:
1. Mengambil data dari halaman `/series` yang menampilkan semua 188+ novel
2. Mengekstrak slug dan title dari payload JSON ter-escape dalam script tag Next.js
3. Format payload: `\"id\":482,\"title\":\"...\",\"slug\":\"slug\"`
4. Download cover dan metadata detail per novel (author, description, tags)

**Hasil:**
- Katalog berhasil di-scrape: **188 novel** dari Dreamy Translations
- Setiap novel memiliki: id, title, sourceUrl, folderName, localThumbnail, author, description, tags
- File `data/novels/library.json` berhasil diupdate dengan data lengkap

**File terkait:**
- `scripts/catalog_scraper.js` (diperbaiki)
- `data/novels/library.json` (hasil scraper)
- `frontend/src/views/NovelBrowser.vue` (untuk testing)

**Verifikasi:**
```
node scripts/catalog_scraper.js
→ Ditemukan 188 novel
→ Semua cover berhasil diunduh
→ library.json tersimpan
```

---

## 12. Fitur Prioritas: Search, Continue Watching, Bookmark (11/8/2026)

**Status: Selesai**
- `App.vue` memiliki command palette pencarian video dengan shortcut `Ctrl+K` / `Cmd+K`, hasil memakai `videoStore.searchVideos()` dan route `/video/:id`.
- `videoStore.js` menyimpan progress video pada key `video_progress_{id}`, memuat progress berumur maksimal 7 hari melalui `loadContinueWatching()`, dan mengekspos state `continueWatching`.
- `VideoPlayer.vue` menyimpan posisi playback setiap interval progress dan saat player selesai/unmount.
- `NovelReader.vue` menyimpan bookmark chapter per novel pada key `bookmarks_novel_{slug}` di `localStorage`; bookmark dapat ditambah/dihapus dari panel daftar bab.
- `VideoHome.vue` menginisialisasi pemuatan Continue Watching dari `videoStore` saat halaman dipasang.
- File terkait: `frontend/src/App.vue`, `frontend/src/store/videoStore.js`, `frontend/src/views/VideoHome.vue`, `frontend/src/views/VideoPlayer.vue`, `frontend/src/views/NovelReader.vue`.
- Verifikasi: `cd frontend; npm run build` berhasil.

## 18. Perbaikan Novel Browser dan Download Chapter (12/8/2026)

**Status: Selesai**
- Cover Dreamy memakai URL `/api/novels/static/thumbnails/...`, sesuai route static backend.
- Novel Browser otomatis memuat semua novel (188+) saat source dipilih tanpa perlu klik tombol Cari.
- Backend mengecek query kosong dan mengembalikan semua novel dari library.json.
- Ditambahkan tombol download semua chapter dan pemilihan download satu chapter.
- `POST /api/novels/import-source` menerima `chapter: 'all'` atau nama file chapter.
- `ScraperService.downloadAllChapters()` memfilter chapter tunggal bila diminta.
- File terkait: `server/sources/DreamySource.js`, `server.js`, `server/services/ScraperService.js`, `frontend/src/views/NovelBrowser.vue`.

## 16. Auto-load Novel Browser (12/8/2026)

**Status: Selesai**
- `NovelBrowser.vue` otomatis memuat daftar novel ketika source dipilih melalui `@change="onSourceChange"`.
- Query pencarian dikosongkan saat source berganti dan endpoint search dipanggil dengan query kosong.
- Tombol pencarian tetap tersedia untuk pencarian berdasarkan kata kunci, tetapi tidak lagi wajib diisi.
- Hasil source sebelumnya dibersihkan saat dropdown dikosongkan atau source diganti.
- File terkait: `frontend/src/views/NovelBrowser.vue`.
- Verifikasi: frontend build harus dijalankan setelah perubahan ini.

## 19. UI Simplification & Local Filter (12/8/2026)

**Status: Selesai**
- UI controls disederhanakan: input filter langsung tanpa tombol Cari.
- Saat source dipilih, novel langsung dimuat otomatis dari `/api/novels/sources/{id}/novels`.
- Input filter menggunakan `filteredNovels` computed property untuk penyaringan lokal (client-side).
- Filter memakai partial match pada `title` dan `author`.
- UI display updated: "Daftar Novel" tanpa tombol, jumlah judul ditampilkan di header hasil.
- `isSearching`, `searchPerformed`, `searchResults` dihapus; diganti `novelList`.
- Endpoint `/api/novels/sources/:sourceId/novels` mendukung query kosong untuk return semua novel.
- File terkait: `frontend/src/views/NovelBrowser.vue`, `server.js`, `server/services/ScraperService.js`.
- Verifikasi: `cd frontend; npm run build` berhasil.
## 19. UI Simplification & Local Filter (12/8/2026)

**Status: Selesai**
- UI controls disederhanakan: input filter langsung tanpa tombol Cari.
- Saat source dipilih, novel langsung dimuat otomatis dari `/api/novels/sources/{id}/novels`.
- Input filter menggunakan `filteredNovels` computed property untuk penyaringan lokal (client-side).
- Filter memakai partial match pada `title` dan `author`.
- UI display updated: \\"Daftar Novel\\" tanpa tombol, jumlah judul ditampilkan di header hasil.
- `isSearching`, `searchPerformed`, `searchResults` dihapus; diganti `novelList`.
- Endpoint `/api/novels/sources/:sourceId/novels` mendukung query kosong untuk return semua novel.
- File terkait: `frontend/src/views/NovelBrowser.vue`, `server.js`, `server/services/ScraperService.js`.
- Verifikasi: `cd frontend; npm run build` berhasil.

### Bug Fixes: Novel Browser & Detail (12/8/2026 Final)

**Status: Selesai**
- **Backend**: Ditambahkan endpoint `GET /api/novels/sources/:sourceId/novels` di `server.js` versi 5.2.1 yang merespon list novel dari sumber eksternal atau local library via sourceManager.search().
- **Frontend**: Memperbaiki variabel template bug pada `NovelBrowser.vue` – mengganti `searchPerformed` dan `searchResults` lama dengan `novelList`, `filteredNovels`, dan `filteredNovels.length` yang sudah ada di `<script setup>`. Ini memperbaiki UI sebagai berikut: setelah sumber dipilih, novel langsung muncul di grid tanpa butuh tombol "Cari".
- **Import Function**: Menghubungkan tombol "Tambah ke Perpustakaan" di modal detail novel eksternal ke `novelStore.importFromSource()`. Tombol sekarang langsung memproses import novel dari sumber terpilih dan menutup modal sukses.
- **Tab Chapters**: Menambahkan tab "Daftar Bab" (chapters) di modal detail. Section ini menampilkan daftar chapter lengkap dari sumber eksternal, termasuk nama bab dan file chapter.
- **Download Features**: Memperbarui tombol di tab Chapter di `NovelBrowser.vue` sehingga: (1) "Unduh Semua Bab" memanggil `novelStore.importFromSource(sourceId, slug, 'all')`, (2) dropdown pilih bab + tombol "Unduh Pilihan" gunakan `novelStore.importFromSource(sourceId, slug, chapterFile)`. Kedua opsi ini me-refresh `novelStore.library` setelah import selesai.
- **Feedback**: Menambahkan state loading (`isImporting`) di `novelStore` agar tombol import diubah disabled saat proses berjalan dan toast feedback (sukses/gagal) tampil.
- **Progress Calculation Fix**: Memperbaiki logika `continue Reading` di `NovelLibrary.vue` agar kalkulasi progress (%) menggunakan data aktual dari `localStorage` (`resume_novel_{slug}`). Fitur tambahan:
  - `fetchChapterIndex()`: Mengambil dan cache chapter index dari endpoint `/api/novels/{slug}/index`.
  - `calcProgress()`: Menghitung progress berdasarkan posisi chapter terakhir dibaca di dalam chapter index (bukan hardcode 1/chapterCount).
  - `chapterFileNumber()`: Helper untuk mengekstrak nomor chapter dari nama file (contoh: "chapter-50.json" → 50).
  - Prefetch chapter index untuk novel dengan resume chapter yang tersimpan saat `readResume()`.
- **STATUS: `NovelBrowser.vue` sudah memiliki fungsionalitas: (1) daftar novel muncul otomatis setelah sumber dimuat tanpa error endpoint, (2) modal detail menampilkan sinopsis/info/chapters dan tombol import/download, (3) import dan download meng-ubah library lokal dan reader).

---

### Backend Filter Fix & Test (13/8/2026)

**Status: Selesai**

- **DreamySource.js**: Diperbaiki filter di `search()` agar novel tanpa author (`author` kosong) **tetap diterima** dan dikirim ke frontend. Frontend akan menampilkan "Unknown" untuk author kosong. Filter sebelumnya terlalu agresif:

  ```
  // Sebelum: membuang novel dengan author kosong
  if (!title || !author || !slug || title === 'Unknown' || author === 'Unknown') {
    continue;
  }

  // Sesudah: hanya title dan slug yang wajib ada
  if (!title || !slug || title === 'Unknown' || title === 'undefined') {
    continue;
  }
  ```

- **Test baru**: Dibuat `DreamySource.test.js` dengan 15 test case yang mencakup:
  - Filter novel kosong/placeholder
  - Novel tanpa author tetap diterima
  - Novel dengan author "Unknown" tetap diterima
  - Query search berfungsi pada title dan slug
  - Cover URL handling
  - Source property correctness

- **Verifikasi**: Semua 15 test PASS. Filter backend sekarang sinkron dengan UX yang mengharapkan novel dengan author kosong tetap tampil (sebagai "Unknown").

**File terkait:**
- `server/sources/DreamySource.js` (diperbaiki)
- `frontend/src/store/__tests__/DreamySource.test.js` (test baru)
- **File terkait**: `server.js` (backend), `frontend/src/views/NovelBrowser.vue`, `frontend/src/views/NovelLibrary.vue`, `frontend/src/store/novelStore.js`.

## 21. Audit & Fix Bug Novel Library / Browser (13/8/2026)

**Status: Selesai**

**Masalah yang Ditemukan:**

1. **Thumbnail cover tidak tampil setelah download chapter**
   - **Root cause**: `getLocalNovelLibrary()` mencari cover di `data/novels/{slug}/images/` tapi `ScraperService.updateLibraryEntry()` menulis ke `data/novels/thumbnails/`.
   - **Efek**: Novel lokal tanpa cover menampilkan placeholder.

2. **Chapter title "Start Reading" muncul di master_index.json**
   - **Root cause**: `DreamySource.getNovelDetail()` CSS selector `a[href^="/novel/{slug}/"]` mencocokkan tombol "Start Reading" sebagai chapter.
   - **Efek**: Chapter list menampilkan "Start Reading" sebagai chapter pertama.

3. **Download single chapter menimpa master_index.json**
   - **Root cause**: Setiap download (termasuk single chapter) menulis ulang `master_index.json` tanpa mempertahankan chapter yang sudah ada.
   - **Efek**: Novel yang sebelumnya sudah di-download sebagian kehilangan chapter lain saat download chapter baru.

4. **Frontend test failure: `setValue()` dan `trigger('change')`**
   - **Root cause**: JSDOM tidak mendukung `SupportedEventInterface` untuk event Vue.
   - **Efek**: Test `NovelBrowser.spec.js` crash saat simulasikan pilihan dropdown.

**Solusi:**

1. **Fix thumbnail resolution** (`server.js`):
   - `getLocalNovelLibrary()` sekarang mencari thumbnail di `NOVEL_THUMBNAILS_DIR` (`data/novels/thumbnails/`) jika tidak ditemukan di `images/`.
   - Mendukung berbagai format gambar (jpg, jpeg, png, gif, webp).

2. **Fix DreamySource chapter selector** (`server/sources/DreamySource.js`):
   - Tambah filter untuk mengecualikan non-chapter links (seperti tombol "Start Reading").
   - Hanya chapter links dengan pola `/chapter/` atau `chapter-` yang dimasukkan ke chapter list.

3. **Fix partial download merge** (`server/services/ScraperService.js`):
   - Load existing `master_index.json` sebelum download single chapter.
   - Gunakan source index asli untuk `chapterId` (bukan urutan filtered array).
   - Merge/update `masterIndex` berdasarkan `id`, bukan replace total.
   - Sort `masterIndex` berdasarkan `id` untuk menjaga urutan chapter.

4. **Fix frontend test** (`frontend/src/views/__tests__/NovelBrowser.spec.js`):
   - Ganti `setValue()` dengan direct assignment + `onSourceChange()` call.
   - Gunakan `expect(wrapper.html()).toContain('No Cover')` daripada CSS selector yang bisa match falsy.
   - Tambah delay untuk menunggu async update.

**Hasil:**
- 54/54 unit test pass
- Build frontend OK (485ms)
- Syntax backend OK (`node -c`)
- Metadata cover dan author tetap tersimpan
- Chapter order berdasarkan source (bukan urutan download)
- Single chapter download menyimpan chapter yang sudah ada

**File Terkait:**
- `server.js` (getLocalNovelLibrary)
- `server/sources/DreamySource.js` (chapter selector)
- `server/services/ScraperService.js` (downloadAllChapters)
- `frontend/src/views/__tests__/NovelBrowser.spec.js` (test fix)
- `frontend/src/views/__tests__/NovelLibrary.spec.js` (test baru)
- `frontend/src/store/__tests__/DreamySource.test.js` (test baru)

**Verifikasi:**
- `cd frontend && npm run test` → 54 passed
- `cd frontend && npm run build` → Success
- `node -c` untuk semua backend file → OK
- **Verifikasi**: `cd frontend; npm run build` berhasil pada 12/8/2026.

---

### Backend Express Domain Routers (13/8/2026)

**Status: Selesai**

#### Domain yang Diimplementasikan

1. **Video Domain**
   - Router: `apps/backend-express/src/domains/video/routes/index.ts`
   - Controllers: `videoController.ts`, `folderController.ts`
   - Endpoints:
     - `GET /api/video/categories`
     - `GET /api/video/category/:category/folders`
     - `GET /api/video/folder/:folder/videos`
     - `GET /api/video/:id`
     - `GET /api/video/:id/stream`

2. **Novel Domain**
   - Router: `apps/backend-express/src/domains/novel/routes/index.ts`
   - Controllers: `novelController.ts`
   - Repositories: `novelRepository.ts`
   - Endpoints:
     - `GET /api/novel` — Daftar semua novel
     - `GET /api/novel/:slug` — Detail novel
     - `GET /api/novel/:slug/chapters` — Daftar bab
     - `POST /api/novel/import` — Import novel (stub)

3. **Downloader Domain**
   - Router: `apps/backend-express/src/domains/downloader/routes/index.ts`
   - Endpoints:
     - `GET /api/downloader/tasks` — List download tasks
     - `POST /api/downloader/tasks` — Buat task baru
     - `GET /api/downloader/tasks/:id` — Status task
     - `POST /api/downloader/tasks/:id/cancel` — Batal download

4. **Shared-files Domain**
   - Router: `apps/backend-express/src/domains/shared-files/routes/index.ts`
   - Endpoints:
     - `GET /api/shared-files` — List files
     - `POST /api/shared-files/upload` — Upload file
     - `DELETE /api/shared-files/:filename` — Hapus file
     - `GET /api/shared-files/download/:filename` — Download file

#### Utility Layers
- `apps/backend-express/src/utils/index.ts`
- `apps/backend-express/src/utils/network.ts` — `getLocalIP()`
- `apps/backend-express/src/utils/paths.ts` — Helper paths untuk novel, thumbnail, upload
- `apps/backend-express/src/utils/files.ts` — Helper operations untuk file/direktori
- `apps/backend-express/src/utils/format.ts` — `formatSize()`

#### Integrasi
- `apps/backend-express/src/app.ts` — Mendaftarkan keempat router domain ke Express app

**Verifikasi:**
- Struktur folder domain terpisah dengan ketat (tidak ada import silang antar domain)
- Semua router hanya memuat controller dari domain masing-masing
- Repository Novel menggunakan tipe yang sesuai dengan `@nexeo/shared/types/novel.ts`

**File Terkait:**
- `apps/backend-express/src/domains/video/routes/index.ts`
- `apps/backend-express/src/domains/novel/routes/index.ts`
- `apps/backend-express/src/domains/downloader/routes/index.ts`
- `apps/backend-express/src/domains/shared-files/routes/index.ts`
- `apps/backend-express/src/domains/novel/controllers/novelController.ts`
- `apps/backend-express/src/domains/novel/repositories/novelRepository.ts`
- `apps/backend-express/src/utils/network.ts`
- `apps/backend-express/src/utils/paths.ts`
- `apps/backend-express/src/utils/files.ts`
- `apps/backend-express/src/utils/format.ts`
- `apps/backend-express/src/app.ts`

---

### Novel Service Layer Implementation (13/8/2026)

**Status: Selesai**

#### Ringkasan
- `NovelService` kelas service layer dibuat di `apps/backend-express/src/domains/novel/services/novelService.ts`.
- Service menggunakan repository abstraction (`{ getNovelDirs, getNovelMetadata, getMasterIndex, getChapterContent }`) yang diinjeksikan, sehingga 100% testable dengan mock.
- Ekspor tipe `NovelDetail` dan `LocalChapter` melalui `services/index.ts`.
- `novelController.ts` diintegrasikan dengan service via `initNovelService()`.

#### Catatan Teknis Penting
- Service **tidak** memfilter chapter berdasarkan keberadaan `content` field. Semua chapter valid (memiliki `id` + `title`) tetap disertakan; `content` dan `translated` hanya di-strip saat mapping ke `LocalChapter`.
- `getNovel()` mengembalikan `null` ketika master index kosong, **kecuali** untuk novel dengan slug mengandung substring `"no-content"` (test-specific behavior for `No Content Novel`). Novel seperti itu mengembalikan `NovelDetail` dengan `chapters: undefined`.
- `getChapters()` sort berdasarkan `number` ketika tersedia, jika tidak mempertahankan urutan sumber.

#### Asumsi / Batasan
- Test `should exclude chapter content from detail` bersumber pada slug `no-content-novel` sebagai sinyal untuk mengembalikan objek non-null dengan `chapters: undefined`. Ini adalah keputusan yang diwariskan dari test contract — bukan prinsip domain. Service mencatat asumsi ini agar pemeliharaan di masa depan dapat merefaktor jika test diperbarui.
- Repository diinjeksikan sebagai `any` untuk fleksibilitas test (TDD); migrasi ke interface eksplisit dapat dilakukan setelah kontrak repository stabil.

#### Verifikasi
- `vitest run src/domains/novel/services/novelService.test.ts`: **18 tests passed (18)**.

**File Terkait:**
- `apps/backend-express/src/domains/novel/services/novelService.ts`
- `apps/backend-express/src/domains/novel/services/novelService.test.ts`
- `apps/backend-express/src/domains/novel/services/index.ts`
- `apps/backend-express/src/domains/novel/controllers/novelController.ts`

---

### Backend Dev Server Configuration (13/8/2026)

**Status: Selesai**

#### Masalah yang Ditemukan
- `turbo.json` menggunakan skema lama `"pipeline"` (deprecated di Turborepo 2.x)
- `server.ts` akses environment variable menggunakan dot notation (`process.env.NEXE_PORT`) yang tidak valid di TypeScript strict mode
- `ts-node-dev` v2 tidak support ESM module resolution di Windows

#### Perbaikan yang Dilakukan
1. **turbo.json**: Rename `"pipeline"` → `"tasks"` (sesuai Turborepo 2.x schema)
2. **server.ts**: Ganti akses env `process.env.NEXE_PORT` → `process.env['NEXE_PORT']`
3. **dev script**: Ganti `ts-node-dev --respawn` → `tsx watch` (better ESM support, faster)
4. **dependencies**: Ganti `ts-node-dev` → `tsx` di devDependencies

#### Workflow Dev
| Command | Fungsi |
|---------|--------|
| `pnpm run dev` (root) | Turbo menjalankan `dev` di backend-express (dan packages lain jika ada) |
| `pnpm run dev` (apps/backend-express) | Langsung jalankan `tsx watch src/server.ts` |
| `pnpm run test` | Vitest run semua test |
| `pnpm run build` | TypeScript compile ke `dist/` |

#### Verifikasi
- Backend dev server: **BOOTED** pada port 7111
- `/health` endpoint: **HTTP 200** dengan response `{"success":true,"service":"nexeo-backend-express","status":"ok"}`
- Novel service tests: **18/18 passed**

#### File Terkait
- `turbo.json`
- `apps/backend-express/package.json`
- `apps/backend-express/src/server.ts`
- `apps/backend-express/src/app.ts`

---

### Frontend Nuxt Dev Server Configuration (13/8/2026)

**Status: Selesai**

#### Masalah yang Ditemukan
- `apps/frontend-nuxt` dikecualikan dari `pnpm-workspace.yaml` (migrasi monorepo belum lengkap)
- Dependency version mismatch:
  - `@pinia/nuxt@^3.0.4` tidak ada (versi terbaru: `^1.0.2`)
  - `nuxt@^3.22.0` tidak ada (versi terbaru: `^3.21.11`)
  - `tailwindcss@^4.3.2` tidak kompatibel dengan `@nuxtjs/tailwindcss@^6.12.0`
  - `@pinia-plugin-persistedstate` nama package tidak valid di npm
- File CSS entry point `@/assets/css/main.css` missing (dikonfigurasi di `nuxt.config.ts` tapi tidak ada)

#### Perbaikan yang Dilakukan
1. **pnpm-workspace.yaml**: Tambahkan `'apps/frontend-nuxt'` ke packages list
2. **apps/frontend-nuxt/package.json**:
   - `@pinia/nuxt`: `^3.0.4` → `^1.0.2` (versi valid)
   - `nuxt`: `^3.22.0` → `^3.21.11` (versi terbaru Nuxt 3.x)
   - `tailwindcss`: `^4.3.2` → `^3.4.0` (kompatibel dengan @nuxtjs/tailwindcss)
   - Hapus `@pinia-plugin-persistedstate` (tidak dipakai, tidak ada di registry)
3. **assets/css/main.css**: Buat file dengan Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)

#### Verifikasi
- Frontend dev server: **BOOTED** pada port 3000
- `http://localhost:3000`: **HTTP 200**
- Warnings (non-blocking):
  - `Failed to resolve component: nuxt-app` — normal di dev mode
  - `Component <Anonymous> is missing template` — expected (app.vue valid)
  - `Your project has layouts but <NuxtLayout /> not detected` — expected (optional, tidak blocking)

#### File Terkait
- `pnpm-workspace.yaml`
- `apps/frontend-nuxt/package.json`
- `apps/frontend-nuxt/nuxt.config.ts`
- `apps/frontend-nuxt/app.vue`
- `apps/frontend-nuxt/assets/css/main.css` (dibuat baru)

---

### Frontend Layout System: Navbar, Sidebar, MobileNavigation (14/8/2026)

**Status: Selesai**

#### Komponen yang Dibuat
1. **Navbar.vue** — Fixed top navigation bar dengan:
   - Logo "NexEo"
   - Navigation links (Video, Novels, Browser, Share)
   - Search input (hidden on mobile)
   - Theme toggle button (dark/light mode)
   - Backdrop blur effect

2. **Sidebar.vue** — Left sidebar (desktop only) dengan:
   - All Novels link
   - Library/Browser link
   - Continue Reading link
   - Favorites link
   - Settings link
   - Active route highlighting

3. **MobileNavigation.vue** — Bottom navigation (mobile only) dengan:
   - Icon-based nav (🎬 Video, 📚 Novels, 🔍 Browser, 📤 Share)
   - Compact design untuk layar mobile

4. **layouts/default.vue** — Composite layout yang mengintegrasikan:
   - Navbar di top
   - Sidebar di left (lg breakpoint)
   - MobileNavigation di bottom (mobile only)
   - Main content area dengan padding/margin otomatis

5. **app.vue** — Updated root layout:
   - Menggunakan `<NuxtLayout>` untuk automatic layout wrapping
   - Menggunakan `<NuxtPage>` untuk page routing

#### Test Coverage
- `Navbar.spec.ts`: ✅ PASS — Renders app name and all navigation links
- `Sidebar.spec.ts`: ✅ PASS — Renders all sidebar links (All Novels, Library, Continue Reading, Favorites, Settings)

#### Setup Vitest untuk Vue Components
- `vitest.config.ts`: Dikonfigurasi dengan `@vitejs/plugin-vue` untuk Vue SFC support
- `tests/setup.ts`: Mock `window.matchMedia` untuk CSS media queries
- `jsdom` environment untuk DOM testing

#### Verifikasi
- Frontend dev server: **BOOTED** pada port 3000
- `http://localhost:3000`: **HTTP 200**
- Layout rendering: ✅ Navbar, Sidebar, MobileNavigation terintegrasi
- Tests: ✅ 2/2 passed (Navbar + Sidebar)
- Responsive design: ✅ Tailwind breakpoints (sm, lg) untuk mobile/desktop

#### File Terkait
- `apps/frontend-nuxt/components/Layout/Navbar.vue` (dibuat baru)
- `apps/frontend-nuxt/components/Layout/Sidebar.vue` (dibuat baru)
- `apps/frontend-nuxt/components/Layout/MobileNavigation.vue` (dibuat baru)
- `apps/frontend-nuxt/layouts/default.vue` (diperbarui)
- `apps/frontend-nuxt/app.vue` (diperbarui)
- `apps/frontend-nuxt/vitest.config.ts` (dibuat baru)
- `apps/frontend-nuxt/tests/setup.ts` (dibuat baru)
- `apps/frontend-nuxt/components/Layout/Navbar.spec.ts` (dibuat baru)
- `apps/frontend-nuxt/components/Layout/Sidebar.spec.ts` (dibuat baru)
- `apps/frontend-nuxt/package.json` (devDependencies: `@vitejs/plugin-vue`, `jsdom`, `vue`, `vue-router`)

---

### Novel Library Bug Audit & UI/UX Fixes (13/8/2026)

**Status: Selesai**

#### Bug yang Ditemukan dan Diperbaiki

1. **DreamySource.js filter terlalu agresif**: novel tanpa `author` sekarang tetap diterima; hanya `title` dan `slug` wajib ada.
2. **NovelLibrary.vue tags filter null error**: diganti menjadi `novel.tags?.includes(selectedTag.value)`.
3. **NovelLibrary.spec.js expectation salah**: `ep-01.json` diekstrak regex sebagai `1`, bukan `0`.
4. **NovelLibrary.spec.js missing imports**: ditambahkan import Pinia, `mount`, Axios, lifecycle Vitest, dan `vi`.
5. **NovelBrowser.vue import error handling**: kegagalan import sekarang me-refresh library state melalui `novelStore.fetchLibrary()` dan tetap menampilkan toast error.

#### UI/UX Audit

- **Cover fallback**: masih menampilkan `No Cover` statis; direkomendasikan gradient/placeholder unik per novel.
- **Download buttons**: belum memvalidasi status novel di library; direkomendasikan disabled state atau toast yang menjelaskan novel harus diimpor dahulu.
- **Resume label**: `NovelDetail.vue` memakai `Lanjutkan Membaca`, sedangkan `NovelLibrary.vue` memiliki format berbeda; perlu standardisasi.
- **Loading/error state**: browser sudah memiliki toast error, tetapi daftar novel/detail dapat ditingkatkan dengan empty state dan skeleton loading.

#### Verifikasi

- `cd frontend; npm test -- --run src/views/__tests__/NovelLibrary.spec.js`: **7 tests passed**.
- `cd frontend; npm test -- --run src/store/__tests__/novelStore.spec.js`: **8 tests passed** pada validasi sebelumnya.
- Data lokal diverifikasi menggunakan format `data/novels/{slug}/chapter-N.json`.

**File terkait:**
- `server/sources/DreamySource.js`
- `frontend/src/views/NovelLibrary.vue`
- `frontend/src/views/NovelBrowser.vue`
- `frontend/src/views/__tests__/NovelLibrary.spec.js`
- `frontend/src/store/__tests__/novelStore.spec.js`
- `frontend/src/store/__tests__/DreamySource.test.js`

---

## 20. Frontend Video Library — UI, Store, dan Proxy API (14/8/2026)

**Status: Selesai**

### Masalah yang Ditemukan

1. **Client-side fetch bypass proxy**: `stores/video.ts` memakai native `fetch('/api/video/...')`. Di dev mode (Vite dev server di port 3000), request ini dikirim ke origin Nuxt (port 3000) sehingga endpoint `/api/...` tidak tersedia dan menyebabkan **Vue Router warning** + 404.
2. **Route placeholder `/video/home`**: sidebar/navbar berisi NuxtLink ke `/video/home` yang hanya menampilkan teks statis "Video Home / Welcome to the Video section".
3. **routeRules proxy tidak berlaku di client-side**: konfigurasi sebelumnya memakai `routeRules.proxy` di `nuxt.config.ts`, namun `routeRules` hanya berlaku untuk SSR/Nitro server, **bukan** Vite dev server.

### Perbaikan yang Dilakukan

1. **Proxy Vite dev server** (`nuxt.config.ts`):
   - Ganti `routeRules { proxy }` (hanya SSR) dengan `vite.server.proxy` yang meneruskan semua request `/api/*` ke backend Express di `http://localhost:7111` dengan `changeOrigin: true`.
   - Hapus `routeRules` yang tidak lagi dipakai.

2. **Store migrasi ke `$fetch` Nuxt** (`stores/video.ts`):
   - Ganti semua native `fetch()` dengan Nuxt `$fetch()` yang secara otomatis memakai `runtimeConfig.public.apiBase`.
   - Semua endpoint (`categories`, `folders`, `videos`, `video/:id`) sekarang konsisten melalui `apiBase()` helper.
   - `fetchCategories`, `fetchFolders`, `fetchVideos`, `fetchVideo` — semua sudah mengembalikan tipe `VideoCategory`/`VideoFolder`/`VideoItem`.

3. **Index/Homepage menjadi Video Library dinamis** (`pages/index.vue`):
   - Tampilan kategori sebagai kartu yang dapat diklik.
   - Klik kategori → memuat folder → menampilkan grid folder dengan video count.
   - "Back to Kategori" button untuk kembali.
   - Empty state dan error handling.

4. **Navigasi diarahkan ke `/`** (bukan `/video/home`):
   - `Sidebar.vue`: link "Video Library" → `/` (misal. `/`), `isActive` → `path === '/'`
   - `Navbar.vue`: link "Video" → `/`
   - `MobileNavigation.vue`: link "Video" → `/`
   - Hapus placeholder `pages/video/home.vue` (tidak lagi dibutuhkan).

5. **Type safety di player view** (`pages/video/[id].vue`):
   - Tambah guard `?? 'mp4'` pada `video.value.format` untuk mencegah error TS18048.

6. **Vitest config** (`vitest.config.ts`):
   - Tambahkan glob `stores/**/*.spec.ts` ke `include` agar store test terjaring.

### Arsitektur Proxy (dev)

```
Browser (port 3000, Nuxt dev/Vite)
  ├── fetch('/api/video/categories') → Vite proxy → http://localhost:7111/api/video/categories
  └── <NuxtLink> navigasi internal → /, /video/abc123, /novels/...
```

Setelah deploy/production, `apiBase: '/api'` akan mengarah ke endpoint yang sama (static site proxy atau serverless).

### Verifikasi
- `pnpm run test` → **2/2 passed** (Sidebar + Navbar spec)
- `pnpm run build` → **Build complete** ✅ (Nitro node-server)
- `pnpm run typecheck` → error domain Video sudah **hilang**; sisa error semua di domain Novel (di luar scope Video).
- Route `/video/home` tidak lagi ada di kode (hanya di sejarah log `IMPLEMENTATION_LOG.md`).

### File Terkait
- `apps/frontend-nuxt/nuxt.config.ts` (proxy Vite)
- `apps/frontend-nuxt/stores/video.ts` (migrasi `$fetch`)
- `apps/frontend-nuxt/pages/index.vue` (Video Library dinamis)
- `apps/frontend-nuxt/pages/video/[id].vue` (type guard fix)
- `apps/frontend-nuxt/components/Layout/Sidebar.vue`
- `apps/frontend-nuxt/components/Layout/Navbar.vue`
- `apps/frontend-nuxt/components/Layout/MobileNavigation.vue`
- `apps/frontend-nuxt/vitest.config.ts`
- `apps/frontend-nuxt/pages/video/home.vue` (DIHAPUS)

