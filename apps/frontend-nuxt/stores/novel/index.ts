// Novel Domain Store (scoped)
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { NovelLibraryItem, NovelMetadata, NovelChapter, NovelImportPayload } from '@nexeo/shared/types/novel'

export const useNovelStore = defineStore('novel', () => {
  const library = ref<NovelLibraryItem[]>([])
  const currentNovel = ref<NovelLibraryItem | null>(null)
  const chapters = ref<NovelChapter[]>([])
  const novelMetadata = ref<NovelMetadata | null>(null)
  const loading = ref(false)
  const isImporting = ref(false)
  const isUpdating = ref(false)
  const error = ref<string | null>(null)

  async function fetchLibrary() {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ success?: boolean; data?: NovelLibraryItem[] }>('/api/novel/library')
      library.value = res?.data ?? []
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch library'
    } finally {
      loading.value = false
    }
  }

  async function fetchNovel(slug: string) {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ success?: boolean; data?: NovelLibraryItem }>(`/api/novel/${slug}`)
      currentNovel.value = res?.data ?? null
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch novel'
    } finally {
      loading.value = false
    }
  }

  async function fetchChapters(slug: string) {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ success?: boolean; data?: NovelChapter[] }>(`/api/novel/${slug}/chapters`)
      chapters.value = res?.data ?? []
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch chapters'
    } finally {
      loading.value = false
    }
  }

  async function importFromSource(sourceId: string, slug: string, chapterFilter = 'all', translationConfig?: any) {
    isImporting.value = true
    try {
      const res = await $fetch<{ success: boolean; slug: string; downloadedCount?: number; downloaded?: number; error?: string }>('/api/novels/import', {
        method: 'POST',
        body: { sourceId, slug, chapterFilter, translationConfig }
      })
      return { success: res.success, error: res.error, data: { downloaded: res.downloadedCount ?? res.downloaded ?? 0 } }
    } catch (e: any) {
      return { success: false, error: e?.message ?? 'Failed to import from source', data: undefined }
    } finally {
      isImporting.value = false
    }
  }

  async function uploadEpub(file: File) {
    isImporting.value = true
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await $fetch<{ success: boolean; slug?: string; title?: string; chapterCount?: number; error?: string }>('/api/novels/epub/import', {
        method: 'POST',
        body: formData
      })
      if (res.success) {
        await fetchLibrary()
      }
      return res
    } catch (e: any) {
      return { success: false, error: e?.message ?? 'Failed to upload EPUB' }
    } finally {
      isImporting.value = false
    }
  }

  async function translateChapter(texts: string[], config: { engine?: string; sourceLang?: string; geminiApiKey?: string; deeplApiKey?: string; libreUrl?: string; libreApiKey?: string } = {}) {
    try {
      const res = await $fetch<{ success: boolean; data?: string[]; error?: string }>('/api/novels/translate', {
        method: 'POST',
        body: { texts, ...config }
      })
      return res
    } catch (e: any) {
      return { success: false, error: e?.message ?? 'Translation failed', data: texts }
    }
  }

  return {
    library,
    currentNovel,
    chapters,
    novelMetadata,
    loading,
    isImporting,
    isUpdating,
    error,
    fetchLibrary,
    fetchNovel,
    fetchChapters,
    importFromSource,
    uploadEpub,
    translateChapter
  }
})
