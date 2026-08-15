<template>
  <div class="library-page min-h-screen pb-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
            <span>📚</span> Pustaka & Riwayat Baca Saya
          </h1>
          <p class="text-xs text-muted-foreground mt-1">Kelola novel favorit dan lacak progres bab novel yang sedang dibaca</p>
        </div>

        <NuxtLink to="/novels" class="btn-primary px-4 py-2 text-xs font-bold shadow-lg flex items-center gap-2 w-max">
          <span>📖</span> Jelajahi Koleksi Novel
        </NuxtLink>
      </div>

      <!-- Navigation Tabs & Search Bar -->
      <div class="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 border-b border-border/80 pb-4">
        <div class="flex gap-4 w-full sm:w-auto">
          <button 
            @click="activeTab = 'history'" 
            :class="['pb-2 text-sm font-bold transition-all relative flex items-center gap-2', activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground']"
          >
            <span>⏱️</span> Riwayat Terakhir ({{ historyItems.length }})
          </button>
          <button 
            @click="activeTab = 'bookmarks'" 
            :class="['pb-2 text-sm font-bold transition-all relative flex items-center gap-2', activeTab === 'bookmarks' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground']"
          >
            <span>📌</span> Koleksi Favorit ({{ bookmarkItems.length }})
          </button>
        </div>

        <div class="relative w-full sm:w-64">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari dalam pustaka..." 
            class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          <span class="absolute left-3 top-2.5 text-xs text-muted-foreground">🔍</span>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-20"><div class="spinner"></div></div>

      <!-- TAB 1: RIWAYAT BACA TERAKHIR -->
      <div v-else-if="activeTab === 'history'">
        <div v-if="filteredHistory.length === 0" class="text-center py-20 bg-card/40 border border-border/60 rounded-3xl p-8">
          <div class="text-4xl mb-3">📖</div>
          <h3 class="text-base font-bold text-foreground mb-1">Belum Ada Riwayat Baca</h3>
          <p class="text-xs text-muted-foreground mb-6">Setiap bab novel yang Anda baca akan otomatis tercatat di sini!</p>
          <NuxtLink to="/novels" class="btn-primary px-5 py-2.5 text-xs font-bold inline-flex items-center gap-2">
            Mulai Membaca Novel
          </NuxtLink>
        </div>

        <div v-else class="space-y-4">
          <div class="flex justify-end mb-2">
            <button @click="clearHistory" class="text-xs text-muted-foreground hover:text-rose-400 transition-colors">
              Hapus Semua Riwayat
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="item in filteredHistory" 
              :key="item.slug" 
              class="glass-card-hover p-4 rounded-2xl border border-border/70 shadow-lg flex items-center justify-between gap-4"
            >
              <div class="flex items-center gap-4 min-w-0">
                <div class="w-14 h-20 rounded-xl overflow-hidden bg-card border border-border shrink-0 shadow-md">
                  <img v-if="item.cover" :src="getThumbnailUrl(item.cover)" class="w-full h-full object-cover" @error="($event.target as HTMLImageElement).style.display='none'">
                  <div v-else class="w-full h-full flex items-center justify-center text-xs">📖</div>
                </div>

                <div class="min-w-0">
                  <h4 class="font-bold text-sm text-foreground truncate mb-1">{{ item.title }}</h4>
                  <p class="text-xs text-amber-400 font-mono font-semibold mb-1">
                    📍 Terakhir: {{ item.lastChapterTitle || item.lastChapter }}
                  </p>
                  <NuxtLink :to="item.type === 'manga' ? `/manga/${item.slug}` : `/novels/${item.slug}`" class="text-[11px] text-muted-foreground hover:text-primary transition-colors">
                    {{ item.type === 'manga' ? 'Halaman Manga →' : 'Halaman Novel →' }}
                  </NuxtLink>
                </div>
              </div>

              <NuxtLink 
                :to="item.link" 
                class="btn-primary px-4 py-2.5 text-xs font-bold shrink-0 shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <span>▶</span> Lanjutkan
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: KOLEKSI FAVORIT -->
      <div v-else-if="activeTab === 'bookmarks'">
        <div v-if="filteredBookmarks.length === 0" class="text-center py-20 bg-card/40 border border-border/60 rounded-3xl p-8">
          <div class="text-4xl mb-3">📌</div>
          <h3 class="text-base font-bold text-foreground mb-1">Koleksi Favorit Kosong</h3>
          <p class="text-xs text-muted-foreground mb-6">Tandai novel favorit Anda saat membuka detail novel untuk menyimpannya di sini.</p>
          <NuxtLink to="/novels" class="btn-primary px-5 py-2.5 text-xs font-bold inline-flex items-center gap-2">
            Cari Novel Favorit
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          <NuxtLink 
            v-for="novel in filteredBookmarks" 
            :key="novel.slug" 
            :to="`/novels/${novel.slug}`" 
            class="group glass-card-hover p-3 rounded-2xl border border-border/70 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div class="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border/80 mb-3 relative shadow-md">
                <img v-if="novel.cover" :src="getThumbnailUrl(novel.cover)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" @error="($event.target as HTMLImageElement).style.display='none'">
                <div v-else class="flex items-center justify-center w-full h-full text-xs text-muted-foreground">No Cover</div>
              </div>
              <h4 class="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">{{ novel.title }}</h4>
              <p v-if="novel.author" class="text-[11px] text-muted-foreground truncate">👤 {{ novel.author }}</p>
            </div>

            <button 
              @click.prevent="removeBookmark(novel.slug)" 
              class="mt-3 w-full py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-[11px] font-semibold transition-all"
            >
              Hapus Favorit
            </button>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'

interface HistoryItem {
  type: 'novel' | 'manga'
  slug: string
  title: string
  cover?: string
  lastChapter: string
  lastChapterTitle?: string
  link: string
}

interface BookmarkItem {
  slug: string
  title: string
  cover?: string
  author?: string
}

const activeTab = ref<'history' | 'bookmarks'>('history')
const searchQuery = ref('')
const loading = ref(true)
const historyItems = ref<HistoryItem[]>([])
const bookmarkItems = ref<BookmarkItem[]>([])
const { success } = useToast()

const getThumbnailUrl = (pathStr: string) => {
  if (!pathStr) return ''
  if (pathStr.startsWith('http')) return pathStr
  return `/api/thumbnails/${encodeURIComponent(pathStr)}`
}

const filteredHistory = computed(() => {
  if (!searchQuery.value.trim()) return historyItems.value
  const q = searchQuery.value.toLowerCase()
  return historyItems.value.filter(item => item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q))
})

const filteredBookmarks = computed(() => {
  if (!searchQuery.value.trim()) return bookmarkItems.value
  const q = searchQuery.value.toLowerCase()
  return bookmarkItems.value.filter(item => item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q))
})

async function loadLibraryData() {
  loading.value = true
  if (typeof window === 'undefined') {
    loading.value = false
    return
  }

  try {
    const api = useApi()
    
    // Load Bookmarks
    const rawBookmarks = localStorage.getItem('novel_bookmarks')
    const savedBookmarks: string[] = rawBookmarks ? JSON.parse(rawBookmarks) : []

    // Load History keys (resume_novel_[slug] & resume_manga_[slug])
    const historyList: HistoryItem[] = []
    const bookmarkList: BookmarkItem[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('resume_novel_')) {
        const slug = key.replace('resume_novel_', '')
        const lastChapter = localStorage.getItem(key) || ''
        if (slug && lastChapter) {
          historyList.push({
            type: 'novel',
            slug,
            title: slug.replace(/-/g, ' ').toUpperCase(),
            lastChapter,
            link: `/novels/${slug}/${encodeURIComponent(lastChapter)}`
          })
        }
      } else if (key && key.startsWith('resume_manga_')) {
        const slug = key.replace('resume_manga_', '')
        const lastChapter = localStorage.getItem(key) || ''
        if (slug && lastChapter) {
          historyList.push({
            type: 'manga',
            slug,
            title: slug.replace(/-/g, ' ').toUpperCase(),
            lastChapter,
            link: `/manga/${slug}/${encodeURIComponent(lastChapter)}`
          })
        }
      }
    }

    // Enrich history & bookmarks metadata from API
    for (const item of historyList) {
      try {
        if (item.type === 'novel') {
          const res = await api.get<{ success?: boolean; data?: any }>(`/novels/${item.slug}`)
          if (res?.data) {
            item.title = res.data.title || item.title
            item.cover = res.data.cover
          }
        } else {
          const res = await api.get<{ success?: boolean; data?: any }>(`/manga/${item.slug}`)
          if (res?.data) {
            item.title = res.data.title || item.title
            item.cover = res.data.cover
          }
        }
      } catch {}
    }

    for (const bSlug of savedBookmarks) {
      try {
        const res = await api.get<{ success?: boolean; data?: any }>(`/novels/${bSlug}`)
        if (res?.data) {
          bookmarkList.push({
            slug: bSlug,
            title: res.data.title || bSlug,
            cover: res.data.cover,
            author: res.data.author
          })
        } else {
          bookmarkList.push({ slug: bSlug, title: bSlug })
        }
      } catch {
        bookmarkList.push({ slug: bSlug, title: bSlug })
      }
    }

    historyItems.value = historyList
    bookmarkItems.value = bookmarkList
  } catch (err) {
    console.error('Failed to load library data:', err)
  } finally {
    loading.value = false
  }
}

function clearHistory() {
  if (typeof window === 'undefined') return
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i)
    if (key && key.startsWith('resume_novel_')) {
      localStorage.removeItem(key)
    }
  }
  historyItems.value = []
  success('Riwayat baca berhasil dibersihkan!')
}

function removeBookmark(slug: string) {
  if (typeof window === 'undefined') return
  const rawBookmarks = localStorage.getItem('novel_bookmarks')
  let list: string[] = rawBookmarks ? JSON.parse(rawBookmarks) : []
  list = list.filter(s => s !== slug)
  localStorage.setItem('novel_bookmarks', JSON.stringify(list))
  bookmarkItems.value = bookmarkItems.value.filter(b => b.slug !== slug)
  success('Novel dihapus dari koleksi favorit.')
}

onMounted(() => {
  loadLibraryData()
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
