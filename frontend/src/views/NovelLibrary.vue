<template>
  <div class="novel-library">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div class="flex items-center gap-3">
        <h1 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Koleksi Novel</h1>
        <span class="text-muted-foreground bg-card/80 border border-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">{{ library.length }} novel</span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <input type="file" ref="epubInput" accept=".epub" class="hidden" @change="uploadEpub" />
        <button 
          @click="$refs.epubInput.click()" 
          :disabled="isImporting"
          class="flex items-center gap-2 bg-primary600/20 hover:bg-primary600/30 border border-primary500/40 text-primary300 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isImporting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          {{ isImporting ? 'Mengimpor...' : 'Import EPUB' }}
        </button>

        <button 
          @click="updateCatalog" 
          :disabled="isUpdating"
          class="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isUpdating" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          {{ isUpdating ? 'Memperbarui...' : 'Perbarui Katalog' }}
        </button>
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-3 mb-8 bg-card/40 p-3.5 rounded-2xl border border-gray-700/50">
      <div class="flex-1 relative">
        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="w-full pl-10 pr-4 py-2 bg-background border border-gray-700 rounded-xl text-sm text-foreground placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all" 
          placeholder="Cari judul novel..."
        />
      </div>
      
      <div class="w-full sm:w-56 relative">
        <select 
          v-model="selectedTag"
          class="w-full px-4 py-2 pr-8 bg-background border border-gray-700 rounded-xl text-sm text-card-foreground focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="">Semua Genre</option>
          <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted-foreground">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
    
    <div v-if="continueReading.length" class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-foreground">Lanjutkan Membaca</h2>
        <span class="text-xs text-muted-foreground">Progress tersimpan lokal</span>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        <router-link
          v-for="item in continueReading"
          :key="item.folderName"
          :to="`/novels/${item.folderName}/${item.resumeChapter}`"
          class="min-w-[220px] max-w-[220px] snap-start bg-card/60 border border-border rounded-2xl p-4 hover:border-primary transition-all group"
        >
          <div class="flex gap-3">
            <div class="w-14 h-20 rounded-lg overflow-hidden bg-background border border-border flex-shrink-0">
              <img v-if="item.localThumbnail" :src="`/api/novels/static/${item.localThumbnail}`" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">No Cover</div>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-sm font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">{{ item.title }}</h3>
              <p class="text-xs text-muted-foreground mt-1">Lanjut ke {{ item.resumeLabel }}</p>
              <div class="mt-3 h-2 rounded-full bg-background border border-border overflow-hidden">
                <div class="h-full bg-primary rounded-full" :style="{ width: `${item.progress}%` }"></div>
              </div>
              <p class="text-[11px] text-muted-foreground mt-2">{{ item.progress }}%</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="filteredLibrary.length === 0" class="text-center py-20 bg-card/20 border border-gray-800 rounded-2xl">
      <svg class="w-12 h-12 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
      <p class="text-muted-foreground font-medium">Tidak ada novel yang sesuai kriteria pencarian.</p>
      <button v-if="searchQuery || selectedTag" @click="searchQuery = ''; selectedTag = ''" class="mt-3 text-xs text-primary hover:underline">Reset Filter & Pencarian</button>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
      <router-link 
        v-for="novel in filteredLibrary" 
        :key="novel.id" 
        :to="`/novels/${novel.folderName}`"
        class="group flex flex-col"
      >
        <div class="aspect-[2/3] w-full rounded-xl overflow-hidden bg-card border border-gray-700 group-hover:border-primary transition-all shadow-lg relative mb-3">
          <img v-if="novel.localThumbnail" :src="`/api/novels/static/${novel.localThumbnail}`" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div v-else class="flex items-center justify-center w-full h-full text-muted-foreground text-sm">No Cover</div>
          
          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
            <span class="text-foreground text-xs font-semibold bg-primary px-3 py-1.5 rounded-full transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-md shadow-brand/40">BACA SEKARANG</span>
          </div>
        </div>
        <h3 class="font-semibold text-sm text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">{{ novel.title }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from '../composables/useToast'
import { useNovelStore } from '../store/novelStore'

const { showToast } = useToast()
const novelStore = useNovelStore()
const { library, isImporting, isUpdating, loading } = storeToRefs(novelStore)

const searchQuery = ref('')
const selectedTag = ref('')
const epubInput = ref(null)
const resumeProgress = ref({})

const availableTags = computed(() => {
  const tags = new Set()
  library.value.forEach(novel => {
    if (novel.tags && Array.isArray(novel.tags)) {
      novel.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

const readResume = () => {
  if (typeof window === 'undefined' || !window.localStorage) return
  const progress = {}
  library.value.forEach(novel => {
    const saved = localStorage.getItem(`resume_novel_${novel.folderName}`)
    if (saved) progress[novel.folderName] = saved
  })
  resumeProgress.value = progress
}

const getResumeChapter = (slug) => resumeProgress.value[slug] || ''
const getResumeLabel = (slug) => {
  const chapter = getResumeChapter(slug)
  if (!chapter) return ''
  return chapter.replace(/-/g, ' ')
}

const continueReading = computed(() => {
  return library.value
    .map((novel, index) => {
      const resumeChapter = resumeProgress.value[novel.folderName]
      if (!resumeChapter) return null
      const chapters = Number(novel.chapterCount || novel.chapters || 0)
      const progress = chapters > 0 ? Math.min(100, Math.max(1, Math.round((1 / chapters) * 100))) : 0
      return { ...novel, resumeChapter, resumeLabel: getResumeLabel(novel.folderName), progress, sortIndex: index }
    })
    .filter(Boolean)
    .sort((a, b) => b.sortIndex - a.sortIndex)
    .slice(0, 6)
})

const filteredLibrary = computed(() => {
  return library.value.filter(novel => {
    const matchSearch = novel.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchTag = selectedTag.value === '' || (novel.tags && novel.tags.includes(selectedTag.value))
    return matchSearch && matchTag
  })
})

const updateCatalog = async () => {
  if (isUpdating.value) return
  const result = await novelStore.updateCatalog()
  if (result.success) {
    showToast("Proses pembaruan katalog sedang berjalan di latar belakang.", "info")
    setTimeout(() => novelStore.fetchLibrary(), 10000)
  } else {
    showToast("Gagal memulai pembaruan katalog.", "error")
  }
}

const uploadEpub = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.name.toLowerCase().endsWith('.epub')) {
    showToast('Hanya file .epub yang diperbolehkan', 'error')
    if (epubInput.value) epubInput.value.value = ''
    return
  }

  const maxSize = 500 * 1024 * 1024
  if (file.size > maxSize) {
    showToast('Ukuran file EPUB melebihi batas 500MB', 'error')
    if (epubInput.value) epubInput.value.value = ''
    return
  }

  const result = await novelStore.importEpub(file)
  if (result.success) {
    showToast(`Berhasil mengimpor novel "${result.data.title}" dengan total ${result.data.chapters} bab!`, "success")
  } else {
    showToast('Gagal mengimpor EPUB: ' + result.error, "error")
  }
  
  if (epubInput.value) epubInput.value.value = ''
}

onMounted(async () => {
  loading.value = true
  await novelStore.fetchLibrary()
  readResume()
  loading.value = false
})
</script>
