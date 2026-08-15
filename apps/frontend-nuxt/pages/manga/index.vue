<template>
  <div class="manga-catalog min-h-screen pb-16">
    <div class="max-w-6xl mx-auto px-3 sm:px-6 pt-4">
      
      <!-- Top Header Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
            <span>🎨</span> Koleksi Manga & Komik
          </h1>
          <p class="text-xs text-muted-foreground mt-1">Pembaca komik digital lokal (Webtoon & Manga Mode) dalam jaringan LAN</p>
        </div>

        <div class="relative w-full sm:w-72">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari judul komik..." 
            class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <span class="absolute left-3 top-2.5 text-xs text-muted-foreground">🔍</span>
        </div>
      </div>

      <div v-if="mangaStore.loading" class="flex justify-center py-20"><div class="spinner"></div></div>

      <div v-else-if="filteredManga.length === 0" class="text-center py-20 bg-card/40 border border-border rounded-3xl p-8">
        <div class="text-4xl mb-3">🎨</div>
        <h3 class="text-base font-bold text-foreground mb-1">Belum Ada Komik Tersedia</h3>
        <p class="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Simpan folder komik/manga Anda di folder <code>data/manga/[slug]/[chapter]</code> pada disk server untuk mulai membaca!
        </p>
      </div>

      <!-- Manga Posters Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        <NuxtLink 
          v-for="item in filteredManga" 
          :key="item.slug" 
          :to="`/manga/${item.slug}`" 
          class="group glass-card-hover p-3 rounded-2xl border border-border/70 shadow-lg flex flex-col justify-between"
        >
          <div>
            <div class="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border/80 mb-3 relative shadow-md group-hover:shadow-xl transition-all">
              <img 
                v-if="item.cover" 
                :src="item.cover" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                @error="($event.target as HTMLImageElement).style.display='none'"
              >
              <div v-else class="flex flex-col items-center justify-center w-full h-full text-xs text-muted-foreground p-4 text-center">
                <span class="text-2xl mb-1">🎨</span>
                <span>No Cover</span>
              </div>

              <div class="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-border text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold shadow">
                {{ item.chapterCount }} Chapter
              </div>
            </div>

            <h4 class="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
              {{ item.title }}
            </h4>
            <p v-if="item.author" class="text-[11px] text-muted-foreground truncate">
              👤 {{ item.author }}
            </p>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMangaStore } from '~/stores/manga'

const mangaStore = useMangaStore()
const searchQuery = ref('')

const filteredManga = computed(() => {
  if (!searchQuery.value.trim()) return mangaStore.mangaList
  const q = searchQuery.value.toLowerCase()
  return mangaStore.mangaList.filter(m => m.title.toLowerCase().includes(q) || m.slug.toLowerCase().includes(q))
})

onMounted(() => {
  mangaStore.fetchLibrary()
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
