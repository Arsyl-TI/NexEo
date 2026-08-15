# Technical Execution Plan: Feature 17 - Manga Webtoon Hands-Free Auto-Scroll Engine

## Overview
Add a smooth, hands-free auto-scrolling engine for vertical manga and webtoon reading in `pages/manga/[slug]/[chapter].vue`. Readers can sit back and let long webtoon chapters scroll down automatically at an adjustable speed (`0.5x` to `5.0x`).

## Target File:
- `apps/frontend-nuxt/pages/manga/[slug]/[chapter].vue`

## Step-by-Step Implementation Steps:
1. **Auto-Scroll Engine State**:
   - `isAutoScrolling = ref(false)`
   - `autoScrollSpeed = ref(1.5)` (pixels per frame interval)
   - `scrollInterval: any = null`
2. **Floating Auto-Scroll Controller Widget**:
   - Add 📜 **Auto-Scroll** button in the Manga reader toolbar.
   - Floating glassmorphic widget at bottom of screen with Play/Pause button (`▶ Auto Scroll` / `⏸ Hentikan`), speed selector buttons (`0.5x`, `1.0x`, `2.0x`, `3.0x`, `5.0x`), and Spacebar toggle support.
3. **Smooth Animation Loop**:
   - Use `requestAnimationFrame` or high-frequency interval (`window.scrollBy({ top: speed })`).
   - Automatically stop when reaching the end of the page (`window.scrollY + window.innerHeight >= document.body.scrollHeight - 10`).
4. **Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.
5. **Logging & Git Commit**:
   - Record in `PROGRESS.md`.
   - Commit & push to Git repository.
