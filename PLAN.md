# Technical Execution Plan: Novel Multi-Chapter EPUB Exporter

Target Files:
- `apps/frontend-nuxt/server/api/novels/[slug]/export-epub.get.ts`
- `apps/frontend-nuxt/pages/novels/[slug]/index.vue`

## Step-by-Step Execution Steps

1. **Build Valid EPUB 3 Exporter API Endpoint (`server/api/novels/[slug]/export-epub.get.ts`)**:
   - Read novel metadata (`title`, `author`, `description`, `cover`, `tags`) and all chapter files (`.txt` and `.json`) in `data/novels/[slug]`.
   - Build standard EPUB package structure using `adm-zip`:
     - `mimetype`: `application/epub+zip` (stored uncompressed).
     - `META-INF/container.xml`: Points to `OEBPS/content.opf`.
     - `OEBPS/content.opf`: Manifest listing all chapter XHTML documents, cover image, and spine reading order.
     - `OEBPS/toc.ncx` & `OEBPS/nav.xhtml`: Standard navigation / Table of Contents.
     - `OEBPS/chapter_*.xhtml`: Formatted HTML chapters with clean typography styles (`OEBPS/style.css`).
     - `OEBPS/cover.jpg`: Cover image if available.
   - Stream resulting `.epub` buffer with `Content-Type: application/epub+zip` and `Content-Disposition: attachment; filename="${slug}.epub"`.

2. **Add EPUB Download Action to Novel Detail Page (`pages/novels/[slug]/index.vue`)**:
   - Add **"📚 Unduh EPUB (.epub)"** button in the header action area next to the `.txt` export button.

3. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.

4. **Git Commit & Progress Log**:
   - Append log entry in `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(novel): add EPUB 3 e-book packaging exporter endpoint and UI download button"`.
