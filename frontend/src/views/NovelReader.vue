<template>
  <div :class="['novel-reader min-h-screen pb-32 transition-colors duration-300', themeClasses.bg]">
    <div v-if="!immersive" :class="['sticky top-0 z-20 backdrop-blur-md py-4 mb-4 border-b flex items-center justify-between px-4 md:px-0 max-w-3xl mx-auto', themeClasses.headerBg, themeClasses.border, headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none']" class="transition-all duration-300">
      <router-link :to="`/novels/${slug}`" :class="['px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2', themeClasses.btn]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span>Daftar Bab</span>
      </router-link>
      <div class="flex items-center gap-2">
        <button @click="showChapterList = !showChapterList" :class="['px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2', themeClasses.btn]">Bab</button>
        <button @click="showSettings = !showSettings" :class="['p-2 rounded-lg transition-colors', themeClasses.textBtn]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
        </button>
      </div>
    </div>
    <div v-if="showChapterList && !immersive" class="fixed inset-0 z-30 bg-black/60" @click="showChapterList = false">
      <div class="absolute right-0 top-0 h-full w-full max-w-sm bg-background border-l border-border p-4 overflow-y-auto" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-foreground">Daftar Bab</h3>
          <button class="text-muted-foreground hover:text-foreground" @click="showChapterList = false">Tutup</button>
        </div>
        <div class="space-y-2">
          <router-link v-for="chapter in chapterIndex" :key="chapter.file" :to="`/novels/${slug}/${chapter.file}`" :class="['block px-3 py-2 rounded-lg border transition-all text-sm', chapter.file === chapterFile ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-card-foreground hover:border-primary']">
            {{ chapter.id }}. {{ chapter.title }}
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="showSettings && !immersive" @click.stop class="absolute top-20 right-4 z-20 bg-background border border-border rounded-xl shadow-2xl p-4 w-64">
      <h3 class="text-sm font-semibold text-muted-foreground mb-3">Pengaturan</h3>
      <div class="mb-4">
        <label class="text-xs text-muted-foreground mb-2 block">Tema</label>
        <div class="flex gap-2">
          <button @click="changeTheme('dark')" :class="['flex-1 py-1.5 rounded-lg text-sm border-2', theme === 'dark' ? 'border-primary bg-card text-primary' : 'border-transparent bg-card text-muted-foreground']">Dark</button>
          <button @click="changeTheme('sepia')" :class="['flex-1 py-1.5 rounded-lg text-sm border-2', theme === 'sepia' ? 'border-primary bg-[#f4ecd8] text-[#5b4636]' : 'border-transparent bg-[#f4ecd8]/50']">Sepia</button>
          <button @click="changeTheme('light')" :class="['flex-1 py-1.5 rounded-lg text-sm border-2', theme === 'light' ? 'border-primary bg-white text-background' : 'border-transparent bg-white/50']">Light</button>
        </div>
      </div>
      <div class="mb-2">
        <label class="text-xs text-muted-foreground mb-2 block">Font: <span class="text-primary">{{ fontSize }}px</span></label>
        <div class="flex gap-2">
          <button @click="fontSize > 14 && fontSize--" class="px-3 py-1.5 bg-card text-foreground rounded-lg">-</button>
          <input type="range" v-model.number="fontSize" min="14" max="32" class="flex-1 accent-brand">
          <button @click="fontSize < 32 && fontSize++" class="px-3 py-1.5 bg-card text-foreground rounded-lg">+</button>
        </div>
      </div>
    </div>
    <button @click="immersive = !immersive" :class="['fixed bottom-6 right-6 z-30 p-3 rounded-full shadow-lg transition-all', immersive ? 'bg-primary text-foreground' : 'bg-card text-accent']">
      <svg v-if="immersive" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
    </button>
    <div class="max-w-3xl mx-auto px-4 md:px-0">
      <div v-if="loading" class="flex justify-center py-20"><div class="spinner"></div></div>
      <div v-else-if="!chapterData" class="text-center py-20 text-muted-foreground text-lg">Gagal memuat isi bab.</div>
      <div v-else class="px-4 md:px-0">
        <h1 :class="['text-2xl md:text-4xl font-bold mb-10 text-center leading-snug', themeClasses.title]">{{ chapterData.title }}</h1>
        <div :class="['leading-loose space-y-6 transition-all duration-300', themeClasses.text]" :style="{ fontSize: `${fontSize}px` }">
          <template v-for="(item, index) in chapterData.content" :key="'item-'+index">
            <p v-if="item.type === 'text'" class="font-serif">{{ item.translatedValue || item.value }}</p>
            <div v-else-if="item.type === 'image'" class="py-6 flex justify-center"><img :src="`/api/novels/static/${slug}/${item.value}`" class="max-w-full rounded-2xl shadow-2xl border border-border" loading="lazy" /></div>
          </template>
        </div>
        <div :class="['mt-16 pt-8 border-t flex flex-col items-center gap-6', themeClasses.border]">
          <div class="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
            <router-link v-if="prevChapter" :to="`/novels/${slug}/${prevChapter.file}`" :class="['flex-1 md:flex-none flex items-center justify-center px-6 py-3 rounded-xl transition-all border', themeClasses.navBtn]">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Sebelumnya
            </router-link>
            <router-link :to="`/novels/${slug}`" :class="['flex items-center justify-center p-3 rounded-xl transition-all border', themeClasses.navBtn]" title="Daftar Bab"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg></router-link>
            <router-link v-if="nextChapter" :to="`/novels/${slug}/${nextChapter.file}`" class="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all border border-primary/30 font-medium">Berikutnya<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></router-link>
          </div>
          <button @click="scrollToTop" :class="['text-sm transition-colors flex items-center mt-4', themeClasses.textBtn]"><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>Kembali ke Atas</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
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
const showSettings = ref(false)
const showChapterList = ref(false)
const immersive = ref(false)
const headerVisible = ref(true)
const chapterIndex = ref([])

const loadChapterIndex = async () => {
  try {
    const res = await axios.get(`/api/novels/${slug}/index`)
    chapterIndex.value = res.data || []
  } catch (e) {
    console.error('Failed to load chapter index:', e)
  }
}

const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  headerVisible.value = scrollTop < 50 || window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 100
}
const themeClasses = computed(() => theme.value === 'sepia' ? { bg:'bg-[#f4ecd8]', headerBg:'bg-[#f4ecd8]/90', border:'border-[#d5c3a1]', title:'text-[#5b4636]', text:'text-[#433422]', btn:'bg-[#e4d5b7] text-[#5b4636] hover:bg-[#d5c3a1]', textBtn:'text-[#7a5e46] hover:text-[#433422] hover:bg-[#e4d5b7]', navBtn:'bg-[#e4d5b7] text-[#5b4636] border-[#d5c3a1] hover:bg-[#d5c3a1] hover:border-primary' } : theme.value === 'light' ? { bg:'bg-white', headerBg:'bg-white/90', border:'border-foreground', title:'text-background', text:'text-card', btn:'bg-gray-100 text-muted-foreground hover:text-background hover:bg-foreground', textBtn:'text-muted-foreground hover:text-background hover:bg-gray-100', navBtn:'bg-gray-50 text-border border-foreground hover:bg-gray-100 hover:border-primary' } : { bg:'bg-background', headerBg:'bg-background/90', border:'border-card', title:'text-foreground', text:'text-card-foreground', btn:'bg-card text-muted-foreground hover:text-foreground', textBtn:'text-muted-foreground hover:text-foreground hover:bg-card', navBtn:'bg-card text-card-foreground border-border hover:bg-border hover:border-primary' })
const changeTheme = (newTheme) => { 
  theme.value = newTheme
  try {
    localStorage.setItem('reader_theme', newTheme)
  } catch(e) {
    console.warn('Failed to save theme:', e)
  }
}
onMounted(async () => {
  try {
    const savedTheme = localStorage.getItem('reader_theme')
    if (savedTheme) theme.value = savedTheme
    const savedSize = localStorage.getItem('reader_font_size')
    if (savedSize) fontSize.value = parseInt(savedSize)
  } catch(e) {
    console.warn('Failed to load reader preferences:', e)
  }

  window.addEventListener('scroll', handleScroll)
  
  try {
    await loadChapterIndex()
    const res = await axios.get(`/api/novels/${slug}/chapter/${chapterFile}`)
    chapterData.value = res.data
    const i = chapterIndex.value.findIndex(c => c.file === chapterFile)
    if (i !== -1) {
      prevChapter.value = i > 0 ? chapterIndex.value[i-1] : null
      nextChapter.value = i < chapterIndex.value.length - 1 ? chapterIndex.value[i+1] : null
    }
    try {
      localStorage.setItem(`resume_novel_${slug}`, chapterFile)
    } catch(e) {
      console.warn('Failed to save resume progress:', e)
    }
  } finally {
    loading.value = false
  }
})
watch(() => fontSize.value, (newSize) => {
  try {
    localStorage.setItem('reader_font_size', newSize)
  } catch(e) {
    console.warn('Failed to save font size:', e)
  }
})
watch(() => route.params.chapter, async (newChapter) => { 
  if (newChapter) {
    loading.value = true
    try {
      const res = await axios.get(`/api/novels/${slug}/chapter/${newChapter}`)
      chapterData.value = res.data
      const i = chapterIndex.value.findIndex(c => c.file === newChapter)
      if (i !== -1) {
        prevChapter.value = i > 0 ? chapterIndex.value[i-1] : null
        nextChapter.value = i < chapterIndex.value.length - 1 ? chapterIndex.value[i+1] : null
      }
      try {
        localStorage.setItem(`resume_novel_${slug}`, newChapter)
      } catch(e) {
        console.warn('Failed to save resume:', e)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
      showChapterList.value = false
    } catch(e) {
      console.error('Failed to load chapter:', e)
    } finally {
      loading.value = false
    }
  }
})
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>
