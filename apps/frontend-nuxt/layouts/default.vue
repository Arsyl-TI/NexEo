<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200">
    <Navbar />

    <div class="flex flex-1 pt-12">
      <Sidebar />

      <main class="flex-1 overflow-y-auto lg:ml-64 pb-20 lg:pb-0">
        <div class="p-4 max-w-6xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <MobileNavigation />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Layout/Navbar.vue'
import Sidebar from '~/components/Layout/Sidebar.vue'
import MobileNavigation from '~/components/Layout/MobileNavigation.vue'
</script>

