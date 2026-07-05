<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar Overlay -->
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"></div>

    <!-- Sidebar -->
    <aside :class="['sidebar overflow-y-auto', { '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen, 'md:translate-x-0': true }]">
      <div class="p-6">
        <div class="flex items-center space-x-3 mb-8">
          <div class="w-8 h-8 rounded bg-linear-to-br from-brand to-blue-500 flex items-center justify-center shadow-lg">
            <span class="text-white font-bold">N</span>
          </div>
          <span class="text-xl font-bold text-white tracking-wide">NexEo</span>
        </div>

        <nav class="space-y-6">
          <!-- Video Categories -->
          <div>
            <h3 class="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider">Video</h3>
            <ul class="space-y-1">
              <li v-for="cat in categories" :key="cat.id">
                <router-link :to="`/?category=${cat.id}`" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" active-class="text-white bg-gray-800">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span>{{ cat.name }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Novel Categories -->
          <div>
            <h3 class="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider">Pustaka Novel</h3>
            <ul class="space-y-1">
              <li>
                <router-link to="/novels" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" active-class="text-white bg-gray-800">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <span>Koleksi Novel</span>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Tools -->
          <div>
            <h3 class="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider">Alat</h3>
            <ul class="space-y-1">
              <li>
                <router-link to="/share" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" active-class="text-white bg-gray-800">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  <span>Lokal Share</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 md:ml-64 bg-gray-900 overflow-y-auto">
      <!-- Topbar -->
      <header class="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center justify-between">
        <button @click="isSidebarOpen = true" class="md:hidden text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <div class="flex-1 md:px-4 flex items-center justify-end md:justify-between">
          <div class="hidden md:flex relative max-w-md w-full">
            <input type="text" placeholder="Pencarian belum diimplementasi..." class="w-full bg-gray-800 border-none rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-brand">
            <svg class="w-4 h-4 absolute left-4 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-xs text-green-400 flex items-center"><span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span> Online</span>
          </div>
        </div>
      </header>

      <main class="flex-1 p-4 md:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isSidebarOpen = ref(false)
const categories = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/api/categories')
    if(res.ok) {
      categories.value = await res.json()
    }
  } catch(e) {
    console.error("Gagal load categories", e)
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
