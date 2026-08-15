<template>
  <div class="file-share max-w-5xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-foreground tracking-tight mb-1">Berbagi Berkas Lokal (LAN)</h1>
        <p class="text-xs text-muted-foreground">Unggah dan bagikan file instan antar perangkat di jaringan Wi-Fi / LAN yang sama</p>
      </div>
      <span class="text-muted-foreground bg-card border border-border px-3.5 py-1.5 rounded-full text-xs font-mono font-medium">{{ files.length }} berkas</span>
    </div>

    <!-- Upload Dropzone -->
    <div 
      class="bg-card/40 border-2 border-dashed rounded-3xl p-10 text-center mb-8 transition-all duration-300 backdrop-blur-xl"
      :class="isDragging ? 'border-primary bg-primary/10 shadow-primary/20 shadow-2xl scale-[1.01]' : 'border-border/80 hover:border-primary/50 hover:bg-card/60'"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="fileInput?.click()"
    >
      <input type="file" ref="fileInput" class="hidden" multiple @change="handleFileSelect">
      
      <div v-if="!uploading" class="cursor-pointer">
        <div class="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        </div>
        <p class="text-foreground font-semibold text-lg mb-1">Klik atau seret berkas ke sini</p>
        <p class="text-muted-foreground text-xs">Mendukung berkas besar hingga 10GB per file</p>
      </div>
      
      <div v-else class="w-full max-w-md mx-auto">
        <p class="text-foreground font-medium mb-3 text-sm">
          <span v-if="uploadComplete" class="text-emerald-400 flex items-center justify-center font-bold">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Pengunggahan Selesai!
          </span>
          <span v-else>Mengunggah berkas... {{ uploadProgress }}%</span>
        </p>
        <div class="w-full h-3 bg-card border border-border rounded-full overflow-hidden shadow-inner">
          <div class="h-full transition-all duration-300" :class="uploadComplete ? 'bg-emerald-500' : 'bg-primary'" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Category Filter Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1">
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
        <input v-model="searchQuery" type="text" placeholder="Cari nama berkas..." class="w-full pl-9 pr-4 py-1.5 bg-background border border-border rounded-full text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary">
        <span class="absolute left-3 top-2 text-xs text-muted-foreground">🔍</span>
      </div>
    </div>

    <!-- Files List -->
    <div>
      <div v-if="loading" class="flex justify-center py-12"><div class="spinner"></div></div>
      
      <div v-else-if="filteredFiles.length === 0" class="text-center py-16 bg-card/40 rounded-2xl border border-border/60 text-muted-foreground text-sm">
        Tidak ada berkas yang cocok dengan pencarian atau filter.
      </div>
      
      <div v-else class="space-y-3">
        <div v-for="file in filteredFiles" :key="file.name" class="bg-card/70 border border-border/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-all shadow-md">
          <div class="flex items-center overflow-hidden">
            <div class="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary text-xl mr-3.5 shrink-0">
              {{ getFileIcon(file.name) }}
            </div>
            <div class="min-w-0">
              <h4 class="text-foreground font-semibold text-sm truncate" :title="file.name">{{ file.name }}</h4>
              <p class="text-xs text-muted-foreground font-mono mt-0.5">{{ file.sizeFormatted }} • {{ new Date(file.modified).toLocaleDateString('id-ID') }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 shrink-0">
            <!-- Copy Link Button -->
            <button @click="copyDownloadLink(file.name)" class="px-3 py-1.5 bg-card hover:bg-border border border-border rounded-xl text-xs font-semibold text-foreground transition-all flex items-center gap-1.5" title="Salin Tautan Unduh">
              <span>📋</span> Salin Link
            </button>
            <a :href="`/api/shared-files/download/${encodeURIComponent(file.name)}`" download class="p-2 text-muted-foreground hover:text-foreground hover:bg-border/80 border border-border rounded-xl transition-colors" title="Download">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
            <button @click="deleteFile(file.name)" class="p-2 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 border border-border rounded-xl transition-colors" title="Hapus">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

export interface SharedFileItem {
  name: string
  size: number
  sizeFormatted: string
  modified: string
}

// Nuxt 3 auto-imports composables from composables/ directory
const { error, success, warning } = useToast()

const files = ref<SharedFileItem[]>([])
const loading = ref(true)
const isDragging = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadComplete = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const selectedCategory = ref('all')
const searchQuery = ref('')

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

const fetchFiles = async () => {
  loading.value = true
  try {
    const res = await $fetch<SharedFileItem[]>('/api/shared-files')
    files.value = res || []
  } catch(e: any) {
    console.error("Failed to load files", e)
    error("Gagal memuat file yang dibagikan")
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

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    uploadFiles(e.dataTransfer.files)
  }
}

const copyDownloadLink = (filename: string) => {
  if (typeof window === 'undefined') return
  const origin = window.location.origin
  const downloadUrl = `${origin}/api/shared-files/download/${encodeURIComponent(filename)}`
  navigator.clipboard.writeText(downloadUrl)
  success(`Tautan unduh untuk "${filename}" disalin!`)
}

const uploadFiles = async (fileList: FileList | File[]) => {
  const fileArray = Array.from(fileList)
  const maxSize = 10 * 1024 * 1024 * 1024 // 10GB
  for (const file of fileArray) {
    if (file.size > maxSize) {
      error(`File "${file.name}" melebihi batas maksimal 10GB`)
      return
    }
  }
  
  uploading.value = true
  uploadComplete.value = false
  uploadProgress.value = 0
  let failed = 0
  
  for (const file of fileArray) {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      await $fetch('/api/shared-files/upload', {
        method: 'POST',
        body: formData
      })
    } catch(e: any) {
      console.error(`Failed to upload ${file.name}`, e)
      failed++
    }
  }
  
  uploadProgress.value = 100
  uploadComplete.value = true
  
  setTimeout(() => {
    uploading.value = false
    uploadProgress.value = 0
    uploadComplete.value = false
    if(fileInput.value) fileInput.value.value = ''
    fetchFiles()
    if(failed === 0) {
      success(`${fileArray.length} berkas berhasil diunggah`)
    } else {
      warning(`${failed} berkas gagal diunggah`)
    }
  }, 1000)
}

const deleteFile = async (filename: string) => {
  if(!confirm(`Hapus berkas ${filename}?`)) return
  
  try {
    await $fetch(`/api/shared-files/${encodeURIComponent(filename)}`, { method: 'DELETE' })
    success(`Berkas ${filename} berhasil dihapus`)
    fetchFiles()
  } catch(e: any) {
    console.error("Failed to delete file", e)
    error(`Terjadi kesalahan saat menghapus`)
  }
}

onMounted(() => {
  fetchFiles()
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
