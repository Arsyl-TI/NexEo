<template>
  <header class="fixed top-0 left-0 right-0 z-50 flex h-12 items-center justify-between px-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
    <div class="flex items-center space-x-5">
      <NuxtLink to="/" class="text-xl font-extrabold text-primary tracking-tight flex items-center gap-1.5">
        <span>⚡</span> NexEo
      </NuxtLink>
      <nav class="hidden md:flex items-center space-x-1 text-xs font-semibold">
        <NuxtLink to="/" class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all">🎬 Video</NuxtLink>
        <NuxtLink to="/novels" class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all">📖 Novels</NuxtLink>
        <NuxtLink to="/library" class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all">📚 Pustaka</NuxtLink>
        <NuxtLink to="/novel-browser" class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all">🌐 Browser</NuxtLink>
        <NuxtLink to="/share" class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all">📤 Share</NuxtLink>
        <NuxtLink to="/downloader" class="px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all">⚡ Downloader</NuxtLink>
      </nav>
    </div>

    <div class="flex items-center space-x-3">
      <!-- LAN IP Address Badge for Offline Local Network -->
      <div v-if="lanUrl" @click="copyLanUrl" class="cursor-pointer bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm" title="Klik untuk menyalin alamat IP LAN untuk perangkat HP / Komputer lain">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>📡 {{ lanUrl }}</span>
      </div>

      <button @click="toggleTheme" class="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
        <svg v-if="!isDark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m8.66-10H19m-4.34 5.66l1.42 1.42M6.34 6.34l1.42 1.42M3 12h1m19 0h-1M6.34 17.66l1.42-1.42" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'

const { success } = useToast()
const isDark = ref(true)
const lanUrl = ref('')

function toggleTheme() {
  isDark.value = !isDark.value
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark.value)
  }
}

function copyLanUrl() {
  if (typeof window !== 'undefined' && lanUrl.value) {
    navigator.clipboard.writeText(lanUrl.value)
    success(`Alamat LAN ${lanUrl.value} berhasil disalin! Buka di HP / perangkat lain di jaringan Wi-Fi yang sama.`)
  }
}

onMounted(async () => {
  try {
    const res = await $fetch<{ success?: boolean; url?: string }>('/api/qrcode')
    if (res?.url) {
      lanUrl.value = res.url
    }
  } catch (e) {
    lanUrl.value = 'http://localhost:3000'
  }
})
</script>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}
</style>
