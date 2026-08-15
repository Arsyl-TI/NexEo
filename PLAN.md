# Technical Execution Plan: Downloader Batch Multi-URL Queue Manager

Target File:
- `apps/frontend-nuxt/pages/downloader/index.vue`

## Step-by-Step Execution Steps

1. **Batch Multi-URL Insertion Mode**:
   - Add Mode Switcher: "Single URL" vs "📋 Batch Multi-URL (Tempel Banyak Tautan)".
   - Multi-line textarea parser parsing URLs line by line.
   - Automatically extracts sensible filenames from URLs (e.g. `video-01.mp4`, `chapter-10.zip`).
   - Batch dispatches all tasks to `downloaderStore.addTask()`.

2. **Queue Filter & Statistics Toolbar**:
   - Filter tabs: `Semua`, `⚡ Aktif (Downloading/Pending)`, `✓ Selesai`, `❌ Gagal/Batal`.
   - Clear all completed tasks action (`🗑️ Bersihkan Selesai`).

3. **1-Click Retry / Re-download Mechanism**:
   - For `failed` or `cancelled` tasks, add a `🔄 Ulangi Unduhan` button that re-enqueues the task url.

4. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.

5. **Git Commit & Progress Log**:
   - Append completed feature entry to `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(downloader): add batch multi-URL queue insertion, status filters, and 1-click retry"`.
