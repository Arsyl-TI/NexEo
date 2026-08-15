import { defineStore } from "pinia";
import { u as useApi } from "./useApi-CRMpFdoX.js";
const useMangaStore = defineStore("manga", {
  state: () => ({
    mangaList: [],
    currentManga: null,
    currentChapterPages: [],
    loading: false,
    error: null,
    readerMode: "webtoon",
    fitMode: "width"
  }),
  actions: {
    setReaderMode(mode) {
      this.readerMode = mode;
    },
    setFitMode(mode) {
      this.fitMode = mode;
    },
    initPreferences() {
    },
    async fetchLibrary() {
      this.loading = true;
      this.error = null;
      try {
        const api = useApi();
        const res = await api.get("/manga/library");
        if (res?.data) {
          this.mangaList = res.data;
        }
      } catch (err) {
        this.error = err?.message || "Gagal memuat pustaka manga";
      } finally {
        this.loading = false;
      }
    },
    async fetchMangaDetail(slug) {
      this.loading = true;
      this.error = null;
      try {
        const api = useApi();
        const res = await api.get(`/manga/${slug}`);
        if (res?.data) {
          this.currentManga = res.data;
        }
      } catch (err) {
        this.error = err?.message || "Gagal memuat detail manga";
      } finally {
        this.loading = false;
      }
    },
    async fetchChapterPages(slug, chapter) {
      this.loading = true;
      this.error = null;
      try {
        const api = useApi();
        const res = await api.get(`/manga/${slug}/chapter/${chapter}`);
        if (res?.data) {
          this.currentChapterPages = res.data;
          return res.data;
        }
      } catch (err) {
        this.error = err?.message || "Gagal memuat halaman chapter manga";
      } finally {
        this.loading = false;
      }
      return [];
    }
  }
});
export {
  useMangaStore as u
};
//# sourceMappingURL=manga-BDIsHlOU.js.map
