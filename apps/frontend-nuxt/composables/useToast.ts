// Composables for toast notifications (migrated from frontend/src/composables/useToast.js)
import { ref, readonly } from 'vue'

const toasts = ref<Array<{ id: number; message: string; type: 'success' | 'error' | 'info' | 'warning'; duration: number }>>([])
let counter = 0

export function useToast() {
  function remove(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function add(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) {
    const id = counter++
    const toast = { id, message, type, duration }
    toasts.value.push(toast)
    setTimeout(() => remove(id), duration)
    return id
  }

  return {
    toasts: readonly(toasts),
    success: (msg: string, dur?: number) => add(msg, 'success', dur),
    error: (msg: string, dur?: number) => add(msg, 'error', dur),
    info: (msg: string, dur?: number) => add(msg, 'info', dur),
    warning: (msg: string, dur?: number) => add(msg, 'warning', dur)
  }
}
