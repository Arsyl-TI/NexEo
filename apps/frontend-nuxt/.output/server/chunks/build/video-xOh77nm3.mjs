import { defineStore } from 'pinia';
import { ref } from 'vue';
import { b as useRuntimeConfig } from './server.mjs';

const useVideoStore = defineStore("video", () => {
  const categories = ref([]);
  const folders = ref([]);
  const videos = ref([]);
  const selectedCategory = ref(null);
  const selectedFolder = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const apiBase = () => useRuntimeConfig().public.apiBase;
  async function fetchCategories() {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`${apiBase()}/video/categories`);
      categories.value = res;
    } catch (e) {
      error.value = (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to fetch categories";
    } finally {
      loading.value = false;
    }
  }
  async function fetchFolders(categoryId) {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`${apiBase()}/video/category/${encodeURIComponent(categoryId)}/folders`);
      folders.value = res;
      selectedFolder.value = null;
    } catch (e) {
      error.value = (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to fetch folders";
    } finally {
      loading.value = false;
    }
  }
  async function fetchVideos(categoryId, folderName) {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`${apiBase()}/video/folder/${encodeURIComponent(folderName)}/videos?categoryId=${encodeURIComponent(categoryId)}`);
      videos.value = res;
    } catch (e) {
      error.value = (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to fetch videos";
    } finally {
      loading.value = false;
    }
  }
  async function fetchVideo(id) {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch(`${apiBase()}/video/${encodeURIComponent(id)}`);
      return res;
    } catch (e) {
      error.value = (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to fetch video";
      return null;
    } finally {
      loading.value = false;
    }
  }
  function resetSelection() {
    selectedCategory.value = null;
    selectedFolder.value = null;
    videos.value = [];
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
  };
});

export { useVideoStore as u };
//# sourceMappingURL=video-xOh77nm3.mjs.map
