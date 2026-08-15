# Technical Execution Plan: Video Subtitle Sync, External Track Loader, & Theater/PiP Suite

Target File:
- `apps/frontend-nuxt/pages/video/[id].vue`

## Step-by-Step Execution Steps

1. **Client-side External Subtitle (.srt / .vtt) Drag & Drop Loader**:
   - Allow loading external `.srt` / `.vtt` subtitle files directly into the video player via file picker or drag-drop.
   - Built-in SRT to WebVTT client converter (`URL.createObjectURL(blob)`).
   - Attach `<track>` element dynamically to the video.

2. **Subtitle Delay Sync Controller**:
   - Provide sub-second offset adjustment (`-500ms`, `-100ms`, `+100ms`, `+500ms`, `Reset 0ms`).
   - Adjusts active WebVTT cue start & end timestamps in real time.

3. **Picture-in-Picture (PiP) & Theater Mode**:
   - Add 1-click Picture-in-Picture button (`video.requestPictureInPicture()`).
   - Add Theater Mode expand button to toggle wide cinema view (`max-w-7xl` or full container).

4. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` across monorepo packages.

5. **Git Commit & Progress Log**:
   - Append completed feature entry to `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(video): add external subtitle loader, delay sync, and theater/PiP controls"`.
