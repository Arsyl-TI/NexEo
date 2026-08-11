import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useNovelStore = defineStore('novel', () => {
  const library = ref([])
  const sources = ref([])
  const selectedNovel = ref(null)
  const loading = ref(false)
  const isImporting = ref(false)
  const isUpdating = ref(false)
  const isTranslating = ref(false)
  const error = ref(null)

  const fetchLibrary = async () => {
    loading.value = true
    try {
      const res = await axios.get('/api/novels/library')
      library.value = res.data
    } catch (err) {
      error.value = 'Failed to fetch novel library'
      console.error('Error fetching library:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchSources = async () => {
    try {
      const res = await axios.get('/api/novels/sources')
      sources.value = res.data
    } catch (err) {
      error.value = 'Failed to fetch sources'
      console.error('Error fetching sources:', err)
    }
  }

  const importEpub = async (file) => {
    isImporting.value = true
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('/api/novels/import-epub', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      await fetchLibrary()
      return { success: true, data: res.data }
    } catch (err) {
      console.error('Upload failed:', err)
      const errorMsg = err.response?.data?.error || err.message || 'Import failed'
      return { success: false, error: errorMsg }
    } finally {
      isImporting.value = false
    }
  }

  const updateCatalog = async () => {
    isUpdating.value = true
    try {
      const res = await axios.post('/api/novels/update')
      return { success: true, data: res.data }
    } catch (err) {
      console.error('Update failed:', err)
      return { success: false, error: err.message }
    } finally {
      isUpdating.value = false
    }
  }

  const translateNovel = async (slug) => {
    isTranslating.value = true
    try {
      const res = await axios.post(`/api/novels/${slug}/translate-all`)
      return { success: true, data: res.data }
    } catch (err) {
      console.error('Translation failed:', err)
      return { success: false, error: err.message }
    } finally {
      isTranslating.value = false
    }
  }

  const getNovelBySlug = (slug) => {
    return library.value.find(n => n.folderName === slug)
  }

  return {
    library,
    sources,
    selectedNovel,
    loading,
    isImporting,
    isUpdating,
    isTranslating,
    error,
    fetchLibrary,
    fetchSources,
    importEpub,
    updateCatalog,
    translateNovel,
    getNovelBySlug
  }
})
