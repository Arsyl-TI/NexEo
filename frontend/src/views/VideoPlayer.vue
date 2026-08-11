<template>
  <div class="video-player-view max-w-6xl mx-auto pb-10">
    <button @click="$router.back()" class="mb-6 inline-flex items-center text-muted-foreground hover:text-foreground transition-colors bg-card px-4 py-2 rounded-full text-sm">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Kembali
    </button>
    <div v-if="loading" class="flex justify-center py-20"><div class="spinner"></div></div>
    <div v-else-if="video">
      <div class="flex flex-wrap justify-end gap-3 mb-4">
        <router-link v-if="previousVideo" :to="`/video/${previousVideo.id}`" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-card text-muted-foreground hover:text-foreground hover:bg-border">Sebelumnya</router-link>
        <router-link v-if="nextVideo" :to="`/video/${nextVideo.id}`" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-primary text-foreground hover:bg-primary-dark">Berikutnya</router-link>
        <button @click="isTheaterMode = !isTheaterMode" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-card text-muted-foreground hover:text-foreground hover:bg-border">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
          Mode Teater
        </button>
      </div>
      <div :class="[
        'rounded-2xl overflow-hidden shadow-2xl bg-black border border-border mb-6 transition-all duration-300',
        isTheaterMode ? 'max-w-full' : 'max-w-6xl mx-auto'
      ]">
        <video ref="videoPlayer" class="plyr-vue" controls crossorigin playsinline :poster="video.hasThumbnail ? `/api/thumbnails/${video.id}` : ''">
          <source :src="`/api/videos/${video.id}/stream`" :type="mimeType" />
        </video>
      </div>
      <div class="bg-card/50 border border-gray-800 rounded-2xl p-6 md:p-8">
        <h1 class="text-2xl md:text-3xl font-bold text-foreground mb-2">{{ video.name }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span class="bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">{{ video.format }}</span>
          <span>{{ video.sizeFormatted }}</span>
        </div>
        <div class="bg-background rounded-xl p-4 overflow-x-auto border border-gray-800">
          <p class="text-xs text-muted-foreground font-mono select-all">{{ video.path }}</p>
        </div>
      </div>
      <div v-if="relatedVideos.length > 0" class="mt-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-foreground">Video Lainnya dalam Folder</h2>
          <div v-if="navVideos.length > 1" class="flex gap-2">
            <router-link v-if="previousVideo" :to="`/video/${previousVideo.id}`" class="btn-secondary px-3 py-2 text-sm">Sebelumnya</router-link>
            <router-link v-if="nextVideo" :to="`/video/${nextVideo.id}`" class="btn-primary px-3 py-2 text-sm">Berikutnya</router-link>
          </div>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-2">
          <router-link v-for="related in relatedVideos" :key="related.id" :to="`/video/${related.id}`" class="group min-w-[180px] max-w-[180px] flex-shrink-0">
            <div :class="['aspect-video w-full rounded-xl overflow-hidden bg-card border transition-all mb-2 relative', related.id === video.id ? 'border-primary ring-2 ring-primary/30' : 'border-border group-hover:border-primary']">
              <img v-if="related.hasThumbnail" :src="`/api/thumbnails/${related.id}`" class="object-cover w-full h-full" />
              <div v-else class="flex items-center justify-center w-full h-full text-muted-foreground">No Video</div>
              <div v-if="related.id === video.id" class="absolute top-2 left-2 bg-primary text-foreground text-[10px] font-bold px-2 py-1 rounded-full">SEDANG DIPUTAR</div>
            </div>
            <h3 :class="['font-medium text-sm line-clamp-2', related.id === video.id ? 'text-primary' : 'text-card-foreground group-hover:text-primary']">{{ related.name }}</h3>
            <p class="text-xs text-muted-foreground">{{ related.sizeFormatted }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { useToast } from '../composables/useToast'

const { showToast } = useToast()
const route = useRoute()
const videoId = route.params.id

const videoPlayer = ref(null)
const playerInstance = ref(null)
const video = ref(null)
const relatedVideos = ref([])
const loading = ref(true)
const isTheaterMode = ref(false)

const navVideos = computed(() => relatedVideos.value || [])
const currentVideoIndex = computed(() => navVideos.value.findIndex(item => String(item.id) === String(videoId)))
const previousVideo = computed(() => currentVideoIndex.value > 0 ? navVideos.value[currentVideoIndex.value - 1] : null)
const nextVideo = computed(() => currentVideoIndex.value !== -1 && currentVideoIndex.value < navVideos.value.length - 1 ? navVideos.value[currentVideoIndex.value + 1] : null)

const mimeType = computed(() => {
  if (!video.value) return 'video/mp4'
  const ext = video.value.format?.toLowerCase()
  return { mp4: 'video/mp4', webm: 'video/webm', ogg: 'video/ogg', mkv: 'video/x-matroska' }[ext] || 'video/mp4'
})

const fetchRelatedVideos = async () => {
  if (!video.value) return
  try {
    const pathParts = video.value.path.split('\\')
    const folder = pathParts[pathParts.length - 2] || 'Root'
    const res = await axios.get('/api/videos', {
      params: {
        categoryId: video.value.categoryId,
        folder: folder,
        limit: 1000
      }
    })
    relatedVideos.value = res.data.videos || []
  } catch(e) { console.error('Failed to load related videos', e) }
}

const saveProgress = () => {
  if (!playerInstance.value || !video.value) return
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = { currentTime: playerInstance.value.currentTime, timestamp: Date.now() }
      localStorage.setItem(`video_progress_${videoId}`, JSON.stringify(data))
    }
  } catch(e) { console.warn('Failed to save progress:', e) }
}

const loadProgress = () => {
  if (typeof window === 'undefined' || !window.localStorage) return
  try {
    const saved = localStorage.getItem(`video_progress_${videoId}`)
    if (saved) {
      const p = JSON.parse(saved)
      if (Date.now() - p.timestamp < 86400000 && playerInstance.value) {
        playerInstance.value.currentTime = p.currentTime
      }
    }
  } catch(e) { console.warn('Failed to load progress:', e) }
}

onMounted(async () => {
  try {
    const res = await axios.get(`/api/videos/${videoId}`)
    video.value = res.data
    await fetchRelatedVideos()
    setTimeout(() => {
      if(videoPlayer.value) {
        playerInstance.value = new Plyr(videoPlayer.value, {
          controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
          tooltips: { controls: true, current: true, duration: true }
        })
        playerInstance.value.on('ready', () => {
          loadProgress()
        })
        let lastSec = 0
        playerInstance.value.on('timeupdate', () => {
          const currSec = Math.floor(playerInstance.value.currentTime)
          if (currSec - lastSec >= 10) {
            lastSec = currSec
            saveProgress()
          }
        })
        playerInstance.value.on('ended', saveProgress)
        playerInstance.value.on('fullscreenchange', () => {
          isTheaterMode.value = playerInstance.value.fullscreen.active
        })
      }
    }, 100)
  } catch(e) {
    console.error('Failed to load video', e)
    showToast('Gagal memuat video', 'error')
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  saveProgress()
  if (playerInstance.value) playerInstance.value.destroy()
})
</script>

<style scoped>
/* Player container overrides */
:deep(.plyr) {
  width: 100% !important;
  border-radius: 0;
}

:deep(.plyr__video-wrapper) {
  background-color: #000 !important;
}

:deep(.plyr__video-embed) {
  height: auto !important;
}

:deep(.plyr__control--overlaid) {
  background: rgba(0, 0, 0, 0.7) !important;
  border-radius: 50% !important;
}

:deep(.plyr__control--overlaid:hover) {
  background: rgba(0, 0, 0, 0.9) !important;
}

:deep(.plyr__control svg),
:deep(.plyr__menu__container .plyr__control svg) {
  fill: #e5e7eb !important;
}

:deep(.plyr__control:focus-visible),
:deep(.plyr__button:focus-visible) {
  outline-color: #7c3aed !important;
}

:deep(.plyr__range input),
:deep(.plyr__range input[type="range"]) {
  accent-color: #7c3aed !important;
}

:deep(.plyr__progress__buffer),
:deep(.plyr__tooltip) {
  color: #e5e7eb !important;
}

:deep(.plyr__menu__container) {
  background: #1f2937 !important;
  border: 1px solid #374151 !important;
  border-radius: 8px !important;
  padding: 8px !important;
}

:deep(.plyr__menu__container .plyr__control) {
  color: #e5e7eb !important;
}

:deep(.plyr__menu__container .plyr__control:hover),
:deep(.plyr__menu__container .plyr__control[aria-checked="true"]) {
  color: #7c3aed !important;
}

:deep(.plyr__control--overlaid) {
  box-shadow: none !important;
}
</style>