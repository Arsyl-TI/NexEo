<template>
  <div class="manga-detail relative min-h-screen bg-background pb-16">
    <!-- Dynamic Hero Background Banner -->
    <div class="absolute inset-0 top-0 left-0 right-0 h-[380px] sm:h-[480px] overflow-hidden pointer-events-none z-0">
      <div 
        v-if="manga?.cover" 
        class="absolute inset-0 opacity-25 blur-3xl scale-110" 
        :style="{ 
          backgroundImage: `url(${manga.cover})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10 px-3 sm:px-6 pt-4">
      <!-- Top Back Navigation -->
      <NuxtLink to="/manga" class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/70 hover:bg-border/80 border border-border/60 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all shadow-md backdrop-blur-md">
        ← Kembali ke Koleksi Manga
      </NuxtLink>

      <div v-if="mangaStore.loading" class="flex justify-center py-20"><div class="spinner"></div></div>
      <div v-else-if="!manga" class="text-center py-20 bg-card/40 border border-border rounded-2xl text-muted-foreground">Komik tidak ditemukan.</div>

      <div v-else>
        <!-- Hero Layout -->
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10">
          
          <!-- LEFT SIDEBAR: Poster Cover & Start Reading Button -->
          <div class="w-full lg:w-72 shrink-0 flex flex-col items-center lg:items-start">
            <div class="w-48 sm:w-60 lg:w-full aspect-[2/3] rounded-2xl overflow-hidden border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-card mb-5 relative group">
              <img v-if="manga.cover" :src="manga.cover" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" @error="($event.target as HTMLImageElement).style.display='none'">
              <div v-else class="flex flex-col items-center justify-center h-full text-muted-foreground text-xs p-4 text-center">
                <span>🎨</span>
                <span class="mt-2">No Cover</span>
              </div>
            </div>

            <div class="w-full flex flex-col gap-2.5">
              <NuxtLink 
                v-if="hasResumeChapter" 
                :to="`/manga/${slug}/${resumeChapter}`" 
                class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>▶</span> Lanjutkan Membaca
              </NuxtLink>
              <NuxtLink 
                v-else-if="chapters.length > 0" 
                :to="`/manga/${slug}/${chapters[0].file}`" 
                class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>🎨</span> Mulai Membaca Chapter 1
              </NuxtLink>
            </div>

            <div class="w-full mt-4 p-4 rounded-2xl bg-card/50 border border-border/60 flex items-center justify-between text-xs">
              <span class="text-muted-foreground font-medium">Total Chapter</span>
              <span class="text-amber-400 font-bold font-mono text-base">{{ chapters.length }}</span>
            </div>
          </div>

          <!-- RIGHT MAIN COLUMN: Title, Chapters List -->
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-3">{{ manga.title }}</h1>
            
            <div class="flex flex-wrap items-center gap-2.5 mb-5 text-xs">
              <div v-if="manga.author" class="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3.5 py-1.5 rounded-full font-medium">
                <span>👤</span> Author: <span class="font-bold text-white">{{ manga.author }}</span>
              </div>
            </div>

            <p v-if="manga.description" class="text-sm text-muted-foreground leading-relaxed mb-6 bg-card/40 border border-border/60 p-4 rounded-2xl">
              {{ manga.description }}
            </p>

            <!-- Search & Sort Chapter Controls -->
            <div class="flex flex-col sm:flex-row gap-3 justify-between items-center bg-card/40 border border-border/60 p-3 rounded-2xl mb-4">
              <div class="relative w-full sm:w-72">
                <input 
                  v-model="chapterSearch" 
                  type="text" 
                  placeholder="Cari chapter komik..." 
                  class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                <span class="absolute left-3 top-2.5 text-xs text-muted-foreground">🔍</span>
              </div>

              <button 
                @click="chapterSort = chapterSort === 'asc' ? 'desc' : 'asc'" 
                class="px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5"
              >
                <span>{{ chapterSort === 'asc' ? '⬇ Urut Awal' : '⬆ Urut Akhir' }}</span>
              </button>
            </div>

            <!-- Chapter Grid -->
            <div v-if="filteredChapters.length === 0" class="py-12 text-center text-muted-foreground text-xs">
              Tidak ada chapter yang ditemukan.
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                v-for="c in filteredChapters" 
                :key="c.id" 
                class="group flex items-center justify-between p-3 rounded-xl bg-card/60 hover:bg-card border border-border/60 hover:border-primary/50 transition-all shadow-sm"
              >
                <NuxtLink 
                  :to="`/manga/${slug}/${encodeURIComponent(c.file)}`" 
                  class="flex items-center gap-2.5 min-w-0 flex-1 mr-2"
                >
                  <span class="text-base">🎨</span>
                  <span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {{ c.title }}
                  </span>
                </NuxtLink>

                <div class="flex items-center gap-2 shrink-0">
                  <span class="text-[10px] text-muted-foreground font-mono">
                    {{ c.pageCount ? `${c.pageCount} Hal` : '' }}
                  </span>
                  <a 
                    :href="`/api/manga/${slug}/chapter/${encodeURIComponent(c.file)}/export?format=cbz`" 
                    download 
                    class="px-2 py-1 bg-card/80 hover:bg-primary hover:text-white text-muted-foreground border border-border rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1 shadow-sm"
                    title="Unduh Chapter Komik (.cbz)"
                  >
                    <span>📥</span> CBZ
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMangaStore } from '~/stores/manga'

const route = useRoute()
const slug = route.params.slug as string
const mangaStore = useMangaStore()

const chapterSearch = ref('')
const chapterSort = ref<'asc' | 'desc'>('asc')
const resumeChapter = ref<string | null>(null)

const manga = computed(() => mangaStore.currentManga)
const chapters = computed(() => mangaStore.currentManga?.chapters || [])

const hasResumeChapter = computed(() => {
  const saved = typeof resumeChapter.value === 'string' ? resumeChapter.value.trim() : ''
  return Boolean(saved) && chapters.value.some(c => c.file === saved)
})

const filteredChapters = computed(() => {
  let list = [...chapters.value]
  if (chapterSearch.value.trim()) {
    const q = chapterSearch.value.toLowerCase()
    list = list.filter(c => c.title.toLowerCase().includes(q))
  }
  if (chapterSort.value === 'desc') {
    list.reverse()
  }
  return list
})

onMounted(() => {
  mangaStore.fetchMangaDetail(slug)
  if (typeof window !== 'undefined') {
    resumeChapter.value = localStorage.getItem(`resume_manga_${slug}`)
  }
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
