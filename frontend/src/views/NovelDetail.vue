<template>
  <div class="novel-detail max-w-5xl mx-auto">
    <router-link to="/novels" class="inline-flex items-center text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-full text-sm mb-6">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Kembali ke Pustaka
    </router-link>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="!novel" class="text-center py-20 text-gray-500 text-lg">
      Novel tidak ditemukan.
    </div>

    <div v-else>
      <!-- Header -->
      <div class="flex flex-col md:flex-row gap-8 mb-12 pb-8">
        <div class="w-56 flex-shrink-0 mx-auto md:mx-0">
          <div class="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 shadow-brand/20">
            <img v-if="novel.localThumbnail" :src="`/api/novels/static/${novel.localThumbnail}`" class="object-cover w-full h-full" />
            <div v-else class="flex items-center justify-center w-full h-full bg-gray-800 text-gray-500">No Cover</div>
          </div>
          
          <div class="grid grid-cols-2 gap-2 mt-4 text-center">
            <div class="bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
              <div class="font-bold text-lg text-brand">{{ chapters.length }}</div>
              <div class="text-xs text-gray-400">Chapters</div>
            </div>
            <div class="bg-sky-900/20 p-2 rounded-lg border border-sky-800/30">
              <div class="font-bold text-lg text-sky-400">Free</div>
              <div class="text-xs text-gray-400">Access</div>
            </div>
          </div>
        </div>
        
        <div class="flex-1 text-center md:text-left flex flex-col">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-400 mb-2">{{ novel.title }}</h1>
          <p v-if="novel.author" class="text-gray-400 text-sm mb-4">by <span class="font-medium text-brand">{{ novel.author }}</span></p>
          
          <div v-if="novel.tags && novel.tags.length" class="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
            <span v-for="tag in novel.tags" :key="tag" class="bg-brand/10 border border-brand/30 text-brand px-3 py-1 rounded-full text-xs font-medium">
              {{ tag }}
            </span>
          </div>
          
          <div v-if="novel.hashtags && novel.hashtags.length" class="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
            <span v-for="htag in novel.hashtags" :key="htag" class="text-xs text-gray-400 hover:text-white transition-colors cursor-default">
              {{ htag }}
            </span>
          </div>
          
          <div class="h-px bg-gradient-to-r from-gray-700 to-transparent w-full mb-6"></div>
          
          <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-6">
            <div v-if="novel.description" class="text-gray-300 leading-relaxed text-sm" v-html="novel.description"></div>
            <div v-else class="text-gray-500 italic text-sm">Tidak ada sinopsis tersedia.</div>
          </div>
          
          <div class="flex flex-wrap items-center gap-3 justify-center md:justify-start mt-auto">
            <router-link v-if="resumeChapter" :to="`/novels/${slug}/${resumeChapter}`" class="bg-brand border border-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors inline-flex items-center shadow-lg shadow-brand/20">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Lanjutkan Membaca
            </router-link>
            <router-link v-else-if="chapters.length > 0" :to="`/novels/${slug}/${chapters[0].file}`" class="bg-brand border border-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors inline-flex items-center shadow-lg shadow-brand/20">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Mulai Membaca
            </router-link>

            <a :href="novel.sourceUrl" target="_blank" class="bg-gray-800 border border-gray-700 text-gray-300 px-5 py-2.5 rounded-xl text-sm hover:bg-gray-700 transition-colors inline-flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              Sumber Asli
            </a>
          </div>
        </div>
      </div>

      <!-- Chapters List -->
      <div>
        <h2 class="text-xl font-bold mb-6 text-white flex items-center">
          <svg class="w-5 h-5 mr-2 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Daftar Bab
        </h2>
        
        <div v-if="chapters.length === 0" class="bg-yellow-900/20 border border-yellow-700/50 text-yellow-500/90 px-5 py-4 rounded-xl text-sm flex items-start">
          <svg class="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>Bab untuk novel ini belum diunduh secara lokal. Jalankan scraper untuk novel ini.</div>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <router-link 
            v-for="chapter in chapters" 
            :key="chapter.id" 
            :to="`/novels/${slug}/${chapter.file}`"
            class="group p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all border border-gray-700 hover:border-brand flex items-center justify-between"
          >
            <span class="font-medium text-gray-300 group-hover:text-white truncate pr-4">{{ chapter.title }}</span>
            <svg class="w-4 h-4 text-gray-500 group-hover:text-brand transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

const novel = ref(null)
const chapters = ref([])
const loading = ref(true)
const resumeChapter = ref(null)

onMounted(async () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem(`resume_novel_${slug}`)
    if (saved) resumeChapter.value = saved
  }

  try {
    // Fetch novel info from library
    const libRes = await fetch('/api/novels/library')
    if (libRes.ok) {
      const library = await libRes.json()
      novel.value = library.find(n => n.folderName === slug)
    }

    // Fetch chapters index
    const idxRes = await fetch(`/api/novels/${slug}/index`)
    if (idxRes.ok) {
      chapters.value = await idxRes.json()
    }
  } catch(e) {
    console.error("Failed to load novel detail", e)
  } finally {
    loading.value = false
  }
})
</script>
