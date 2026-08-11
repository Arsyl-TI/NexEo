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
4. Translate-all memakai script translator dan endpoint server.
5. Reader menampilkan chapter dan menyimpan progress baca.

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

