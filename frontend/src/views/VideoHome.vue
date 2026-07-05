<template>
  <div class="video-home">
    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner"></div>
    </div>
    
    <div v-else>
      <div v-if="categoryId && !selectedFolder">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-white tracking-tight">{{ categoryName }}</h1>
          <span class="text-gray-400 bg-gray-800 px-3 py-1 rounded-full text-sm">{{ folders.length }} folder</span>
        </div>
        
        <div v-if="folders.length === 0" class="text-center py-20 text-gray-500 text-lg">
          Kategori ini kosong.
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="folder in folders" :key="folder.name" 
               @click="selectFolder(folder)"
               class="cursor-pointer group relative">
            <div class="aspect-video w-full rounded-xl overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-brand transition-all shadow-lg">
               <img v-if="folder.hasCoverThumbnail" :src="`/api/thumbnails/${folder.coverId}`" class="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
               <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
               <div class="absolute bottom-0 left-0 p-4 w-full">
                 <h3 class="font-bold text-lg text-white mb-1 truncate drop-shadow-md">{{ folder.name === 'Root' ? 'General' : folder.name }}</h3>
                 <span class="text-xs font-semibold bg-brand text-white px-2 py-0.5 rounded">{{ folder.videoCount }} Video</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="selectedFolder">
        <div class="flex flex-col gap-4 mb-8 border-b border-gray-800 pb-6">
          <button @click="selectedFolder = null" class="w-max inline-flex items-center text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-full text-sm">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Kembali ke Kategori
          </button>
          <div class="flex justify-between items-end">
            <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight break-words">{{ selectedFolder.name === 'Root' ? 'General' : selectedFolder.name }}</h1>
            <span class="text-gray-400 bg-gray-800 px-3 py-1 rounded-full text-sm ml-4">{{ videos.length }} video</span>
          </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <router-link v-for="video in videos" :key="video.id" :to="`/video/${video.id}`" class="group">
            <div class="aspect-video w-full rounded-xl overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-brand transition-all mb-3 relative shadow-lg">
              <img v-if="video.hasThumbnail" :src="`/api/thumbnails/${video.id}`" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              <div v-else class="flex items-center justify-center w-full h-full text-gray-600 bg-gray-800">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </div>
              <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <div class="absolute bottom-2 right-2 bg-black/70 backdrop-blur text-white text-xs px-1.5 py-0.5 rounded shadow">
                {{ video.format }}
              </div>
            </div>
            <h3 class="font-medium text-sm text-gray-300 line-clamp-2 group-hover:text-brand transition-colors">{{ video.name }}</h3>
            <p class="text-xs text-gray-500 mt-1">{{ video.sizeFormatted }}</p>
          </router-link>
        </div>
      </div>
      
      <div v-else class="text-center py-32 bg-gray-800/30 rounded-2xl border border-gray-800">
        <div class="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">Selamat datang di NexEo</h2>
        <p class="text-gray-400 max-w-md mx-auto">Pilih kategori video di sidebar untuk mulai menonton, atau buka Pustaka Novel untuk membaca.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const categoryId = ref('')
const categoryName = ref('')
const folders = ref([])
const selectedFolder = ref(null)
const videos = ref([])
const loading = ref(false)

const fetchFolders = async (catId) => {
  loading.value = true
  try {
    const [catRes, foldRes] = await Promise.all([
      fetch('/api/categories'),
      fetch(`/api/folders?categoryId=${catId}`)
    ])
    
    if (catRes.ok && foldRes.ok) {
      const cats = await catRes.json()
      const cat = cats.find(c => c.id === catId)
      if (cat) categoryName.value = cat.name
      
      folders.value = await foldRes.json()
      selectedFolder.value = null
    }
  } catch(e) {
    console.error("Failed to load folders", e)
  } finally {
    loading.value = false
  }
}

const selectFolder = async (folder) => {
  selectedFolder.value = folder
  loading.value = true
  try {
    const res = await fetch(`/api/videos?categoryId=${categoryId.value}&folder=${encodeURIComponent(folder.name)}&limit=1000`)
    if (res.ok) {
      const data = await res.json()
      videos.value = data.videos
    }
  } catch(e) {
    console.error("Failed to load videos", e)
  } finally {
    loading.value = false
  }
}

watch(() => route.query.category, (newCat) => {
  if (newCat) {
    categoryId.value = newCat
    fetchFolders(newCat)
  } else {
    categoryId.value = ''
    folders.value = []
    selectedFolder.value = null
  }
}, { immediate: true })
</script>
