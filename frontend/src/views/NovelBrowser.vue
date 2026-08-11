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
                  <img v-if="selectedNovelDetail.cover" :src="selectedNovelDetail.cover" class="object-cover w-full h-full" loading="lazy" @error="$event.target.style.display='none'">
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
                  <button @click="addToLibrary(selectedNovelDetail)" class="flex-1 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                    Tambah ke Perpustakaan
                  </button>
                  <a v-if="selectedNovelDetail.sourceUrl" :href="selectedNovelDetail.sourceUrl" target="_blank" class="flex-1 px-4 py-2 bg-card text-card-foreground rounded-lg hover:bg-border transition-colors text-sm font-medium flex items-center justify-center">
                    Buka Sumber â†—
                  </a>
                </div>
              </div>
            </div>

            <!-- Tabs & Content -->
            <nav class="mb-6 border-b border-border">
              <button v-for="tab in ['synopsis', 'info']" :key="tab" @click="detailTab = tab" :class="['px-4 py-3 text-sm border-b-2 capitalize', detailTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground']">
                {{ tab }}
              </button>
            </nav>

            <section v-if="detailTab === 'synopsis'" class="bg-card/40 rounded-xl p-6">
              <h2 class="text-lg font-bold text-foreground mb-3">Sinopsis</h2>
              <div class="text-card-foreground text-sm leading-relaxed">{{ selectedNovelDetail.description || 'Tidak ada sinopsis tersedia.' }}</div>
            </section>

            <section v-else class="bg-card/40 rounded-xl p-6">
              <h2 class="text-lg font-bold text-foreground mb-3">Informasi</h2>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div v-if="selectedNovelDetail.author" class="text-muted-foreground">Author: <span class="text-foreground">{{ selectedNovelDetail.author }}</span></div>
                <div v-if="selectedNovelDetail.status" class="text-muted-foreground">Status: <span class="text-foreground">{{ selectedNovelDetail.status }}</span></div>
                <div v-if="selectedNovelDetail.language" class="text-muted-foreground">Language: <span class="text-foreground">{{ selectedNovelDetail.language }}</span></div>
                <div v-if="selectedNovelDetail.type" class="text-muted-foreground">Type: <span class="text-foreground">{{ selectedNovelDetail.type }}</span></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Source Selector & Search -->
    <div class="bg-card/50 border border-border/50 rounded-2xl p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <!-- Source Dropdown -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-card-foreground mb-2">Sumber Novel</label>
          <select 
            v-model="selectedSource"
            class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-card-foreground focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all appearance-none"
          >
            <option value="">-- Pilih Sumber --</option>
            <option v-for="source in sources" :key="source.id" :value="source.id">
              {{ source.name }}
            </option>
          </select>
        </div>

        <!-- Search Input -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-card-foreground mb-2">Cari Novel</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              @keyup.enter="performSearch"
              class="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all"
              placeholder="Ketik nama novel..."
            />
          </div>
        </div>

        <!-- Search Button -->
        <button
          @click="performSearch"
          :disabled="!selectedSource || !searchQuery || isSearching"
          class="px-6 py-2.5 bg-primary text-foreground rounded-xl text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <svg v-if="isSearching" class="animate-spin w-4 h-4 inline mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSearching ? 'Mencari...' : 'Cari' }}
        </button>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchPerformed">
      <h2 class="text-xl font-bold text-foreground mb-4">
        Hasil Pencarian: <span class="text-primary">{{ searchResults.length }}</span> novel ditemukan
      </h2>

      <div v-if="searchResults.length === 0" class="text-center py-10 bg-card/30 rounded-xl border border-border/50 text-muted-foreground">
        Tidak ada hasil pencarian. Coba kata kunci lain.
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="novel in searchResults"
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
              @error="$event.target.style.display='none'"
            />
            <div v-else class="flex items-center justify-center w-full h-full text-muted-foreground text-sm">No Cover</div>

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <span class="text-foreground text-sm font-semibold bg-primary px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-brand/30">LIHAT DETAIL</span>
            </div>
          </div>
          <h3 class="font-semibold text-sm text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">{{ novel.title }}</h3>
          <p class="text-xs text-muted-foreground mt-1">{{ novel.author || 'Unknown' }}</p>
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

const sources = ref([])
const selectedSource = ref('')
const searchQuery = ref('')
const isSearching = ref(false)
const searchPerformed = ref(false)
const searchResults = ref([])
const selectedNovel = ref(null)
const selectedNovelDetail = ref(null)
const isLoadingDetail = ref(false)
const detailTab = ref('synopsis')

const loadSources = async () => {
  try {
    const res = await axios.get('/api/novels/sources')
    sources.value = res.data
  } catch (error) {
    console.error('Failed to load sources:', error)
    showToast('Gagal memuat daftar sumber', 'error')
  }
}

const performSearch = async () => {
  if (!selectedSource.value || !searchQuery.value) return

  isSearching.value = true
  try {
    const res = await axios.get(
      `/api/novels/sources/${selectedSource.value}/search`,
      {
        params: { q: searchQuery.value }
      }
    )
    searchResults.value = res.data.results
    searchPerformed.value = true
  } catch (error) {
    console.error('Search error:', error)
    showToast('Gagal melakukan pencarian', 'error')
  } finally {
    isSearching.value = false
  }
}

const openNovelDetail = async (novel) => {
  selectedNovel.value = novel
  selectedNovelDetail.value = null
  detailTab.value = 'synopsis'
  isLoadingDetail.value = true
  try {
    const res = await axios.get(
      `/api/novels/sources/${selectedSource.value}/novel/${novel.slug}`
    )
    selectedNovelDetail.value = res.data
  } catch (error) {
    console.error('Failed to load detail:', error)
    showToast('Gagal memuat detail novel', 'error')
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

const addToLibrary = async (novel) => {
  showToast(`Novel "${novel.title}" - fitur import sedang dikembangkan`, 'info')
}

onMounted(() => {
  loadSources()
})
</script>
