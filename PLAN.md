# Technical Execution Plan: Novel Reading Pomodoro & Sleep Timer Suite

Target File:
- `apps/frontend-nuxt/pages/novels/[slug]/[chapter].vue`

## Step-by-Step Execution Steps

1. **Reading Focus & Sleep Timer Modal**:
   - Add a ⏱️ **Timer Fokus** button on the Novel Reader toolbar.
   - Modal with quick presets: `15m`, `25m (Pomodoro)`, `45m`, `60m`, and Custom duration.
   - Toggle options:
     - 🔔 Bunyikan Bel Selesai (Soft Web Audio Chime).
     - 🛑 Hentikan Audiobook & Suara Relaksasi Otomatis saat Waktu Habis (Sleep Timer Mode).

2. **Live Countdown Badge & Floating Timer Controller**:
   - Display a clean countdown badge in the reader header toolbar (`⏱️ 24:59`).
   - Allow 1-click pause, extend (+5m), or cancel timer at any time.

3. **Timer Expiry Actions**:
   - Synthesize a gentle 3-tone chime chime using `AudioContext` oscillator.
   - Automatically trigger `stopAudiobook()` and `stopAmbient()`.
   - Show gentle completion toast notification.

4. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.

5. **Git Commit & Progress Log**:
   - Append completed feature entry to `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(novel): add Reading Pomodoro focus & sleep timer with auto-pause"`.
