<template>
  <div class="file-share max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-foreground tracking-tight">Lokal Share</h1>
      <span class="text-muted-foreground bg-card px-3 py-1 rounded-full text-sm">{{ files.length }} file</span>
    </div>

    <!-- Upload Dropzone -->
    <div 
      class="bg-card/30 border-2 border-dashed rounded-2xl p-10 text-center mb-10 transition-colors"
      :class="isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-muted-foreground'"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input type="file" ref="fileInput" class="hidden" multiple @change="handleFileSelect">
      
      <div v-if="!uploading" class="cursor-pointer">
        <div class="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        </div>
        <p class="text-foreground font-medium text-lg mb-1">Klik atau tarik file ke sini</p>
        <p class="text-muted-foreground text-sm">Ukuran maksimal 10GB per file</p>
      </div>
      
      <div v-else class="w-full max-w-md mx-auto">
        <p class="text-foreground font-medium mb-3">
          <span v-if="uploadComplete" class="text-success flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Selesai
          </span>
          <span v-else>Mengunggah... {{ uploadProgress }}%</span>
        </p>
        <div class="w-full h-3 bg-card rounded-full overflow-hidden">
          <div class="h-full transition-all duration-300" :class="uploadComplete ? 'bg-success' : 'bg-primary'" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Files List -->
    <div>
      <h2 class="text-xl font-bold mb-4 text-foreground">File Dibagikan</h2>
      
      <div v-if="loading" class="flex justify-center py-10">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="files.length === 0" class="text-center py-10 bg-card/50 rounded-xl border border-card text-muted-foreground">
        Belum ada file yang dibagikan.
      </div>
      
      <div v-else class="space-y-3">
        <div v-for="file in files" :key="file.name" class="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-muted-foreground transition-colors">
          <div class="flex items-center overflow-hidden">
            <div class="w-10 h-10 bg-border rounded-lg flex items-center justify-center text-muted-foreground mr-4 shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div class="min-w-0">
              <h4 class="text-foreground font-medium truncate" :title="file.name">{{ file.name }}</h4>
              <p class="text-xs text-muted-foreground">{{ file.sizeFormatted }} â€¢ {{ new Date(file.modified).toLocaleDateString('id-ID') }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <a :href="`/api/download/${encodeURIComponent(file.name)}`" download class="p-2 text-muted-foreground hover:text-foreground hover:bg-border rounded-lg transition-colors" title="Download">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
            <button @click="deleteFile(file.name)" class="p-2 text-muted-foreground hover:text-error hover:bg-error/10 rounded-lg transition-colors" title="Hapus">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from '../composables/useToast'

const { showToast } = useToast()

const files = ref([])
const loading = ref(true)
const isDragging = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadComplete = ref(false)
const fileInput = ref(null)

const fetchFiles = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/shared-files')
    files.value = res.data
  } catch(e) {
    console.error("Failed to load files", e)
    showToast("Gagal memuat file yang dibagikan", "error")
  } finally {
    loading.value = false
  }
}

const handleFileSelect = (e) => {
  if (e.target.files.length > 0) {
    uploadFiles(e.target.files)
  }
}

const handleDrop = (e) => {
  isDragging.value = false
  if (e.dataTransfer.files.length > 0) {
    uploadFiles(e.dataTransfer.files)
  }
}

const uploadFiles = async (fileList) => {
  // Validasi ukuran file
  const maxSize = 10 * 1024 * 1024 * 1024 // 10GB
  for (let file of fileList) {
    if (file.size > maxSize) {
      showToast(`File "${file.name}" melebihi batas maksimal 10GB`, "error")
      return
    }
  }
  
  uploading.value = true
  uploadComplete.value = false
  uploadProgress.value = 0
  let failed = 0
  
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      await axios.post('/api/upload', formData, {
        onUploadProgress: (e) => {
          if (e.total) uploadProgress.value = Math.round((e.loaded / e.total) * 100)
        }
      })
    } catch(e) {
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
      showToast(`${fileList.length} file berhasil diunggah`, "success")
    } else {
      showToast(`${failed} file gagal diunggah`, "warning")
    }
  }, 1000)
}

const deleteFile = async (filename) => {
  if(!confirm(`Hapus file ${filename}?`)) return
  
  try {
    await axios.delete(`/api/shared-files/${encodeURIComponent(filename)}`)
    showToast(`File ${filename} berhasil dihapus`, "success")
    fetchFiles()
  } catch(e) {
    console.error("Failed to delete file", e)
    showToast(`Terjadi kesalahan saat menghapus`, "error")
  }
}

onMounted(() => {
  fetchFiles()
})
</script>
