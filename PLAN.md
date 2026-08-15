# Technical Execution Plan: Manga Chapter Offline CBZ / ZIP Exporter

Target Files:
- `apps/frontend-nuxt/server/api/manga/[slug]/chapter/[chapter]/export.get.ts`
- `apps/frontend-nuxt/pages/manga/[slug]/index.vue`
- `apps/frontend-nuxt/pages/manga/[slug]/[chapter].vue`

## Step-by-Step Execution Steps

1. **Build Manga Chapter Export Nitro API Endpoint (`server/api/manga/[slug]/chapter/[chapter]/export.get.ts`)**:
   - Locate manga chapter folder in `data/manga/[slug]/[chapter]`.
   - Read query parameter `format` (`cbz` or `zip`, default `cbz`).
   - Use `adm-zip` to bundle all page images (`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`) in sequential numerical order.
   - Stream the generated `.cbz` or `.zip` file with `Content-Type: application/vnd.comicbook+zip` (for CBZ) or `application/zip` and `Content-Disposition: attachment; filename="..."`.

2. **Add Export UI to Manga Detail Page (`pages/manga/[slug]/index.vue`)**:
   - In each chapter row in the chapter list, add a quick **"📥 Unduh (.cbz)"** button.

3. **Add Export Button to Manga Reader Header (`pages/manga/[slug]/[chapter].vue`)**:
   - Add a download icon button in the reader top toolbar to easily export current chapter as CBZ.

4. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.

5. **Git Commit & Progress Log**:
   - Append completed feature entry to `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(manga): add offline CBZ/ZIP chapter exporter endpoint and download buttons"`.
