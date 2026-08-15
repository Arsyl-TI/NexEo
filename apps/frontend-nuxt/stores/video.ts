import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { VideoCategory, VideoFolder, VideoItem } from '@nexeo/shared/types/video'

export const useVideoStore = defineStore('video', () => {
  const categories = ref<VideoCategory[]>([])
  const folders = ref<VideoFolder[]>([])
  const videos = ref<VideoItem[]>([])
  const selectedCategory = ref<VideoCategory | null>(null)
  const selectedFolder = ref<VideoFolder | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const apiBase = () => useRuntimeConfig().public.apiBase as string

  async function fetchCategories() {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<VideoCategory[]>(`${apiBase()}/video/categories`)
      categories.value = res
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch categories'
    } finally {
      loading.value = false
    }
  }

  async function fetchFolders(categoryId: string) {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<VideoFolder[]>(`${apiBase()}/video/category/${encodeURIComponent(categoryId)}/folders`)
      folders.value = res
      selectedFolder.value = null
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch folders'
    } finally {
      loading.value = false
    }
  }

  async function fetchVideos(categoryId: string, folderName: string) {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<VideoItem[]>(`${apiBase()}/video/folder/${encodeURIComponent(folderName)}/videos?categoryId=${encodeURIComponent(categoryId)}`)
      videos.value = res
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch videos'
    } finally {
      loading.value = false
    }
  }

  async function fetchVideo(id: string): Promise<VideoItem | null> {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<VideoItem>(`${apiBase()}/video/${encodeURIComponent(id)}`)
      return res
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch video'
      return null
    } finally {
      loading.value = false
    }
  }

  function resetSelection() {
    selectedCategory.value = null
    selectedFolder.value = null
    videos.value = []
  }

  return {
    categories,
    folders,
    videos,
    selectedCategory,
    selectedFolder,
    loading,
    error,
    fetchCategories,
    fetchFolders,
    fetchVideos,
    fetchVideo,
    resetSelection
  }
})