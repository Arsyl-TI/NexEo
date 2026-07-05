<template>
  <div class="novel-library">
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <h1 class="text-3xl font-bold text-white tracking-tight">Koleksi Novel</h1>
        <span class="text-gray-400 bg-gray-800 px-3 py-1 rounded-full text-sm">{{ library.length }} novel</span>
      </div>
      
      <button 
        @click="updateCatalog" 
        :disabled="isUpdating"
        class="flex items-center gap-2 bg-brand/20 hover:bg-brand/30 border border-brand/50 text-brand px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="isUpdating" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        {{ isUpdating ? 'Memperbarui...' : 'Perbarui Katalog' }}
      </button>
    </div>
    
    <div class="flex flex-col md:flex-row gap-4 mb-8 bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50">
      <div class="flex-1 relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" 
          placeholder="Cari judul novel..."
        />
      </div>
      
      <div class="w-full md:w-64">
        <select 
          v-model="selectedTag"
          class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-300 focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all appearance-none"
        >
          <option value="">Semua Genre</option>
          <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>
    </div>
    
    <div v-if="loading" class="flex justify-center py-20">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="filteredLibrary.length === 0" class="text-center py-20">
      <p class="text-gray-500 text-lg">Tidak ada novel yang sesuai kriteria pencarian.</p>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <router-link 
        v-for="novel in filteredLibrary" 
        :key="novel.id" 
        :to="`/novels/${novel.folderName}`"
        class="group flex flex-col"
      >
        <div class="aspect-[2/3] w-full rounded-xl overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-brand transition-all shadow-lg relative mb-3">
          <img v-if="novel.localThumbnail" :src="`/api/novels/static/${novel.localThumbnail}`" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div v-else class="flex items-center justify-center w-full h-full text-gray-500 text-sm">No Cover</div>
          
          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span class="text-white text-xs font-semibold bg-brand px-2 py-1 rounded">BACA</span>
          </div>
        </div>
        <h3 class="font-semibold text-sm text-gray-300 line-clamp-2 group-hover:text-brand transition-colors">{{ novel.title }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const library = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedTag = ref('')
const isUpdating = ref(false)

const availableTags = computed(() => {
  const tags = new Set()
  library.value.forEach(novel => {
    if (novel.tags && Array.isArray(novel.tags)) {
      novel.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

const filteredLibrary = computed(() => {
  return library.value.filter(novel => {
    const matchSearch = novel.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchTag = selectedTag.value === '' || (novel.tags && novel.tags.includes(selectedTag.value))
    return matchSearch && matchTag
  })
})

const fetchLibrary = async () => {
  try {
    const res = await fetch('/api/novels/library')
    if(res.ok) {
      library.value = await res.json()
    }
  } catch(e) {
    console.error("Failed to load novel library", e)
  }
}

const updateCatalog = async () => {
  if (isUpdating.value) return
  isUpdating.value = true
  
  try {
    const res = await fetch('/api/novels/update', { method: 'POST' })
    if (res.ok) {
      alert("Proses pembaruan katalog sedang berjalan di latar belakang. Halaman akan otomatis dimuat ulang jika sudah selesai (kira-kira beberapa menit).")
      // Check again after 10s
      setTimeout(fetchLibrary, 10000)
    }
  } catch(e) {
    console.error("Gagal memulai pembaruan", e)
    alert("Gagal memulai pembaruan katalog.")
  } finally {
    isUpdating.value = false
  }
}

onMounted(async () => {
  await fetchLibrary()
  loading.value = false
})
</script>
