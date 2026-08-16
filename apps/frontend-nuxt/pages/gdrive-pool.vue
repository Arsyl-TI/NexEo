<template>
  <div class="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Top Title Header & Actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/60 border border-border/80 p-6 rounded-3xl backdrop-blur-xl shadow-xl">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <span>☁️</span>
            <span>Google Drive Storage Pool Engine</span>
          </h1>
          <p class="text-xs text-muted-foreground mt-1 leading-relaxed max-w-2xl">
            Penggabung multi-akun Google Drive otomatis menjadi 1 ruang penyimpanan virtual raksasa (50GB - 500GB+). Upload berkas otomatis mengalihkan penyimpanan (*auto-overflow / failover*) saat akun sebelumnya penuh.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <button 
            @click="showAddAccountModal = true" 
            class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <span>➕</span> Tambah Akun GDrive
          </button>

          <button 
            @click="fetchPoolData" 
            :disabled="loading"
            class="p-2.5 bg-card hover:bg-border border border-border rounded-xl text-muted-foreground hover:text-foreground transition-all shadow-sm"
            title="Segarkan Data Pool"
          >
            <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          </button>
        </div>
      </div>

      <!-- Pooled Storage Analytics Capacity Meter Banner -->
      <div class="bg-card/70 border border-border/80 p-6 rounded-3xl shadow-xl backdrop-blur-xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kapasitas Total Storage Pool</span>
            <div class="flex items-baseline gap-3 mt-1">
              <span class="text-3xl font-extrabold text-foreground font-mono">{{ poolStats.totalBytesFormatted }}</span>
              <span class="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Sisa {{ poolStats.freeBytesFormatted }} Bebas
              </span>
            </div>
          </div>

          <div class="flex items-center gap-4 text-xs font-mono">
            <div class="bg-background border border-border/80 px-3 py-1.5 rounded-xl">
              <span class="text-muted-foreground">Terpakai: </span>
              <span class="font-bold text-amber-400">{{ poolStats.usedBytesFormatted }}</span>
            </div>
            <div class="bg-background border border-border/80 px-3 py-1.5 rounded-xl">
              <span class="text-muted-foreground">Akun Terhubung: </span>
              <span class="font-bold text-primary">{{ accounts.length }} Akun</span>
            </div>
          </div>
        </div>

        <!-- Visual Storage Progress Bar -->
        <div class="w-full h-4 bg-background border border-border/80 rounded-full overflow-hidden flex shadow-inner">
          <div 
            v-for="(acc, i) in accounts" 
            :key="acc.id"
            :style="{ width: `${poolStats.totalBytes > 0 ? (acc.quotaBytesUsed / poolStats.totalBytes) * 100 : 0}%` }"
            :class="[getAccountColorClass(i), 'h-full transition-all duration-500']"
            :title="`${acc.email}: ${formatBytes(acc.quotaBytesUsed)} dari ${formatBytes(acc.quotaBytesTotal)}`"
          ></div>
        </div>
      </div>

      <!-- Linked Accounts Manager Grid -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-foreground flex items-center gap-2">
            <span>👤</span> Akun Google Drive Terhubung ({{ accounts.length }})
          </h2>
        </div>

        <div v-if="accounts.length === 0" class="text-center py-12 bg-card/40 border border-dashed border-border/80 rounded-3xl">
          <span class="text-4xl block mb-2">☁️</span>
          <p class="text-sm font-semibold text-foreground">Belum ada akun Google Drive yang terhubung</p>
          <p class="text-xs text-muted-foreground mt-1">Hubungkan beberapa akun Google Drive untuk menggabungkan kuota penyimpanan menjadi satu!</p>
          <button @click="showAddAccountModal = true" class="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md">
            ➕ Hubungkan Akun Pertama
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(acc, i) in accounts" 
            :key="acc.id"
            class="bg-card/70 border border-border/80 p-5 rounded-2xl shadow-md relative group hover:border-primary/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2 min-w-0 pr-2">
                  <div class="w-8 h-8 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-sm shrink-0">
                    {{ i + 1 }}
                  </div>
                  <div class="truncate">
                    <h3 class="text-xs font-bold text-foreground truncate">{{ acc.name }}</h3>
                    <p class="text-[11px] font-mono text-muted-foreground truncate">{{ acc.email }}</p>
                  </div>
                </div>

                <span 
                  :class="[
                    'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase shrink-0',
                    acc.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    acc.status === 'full' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  ]"
                >
                  {{ acc.status === 'active' ? '⚡ Aktif' : acc.status === 'full' ? '📦 Penuh' : '⚠️ Error' }}
                </span>
              </div>

              <!-- Individual Quota Progress -->
              <div class="space-y-1.5 my-3">
                <div class="flex justify-between text-[11px] font-mono">
                  <span class="text-muted-foreground">Kuota Terpakai:</span>
                  <span class="font-bold text-foreground">{{ formatBytes(acc.quotaBytesUsed) }} / {{ formatBytes(acc.quotaBytesTotal) }}</span>
                </div>
                <div class="w-full h-2 bg-background border border-border rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-primary transition-all duration-300"
                    :style="{ width: `${acc.quotaBytesTotal > 0 ? Math.min(100, (acc.quotaBytesUsed / acc.quotaBytesTotal) * 100) : 0}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-border/50 flex justify-end">
              <button 
                @click="removeAccount(acc.id)" 
                class="px-2.5 py-1 text-[11px] font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 rounded-lg transition-all"
              >
                🗑️ Putuskan Akun
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Drag and Drop Pooled Uploader -->
      <div 
        class="bg-card/40 border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 backdrop-blur-xl"
        :class="isDragging ? 'border-primary bg-primary/10 shadow-2xl scale-[1.01]' : 'border-border/80 hover:border-primary/50'"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="fileInput?.click()"
      >
        <input type="file" ref="fileInput" class="hidden" multiple @change="handleFileSelect">
        
        <div v-if="!uploading" class="cursor-pointer">
          <div class="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-primary shadow-lg">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          </div>
          <p class="text-foreground font-semibold text-base mb-1">Unggah Berkas ke Storage Pool Google Drive</p>
          <p class="text-muted-foreground text-xs">Sistem otomatis memilih akun yang masih memiliki ruang dan mengalihkan secara pintar saat penuh (*Auto-Failover*).</p>
        </div>

        <div v-else class="py-4 space-y-2">
          <div class="spinner border-3 w-7 h-7 mx-auto"></div>
          <p class="text-xs font-semibold text-foreground">Sedang mengunggah berkas ke Google Drive API...</p>
        </div>
      </div>

      <!-- Virtual Cloud Drive Files Table -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-base font-bold text-foreground flex items-center gap-2">
            <span>📂</span> Berkas Terimpan di Storage Pool ({{ pooledFiles.length }})
          </h2>
        </div>

        <div v-if="pooledFiles.length === 0" class="text-center py-12 bg-card/40 border border-border/80 rounded-3xl text-muted-foreground text-xs">
          Belum ada berkas yang diunggah ke storage pool.
        </div>

        <div v-else class="space-y-2">
          <div 
            v-for="f in pooledFiles" 
            :key="f.id"
            class="bg-card/70 border border-border/80 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-all shadow-md"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center text-lg shrink-0">
                📄
              </div>
              <div class="min-w-0">
                <h3 class="text-xs font-bold text-foreground truncate">{{ f.name }}</h3>
                <div class="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground font-mono">
                  <span>{{ f.sizeFormatted }}</span>
                  <span>•</span>
                  <span class="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded">👤 {{ f.gdriveAccountEmail }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button 
                @click="copyStreamLink(f.id)" 
                class="px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:bg-border/60 transition-all flex items-center gap-1"
                title="Salin Tautan Stream / Unduh"
              >
                <span>📋</span> Salin Link
              </button>

              <a 
                :href="`/api/gdrive/pool/stream/${f.id}`" 
                download 
                class="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1"
              >
                <span>📥</span> Unduh
              </a>

              <button 
                @click="deleteFile(f.id)" 
                class="p-2 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 border border-border rounded-xl transition-all"
                title="Hapus Berkas"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Add Account Credentials Modal -->
    <div 
      v-if="showAddAccountModal" 
      class="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      @click.self="showAddAccountModal = false"
    >
      <div class="bg-card border border-border rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative">
        <button @click="showAddAccountModal = false" class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm p-1 rounded-lg">✕</button>

        <h2 class="text-base font-bold text-foreground flex items-center gap-2">
          <span>➕</span> Hubungkan Akun Google Drive Baru
        </h2>
        <p class="text-xs text-muted-foreground">
          Masukkan kredensial Google OAuth2 Refresh Token dari akun Google Drive Anda.
        </p>

        <form @submit.prevent="submitAddAccount" class="space-y-3 pt-2">
          <div>
            <label class="block text-xs font-semibold text-muted-foreground mb-1">Nama / Email Akun:</label>
            <input v-model="newAccForm.name" type="text" placeholder="Contoh: Akun GDrive Utama (akun1@gmail.com)" class="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary" required />
          </div>

          <div>
            <label class="block text-xs font-semibold text-muted-foreground mb-1">Google OAuth Client ID:</label>
            <input v-model="newAccForm.clientId" type="text" placeholder="xxxxxxxxxxxx.apps.googleusercontent.com" class="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary" required />
          </div>

          <div>
            <label class="block text-xs font-semibold text-muted-foreground mb-1">Google OAuth Client Secret:</label>
            <input v-model="newAccForm.clientSecret" type="password" placeholder="GOCSPX-xxxxxxxxxxxx" class="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary" required />
          </div>

          <div>
            <label class="block text-xs font-semibold text-muted-foreground mb-1">Google OAuth Refresh Token:</label>
            <input v-model="newAccForm.refreshToken" type="password" placeholder="1//04xxxxxxxxxxxx" class="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary" required />
          </div>

          <div class="pt-3 flex gap-2">
            <button type="button" @click="showAddAccountModal = false" class="flex-1 py-2.5 bg-card border border-border text-xs font-semibold text-muted-foreground hover:text-foreground rounded-xl">Batal</button>
            <button type="submit" :disabled="submittingAccount" class="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50">
              {{ submittingAccount ? 'Memverifikasi Kredensial...' : 'Verifikasi & Hubungkan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'

const { success, error: showError } = useToast()

const accounts = ref<any[]>([])
const pooledFiles = ref<any[]>([])
const loading = ref(true)
const isDragging = ref(false)
const uploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const poolStats = ref({
  totalBytes: 0,
  usedBytes: 0,
  freeBytes: 0,
  totalBytesFormatted: '0 Bytes',
  usedBytesFormatted: '0 Bytes',
  freeBytesFormatted: '0 Bytes'
})

const showAddAccountModal = ref(false)
const submittingAccount = ref(false)
const newAccForm = ref({
  name: '',
  clientId: '',
  clientSecret: '',
  refreshToken: ''
})

const accountColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-indigo-500'
]

function getAccountColorClass(index: number) {
  return accountColors[index % accountColors.length]
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

async function fetchPoolData() {
  loading.value = true
  try {
    const api = useApi()
    const accRes = await api.get<{ success?: boolean; data?: any }>('/gdrive/pool/accounts')
    if (accRes?.data) {
      accounts.value = accRes.data.accounts || []
      poolStats.value = accRes.data
    }

    const filesRes = await api.get<{ success?: boolean; data?: any[] }>('/gdrive/pool/files')
    if (filesRes?.data) {
      pooledFiles.value = filesRes.data
    }
  } catch (e: any) {
    showError('Gagal memuat data Storage Pool: ' + e.message)
  } finally {
    loading.value = false
  }
}

async function submitAddAccount() {
  submittingAccount.value = true
  try {
    const api = useApi()
    const res = await api.post<{ success?: boolean; message?: string }>('/gdrive/pool/accounts', newAccForm.value)
    if (res?.success) {
      success(res.message || 'Akun Google Drive berhasil terhubung!')
      showAddAccountModal.value = false
      newAccForm.value = { name: '', clientId: '', clientSecret: '', refreshToken: '' }
      await fetchPoolData()
    }
  } catch (e: any) {
    showError(e.message || 'Gagal menyambungkan akun Google Drive.')
  } finally {
    submittingAccount.value = false
  }
}

async function removeAccount(id: string) {
  if (!confirm('Apakah Anda yakin ingin memutuskan akun Google Drive ini dari storage pool?')) return
  try {
    const api = useApi()
    await api.del(`/gdrive/pool/accounts/${id}`)
    success('Akun Google Drive telah diputuskan.')
    await fetchPoolData()
  } catch (e: any) {
    showError('Gagal memutuskan akun: ' + e.message)
  }
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    uploadFiles(Array.from(target.files))
  }
}

function handleDrop(e: DragEvent) {
  isDragging.value = false
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    uploadFiles(Array.from(e.dataTransfer.files))
  }
}

async function uploadFiles(filesList: File[]) {
  if (accounts.value.length === 0) {
    showError('Belum ada akun Google Drive terhubung. Harap tambahkan akun terlebih dahulu!')
    showAddAccountModal.value = true
    return
  }

  uploading.value = true
  try {
    const formData = new FormData()
    filesList.forEach(f => formData.append('file', f))

    const api = useApi()
    const res = await api.post<{ success?: boolean; message?: string }>('/gdrive/pool/upload', formData)
    if (res?.success) {
      success(res.message || 'Berhasil mengunggah ke Storage Pool!')
      await fetchPoolData()
    }
  } catch (e: any) {
    showError('Gagal mengunggah berkas: ' + e.message)
  } finally {
    uploading.value = false
  }
}

async function deleteFile(id: string) {
  if (!confirm('Apakah Anda yakin ingin menghapus berkas ini dari Google Drive Storage Pool?')) return
  try {
    const api = useApi()
    await api.del(`/gdrive/pool/files/${id}`)
    success('Berkas berhasil dihapus.')
    await fetchPoolData()
  } catch (e: any) {
    showError('Gagal menghapus berkas: ' + e.message)
  }
}

function copyStreamLink(id: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const url = `${origin}/api/gdrive/pool/stream/${id}`
  navigator.clipboard.writeText(url)
  success('Tautan stream berkas berhasil disalin ke clipboard!')
}

onMounted(() => {
  void fetchPoolData()
})
</script>

<style scoped>
.spinner { border: 3px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
