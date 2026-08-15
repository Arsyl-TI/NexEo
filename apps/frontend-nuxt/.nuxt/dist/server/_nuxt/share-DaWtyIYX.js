import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { u as useToast } from "./useToast-B8q9yI-P.js";
import { _ as _export_sfc } from "../server.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "share",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const files = ref([]);
    const loading = ref(true);
    const isDragging = ref(false);
    const uploading = ref(false);
    const uploadProgress = ref(0);
    const uploadComplete = ref(false);
    ref(null);
    const selectedCategory = ref("all");
    const searchQuery = ref("");
    const getCategoryLabel = (cat) => {
      const map = {
        all: "📁 Semua",
        image: "🖼️ Gambar",
        video: "🎬 Video",
        document: "📄 Dokumen",
        archive: "📦 Arsip"
      };
      return map[cat] || cat;
    };
    const getFileIcon = (filename) => {
      const ext = filename.split(".").pop()?.toLowerCase() || "";
      if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) return "🖼️";
      if (["mp4", "mkv", "webm", "avi", "mov"].includes(ext)) return "🎬";
      if (["pdf", "doc", "docx", "txt", "epub"].includes(ext)) return "📄";
      if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "📦";
      return "📁";
    };
    const filteredFiles = computed(() => {
      return files.value.filter((file) => {
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        let matchCat = true;
        if (selectedCategory.value === "image") matchCat = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext);
        else if (selectedCategory.value === "video") matchCat = ["mp4", "mkv", "webm", "avi", "mov"].includes(ext);
        else if (selectedCategory.value === "document") matchCat = ["pdf", "doc", "docx", "txt", "epub"].includes(ext);
        else if (selectedCategory.value === "archive") matchCat = ["zip", "rar", "7z", "tar", "gz"].includes(ext);
        const matchSearch = !searchQuery.value.trim() || file.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchCat && matchSearch;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "file-share max-w-5xl mx-auto" }, _attrs))} data-v-2a783cba><div class="flex items-center justify-between mb-8" data-v-2a783cba><div data-v-2a783cba><h1 class="text-3xl font-bold text-foreground tracking-tight mb-1" data-v-2a783cba>Berbagi Berkas Lokal (LAN)</h1><p class="text-xs text-muted-foreground" data-v-2a783cba>Unggah dan bagikan file instan antar perangkat di jaringan Wi-Fi / LAN yang sama</p></div><span class="text-muted-foreground bg-card border border-border px-3.5 py-1.5 rounded-full text-xs font-mono font-medium" data-v-2a783cba>${ssrInterpolate(files.value.length)} berkas</span></div><div class="${ssrRenderClass([isDragging.value ? "border-primary bg-primary/10 shadow-primary/20 shadow-2xl scale-[1.01]" : "border-border/80 hover:border-primary/50 hover:bg-card/60", "bg-card/40 border-2 border-dashed rounded-3xl p-10 text-center mb-8 transition-all duration-300 backdrop-blur-xl"])}" data-v-2a783cba><input type="file" class="hidden" multiple data-v-2a783cba>`);
      if (!uploading.value) {
        _push(`<div class="cursor-pointer" data-v-2a783cba><div class="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary shadow-lg" data-v-2a783cba><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2a783cba><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-2a783cba></path></svg></div><p class="text-foreground font-semibold text-lg mb-1" data-v-2a783cba>Klik atau seret berkas ke sini</p><p class="text-muted-foreground text-xs" data-v-2a783cba>Mendukung berkas besar hingga 10GB per file</p></div>`);
      } else {
        _push(`<div class="w-full max-w-md mx-auto" data-v-2a783cba><p class="text-foreground font-medium mb-3 text-sm" data-v-2a783cba>`);
        if (uploadComplete.value) {
          _push(`<span class="text-emerald-400 flex items-center justify-center font-bold" data-v-2a783cba><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2a783cba><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-2a783cba></path></svg> Pengunggahan Selesai! </span>`);
        } else {
          _push(`<span data-v-2a783cba>Mengunggah berkas... ${ssrInterpolate(uploadProgress.value)}%</span>`);
        }
        _push(`</p><div class="w-full h-3 bg-card border border-border rounded-full overflow-hidden shadow-inner" data-v-2a783cba><div class="${ssrRenderClass([uploadComplete.value ? "bg-emerald-500" : "bg-primary", "h-full transition-all duration-300"])}" style="${ssrRenderStyle({ width: `${uploadProgress.value}%` })}" data-v-2a783cba></div></div></div>`);
      }
      _push(`</div><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6" data-v-2a783cba><div class="flex items-center gap-1.5 overflow-x-auto pb-1" data-v-2a783cba><!--[-->`);
      ssrRenderList(["all", "image", "video", "document", "archive"], (cat) => {
        _push(`<button class="${ssrRenderClass(["px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all", selectedCategory.value === cat ? "bg-primary text-white shadow-md" : "bg-card/70 border border-border text-muted-foreground hover:text-foreground"])}" data-v-2a783cba>${ssrInterpolate(getCategoryLabel(cat))}</button>`);
      });
      _push(`<!--]--></div><div class="relative w-full sm:w-64" data-v-2a783cba><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari nama berkas..." class="w-full pl-9 pr-4 py-1.5 bg-background border border-border rounded-full text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" data-v-2a783cba><span class="absolute left-3 top-2 text-xs text-muted-foreground" data-v-2a783cba>🔍</span></div></div><div data-v-2a783cba>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-12" data-v-2a783cba><div class="spinner" data-v-2a783cba></div></div>`);
      } else if (filteredFiles.value.length === 0) {
        _push(`<div class="text-center py-16 bg-card/40 rounded-2xl border border-border/60 text-muted-foreground text-sm" data-v-2a783cba> Tidak ada berkas yang cocok dengan pencarian atau filter. </div>`);
      } else {
        _push(`<div class="space-y-3" data-v-2a783cba><!--[-->`);
        ssrRenderList(filteredFiles.value, (file) => {
          _push(`<div class="bg-card/70 border border-border/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-all shadow-md" data-v-2a783cba><div class="flex items-center overflow-hidden" data-v-2a783cba><div class="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary text-xl mr-3.5 shrink-0" data-v-2a783cba>${ssrInterpolate(getFileIcon(file.name))}</div><div class="min-w-0" data-v-2a783cba><h4 class="text-foreground font-semibold text-sm truncate"${ssrRenderAttr("title", file.name)} data-v-2a783cba>${ssrInterpolate(file.name)}</h4><p class="text-xs text-muted-foreground font-mono mt-0.5" data-v-2a783cba>${ssrInterpolate(file.sizeFormatted)} • ${ssrInterpolate(new Date(file.modified).toLocaleDateString("id-ID"))}</p></div></div><div class="flex items-center space-x-2 shrink-0" data-v-2a783cba><button class="px-3 py-1.5 bg-card hover:bg-border border border-border rounded-xl text-xs font-semibold text-foreground transition-all flex items-center gap-1.5" title="Salin Tautan Unduh" data-v-2a783cba><span data-v-2a783cba>📋</span> Salin Link </button><a${ssrRenderAttr("href", `/api/shared-files/download/${encodeURIComponent(file.name)}`)} download class="p-2 text-muted-foreground hover:text-foreground hover:bg-border/80 border border-border rounded-xl transition-colors" title="Download" data-v-2a783cba><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2a783cba><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" data-v-2a783cba></path></svg></a><button class="p-2 text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 border border-border rounded-xl transition-colors" title="Hapus" data-v-2a783cba><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2a783cba><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-2a783cba></path></svg></button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/share.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const share = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2a783cba"]]);
export {
  share as default
};
//# sourceMappingURL=share-DaWtyIYX.js.map
