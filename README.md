# 🎥 NexEo — Personal LAN Streaming & Premium Novel Reader

NexEo adalah aplikasi server media personal berbasis web untuk jaringan lokal (LAN) yang menyatukan pemutar video streaming dan pustaka baca novel premium yang dilengkapi dengan penerjemah otomatis bertenaga AI.

---

## 🚀 Fitur Utama

### 1. Pemutar Media Streaming (LAN)
* **Kategori Video**: Organisasi otomatis folder video lokal (Anime, YouTube, Facebook).
* **Generasi Thumbnail**: Pembuatan *thumbnail* pratinjau otomatis menggunakan `fluent-ffmpeg`.
* **Streaming Ringan**: Pengodean dinamis dan pemutaran video lancar di berbagai perangkat dalam jaringan LAN yang sama.

### 2. Pustaka Novel & Scraper Premium
* **Scraper Otomatis**: Mengunduh bab-bab novel langsung dari sumber target (``) beserta ilustrasi gambarnya secara otomatis.
* **Pembaca Premium**: 
  - Panel kustomisasi pembaca: Tema Terang (Light), Gelap (Dark), Sepia, serta ukuran font yang bisa disesuaikan.
  - Fitur **Lanjutkan Membaca** yang otomatis mengingat progres halaman bab terakhir Anda untuk setiap novel.
  - Tombol **Bab Sebelumnya** dan **Bab Berikutnya** di akhir halaman untuk navigasi cepat.
* **Pencarian & Genre Filter**: Pencarian novel instan berdasarkan judul dan penyaringan berdasarkan kategori genre.

### 3. Multi-Engine Translator (Terjemahan Otomatis)
Mendukung 4 pilihan mesin penerjemah bahasa Inggris ke Indonesia saat melakukan scraping bab:
1. **Google Translate (Gratis)**: Tanpa kunci API, andal namun dibatasi oleh Google jika terlalu cepat.
2. **Gemini API (AI Studio)**: Kualitas penerjemahan AI terbaik, sangat alami, super cepat (Batching 15 paragraf).
3. **DeepL API**: Terjemahan khusus untuk karya sastra dengan presisi tinggi.
4. **LibreTranslate (Self-Hosted)**: Menjalankan mesin penerjemah secara lokal via Docker 100% gratis tanpa batas.

---

## 🛠️ Panduan Instalasi & Menjalankan Aplikasi

### 1. Jalankan Server Utama (Backend & Frontend)
Pastikan dependensi Node.js terinstal terlebih dahulu. Di root folder `NexEo`:
```bash
# Instal dependensi
npm install

# Jalankan server lokal
npm start
```
Aplikasi NexEo dapat diakses di browser melalui: **http://localhost:3000**

*(Catatan: Jika Anda melakukan perubahan kode di dalam folder `frontend`, Anda harus membangun kembali aset statis dengan masuk ke folder `frontend` dan menjalankan `npm run build`.)*

### 2. Jalankan Penerjemah Lokal (LibreTranslate via Docker)
Jika Anda ingin menerjemahkan novel secara gratis tanpa batas kuota internet, jalankan kontainer Docker LibreTranslate yang dikhususukan untuk bahasa Inggris-Indonesia:
```bash
docker run -d -p 5000:5000 -e LT_LOAD_ONLY=en,id --name libretranslate libretranslate/libretranslate
```
Server penerjemah lokal akan berjalan di: **http://localhost:5000**

---

## 📖 Cara Menggunakan Scraper Novel

Untuk mengunduh bab baru dari novel pilihan Anda:
1. Jalankan skrip interaktif scraper di terminal:
   ```bash
   node scripts/mass_scraper.js
   ```
2. Pilih nomor novel yang terdaftar di pustaka.
3. Masukkan URL bab awal (dari dreamy-translations) dan nomor urut bab pertama.
4. Pilih mesin penerjemah yang Anda inginkan (Google Translate / Gemini / DeepL / LibreTranslate).
5. Skrip akan berjalan otomatis mengunduh, menerjemahkan, mengunduh ilustrasi gambar, dan menyusunnya ke dalam antarmuka web NexEo.

---

## 🔒 Konfigurasi Keamanan (API Key)
Untuk menjaga keamanan kunci API Anda agar tidak bocor ke publik atau GitHub:
* Jangan pernah menuliskan API Key langsung di dalam berkas `config.js`.
* **Cara Aman**: Buat file bernama `.env` di folder utama proyek (sudah otomatis diabaikan oleh `.gitignore`), lalu isikan kunci Anda:
  ```env
  GEMINI_API_KEY=KUNCI_GEMINI_ANDA
  DEEPL_API_KEY=KUNCI_DEEPL_ANDA
  ```
