<template>
  <div class="file-share max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-white tracking-tight">Lokal Share</h1>
      <span class="text-gray-400 bg-gray-800 px-3 py-1 rounded-full text-sm">{{ files.length }} file</span>
    </div>

    <!-- Upload Dropzone -->
    <div 
      class="bg-gray-800/30 border-2 border-dashed rounded-2xl p-10 text-center mb-10 transition-colors"
      :class="isDragging ? 'border-brand bg-brand/10' : 'border-gray-700 hover:border-gray-500'"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <input type="file" ref="fileInput" class="hidden" multiple @change="handleFileSelect">
      
      <div v-if="!uploading" class="cursor-pointer">
        <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        </div>
        <p class="text-white font-medium text-lg mb-1">Klik atau tarik file ke sini</p>
        <p class="text-gray-500 text-sm">Ukuran maksimal 10GB per file</p>
      </div>
      
      <div v-else class="w-full max-w-md mx-auto">
        <p class="text-white font-medium mb-3">Mengunggah... {{ uploadProgress }}%</p>
        <div class="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div class="h-full bg-brand transition-all duration-300" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Files List -->
    <div>
      <h2 class="text-xl font-bold mb-4 text-white">File Dibagikan</h2>
      
      <div v-if="loading" class="flex justify-center py-10">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="files.length === 0" class="text-center py-10 bg-gray-800/50 rounded-xl border border-gray-800 text-gray-500">
        Belum ada file yang dibagikan.
      </div>
      
      <div v-else class="space-y-3">
        <div v-for="file in files" :key="file.name" class="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-600 transition-colors">
          <div class="flex items-center overflow-hidden">
            <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 mr-4 shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div class="min-w-0">
              <h4 class="text-gray-200 font-medium truncate" :title="file.name">{{ file.name }}</h4>
              <p class="text-xs text-gray-500">{{ file.sizeFormatted }} • {{ new Date(file.modified).toLocaleDateString('id-ID') }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <a :href="`/api/download/${encodeURIComponent(file.name)}`" download class="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors" title="Download">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
            <button @click="deleteFile(file.name)" class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" title="Hapus">
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

const files = ref([])
const loading = ref(true)
const isDragging = ref(false)
const uploading = ref(false)
const uploadProgress = ref(0)
const fileInput = ref(null)

const fetchFiles = async () => {
  loading.value = true
  try {
    const res = await fetch('/api/shared-files')
    if (res.ok) {
      files.value = await res.json()
    }
  } catch(e) {
    console.error("Failed to load files", e)
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
  uploading.value = true
  uploadProgress.value = 0
  
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            uploadProgress.value = Math.round((e.loaded / e.total) * 100)
          }
        })
        
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve()
          } else {
            reject(new Error(xhr.statusText))
          }
        })
        
        xhr.addEventListener('error', () => reject(new Error("Network Error")))
        
        xhr.open('POST', '/api/upload', true)
        xhr.send(formData)
      })
    } catch(e) {
      console.error(`Failed to upload ${file.name}`, e)
      alert(`Gagal mengunggah ${file.name}`)
    }
  }
  
  uploading.value = false
  uploadProgress.value = 0
  if(fileInput.value) fileInput.value.value = ''
  fetchFiles()
}

const deleteFile = async (filename) => {
  if(!confirm(`Hapus file ${filename}?`)) return
  
  try {
    const res = await fetch(`/api/shared-files/${encodeURIComponent(filename)}`, {
      method: 'DELETE'
    })
    if(res.ok) {
      fetchFiles()
    }
  } catch(e) {
    console.error("Failed to delete file", e)
  }
}

onMounted(() => {
  fetchFiles()
})
</script>
