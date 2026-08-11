<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    <transition-group name="toast-list">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white max-w-sm flex items-center shadow-black/50"
        :class="{
          'bg-green-600': toast.type === 'success',
          'bg-red-600': toast.type === 'error',
          'bg-blue-600': toast.type === 'info',
          'bg-yellow-600': toast.type === 'warning'
        }"
      >
        <svg v-if="toast.type === 'success'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <svg v-else-if="toast.type === 'error'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast'
const { toasts } = useToast()
</script>

<style>
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}
.toast-list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
