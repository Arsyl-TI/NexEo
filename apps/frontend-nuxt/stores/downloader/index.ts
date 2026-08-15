// Downloader Domain Store (scoped)
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DownloadTask, DownloadSource } from '@nexeo/shared/types/downloader'

export const useDownloaderStore = defineStore('downloader', () => {
  const tasks = ref<DownloadTask[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTasks(silent = false) {
    if (!silent) loading.value = true
    error.value = null
    try {
      const api = useApi()
      const res = await api.get<{ success: boolean; data: DownloadTask[] }>('/downloader/tasks')
      tasks.value = res?.data ?? []
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to fetch download tasks'
    } finally {
      if (!silent) loading.value = false
    }
  }

  async function addTask(title: string, source: DownloadSource, targetFolder: string = 'uploads') {
    loading.value = true
    error.value = null
    try {
      const api = useApi()
      await api.post('/downloader/tasks', { title, source, targetFolder })
      await fetchTasks()
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to add download task'
    } finally {
      loading.value = false
    }
  }

  async function cancelTask(taskId: string) {
    loading.value = true
    error.value = null
    try {
      const api = useApi()
      await api.post(`/downloader/tasks/${taskId}/cancel`, {})
      await fetchTasks()
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to cancel download task'
    } finally {
      loading.value = false
    }
  }

  async function deleteTask(taskId: string) {
    loading.value = true
    error.value = null
    try {
      const api = useApi()
      await api.del(`/downloader/tasks/${taskId}`)
      await fetchTasks()
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to delete task'
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    cancelTask,
    deleteTask
  }
})
