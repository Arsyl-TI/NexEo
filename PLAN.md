# Technical Execution Plan: Video Playback Continue Watching Carousel

Target Files:
- `apps/frontend-nuxt/pages/video/[id].vue`
- `apps/frontend-nuxt/pages/index.vue`

## Step-by-Step Execution Steps

1. **Update Video History Tracker (`pages/video/[id].vue`)**:
   - Save rich watch history object into `localStorage.getItem('recent_videos_history')` whenever video timestamp updates.
   - History item schema: `{ id, name, title, format, folder, timestamp, duration, timestampFormatted, percent, updatedAt }`.

2. **Build "Lanjutkan Menonton" Carousel Component (`pages/index.vue`)**:
   - Read `recent_videos_history` array on mounted in `pages/index.vue`.
   - Render a horizontal scrollable card carousel above category selection.
   - Each card features:
     - Video thumbnail with hover zoom.
     - Play button overlay with watch progress percentage bar.
     - Saved timestamp (e.g. `🍿 Lanjutkan di 14:32`).
     - 1-Click navigation back into video player.

3. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` and `pnpm turbo run build`.

4. **Git Commit & Progress Log**:
   - Append log entry in `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(video): add Continue Watching playback carousel to video homepage"`.
