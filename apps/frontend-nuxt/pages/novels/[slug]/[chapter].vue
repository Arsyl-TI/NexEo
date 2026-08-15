<template>
  <div :class="['min-h-screen transition-all duration-300 relative', themeClasses.wrap]">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-40 pointer-events-none">
      <div class="bg-primary h-1 transition-all duration-150" :style="{ width: `${readPercent}%` }"></div>
    </div>

    <!-- Reader Header Toolbar -->
    <header v-if="!immersive" :class="['sticky top-1 z-20 backdrop-blur-xl py-3 mb-4 border-b flex flex-wrap items-center justify-between px-3 md:px-6 max-w-5xl mx-auto gap-2.5 rounded-2xl shadow-xl', themeClasses.headerBg, themeClasses.border]">
      <NuxtLink :to="`/novels/${slug}`" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5" :class="themeClasses.navBtn">
        ← Kembali
      </NuxtLink>

      <div class="flex items-center gap-2 flex-wrap">
        <!-- Audiobook TTS Button -->
        <button 
          @click="toggleAudiobook" 
          :class="['px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md active:scale-95', isSpeaking ? 'bg-emerald-600 text-white animate-pulse' : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500']"
        >
          <span>🎧</span> {{ isSpeaking ? 'Audiobook Aktif' : 'Audiobook Suara' }}
        </button>

        <!-- Ambient Soundscape Button -->
        <button 
          @click="toggleAmbientDrawer" 
          :class="['px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md active:scale-95', ambientIsPlaying ? 'bg-sky-600 text-white animate-pulse' : 'bg-card border border-border text-foreground hover:bg-border/60']"
        >
          <span>🌧️</span> {{ ambientIsPlaying ? getAmbientLabel(ambientSelected) : 'Suara Relaksasi' }}
        </button>

        <!-- In-Chapter Search Button -->
        <button @click="showTextSearch = !showTextSearch" class="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors bg-card border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5">
          <span>🔍</span> Cari Teks
        </button>

        <!-- Translate Button -->
        <button @click="showTranslateModal = true" class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-md active:scale-95">
          <span>🌐</span> Terjemahkan Bab
        </button>

        <div class="flex items-center gap-1 bg-card border border-border rounded-full px-2.5 py-1">
          <button @click="decreaseFontSize" class="text-xs font-bold px-1 text-muted-foreground hover:text-foreground">A-</button>
          <span class="text-xs px-1 font-mono text-foreground">{{ uiStore.readerFontSize }}px</span>
          <button @click="increaseFontSize" class="text-xs font-bold px-1 text-muted-foreground hover:text-foreground">A+</button>
        </div>

        <button class="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors" :class="themeClasses.textBtn" @click="cycleTheme">
          Tema: {{ uiStore.readerTheme }}
        </button>

        <button class="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors" :class="themeClasses.textBtn" @click="immersive = !immersive">
          {{ immersive ? 'Normal' : 'Immersive' }}
        </button>
      </div>

      <!-- In-Chapter Text Search Bar -->
      <div v-if="showTextSearch" class="w-full pt-2 flex items-center gap-2 border-t border-border/50">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Ketik kata kunci untuk dicari di bab ini..." 
          class="flex-1 bg-background border border-border rounded-xl px-4 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        />
        <span v-if="searchQuery" class="text-xs font-mono text-muted-foreground">{{ matchCount }} hasil</span>
        <button @click="searchQuery = ''; showTextSearch = false" class="text-xs text-muted-foreground hover:text-foreground px-2 py-1">Tutup</button>
      </div>
    </header>

    <!-- Sticky Floating Audiobook Player Widget Bar -->
    <div v-if="showAudiobookBar" class="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-40 bg-card/95 border border-primary/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <div class="w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-xl shrink-0">
          🎧
        </div>
        <div class="min-w-0 flex-1">
          <h4 class="text-xs font-bold text-foreground truncate">Pemutar Audiobook Text-to-Speech</h4>
          <p class="text-[11px] text-muted-foreground font-mono">
            Paragraf {{ currentParagraphIndex + 1 }} dari {{ paragraphTexts.length }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
        <!-- Play / Pause Button -->
        <button @click="togglePlayPauseAudiobook" class="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary/90 flex items-center gap-1">
          <span>{{ isSpeaking && !isPaused ? '⏸ Pause' : '▶ Putar' }}</span>
        </button>

        <!-- Stop Button -->
        <button @click="stopAudiobook" class="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30">
          ⏹ Stop
        </button>

        <!-- Speech Rate Selector -->
        <select v-model="speechRate" @change="changeSpeechRate" class="bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-primary">
          <option :value="0.75">0.75x</option>
          <option :value="1.0">1.0x</option>
          <option :value="1.25">1.25x</option>
          <option :value="1.5">1.5x</option>
          <option :value="2.0">2.0x</option>
        </select>

        <button @click="showAudiobookBar = false" class="text-xs text-muted-foreground hover:text-foreground p-1">✕</button>
      </div>
    </div>

    <!-- Sticky Floating Ambient Soundscape Player Widget Bar -->
    <div v-if="showAmbientBar" class="fixed bottom-20 left-4 right-4 max-w-lg mx-auto z-40 bg-card/95 border border-sky-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3 animate-fade-in">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-base shrink-0">
            🌧️
          </div>
          <div>
            <h4 class="text-xs font-bold text-foreground">Suara Alam & Relaksasi (Web Audio)</h4>
            <p class="text-[10px] text-muted-foreground">Synthesizer instan tanpa kuota data / 100% offline</p>
          </div>
        </div>
        <button @click="showAmbientBar = false" class="text-xs text-muted-foreground hover:text-foreground p-1">✕</button>
      </div>

      <!-- Sound Selector Pills -->
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
        <button 
          v-for="s in ambientOptions" 
          :key="s.id"
          @click="selectAmbientSound(s.id)"
          :class="['px-2 py-1.5 rounded-xl text-[11px] font-semibold transition-all flex flex-col items-center gap-0.5 text-center', ambientSelected === s.id && ambientIsPlaying ? 'bg-sky-600 text-white shadow-md' : 'bg-background border border-border/80 text-muted-foreground hover:text-foreground']"
        >
          <span class="text-sm">{{ s.icon }}</span>
          <span class="truncate w-full">{{ s.name }}</span>
        </button>
      </div>

      <!-- Play / Volume Controls -->
      <div class="flex items-center justify-between gap-3 pt-1 border-t border-border/50">
        <button 
          @click="togglePlayPauseAmbient" 
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          :class="ambientIsPlaying ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-primary hover:bg-primary/90 text-white'"
        >
          <span>{{ ambientIsPlaying ? '⏹ Matikan' : '▶ Putar Suara' }}</span>
        </button>

        <div class="flex items-center gap-2 flex-1 max-w-[180px]">
          <span class="text-xs text-muted-foreground">🔊</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            v-model.number="ambientVolume" 
            @input="updateAmbientVolume"
            class="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <span class="text-[10px] font-mono text-muted-foreground w-8 text-right">{{ Math.round(ambientVolume * 100) }}%</span>
        </div>
      </div>
    </div>

    <!-- Top Chapter Navigation Toolbar (Previous / Next Chapter) -->
    <div v-if="!immersive && !loading" class="max-w-5xl mx-auto px-3 sm:px-4 mb-4">
      <div class="flex items-center justify-between gap-2 p-2.5 rounded-2xl border backdrop-blur-md shadow-sm" :class="[themeClasses.headerBg, themeClasses.border]">
        <button 
          @click="goToPrevChapter" 
          :disabled="!prevChapter" 
          class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
          :class="themeClasses.navBtn"
        >
          <span>⬅️</span> <span class="hidden sm:inline">Bab Sebelumnya</span>
        </button>

        <NuxtLink :to="`/novels/${slug}`" class="px-3 py-2 rounded-xl text-xs font-bold transition-all text-center truncate max-w-[150px] sm:max-w-xs" :class="themeClasses.navBtn">
          📋 <span class="hidden sm:inline">Daftar Bab</span>
        </NuxtLink>

        <button 
          @click="goToNextChapter" 
          :disabled="!nextChapter" 
          class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
          :class="themeClasses.navBtn"
        >
          <span class="hidden sm:inline">Bab Selanjutnya</span> <span>➡️</span>
        </button>
      </div>
    </div>

    <!-- Translation Modal -->
    <div v-if="showTranslateModal" @click.self="showTranslateModal = false" class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button @click="showTranslateModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl">✕</button>

        <h2 class="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <span>🌐</span> Terjemahkan Bab
        </h2>
        <p class="text-xs text-muted-foreground mb-6">Pilih mesin penerjemah otomatis ke Bahasa Indonesia</p>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Bahasa Asal Novel</label>
            <select v-model="transSourceLang" class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary mb-3">
              <option value="auto">🤖 Deteksi Otomatis (Inggris / Korea / Jepang)</option>
              <option value="en">🇬🇧 Bahasa Inggris (English)</option>
              <option value="ko">🇰🇷 Bahasa Korea (Hangul)</option>
              <option value="ja">🇯🇵 Bahasa Jepang (Kanji/Kana)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Mesin Penerjemah</label>
            <select v-model="transEngine" class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
              <option value="google">🌐 Google Translate (Gratis/Bawaan)</option>
              <option value="gemini">⚡ Gemini 1.5 Flash API (AI Disarankan)</option>
              <option value="deepl">🎯 DeepL API (Kualitas Sastra)</option>
              <option value="libre">🐳 LibreTranslate (Self-Hosted Docker)</option>
            </select>
          </div>

          <div v-if="transEngine === 'gemini'">
            <label class="block text-xs font-semibold text-muted-foreground mb-1">Gemini API Key</label>
            <input v-model="transConfig.geminiApiKey" type="password" placeholder="Masukkan Gemini API Key..." class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
          </div>

          <div v-if="transEngine === 'deepl'">
            <label class="block text-xs font-semibold text-muted-foreground mb-1">DeepL API Key</label>
            <input v-model="transConfig.deeplApiKey" type="password" placeholder="Contoh: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
          </div>

          <div v-if="transEngine === 'libre'" class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-muted-foreground mb-1">LibreTranslate Docker URL</label>
              <input v-model="transConfig.libreUrl" type="text" placeholder="http://localhost:5000" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-muted-foreground mb-1">API Key (Opsional)</label>
              <input v-model="transConfig.libreApiKey" type="password" placeholder="Dikosongkan jika tidak memakai key..." class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        <div class="mt-8 flex gap-3">
          <button @click="showTranslateModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card">
            Batal
          </button>
          <button @click="executeTranslation" :disabled="isTranslating" class="flex-1 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg disabled:opacity-50">
            <span v-if="isTranslating" class="spinner border-2 w-4 h-4"></span>
            <span>{{ isTranslating ? 'Menerjemahkan...' : 'Mulai Terjemahkan' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Chapter Content Reader -->
    <main class="max-w-5xl mx-auto px-3 sm:px-4 pb-24">
      <div v-if="loading" class="py-20 flex justify-center"><div class="spinner"></div></div>
      <div v-else-if="!chapterContent" class="py-20 text-center text-muted-foreground">Bab tidak ditemukan.</div>
      <article v-else :class="['prose max-w-none rounded-2xl p-4 sm:p-8 md:p-12 border shadow-lg leading-relaxed', themeClasses.reader]" :style="{ fontSize: `${uiStore.readerFontSize}px` }" v-html="renderedHtml"></article>

      <!-- Bottom Chapter Navigation Toolbar (Previous / Next Chapter) -->
      <div v-if="!loading && chapterContent" class="mt-8 flex items-center justify-between gap-3 p-3 rounded-2xl border backdrop-blur-md shadow-md" :class="[themeClasses.headerBg, themeClasses.border]">
        <button 
          @click="goToPrevChapter" 
          :disabled="!prevChapter" 
          class="px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
          :class="themeClasses.navBtn"
        >
          <span>⬅️</span> <span>Bab Sebelumnya</span>
        </button>

        <NuxtLink :to="`/novels/${slug}`" class="px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center" :class="themeClasses.navBtn">
          📋 <span class="hidden sm:inline">Daftar Bab</span>
        </NuxtLink>

        <button 
          @click="goToNextChapter" 
          :disabled="!nextChapter" 
          class="px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
          :class="themeClasses.navBtn"
        >
          <span>Bab Selanjutnya</span> <span>➡️</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUIStore } from '~/stores/ui'
import { useNovelStore } from '~/stores/novel'
import { useToast } from '~/composables/useToast'

const route = useRoute()
const router = useRouter()
const uiStore = useUIStore()
const novelStore = useNovelStore()
const { success, error: showError } = useToast()

const slug = route.params.slug as string
const chapter = route.params.chapter as string
const loading = ref(true)
const immersive = ref(false)
const chapterContent = ref<any>(null)
const translatedContent = ref<any>(null)
const chaptersList = ref<any[]>([])

// In-Chapter Text Search
const showTextSearch = ref(false)
const searchQuery = ref('')
const readPercent = ref(0)

// Audiobook TTS Web Speech State
const showAudiobookBar = ref(false)
const isSpeaking = ref(false)
const isPaused = ref(false)
const currentParagraphIndex = ref(0)
const speechRate = ref(1.0)
let synth: SpeechSynthesis | null = null

// Translation Modal State
const showTranslateModal = ref(false)
const isTranslating = ref(false)
const transEngine = ref<'google' | 'gemini' | 'deepl' | 'libre'>('google')
const transSourceLang = ref<'auto' | 'en' | 'ko' | 'ja'>('auto')
const transConfig = ref({
  geminiApiKey: '',
  deeplApiKey: '',
  libreUrl: 'http://localhost:5000',
  libreApiKey: ''
})

// Web Audio API Relaxing Ambient Soundscape Engine
type AmbientType = 'rain' | 'campfire' | 'waves' | 'wind' | 'cafe'

class AmbientSoundEngine {
  ctx: AudioContext | null = null
  gainNode: GainNode | null = null
  currentType: AmbientType | null = null
  isPlaying = false
  volume = 0.5

  noiseSource: AudioBufferSourceNode | null = null
  filter: BiquadFilterNode | null = null
  modulator: OscillatorNode | null = null
  modGain: GainNode | null = null
  timerInterval: any = null

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      this.ctx = new AudioCtx()
      this.gainNode = this.ctx.createGain()
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime)
      this.gainNode.connect(this.ctx.destination)
    }
  }

  setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val))
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime)
    }
  }

  createPinkNoiseBuffer(): AudioBuffer {
    const bufferSize = this.ctx!.sampleRate * 4
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate)
    const output = buffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
      b6 = white * 0.115926
    }
    return buffer
  }

  createBrownNoiseBuffer(): AudioBuffer {
    const bufferSize = this.ctx!.sampleRate * 4
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate)
    const output = buffer.getChannelData(0)
    let lastOut = 0.0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      output[i] = (lastOut + (0.02 * white)) / 1.02
      lastOut = output[i]
      output[i] *= 3.5
    }
    return buffer
  }

  createWhiteNoiseBuffer(): AudioBuffer {
    const bufferSize = this.ctx!.sampleRate * 4
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate)
    const output = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.2
    }
    return buffer
  }

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    }
    try {
      this.noiseSource?.stop()
      this.noiseSource?.disconnect()
      this.filter?.disconnect()
      this.modulator?.stop()
      this.modulator?.disconnect()
      this.modGain?.disconnect()
    } catch {}
    this.noiseSource = null
    this.filter = null
    this.modulator = null
    this.modGain = null
    this.isPlaying = false
  }

  play(type: AmbientType) {
    this.init()
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume()
    }
    this.stop()
    this.currentType = type

    if (type === 'rain') {
      const buffer = this.createPinkNoiseBuffer()
      this.noiseSource = this.ctx!.createBufferSource()
      this.noiseSource.buffer = buffer
      this.noiseSource.loop = true

      this.filter = this.ctx!.createBiquadFilter()
      this.filter.type = 'lowpass'
      this.filter.frequency.setValueAtTime(1400, this.ctx!.currentTime)

      this.noiseSource.connect(this.filter)
      this.filter.connect(this.gainNode!)
      this.noiseSource.start()
    } else if (type === 'campfire') {
      const buffer = this.createBrownNoiseBuffer()
      this.noiseSource = this.ctx!.createBufferSource()
      this.noiseSource.buffer = buffer
      this.noiseSource.loop = true

      this.filter = this.ctx!.createBiquadFilter()
      this.filter.type = 'lowpass'
      this.filter.frequency.setValueAtTime(800, this.ctx!.currentTime)

      this.noiseSource.connect(this.filter)
      this.filter.connect(this.gainNode!)
      this.noiseSource.start()

      this.timerInterval = setInterval(() => {
        if (!this.isPlaying || !this.ctx) return
        if (Math.random() > 0.4) {
          const osc = this.ctx.createOscillator()
          const crackleGain = this.ctx.createGain()
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(200 + Math.random() * 800, this.ctx.currentTime)
          crackleGain.gain.setValueAtTime(0.08, this.ctx.currentTime)
          crackleGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)
          osc.connect(crackleGain)
          crackleGain.connect(this.gainNode!)
          osc.start()
          osc.stop(this.ctx.currentTime + 0.04)
        }
      }, 120)
    } else if (type === 'waves') {
      const buffer = this.createBrownNoiseBuffer()
      this.noiseSource = this.ctx!.createBufferSource()
      this.noiseSource.buffer = buffer
      this.noiseSource.loop = true

      this.filter = this.ctx!.createBiquadFilter()
      this.filter.type = 'lowpass'
      this.filter.frequency.setValueAtTime(600, this.ctx!.currentTime)

      this.modGain = this.ctx!.createGain()
      this.modGain.gain.setValueAtTime(0.5, this.ctx!.currentTime)

      this.modulator = this.ctx!.createOscillator()
      this.modulator.type = 'sine'
      this.modulator.frequency.setValueAtTime(0.12, this.ctx!.currentTime)

      const modScale = this.ctx!.createGain()
      modScale.gain.setValueAtTime(0.35, this.ctx!.currentTime)

      this.modulator.connect(modScale)
      modScale.connect(this.modGain.gain)

      this.noiseSource.connect(this.filter)
      this.filter.connect(this.modGain)
      this.modGain.connect(this.gainNode!)

      this.noiseSource.start()
      this.modulator.start()
    } else if (type === 'wind') {
      const buffer = this.createWhiteNoiseBuffer()
      this.noiseSource = this.ctx!.createBufferSource()
      this.noiseSource.buffer = buffer
      this.noiseSource.loop = true

      this.filter = this.ctx!.createBiquadFilter()
      this.filter.type = 'bandpass'
      this.filter.frequency.setValueAtTime(500, this.ctx!.currentTime)
      this.filter.Q.setValueAtTime(3.0, this.ctx!.currentTime)

      this.modulator = this.ctx!.createOscillator()
      this.modulator.type = 'sine'
      this.modulator.frequency.setValueAtTime(0.18, this.ctx!.currentTime)

      const modScale = this.ctx!.createGain()
      modScale.gain.setValueAtTime(300, this.ctx!.currentTime)

      this.modulator.connect(modScale)
      modScale.connect(this.filter.frequency)

      this.noiseSource.connect(this.filter)
      this.filter.connect(this.gainNode!)

      this.noiseSource.start()
      this.modulator.start()
    } else if (type === 'cafe') {
      const buffer = this.createPinkNoiseBuffer()
      this.noiseSource = this.ctx!.createBufferSource()
      this.noiseSource.buffer = buffer
      this.noiseSource.loop = true

      this.filter = this.ctx!.createBiquadFilter()
      this.filter.type = 'lowpass'
      this.filter.frequency.setValueAtTime(700, this.ctx!.currentTime)

      this.noiseSource.connect(this.filter)
      this.filter.connect(this.gainNode!)
      this.noiseSource.start()
    }

    this.isPlaying = true
  }
}

const showAmbientBar = ref(false)
const ambientIsPlaying = ref(false)
const ambientSelected = ref<AmbientType>('rain')
const ambientVolume = ref(0.5)

const ambientOptions: { id: AmbientType; name: string; icon: string }[] = [
  { id: 'rain', name: 'Hujan Rintik', icon: '🌧️' },
  { id: 'campfire', name: 'Api Unggun', icon: '🪵' },
  { id: 'waves', name: 'Ombak Laut', icon: '🌊' },
  { id: 'wind', name: 'Angin Sejuk', icon: '🍃' },
  { id: 'cafe', name: 'Kafe Santai', icon: '☕' }
]

const getAmbientLabel = (id: AmbientType) => {
  const found = ambientOptions.find(o => o.id === id)
  return found ? `${found.icon} ${found.name}` : 'Suara Relaksasi'
}

let ambientEngine: AmbientSoundEngine | null = null

function toggleAmbientDrawer() {
  showAmbientBar.value = !showAmbientBar.value
}

function selectAmbientSound(type: AmbientType) {
  ambientSelected.value = type
  if (ambientIsPlaying.value) {
    if (!ambientEngine) ambientEngine = new AmbientSoundEngine()
    ambientEngine.play(type)
  }
}

function togglePlayPauseAmbient() {
  if (!ambientEngine) ambientEngine = new AmbientSoundEngine()
  if (ambientIsPlaying.value) {
    ambientEngine.stop()
    ambientIsPlaying.value = false
  } else {
    ambientEngine.setVolume(ambientVolume.value)
    ambientEngine.play(ambientSelected.value)
    ambientIsPlaying.value = true
    showAmbientBar.value = true
  }
}

function updateAmbientVolume() {
  if (ambientEngine) {
    ambientEngine.setVolume(ambientVolume.value)
  }
}

function stopAmbient() {
  if (ambientEngine) {
    ambientEngine.stop()
    ambientIsPlaying.value = false
  }
}

const paragraphTexts = computed(() => {
  const contentToRender = translatedContent.value || chapterContent.value
  if (!contentToRender) return []

  if (typeof contentToRender === 'string') {
    return contentToRender.split(/<\/p>|<br\s*\/?>/gi).map(s => s.replace(/<[^>]*>?/gm, '').trim()).filter(Boolean)
  }

  if (Array.isArray(contentToRender)) {
    return contentToRender.filter(i => i.type === 'text' && i.value?.trim()).map(i => i.value.trim())
  }

  if (contentToRender.content && Array.isArray(contentToRender.content)) {
    return contentToRender.content.filter((i: any) => i.type === 'text' && i.value?.trim()).map((i: any) => i.value.trim())
  }

  return []
})

function toggleAudiobook() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    showError('Browser Anda tidak mendukung fitur Web Speech Synthesis Audiobook.')
    return
  }

  showAudiobookBar.value = true
  if (isSpeaking.value) {
    stopAudiobook()
  } else {
    currentParagraphIndex.value = 0
    startSpeakingParagraph(0)
  }
}

function startSpeakingParagraph(index: number) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  synth = window.speechSynthesis
  synth.cancel()

  const texts = paragraphTexts.value
  if (index < 0 || index >= texts.length) {
    stopAudiobook()
    return
  }

  const textToSpeak = texts[index]
  if (!textToSpeak) return

  currentParagraphIndex.value = index
  const utterance = new SpeechSynthesisUtterance(textToSpeak)
  utterance.rate = speechRate.value

  // Try to find Indonesian voice first, or default system voice
  const voices = synth.getVoices()
  const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'))
  if (idVoice) utterance.voice = idVoice

  utterance.onstart = () => {
    isSpeaking.value = true
    isPaused.value = false
  }

  utterance.onend = () => {
    if (currentParagraphIndex.value < texts.length - 1 && isSpeaking.value) {
      startSpeakingParagraph(currentParagraphIndex.value + 1)
    } else {
      stopAudiobook()
      success('Selesai membaca audiobook bab ini!')
    }
  }

  utterance.onerror = () => {
    stopAudiobook()
  }

  synth.speak(utterance)
}

function togglePlayPauseAudiobook() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  synth = window.speechSynthesis

  if (synth.speaking && !synth.paused) {
    synth.pause()
    isPaused.value = true
  } else if (synth.paused) {
    synth.resume()
    isPaused.value = false
  } else {
    startSpeakingParagraph(currentParagraphIndex.value)
  }
}

function changeSpeechRate() {
  if (isSpeaking.value) {
    startSpeakingParagraph(currentParagraphIndex.value)
  }
}

function stopAudiobook() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  isSpeaking.value = false
  isPaused.value = false
}

const currentIndex = computed(() => {
  if (!chaptersList.value.length) return -1
  const currentFileName = chapter.replace(/\\/g, '/').split('/').pop() || chapter
  return chaptersList.value.findIndex(c => {
    const fn = (c.file || c.filename || c.id || '').replace(/\\/g, '/').split('/').pop()
    return fn === currentFileName || c.file === chapter || c.title === chapter
  })
})

const prevChapter = computed(() => {
  if (currentIndex.value > 0) {
    return chaptersList.value[currentIndex.value - 1]
  }
  return null
})

const nextChapter = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < chaptersList.value.length - 1) {
    return chaptersList.value[currentIndex.value + 1]
  }
  return null
})

function goToPrevChapter() {
  if (prevChapter.value) {
    const targetFile = prevChapter.value.file || prevChapter.value.filename || prevChapter.value.id
    router.push(`/novels/${slug}/${encodeURIComponent(targetFile)}`)
  }
}

function goToNextChapter() {
  if (nextChapter.value) {
    const targetFile = nextChapter.value.file || nextChapter.value.filename || nextChapter.value.id
    router.push(`/novels/${slug}/${encodeURIComponent(targetFile)}`)
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.key === 'ArrowLeft') {
    goToPrevChapter()
  } else if (e.key === 'ArrowRight') {
    goToNextChapter()
  }
}

const themeClasses = computed(() => ({
  wrap: uiStore.readerTheme === 'sepia' ? 'bg-[#f4ecd8] text-[#2f2416]' : uiStore.readerTheme === 'light' ? 'bg-white text-slate-900' : 'bg-[#0b0f19] text-gray-200',
  headerBg: uiStore.readerTheme === 'sepia' ? 'bg-[#f4ecd8]/90' : uiStore.readerTheme === 'light' ? 'bg-white/90' : 'bg-[#131b2e]/90',
  border: uiStore.readerTheme === 'sepia' ? 'border-[#d8c59a]' : uiStore.readerTheme === 'light' ? 'border-slate-200' : 'border-slate-800',
  navBtn: uiStore.readerTheme === 'sepia' ? 'bg-[#efe1bf] text-[#2f2416] hover:bg-[#e4d3a9]' : uiStore.readerTheme === 'light' ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' : 'bg-slate-800 text-gray-200 hover:bg-slate-700',
  textBtn: uiStore.readerTheme === 'sepia' ? 'bg-[#efe1bf] text-[#2f2416]' : uiStore.readerTheme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-800 text-gray-200',
  reader: uiStore.readerTheme === 'sepia' ? 'bg-[#f9f1df] border-[#d8c59a] text-[#2f2416]' : uiStore.readerTheme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#131b2e] border-slate-800 text-gray-200'
}))

const matchCount = computed(() => {
  if (!searchQuery.value.trim()) return 0
  const baseHtml = rawRenderedHtml.value
  const regex = new RegExp(escapeRegExp(searchQuery.value.trim()), 'gi')
  const matches = baseHtml.match(regex)
  return matches ? matches.length : 0
})

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const rawRenderedHtml = computed(() => {
  const contentToRender = translatedContent.value || chapterContent.value
  if (!contentToRender) return '<p>Konten bab ini belum tersedia.</p>'

  if (typeof contentToRender === 'string') return contentToRender

  if (Array.isArray(contentToRender)) {
    return contentToRender.map(item => {
      if (item.type === 'image') {
        return `<div class="my-6 text-center"><img src="/_novels/${slug}/${item.value}" class="rounded-xl max-h-[600px] mx-auto shadow-md" loading="lazy" /></div>`
      }
      return `<p class="mb-4 leading-relaxed">${item.value}</p>`
    }).join('')
  }

  if (contentToRender.content && Array.isArray(contentToRender.content)) {
    return contentToRender.content.map((item: any) => {
      if (item.type === 'image') {
        return `<div class="my-6 text-center"><img src="/_novels/${slug}/${item.value}" class="rounded-xl max-h-[600px] mx-auto shadow-md" loading="lazy" /></div>`
      }
      return `<p class="mb-4 leading-relaxed">${item.value}</p>`
    }).join('')
  }

  return '<p>Format konten bab tidak didukung.</p>'
})

const renderedHtml = computed(() => {
  const html = rawRenderedHtml.value
  const q = searchQuery.value.trim()
  if (!q) return html

  // Highlight matches in text nodes safely
  const regex = new RegExp(`(${escapeRegExp(q)})`, 'gi')
  return html.replace(/(<[^>]+>)|([^<]+)/g, (match: string, tag?: string, text?: string) => {
    if (tag) return tag
    if (text) {
      return text.replace(regex, '<mark class="search-highlight">$1</mark>')
    }
    return match
  })
})

function handleScroll() {
  if (typeof window === 'undefined') return
  const total = document.documentElement.scrollHeight - window.innerHeight
  if (total > 0) {
    readPercent.value = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)))
  }
}

function cycleTheme() {
  const next = uiStore.readerTheme === 'dark' ? 'sepia' : uiStore.readerTheme === 'sepia' ? 'light' : 'dark'
  uiStore.setReaderTheme(next)
}

function increaseFontSize() {
  uiStore.setReaderFontSize(Math.min(32, uiStore.readerFontSize + 2))
}

function decreaseFontSize() {
  uiStore.setReaderFontSize(Math.max(12, uiStore.readerFontSize - 2))
}

async function executeTranslation() {
  const rawData = chapterContent.value
  let paragraphs: string[] = []

  if (Array.isArray(rawData)) {
    paragraphs = rawData.filter(i => i.type === 'text').map(i => i.value)
  } else if (rawData?.content && Array.isArray(rawData.content)) {
    paragraphs = rawData.content.filter((i: any) => i.type === 'text').map((i: any) => i.value)
  } else if (typeof rawData === 'string') {
    paragraphs = rawData.split(/<\/p>|<br\s*\/?>/gi).map(s => s.replace(/<[^>]*>?/gm, '').trim()).filter(Boolean)
  }

  if (paragraphs.length === 0) {
    showError('Tidak ada teks paragraf yang dapat diterjemahkan.')
    return
  }

  isTranslating.value = true
  try {
    const res = await novelStore.translateChapter(paragraphs, {
      engine: transEngine.value,
      sourceLang: transSourceLang.value,
      geminiApiKey: transConfig.value.geminiApiKey,
      deeplApiKey: transConfig.value.deeplApiKey,
      libreUrl: transConfig.value.libreUrl,
      libreApiKey: transConfig.value.libreApiKey
    })

    if (res.success && res.data && res.data.length > 0) {
      const translatedMap = res.data
      let idx = 0

      if (Array.isArray(rawData)) {
        translatedContent.value = rawData.map(i => i.type === 'text' ? { ...i, value: translatedMap[idx++] || i.value } : i)
      } else if (rawData?.content && Array.isArray(rawData.content)) {
        translatedContent.value = {
          ...rawData,
          content: rawData.content.map((i: any) => i.type === 'text' ? { ...i, value: translatedMap[idx++] || i.value } : i)
        }
      } else {
        translatedContent.value = translatedMap.map(t => `<p class="mb-4 leading-relaxed">${t}</p>`).join('')
      }

      success('Bab berhasil diterjemahkan ke Bahasa Indonesia!')
      showTranslateModal.value = false
    } else {
      showError(res.error || 'Penerjemahan gagal. Menampilkan teks asli.')
    }
  } catch (e: any) {
    showError('Terjadi error saat menghubungkan ke mesin penerjemah.')
  } finally {
    isTranslating.value = false
  }
}

async function loadChapter() {
  loading.value = true
  translatedContent.value = null
  stopAudiobook()
  try {
    const api = useApi()
    
    // Load chapters list for Next/Prev navigation
    if (!chaptersList.value.length) {
      const listRes = await api.get<{ success?: boolean; data?: any[] }>(`/novel/${slug}/chapters`)
      if (listRes?.data) {
        chaptersList.value = listRes.data
      }
    }

    const res = await api.get<{ success?: boolean; data?: any }>(`/novel/${slug}/chapter/${chapter}`)
    chapterContent.value = res?.data || '<p>Konten bab ini belum tersedia.</p>'
    if (typeof window !== 'undefined') localStorage.setItem(`resume_novel_${slug}`, chapter)
  } catch (e) {
    console.error('Failed to load chapter content', e)
    chapterContent.value = '<p class="text-red-500">Gagal memuat isi bab novel.</p>'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  uiStore.initPreferences()
  void loadChapter()
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeyDown)
  }
})

onBeforeUnmount(() => {
  stopAudiobook()
  stopAmbient()
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeyDown)
  }
})

watch(() => route.params.chapter, (next) => { if (typeof next === 'string') void loadChapter() })
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
.prose :deep(p) { margin-bottom: 1.25rem; line-height: 1.8; }
.prose :deep(p:last-child) { margin-bottom: 0; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>