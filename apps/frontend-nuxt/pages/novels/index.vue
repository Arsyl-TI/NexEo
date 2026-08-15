<template>
  <div class="novel-library">
    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Koleksi Novel</h1>
          <span class="text-muted-foreground bg-card/80 border border-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">{{ library.length }} novel</span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <input ref="epubInput" type="file" accept=".epub" class="hidden" @change="uploadEpub" />
          <button :disabled="novelStore.isImporting" class="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed" @click="openUploadDialog">
            <span v-if="novelStore.isImporting" class="spinner border-2 w-3.5 h-3.5"></span>
            <span>{{ novelStore.isImporting ? 'Mengimpor...' : 'Import EPUB' }}</span>
          </button>
          <button :disabled="novelStore.isUpdating" class="flex items-center gap-2 bg-card hover:bg-gray-800 border border-gray-700 text-foreground px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all" @click="updateCatalog">
            Perbarui Katalog
          </button>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mb-8 bg-card/40 p-3.5 rounded-2xl border border-gray-700/50">
        <div class="flex-1 relative">
          <input v-model="searchQuery" type="text" class="w-full pl-4 pr-4 py-2 bg-background border border-gray-700 rounded-xl text-sm text-foreground placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all" placeholder="Cari judul novel..." />
        </div>
        <select v-model="selectedTag" class="w-full sm:w-56 px-4 py-2 bg-background border border-gray-700 rounded-xl text-sm text-foreground outline-none">
          <option value="">Semua tag</option>
          <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>

      <div v-if="continueReading.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 text-foreground">Lanjutkan Membaca</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="novel in continueReading" :key="novel.slug" class="group cursor-pointer" @click="navigateToNovel(novel.slug)">
            <div class="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 border border-gray-700 shadow-lg relative">
              <img v-if="getThumbnailUrl(novel)" :src="getThumbnailUrl(novel)" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              <div v-else class="flex items-center justify-center h-full text-xs text-muted-foreground">No Cover</div>
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                <div class="text-xs text-white font-medium line-clamp-2">{{ novel.title }}</div>
                <div class="w-full bg-gray-700 rounded-full h-1 mt-2">
                  <div class="bg-primary h-1 rounded-full" :style="{ width: novel.progress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredLibrary.length === 0" class="text-center py-20 bg-card/50 rounded-2xl border border-gray-700">
        <h2 class="text-2xl font-bold text-white mb-2">Tidak ada novel ditemukan</h2>
        <p class="text-gray-500">Coba ubah filter pencarian atau tag, atau impor file EPUB baru.</p>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div v-for="novel in filteredLibrary" :key="novel.slug" class="group cursor-pointer" @click="navigateToNovel(novel.slug)">
          <div class="aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-primary transition-all shadow-lg relative mb-2">
            <img v-if="getThumbnailUrl(novel)" :src="getThumbnailUrl(novel)" class="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            <div v-else class="flex items-center justify-center h-full text-xs text-muted-foreground">No Cover</div>
          </div>
          <h3 class="font-medium text-sm text-gray-300 line-clamp-1 group-hover:text-primary transition-colors">{{ novel.title }}</h3>
          <p v-if="novel.author" class="text-xs text-gray-500 mt-0.5">{{ novel.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useToast } from '~/composables/useToast'
import { useNovelStore } from '~/stores/novel'
import type { NovelLibraryItem } from '@nexeo/shared/types/novel'

const novelStore = useNovelStore()
const { success, error: showError, info: showInfo } = useToast()
const epubInput = ref<HTMLInputElement | null>(null)
const searchQuery = ref<string>('')
const selectedTag = ref<string>('')
const loading = ref(true)
const resumeProgress = ref<Record<string, string>>({})

const library = computed(() => novelStore.library)
const allTags = computed(() => [...new Set(library.value.flatMap((n) => n.tags ?? []))].sort())

const filteredLibrary = computed(() => library.value.filter((novel) => {
  const matchSearch = novel.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  const matchTag = selectedTag.value === '' || novel.tags?.includes(selectedTag.value)
  return matchSearch && matchTag
}))

function getResumeLabel(folderName: string) { return resumeProgress.value[folderName]?.replace(/-/g, ' ') ?? 'Resume' }
function chapterFileNumber(file: string) { const match = file.match(/(\d+)/); return match ? Number(match[1]) : 0 }

function calcProgress(novel: NovelLibraryItem, resumeChapter: string) {
  const folderName = novel.folderName ?? novel.slug
  if (!folderName || !resumeChapter) return 0
  const chapters = Number(novel.chapterCount || novel.chapters || 0)
  const position = chapterFileNumber(resumeChapter) || 1
  if (chapters > 0) return Math.min(100, Math.max(1, Math.round((position / chapters) * 100)))
  return 0
}

const continueReading = computed(() => {
  return library.value.map((novel, index) => {
    const folderName = novel.folderName ?? novel.slug
    if (!folderName) return null
    const resumeChapter = resumeProgress.value[folderName]
    if (!resumeChapter) return null
    return { ...novel, resumeChapter, resumeLabel: getResumeLabel(folderName), progress: calcProgress(novel, resumeChapter), sortIndex: index }
  }).filter((x): x is NonNullable<typeof x> => Boolean(x)).sort((a, b) => b.sortIndex - a.sortIndex).slice(0, 6)
})

function getThumbnailUrl(novel: NovelLibraryItem) {
  if (novel.cover) return novel.cover
  return undefined
}

function openUploadDialog() { epubInput.value?.click() }
function navigateToNovel(slug: string) { if (slug) navigateTo(`/novels/${slug}`) }

async function readResume() {
  if (typeof window === 'undefined') return
  for (const novel of library.value) {
    const folderName = novel.folderName ?? novel.slug
    if (folderName) {
      const key = `resume_novel_${folderName}`
      const saved = localStorage.getItem(key)
      if (saved) resumeProgress.value[folderName] = saved
    }
  }
}

async function updateCatalog() {
  showInfo('Memperbarui katalog novel...')
  await novelStore.fetchLibrary()
  success('Katalog berhasil diperbarui.')
}

async function uploadEpub(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!file.name.toLowerCase().endsWith('.epub')) { showError('Hanya file .epub yang diperbolehkan'); input.value = ''; return }
  if (file.size > 500 * 1024 * 1024) { showError('Ukuran file EPUB melebihi batas 500MB'); input.value = ''; return }

  showInfo(`Mengimpor EPUB "${file.name}"...`)
  const result = await novelStore.uploadEpub(file)
  if (result.success) {
    const importedTitle = ('title' in result && typeof result.title === 'string') ? result.title : file.name
    success(`Novel "${importedTitle}" berhasil diimpor!`)
  } else {
    showError(`Gagal mengimpor EPUB: ${result.error}`)
  }
  input.value = ''
}

onMounted(async () => {
  await novelStore.fetchLibrary()
  await readResume()
  loading.value = false
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>