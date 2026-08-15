import { defineStore } from 'pinia'
import type { MangaItem, MangaChapter } from '@nexeo/shared/types/manga'

export const useMangaStore = defineStore('manga', {
  state: () => ({
    mangaList: [] as MangaItem[],
    currentManga: null as MangaItem | null,
    currentChapterPages: [] as string[],
    loading: false,
    error: null as string | null,
    readerMode: 'webtoon' as 'webtoon' | 'flip',
    fitMode: 'width' as 'width' | 'height' | 'full'
  }),

  actions: {
    setReaderMode(mode: 'webtoon' | 'flip') {
      this.readerMode = mode
      if (typeof window !== 'undefined') {
        localStorage.setItem('manga_reader_mode', mode)
      }
    },

    setFitMode(mode: 'width' | 'height' | 'full') {
      this.fitMode = mode
      if (typeof window !== 'undefined') {
        localStorage.setItem('manga_fit_mode', mode)
      }
    },

    initPreferences() {
      if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('manga_reader_mode')
        if (savedMode === 'webtoon' || savedMode === 'flip') {
          this.readerMode = savedMode
        }
        const savedFit = localStorage.getItem('manga_fit_mode')
        if (savedFit === 'width' || savedFit === 'height' || savedFit === 'full') {
          this.fitMode = savedFit
        }
      }
    },

    async fetchLibrary() {
      this.loading = true
      this.error = null
      try {
        const api = useApi()
        const res = await api.get<{ success?: boolean; data?: MangaItem[] }>('/manga/library')
        if (res?.data) {
          this.mangaList = res.data
        }
      } catch (err: any) {
        this.error = err?.message || 'Gagal memuat pustaka manga'
      } finally {
        this.loading = false
      }
    },

    async fetchMangaDetail(slug: string) {
      this.loading = true
      this.error = null
      try {
        const api = useApi()
        const res = await api.get<{ success?: boolean; data?: MangaItem }>(`/manga/${slug}`)
        if (res?.data) {
          this.currentManga = res.data
        }
      } catch (err: any) {
        this.error = err?.message || 'Gagal memuat detail manga'
      } finally {
        this.loading = false
      }
    },

    async fetchChapterPages(slug: string, chapter: string): Promise<string[]> {
      this.loading = true
      this.error = null
      try {
        const api = useApi()
        const res = await api.get<{ success?: boolean; data?: string[] }>(`/manga/${slug}/chapter/${chapter}`)
        if (res?.data) {
          this.currentChapterPages = res.data
          return res.data
        }
      } catch (err: any) {
        this.error = err?.message || 'Gagal memuat halaman chapter manga'
      } finally {
        this.loading = false
      }
      return []
    }
  }
})
