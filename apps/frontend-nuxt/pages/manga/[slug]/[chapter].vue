<template>
  <div class="manga-reader min-h-screen bg-[#07090e] text-gray-200 relative pb-16 select-none">
    
    <!-- Floating Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-40 pointer-events-none">
      <div class="bg-primary h-1 transition-all duration-150" :style="{ width: `${readPercent}%` }"></div>
    </div>

    <!-- Reader Header Controls Bar -->
    <header v-if="!immersive" class="sticky top-1 z-30 backdrop-blur-xl py-2.5 mb-4 border border-border/80 bg-card/90 flex flex-wrap items-center justify-between px-3 md:px-6 max-w-5xl mx-auto gap-2.5 rounded-2xl shadow-2xl">
      <NuxtLink :to="`/manga/${slug}`" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5">
        ← Detail
      </NuxtLink>

      <div class="flex items-center gap-2 flex-wrap">
        <!-- Mode Switcher: Webtoon vs Flip -->
        <button 
          @click="toggleReaderMode" 
          class="px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-md active:scale-95"
        >
          <span>{{ readerMode === 'webtoon' ? '📜 Mode Webtoon (Vertical)' : '📄 Mode Manga (Flip)' }}</span>
        </button>

        <!-- Fit Width / Height Selector -->
        <select v-model="fitMode" @change="mangaStore.setFitMode(fitMode)" class="bg-background border border-border rounded-full px-3 py-1 text-xs font-semibold text-foreground focus:outline-none focus:border-primary">
          <option value="width">Fit Lebar</option>
          <option value="height">Fit Tinggi</option>
          <option value="full">100% Asli</option>
        </select>

        <a 
          :href="`/api/manga/${slug}/chapter/${encodeURIComponent(chapter)}/export?format=cbz`" 
          download 
          class="px-3 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5 shadow-sm" 
          title="Unduh Chapter ini (.cbz)"
        >
          <span>📥</span> <span class="hidden sm:inline">CBZ</span>
        </a>

        <button @click="immersive = !immersive" class="px-3 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60">
          {{ immersive ? 'Normal' : 'Immersive' }}
        </button>
      </div>
    </header>

    <!-- Top Chapter Navigation Toolbar -->
    <div v-if="!immersive && !loading" class="max-w-5xl mx-auto px-3 sm:px-4 mb-4">
      <div class="flex items-center justify-between gap-2 p-2.5 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm">
        <button 
          @click="goToPrevChapter" 
          :disabled="!prevChapter" 
          class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>⬅️</span> <span class="hidden sm:inline">Chapter Sebelumnya</span>
        </button>

        <NuxtLink :to="`/manga/${slug}`" class="px-3 py-2 rounded-xl text-xs font-bold bg-background border border-border text-foreground hover:bg-border/60 text-center truncate max-w-[150px] sm:max-w-xs">
          📋 <span class="hidden sm:inline">Daftar Chapter</span>
        </NuxtLink>

        <button 
          @click="goToNextChapter" 
          :disabled="!nextChapter" 
          class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span class="hidden sm:inline">Chapter Selanjutnya</span> <span>➡️</span>
        </button>
      </div>
    </div>

    <!-- MAIN MANGA READER CANVAS -->
    <main class="max-w-5xl mx-auto px-2 sm:px-4 pb-12">
      <div v-if="loading" class="py-20 flex justify-center"><div class="spinner"></div></div>
      <div v-else-if="pages.length === 0" class="py-20 text-center text-muted-foreground">Tidak ada gambar halaman di chapter ini.</div>

      <!-- MODE 1: WEBTOON (VERTICAL SCROLL CONTINUOUS STRIP) -->
      <div v-else-if="readerMode === 'webtoon'" class="flex flex-col items-center gap-1 sm:gap-2">
        <div 
          v-for="(pageUrl, idx) in pages" 
          :key="idx" 
          :id="`page-${idx}`"
          :class="['transition-all flex justify-center w-full', fitClasses]"
        >
          <img 
            :src="pageUrl" 
            :alt="`Halaman ${idx + 1}`"
            class="rounded-lg shadow-2xl object-contain max-w-full"
            loading="lazy"
          />
        </div>
      </div>

      <!-- MODE 2: MANGA FLIP (SINGLE PAGE MODE) -->
      <div v-else-if="readerMode === 'flip'" class="flex flex-col items-center justify-center min-h-[70vh]">
        <div class="relative max-w-full flex justify-center mb-4">
          <img 
            :src="pages[currentPageIndex]" 
            :alt="`Halaman ${currentPageIndex + 1}`" 
            :class="['rounded-xl shadow-2xl object-contain max-h-[85vh]', fitClasses]"
          />
        </div>

        <!-- Single Page Navigation Toolbar -->
        <div class="flex items-center gap-4 bg-card/90 border border-border/80 px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md">
          <button 
            @click="prevPage" 
            :disabled="currentPageIndex === 0" 
            class="px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold hover:bg-border/60 disabled:opacity-30"
          >
            ← Halaman Sebelum
          </button>

          <span class="text-xs font-mono font-bold text-amber-400">
            Halaman {{ currentPageIndex + 1 }} dari {{ pages.length }}
          </span>

          <button 
            @click="nextPage" 
            :disabled="currentPageIndex === pages.length - 1" 
            class="px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold hover:bg-border/60 disabled:opacity-30"
          >
            Halaman Berikut →
          </button>
        </div>
      </div>

      <!-- Bottom Chapter Navigation Toolbar -->
      <div v-if="!loading && pages.length > 0" class="mt-8 flex items-center justify-between gap-3 p-3 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-md">
        <button 
          @click="goToPrevChapter" 
          :disabled="!prevChapter" 
          class="px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
        >
          <span>⬅️</span> <span>Chapter Sebelumnya</span>
        </button>

        <NuxtLink :to="`/manga/${slug}`" class="px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-background border border-border text-foreground hover:bg-border/60 text-center">
          📋 <span class="hidden sm:inline">Daftar Chapter</span>
        </NuxtLink>

        <button 
          @click="goToNextChapter" 
          :disabled="!nextChapter" 
          class="px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
        >
          <span>Chapter Selanjutnya</span> <span>➡️</span>
        </button>
      </div>

    </main>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMangaStore } from '~/stores/manga'

const route = useRoute()
const router = useRouter()
const mangaStore = useMangaStore()

const slug = route.params.slug as string
const chapter = route.params.chapter as string
const loading = ref(true)
const immersive = ref(false)
const readPercent = ref(0)
const currentPageIndex = ref(0)
const chaptersList = ref<any[]>([])

const readerMode = computed(() => mangaStore.readerMode)
const fitMode = ref<'width' | 'height' | 'full'>('width')

const pages = computed(() => mangaStore.currentChapterPages)

const fitClasses = computed(() => {
  if (fitMode.value === 'height') return 'max-h-[90vh] w-auto'
  if (fitMode.value === 'full') return 'w-full max-w-none'
  return 'max-w-3xl w-full'
})

function toggleReaderMode() {
  const next = readerMode.value === 'webtoon' ? 'flip' : 'webtoon'
  mangaStore.setReaderMode(next)
}

function prevPage() {
  if (currentPageIndex.value > 0) {
    currentPageIndex.value--
  } else if (prevChapter.value) {
    goToPrevChapter()
  }
}

function nextPage() {
  if (currentPageIndex.value < pages.value.length - 1) {
    currentPageIndex.value++
  } else if (nextChapter.value) {
    goToNextChapter()
  }
}

const currentIndex = computed(() => {
  if (!chaptersList.value.length) return -1
  const currentFileName = chapter.replace(/\\/g, '/').split('/').pop() || chapter
  return chaptersList.value.findIndex(c => {
    const fn = (c.file || c.id || '').replace(/\\/g, '/').split('/').pop()
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
    const targetFile = prevChapter.value.file || prevChapter.value.id
    router.push(`/manga/${slug}/${encodeURIComponent(targetFile)}`)
  }
}

function goToNextChapter() {
  if (nextChapter.value) {
    const targetFile = nextChapter.value.file || nextChapter.value.id
    router.push(`/manga/${slug}/${encodeURIComponent(targetFile)}`)
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.key === 'ArrowLeft') {
    if (readerMode.value === 'flip') prevPage()
    else goToPrevChapter()
  } else if (e.key === 'ArrowRight') {
    if (readerMode.value === 'flip') nextPage()
    else goToNextChapter()
  }
}

function handleScroll() {
  if (typeof window === 'undefined') return
  const total = document.documentElement.scrollHeight - window.innerHeight
  if (total > 0) {
    readPercent.value = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)))
  }
}

async function loadChapter() {
  loading.value = true
  currentPageIndex.value = 0
  try {
    const api = useApi()
    if (!chaptersList.value.length) {
      const listRes = await api.get<{ success?: boolean; data?: any[] }>(`/manga/${slug}/chapters`)
      if (listRes?.data) {
        chaptersList.value = listRes.data
      }
    }

    await mangaStore.fetchChapterPages(slug, chapter)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`resume_manga_${slug}`, chapter)
    }
  } catch (e) {
    console.error('Failed to load manga chapter', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  mangaStore.initPreferences()
  fitMode.value = mangaStore.fitMode
  void loadChapter()
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeyDown)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeyDown)
  }
})

watch(() => route.params.chapter, (next) => { if (typeof next === 'string') void loadChapter() })
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
