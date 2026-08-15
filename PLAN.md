# Technical Execution Plan: Novel Offline TXT Exporter / Downloader

Target Files:
- `apps/frontend-nuxt/server/api/novels/[slug]/export.get.ts`
- `apps/frontend-nuxt/pages/novels/[slug]/index.vue`

## Step-by-Step Execution Steps

1. **Build Export Nitro API Endpoint (`server/api/novels/[slug]/export.get.ts`)**:
   - Read novel metadata and all chapter `.txt` files in `data/novels/[slug]`.
   - Format single combined `.txt` document with clear chapter boundaries.
   - Return raw plain text response with attachment headers.

2. **Add Export Button to Novel Detail Page (`pages/novels/[slug]/index.vue`)**:
   - Add **"📥 Unduh Novel (.txt)"** button.
   - Direct download action triggering `window.open('/api/novels/' + slug + '/export', '_blank')`.

3. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` and `pnpm turbo run build`.

4. **Git Commit & Progress Log**:
   - Append log entry in `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(novel): add Novel TXT Exporter/Downloader endpoint and UI button"`.
