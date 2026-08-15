<template>
  <aside class="fixed top-12 left-0 bottom-0 w-64 border-r border-gray-700 bg-[#0a0a0a]/95 overflow-y-auto hidden lg:block">
    <nav class="p-4 pt-6 space-y-1">
      <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Media Video</div>
      
      <NuxtLink
        to="/"
        class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors"
        :class="{ 'bg-gray-800 text-purple-400 font-medium': route.path === '/' && !route.query.category }"
      >
        <span class="w-4 h-4 flex-shrink-0 text-center">🎬</span>
        Semua Kategori
      </NuxtLink>

      <NuxtLink
        v-for="cat in videoStore.categories"
        :key="cat.id"
        :to="`/?category=${cat.id}`"
        class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors"
        :class="{ 'bg-gray-800 text-purple-400 font-medium': route.query.category === cat.id }"
      >
        <span class="w-4 h-4 flex-shrink-0 text-center">{{ getIcon(cat.id) }}</span>
        {{ cat.name }}
      </NuxtLink>

      <div class="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pustaka Novel</div>
      <NuxtLink
        v-for="link in sidebarLinks.novel"
        :key="link.label"
        :to="link.href"
        class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors"
        :class="{ 'bg-gray-800 text-purple-400 font-medium': link.isActive }"
      >
        <span class="w-4 h-4 flex-shrink-0 text-center">{{ link.icon }}</span>
        {{ link.label }}
      </NuxtLink>

      <div class="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</div>
      <NuxtLink
        v-for="link in sidebarLinks.tools"
        :key="link.label"
        :to="link.href"
        class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors"
        :class="{ 'bg-gray-800 text-purple-400 font-medium': link.isActive }"
      >
        <span class="w-4 h-4 flex-shrink-0 text-center">{{ link.icon }}</span>
        {{ link.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useVideoStore } from '~/stores/video'

const route = useRoute()
const videoStore = useVideoStore()

onMounted(async () => {
  if (videoStore.categories.length === 0) {
    await videoStore.fetchCategories()
  }
})

const getIcon = (id: string) => {
  if (id === 'anime') return '🍿'
  if (id === 'youtube') return '▶️'
  return '🎥'
}

interface SidebarLink {
  label: string
  href: string
  icon: string
  isActive: boolean
}

const sidebarLinks = computed<{
  novel: SidebarLink[]
  tools: SidebarLink[]
}>(() => {
  const path = route.path

  return {
    novel: [
      {
        label: 'Koleksi Novel',
        href: '/novels',
        icon: '📚',
        isActive: path === '/novels' || path.startsWith('/novels/')
      },
      {
        label: 'Scraper Browser',
        href: '/novel-browser',
        icon: '🔍',
        isActive: path === '/novel-browser'
      }
    ],
    tools: [
      {
        label: 'File Share',
        href: '/share',
        icon: '📤',
        isActive: path === '/share'
      },
      {
        label: 'Downloader Queue',
        href: '/downloader',
        icon: '⬇️',
        isActive: path === '/downloader'
      }
    ]
  }
})
</script>
