import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useVideoStore = defineStore('video', () => {
  const categories = ref([])
  const folders = ref([])
  const videos = ref([])
  const selectedCategory = ref(null)
  const selectedFolder = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const continueWatching = ref([])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      categories.value = res.data
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error('Error fetching categories:', err)
    }
  }

  const fetchFolders = async (categoryId) => {
    loading.value = true
    try {
      const res = await axios.get('/api/folders', {
        params: { categoryId }
      })
      folders.value = res.data
      selectedFolder.value = null
    } catch (err) {
      error.value = 'Failed to fetch folders'
      console.error('Error fetching folders:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchVideos = async (categoryId, folderName) => {
    loading.value = true
    try {
      const res = await axios.get('/api/videos', {
        params: {
          categoryId,
          folder: folderName,
          limit: 1000
        }
      })
      videos.value = res.data.videos || []
    } catch (err) {
      error.value = 'Failed to fetch videos'
      console.error('Error fetching videos:', err)
    } finally {
      loading.value = false
    }
  }

  const searchVideos = async (query) => {
    loading.value = true
    try {
      const res = await axios.get('/api/search', {
        params: { q: query }
      })
      videos.value = res.data.videos || []
    } catch (err) {
      error.value = 'Failed to search videos'
      console.error('Error searching videos:', err)
    } finally {
      loading.value = false
    }
  }

  const resetSelection = () => {
    selectedCategory.value = null
    selectedFolder.value = null
    videos.value = []
  }

  const loadContinueWatching = () => {
    continueWatching.value = []
    if (typeof window === 'undefined' || !window.localStorage) return
    const now = Date.now()
    const dayMs = 86400000
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('video_progress_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key))
          if (data && now - data.timestamp < 7 * dayMs) {
            const videoId = key.replace('video_progress_', '')
            const v = videos.value.find(v => String(v.id) === String(videoId))
            if (v) {
              continueWatching.value.push({ ...v, currentTime: data.currentTime || 0 })
            }
          }
        } catch (e) { console.warn('Failed to parse video progress', e) }
      }
    }
    continueWatching.value.sort((a, b) => b.currentTime - a.currentTime)
  }

  return {
    categories,
    folders,
    videos,
    selectedCategory,
    selectedFolder,
    loading,
    error,
    continueWatching,
    fetchCategories,
    fetchFolders,
    fetchVideos,
    searchVideos,
    resetSelection,
    loadContinueWatching
  }
})
