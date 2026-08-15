import { defineStore } from 'pinia';
import { ref } from 'vue';

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
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch("/api/novel/library");
      library.value = (_a = res == null ? void 0 : res.data) != null ? _a : [];
    } catch (e) {
      error.value = (_b = e == null ? void 0 : e.message) != null ? _b : "Failed to fetch library";
    } finally {
      loading.value = false;
    }
  }
  async function fetchNovel(slug) {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`/api/novel/${slug}`);
      currentNovel.value = (_a = res == null ? void 0 : res.data) != null ? _a : null;
    } catch (e) {
      error.value = (_b = e == null ? void 0 : e.message) != null ? _b : "Failed to fetch novel";
    } finally {
      loading.value = false;
    }
  }
  async function fetchChapters(slug) {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`/api/novel/${slug}/chapters`);
      chapters.value = (_a = res == null ? void 0 : res.data) != null ? _a : [];
    } catch (e) {
      error.value = (_b = e == null ? void 0 : e.message) != null ? _b : "Failed to fetch chapters";
    } finally {
      loading.value = false;
    }
  }
  async function importFromSource(sourceId, slug, chapterFilter = "all", translationConfig) {
    var _a, _b, _c;
    isImporting.value = true;
    try {
      const res = await $fetch("/api/novels/import", {
        method: "POST",
        body: { sourceId, slug, chapterFilter, translationConfig }
      });
      return { success: res.success, error: res.error, data: { downloaded: (_b = (_a = res.downloadedCount) != null ? _a : res.downloaded) != null ? _b : 0 } };
    } catch (e) {
      return { success: false, error: (_c = e == null ? void 0 : e.message) != null ? _c : "Failed to import from source", data: void 0 };
    } finally {
      isImporting.value = false;
    }
  }
  async function uploadEpub(file) {
    var _a;
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
      return { success: false, error: (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to upload EPUB" };
    } finally {
      isImporting.value = false;
    }
  }
  async function translateChapter(texts, config = {}) {
    var _a;
    try {
      const res = await $fetch("/api/novels/translate", {
        method: "POST",
        body: { texts, ...config }
      });
      return res;
    } catch (e) {
      return { success: false, error: (_a = e == null ? void 0 : e.message) != null ? _a : "Translation failed", data: texts };
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

export { useNovelStore as u };
//# sourceMappingURL=index-D8kQjp-3.mjs.map
