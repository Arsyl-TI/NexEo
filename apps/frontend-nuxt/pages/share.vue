<template>
  <div class="file-share max-w-5xl mx-auto relative">
    <!-- Fullscreen Window Drag & Drop Overlay -->
    <div 
      v-if="isWindowDragging"
      class="fixed inset-0 z-50 bg-background/85 backdrop-blur-md border-4 border-dashed border-primary flex flex-col items-center justify-center text-center p-8 transition-all animate-in fade-in zoom-in-95 duration-200"
      @dragover.prevent
      @dragleave.prevent="handleWindowDragLeave"
      @drop.prevent="handleWindowDrop"
    >
      <div class="w-24 h-24 bg-primary/20 border-2 border-primary rounded-3xl flex items-center justify-center text-primary text-4xl mb-6 shadow-2xl animate-bounce">
        🚀
      </div>
      <h2 class="text-3xl font-extrabold text-foreground mb-2">Lepaskan Berkas Di Mana Saja!</h2>
      <p class="text-sm text-muted-foreground max-w-md">Berkas akan langsung diunggah ke penyimpanan LAN NexEo dan siap dibagikan ke semua perangkat.</p>
    </div>

    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground tracking-tight mb-1 flex items-center gap-3">
          <span>📤</span>
          <span>Berbagi Berkas Lokal (LAN)</span>
        </h1>
        <p class="text-xs text-muted-foreground">Unggah dan bagikan file berukuran besar secara instan antar smartphone, laptop, & PC di jaringan Wi-Fi / LAN.</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-muted-foreground bg-card border border-border px-3.5 py-1.5 rounded-full text-xs font-mono font-medium shadow-sm">
          {{ files.length }} berkas
        </span>
        <button 
          @click="fetchFiles" 
          :disabled="loading"
          class="p-2 bg-card hover:bg-border border border-border rounded-xl text-muted-foreground hover:text-foreground transition-all shadow-sm"
          title="Segarkan Berkas"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>
      </div>
    </div>

    <!-- Upload Dropzone -->
    <div 
      class="bg-card/40 border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center mb-8 transition-all duration-300 backdrop-blur-xl"
      :class="isBoxDragging ? 'border-primary bg-primary/10 shadow-primary/20 shadow-2xl scale-[1.01]' : 'border-border/80 hover:border-primary/50 hover:bg-card/60'"
      @dragover.prevent="isBoxDragging = true"
      @dragleave.prevent="isBoxDragging = false"
      @drop.prevent="handleBoxDrop"
      @click="fileInput?.click()"
    >
      <input type="file" ref="fileInput" class="hidden" multiple @change="handleFileSelect">
      
      <div v-if="!uploading" class="cursor-pointer">
        <div class="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        </div>
        <p class="text-foreground font-semibold text-lg mb-1">Klik atau seret berkas ke sini</p>
        <p class="text-muted-foreground text-xs">Mendukung berkas besar tanpa batasan format (Video, Game, ZIP, Gambar, Dokumen)</p>
      </div>
      
      <!-- Live Upload Progress Queue -->
      <div v-else class="w-full max-w-lg mx-auto text-left space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-foreground">
            {{ uploadQueue.length > 1 ? `Mengunggah ${currentUploadIndex + 1} dari ${uploadQueue.length} berkas...` : 'Mengunggah berkas...' }}
          </span>
          <span class="text-xs font-mono font-bold text-primary">{{ totalUploadProgress }}%</span>
        </div>

        <div class="w-full h-3 bg-card border border-border rounded-full overflow-hidden shadow-inner">
          <div class="h-full bg-primary transition-all duration-200" :style="{ width: `${totalUploadProgress}%` }"></div>
        </div>

        <div class="max-h-36 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          <div 
            v-for="(item, idx) in uploadQueue" 
            :key="idx"
            class="flex items-center justify-between text-xs bg-card/80 border border-border/70 rounded-xl px-3 py-2"
          >
            <div class="flex items-center gap-2 truncate mr-2">
              <span v-if="item.status === 'done'" class="text-emerald-400">✓</span>
              <span v-else-if="item.status === 'uploading'" class="text-primary animate-spin">⏳</span>
              <span v-else-if="item.status === 'error'" class="text-rose-400">✕</span>
              <span v-else class="text-muted-foreground">⏱️</span>
              <span class="truncate text-foreground font-medium">{{ item.file.name }}</span>
            </div>
            <span class="text-muted-foreground font-mono shrink-0">{{ formatBytes(item.file.size) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filter, Select All, & Search Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
        <!-- Select All Button -->
        <button 
          v-if="filteredFiles.length > 0"
          @click="toggleSelectAll"
          :class="['px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm', isAllSelected ? 'bg-amber-500 text-black font-bold' : 'bg-card/80 border border-border text-foreground hover:bg-border/60']"
        >
          <span>{{ isAllSelected ? '✓ Pembatalan Pilih' : '☑ Pilih Semua' }}</span>
        </button>

        <button 
          v-for="cat in ['all', 'image', 'video', 'document', 'archive']" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="['px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all', selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-card/70 border border-border text-muted-foreground hover:text-foreground']"
        >
          {{ getCategoryLabel(cat) }}
        </button>
      </div>

      <div class="relative w-full sm:w-64">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari nama berkas..." 
          class="w-full pl-9 pr-4 py-1.5 bg-background border border-border rounded-full text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-sm"
        />
        <span class="absolute left-3 top-2 text-xs text-muted-foreground">🔍</span>
      </div>
    </div>

    <!-- Floating Batch Download Action Bar -->
    <div v-if="selectedFileNames.length > 0" class="fixed bottom-6 left-4 right-4 max-w-xl mx-auto z-40 bg-card/95 border border-primary/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 animate-fade-in">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-lg shrink-0">
          📦
        </div>
        <div>
          <h4 class="text-xs font-bold text-foreground">{{ selectedFileNames.length }} Berkas Terpilih</h4>
          <p class="text-[10px] text-muted-foreground">Siap dikemas ke satu arsip ZIP instan</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button @click="selectedFileNames = []" class="px-3 py-1.5 rounded-xl border border-border text-xs text-muted-foreground hover:text-foreground">
          Batal
        </button>
        <button 
          @click="downloadSelectedAsZip" 
          :disabled="isZipping"
          class="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <span v-if="isZipping" class="spinner border-2 w-3.5 h-3.5 border-black"></span>
          <span>{{ isZipping ? 'Mengemas ZIP...' : 'Unduh Terpilih (.zip)' }}</span>
        </button>
      </div>
    </div>

    <!-- Files List -->
    <div>
      <div v-if="loading" class="flex justify-center py-16">
        <div class="spinner border-4 w-8 h-8"></div>
      </div>
      
      <div v-else-if="filteredFiles.length === 0" class="text-center py-16 bg-card/40 rounded-3xl border border-border/60 text-muted-foreground text-sm">
        <span class="text-3xl block mb-2">📂</span>
        Tidak ada berkas yang cocok dengan pencarian atau filter.
      </div>
      
      <div v-else class="space-y-3">
        <div 
          v-for="file in filteredFiles" 
          :key="file.name" 
          :class="['bg-card/70 border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-md group', selectedFileNames.includes(file.name) ? 'border-amber-500/60 bg-amber-500/5' : 'border-border/80 hover:border-primary/50']"
        >
          <div class="flex items-center overflow-hidden">
            <!-- Checkbox -->
            <input 
              type="checkbox" 
              :checked="selectedFileNames.includes(file.name)" 
              @change="toggleFileSelection(file.name)"
              class="w-4 h-4 mr-3 rounded accent-amber-500 cursor-pointer shrink-0"
            />
            <div class="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary text-xl mr-3.5 shrink-0 shadow-sm">
              {{ getFileIcon(file.name) }}
            </div>
            <div class="min-w-0">
              <h4 class="text-foreground font-semibold text-sm truncate group-hover:text-primary transition-colors" :title="file.name">
                {{ file.name }}
              </h4>
              <p class="text-xs text-muted-foreground font-mono mt-0.5">
                {{ file.sizeFormatted }} • {{ new Date(file.modified).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 shrink-0">
            <!-- Preview Button (For Images / Videos) -->
            <button 
              v-if="isPreviewable(file.name)"
              @click="openPreviewModal(file)" 
              class="p-2 text-muted-foreground hover:text-sky-400 hover:bg-sky-500/10 border border-border rounded-xl transition-colors shadow-sm" 
              title="Pratinjau Media"
            >
              👁️
            </button>

            <!-- QR Code Button for Mobile Sharing -->
            <button 
              @click="openQrModal(file)" 
              class="px-2.5 py-1.5 bg-card hover:bg-border border border-border rounded-xl text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shadow-sm" 
              title="Bagikan QR Code ke HP"
            >
              <span>📱</span> QR
            </button>

            <!-- Copy Link Button -->
            <button 
              @click="copyDownloadLink(file.name)" 
              class="px-3 py-1.5 bg-card hover:bg-border border border-border rounded-xl text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shadow-sm" 
              title="Salin Tautan Unduh"
            >
              <span>📋</span> Salin Link
            </button>

            <!-- Download Link -->
            <a 
              :href="`/api/shared-files/download/${encodeURIComponent(file.name)}`" 
              download 
              class="p-2 text-muted-foreground hover:text-foreground hover:bg-border/80 border border-border rounded-xl transition-colors shadow-sm" 
              title="Download Berkas"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>

            <!-- Delete Button -->
            <button 
              @click="deleteFile(file.name)" 
              class="p-2 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 border border-border rounded-xl transition-colors shadow-sm" 
              title="Hapus Berkas"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code LAN Modal -->
    <div 
      v-if="showQrModal && qrActiveFile" 
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      @click.self="showQrModal = false"
    >
      <div class="bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-bold text-foreground flex items-center gap-2">
            <span>📱</span> Pindai Unduh di HP
          </h3>
          <button @click="showQrModal = false" class="text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>
        </div>

        <p class="text-xs text-muted-foreground mb-4 truncate font-medium" :title="qrActiveFile.name">
          {{ qrActiveFile.name }}
        </p>

        <!-- QR Code Canvas / Image Container -->
        <div class="bg-white p-4 rounded-2xl inline-block shadow-lg mb-4 border border-border">
          <img 
            :src="getQrCodeUrl(qrActiveFile.name)" 
            alt="QR Code" 
            class="w-48 h-48 mx-auto"
          />
        </div>

        <p class="text-xs text-muted-foreground mb-4 leading-relaxed">
          Hubungkan smartphone ke Wi-Fi yang sama, lalu buka kamera atau pemindai QR untuk mengunduh berkas langsung.
        </p>

        <button 
          @click="copyDownloadLink(qrActiveFile.name)" 
          class="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>📋</span> Salin URL LAN
        </button>
      </div>
    </div>

    <!-- Media Preview Modal -->
    <div 
      v-if="showPreviewModal && previewActiveFile" 
      class="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      @click.self="showPreviewModal = false"
    >
      <div class="bg-card border border-border rounded-3xl p-6 max-w-3xl w-full shadow-2xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold text-foreground truncate mr-4">
            👁️ {{ previewActiveFile.name }}
          </h3>
          <button @click="showPreviewModal = false" class="text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>
        </div>

        <div class="flex items-center justify-center max-h-[70vh] overflow-hidden rounded-2xl bg-black/40 border border-border/50">
          <img 
            v-if="isImage(previewActiveFile.name)" 
            :src="`/api/shared-files/download/${encodeURIComponent(previewActiveFile.name)}`" 
            alt="Preview" 
            class="max-h-[65vh] w-auto object-contain rounded-xl"
          />
          <video 
            v-else-if="isVideo(previewActiveFile.name)" 
            :src="`/api/shared-files/download/${encodeURIComponent(previewActiveFile.name)}`" 
            controls 
            autoplay 
            class="max-h-[65vh] w-full rounded-xl"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface SharedFileItem {
  name: string
  size: number
  sizeFormatted: string
  modified: string
}

interface UploadQueueItem {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
}

const { error, success, warning } = useToast()

const files = ref<SharedFileItem[]>([])
const loading = ref(true)
const isWindowDragging = ref(false)
const isBoxDragging = ref(false)
const uploading = ref(false)
const uploadQueue = ref<UploadQueueItem[]>([])
const currentUploadIndex = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)

const selectedCategory = ref('all')
const searchQuery = ref('')

// Batch ZIP Selection State
const selectedFileNames = ref<string[]>([])
const isZipping = ref(false)

const isAllSelected = computed(() => {
  return filteredFiles.value.length > 0 && selectedFileNames.value.length === filteredFiles.value.length
})

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedFileNames.value = []
  } else {
    selectedFileNames.value = filteredFiles.value.map(f => f.name)
  }
}

function toggleFileSelection(name: string) {
  const idx = selectedFileNames.value.indexOf(name)
  if (idx >= 0) {
    selectedFileNames.value.splice(idx, 1)
  } else {
    selectedFileNames.value.push(name)
  }
}

async function downloadSelectedAsZip() {
  if (selectedFileNames.value.length === 0) return
  isZipping.value = true
  try {
    const blob = await $fetch<Blob>('/api/shared-files/download-zip', {
      method: 'POST',
      body: { filenames: selectedFileNames.value },
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nexeo-shared-files-${new Date().toISOString().slice(0, 10)}.zip`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)

    success(`Berhasil mengemas ${selectedFileNames.value.length} berkas ke ZIP!`)
  } catch (e: any) {
    console.error('[Download ZIP Error]', e)
    error('Gagal mengunduh berkas ZIP: ' + (e.message || 'Error server'))
  } finally {
    isZipping.value = false
  }
}

// QR Modal & Preview State
const showQrModal = ref(false)
const qrActiveFile = ref<SharedFileItem | null>(null)
const showPreviewModal = ref(false)
const previewActiveFile = ref<SharedFileItem | null>(null)

let dragCounter = 0

function handleWindowDragEnter(e: DragEvent) {
  e.preventDefault()
  dragCounter++
  if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes('Files')) {
    isWindowDragging.value = true
  }
}

function handleWindowDragLeave(e: DragEvent) {
  e.preventDefault()
  dragCounter--
  if (dragCounter <= 0) {
    dragCounter = 0
    isWindowDragging.value = false
  }
}

function handleWindowDrop(e: DragEvent) {
  dragCounter = 0
  isWindowDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    uploadFiles(e.dataTransfer.files)
  }
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const getCategoryLabel = (cat: string) => {
  const map: Record<string, string> = {
    all: '📁 Semua',
    image: '🖼️ Gambar',
    video: '🎬 Video',
    document: '📄 Dokumen',
    archive: '📦 Arsip'
  }
  return map[cat] || cat
}

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return '🖼️'
  if (['mp4', 'mkv', 'webm', 'avi', 'mov'].includes(ext)) return '🎬'
  if (['pdf', 'doc', 'docx', 'txt', 'epub'].includes(ext)) return '📄'
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '📦'
  return '📁'
}

const isImage = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)
}

const isVideo = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return ['mp4', 'webm', 'ogg'].includes(ext)
}

const isPreviewable = (filename: string) => isImage(filename) || isVideo(filename)

const filteredFiles = computed(() => {
  return files.value.filter(file => {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    
    let matchCat = true
    if (selectedCategory.value === 'image') matchCat = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)
    else if (selectedCategory.value === 'video') matchCat = ['mp4', 'mkv', 'webm', 'avi', 'mov'].includes(ext)
    else if (selectedCategory.value === 'document') matchCat = ['pdf', 'doc', 'docx', 'txt', 'epub'].includes(ext)
    else if (selectedCategory.value === 'archive') matchCat = ['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)

    const matchSearch = !searchQuery.value.trim() || file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCat && matchSearch
  })
})

const totalUploadProgress = computed(() => {
  if (uploadQueue.value.length === 0) return 0
  const total = uploadQueue.value.reduce((acc, item) => acc + item.progress, 0)
  return Math.round(total / uploadQueue.value.length)
})

const fetchFiles = async () => {
  loading.value = true
  try {
    const res = await $fetch<SharedFileItem[]>('/api/shared-files')
    files.value = res || []
  } catch (e: any) {
    console.error('Failed to load files', e)
    error('Gagal memuat file yang dibagikan')
  } finally {
    loading.value = false
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    uploadFiles(target.files)
  }
}

const handleBoxDrop = (e: DragEvent) => {
  isBoxDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    uploadFiles(e.dataTransfer.files)
  }
}

const copyDownloadLink = (filename: string) => {
  if (typeof window === 'undefined') return
  const origin = window.location.origin
  const downloadUrl = `${origin}/api/shared-files/download/${encodeURIComponent(filename)}`
  navigator.clipboard.writeText(downloadUrl)
  success(`Tautan LAN untuk "${filename}" disalin!`)
}

const getQrCodeUrl = (filename: string) => {
  if (typeof window === 'undefined') return ''
  const origin = window.location.origin
  const downloadUrl = `${origin}/api/shared-files/download/${encodeURIComponent(filename)}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(downloadUrl)}`
}

const openQrModal = (file: SharedFileItem) => {
  qrActiveFile.value = file
  showQrModal.value = true
}

const openPreviewModal = (file: SharedFileItem) => {
  previewActiveFile.value = file
  showPreviewModal.value = true
}

const uploadSingleFileWithProgress = (queueItem: UploadQueueItem): Promise<boolean> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()
    formData.append('file', queueItem.file)

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        queueItem.progress = Math.round((e.loaded / e.total) * 100)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        queueItem.progress = 100
        queueItem.status = 'done'
        resolve(true)
      } else {
        queueItem.status = 'error'
        resolve(false)
      }
    })

    xhr.addEventListener('error', () => {
      queueItem.status = 'error'
      resolve(false)
    })

    xhr.open('POST', '/api/shared-files/upload')
    xhr.send(formData)
  })
}

const uploadFiles = async (fileList: FileList | File[]) => {
  const fileArray = Array.from(fileList)
  if (fileArray.length === 0) return

  uploadQueue.value = fileArray.map(f => ({
    file: f,
    progress: 0,
    status: 'pending'
  }))

  uploading.value = true
  let failed = 0

  for (let i = 0; i < uploadQueue.value.length; i++) {
    currentUploadIndex.value = i
    const item = uploadQueue.value[i]
    if (!item) continue
    item.status = 'uploading'
    const successResult = await uploadSingleFileWithProgress(item)
    if (!successResult) {
      failed++
    }
  }

  setTimeout(() => {
    uploading.value = false
    uploadQueue.value = []
    if (fileInput.value) fileInput.value.value = ''
    fetchFiles()
    if (failed === 0) {
      success(`${fileArray.length} berkas berhasil diunggah!`)
    } else {
      warning(`${failed} berkas gagal diunggah`)
    }
  }, 800)
}

const deleteFile = async (name: string) => {
  if (!confirm(`Hapus berkas "${name}" secara permanen?`)) return
  try {
    const res = await $fetch<{ success?: boolean; message?: string }>(`/api/shared-files/${encodeURIComponent(name)}`, {
      method: 'DELETE'
    })
    if (res?.success) {
      success(`Berkas "${name}" berhasil dihapus`)
      fetchFiles()
    }
  } catch (e: any) {
    error('Gagal menghapus berkas')
  }
}

onMounted(() => {
  fetchFiles()
  if (typeof window !== 'undefined') {
    window.addEventListener('dragenter', handleWindowDragEnter)
    window.addEventListener('dragover', (e) => e.preventDefault())
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('dragenter', handleWindowDragEnter)
  }
})
</script>
