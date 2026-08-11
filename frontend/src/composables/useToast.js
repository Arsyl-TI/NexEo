import { storeToRefs } from 'pinia'
import { useUIStore } from '../store/uiStore'

export function useToast() {
  const uiStore = useUIStore()
  const { toasts } = storeToRefs(uiStore)
  return {
    toasts,
    showToast: uiStore.showToast
  }
}
