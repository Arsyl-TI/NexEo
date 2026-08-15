import { defineStore } from "pinia";
import { ref } from "vue";
const useNovelStore = defineStore("novel", () => {
  const library = ref([]);
  const currentNovel = ref(null);
  const chapters = ref([]);
  const novelMetadata = ref(null);
  const loading = ref(false);
  const isImporting = ref(false);
  const isUpdating = ref(false);
  const error = ref(null);
  async function fetchLibrary() {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch("/api/novel/library");
      library.value = res?.data ?? [];
    } catch (e) {
      error.value = e?.message ?? "Failed to fetch library";
    } finally {
      loading.value = false;
    }
  }
  async function fetchNovel(slug) {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`/api/novel/${slug}`);
      currentNovel.value = res?.data ?? null;
    } catch (e) {
      error.value = e?.message ?? "Failed to fetch novel";
    } finally {
      loading.value = false;
    }
  }
  async function fetchChapters(slug) {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`/api/novel/${slug}/chapters`);
      chapters.value = res?.data ?? [];
    } catch (e) {
      error.value = e?.message ?? "Failed to fetch chapters";
    } finally {
      loading.value = false;
    }
  }
  async function importFromSource(sourceId, slug, chapterFilter = "all", translationConfig) {
    isImporting.value = true;
    try {
      const res = await $fetch("/api/novels/import", {
        method: "POST",
        body: { sourceId, slug, chapterFilter, translationConfig }
      });
      return { success: res.success, error: res.error, data: { downloaded: res.downloadedCount ?? res.downloaded ?? 0 } };
    } catch (e) {
      return { success: false, error: e?.message ?? "Failed to import from source", data: void 0 };
    } finally {
      isImporting.value = false;
    }
  }
  async function uploadEpub(file) {
    isImporting.value = true;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await $fetch("/api/novels/epub/import", {
        method: "POST",
        body: formData
      });
      if (res.success) {
        await fetchLibrary();
      }
      return res;
    } catch (e) {
      return { success: false, error: e?.message ?? "Failed to upload EPUB" };
    } finally {
      isImporting.value = false;
    }
  }
  async function translateChapter(texts, config = {}) {
    try {
      const res = await $fetch("/api/novels/translate", {
        method: "POST",
        body: { texts, ...config }
      });
      return res;
    } catch (e) {
      return { success: false, error: e?.message ?? "Translation failed", data: texts };
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
  };
});
export {
  useNovelStore as u
};
//# sourceMappingURL=index-D8kQjp-3.js.map
