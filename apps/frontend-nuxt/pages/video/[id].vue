<template>
  <div class="video-player-page min-h-screen bg-background">
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
    
    <div v-else-if="video" class="max-w-6xl mx-auto p-4 lg:p-6">
      <button @click="$router.back()" class="mb-4 px-4 py-2 flex items-center gap-2 text-muted-foreground bg-card/60 hover:bg-border/60 rounded-full text-xs font-medium w-max transition border border-border/50">
        <span>←</span> Kembali
      </button>

      <!-- Resume Watch Banner Prompt -->
      <div v-if="showResumeBanner" class="mb-4 p-4 rounded-2xl bg-purple-900/30 border border-purple-500/40 text-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl backdrop-blur-md">
        <div class="flex items-center gap-3">
          <span class="text-xl">⏯️</span>
          <span class="text-sm font-medium">Anda sebelumnya menonton sampai <b>{{ formatTime(savedTime) }}</b>. Lanjutkan?</span>
        </div>
        <div class="flex items-center gap-2">
          <button @click="dismissResume" class="px-3.5 py-1.5 rounded-xl border border-purple-500/30 hover:bg-purple-500/20 text-xs font-medium">Mulai Awal</button>
          <button @click="applyResume" class="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium shadow-md">Lanjutkan</button>
        </div>
      </div>

      <div class="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-4 relative border border-border/80">
        <video 
          ref="videoElement" 
          class="w-full h-full object-contain" 
          controls 
          playsinline 
          crossorigin="anonymous"
          @timeupdate="onTimeUpdate"
        >
          <source :src="`/api/video/${encodeURIComponent(video.id)}/stream`" :type="mimeType">
          Browser Anda tidak mendukung video tag.
        </video>
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

        <!-- Quick Speed Toolbar -->
        <div class="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="text-xs text-muted-foreground font-medium">⚡ Kecepatan:</span>
            <button 
              v-for="s in [0.5, 0.75, 1, 1.25, 1.5, 2]" 
              :key="s" 
              @click="setPlaybackSpeed(s)"
              :class="['px-2.5 py-1 rounded-lg text-xs font-mono transition-all', currentSpeed === s ? 'bg-primary text-white font-bold shadow-md' : 'bg-background border border-border text-muted-foreground hover:text-foreground']"
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideoStore } from '~/stores/video'
import type { VideoItem } from '@nexeo/shared/types/video'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const route = useRoute()
const router = useRouter()
const videoStore = useVideoStore()

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
const showResumeBanner = ref(false)
const currentSpeed = ref(1)

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
  if (!videoElement.value || !videoId.value) return
  const cur = videoElement.value.currentTime
  if (cur > 5) {
    localStorage.setItem(`video_resume_${videoId.value}`, String(cur))
  }
}

function setPlaybackSpeed(s: number) {
  currentSpeed.value = s
  if (player) {
    player.speed = s
  } else if (videoElement.value) {
    videoElement.value.playbackRate = s
  }
}

onMounted(async () => {
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
  if (player) {
    player.destroy()
  }
})
</script>

<style scoped>
.spinner { width: 2.5rem; height: 2.5rem; border: 3px solid #8b5cf6; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>