<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-12 bg-[#0a0a0a]/95 border-t border-gray-700">
    <div class="flex justify-around items-center h-full">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.href"
        class="flex flex-col items-center justify-center flex-1 text-xs py-1 hover:text-blue-300 transition-colors"
        :class="{ 'text-blue-300': link.isActive }"
      >
        <span class="text-base mb-0.5">{{ link.icon }}</span>
        {{ link.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { label: 'Video', href: '/', icon: '🎬', isActive: false },
  { label: 'Novels', href: '/novels', icon: '📚', isActive: false },
  { label: 'Browser', href: '/novel-browser', icon: '🔍', isActive: false },
  { label: 'Share', href: '/share', icon: '📤', isActive: false }
]
</script>
