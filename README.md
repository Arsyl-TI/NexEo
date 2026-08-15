# 🎥 NexEo — Personal LAN Streaming & Full-Stack Nuxt 3 Novel Reader

NexEo adalah aplikasi server media personal berbasis **Full-Stack Nuxt 3 (Nitro Engine)** untuk jaringan lokal (LAN) yang menyatukan pemutar video streaming, pustaka baca novel premium, pemindai scraper otomatis, dan penerjemah otomatis multi-engine (Google Translate, Gemini 1.5, DeepL, LibreTranslate Docker).

---

## 🚀 Fitur Utama

### 1. Pemutar Media Streaming (LAN)
* **Kategori Video**: Organisasi otomatis folder video lokal (`D:\Video\Anime` & `D:\Video\YouTube`).
* **Generasi Thumbnail Direct Seek**: Pembuatan *thumbnail* pratinjau otomatis menggunakan `fluent-ffmpeg` tanpa ketergantungan pada `ffprobe`.
* **HTTP Range Streaming**: Pemutaran video `.mp4`, `.mkv`, `.avi` yang lancar dengan pencarian timeline responsif.

### 2. Pustaka Novel & Scraper Premium
* **Online Browser & Scraper**: Mengunduh katalog dan bab novel langsung dari **Dreamy Translations** & **Noveldex** (termasuk 500+ novel dengan API pagination).
* **Import EPUB**: Pengunggahan dan ekstraksi otomatis berkas `.epub` ke pustaka lokal.
* **Scraper Otomatis**: Mengunduh bab-bab novel langsung dari sumber target beserta ilustrasi gambarnya secara otomatis.
* **Pembaca Premium**: 
  - Mode baca kustom: Tema Terang (Light), Gelap (Dark), Sepia, serta penyesuaian font.
  - Progres baca otomatis (**Resume Reading**).
  - Penayang gambar ilustrasi bab dan cover novel.

### 3. Multi-Engine Translator (Terjemahan Real-time & Massal)
Mendukung 4 pilihan mesin penerjemah Bahasa Inggris ke Bahasa Indonesia:
1. **🌐 Google Translate (Gratis/Bawaan)**: Tanpa API Key.
2. **⚡ Gemini 1.5 Flash API**: Kualitas penerjemahan AI kontekstual sastra novel.
3. **🎯 DeepL API**: Presisi tinggi dengan penanganan key Pro & Free (`:fx`).
4. **🐳 LibreTranslate (Self-Hosted Docker)**: Menjalankan server lokal `http://localhost:5000` tanpa batas kuota.

---

## 🛠️ Panduan Instalasi & Menjalankan Aplikasi

### 1. Jalankan Aplikasi Full-Stack Nuxt 3
```bash
# Instal dependensi monorepo
pnpm install

# Menjalankan dev server (Port 3000)
pnpm dev

# Membangun build produksi
pnpm build
```
Akses di browser melalui: **http://localhost:3000**

### 2. Jalankan LibreTranslate Docker (Opsional)
```bash
docker run -d -p 5000:5000 -e LT_LOAD_ONLY=en,id --name libretranslate libretranslate/libretranslate
```
Server penerjemah lokal akan berjalan di **http://localhost:5000**.
