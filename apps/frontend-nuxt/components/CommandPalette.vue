<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      @click.self="close" 
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in"
    >
      <div class="bg-card border border-border/80 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        <!-- Search Input Bar -->
        <div class="p-4 border-b border-border/80 flex items-center gap-3 bg-background/50">
          <span class="text-lg text-primary">🔍</span>
          <input 
            ref="searchInput" 
            v-model="query" 
            type="text" 
            placeholder="Cari video, novel, atau file share... (Tekan Esc untuk tutup)" 
            class="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
            @keydown.enter.prevent="selectCurrent"
            @keydown.esc="close"
          />
          <kbd class="hidden sm:inline-block text-[10px] bg-card border border-border text-muted-foreground px-2 py-0.5 rounded-md font-mono">ESC</kbd>
        </div>

        <!-- Search Results List -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-if="loading" class="py-8 flex justify-center"><div class="spinner"></div></div>

          <div v-else-if="!query.trim()" class="py-8 text-center text-xs text-muted-foreground">
            Ketik kata kunci untuk mencari di seluruh platform NexEo...
          </div>

          <div v-else-if="allResults.length === 0" class="py-8 text-center text-xs text-muted-foreground">
            Tidak ditemukan hasil untuk "<span class="text-foreground font-semibold">{{ query }}</span>"
          </div>

          <div v-else class="space-y-2">
            <div 
              v-for="(item, idx) in allResults" 
              :key="item.id || item.slug || item.name || idx" 
              @click="goToResult(item)" 
              @mouseenter="selectedIndex = idx" 
              :class="['p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3', selectedIndex === idx ? 'bg-primary/15 border-primary/50 text-foreground scale-[1.01]' : 'bg-card/40 border-border/60 text-muted-foreground hover:bg-card']"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-lg shrink-0">
                  {{ item.type === 'video' ? '🎬' : item.type === 'novel' ? '📖' : '📤' }}
                </div>
                <div class="min-w-0">
                  <h4 class="font-bold text-xs text-foreground truncate">{{ item.title || item.name }}</h4>
                  <p class="text-[10px] text-muted-foreground font-mono truncate">
                    {{ item.subtitle || item.category || item.sizeFormatted || item.type }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <span class="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-md bg-background border border-border text-primary">
                  {{ item.type }}
                </span>
                <span class="text-xs text-muted-foreground">↵</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Shortcuts Legend -->
        <div class="p-3 border-t border-border/60 bg-background/30 flex items-center justify-between text-[11px] text-muted-foreground px-4">
          <div class="flex items-center gap-3">
            <span><kbd class="bg-card border px-1.5 py-0.5 rounded text-[10px]">↑↓</kbd> Navigasi</span>
            <span><kbd class="bg-card border px-1.5 py-0.5 rounded text-[10px]">↵</kbd> Buka</span>
          </div>
          <span>NexEo Universal Search</span>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

interface SearchResult {
  type: 'video' | 'novel' | 'file'
  id?: string
  slug?: string
  name?: string
  title?: string
  subtitle?: string
  category?: string
  sizeFormatted?: string
  link: string
}

const isOpen = ref(false)
const query = ref('')
const loading = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)
const allResults = ref<SearchResult[]>([])
const router = useRouter()

function open() {
  isOpen.value = true
  query.value = ''
  allResults.value = []
  selectedIndex.value = 0
  nextTick(() => {
    searchInput.value?.focus()
  })
}

function close() {
  isOpen.value = false
}

function navigateDown() {
  if (allResults.value.length > 0) {
    selectedIndex.value = (selectedIndex.value + 1) % allResults.value.length
  }
}

function navigateUp() {
  if (allResults.value.length > 0) {
    selectedIndex.value = (selectedIndex.value - 1 + allResults.value.length) % allResults.value.length
  }
}

function selectCurrent() {
  const selected = allResults.value[selectedIndex.value]
  if (selected) {
    goToResult(selected)
  }
}

function goToResult(item: SearchResult) {
  close()
  router.push(item.link)
}

async function performSearch(q: string) {
  if (!q.trim()) {
    allResults.value = []
    return
  }

  loading.value = true
  const results: SearchResult[] = []

  try {
    const api = useApi()
    const lowerQ = q.toLowerCase()

    // 1. Search Videos
    try {
      const vidRes = await api.get<{ success?: boolean; data?: any[] }>(`/video/search?q=${encodeURIComponent(q)}`)
      if (vidRes?.data) {
        vidRes.data.forEach(v => {
          results.push({
            type: 'video',
            id: v.id,
            title: v.title || v.name,
            subtitle: `${v.folder || 'General'} • ${v.format}`,
            link: `/video/${encodeURIComponent(v.id)}`
          })
        })
      }
    } catch {}

    // 2. Search Novels
    try {
      const novRes = await api.get<{ success?: boolean; data?: any[] }>('/novels/library')
      if (novRes?.data) {
        novRes.data.filter(n => n.title?.toLowerCase().includes(lowerQ) || n.slug?.toLowerCase().includes(lowerQ)).forEach(n => {
          results.push({
            type: 'novel',
            slug: n.slug,
            title: n.title,
            subtitle: n.author ? `Author: ${n.author}` : 'Koleksi Novel',
            link: `/novels/${n.slug}`
          })
        })
      }
    } catch {}

    // 3. Search Shared Files
    try {
      const fileRes = await $fetch<any[]>('/api/shared-files')
      if (Array.isArray(fileRes)) {
        fileRes.filter(f => f.name?.toLowerCase().includes(lowerQ)).forEach(f => {
          results.push({
            type: 'file',
            name: f.name,
            title: f.name,
            subtitle: f.sizeFormatted || 'Shared File',
            link: '/share'
          })
        })
      }
    } catch {}

    allResults.value = results.slice(0, 15)
    selectedIndex.value = 0
  } catch (err) {
    console.error('Command Palette Search Error:', err)
  } finally {
    loading.value = false
  }
}

let searchTimeout: any = null
watch(query, (next) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    performSearch(next)
  }, 200)
})

function handleGlobalKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (isOpen.value) close()
    else open()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleGlobalKeydown)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleGlobalKeydown)
  }
})

defineExpose({ open, close })
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
