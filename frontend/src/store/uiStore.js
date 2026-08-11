import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isSidebarOpen = ref(false)
  const readerTheme = ref('dark')
  const readerFontSize = ref(18)
  const toasts = ref([])

  // Load preferences from localStorage on init
  const initPreferences = () => {
    try {
      const savedTheme = localStorage.getItem('reader_theme')
      if (savedTheme) readerTheme.value = savedTheme

      const savedSize = localStorage.getItem('reader_font_size')
      if (savedSize) readerFontSize.value = parseInt(savedSize)
    } catch (err) {
      console.warn('Failed to load preferences from localStorage:', err)
    }
  }

  const setReaderTheme = (theme) => {
    readerTheme.value = theme
    try {
      localStorage.setItem('reader_theme', theme)
    } catch (err) {
      console.warn('Failed to save theme:', err)
    }
  }

  const setReaderFontSize = (size) => {
    readerFontSize.value = size
    try {
      localStorage.setItem('reader_font_size', size)
    } catch (err) {
      console.warn('Failed to save font size:', err)
    }
  }

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  const themeClasses = computed(() => {
    if (readerTheme.value === 'sepia') {
      return {
        bg: 'bg-[#f4ecd8]',
        headerBg: 'bg-[#f4ecd8]/90',
        border: 'border-[#d5c3a1]',
        title: 'text-[#5b4636]',
        text: 'text-[#433422]',
        btn: 'bg-[#e4d5b7] text-[#5b4636] hover:bg-[#d5c3a1]',
        textBtn: 'text-[#7a5e46] hover:text-[#433422] hover:bg-[#e4d5b7]',
        navBtn: 'bg-[#e4d5b7] text-[#5b4636] border-[#d5c3a1] hover:bg-[#d5c3a1] hover:border-brand'
      }
    } else if (readerTheme.value === 'light') {
      return {
        bg: 'bg-white',
        headerBg: 'bg-white/90',
        border: 'border-gray-200',
        title: 'text-gray-900',
        text: 'text-gray-800',
        btn: 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200',
        textBtn: 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
        navBtn: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-brand'
      }
    } else {
      // dark theme (default)
      return {
        bg: 'bg-gray-900',
        headerBg: 'bg-gray-900/90',
        border: 'border-gray-800',
        title: 'text-white',
        text: 'text-gray-300',
        btn: 'bg-gray-800 text-gray-400 hover:text-white',
        textBtn: 'text-gray-400 hover:text-white hover:bg-gray-800',
        navBtn: 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-brand'
      }
    }
  })

  return {
    isSidebarOpen,
    readerTheme,
    readerFontSize,
    toasts,
    themeClasses,
    initPreferences,
    setReaderTheme,
    setReaderFontSize,
    showToast,
    toggleSidebar,
    closeSidebar
  }
})
