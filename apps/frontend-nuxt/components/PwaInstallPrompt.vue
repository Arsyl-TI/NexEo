<template>
  <ClientOnly>
    <div 
      v-if="showPrompt && deferredPrompt" 
      class="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl bg-card/95 border border-primary/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fade-in flex flex-col gap-3"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-xl shrink-0">
            ⚡
          </div>
          <div>
            <h4 class="font-extrabold text-xs sm:text-sm text-foreground">Install Aplikasi NexEo</h4>
            <p class="text-[11px] text-muted-foreground leading-snug">Jadikan NexEo sebagai aplikasi native di HP / PC tanpa URL bar browser!</p>
          </div>
        </div>

        <button @click="dismiss" class="text-muted-foreground hover:text-foreground text-xs p-1">
          ✕
        </button>
      </div>

      <div class="flex items-center gap-2 pt-1">
        <button 
          @click="installPwa" 
          class="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span>📲</span> Install Sekarang
        </button>
        <button 
          @click="dismiss" 
          class="py-2 px-3 rounded-xl bg-background border border-border text-xs text-muted-foreground hover:text-foreground font-semibold"
        >
          Nanti
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const deferredPrompt = ref<any>(null)
const showPrompt = ref(false)

function handleBeforeInstallPrompt(e: Event) {
  e.preventDefault()
  deferredPrompt.value = e
  if (typeof window !== 'undefined' && !localStorage.getItem('pwa_prompt_dismissed')) {
    showPrompt.value = true
  }
}

async function installPwa() {
  if (!deferredPrompt.value) return
  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  if (outcome === 'accepted') {
    showPrompt.value = false
  }
  deferredPrompt.value = null
}

function dismiss() {
  showPrompt.value = false
  if (typeof window !== 'undefined') {
    localStorage.setItem('pwa_prompt_dismissed', 'true')
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
