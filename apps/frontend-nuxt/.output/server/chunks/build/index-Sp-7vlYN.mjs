import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { defineStore } from 'pinia';
import { u as useApi } from './useApi-CRMpFdoX.mjs';
import { u as useToast } from './useToast-B8q9yI-P.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const useDownloaderStore = defineStore("downloader", () => {
  const tasks = ref([]);
  const loading = ref(false);
  const error = ref(null);
  async function fetchTasks(silent = false) {
    var _a, _b;
    if (!silent) loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const res = await api.get("/downloader/tasks");
      tasks.value = (_a = res == null ? void 0 : res.data) != null ? _a : [];
    } catch (e) {
      error.value = (_b = e == null ? void 0 : e.message) != null ? _b : "Failed to fetch download tasks";
    } finally {
      if (!silent) loading.value = false;
    }
  }
  async function addTask(title, source, targetFolder = "uploads") {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      await api.post("/downloader/tasks", { title, source, targetFolder });
      await fetchTasks();
    } catch (e) {
      error.value = (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to add download task";
    } finally {
      loading.value = false;
    }
  }
  async function cancelTask(taskId) {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      await api.post(`/downloader/tasks/${taskId}/cancel`, {});
      await fetchTasks();
    } catch (e) {
      error.value = (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to cancel download task";
    } finally {
      loading.value = false;
    }
  }
  async function deleteTask(taskId) {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      await api.del(`/downloader/tasks/${taskId}`);
      await fetchTasks();
    } catch (e) {
      error.value = (_a = e == null ? void 0 : e.message) != null ? _a : "Failed to delete task";
    } finally {
      loading.value = false;
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
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const downloaderStore = useDownloaderStore();
    useToast();
    const newTitle = ref("");
    const newUrl = ref("");
    const newType = ref("file");
    const newTargetFolder = ref("uploads");
    const submitting = ref(false);
    const tasks = computed(() => downloaderStore.tasks);
    const hasActiveDownloads = computed(() => {
      return tasks.value.some((t) => t.status === "downloading" || t.status === "pending");
    });
    const getTargetFolderLabel = (target) => {
      if (target === "novels") return "Pustaka Novel (data/novels/)";
      if (target === "video") return "Folder Video (D:\\Video)";
      return "Shared Files (uploads/)";
    };
    const getStatusLabel = (status) => {
      switch (status) {
        case "completed":
          return "Selesai";
        case "downloading":
          return "Mengunduh...";
        case "failed":
          return "Gagal";
        case "cancelled":
          return "Dibatalkan";
        default:
          return "Antrean";
      }
    };
    const getStatusBadgeClass = (status) => {
      switch (status) {
        case "completed":
          return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
        case "downloading":
          return "bg-sky-500/20 text-sky-300 border-sky-500/40";
        case "failed":
          return "bg-rose-500/20 text-rose-300 border-rose-500/40";
        case "cancelled":
          return "bg-gray-800 text-gray-400 border-gray-700";
        default:
          return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "downloader-page p-4 md:p-8 max-w-6xl mx-auto" }, _attrs))} data-v-a7abb993><div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" data-v-a7abb993><div data-v-a7abb993><h1 class="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3" data-v-a7abb993><span data-v-a7abb993>\u26A1</span> Downloader Queue </h1><p class="text-xs text-muted-foreground mt-1" data-v-a7abb993>Kelola dan pantau antrean unduhan otomatis di latar belakang server Nitro</p></div><div class="flex items-center gap-2" data-v-a7abb993>`);
      if (hasActiveDownloads.value) {
        _push(`<span class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold animate-pulse" data-v-a7abb993><span class="w-2 h-2 rounded-full bg-sky-400" data-v-a7abb993></span> Live Processing </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="px-4 py-2 rounded-xl bg-card border border-border text-foreground hover:bg-border text-xs font-semibold transition-all flex items-center gap-2" data-v-a7abb993><span data-v-a7abb993>\u{1F504}</span> Refresh Manual </button></div></div><div class="bg-card/70 border border-border/80 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-xl" data-v-a7abb993><h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2" data-v-a7abb993><span data-v-a7abb993>\u{1F4E5}</span> Tambah Tugas Unduhan Baru </h2><form class="space-y-4" data-v-a7abb993><div data-v-a7abb993><label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5" data-v-a7abb993>Judul / Nama Tugas</label><input${ssrRenderAttr("value", newTitle.value)} type="text" placeholder="Contoh: Download File ZIP / Video MP4..." class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-inner" required data-v-a7abb993></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-a7abb993><div class="md:col-span-1" data-v-a7abb993><label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5" data-v-a7abb993>URL Sumber Langsung (HTTP/HTTPS)</label><input${ssrRenderAttr("value", newUrl.value)} type="url" placeholder="https://domain.com/file.zip" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-inner" required data-v-a7abb993></div><div data-v-a7abb993><label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5" data-v-a7abb993>Kategori Tipe</label><select class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary" data-v-a7abb993><option value="file" data-v-a7abb993${ssrIncludeBooleanAttr(Array.isArray(newType.value) ? ssrLooseContain(newType.value, "file") : ssrLooseEqual(newType.value, "file")) ? " selected" : ""}>\u{1F4C1} Berkas Umum</option><option value="novel" data-v-a7abb993${ssrIncludeBooleanAttr(Array.isArray(newType.value) ? ssrLooseContain(newType.value, "novel") : ssrLooseEqual(newType.value, "novel")) ? " selected" : ""}>\u{1F4DA} Novel (EPUB/TXT)</option><option value="video" data-v-a7abb993${ssrIncludeBooleanAttr(Array.isArray(newType.value) ? ssrLooseContain(newType.value, "video") : ssrLooseEqual(newType.value, "video")) ? " selected" : ""}>\u{1F3AC} Video (MP4/MKV)</option></select></div><div data-v-a7abb993><label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5" data-v-a7abb993>Lokasi Tujuan Simpan</label><select class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary" data-v-a7abb993><option value="uploads" data-v-a7abb993${ssrIncludeBooleanAttr(Array.isArray(newTargetFolder.value) ? ssrLooseContain(newTargetFolder.value, "uploads") : ssrLooseEqual(newTargetFolder.value, "uploads")) ? " selected" : ""}>\u{1F4E4} Shared Files (uploads/)</option><option value="novels" data-v-a7abb993${ssrIncludeBooleanAttr(Array.isArray(newTargetFolder.value) ? ssrLooseContain(newTargetFolder.value, "novels") : ssrLooseEqual(newTargetFolder.value, "novels")) ? " selected" : ""}>\u{1F4DA} Pustaka Novel (data/novels/)</option><option value="video" data-v-a7abb993${ssrIncludeBooleanAttr(Array.isArray(newTargetFolder.value) ? ssrLooseContain(newTargetFolder.value, "video") : ssrLooseEqual(newTargetFolder.value, "video")) ? " selected" : ""}>\u{1F3AC} Folder Video (D:\\Video)</option></select></div></div><div class="flex justify-end pt-2" data-v-a7abb993><button type="submit" class="btn-primary px-6 py-2.5 text-xs font-bold shadow-lg"${ssrIncludeBooleanAttr(submitting.value) ? " disabled" : ""} data-v-a7abb993>`);
      if (submitting.value) {
        _push(`<span class="spinner border-2 w-3.5 h-3.5 mr-2" data-v-a7abb993></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-a7abb993>${ssrInterpolate(submitting.value ? "Menambahkan..." : "+ Tambah ke Antrean")}</span></button></div></form></div><div class="bg-card/70 border border-border/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl" data-v-a7abb993><div class="flex items-center justify-between mb-4" data-v-a7abb993><h2 class="text-lg font-bold text-foreground flex items-center gap-2" data-v-a7abb993><span data-v-a7abb993>\u{1F4CB}</span> Antrean &amp; Riwayat Unduhan </h2><span class="text-xs font-mono text-muted-foreground" data-v-a7abb993>${ssrInterpolate(tasks.value.length)} Tugas</span></div>`);
      if (unref(downloaderStore).loading && tasks.value.length === 0) {
        _push(`<div class="flex justify-center py-16" data-v-a7abb993><div class="spinner" data-v-a7abb993></div></div>`);
      } else if (tasks.value.length === 0) {
        _push(`<div class="text-center py-16 bg-card/30 border border-border rounded-2xl text-muted-foreground text-sm" data-v-a7abb993> Belum ada tugas unduhan dalam antrean. </div>`);
      } else {
        _push(`<div class="space-y-3.5" data-v-a7abb993><!--[-->`);
        ssrRenderList(tasks.value, (task) => {
          _push(`<div class="${ssrRenderClass(["border rounded-2xl p-4 transition-all duration-300 backdrop-blur-md", task.status === "downloading" ? "bg-primary/10 border-primary/50 shadow-primary/10 shadow-xl animate-pulse-glow" : "bg-card/50 border-border/80 hover:border-border"])}" data-v-a7abb993><div class="flex flex-col md:flex-row md:items-center justify-between gap-4" data-v-a7abb993><div class="flex-1 min-w-0" data-v-a7abb993><div class="flex items-center gap-2.5 mb-1.5 flex-wrap" data-v-a7abb993><span class="${ssrRenderClass([getStatusBadgeClass(task.status), "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm"])}" data-v-a7abb993>${ssrInterpolate(getStatusLabel(task.status))}</span><h3 class="font-bold text-sm text-foreground truncate"${ssrRenderAttr("title", task.title)} data-v-a7abb993>${ssrInterpolate(task.title)}</h3></div><div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono" data-v-a7abb993><span class="truncate max-w-md"${ssrRenderAttr("title", task.source.url)} data-v-a7abb993>\u{1F310} ${ssrInterpolate(task.source.url)}</span><span data-v-a7abb993>\u2022</span><span data-v-a7abb993>\u{1F4CD} ${ssrInterpolate(getTargetFolderLabel(task.targetFolder))}</span>`);
          if (task.speedFormatted) {
            _push(`<span class="text-sky-400 font-bold" data-v-a7abb993>\u26A1 ${ssrInterpolate(task.speedFormatted)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (task.status === "downloading" || task.status === "pending") {
            _push(`<div class="mt-3" data-v-a7abb993><div class="flex justify-between text-[11px] font-mono mb-1 text-muted-foreground" data-v-a7abb993><span data-v-a7abb993>Progres Unduhan</span><span class="font-bold text-foreground" data-v-a7abb993>${ssrInterpolate(task.progress)}%</span></div><div class="w-full h-2.5 bg-background border border-border rounded-full overflow-hidden shadow-inner" data-v-a7abb993><div class="${ssrRenderClass([task.status === "downloading" ? "bg-gradient-to-r from-purple-500 to-indigo-500" : "bg-amber-500/50", "h-full transition-all duration-300 rounded-full"])}" style="${ssrRenderStyle({ width: `${task.progress}%` })}" data-v-a7abb993></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center gap-2 self-end md:self-center shrink-0" data-v-a7abb993>`);
          if (task.status === "downloading" || task.status === "pending") {
            _push(`<button class="px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold transition-all" data-v-a7abb993> Batal </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="px-3 py-1.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-border text-xs font-semibold transition-all" data-v-a7abb993> Hapus </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/downloader/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a7abb993"]]);

export { index as default };
//# sourceMappingURL=index-Sp-7vlYN.mjs.map
