# Technical Execution Plan: Feature 16 - Novel Text Keyword In-Chapter Search & Highlighter

## Overview
Add a dedicated in-chapter text search and highlight bar to the Novel Reader (`pages/novels/[slug]/[chapter].vue`). Allows users to search for any word/phrase inside long novel chapters, see total match counts, navigate between matches using `▲`/`▼` keys or buttons, and visually highlight all matching text with luminous markers.

## Target File:
- `apps/frontend-nuxt/pages/novels/[slug]/[chapter].vue`

## Step-by-Step Implementation Steps:
1. **Search Toolbar & UI Controls**:
   - Add a 🔍 **"Cari Teks"** toggle button in the reader header toolbar.
   - Expandable floating search bar with search input, match counter badge (`X / Y`), `▲ Sebelumnya`, `▼ Selanjutnya`, and `✕ Tutup`.
2. **Text Highlighting Logic**:
   - Create computed/rendered paragraph builder that replaces matching text queries with `<mark class="bg-amber-400/30 text-amber-200 border-b-2 border-amber-400 px-0.5 rounded">...</mark>`.
   - Track `activeMatchIndex` (0 to total matches - 1).
3. **Smooth Scroll & Navigation**:
   - When active match changes, scroll the target paragraph smoothly into view using `element.scrollIntoView({ behavior: 'smooth', block: 'center' })`.
   - Highlight the current active match with a distinct border/glow.
4. **Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.
5. **Logging & Git Commit**:
   - Record in `PROGRESS.md`.
   - Commit & push to Git repository.
