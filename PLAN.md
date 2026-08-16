# Technical Execution Plan: Module 1 - Novel & Reader Engine Suite

## Goal
Implement Module 1 upgrades for the Novel Reader (`pages/novels/[slug]/[chapter].vue`):
1. **TTS Real-time Sentence/Paragraph Highlighting & Smooth Auto-Scroll**: Highlight active paragraph during TTS reading and auto-scroll into center view.
2. **Typography & Theme Engine Customizer**: Add font switcher (Sans, Serif, OpenDyslexic, Monospace), line-height slider (1.2-2.5), content width adjuster, and 4 color themes (Paper White, Warm Sepia, Solarized, Midnight Dark).
3. **Offline Chapter Caching Suite**: 1-click offline caching of chapter content to browser storage with offline indicator.

## Files to Modify:
- `apps/frontend-nuxt/pages/novels/[slug]/[chapter].vue`

## Verification:
- Monorepo typecheck: `pnpm turbo run typecheck`
- Git commit & push to GitHub repository.
