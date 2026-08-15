<template>
  <div class="video-player-page min-h-screen bg-background pb-16">
    <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="error" class="container mx-auto p-4 py-10">
      <div class="bg-rose-500/10 border border-rose-500/50 text-rose-300 p-6 rounded-2xl flex flex-col items-center shadow-xl">
        <h2 class="text-xl font-bold mb-2">Error Memuat Video</h2>
        <p class="text-sm text-muted-foreground mb-4">{{ error }}</p>
        <button @click="$router.push('/')" class="btn-primary px-5 py-2 text-sm">
          Kembali ke Beranda
        </button>
      </div>
    </div>
    
    <div v-else-if="video" :class="isTheaterMode ? 'w-full px-2 sm:px-4' : 'max-w-6xl mx-auto p-4 lg:p-6'">
      <!-- Navigation & Mode Controls -->
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button @click="$router.back()" class="px-4 py-2 flex items-center gap-2 text-muted-foreground bg-card/60 hover:bg-border/60 rounded-full text-xs font-medium transition border border-border/50 shadow-sm">
          <span>←</span> Kembali
        </button>

        <div class="flex items-center gap-2">
          <!-- Add Bookmark Button -->
          <button 
            @click="openAddBookmarkModal" 
            class="px-3.5 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            title="Tambah Penanda Waktu (Shortcut: B)"
          >
            <span>🔖</span> Tambah Bookmark <kbd class="text-[9px] bg-amber-950/60 border border-amber-500/40 px-1.5 rounded font-mono">B</kbd>
          </button>

          <!-- Theater Mode Toggle -->
          <button 
            @click="isTheaterMode = !isTheaterMode" 
            :class="['px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-sm', isTheaterMode ? 'bg-primary text-white border-primary shadow-md' : 'bg-card border-border text-foreground hover:bg-border/60']"
            title="Mode Bioskop (Theater Mode - Shortcut: T)"
          >
            <span>🎭</span> {{ isTheaterMode ? 'Mode Normal' : 'Mode Bioskop' }}
          </button>

          <!-- Picture in Picture Button -->
          <button 
            @click="togglePictureInPicture" 
            class="px-3 py-1.5 bg-card hover:bg-border border border-border rounded-full text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shadow-sm"
            title="Picture in Picture (Floating Video - Shortcut: P)"
          >
            <span>📺</span> PiP
          </button>

          <!-- Keyboard Shortcuts Modal Trigger -->
          <button 
            @click="showShortcutsModal = true" 
            class="px-2.5 py-1.5 bg-card hover:bg-border border border-border rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-all shadow-sm"
            title="Pintasan Keyboard"
          >
            ⌨️
          </button>
        </div>
      </div>

      <!-- Resume Watch Banner Prompt -->
      <div v-if="showResumeBanner" class="mb-4 p-4 rounded-2xl bg-purple-900/30 border border-purple-500/40 text-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl backdrop-blur-md animate-fade-in">
        <div class="flex items-center gap-3">
          <span class="text-xl">⏯️</span>
          <span class="text-sm font-medium">Anda sebelumnya menonton sampai <b>{{ formatTime(savedTime) }}</b>. Lanjutkan?</span>
        </div>
        <div class="flex items-center gap-2">
          <button @click="dismissResume" class="px-3.5 py-1.5 rounded-xl border border-purple-500/30 hover:bg-purple-500/20 text-xs font-medium">Mulai Awal</button>
          <button @click="applyResume" class="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium shadow-md">Lanjutkan</button>
        </div>
      </div>

      <!-- Main Video Player Canvas -->
      <div class="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-2 relative border border-border/80">
        <video 
          ref="videoElement" 
          class="w-full h-full object-contain" 
          controls 
          playsinline 
          crossorigin="anonymous"
          @timeupdate="onTimeUpdate"
        >
          <source :src="`/api/video/${encodeURIComponent(video.id)}/stream`" :type="mimeType">
          <track 
            v-if="customSubtitleUrl" 
            :src="customSubtitleUrl" 
            kind="subtitles" 
            srclang="id" 
            :label="customSubtitleLabel || 'External Subtitle'" 
            default
          />
          Browser Anda tidak mendukung video tag.
        </video>
      </div>

      <!-- Visual Bookmark Markers Bar on Timeline -->
      <div v-if="bookmarks.length > 0 && videoDuration > 0" class="mb-4 px-2">
        <div class="relative w-full h-3 bg-card/60 border border-border/60 rounded-full overflow-hidden flex items-center shadow-inner cursor-pointer" @click="handleTimelineClick">
          <!-- Playback progress underlay -->
          <div 
            class="absolute top-0 bottom-0 left-0 bg-primary/20 transition-all pointer-events-none"
            :style="{ width: `${(currentTime / videoDuration) * 100}%` }"
          ></div>

          <!-- Bookmark Pin Markers -->
          <div 
            v-for="bm in bookmarks" 
            :key="bm.id"
            @click.stop="seekToBookmark(bm.time)"
            class="absolute top-0 bottom-0 w-2.5 -ml-1 bg-amber-400 hover:bg-amber-300 hover:scale-125 z-10 transition-all cursor-pointer rounded-full shadow-md"
            :style="{ left: `${Math.min(99, Math.max(1, (bm.time / videoDuration) * 100))}%` }"
            :title="`${bm.timeFormatted} - ${bm.label}`"
          ></div>
        </div>
      </div>

      <!-- Subtitle Sync & Custom Subtitle Loader Toolbar -->
      <div class="bg-card/60 border border-border/60 p-4 rounded-2xl shadow-lg backdrop-blur-xl mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Subtitle Loader -->
        <div class="flex items-center gap-3 flex-wrap">
          <label class="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm">
            <span>💬</span> Muat Subtitle (.srt / .vtt)
            <input type="file" accept=".srt,.vtt" class="hidden" @change="handleSubtitleUpload" />
          </label>

          <span v-if="customSubtitleLabel" class="text-xs font-mono bg-card border border-border text-foreground px-2.5 py-1 rounded-lg truncate max-w-xs">
            ✓ {{ customSubtitleLabel }}
          </span>
        </div>

        <!-- Subtitle Delay Sync Controller -->
        <div v-if="customSubtitleUrl" class="flex items-center gap-2 flex-wrap">
          <span class="text-xs text-muted-foreground font-medium">⏱️ Sinkron Subtitle:</span>
          <button @click="adjustSubtitleDelay(-0.5)" class="px-2 py-1 bg-background border border-border rounded-lg text-xs font-mono hover:bg-card">-0.5s</button>
          <button @click="adjustSubtitleDelay(-0.1)" class="px-2 py-1 bg-background border border-border rounded-lg text-xs font-mono hover:bg-card">-0.1s</button>
          <span class="text-xs font-mono font-bold text-primary px-1">{{ subtitleDelay >= 0 ? `+${subtitleDelay.toFixed(1)}s` : `${subtitleDelay.toFixed(1)}s` }}</span>
          <button @click="adjustSubtitleDelay(0.1)" class="px-2 py-1 bg-background border border-border rounded-lg text-xs font-mono hover:bg-card">+0.1s</button>
          <button @click="adjustSubtitleDelay(0.5)" class="px-2 py-1 bg-background border border-border rounded-lg text-xs font-mono hover:bg-card">+0.5s</button>
          <button @click="resetSubtitleDelay" class="px-2 py-1 bg-card border border-border rounded-lg text-[10px] text-muted-foreground hover:text-foreground">Reset</button>
        </div>
      </div>

      <!-- Bookmarks List & Notes Drawer -->
      <div v-if="bookmarks.length > 0" class="bg-card/70 border border-border/70 p-5 rounded-2xl shadow-xl backdrop-blur-xl mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-bold text-foreground flex items-center gap-2">
            <span>🔖</span> Penanda Waktu / Bookmarks ({{ bookmarks.length }})
          </h3>
          <div class="flex items-center gap-2">
            <button @click="copyBookmarksSummary" class="px-2.5 py-1 rounded-lg bg-background border border-border hover:bg-card text-xs text-muted-foreground hover:text-foreground font-medium transition-all">
              📋 Salin Catatan
            </button>
            <button @click="clearAllBookmarks" class="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-xs text-rose-400 font-medium transition-all">
              🗑️ Bersihkan
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
          <div 
            v-for="bm in bookmarks" 
            :key="bm.id"
            class="flex items-center justify-between p-3 rounded-xl bg-background border border-border/80 hover:border-amber-500/40 transition-all group"
          >
            <div class="min-w-0 pr-2 cursor-pointer flex-1" @click="seekToBookmark(bm.time)">
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold">
                  ⏱️ {{ bm.timeFormatted }}
                </span>
              </div>
              <p class="text-xs font-semibold text-foreground truncate group-hover:text-amber-300 transition-colors">
                {{ bm.label }}
              </p>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <button @click="seekToBookmark(bm.time)" class="p-1.5 rounded-lg bg-card hover:bg-primary hover:text-white border border-border text-xs transition-all" title="Putar dari detik ini">
                ▶
              </button>
              <button @click="deleteBookmark(bm.id)" class="p-1.5 rounded-lg bg-card hover:bg-rose-500/20 hover:text-rose-400 border border-border text-xs text-muted-foreground transition-all" title="Hapus Bookmark">
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Control Speed Toolbar & Download -->
      <div class="bg-card/70 border border-border/60 p-6 rounded-2xl shadow-xl backdrop-blur-xl mb-6">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">{{ video.name }}</h1>
            <div class="flex flex-wrap gap-2 mb-4 text-xs">
              <span v-if="video.author" class="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full font-semibold">
                👤 {{ video.author }}
              </span>
              <span class="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full font-semibold uppercase">
                {{ video.format }}
              </span>
              <span class="bg-gray-800/80 border border-gray-700 text-gray-300 px-3 py-1 rounded-full font-medium">
                💾 {{ video.sizeFormatted }}
              </span>
              <span class="bg-gray-800/80 border border-gray-700 text-gray-300 px-3 py-1 rounded-full font-medium">
                📁 {{ video.folder }}
              </span>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-2 shrink-0">
            <a :href="`/api/video/${encodeURIComponent(video.id)}/stream`" download class="btn-primary px-4 py-2.5 text-xs font-semibold flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.02 19.412 19.412C19.02 19.804 18.55 20 18 20H6Z" fill="currentColor"/></svg>
              Unduh Video
            </a>
          </div>
        </div>

        <!-- Fine-Grained Custom Speed & Pitch Preservation Toolbar -->
        <div class="mt-4 pt-4 border-t border-border/50 space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3 flex-1 max-w-xs">
              <span class="text-xs text-muted-foreground font-medium shrink-0">⚡ Kecepatan:</span>
              <input 
                type="range" 
                min="0.25" 
                max="3.0" 
                step="0.05" 
                v-model.number="currentSpeed" 
                @input="updatePlaybackSpeed"
                class="w-full h-1.5 bg-background rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span class="text-xs font-mono font-bold text-primary w-12 text-right bg-card px-2 py-0.5 rounded border border-border">
                {{ currentSpeed.toFixed(2) }}x
              </span>
            </div>

            <!-- Pitch Preservation Toggle -->
            <button 
              @click="togglePitchPreservation" 
              :class="['px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all shadow-sm', preservesPitch ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10' : 'bg-background border-border text-muted-foreground hover:text-foreground']"
              title="Koreksi nada audio agar tidak melengking saat dipercepat"
            >
              <span>🎵</span> {{ preservesPitch ? 'Koreksi Pitch (Aktif)' : 'Pitch Asli (Non-Aktif)' }}
            </button>
          </div>

          <!-- Quick Preset Pills -->
          <div class="flex flex-wrap items-center gap-1.5">
            <button 
              v-for="s in [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0]" 
              :key="s" 
              @click="setPlaybackSpeed(s)"
              :class="['px-2.5 py-1 rounded-lg text-xs font-mono transition-all', Math.abs(currentSpeed - s) < 0.01 ? 'bg-primary text-white font-bold shadow-md' : 'bg-background border border-border text-muted-foreground hover:text-foreground']"
            >
              {{ s }}x
            </button>
          </div>
        </div>

        <!-- Video Description Section -->
        <div v-if="video.description" class="mt-6 pt-5 border-t border-border/50">
          <h3 class="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
            <span>📄</span> Deskripsi Video
          </h3>
          <div class="text-xs text-muted-foreground leading-relaxed whitespace-pre-line bg-background/50 border border-border/50 p-4 rounded-xl max-h-60 overflow-y-auto font-sans">
            {{ video.description }}
          </div>
        </div>
      </div>
    </div>

    <!-- Add Bookmark Popover / Modal -->
    <div v-if="showAddBookmarkModal" @click.self="showAddBookmarkModal = false" class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="bg-card border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
        <button @click="showAddBookmarkModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>

        <h3 class="text-base font-bold text-foreground mb-1 flex items-center gap-2">
          <span>🔖</span> Tambah Bookmark Video
        </h3>
        <p class="text-xs text-muted-foreground mb-4">
          Waktu: <span class="font-mono font-bold text-amber-300">{{ formatTime(currentTime) }}</span>
        </p>

        <form @submit.prevent="saveNewBookmark" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-muted-foreground mb-1.5">Catatan / Label Bookmark:</label>
            <input 
              v-model="newBookmarkLabel" 
              type="text" 
              placeholder="Contoh: Adegan penting, Penjelasan rumus, Momen lucu..." 
              class="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-400 shadow-inner"
              autofocus
            />
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" @click="showAddBookmarkModal = false" class="px-4 py-2 rounded-xl bg-card border border-border text-xs text-muted-foreground hover:text-foreground font-medium">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs shadow-md transition-all">Simpan Penanda</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Keyboard Shortcuts Modal -->
    <div v-if="showShortcutsModal" @click.self="showShortcutsModal = false" class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div class="bg-card border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
        <button @click="showShortcutsModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>

        <h3 class="text-base font-bold text-foreground mb-1 flex items-center gap-2">
          <span>⌨️</span> Pintasan Keyboard
        </h3>
        <p class="text-xs text-muted-foreground mb-4">Kontrol pemutaran video dengan cepat</p>

        <div class="space-y-2 text-xs">
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Putar / Jeda</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">Space / K</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Tambah Bookmark / Penanda</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">B</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Mundur 10 Detik</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">J / ←</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Maju 10 Detik</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">L / →</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Layar Penuh (Fullscreen)</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">F</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Mode Bioskop</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">T</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Picture in Picture</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">P</kbd>
          </div>
          <div class="flex items-center justify-between p-2 rounded-xl bg-background border border-border/60">
            <span class="text-muted-foreground">Mute Suara</span>
            <kbd class="px-2 py-0.5 bg-card border border-border rounded text-foreground font-mono font-bold">M</kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideoStore } from '~/stores/video'
import { useToast } from '~/composables/useToast'
import type { VideoItem } from '@nexeo/shared/types/video'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export interface VideoBookmark {
  id: string
  time: number
  timeFormatted: string
  label: string
  createdAt: string
}

const route = useRoute()
const router = useRouter()
const videoStore = useVideoStore()
const { success, error: showError } = useToast()

const videoId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const video = ref<VideoItem | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const videoElement = ref<HTMLVideoElement | null>(null)
let player: Plyr | null = null

const savedTime = ref(0)
const currentTime = ref(0)
const videoDuration = ref(0)
const showResumeBanner = ref(false)
const currentSpeed = ref(1)
const isTheaterMode = ref(false)
const showShortcutsModal = ref(false)

// Bookmarks Suite State
const bookmarks = ref<VideoBookmark[]>([])
const showAddBookmarkModal = ref(false)
const newBookmarkLabel = ref('')

// Custom Subtitle State
const customSubtitleUrl = ref<string | null>(null)
const customSubtitleLabel = ref<string | null>(null)
const subtitleDelay = ref(0)
let rawVttContent = ''

const mimeType = computed(() => {
  if (!video.value) return 'video/mp4'
  const format = (video.value.format ?? 'mp4').toLowerCase()
  const mimeMap: Record<string, string> = {
    'mp4': 'video/mp4',
    'mkv': 'video/x-matroska',
    'webm': 'video/webm',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime'
  }
  return mimeMap[format] || 'video/mp4'
})

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

function loadBookmarks() {
  if (typeof window === 'undefined' || !videoId.value) return
  const raw = localStorage.getItem(`video_bookmarks_${videoId.value}`)
  if (raw) {
    try {
      bookmarks.value = JSON.parse(raw)
    } catch {
      bookmarks.value = []
    }
  }
}

function saveBookmarksToStorage() {
  if (typeof window === 'undefined' || !videoId.value) return
  localStorage.setItem(`video_bookmarks_${videoId.value}`, JSON.stringify(bookmarks.value))
}

function openAddBookmarkModal() {
  const cur = videoElement.value?.currentTime || 0
  newBookmarkLabel.value = `Catatan ${formatTime(cur)}`
  showAddBookmarkModal.value = true
}

function saveNewBookmark() {
  const cur = videoElement.value?.currentTime || 0
  const bm: VideoBookmark = {
    id: `bm_${Date.now()}`,
    time: cur,
    timeFormatted: formatTime(cur),
    label: newBookmarkLabel.value.trim() || `Bookmark ${formatTime(cur)}`,
    createdAt: new Date().toISOString()
  }

  bookmarks.value.push(bm)
  // Sort ascending by timestamp
  bookmarks.value.sort((a, b) => a.time - b.time)
  saveBookmarksToStorage()
  showAddBookmarkModal.value = false
  success(`Penanda "${bm.label}" berhasil disimpan!`)
}

function seekToBookmark(sec: number) {
  if (videoElement.value) {
    videoElement.value.currentTime = sec
    videoElement.value.play().catch(() => {})
  }
}

function deleteBookmark(id: string) {
  bookmarks.value = bookmarks.value.filter(b => b.id !== id)
  saveBookmarksToStorage()
}

function clearAllBookmarks() {
  if (confirm('Yakin ingin menghapus seluruh bookmark video ini?')) {
    bookmarks.value = []
    saveBookmarksToStorage()
    success('Seluruh bookmark berhasil dibersihkan.')
  }
}

function copyBookmarksSummary() {
  if (!bookmarks.value.length) return
  const text = bookmarks.value.map(b => `- [${b.timeFormatted}] ${b.label}`).join('\n')
  navigator.clipboard.writeText(text)
  success('Daftar catatan bookmark berhasil disalin ke clipboard!')
}

function handleTimelineClick(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const ratio = Math.max(0, Math.min(1, clickX / rect.width))
  if (videoElement.value && videoDuration.value > 0) {
    videoElement.value.currentTime = ratio * videoDuration.value
  }
}

function checkResumeTimestamp() {
  if (typeof window === 'undefined' || !videoId.value) return
  const key = `video_resume_${videoId.value}`
  const raw = localStorage.getItem(key)
  if (raw) {
    const val = parseFloat(raw)
    if (val > 10) {
      savedTime.value = val
      showResumeBanner.value = true
    }
  }
}

function applyResume() {
  if (videoElement.value && savedTime.value > 0) {
    videoElement.value.currentTime = savedTime.value
  }
  showResumeBanner.value = false
}

function dismissResume() {
  showResumeBanner.value = false
}

function onTimeUpdate() {
  if (!videoElement.value || !videoId.value || !video.value) return
  const cur = videoElement.value.currentTime
  const dur = videoElement.value.duration || 0
  currentTime.value = cur
  videoDuration.value = dur

  if (cur > 5) {
    localStorage.setItem(`video_resume_${videoId.value}`, String(cur))
    try {
      const raw = localStorage.getItem('recent_videos_history')
      let list: any[] = raw ? JSON.parse(raw) : []
      list = list.filter(item => item.id !== videoId.value)
      
      const pct = dur > 0 ? Math.min(100, Math.round((cur / dur) * 100)) : 0
      list.unshift({
        id: videoId.value,
        title: video.value.title || video.value.name,
        name: video.value.name,
        format: video.value.format,
        folder: video.value.folder,
        timestamp: cur,
        duration: dur,
        timestampFormatted: formatTime(cur),
        durationFormatted: formatTime(dur),
        percent: pct,
        updatedAt: new Date().toISOString()
      })

      localStorage.setItem('recent_videos_history', JSON.stringify(list.slice(0, 12)))
    } catch {}
  }
}

const preservesPitch = ref(true)

function applyPitchPreservation() {
  if (videoElement.value) {
    const el = videoElement.value as any
    if ('preservesPitch' in el) el.preservesPitch = preservesPitch.value
    if ('webkitPreservesPitch' in el) el.webkitPreservesPitch = preservesPitch.value
    if ('mozPreservesPitch' in el) el.mozPreservesPitch = preservesPitch.value
  }
}

function updatePlaybackSpeed() {
  if (player) {
    player.speed = currentSpeed.value
  }
  if (videoElement.value) {
    videoElement.value.playbackRate = currentSpeed.value
    applyPitchPreservation()
  }
}

function setPlaybackSpeed(s: number) {
  currentSpeed.value = s
  updatePlaybackSpeed()
}

function togglePitchPreservation() {
  preservesPitch.value = !preservesPitch.value
  applyPitchPreservation()
  if (preservesPitch.value) {
    success('Koreksi Pitch diaktifkan (Nada vokal alami).')
  } else {
    success('Koreksi Pitch dinonaktifkan (Pitch asli).')
  }
}

async function togglePictureInPicture() {
  if (!videoElement.value) return
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture()
    } else {
      await videoElement.value.requestPictureInPicture()
    }
  } catch (err: any) {
    showError('Browser Anda tidak mengizinkan mode Picture-in-Picture.')
  }
}

// Convert .SRT subtitles to WebVTT format
function srtToVtt(srt: string): string {
  let vtt = 'WEBVTT\n\n'
  const normalized = srt.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  const blocks = normalized.split('\n\n')
  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (lines.length >= 2) {
      let timeIndex = 0
      if (!lines[0].includes('-->') && lines[1] && lines[1].includes('-->')) {
        timeIndex = 1
      }
      if (lines[timeIndex] && lines[timeIndex].includes('-->')) {
        const timeLine = lines[timeIndex].replace(/,/g, '.')
        const textLines = lines.slice(timeIndex + 1).join('\n')
        vtt += `${timeLine}\n${textLines}\n\n`
      }
    }
  }
  return vtt
}

function handleSubtitleUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  const file = target.files[0]
  const reader = new FileReader()

  reader.onload = (event) => {
    const content = event.target?.result as string
    if (!content) return

    rawVttContent = file.name.endsWith('.srt') ? srtToVtt(content) : content
    subtitleDelay.value = 0
    createSubtitleBlob(rawVttContent)
    customSubtitleLabel.value = file.name
    success(`Subtitle "${file.name}" berhasil dimuat!`)
  }

  reader.readAsText(file)
}

function parseVttTimestamp(timeStr: string): number {
  const parts = timeStr.trim().split(':')
  if (parts.length === 3) {
    const hours = parseFloat(parts[0])
    const minutes = parseFloat(parts[1])
    const seconds = parseFloat(parts[2])
    return hours * 3600 + minutes * 60 + seconds
  } else if (parts.length === 2) {
    const minutes = parseFloat(parts[0])
    const seconds = parseFloat(parts[1])
    return minutes * 60 + seconds
  }
  return 0
}

function formatVttTimestamp(sec: number): string {
  const s = Math.max(0, sec)
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = (s % 60).toFixed(3)
  const padH = hours.toString().padStart(2, '0')
  const padM = minutes.toString().padStart(2, '0')
  const padS = seconds.padStart(6, '0')
  return `${padH}:${padM}:${padS}`
}

function createSubtitleBlob(vttText: string) {
  if (customSubtitleUrl.value) {
    URL.revokeObjectURL(customSubtitleUrl.value)
  }
  const blob = new Blob([vttText], { type: 'text/vtt' })
  customSubtitleUrl.value = URL.createObjectURL(blob)
}

function adjustSubtitleDelay(offsetSec: number) {
  if (!rawVttContent) return
  subtitleDelay.value += offsetSec

  const lines = rawVttContent.split('\n')
  const adjustedLines = lines.map(line => {
    if (line.includes('-->')) {
      const [startStr, endStr] = line.split('-->')
      if (startStr && endStr) {
        const start = parseVttTimestamp(startStr) + subtitleDelay.value
        const end = parseVttTimestamp(endStr) + subtitleDelay.value
        return `${formatVttTimestamp(start)} --> ${formatVttTimestamp(end)}`
      }
    }
    return line
  })

  createSubtitleBlob(adjustedLines.join('\n'))
}

function resetSubtitleDelay() {
  subtitleDelay.value = 0
  if (rawVttContent) {
    createSubtitleBlob(rawVttContent)
  }
}

function handleGlobalKeydown(e: KeyboardEvent) {
  const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return

  if (e.key === 't' || e.key === 'T') {
    isTheaterMode.value = !isTheaterMode.value
  } else if (e.key === 'p' || e.key === 'P') {
    togglePictureInPicture()
  } else if (e.key === 'b' || e.key === 'B') {
    openAddBookmarkModal()
  }
}

onMounted(async () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleGlobalKeydown)
  }

  if (!videoId.value) {
    error.value = 'ID Video tidak valid'
    loading.value = false
    return
  }

  try {
    const data = await videoStore.fetchVideo(videoId.value)
    if (data) {
      video.value = data
      checkResumeTimestamp()
      loadBookmarks()
      
      setTimeout(() => {
        if (videoElement.value) {
          player = new Plyr(videoElement.value, {
            controls: [
              'play-large', 'play', 'progress', 'current-time', 
              'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
            ],
            settings: ['speed'],
            speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] }
          })
        }
      }, 100)
    } else {
      error.value = videoStore.error || 'Video tidak ditemukan'
    }
  } catch (err: any) {
    error.value = err.message || 'Gagal memuat video'
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleGlobalKeydown)
  }
  if (customSubtitleUrl.value) {
    URL.revokeObjectURL(customSubtitleUrl.value)
  }
  if (player) {
    player.destroy()
  }
})
</script>

<style scoped>
.spinner { width: 2.5rem; height: 2.5rem; border: 3px solid #8b5cf6; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>