<template>
  <div class="video-home">
    <div v-if="loading" class="flex justify-center py-20"><div class="spinner"></div></div>
    <div v-else>
      <!-- Top Action Bar with YouTube Downloader Button -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-extrabold text-foreground tracking-tight">{{ categoryId ? categoryName : 'Kategori Video' }}</h1>
          <p class="text-xs text-muted-foreground mt-1">Koleksi video lokal & pemutar streaming dalam jaringan LAN</p>
        </div>

        <button @click="showYtModal = true" class="btn-primary px-4 py-2.5 text-xs font-bold shadow-lg flex items-center gap-2 w-max">
          <span class="text-base">▶️</span> Unduh Video YouTube
        </button>
      </div>

      <!-- YouTube Downloader Modal -->
      <div v-if="showYtModal" @click.self="showYtModal = false" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-card border border-border rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button @click="showYtModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl">✕</button>

          <h2 class="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
            <span>▶️</span> Unduh Video YouTube
          </h2>
          <p class="text-xs text-muted-foreground mb-6">Unduh video YouTube langsung ke folder pustaka video NexEo</p>

          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Tautan / Link YouTube</label>
              <div class="flex gap-2">
                <input 
                  v-model="ytUrl" 
                  type="url" 
                  placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..." 
                  class="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
                <button 
                  @click="fetchYtInfo" 
                  :disabled="isFetchingInfo || !ytUrl" 
                  class="btn-secondary px-4 py-2.5 text-xs font-bold shrink-0 disabled:opacity-50"
                >
                  <span v-if="isFetchingInfo" class="spinner border-2 w-3.5 h-3.5 mr-1"></span>
                  <span>Ambil Info</span>
                </button>
              </div>
            </div>

            <!-- YouTube Video Metadata Preview -->
            <div v-if="ytMeta" class="bg-background/80 border border-border/80 rounded-2xl p-4 flex flex-col gap-3">
              <div class="flex gap-4 items-start">
                <img v-if="ytMeta.thumbnailUrl" :src="ytMeta.thumbnailUrl" class="w-32 aspect-video object-cover rounded-xl border border-border shrink-0 shadow-md">
                <div class="min-w-0 flex-1">
                  <h4 class="font-bold text-sm text-foreground line-clamp-2 leading-tight mb-1">{{ ytMeta.title }}</h4>
                  <p class="text-xs text-purple-400 font-semibold mb-1">👤 {{ ytMeta.author }}</p>
                  <span class="inline-block px-2.5 py-0.5 rounded-full bg-card border border-border text-[11px] text-muted-foreground font-mono">
                    ⏱️ {{ ytMeta.durationFormatted }}
                  </span>
                </div>
              </div>

              <!-- Description Box -->
              <div v-if="ytMeta.description" class="pt-2 border-t border-border/50">
                <div class="text-[11px] text-muted-foreground line-clamp-3 leading-relaxed whitespace-pre-line bg-card/40 p-2.5 rounded-xl border border-border/40">
                  {{ ytMeta.description }}
                </div>
              </div>
            </div>

            <!-- Target Folder Selector -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Folder Tujuan Simpan</label>
              <select v-model="ytTargetCategory" class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary">
                <option value="youtube">🎬 Kategori YouTube (D:\Video\YouTube)</option>
                <option value="anime">🍿 Kategori Anime (D:\Video\Anime)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Subfolder Tambahan (Opsional)</label>
              <input 
                v-model="ytCustomSubfolder" 
                type="text" 
                placeholder="Contoh: Musik / Gameplay / Tutorial" 
                class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showYtModal = false" class="flex-1 px-4 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground">
              Batal
            </button>
            <button 
              @click="executeYtDownload" 
              :disabled="isDownloading || !ytUrl" 
              class="flex-1 btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <span v-if="isDownloading" class="spinner border-2 w-3.5 h-3.5"></span>
              <span>{{ isDownloading ? 'Memulai Unduhan...' : 'Mulai Unduh Video' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Category Folders Grid -->
      <section v-if="categoryId && !selectedFolder">
        <div class="flex items-center justify-between mb-6">
          <span class="text-muted-foreground bg-card border border-border/60 px-3.5 py-1 rounded-full text-xs font-mono font-medium">{{ folders.length }} folder</span>
        </div>
        <div v-if="folders.length === 0" class="text-center py-20 text-muted-foreground">Kategori ini kosong atau folder tidak ditemukan di disk.</div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="folder in folders" :key="folder.id" @click="selectFolder(folder)" class="cursor-pointer group relative">
            <div class="aspect-video rounded-2xl overflow-hidden bg-card border border-border/80 group-hover:border-primary transition-all shadow-lg">
              <img v-if="folder.hasCoverThumbnail && folder.coverId" :src="`/api/video/thumbnail/${encodeURIComponent(folder.coverId)}`" class="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-4 w-full">
                <h3 class="font-bold text-base text-foreground truncate">{{ folder.name === 'Root' ? 'General' : folder.name }}</h3>
                <span class="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-md shadow">{{ folder.videoCount }} Video</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Video List Grid inside a Folder -->
      <section v-else-if="selectedFolder">
        <div class="flex flex-col gap-4 mb-8 border-b border-border/80 pb-6">
          <button @click="selectedFolder = null" class="w-max text-muted-foreground bg-card border border-border/60 px-4 py-2 rounded-full text-xs font-medium hover:text-foreground">← Kembali ke Kategori</button>
          <div class="flex justify-between items-end">
            <h1 class="text-2xl md:text-3xl font-bold text-foreground">{{ selectedFolder.name === 'Root' ? 'General' : selectedFolder.name }}</h1>
            <span class="text-muted-foreground bg-card border border-border/60 px-3.5 py-1 rounded-full text-xs font-mono font-medium">{{ videos.length }} video</span>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <NuxtLink v-for="video in videos" :key="video.id" :to="`/video/${encodeURIComponent(video.id)}`" class="group">
            <div class="aspect-video rounded-2xl overflow-hidden bg-card border border-border/80 group-hover:border-primary mb-3 relative shadow-lg">
              <img v-if="video.hasThumbnail" :src="`/api/video/thumbnail/${encodeURIComponent(video.id)}`" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
              <div v-else class="flex items-center justify-center w-full h-full text-muted-foreground text-xs">No thumbnail</div>
              <div class="absolute bottom-2 right-2 bg-background/80 border border-border text-foreground text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">{{ video.format }}</div>
            </div>
            <h3 class="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">{{ video.title || video.name }}</h3>
            <p class="text-xs text-muted-foreground font-mono mt-1">{{ video.sizeFormatted }}</p>
          </NuxtLink>
        </div>
      </section>

      <!-- Category Overview Selection -->
      <section v-else>
        <div v-if="videoStore.categories.length === 0" class="text-center py-20 text-muted-foreground">
          Kategori video tidak ditemukan.
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="cat in videoStore.categories" 
            :key="cat.id" 
            @click="navigateToCategory(cat.id)" 
            class="cursor-pointer group glass-card-hover p-6 shadow-xl"
          >
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {{ cat.id === 'anime' ? '🍿' : cat.id === 'youtube' ? '🎬' : '🎥' }}
              </div>
              <div>
                <h3 class="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{{ cat.name }}</h3>
                <p class="text-xs text-muted-foreground mt-1 font-mono">{{ cat.path }}</p>
                <span class="inline-block mt-2 text-[11px] bg-primary/15 text-primary border border-primary/30 px-3 py-0.5 rounded-full font-bold">
                  {{ cat.videoCount ?? 0 }} Total Video
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVideoStore } from '~/stores/video'
import { useToast } from '~/composables/useToast'
import type { VideoFolder, VideoItem } from '@nexeo/shared/types/video'

const route = useRoute()
const router = useRouter()
const videoStore = useVideoStore()
const { success, error } = useToast()

const categoryId = ref('')
const categoryName = ref('')
const folders = ref<VideoFolder[]>([])
const selectedFolder = ref<VideoFolder | null>(null)
const videos = ref<VideoItem[]>([])
const loading = ref(false)

// YouTube Downloader Modal State
const showYtModal = ref(false)
const ytUrl = ref('')
const ytMeta = ref<any>(null)
const ytTargetCategory = ref('youtube')
const ytCustomSubfolder = ref('')
const isFetchingInfo = ref(false)
const isDownloading = ref(false)

const navigateToCategory = (id: string) => {
  router.push({ path: '/', query: { category: id } })
}

const selectFolder = async (folder: VideoFolder) => {
  selectedFolder.value = folder
  loading.value = true
  try {
    await videoStore.fetchVideos(folder.categoryId, folder.name)
    videos.value = videoStore.videos
  } catch (err) {
    console.error('Failed to load videos:', err)
  } finally {
    loading.value = false
  }
}

const loadCategoryData = async () => {
  const queryCategory = route.query.category as string
  if (queryCategory) {
    categoryId.value = queryCategory
    loading.value = true
    selectedFolder.value = null
    try {
      const cat = videoStore.categories.find(c => c.id === queryCategory)
      categoryName.value = cat ? cat.name : queryCategory
      await videoStore.fetchFolders(queryCategory)
      folders.value = videoStore.folders
    } catch (err) {
      console.error('Failed to load category folders:', err)
    } finally {
      loading.value = false
    }
  } else {
    categoryId.value = ''
    categoryName.value = ''
    folders.value = []
    selectedFolder.value = null
  }
}

async function fetchYtInfo() {
  if (!ytUrl.value.trim()) return
  isFetchingInfo.value = true
  ytMeta.value = null
  try {
    const res = await $fetch<{ success?: boolean; data?: any }>('/api/youtube/info', {
      method: 'POST',
      body: { url: ytUrl.value.trim() }
    })
    if (res?.data) {
      ytMeta.value = res.data
      success('Metadata video YouTube berhasil dimuat!')
    }
  } catch (err: any) {
    error(err?.statusMessage || 'Gagal memuat metadata video YouTube.')
  } finally {
    isFetchingInfo.value = false
  }
}

async function executeYtDownload() {
  if (!ytUrl.value.trim()) return
  isDownloading.value = true
  try {
    const res = await $fetch<{ success?: boolean; data?: any }>('/api/youtube/download', {
      method: 'POST',
      body: {
        url: ytUrl.value.trim(),
        targetCategory: ytTargetCategory.value,
        customSubfolder: ytCustomSubfolder.value.trim()
      }
    })
    if (res?.success) {
      success('Tugas unduhan YouTube berhasil dikirim ke Antrean Downloader!')
      showYtModal.value = false
      ytUrl.value = ''
      ytMeta.value = null
      router.push('/downloader')
    }
  } catch (err: any) {
    error(err?.statusMessage || 'Gagal memulai unduhan YouTube.')
  } finally {
    isDownloading.value = false
  }
}

onMounted(async () => {
  await videoStore.fetchCategories()
  await loadCategoryData()
})

watch(() => route.query.category, () => {
  loadCategoryData()
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>