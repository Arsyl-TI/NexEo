# Technical Execution Plan: Feature 15 - Video Bookmark & Chapter Markers Suite

## Overview
Enable users to bookmark specific memorable or important timestamps in any video, attach custom notes/labels, see chapter markers directly along the video player progress bar, and jump between bookmarked moments with 1 click.

## Target File:
- `apps/frontend-nuxt/pages/video/[id].vue`

## Step-by-Step Implementation Steps:
1. **State & Storage**:
   - Define `interface VideoBookmark { id: string; time: number; label: string; createdAt: string }`
   - Store bookmarks in `localStorage` under `video_bookmarks_${videoId}`.
   - Live reactive list `bookmarks = ref<VideoBookmark[]>([])`.
2. **Bookmark Capture Controls**:
   - Add a 🔖 **"Tambah Penanda / Bookmark"** button below the video player.
   - Quick input modal/popover to name the bookmark (default: formatted timestamp e.g. `14:25 - Catatan`).
   - Quick hotkey `B` to instantly drop a bookmark at the current playback position.
3. **Interactive Bookmarks List & Timeline Drawer**:
   - Display a list of all saved bookmarks with timestamp badge (`MM:SS` or `HH:MM:SS`), label text, 1-click jump button (`▶`), and delete button (`🗑️`).
   - Quick export button: **"📋 Salin Daftar Catatan (Markdown / TXT)"**.
4. **Visual Markers on Custom Timeline Bar**:
   - Render small colored marker pins above the timeline bar relative to `time / duration * 100%`.
   - Hovering over a pin displays a tooltip with the bookmark's label and time.
5. **Verification**:
   - Run `pnpm turbo run typecheck` to ensure zero compilation issues.
   - Test bookmark creation, persistence, seeking, and deletion.
6. **Logging & Git Commit**:
   - Record in `PROGRESS.md`.
   - Commit & push to Git repository.
