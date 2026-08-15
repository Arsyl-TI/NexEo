# Technical Execution Plan: Shared Files Global Drag-and-Drop & QR Code LAN Sharing Suite

Target File:
- `apps/frontend-nuxt/pages/share.vue`

## Step-by-Step Execution Steps

1. **Global Full-Screen Window Drag & Drop Overlay**:
   - Attach window-level `dragenter`, `dragover`, and `dragleave` listeners to detect when any file is dragged from Windows Explorer into the browser.
   - Render a high-contrast glassmorphic full-screen dropzone overlay with smooth transitions.
   - Support multiple files dropped simultaneously.

2. **Real-time Live Upload Queue UI**:
   - Provide a dynamic upload queue showing file names, progress percentages, and upload state.
   - Use `XMLHttpRequest` with upload `progress` event listener so actual byte transfer progress is shown accurately on LAN.

3. **QR Code Sharing Modal for Mobile Scanning**:
   - Integrate an SVG/canvas QR Code generator for any shared file link.
   - Allow smartphone users on the same Wi-Fi network to scan the QR code and immediately download the file without manually typing the IP address.

4. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` across all monorepo packages.

5. **Git Commit & Progress Log**:
   - Append completed feature entry to `PROGRESS.md`.
   - Commit changes via `git add . && git commit -m "feat(share): add fullscreen drag-and-drop overlay, real upload progress, and LAN QR Code modal"`.
