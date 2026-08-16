<template>
  <div class="novel-browser">
    <!-- Novel Detail Modal -->
    <div v-if="selectedNovelDetail || isLoadingDetail" @click.self="closeModal" class="fixed inset-0 bg-black/80 z-50 overflow-y-auto backdrop-blur-sm transition-opacity duration-300">
      <div class="min-h-screen flex items-start justify-center p-4 py-8">
        <div class="bg-background backdrop-blur-xl rounded-2xl max-w-4xl w-full relative border border-border/50 my-auto">
          <!-- Blurred Header Background -->
          <div v-if="selectedNovelDetail?.cover" class="absolute left-0 right-0 top-0 h-96 overflow-hidden rounded-t-2xl pointer-events-none">
            <div class="absolute inset-0 blur-3xl opacity-40" :style="{ backgroundImage: `url(${selectedNovelDetail.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' }"></div>
          </div>

          <!-- Close Button -->
          <button @click="closeModal" class="absolute top-4 right-4 z-30 p-2 rounded-full bg-card/60 hover:bg-border/80 text-muted-foreground hover:text-foreground transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <!-- Loading State -->
          <div v-if="isLoadingDetail" class="p-20 flex flex-col items-center justify-center">
            <div class="spinner mb-4"></div>
            <p class="text-muted-foreground text-sm">Memuat detail novel...</p>
          </div>

          <!-- Content -->
          <div v-else-if="selectedNovelDetail" class="p-8 relative z-10">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row gap-8 mb-8 pb-8">
              <!-- Cover Image -->
              <div class="w-48 flex-shrink-0 mx-auto md:mx-0">
                <div class="aspect-[2/3] rounded-xl overflow-hidden border border-border shadow-2xl bg-card">
                  <img v-if="selectedNovelDetail.cover" :src="selectedNovelDetail.cover" class="object-cover w-full h-full" loading="lazy" @error="($event.target as HTMLImageElement).style.display='none'">
                  <div v-else class="flex items-center justify-center h-full text-muted-foreground">No Cover</div>
                </div>
              </div>

              <!-- Novel Info -->
              <div class="flex-1 text-center md:text-left">
                <h1 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-3">{{ selectedNovelDetail.title }}</h1>
                <p v-if="selectedNovelDetail.author" class="text-muted-foreground mb-4">by <span class="text-primary font-semibold">{{ selectedNovelDetail.author }}</span></p>
                
                <div v-if="selectedNovelDetail.tags?.length" class="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <span v-for="tag in selectedNovelDetail.tags" :key="tag" class="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs">{{ tag }}</span>
                </div>

                <div class="h-px bg-border my-6"></div>

                <p class="text-card-foreground text-sm leading-relaxed line-clamp-3">{{ selectedNovelDetail.description || 'Tidak ada sinopsis tersedia.' }}</p>

                <!-- Action Buttons -->
                <div class="mt-6 flex flex-col md:flex-row gap-3">
                  <button 
                    @click="addToLibrary(selectedNovelDetail)" 
                    :disabled="isAddingLibrary"
                    class="flex-1 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span v-if="isAddingLibrary" class="spinner border-2 w-3.5 h-3.5 border-r-transparent rounded-full animate-spin"></span>
                    <span>{{ isAddingLibrary ? 'Mengimpor Novel...' : 'Tambah ke Perpustakaan' }}</span>
                  </button>
                  <a v-if="selectedNovelDetail.sourceUrl" :href="selectedNovelDetail.sourceUrl" target="_blank" class="flex-1 px-4 py-2 bg-card text-card-foreground rounded-lg hover:bg-border transition-colors text-sm font-medium flex items-center justify-center">
                    Buka Sumber â†—
                  </a>
                </div>
              </div>
            </div>

            <!-- Tabs & Content -->
            <nav class="mb-6 border-b border-border">
              <button v-for="tab in ['synopsis', 'info', 'chapters']" :key="tab" @click="detailTab = tab" :class="['px-4 py-3 text-sm border-b-2 capitalize', detailTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground']">
                {{ tab }}
              </button>
            </nav>

            <section v-if="detailTab === 'synopsis'" class="bg-card/40 rounded-xl p-6">
              <h2 class="text-lg font-bold text-foreground mb-3">Sinopsis</h2>
              <div class="text-card-foreground text-sm leading-relaxed">{{ selectedNovelDetail.description || 'Tidak ada sinopsis tersedia.' }}</div>
            </section>

            <section v-else-if="detailTab === 'info'" class="bg-card/40 rounded-xl p-6">
              <h2 class="text-lg font-bold text-foreground mb-3">Informasi</h2>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div v-if="selectedNovelDetail.author" class="text-muted-foreground">Author: <span class="text-foreground">{{ selectedNovelDetail.author }}</span></div>
                <div v-if="selectedNovelDetail.status" class="text-muted-foreground">Status: <span class="text-foreground">{{ selectedNovelDetail.status }}</span></div>
                <div v-if="selectedNovelDetail.language" class="text-muted-foreground">Language: <span class="text-foreground">{{ selectedNovelDetail.language }}</span></div>
                <div v-if="selectedNovelDetail.type" class="text-muted-foreground">Type: <span class="text-foreground">{{ selectedNovelDetail.type }}</span></div>
              </div>
            </section>

            <section v-else-if="detailTab === 'chapters'" class="bg-card/40 rounded-xl p-6 max-h-[50vh] overflow-y-auto">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-foreground">Daftar Bab</h2>
                <div class="text-xs text-muted-foreground">{{ selectedNovelDetail.chapters?.length || 0 }} bab tersedia</div>
              </div>

              <div v-if="!selectedNovelDetail.chapters || selectedNovelDetail.chapters.length === 0" class="text-center py-8 text-muted-foreground text-sm">
                Tidak ada daftar bab tersedia
              </div>

              <div v-else class="space-y-2">
                <div class="flex gap-2 mb-4">
                  <button @click="downloadAllChapters" class="flex-1 px-3 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary rounded-lg text-xs font-medium transition-colors">
                    Unduh Semua Bab
                  </button>
                  <select v-model="chapterFilter" class="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-xs text-card-foreground focus:border-primary outline-none">
                    <option value="all">Semua Bab</option>
                    <option v-for="ch in selectedNovelDetail.chapters" :key="ch.file" :value="ch.file">
                      {{ ch.title }}
                    </option>
                  </select>
                  <button @click="downloadSelectedChapter" class="px-3 py-2 bg-primary hover:bg-primary/90 text-foreground rounded-lg text-xs font-medium transition-colors">
                    Unduh Pilihan
                  </button>
                </div>

                <div class="space-y-2">
                  <div v-for="ch in selectedNovelDetail.chapters" :key="ch.file" class="p-3 flex items-center justify-between bg-card/60 border border-border/60 hover:border-amber-500/50 rounded-xl transition-all group">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-8 h-11 rounded-lg overflow-hidden shrink-0 border border-border/50 bg-background/60">
                        <img v-if="selectedNovelDetail.cover" :src="selectedNovelDetail.cover" class="object-cover w-full h-full" loading="lazy">
                        <div v-else class="flex items-center justify-center h-full text-[9px] text-muted-foreground">📖</div>
                      </div>
                      <span class="text-xs font-semibold text-foreground group-hover:text-amber-400 transition-colors truncate">{{ ch.title }}</span>
                    </div>
                    <span class="text-[10px] font-mono text-muted-foreground px-2 py-0.5 bg-background border border-border rounded-md shrink-0">{{ ch.file }}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Source Selector & Filter -->
    <div class="bg-card/50 border border-border/50 rounded-2xl p-4 mb-6">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="flex-1">
          <label class="block text-sm font-medium text-card-foreground mb-2">Sumber Novel</label>
          <select v-model="selectedSource" @change="onSourceChange" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-card-foreground focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all appearance-none">
            <option value="">-- Pilih Sumber --</option>
            <option v-for="source in sources" :key="source.id" :value="source.id">{{ source.name }}</option>
          </select>
        </div>
        <div class="flex-1" v-if="selectedSource">
          <label class="block text-sm font-medium text-card-foreground mb-2">Filter Novel</label>
          <input v-model="searchQuery" type="text" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all" placeholder="Ketik untuk filter..." />
        </div>
      </div>
    </div>
    <!-- Search Results -->
    <div v-if="selectedSource && novelList.length > 0">
      <h2 class="text-xl font-bold text-foreground mb-4">
        Daftar Novel: <span class="text-primary">{{ filteredNovels.length }}</span> novel ditemukan
      </h2>

      <div v-if="filteredNovels.length === 0" class="text-center py-10 bg-card/30 rounded-xl border border-border/50 text-muted-foreground">
        Tidak ada hasil filter. Coba kata kunci lain.
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="novel in filteredNovels"
          :key="novel.slug"
          class="group cursor-pointer"
          @click="openNovelDetail(novel)"
        >
          <div class="aspect-[2/3] w-full rounded-xl overflow-hidden bg-card border border-border group-hover:border-primary transition-all shadow-lg relative mb-3">
            <img 
              v-if="novel.cover"
              :src="novel.cover" 
              class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
              loading="lazy"
              @error="($event.target as HTMLImageElement).style.display='none'"
            />
            <div v-else class="flex items-center justify-center w-full h-full text-muted-foreground text-sm">No Cover</div>

        <!-- Hover Overlay & Quick Actions -->
        <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 gap-2">
          <button 
            @click.stop="openNovelDetail(novel)" 
            class="w-full text-foreground text-xs font-semibold bg-primary hover:bg-primary/90 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg text-center"
          >
            LIHAT DETAIL
          </button>

          <button 
            @click.stop="addToLibrary(novel)" 
            :disabled="isAddingLibrary"
            class="w-full text-card-foreground text-xs font-semibold bg-card/90 border border-border hover:bg-border py-1.5 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg text-center flex items-center justify-center gap-1"
          >
            <span>➕</span> Tambah ke Library
          </button>
        </div>
      </div>
      <h3 class="font-semibold text-sm text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">{{ novel.title }}</h3>
      <p class="text-xs text-muted-foreground mt-1">{{ novel.author || 'Unknown' }}</p>
    </div>
  </div>
</div>

  <!-- POPUP MODAL 1: NOVEL BERHASIL DITAMBAH KE PERPUSTAKAAN -->
  <Teleport to="body">
    <div 
      v-if="showAddedModal && addedNovelData" 
      class="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      @click.self="showAddedModal = false"
    >
      <div class="bg-card border border-emerald-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative space-y-4 text-center">
        <button @click="showAddedModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>

        <div class="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
          🎉
        </div>

        <div>
          <h3 class="text-base font-bold text-foreground">Novel Berhasil Ditambahkan!</h3>
          <p class="text-xs text-muted-foreground mt-1">Novel telah tersimpan di perpustakaan lokal NexEo Anda.</p>
        </div>

        <div class="bg-background/90 border border-border rounded-2xl p-3 flex items-center gap-3 text-left shadow-inner">
          <div class="w-12 h-16 rounded-lg overflow-hidden border border-border shrink-0 bg-card">
            <img v-if="addedNovelData.cover" :src="addedNovelData.cover" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center text-xs">📖</div>
          </div>
          <div class="min-w-0 flex-1">
            <h4 class="font-bold text-xs text-foreground truncate">{{ addedNovelData.title }}</h4>
            <p class="text-[11px] text-muted-foreground truncate">{{ addedNovelData.author || 'Penulis Unknown' }}</p>
            <span class="inline-block mt-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              ✓ Tersimpan di Library
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2">
          <NuxtLink 
            :to="`/novels/${addedNovelData.slug}`" 
            class="py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1"
            @click="showAddedModal = false"
          >
            <span>📖</span> Baca Sekarang
          </NuxtLink>
          <NuxtLink 
            to="/library" 
            class="py-2.5 bg-card border border-border hover:bg-border text-foreground font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1"
            @click="showAddedModal = false"
          >
            <span>📚</span> Perpustakaan
          </NuxtLink>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- POPUP MODAL 2: STATUS & HASIL DOWNLOAD CHAPTER NOVEL -->
  <Teleport to="body">
    <div 
      v-if="showDownloadModal" 
      class="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      @click.self="!isDownloading && (showDownloadModal = false)"
    >
      <div class="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-2xl relative space-y-4 text-center">
        <button v-if="!isDownloading" @click="showDownloadModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>

        <div v-if="isDownloading" class="py-4 space-y-3">
          <div class="spinner w-12 h-12 border-4 border-primary border-r-transparent rounded-full animate-spin mx-auto"></div>
          <h3 class="text-sm font-bold text-foreground">Mengunduh Chapter Novel...</h3>
          <p class="text-xs text-muted-foreground font-mono leading-relaxed">{{ downloadStatusMessage }}</p>
        </div>

        <div v-else-if="downloadSuccessData" class="space-y-4">
          <div class="w-16 h-16 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center justify-center text-3xl mx-auto">
            📥
          </div>

          <div>
            <h3 class="text-base font-bold text-foreground">Unduh Bab Selesai!</h3>
            <p class="text-xs text-muted-foreground mt-1">{{ downloadStatusMessage }}</p>
          </div>

          <div class="bg-background/90 border border-border rounded-2xl p-3 text-xs font-mono space-y-1">
            <div class="flex justify-between text-muted-foreground">
              <span>Novel:</span>
              <span class="font-bold text-foreground truncate max-w-[180px]">{{ downloadSuccessData.title }}</span>
            </div>
            <div class="flex justify-between text-muted-foreground">
              <span>Total Diunduh:</span>
              <span class="font-bold text-emerald-400">{{ downloadSuccessData.downloadedCount }} Bab</span>
            </div>
          </div>

          <div class="pt-2">
            <NuxtLink 
              :to="`/novels/${downloadSuccessData.slug}`" 
              class="w-full py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1"
              @click="showDownloadModal = false"
            >
              <span>📖</span> Mulai Membaca Bab Terunduh
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'
import { useNovelStore } from '~/stores/novel'
import type { NovelSource, NovelExternal, NovelDetail, NovelChapter } from '@nexeo/shared/types/novel'

const { info, error, success } = useToast()
const novelStore = useNovelStore()

const sources = ref<NovelSource[]>([])
const selectedSource = ref('')
const searchQuery = ref('')
const novelList = ref<NovelExternal[]>([])
const selectedNovel = ref<NovelExternal | null>(null)
const selectedNovelDetail = ref<NovelDetail | null>(null)
const isLoadingDetail = ref(false)
const detailTab = ref('synopsis')
const chapterFilter = ref('all') // 'all' or specific chapter file name

const isAddingLibrary = ref(false)
const showAddedModal = ref(false)
const addedNovelData = ref<any>(null)

const showDownloadModal = ref(false)
const isDownloading = ref(false)
const downloadStatusMessage = ref('')
const downloadSuccessData = ref<any>(null)

const filteredNovels = computed(() => {
  const validNovels = novelList.value.filter(n => {
    const title = typeof n?.title === 'string' ? n.title.trim() : ''
    const slug = typeof n?.slug === 'string' ? n.slug.trim() : ''
    return title && slug && title !== 'Unknown' && title !== 'undefined'
  })

  if (!searchQuery.value) return validNovels
  const q = searchQuery.value.toLowerCase()
  return validNovels.filter(n => 
    n.title.toLowerCase().includes(q) || 
    (n.author && n.author.toLowerCase().includes(q)))
})

const totalChaptersInDetail = computed(() => {
  return selectedNovelDetail.value?.chapters?.length || 0
})

const loadSources = async () => {
  try {
    const res = await $fetch<NovelSource[]>('/api/novels/sources')
    sources.value = res
  } catch (e: unknown) {
    console.error('Failed to load sources:', e)
    error('Gagal memuat daftar sumber')
  }
}

const onSourceChange = async () => {
  if (!selectedSource.value) {
    novelList.value = []
    return
  }
  
  try {
    const res = await $fetch<NovelExternal[]>(`/api/novels/sources/${selectedSource.value}/novels`)
    novelList.value = res
  } catch (e: unknown) {
    console.error('Failed to load novels:', e)
    error('Gagal memuat daftar novel')
  }
}

const openNovelDetail = async (novel: NovelExternal) => {
  selectedNovel.value = novel
  selectedNovelDetail.value = null
  detailTab.value = 'synopsis'
  isLoadingDetail.value = true
  try {
    const res = await $fetch<NovelDetail>(`/api/novels/sources/${selectedSource.value}/novel/${novel.slug}`)
    selectedNovelDetail.value = res
  } catch (e: unknown) {
    console.error('Failed to load detail:', e)
    error('Gagal memuat detail novel')
  } finally {
    isLoadingDetail.value = false
  }
}

const closeModal = () => {
  selectedNovelDetail.value = null
  selectedNovel.value = null
  isLoadingDetail.value = false
  detailTab.value = 'synopsis'
}

const addToLibrary = async (novel: NovelExternal) => {
  if (!selectedSource.value) {
    error('Pilih sumber novel terlebih dahulu')
    return
  }
  
  isAddingLibrary.value = true
  try {
    const result = await novelStore.importFromSource(selectedSource.value, novel.slug)
    if (result.success) {
      addedNovelData.value = {
        title: novel.title,
        cover: novel.cover,
        slug: novel.slug,
        author: novel.author,
        chaptersCount: selectedNovelDetail.value?.chapters?.length || 0
      }
      showAddedModal.value = true
      success(`"${novel.title}" berhasil ditambah ke perpustakaan!`)
      closeModal()
      await novelStore.fetchLibrary()
    } else {
      error(`Gagal mengimpor: ${result.error}`)
      await novelStore.fetchLibrary()
    }
  } catch (e: any) {
    console.error('Import error:', e)
    error('Terjadi error saat mengimpor novel')
  } finally {
    isAddingLibrary.value = false
  }
}

const downloadAllChapters = async () => {
  if (!selectedSource.value || !selectedNovel.value) {
    error('Silakan pilih novel terlebih dahulu')
    return
  }

  showDownloadModal.value = true
  isDownloading.value = true
  downloadStatusMessage.value = `Mengunduh semua bab untuk "${selectedNovel.value.title}"...`
  
  try {
    const result = await novelStore.importFromSource(selectedSource.value, selectedNovel.value.slug, 'all')
    if (result.success && 'data' in result) {
      downloadSuccessData.value = {
        title: selectedNovel.value.title,
        slug: selectedNovel.value.slug,
        downloadedCount: result.data?.downloaded || totalChaptersInDetail.value
      }
      isDownloading.value = false
      downloadStatusMessage.value = `Berhasil mengunduh ${downloadSuccessData.value.downloadedCount} bab!`
      success(`Semua ${result.data?.downloaded || '?'} bab berhasil diunduh!`)
      await novelStore.fetchLibrary()
    } else {
      isDownloading.value = false
      error(`Gagal mengunduh: ${result.error ?? 'Unknown error'}`)
      showDownloadModal.value = false
    }
  } catch (e: any) {
    console.error('Download error:', e)
    isDownloading.value = false
    error('Terjadi error saat mengunduh bab')
    showDownloadModal.value = false
  }
}

const downloadSelectedChapter = async () => {
  if (!selectedSource.value || !selectedNovel.value || chapterFilter.value === 'all') {
    error('Pilih satu bab terlebih dahulu')
    return
  }

  showDownloadModal.value = true
  isDownloading.value = true
  downloadStatusMessage.value = `Mengunduh bab pilihan untuk "${selectedNovel.value.title}"...`
  
  try {
    const result = await novelStore.importFromSource(selectedSource.value, selectedNovel.value.slug, chapterFilter.value)
    if (result.success) {
      downloadSuccessData.value = {
        title: selectedNovel.value.title,
        slug: selectedNovel.value.slug,
        downloadedCount: 1
      }
      isDownloading.value = false
      downloadStatusMessage.value = 'Bab pilihan berhasil diunduh!'
      success('Bab berhasil diunduh!')
      await novelStore.fetchLibrary()
    } else {
      isDownloading.value = false
      error(`Gagal mengunduh: ${result.error}`)
      showDownloadModal.value = false
    }
  } catch (e: any) {
    console.error('Download error:', e)
    isDownloading.value = false
    error('Terjadi error saat mengunduh bab')
    showDownloadModal.value = false
  }
}

onMounted(() => {
  loadSources()
})
</script>


