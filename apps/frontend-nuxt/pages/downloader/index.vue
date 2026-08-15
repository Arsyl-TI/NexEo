<template>
  <div class="downloader-page p-4 md:p-8 max-w-6xl mx-auto pb-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
          <span>⚡</span> Downloader Queue Manager
        </h1>
        <p class="text-xs text-muted-foreground mt-1">Kelola dan pantau antrean unduhan otomatis di latar belakang server Nitro</p>
      </div>
      
      <div class="flex items-center gap-2 flex-wrap">
        <span v-if="hasActiveDownloads" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold animate-pulse">
          <span class="w-2 h-2 rounded-full bg-sky-400"></span> Live Processing
        </span>
        <button @click="downloaderStore.fetchTasks()" class="px-4 py-2 rounded-xl bg-card border border-border text-foreground hover:bg-border text-xs font-semibold transition-all flex items-center gap-2 shadow-sm">
          <span>🔄</span> Refresh Manual
        </button>
      </div>
    </div>

    <!-- Add Task Card (Single vs Batch Mode) -->
    <div class="bg-card/70 border border-border/80 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-xl">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 class="text-base font-bold text-foreground flex items-center gap-2">
          <span>📥</span> Tambah Tugas Unduhan
        </h2>

        <!-- Mode Toggle Tabs -->
        <div class="flex items-center bg-background border border-border rounded-xl p-1 gap-1">
          <button 
            type="button"
            @click="isBatchMode = false" 
            :class="['px-3 py-1 rounded-lg text-xs font-semibold transition-all', !isBatchMode ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground']"
          >
            Tunggal (Single URL)
          </button>
          <button 
            type="button"
            @click="isBatchMode = true" 
            :class="['px-3 py-1 rounded-lg text-xs font-semibold transition-all', isBatchMode ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground']"
          >
            📋 Banyak (Batch Multi-URL)
          </button>
        </div>
      </div>

      <!-- SINGLE URL MODE FORM -->
      <form v-if="!isBatchMode" @submit.prevent="handleAddTask" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Judul / Nama Tugas</label>
          <input 
            v-model="newTitle" 
            type="text" 
            placeholder="Contoh: Download File ZIP / Video MP4..." 
            class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-inner" 
            required 
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-1">
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">URL Sumber Langsung (HTTP/HTTPS)</label>
            <input 
              v-model="newUrl" 
              type="url" 
              placeholder="https://domain.com/file.zip" 
              class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-inner" 
              required 
            />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Kategori Tipe</label>
            <select v-model="newType" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary">
              <option value="file">📁 Berkas Umum</option>
              <option value="novel">📚 Novel (EPUB/TXT)</option>
              <option value="video">🎬 Video (MP4/MKV)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Lokasi Tujuan Simpan</label>
            <select v-model="newTargetFolder" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary">
              <option value="uploads">📤 Shared Files (uploads/)</option>
              <option value="novels">📚 Pustaka Novel (data/novels/)</option>
              <option value="video">🎬 Folder Video (D:\Video)</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="btn-primary px-6 py-2.5 text-xs font-bold shadow-lg flex items-center" :disabled="submitting">
            <span v-if="submitting" class="spinner border-2 w-3.5 h-3.5 mr-2"></span>
            <span>{{ submitting ? 'Menambahkan...' : '+ Tambah ke Antrean' }}</span>
          </button>
        </div>
      </form>

      <!-- BATCH MULTI-URL MODE FORM -->
      <form v-else @submit.prevent="handleBatchAddTasks" class="space-y-4">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tempel Banyak URL (1 Tautan per Baris)</label>
            <span class="text-[11px] text-muted-foreground font-mono">{{ parsedBatchUrls.length }} URL terdeteksi</span>
          </div>
          <textarea 
            v-model="batchUrlsText" 
            rows="5" 
            placeholder="https://example.com/video-ep01.mp4&#10;https://example.com/video-ep02.mp4&#10;https://example.com/book.epub"
            class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-inner"
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Kategori Tipe</label>
            <select v-model="newType" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary">
              <option value="file">📁 Berkas Umum</option>
              <option value="novel">📚 Novel (EPUB/TXT)</option>
              <option value="video">🎬 Video (MP4/MKV)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Lokasi Tujuan Simpan</label>
            <select v-model="newTargetFolder" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary">
              <option value="uploads">📤 Shared Files (uploads/)</option>
              <option value="novels">📚 Pustaka Novel (data/novels/)</option>
              <option value="video">🎬 Folder Video (D:\Video)</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button type="submit" class="btn-primary px-6 py-2.5 text-xs font-bold shadow-lg flex items-center" :disabled="submitting || parsedBatchUrls.length === 0">
            <span v-if="submitting" class="spinner border-2 w-3.5 h-3.5 mr-2"></span>
            <span>{{ submitting ? 'Memproses Antrean...' : `+ Masukkan ${parsedBatchUrls.length} Unduhan ke Antrean` }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Tasks List Card -->
    <div class="bg-card/70 border border-border/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
      <!-- Filter Bar & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-border/60 pb-4">
        <!-- Status Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button 
            v-for="tab in filterTabs" 
            :key="tab.id"
            @click="currentFilter = tab.id"
            :class="['px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0', currentFilter === tab.id ? 'bg-primary text-white shadow-md' : 'bg-background border border-border text-muted-foreground hover:text-foreground']"
          >
            {{ tab.label }} ({{ tab.count }})
          </button>
        </div>

        <div class="flex items-center gap-2 self-end sm:self-auto">
          <button 
            v-if="completedTasksCount > 0"
            @click="clearCompletedTasks" 
            class="px-3 py-1.5 bg-card hover:bg-border border border-border rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5"
          >
            <span>🗑️</span> Bersihkan Selesai ({{ completedTasksCount }})
          </button>
        </div>
      </div>
      
      <div v-if="downloaderStore.loading && tasks.length === 0" class="flex justify-center py-16">
        <div class="spinner"></div>
      </div>

      <div v-else-if="filteredTasks.length === 0" class="text-center py-16 bg-card/30 border border-border rounded-2xl text-muted-foreground text-sm">
        Tidak ada tugas dalam kategori ini.
      </div>

      <div v-else class="space-y-3.5">
        <div 
          v-for="task in filteredTasks" 
          :key="task.id" 
          :class="['border rounded-2xl p-4 transition-all duration-300 backdrop-blur-md', task.status === 'downloading' ? 'bg-primary/10 border-primary/50 shadow-primary/10 shadow-xl animate-pulse-glow' : 'bg-card/50 border-border/80 hover:border-border']"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2.5 mb-1.5 flex-wrap">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm" :class="getStatusBadgeClass(task.status)">
                  {{ getStatusLabel(task.status) }}
                </span>
                <h3 class="font-bold text-sm text-foreground truncate" :title="task.title">{{ task.title }}</h3>
              </div>

              <div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
                <span class="truncate max-w-md" :title="task.source.url">🌐 {{ task.source.url }}</span>
                <span>•</span>
                <span>📍 {{ getTargetFolderLabel(task.targetFolder) }}</span>
                <span v-if="task.speedFormatted" class="text-sky-400 font-bold">⚡ {{ task.speedFormatted }}</span>
              </div>
              
              <!-- Progress Bar -->
              <div v-if="task.status === 'downloading' || task.status === 'pending'" class="mt-3">
                <div class="flex justify-between text-[11px] font-mono mb-1 text-muted-foreground">
                  <span>Progres Unduhan</span>
                  <span class="font-bold text-foreground">{{ task.progress }}%</span>
                </div>
                <div class="w-full h-2.5 bg-background border border-border rounded-full overflow-hidden shadow-inner">
                  <div 
                    class="h-full transition-all duration-300 rounded-full" 
                    :class="task.status === 'downloading' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-amber-500/50'" 
                    :style="{ width: `${task.progress}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Action Controls -->
            <div class="flex items-center gap-2 self-end md:self-center shrink-0 flex-wrap">
              <button 
                v-if="task.status === 'failed' || task.status === 'cancelled'"
                @click="retryTask(task)"
                class="px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:bg-sky-500/25 text-xs font-semibold transition-all flex items-center gap-1"
                title="Unduh Ulang"
              >
                <span>🔄</span> Ulangi
              </button>

              <button 
                v-if="task.status === 'downloading' || task.status === 'pending'" 
                @click="cancelTask(task.id)" 
                class="px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold transition-all"
              >
                Batal
              </button>
              <button 
                @click="deleteTask(task.id)" 
                class="px-3 py-1.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-border text-xs font-semibold transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDownloaderStore } from '~/stores/downloader'
import { useToast } from '~/composables/useToast'

const downloaderStore = useDownloaderStore()
const { success, error } = useToast()

const isBatchMode = ref(false)
const newTitle = ref('')
const newUrl = ref('')
const batchUrlsText = ref('')
const newType = ref<'file' | 'novel' | 'video' | 'episode'>('file')
const newTargetFolder = ref<string>('uploads')
const submitting = ref(false)
const currentFilter = ref<'all' | 'active' | 'completed' | 'failed'>('all')
let pollTimer: any = null

const tasks = computed(() => downloaderStore.tasks)

const parsedBatchUrls = computed(() => {
  if (!batchUrlsText.value.trim()) return []
  return batchUrlsText.value
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('http://') || line.startsWith('https://'))
})

const hasActiveDownloads = computed(() => {
  return tasks.value.some(t => t.status === 'downloading' || t.status === 'pending')
})

const completedTasksCount = computed(() => {
  return tasks.value.filter(t => t.status === 'completed').length
})

const filterTabs = computed(() => [
  { id: 'all' as const, label: 'Semua', count: tasks.value.length },
  { id: 'active' as const, label: '⚡ Aktif', count: tasks.value.filter(t => t.status === 'downloading' || t.status === 'pending').length },
  { id: 'completed' as const, label: '✓ Selesai', count: tasks.value.filter(t => t.status === 'completed').length },
  { id: 'failed' as const, label: '❌ Gagal/Batal', count: tasks.value.filter(t => t.status === 'failed' || t.status === 'cancelled').length }
])

const filteredTasks = computed(() => {
  if (currentFilter.value === 'active') {
    return tasks.value.filter(t => t.status === 'downloading' || t.status === 'pending')
  }
  if (currentFilter.value === 'completed') {
    return tasks.value.filter(t => t.status === 'completed')
  }
  if (currentFilter.value === 'failed') {
    return tasks.value.filter(t => t.status === 'failed' || t.status === 'cancelled')
  }
  return tasks.value
})

const getTargetFolderLabel = (target?: string) => {
  if (target === 'novels') return 'Pustaka Novel (data/novels/)'
  if (target === 'video') return 'Folder Video (D:\\Video)'
  return 'Shared Files (uploads/)'
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Selesai'
    case 'downloading': return 'Mengunduh...'
    case 'failed': return 'Gagal'
    case 'cancelled': return 'Dibatalkan'
    default: return 'Antrean'
  }
}

function extractFilenameFromUrl(url: string, index: number): string {
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname
    const basename = pathname.substring(pathname.lastIndexOf('/') + 1)
    if (basename && basename.includes('.')) {
      return decodeURIComponent(basename)
    }
  } catch {}
  return `Unduhan Batch #${index + 1}`
}

const handleAddTask = async () => {
  if (!newTitle.value || !newUrl.value) return
  submitting.value = true
  try {
    await downloaderStore.addTask(
      newTitle.value, 
      { type: newType.value, url: newUrl.value },
      newTargetFolder.value
    )
    success(`Tugas "${newTitle.value}" berhasil ditambahkan ke antrean!`)
    newTitle.value = ''
    newUrl.value = ''
  } catch (e: any) {
    error('Gagal menambahkan tugas unduhan.')
  } finally {
    submitting.value = false
  }
}

const handleBatchAddTasks = async () => {
  const urls = parsedBatchUrls.value
  if (urls.length === 0) return

  submitting.value = true
  let successCount = 0

  try {
    for (let i = 0; i < urls.length; i++) {
      const u = urls[i]
      const title = extractFilenameFromUrl(u, i)
      await downloaderStore.addTask(
        title,
        { type: newType.value, url: u },
        newTargetFolder.value
      )
      successCount++
    }
    success(`Berhasil menambahkan ${successCount} tugas ke antrean unduhan!`)
    batchUrlsText.value = ''
    isBatchMode.value = false
  } catch (e: any) {
    error(`Menambahkan ${successCount} dari ${urls.length} tugas ke antrean.`)
  } finally {
    submitting.value = false
  }
}

const retryTask = async (task: any) => {
  try {
    await downloaderStore.addTask(
      task.title,
      task.source,
      task.targetFolder
    )
    success(`Tugas "${task.title}" dimasukkan kembali ke antrean!`)
  } catch {
    error('Gagal mengulangi tugas unduhan.')
  }
}

const clearCompletedTasks = async () => {
  const completed = tasks.value.filter(t => t.status === 'completed')
  for (const t of completed) {
    await downloaderStore.deleteTask(t.id)
  }
  success('Seluruh tugas yang selesai telah dibersihkan.')
}

const cancelTask = async (id: string) => {
  await downloaderStore.cancelTask(id)
}

const deleteTask = async (id: string) => {
  await downloaderStore.deleteTask(id)
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    case 'downloading': return 'bg-sky-500/20 text-sky-300 border-sky-500/40'
    case 'failed': return 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    case 'cancelled': return 'bg-gray-800 text-gray-400 border-gray-700'
    default: return 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  }
}

onMounted(async () => {
  await downloaderStore.fetchTasks()
  // Auto-poll live progress every 2.5s
  pollTimer = setInterval(() => {
    if (hasActiveDownloads.value) {
      downloaderStore.fetchTasks(true)
    }
  }, 2500)
})

onBeforeUnmount(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style scoped>
.spinner { width: 1.5rem; height: 1.5rem; border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
