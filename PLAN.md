# Technical Execution Plan: Novel Relaxing Ambient Soundscape Engine (Web Audio API)

Target File:
- `apps/frontend-nuxt/pages/novels/[slug]/[chapter].vue`

## Step-by-Step Execution Steps

1. **Native Web Audio API Ambient Synthesizer**:
   - Create zero-dependency sound generators using `AudioContext`, `BiquadFilterNode`, `GainNode`, and procedural noise buffers:
     - 🌧️ **Hujan Rintik (Soft Rain)**: Pink noise passed through a low-pass filter with gentle frequency modulation.
     - 🪵 **Api Unggun (Cozy Campfire)**: Brown noise with randomized crackle impulses.
     - 🌊 **Ombak Laut (Ocean Waves)**: Low-frequency modulated brownian noise with slow periodic volume swell.
     - 🍃 **Angin Sejuk (Breeze)**: Band-pass filtered white noise with smooth oscillating resonance.
     - ☕ **Kafe Santai (Coffee Shop)**: Multi-layer warm room noise tone.

2. **Ambient Soundscape Control Drawer / Modal**:
   - Add a 🌧️ **Suara Relaksasi** button to the Novel Reader top toolbar.
   - Build a sleek floating ambient player with:
     - Preset sound selectors (Rain, Campfire, Waves, Wind, Cafe).
     - Master volume slider (`0%` - `100%`).
     - Play / Pause toggle with pulse animation.

3. **Lifecycle & Clean Up**:
   - Automatically pause/close `AudioContext` when navigating away or unmounting page.

4. **Testing & Build Verification**:
   - Run `pnpm turbo run typecheck` across monorepo packages.

5. **Git Commit & Progress Log**:
   - Append log entry in `PROGRESS.md`.
   - Execute `git add . && git commit -m "feat(novel): add Web Audio API relaxing ambient soundscape engine"`.
