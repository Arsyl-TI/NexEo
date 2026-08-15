<template>
  <div class="novel-detail relative min-h-screen bg-background pb-16">
    <!-- Dynamic Hero Background Banner -->
    <div class="absolute inset-0 top-0 left-0 right-0 h-[380px] sm:h-[480px] overflow-hidden pointer-events-none z-0">
      <div 
        v-if="novel?.cover" 
        class="absolute inset-0 opacity-25 blur-3xl scale-110" 
        :style="{ 
          backgroundImage: `url(${getThumbnailUrl(novel.cover)})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10 px-3 sm:px-6 pt-4">
      <!-- Top Back Navigation -->
      <NuxtLink to="/novels" class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/70 hover:bg-border/80 border border-border/60 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all shadow-md backdrop-blur-md">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Kembali ke Koleksi
      </NuxtLink>
      
      <div v-if="loading" class="flex justify-center py-20"><div class="spinner"></div></div>
      <div v-else-if="!novel" class="text-center py-20 bg-card/40 border border-border rounded-2xl text-muted-foreground">Novel tidak ditemukan.</div>
      
      <div v-else>
        <!-- Noveldex-Style Hero Layout -->
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10">
          
          <!-- LEFT SIDEBAR: Poster Cover & Main Action Buttons -->
          <div class="w-full lg:w-72 shrink-0 flex flex-col items-center lg:items-start">
            <!-- Main Cover Card -->
            <div class="w-48 sm:w-60 lg:w-full aspect-[2/3] rounded-2xl overflow-hidden border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-card mb-5 relative group">
              <img v-if="novel.cover" :src="getThumbnailUrl(novel.cover)" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" loading="lazy" @error="($event.target as HTMLImageElement).style.display='none'">
              <div v-else class="flex flex-col items-center justify-center h-full text-muted-foreground text-xs p-4 text-center">
                <span>📖</span>
                <span class="mt-2">No Cover Available</span>
              </div>
            </div>

            <!-- Action Buttons Column -->
            <div class="w-full flex flex-col gap-2.5">
              <!-- Start / Resume Reading Button -->
              <NuxtLink 
                v-if="hasResumeChapter" 
                :to="`/novels/${slug}/${resumeChapter}`" 
                class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>▶</span> Lanjutkan Membaca
              </NuxtLink>
              <NuxtLink 
                v-else-if="chapters.length > 0" 
                :to="`/novels/${slug}/${chapters[0].file}`" 
                class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>📖</span> Mulai Membaca
              </NuxtLink>

              <!-- Permanent Batch Translate All Chapters Button -->
              <button 
                @click="showBatchTransModal = true" 
                class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-950/40 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>🌐</span> Terjemahkan Semua Chapter (Permanen)
              </button>

              <!-- Export Novel TXT Button -->
              <a 
                :href="`/api/novels/${slug}/export`" 
                target="_blank" 
                download 
                class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>📥</span> Unduh Seluruh Chapter (.txt)
              </a>

              <!-- Source Link Button -->
              <a v-if="novel.sourceUrl" :href="novel.sourceUrl" target="_blank" class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-card/60 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-border/60 transition-all flex items-center justify-center gap-2">
                <span>🌐</span> Buka Sumber Asli ↗
              </a>
            </div>

            <!-- Chapters Summary Box -->
            <div class="w-full mt-4 p-4 rounded-2xl bg-card/50 border border-border/60 flex items-center justify-between text-xs">
              <span class="text-muted-foreground font-medium">Total Bab</span>
              <span class="text-amber-400 font-bold font-mono text-base">{{ chapters.length }}</span>
            </div>
          </div>

          <!-- RIGHT MAIN COLUMN: Title, Genres, Tags & Content Tabs -->
          <div class="flex-1 min-w-0">
            <!-- Title Header -->
            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-3">{{ novel.title }}</h1>
            
            <!-- Author & Translator Badges -->
            <div class="flex flex-wrap items-center gap-2.5 mb-5 text-xs">
              <div v-if="novel.author" class="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3.5 py-1.5 rounded-full font-medium">
                <span>👤</span> Author: <span class="font-bold text-white">{{ novel.author }}</span>
              </div>
              <div class="inline-flex items-center gap-2 bg-card/80 border border-border text-muted-foreground px-3.5 py-1.5 rounded-full font-medium">
                <span>🌐</span> Bahasa: <span class="text-foreground font-semibold">Indonesia / English</span>
              </div>
            </div>

            <!-- Genre Pills (Noveldex Style Colorful Badges) -->
            <div v-if="novelGenres.length" class="flex flex-wrap gap-2 mb-4">
              <span v-for="g in novelGenres" :key="g.name" :class="['px-3 py-1 rounded-lg text-xs font-bold shadow-md border', g.style]">
                {{ g.name }}
              </span>
            </div>

            <!-- Hashtag Chips -->
            <div v-if="novel.tags?.length" class="flex flex-wrap gap-1.5 mb-6">
              <span v-for="tag in novel.tags" :key="tag" class="px-2.5 py-0.5 rounded-full bg-card/40 border border-border/50 text-[11px] text-muted-foreground">
                #{{ tag }}
              </span>
            </div>

            <!-- Tabs Selection (Chapters vs Synopsis) -->
            <div class="flex border-b border-border/80 mb-6 gap-6">
              <button 
                @click="activeTab = 'chapters'" 
                :class="['pb-3 text-sm font-bold transition-all relative', activeTab === 'chapters' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground']"
              >
                📋 Daftar Bab ({{ chapters.length }})
              </button>
              <button 
                @click="activeTab = 'synopsis'" 
                :class="['pb-3 text-sm font-bold transition-all relative', activeTab === 'synopsis' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground']"
              >
                📄 Sinopsis Novel
              </button>
            </div>

            <!-- TAB 1: CHAPTERS LIST -->
            <div v-if="activeTab === 'chapters'" class="space-y-4">
              <!-- Search & Filter Controls -->
              <div class="flex flex-col sm:flex-row gap-3 justify-between items-center bg-card/40 border border-border/60 p-3 rounded-2xl">
                <div class="relative w-full sm:w-72">
                  <input 
                    v-model="chapterSearch" 
                    type="text" 
                    placeholder="Cari judul bab..." 
                    class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <span class="absolute left-3 top-2.5 text-xs text-muted-foreground">🔍</span>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <button 
                    @click="chapterSort = chapterSort === 'asc' ? 'desc' : 'asc'" 
                    class="px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                  >
                    <span>{{ chapterSort === 'asc' ? '⬇ Urut Awal' : '⬆ Urut Akhir' }}</span>
                  </button>
                </div>
              </div>

              <!-- Chapters Grid / Rows with Mini Novel Cover Thumbnails -->
              <div v-if="filteredChapters.length === 0" class="py-12 text-center text-muted-foreground text-xs">
                Tidak ada bab yang cocok dengan kata kunci pencarian.
              </div>

              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <NuxtLink 
                  v-for="c in filteredChapters" 
                  :key="c.id" 
                  :to="`/novels/${slug}/${c.file}`"
                  class="group flex items-center justify-between p-3.5 rounded-xl bg-card/60 hover:bg-card border border-border/60 hover:border-primary/50 transition-all shadow-sm"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-8 h-10 rounded-md overflow-hidden bg-card border border-border shrink-0">
                      <img v-if="novel.cover" :src="getThumbnailUrl(novel.cover)" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                      <div v-else class="w-full h-full flex items-center justify-center text-[10px]">📖</div>
                    </div>
                    <span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {{ c.title }}
                    </span>
                  </div>
                  <span class="text-[10px] text-muted-foreground font-mono shrink-0 ml-2 group-hover:text-primary">Baca →</span>
                </NuxtLink>
              </div>
            </div>

            <!-- TAB 2: SYNOPSIS -->
            <div v-else-if="activeTab === 'synopsis'" class="bg-card/70 border border-border/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
              <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span>📄</span> Sinopsis Novel
              </h2>
              <div class="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm" v-html="novel.description || 'Tidak ada sinopsis resmi untuk novel ini.'"></div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Permanent Batch Translation Modal -->
    <div v-if="showBatchTransModal" @click.self="showBatchTransModal = false" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button @click="showBatchTransModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl">✕</button>

        <h2 class="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
          <span>🌐</span> Terjemahkan Semua Chapter
        </h2>
        <p class="text-xs text-muted-foreground mb-4">Terjemahan ini akan disimpan secara <strong>PERMANEN</strong> di disk server sehingga Anda dapat membacanya langsung kapan saja!</p>

        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Mesin Penerjemah AI</label>
            <select v-model="transEngine" class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
              <option value="google">🌐 Google Translate (Gratis/Bawaan)</option>
              <option value="gemini">⚡ Gemini 1.5 Flash API (AI Disarankan)</option>
              <option value="deepl">🎯 DeepL API (Kualitas Sastra)</option>
              <option value="libre">🐳 LibreTranslate (Self-Hosted Docker)</option>
            </select>
          </div>

          <div v-if="transEngine === 'gemini'">
            <label class="block text-xs font-semibold text-muted-foreground mb-1">Gemini API Key</label>
            <input v-model="transConfig.geminiApiKey" type="password" placeholder="Masukkan Gemini API Key..." class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
          </div>

          <div v-if="transEngine === 'deepl'">
            <label class="block text-xs font-semibold text-muted-foreground mb-1">DeepL API Key</label>
            <input v-model="transConfig.deeplApiKey" type="password" placeholder="Contoh: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
          </div>

          <div v-if="transEngine === 'libre'" class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-muted-foreground mb-1">LibreTranslate Docker URL</label>
              <input v-model="transConfig.libreUrl" type="text" placeholder="http://localhost:5000" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div class="bg-purple-950/30 border border-purple-500/30 rounded-xl p-3.5 text-xs text-purple-300 leading-relaxed">
            💡 Teks terjemahan akan ditulis langsung ke file disk <code>.txt</code> seluruh chapter novel.
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="showBatchTransModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground">
            Batal
          </button>
          <button 
            @click="executeBatchTranslation" 
            :disabled="isBatchTranslating" 
            class="flex-1 btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <span v-if="isBatchTranslating" class="spinner border-2 w-3.5 h-3.5"></span>
            <span>{{ isBatchTranslating ? 'Menerjemahkan...' : 'Mulai Terjemahkan Permanen' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '~/composables/useToast'

interface Chapter {
  id: string | number
  title: string
  file: string
}

interface NovelLocal {
  id: string
  slug: string
  title: string
  author?: string
  cover?: string
  description?: string
  tags?: string[]
  sourceUrl?: string
  chapters?: Chapter[]
}

const route = useRoute()
const slug = route.params.slug as string
const { success, error } = useToast()

const novel = ref<NovelLocal | null>(null)
const chapters = ref<Chapter[]>([])
const loading = ref(true)
const resumeChapter = ref<string | null>(null)
const activeTab = ref<'chapters' | 'synopsis'>('chapters')
const chapterSearch = ref('')
const chapterSort = ref<'asc' | 'desc'>('asc')

// Permanent Batch Translation Modal State
const showBatchTransModal = ref(false)
const isBatchTranslating = ref(false)
const transEngine = ref<'google' | 'gemini' | 'deepl' | 'libre'>('google')
const transConfig = ref({
  geminiApiKey: '',
  deeplApiKey: '',
  libreUrl: 'http://localhost:5000',
  libreApiKey: ''
})

const hasResumeChapter = computed(() => {
  const savedChapter = typeof resumeChapter.value === 'string' ? resumeChapter.value.trim() : ''
  return Boolean(savedChapter) && chapters.value.some(chapter => chapter.file === savedChapter)
})

const filteredChapters = computed(() => {
  let list = [...chapters.value]
  if (chapterSearch.value.trim()) {
    const q = chapterSearch.value.toLowerCase()
    list = list.filter(c => c.title?.toLowerCase().includes(q))
  }
  if (chapterSort.value === 'desc') {
    list.reverse()
  }
  return list
})

// Generate Noveldex-like colorful genre badges
const novelGenres = computed(() => {
  const allTags = novel.value?.tags || []
  const knownGenres = ['Action', 'Adult', 'Adventure', 'Ecchi', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Comedy', 'Drama', 'Sci-Fi', 'Slice of Life', 'Supernatural']
  
  const styles = [
    'bg-rose-500/20 text-rose-300 border-rose-500/40',
    'bg-amber-500/20 text-amber-300 border-amber-500/40',
    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    'bg-sky-500/20 text-sky-300 border-sky-500/40',
    'bg-purple-500/20 text-purple-300 border-purple-500/40',
    'bg-pink-500/20 text-pink-300 border-pink-500/40',
    'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
  ]

  return allTags
    .filter(t => knownGenres.some(kg => kg.toLowerCase() === t.toLowerCase()))
    .map((g, idx) => ({ name: g, style: styles[idx % styles.length] }))
})

const getThumbnailUrl = (pathStr: string) => {
  if (pathStr.startsWith('http')) return pathStr
  return `/api/thumbnails/${encodeURIComponent(pathStr)}`
}

async function loadNovelDetail() {
  loading.value = true
  try {
    const api = useApi()
    const metaRes = await api.get<{ success?: boolean; data?: NovelLocal }>(`/novels/${slug}`)
    if (metaRes?.data) {
      novel.value = metaRes.data
    }

    const chapRes = await api.get<{ success?: boolean; data?: Chapter[] }>(`/novel/${slug}/chapters`)
    if (chapRes?.data) {
      chapters.value = chapRes.data
    }

    if (typeof window !== 'undefined') {
      resumeChapter.value = localStorage.getItem(`resume_novel_${slug}`)
    }
  } catch (err) {
    console.error('Failed to load novel details:', err)
  } finally {
    loading.value = false
  }
}

async function executeBatchTranslation() {
  isBatchTranslating.value = true
  try {
    const res = await $fetch<{ success?: boolean; message?: string }>('/api/novels/translate-all', {
      method: 'POST',
      body: {
        slug,
        engine: transEngine.value,
        geminiApiKey: transConfig.value.geminiApiKey,
        deeplApiKey: transConfig.value.deeplApiKey,
        libreUrl: transConfig.value.libreUrl,
        libreApiKey: transConfig.value.libreApiKey
      }
    })

    if (res?.success) {
      success(res.message || 'Seluruh chapter novel berhasil diterjemahkan secara permanen!')
      showBatchTransModal.value = false
      await loadNovelDetail()
    }
  } catch (err: any) {
    error(err?.statusMessage || 'Gagal menerjemahkan semua chapter novel.')
  } finally {
    isBatchTranslating.value = false
  }
}

onMounted(() => {
  loadNovelDetail()
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
