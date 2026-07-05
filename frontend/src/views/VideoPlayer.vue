<template>
  <div class="video-player-view max-w-6xl mx-auto pb-10">
    <button @click="$router.back()" class="mb-6 inline-flex items-center text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-full text-sm">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Kembali
    </button>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner"></div>
    </div>

    <div v-else-if="video">
      <div class="rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-800 mb-6">
        <video 
          ref="videoPlayer" 
          class="plyr-vue" 
          controls 
          crossorigin 
          playsinline 
          :poster="video.hasThumbnail ? `/api/thumbnails/${video.id}` : ''"
        >
          <source :src="`/api/videos/${video.id}/stream`" :type="mimeType" />
        </video>
      </div>

      <div class="bg-gray-800/50 border border-gray-800 rounded-2xl p-6 md:p-8">
        <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">{{ video.name }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
          <span class="bg-brand/20 text-brand px-3 py-1 rounded-full font-medium">{{ video.format }}</span>
          <span>{{ video.sizeFormatted }}</span>
          <span>{{ new Date(video.modified).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
        </div>
        
        <div class="bg-gray-900 rounded-xl p-4 overflow-x-auto border border-gray-800">
          <p class="text-xs text-gray-500 font-mono select-all">{{ video.path }}</p>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-20 text-gray-500">
      Video tidak ditemukan.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const route = useRoute()
const videoId = route.params.id
const videoPlayer = ref(null)
const playerInstance = ref(null)

const video = ref(null)
const loading = ref(true)

const mimeType = computed(() => {
  if(!video.value) return 'video/mp4'
  const ext = video.value.format.toLowerCase()
  if(ext === 'mkv') return 'video/webm' // HTML5 often plays mkv if tagged as webm or mp4
  return `video/${ext}`
})

onMounted(async () => {
  try {
    const res = await fetch(`/api/videos/${videoId}`)
    if (res.ok) {
      video.value = await res.json()
      
      // Init plyr next tick
      setTimeout(() => {
        if(videoPlayer.value) {
          playerInstance.value = new Plyr(videoPlayer.value, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            keyboard: { focused: true, global: true }
          })
        }
      }, 100)
    }
  } catch(e) {
    console.error("Failed to load video", e)
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (playerInstance.value) {
    playerInstance.value.destroy()
  }
})
</script>

<style>
/* Custom Plyr theme colors to match brand */
:root {
  --plyr-color-main: #7c3aed;
  --plyr-video-background: #000;
}
</style>
