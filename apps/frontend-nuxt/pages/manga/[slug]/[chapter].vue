<template>
  <div class="manga-reader min-h-screen bg-[#07090e] text-gray-200 relative pb-16 select-none">
    
    <!-- Floating Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-40 pointer-events-none">
      <div class="bg-primary h-1 transition-all duration-150" :style="{ width: `${readPercent}%` }"></div>
    </div>

    <!-- Reader Header Controls Bar -->
    <header v-if="!immersive" class="sticky top-1 z-30 backdrop-blur-xl py-2.5 mb-4 border border-border/80 bg-card/90 flex flex-wrap items-center justify-between px-3 md:px-6 max-w-5xl mx-auto gap-2.5 rounded-2xl shadow-2xl">
      <NuxtLink :to="`/manga/${slug}`" class="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5 shadow-sm">
        ← Detail
      </NuxtLink>

      <div class="flex items-center gap-2 flex-wrap">
        <!-- Mode Switcher: Webtoon vs Single vs Double Spread -->
        <select v-model="readerMode" @change="mangaStore.setReaderMode(readerMode)" class="bg-background border border-border rounded-full px-3 py-1 text-xs font-semibold text-foreground focus:outline-none focus:border-primary">
          <option value="webtoon">📜 Webtoon (Vertikal)</option>
          <option value="flip">📄 1 Halaman (Single)</option>
          <option value="double">📖 2 Halaman (Buku)</option>
        </select>

        <!-- Reading Direction (for Flip / Double Mode) -->
        <button 
          v-if="readerMode !== 'webtoon'"
          @click="toggleReadingDirection" 
          class="px-2.5 py-1 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1 shadow-sm"
          :title="readingDir === 'rtl' ? 'Arah Baca: Kanan ke Kiri (Jepang)' : 'Arah Baca: Kiri ke Kanan (Barat)'"
        >
          <span>{{ readingDir === 'rtl' ? '🇯🇵 Kanan-ke-Kiri' : '🌐 Kiri-ke-Kanan' }}</span>
        </button>

        <!-- Fit Width / Height Selector -->
        <select v-model="fitMode" @change="mangaStore.setFitMode(fitMode)" class="bg-background border border-border rounded-full px-3 py-1 text-xs font-semibold text-foreground focus:outline-none focus:border-primary">
          <option value="width">Fit Lebar</option>
          <option value="height">Fit Tinggi</option>
          <option value="full">100% Asli</option>
        </select>

        <!-- Auto Scroll Button for Webtoon Mode -->
        <button 
          v-if="readerMode === 'webtoon'"
          @click="toggleAutoScroll" 
          :class="['px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-sm active:scale-95', isAutoScrolling ? 'bg-amber-600 text-white border-amber-500 animate-pulse' : 'bg-background border border-border text-foreground hover:bg-border/60']"
          title="Auto-Scroll Otomatis (Shortcut: Space)"
        >
          <span>📜</span> {{ isAutoScrolling ? 'Auto-Scroll Aktif' : 'Auto Scroll' }}
        </button>

        <a 
          :href="`/api/manga/${slug}/chapter/${encodeURIComponent(chapter)}/export?format=cbz`" 
          download 
          class="px-3 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5 shadow-sm" 
          title="Unduh Chapter ini (.cbz)"
        >
          <span>📥</span> <span class="hidden sm:inline">CBZ</span>
        </a>

        <button @click="immersive = !immersive" class="px-3 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60 shadow-sm">
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
    <main :class="readerMode === 'double' ? 'max-w-7xl mx-auto px-2 sm:px-4 pb-12' : 'max-w-5xl mx-auto px-2 sm:px-4 pb-12'">
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
        <div class="relative max-w-full flex justify-center mb-4 cursor-pointer" @click="handlePageClick">
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
            {{ readingDir === 'rtl' ? 'Halaman Berikut →' : '← Halaman Sebelum' }}
          </button>

          <span class="text-xs font-mono font-bold text-amber-400">
            Halaman {{ currentPageIndex + 1 }} dari {{ pages.length }}
          </span>

          <button 
            @click="nextPage" 
            :disabled="currentPageIndex === pages.length - 1" 
            class="px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold hover:bg-border/60 disabled:opacity-30"
          >
            {{ readingDir === 'rtl' ? '← Halaman Sebelum' : 'Halaman Berikut →' }}
          </button>
        </div>
      </div>

      <!-- MODE 3: DUAL-PAGE SPREAD (BOOK SIMULATION 2 PAGES SIDE BY SIDE) -->
      <div v-else-if="readerMode === 'double'" class="flex flex-col items-center justify-center min-h-[70vh]">
        <!-- Double Spread Canvas -->
        <div class="flex items-center justify-center gap-1 sm:gap-2 max-w-full mb-4 cursor-pointer" @click="handlePageClick">
          <!-- Page Slot 1 (Left on LTR, Right on RTL) -->
          <template v-if="readingDir === 'rtl'">
            <!-- Left page (next page in RTL) -->
            <div v-if="doublePages.left" class="flex-1 flex justify-end">
              <img 
                :src="doublePages.left" 
                alt="Left Page"
                class="rounded-r-none rounded-l-xl shadow-2xl object-contain max-h-[85vh] max-w-full border-r border-border/20"
              />
            </div>
            <!-- Right page (current page in RTL) -->
            <div v-if="doublePages.right" class="flex-1 flex justify-start">
              <img 
                :src="doublePages.right" 
                alt="Right Page"
                class="rounded-l-none rounded-r-xl shadow-2xl object-contain max-h-[85vh] max-w-full"
              />
            </div>
          </template>

          <template v-else>
            <!-- Left page (current page in LTR) -->
            <div v-if="doublePages.left" class="flex-1 flex justify-end">
              <img 
                :src="doublePages.left" 
                alt="Left Page"
                class="rounded-r-none rounded-l-xl shadow-2xl object-contain max-h-[85vh] max-w-full border-r border-border/20"
              />
            </div>
            <!-- Right page (next page in LTR) -->
            <div v-if="doublePages.right" class="flex-1 flex justify-start">
              <img 
                :src="doublePages.right" 
                alt="Right Page"
                class="rounded-l-none rounded-r-xl shadow-2xl object-contain max-h-[85vh] max-w-full"
              />
            </div>
          </template>
        </div>

        <!-- Double Page Navigation Toolbar -->
        <div class="flex items-center gap-4 bg-card/90 border border-border/80 px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md">
          <button 
            @click="prevPageDouble" 
            :disabled="currentPageIndex === 0" 
            class="px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold hover:bg-border/60 disabled:opacity-30"
          >
            {{ readingDir === 'rtl' ? 'Halaman Berikut →' : '← Halaman Sebelum' }}
          </button>

          <span class="text-xs font-mono font-bold text-amber-400">
            Hal {{ currentPageIndex + 1 }} - {{ Math.min(currentPageIndex + 2, pages.length) }} dari {{ pages.length }}
          </span>

          <button 
            @click="nextPageDouble" 
            :disabled="currentPageIndex >= pages.length - 2" 
            class="px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold hover:bg-border/60 disabled:opacity-30"
          >
            {{ readingDir === 'rtl' ? '← Halaman Sebelum' : 'Halaman Berikut →' }}
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

    <!-- Floating Auto-Scroll Control Bar for Webtoon Mode -->
    <div v-if="readerMode === 'webtoon' && isAutoScrolling" class="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 bg-card/95 border border-amber-500/50 rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 animate-fade-in">
      <div class="flex items-center gap-2">
        <span class="text-lg animate-spin">📜</span>
        <div>
          <h4 class="text-xs font-bold text-foreground">Auto-Scroll Aktif</h4>
          <p class="text-[10px] text-muted-foreground font-mono">Kecepatan: {{ autoScrollSpeedMultiplier }}x (Tekan Space untuk pause)</p>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <button 
          v-for="mult in [0.5, 1.0, 2.0, 3.0, 5.0]" 
          :key="mult"
          @click="setScrollSpeedMultiplier(mult)"
          :class="['px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all', autoScrollSpeedMultiplier === mult ? 'bg-amber-500 text-black shadow-md' : 'bg-background border border-border text-muted-foreground hover:text-foreground']"
        >
          {{ mult }}x
        </button>

        <button @click="stopAutoScroll" class="ml-1 px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30">
          ⏸ Hentikan
        </button>
      </div>
    </div>

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

const readerMode = ref<'webtoon' | 'flip' | 'double'>('webtoon')
const fitMode = ref<'width' | 'height' | 'full'>('width')
const readingDir = ref<'rtl' | 'ltr'>('rtl')

// Auto-Scroll State
const isAutoScrolling = ref(false)
const autoScrollSpeedMultiplier = ref(1.0)
let autoScrollTimer: any = null

function toggleAutoScroll() {
  if (isAutoScrolling.value) {
    stopAutoScroll()
  } else {
    startAutoScroll()
  }
}

function startAutoScroll() {
  if (typeof window === 'undefined') return
  isAutoScrolling.value = true
  if (autoScrollTimer) clearInterval(autoScrollTimer)

  autoScrollTimer = setInterval(() => {
    if (!isAutoScrolling.value) return
    const scrollStep = 2 * autoScrollSpeedMultiplier.value
    window.scrollBy({ top: scrollStep, behavior: 'instant' as any })

    // Auto-stop at bottom of chapter page
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 15) {
      stopAutoScroll()
    }
  }, 16)
}

function stopAutoScroll() {
  isAutoScrolling.value = false
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer)
    autoScrollTimer = null
  }
}

function setScrollSpeedMultiplier(mult: number) {
  autoScrollSpeedMultiplier.value = mult
  if (isAutoScrolling.value) {
    startAutoScroll()
  }
}

const pages = computed(() => mangaStore.currentChapterPages)

const fitClasses = computed(() => {
  if (fitMode.value === 'height') return 'max-h-[90vh] w-auto'
  if (fitMode.value === 'full') return 'w-full max-w-none'
  return 'max-w-3xl w-full'
})

const doublePages = computed(() => {
  const p = pages.value
  const idx = currentPageIndex.value
  if (readingDir.value === 'rtl') {
    // Right page is first, Left is next
    return {
      right: p[idx] || null,
      left: p[idx + 1] || null
    }
  } else {
    // Left is first, Right is next
    return {
      left: p[idx] || null,
      right: p[idx + 1] || null
    }
  }
})

function toggleReadingDirection() {
  const next = readingDir.value === 'rtl' ? 'ltr' : 'rtl'
  readingDir.value = next
  mangaStore.setReadingDirection(next)
}

function handlePageClick(e: MouseEvent) {
  const width = window.innerWidth
  const clickX = e.clientX
  if (readerMode.value === 'double') {
    if (readingDir.value === 'rtl') {
      if (clickX < width / 2) nextPageDouble()
      else prevPageDouble()
    } else {
      if (clickX < width / 2) prevPageDouble()
      else nextPageDouble()
    }
  } else if (readerMode.value === 'flip') {
    if (readingDir.value === 'rtl') {
      if (clickX < width / 2) nextPage()
      else prevPage()
    } else {
      if (clickX < width / 2) prevPage()
      else nextPage()
    }
  }
}

function prevPage() {
  if (currentPageIndex.value > 0) {
    currentPageIndex.value--
    updateReadPercent()
  } else if (prevChapter.value) {
    goToPrevChapter()
  }
}

function nextPage() {
  if (currentPageIndex.value < pages.value.length - 1) {
    currentPageIndex.value++
    updateReadPercent()
  } else if (nextChapter.value) {
    goToNextChapter()
  }
}

function prevPageDouble() {
  if (currentPageIndex.value >= 2) {
    currentPageIndex.value -= 2
  } else {
    currentPageIndex.value = 0
  }
  updateReadPercent()
}

function nextPageDouble() {
  if (currentPageIndex.value + 2 < pages.value.length) {
    currentPageIndex.value += 2
  }
  updateReadPercent()
}

function updateReadPercent() {
  if (pages.value.length === 0) return
  readPercent.value = Math.round(((currentPageIndex.value + 1) / pages.value.length) * 100)
}

const currentChapterIndex = computed(() => {
  return chaptersList.value.findIndex((c: any) => c.file === chapter || c.id === chapter)
})

const prevChapter = computed(() => {
  const idx = currentChapterIndex.value
  if (idx > 0) return chaptersList.value[idx - 1]
  return null
})

const nextChapter = computed(() => {
  const idx = currentChapterIndex.value
  if (idx >= 0 && idx < chaptersList.value.length - 1) return chaptersList.value[idx + 1]
  return null
})

function goToPrevChapter() {
  if (prevChapter.value) {
    router.push(`/manga/${slug}/${prevChapter.value.file}`)
  }
}

function goToNextChapter() {
  if (nextChapter.value) {
    router.push(`/manga/${slug}/${nextChapter.value.file}`)
  }
}

function handleScroll() {
  if (readerMode.value !== 'webtoon') return
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight > 0) {
    readPercent.value = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)))
  }
}

function handleKeyDown(e: KeyboardEvent) {
  const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return

  if (readerMode.value === 'webtoon') {
    if (e.code === 'Space') {
      e.preventDefault()
      toggleAutoScroll()
    } else if (e.key === 'ArrowLeft' && prevChapter.value) goToPrevChapter()
    else if (e.key === 'ArrowRight' && nextChapter.value) goToNextChapter()
    else if (e.key === 'f' || e.key === 'F') immersive.value = !immersive.value
  } else if (readerMode.value === 'flip') {
    if (readingDir.value === 'rtl') {
      if (e.key === 'ArrowLeft' || e.key === 'a') nextPage()
      else if (e.key === 'ArrowRight' || e.key === 'd') prevPage()
    } else {
      if (e.key === 'ArrowLeft' || e.key === 'a') prevPage()
      else if (e.key === 'ArrowRight' || e.key === 'd') nextPage()
    }
  } else if (readerMode.value === 'double') {
    if (readingDir.value === 'rtl') {
      if (e.key === 'ArrowLeft' || e.key === 'a') nextPageDouble()
      else if (e.key === 'ArrowRight' || e.key === 'd') prevPageDouble()
    } else {
      if (e.key === 'ArrowLeft' || e.key === 'a') prevPageDouble()
      else if (e.key === 'ArrowRight' || e.key === 'd') nextPageDouble()
    }
  }
}

async function loadChapter() {
  loading.value = true
  currentPageIndex.value = 0
  stopAutoScroll()
  try {
    await mangaStore.fetchMangaDetail(slug)
    if (mangaStore.currentManga?.chapters) {
      chaptersList.value = mangaStore.currentManga.chapters
    }
    await mangaStore.fetchChapterPages(slug, chapter)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`resume_manga_${slug}`, chapter)
    }
  } catch (err) {
    console.error('Failed to load manga chapter', err)
  } finally {
    loading.value = false
    updateReadPercent()
  }
}

onMounted(() => {
  mangaStore.initPreferences()
  readerMode.value = mangaStore.readerMode
  fitMode.value = mangaStore.fitMode
  readingDir.value = mangaStore.readingDirection
  void loadChapter()

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeyDown)
  }
})

onBeforeUnmount(() => {
  stopAutoScroll()
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeyDown)
  }
})

watch(() => route.params.chapter, (next) => {
  if (typeof next === 'string') void loadChapter()
})
</script>

<style scoped>
.spinner { width: 2.5rem; height: 2.5rem; border: 3px solid #8b5cf6; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
