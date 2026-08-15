# Technical Execution Plan: Novel Audiobook TTS Web Speech Engine

Target File: `apps/frontend-nuxt/pages/novels/[slug]/[chapter].vue`

## Step-by-Step Execution Steps

1. **Audiobook Speech State & Voice Enumeration**:
   - Initialize `window.speechSynthesis` API state.
   - Load available system voices (prioritizing `id-ID` Bahasa Indonesia and `en-US`).
   - Track `isSpeaking`, `isPaused`, `currentParagraphIndex`, `speechRate`, and `selectedVoice`.

2. **Audiobook Control Bar UI**:
   - Add a floating / toolbar widget in `[chapter].vue`:
     - 🎧 **Audiobook Button** in reader header.
     - Sticky bottom Audio Player bar when playing:
       - Play / Pause / Stop buttons
       - Voice dropdown selector
       - Playback speed toolbar (`0.75x`, `1.0x`, `1.25x`, `1.5x`, `2.0x`)
       - Progress indicator (`Paragraf X dari Y`)

3. **Speech Synthesis Engine Methods**:
   - `speakCurrentParagraph()`: Reads current paragraph text, highlights paragraph element with active CSS class (`.tts-active-paragraph`), and auto-scrolls paragraph into view.
   - `onend` event handler: Advances `currentParagraphIndex` to next paragraph automatically until end of chapter!
   - `togglePlayPause()` and `stopSpeech()`.

4. **Testing & Typecheck Verification**:
   - Run `pnpm turbo run typecheck` and `pnpm turbo run build`.

5. **Git Commit & Progress Log**:
   - Record changes in `PROGRESS.md`.
   - Commit via `git add . && git commit -m "feat(novel): add Audiobook Web Speech TTS engine to chapter reader"`.
