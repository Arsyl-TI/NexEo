# Technical Execution Plan: Feature 18 - Shared Files Zip Multi-File Batch Downloader

## Overview
Add multi-file checkbox selection and a 1-click batch ZIP downloader (`POST /api/share/download-zip`) to the LAN File Manager (`pages/share.vue`). Users can select multiple shared files and download them as a single ZIP archive on-the-fly.

## Target Files:
- `apps/frontend-nuxt/server/api/share/download-zip.post.ts` (NEW)
- `apps/frontend-nuxt/pages/share.vue`

## Step-by-Step Implementation Steps:
1. **Server Endpoint (`POST /api/share/download-zip`)**:
   - Accept JSON body `{ filenames: string[] }`.
   - Validate file existence in `data/share/` directory.
   - Use `adm-zip` to bundle all requested files into a ZIP buffer.
   - Set HTTP headers (`Content-Type: application/zip`, `Content-Disposition: attachment; filename="nexeo-shared-files.zip"`).
   - Return zip binary payload.
2. **Frontend UI Integration (`pages/share.vue`)**:
   - Add checkbox `☑` to each file card / list item.
   - Add **"Pilih Semua"** / **"Batal Pilih"** master checkbox control.
   - Add floating action bar when 1+ files are selected: 📦 **"Unduh Terpilih (X File) .zip"**.
   - Trigger zip file download using `blob` URL download link.
3. **Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.
4. **Logging & Git Commit**:
   - Record in `PROGRESS.md`.
   - Commit & push to Git repository.
