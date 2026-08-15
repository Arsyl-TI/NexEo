<template>
  <div class="manga-online-browse min-h-screen pb-16">
    <div class="max-w-6xl mx-auto px-3 sm:px-6 pt-4">
      
      <!-- Top Navigation & Header -->
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <NuxtLink to="/manga" class="px-4 py-2 flex items-center gap-2 text-muted-foreground bg-card/60 hover:bg-border/60 rounded-full text-xs font-medium transition border border-border/50 shadow-sm">
          <span>←</span> Kembali ke Koleksi Lokal
        </NuxtLink>

        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/30 text-primary flex items-center gap-1.5 shadow-sm">
            <span>⚡</span> Provider: <b>MangaDex Direct API</b>
          </span>
        </div>
      </div>

      <!-- Main Banner Search Box -->
      <div class="bg-card/70 border border-border/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div class="relative z-10">
          <h1 class="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-center gap-3 mb-2">
            <span>🌐</span> Cari Manga & Manhwa Online
          </h1>
          <p class="text-xs sm:text-sm text-muted-foreground mb-6 max-w-2xl">
            Cari ribuan judul komik & terjemahan Bahasa Indonesia langsung dari server MangaDex, lalu simpan ke disk lokal server untuk dibaca secara offline / LAN.
          </p>

          <form @submit.prevent="executeSearch" class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Ketik judul manga/manhwa (contoh: Solo Leveling, One Piece, Jujutsu Kaisen)..." 
                class="w-full bg-background border border-border rounded-2xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-inner"
              />
              <span class="absolute left-4 top-3.5 text-base text-muted-foreground">🔍</span>
            </div>

            <!-- Language Filter Selector -->
            <select v-model="selectedLang" class="bg-background border border-border rounded-2xl px-4 py-3 text-xs font-semibold text-foreground focus:outline-none focus:border-primary shrink-0">
              <option value="id">🇮🇩 Bahasa Indonesia</option>
              <option value="en">🇬🇧 English</option>
              <option value="all">🌐 Semua Bahasa</option>
            </select>

            <button type="submit" class="btn-primary px-7 py-3.5 text-xs font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 shrink-0" :disabled="loading">
              <span v-if="loading" class="spinner border-2 w-4 h-4"></span>
              <span>{{ loading ? 'Mencari...' : 'Cari Komik' }}</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="spinner mb-4"></div>
        <p class="text-xs text-muted-foreground font-medium">Menghubungi server MangaDex...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="mangaResults.length === 0" class="text-center py-20 bg-card/40 border border-border rounded-3xl p-8">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-base font-bold text-foreground mb-1">Tidak Ada Manga Ditemukan</h3>
        <p class="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          Coba gunakan kata kunci judul lain atau ubah filter bahasa ke "Semua Bahasa".
        </p>
      </div>

      <!-- Manga Results Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        <div 
          v-for="item in mangaResults" 
          :key="item.id"
          @click="openMangaDetail(item)"
          class="group glass-card-hover p-3 rounded-2xl border border-border/70 shadow-lg flex flex-col justify-between cursor-pointer hover:border-primary/50 transition-all duration-300"
        >
          <div>
            <div class="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border/80 mb-3 relative shadow-md group-hover:shadow-xl transition-all">
              <img 
                v-if="item.cover" 
                :src="item.cover" 
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                @error="($event.target as HTMLImageElement).style.display='none'"
              />
              <div v-else class="flex flex-col items-center justify-center w-full h-full text-xs text-muted-foreground p-4 text-center">
                <span class="text-2xl mb-1">🎨</span>
                <span>No Cover</span>
              </div>

              <!-- Status Badge -->
              <div class="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-border text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold shadow uppercase">
                {{ item.status }}
              </div>
            </div>

            <h4 class="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1" :title="item.title">
              {{ item.title }}
            </h4>
            <p v-if="item.author" class="text-[10px] text-muted-foreground truncate">
              👤 {{ item.author }}
            </p>
          </div>

          <div class="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
            <span class="text-primary font-semibold">Lihat Bab →</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Manga Detail & Chapter Download Modal -->
    <div v-if="selectedMangaModal" @click.self="selectedMangaModal = false" class="fixed inset-0 bg-black/80 z-50 overflow-y-auto backdrop-blur-md transition-opacity duration-300 p-3 sm:p-6 flex items-center justify-center animate-fade-in">
      <div class="bg-card border border-border/80 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button @click="selectedMangaModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1.5 rounded-xl bg-background border border-border">✕</button>

        <div v-if="detailLoading" class="flex flex-col items-center justify-center py-20">
          <div class="spinner mb-4"></div>
          <p class="text-xs text-muted-foreground font-medium">Memuat daftar bab...</p>
        </div>

        <div v-else-if="activeMangaDetail" class="space-y-6">
          <!-- Top Info Row -->
          <div class="flex flex-col sm:flex-row gap-6 items-start">
            <div class="w-36 sm:w-44 aspect-[2/3] rounded-2xl overflow-hidden bg-background border border-border shadow-xl shrink-0 mx-auto sm:mx-0">
              <img v-if="activeMangaDetail.cover" :src="activeMangaDetail.cover" class="w-full h-full object-cover" />
            </div>

            <div class="flex-1 min-w-0">
              <h2 class="text-xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight mb-2">{{ activeMangaDetail.title }}</h2>
              <p class="text-xs text-muted-foreground mb-3 font-medium">Author: <span class="text-foreground font-bold">{{ activeMangaDetail.author }}</span></p>

              <!-- Tags -->
              <div v-if="activeMangaDetail.tags?.length" class="flex flex-wrap gap-1.5 mb-4">
                <span v-for="t in activeMangaDetail.tags.slice(0, 8)" :key="t" class="px-2.5 py-0.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold">
                  {{ t }}
                </span>
              </div>

              <!-- Synopsis -->
              <p class="text-xs text-muted-foreground leading-relaxed line-clamp-4 bg-background/60 border border-border/60 p-3.5 rounded-xl">
                {{ activeMangaDetail.description || 'Tidak ada sinopsis tersedia.' }}
              </p>
            </div>
          </div>

          <!-- Chapters List Section -->
          <div class="pt-4 border-t border-border/60">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 class="text-sm font-bold text-foreground flex items-center gap-2">
                <span>📋</span> Daftar Bab Tersedia ({{ activeChapters.length }})
              </h3>

              <div class="flex items-center gap-2">
                <button 
                  v-if="activeChapters.length > 0"
                  @click="downloadAllChapters"
                  :disabled="isBatchDownloading"
                  class="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span v-if="isBatchDownloading" class="spinner border-2 w-3 h-3"></span>
                  <span>{{ isBatchDownloading ? 'Mengunduh Batch...' : '📥 Unduh Semua Bab' }}</span>
                </button>
              </div>
            </div>

            <div v-if="activeChapters.length === 0" class="text-center py-12 bg-background border border-border rounded-2xl text-xs text-muted-foreground">
              Belum ada chapter Bahasa Indonesia untuk judul ini di MangaDex. Coba ubah filter ke bahasa lain.
            </div>

            <!-- Scrollable Chapter Rows -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              <div 
                v-for="ch in activeChapters" 
                :key="ch.id"
                class="flex items-center justify-between p-3 rounded-xl bg-background border border-border/80 hover:border-primary/50 transition-all text-xs"
              >
                <div class="min-w-0 pr-2">
                  <h4 class="font-bold text-foreground truncate">{{ ch.title }}</h4>
                  <p class="text-[10px] text-muted-foreground truncate">{{ ch.scanlationGroup }}</p>
                </div>

                <button 
                  @click="downloadChapter(ch)"
                  :disabled="downloadingChapters[ch.id]"
                  class="px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-primary hover:text-white text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 disabled:opacity-50"
                >
                  <span v-if="downloadingChapters[ch.id]" class="spinner border-2 w-3 h-3"></span>
                  <span>{{ downloadingChapters[ch.id] ? 'Menyimpan...' : '📥 Unduh' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'
import type { OnlineMangaItem, OnlineMangaChapter } from '~/server/utils/manga/online'

const { success, error: showError } = useToast()

const searchQuery = ref('')
const selectedLang = ref<'id' | 'en' | 'all'>('id')
const loading = ref(false)
const mangaResults = ref<OnlineMangaItem[]>([])

const selectedMangaModal = ref(false)
const detailLoading = ref(false)
const activeMangaDetail = ref<OnlineMangaItem | null>(null)
const activeChapters = ref<OnlineMangaChapter[]>([])
const downloadingChapters = ref<Record<string, boolean>>({})
const isBatchDownloading = ref(false)

async function executeSearch() {
  loading.value = true
  try {
    const res = await $fetch<{ success: boolean; data: OnlineMangaItem[] }>('/api/manga/online/search', {
      params: {
        q: searchQuery.value,
        lang: selectedLang.value
      }
    })
    if (res?.data) {
      mangaResults.value = res.data
    }
  } catch (err: any) {
    showError('Gagal mencari komik online. Periksa koneksi internet server.')
  } finally {
    loading.value = false
  }
}

async function openMangaDetail(item: OnlineMangaItem) {
  selectedMangaModal.value = true
  detailLoading.value = true
  activeMangaDetail.value = item
  activeChapters.value = []

  try {
    const res = await $fetch<{ success: boolean; data: { manga: OnlineMangaItem; chapters: OnlineMangaChapter[] } }>('/api/manga/online/detail', {
      params: {
        id: item.id,
        lang: selectedLang.value
      }
    })
    if (res?.data) {
      activeMangaDetail.value = res.data.manga
      activeChapters.value = res.data.chapters
    }
  } catch (err: any) {
    showError('Gagal memuat detail bab manga.')
  } finally {
    detailLoading.value = false
  }
}

async function downloadChapter(ch: OnlineMangaChapter) {
  if (!activeMangaDetail.value) return
  downloadingChapters.value[ch.id] = true

  try {
    const res = await $fetch<{ success: boolean; message: string }>('/api/manga/online/download', {
      method: 'POST',
      body: {
        mangaId: activeMangaDetail.value.id,
        mangaTitle: activeMangaDetail.value.title,
        mangaSlug: activeMangaDetail.value.slug,
        chapterId: ch.id,
        chapterNum: ch.chapter,
        chapterTitle: ch.title,
        coverUrl: activeMangaDetail.value.cover,
        author: activeMangaDetail.value.author,
        description: activeMangaDetail.value.description
      }
    })

    if (res?.success) {
      success(res.message || `Chapter ${ch.chapter} berhasil disimpan ke pustaka lokal!`)
    }
  } catch (err: any) {
    showError(err.data?.statusMessage || `Gagal mengunduh Chapter ${ch.chapter}`)
  } finally {
    downloadingChapters.value[ch.id] = false
  }
}

async function downloadAllChapters() {
  if (!activeChapters.value.length || !activeMangaDetail.value) return
  isBatchDownloading.value = true
  let successCount = 0

  for (const ch of activeChapters.value) {
    downloadingChapters.value[ch.id] = true
    try {
      await $fetch('/api/manga/online/download', {
        method: 'POST',
        body: {
          mangaId: activeMangaDetail.value.id,
          mangaTitle: activeMangaDetail.value.title,
          mangaSlug: activeMangaDetail.value.slug,
          chapterId: ch.id,
          chapterNum: ch.chapter,
          chapterTitle: ch.title,
          coverUrl: activeMangaDetail.value.cover,
          author: activeMangaDetail.value.author,
          description: activeMangaDetail.value.description
        }
      })
      successCount++
    } catch {}
    downloadingChapters.value[ch.id] = false
  }

  isBatchDownloading.value = false
  success(`Selesai! ${successCount} chapter berhasil diunduh ke pustaka lokal.`)
}

onMounted(() => {
  void executeSearch()
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
