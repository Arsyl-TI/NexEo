# Technical Execution Plan: Global Quick Search Command Palette (`Ctrl+K`)

Target Files:
- `apps/frontend-nuxt/components/CommandPalette.vue`
- `apps/frontend-nuxt/components/Layout/Navbar.vue`
- `apps/frontend-nuxt/layouts/default.vue`

## Step-by-Step Execution Steps

1. **Create Command Palette Component (`components/CommandPalette.vue`)**:
   - Keyboard listener for `Ctrl+K`, `Cmd+K`, and `Escape`.
   - Real-time search query execution across videos, novels, and shared files.
   - Results grouped by type with visual icons (🎬 Video, 📖 Novel, 📤 Shared File).
   - Keyboard arrow keys (`↑` / `↓`) and `Enter` key to navigate straight to the selected result.

2. **Integrate into Global Layout & Navbar (`layouts/default.vue` & `Navbar.vue`)**:
   - Mount `<CommandPalette />` globally in `layouts/default.vue`.
   - Add a clickable `🔍 Cari (Ctrl+K)` button in `Navbar.vue`.

3. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` and `pnpm turbo run build`.

4. **Git Commit & Progress Log**:
   - Append log entry in `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(search): add Global Quick Search Command Palette (Ctrl+K)"`.
