<template>
  <div :class="['novel-reader min-h-screen pb-20 transition-colors duration-300', themeClasses.bg]">
    <div :class="['sticky top-0 z-10 backdrop-blur-md py-4 mb-8 border-b flex items-center justify-between px-4 md:px-0 max-w-3xl mx-auto', themeClasses.headerBg, themeClasses.border]">
      <router-link :to="`/novels/${slug}`" :class="['flex items-center px-3 py-1.5 rounded-full text-sm transition-colors', themeClasses.btn]">
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Daftar Bab
      </router-link>
      
      <div class="flex items-center space-x-1">
        <button @click="changeTheme('dark')" :class="['w-6 h-6 rounded-full border-2', theme === 'dark' ? 'border-brand' : 'border-transparent', 'bg-gray-900']" title="Dark Theme"></button>
        <button @click="changeTheme('sepia')" :class="['w-6 h-6 rounded-full border-2', theme === 'sepia' ? 'border-brand' : 'border-transparent', 'bg-[#f4ecd8]']" title="Sepia Theme"></button>
        <button @click="changeTheme('light')" :class="['w-6 h-6 rounded-full border-2', theme === 'light' ? 'border-brand' : 'border-transparent', 'bg-white']" title="Light Theme"></button>
        
        <div class="w-px h-6 bg-gray-600 mx-2"></div>
        <button @click="fontSize > 14 && fontSize--" :class="['p-2 rounded-lg transition-colors', themeClasses.textBtn]">A-</button>
        <button @click="fontSize < 24 && fontSize++" :class="['p-2 rounded-lg transition-colors', themeClasses.textBtn]">A+</button>
      </div>
    </div>
    
    <div class="max-w-3xl mx-auto px-4 md:px-0">

    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="!chapterData" class="text-center py-20 text-gray-500 text-lg">
      Gagal memuat isi bab.
    </div>

    <div v-else class="px-4 md:px-0">
      <h1 :class="['text-2xl md:text-4xl font-bold mb-10 text-center leading-snug', themeClasses.title]">
        {{ chapterData.title }}
      </h1>
      
      <div 
        :class="['leading-loose space-y-6 transition-all duration-300', themeClasses.text]" 
        :style="{ fontSize: `${fontSize}px` }"
      >
        <template v-for="(item, index) in chapterData.content" :key="'item-'+index">
          <p v-if="item.type === 'text'" class="font-serif">{{ item.value }}</p>
          <div v-else-if="item.type === 'image'" class="py-6 flex justify-center">
            <img :src="`/api/novels/static/${slug}/${item.value}`" class="max-w-full rounded-2xl shadow-2xl border border-gray-700" loading="lazy" />
          </div>
        </template>
      </div>
      
      <div :class="['mt-16 pt-8 border-t flex flex-col items-center gap-6', themeClasses.border]">
        <div class="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
          <router-link v-if="prevChapter" :to="`/novels/${slug}/${prevChapter.file}`" :class="['flex-1 md:flex-none flex items-center justify-center px-6 py-3 rounded-xl transition-all border', themeClasses.navBtn]">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            Sebelumnya
          </router-link>
          
          <router-link :to="`/novels/${slug}`" :class="['flex items-center justify-center p-3 rounded-xl transition-all border', themeClasses.navBtn]" title="Daftar Bab">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
          </router-link>

          <router-link v-if="nextChapter" :to="`/novels/${slug}/${nextChapter.file}`" class="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-brand/10 hover:bg-brand/20 text-brand rounded-xl transition-all border border-brand/30 hover:border-brand font-medium">
            Berikutnya
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </router-link>
        </div>
        
        <button @click="scrollToTop" :class="['text-sm transition-colors flex items-center mt-4', themeClasses.textBtn]">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
          Kembali ke Atas
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug
const chapterFile = route.params.chapter

const chapterData = ref(null)
const prevChapter = ref(null)
const nextChapter = ref(null)
const loading = ref(true)
const fontSize = ref(18)
const theme = ref('dark')

const themeClasses = computed(() => {
  if (theme.value === 'sepia') {
    return {
      bg: 'bg-[#f4ecd8]',
      headerBg: 'bg-[#f4ecd8]/90',
      border: 'border-[#d5c3a1]',
      title: 'text-[#5b4636]',
      text: 'text-[#433422]',
      btn: 'bg-[#e4d5b7] text-[#5b4636] hover:bg-[#d5c3a1]',
      textBtn: 'text-[#7a5e46] hover:text-[#433422] hover:bg-[#e4d5b7]',
      navBtn: 'bg-[#e4d5b7] text-[#5b4636] border-[#d5c3a1] hover:bg-[#d5c3a1] hover:border-brand'
    }
  } else if (theme.value === 'light') {
    return {
      bg: 'bg-white',
      headerBg: 'bg-white/90',
      border: 'border-gray-200',
      title: 'text-gray-900',
      text: 'text-gray-800',
      btn: 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200',
      textBtn: 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
      navBtn: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-brand'
    }
  } else {
    // Dark
    return {
      bg: 'bg-gray-900',
      headerBg: 'bg-gray-900/90',
      border: 'border-gray-800',
      title: 'text-white',
      text: 'text-gray-300',
      btn: 'bg-gray-800 text-gray-400 hover:text-white',
      textBtn: 'text-gray-400 hover:text-white hover:bg-gray-800',
      navBtn: 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-brand'
    }
  }
})

const changeTheme = (newTheme) => {
  theme.value = newTheme
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('reader_theme', newTheme)
  }
}

onMounted(async () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedTheme = localStorage.getItem('reader_theme')
    if (savedTheme) theme.value = savedTheme
    
    const savedSize = localStorage.getItem('reader_font_size')
    if (savedSize) fontSize.value = parseInt(savedSize)
  }
  loading.value = true
  try {
    const res = await fetch(`/api/novels/${slug}/chapter/${chapterFile}`)
    if (res.ok) {
      chapterData.value = await res.json()
    }

    // Fetch index to find prev and next chapters
    const idxRes = await fetch(`/api/novels/${slug}/index`)
    if (idxRes.ok) {
      const indexList = await idxRes.json()
      const currentIndex = indexList.findIndex(c => c.file === chapterFile)
      
      if (currentIndex !== -1) {
        prevChapter.value = currentIndex > 0 ? indexList[currentIndex - 1] : null
        nextChapter.value = currentIndex < indexList.length - 1 ? indexList[currentIndex + 1] : null
      }
    }

    // Save reading progress to localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(`resume_novel_${slug}`, chapterFile)
    }
  } catch(e) {
    console.error("Failed to load chapter", e)
  } finally {
    loading.value = false
  }
})

watch(() => fontSize.value, (newSize) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('reader_font_size', newSize)
  }
})

watch(() => route.params.chapter, (newChapter) => {
  if (newChapter) {
    window.location.reload()
  }
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
