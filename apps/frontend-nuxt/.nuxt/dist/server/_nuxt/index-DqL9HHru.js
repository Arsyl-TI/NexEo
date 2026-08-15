import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { u as useToast } from "./useToast-B8q9yI-P.js";
import { u as useNovelStore } from "./index-D8kQjp-3.js";
import "D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "pinia";
import "D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const novelStore = useNovelStore();
    useToast();
    ref(null);
    const searchQuery = ref("");
    const selectedTag = ref("");
    const loading = ref(true);
    const resumeProgress = ref({});
    const library = computed(() => novelStore.library);
    const allTags = computed(() => [...new Set(library.value.flatMap((n) => n.tags ?? []))].sort());
    const filteredLibrary = computed(() => library.value.filter((novel) => {
      const matchSearch = novel.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchTag = selectedTag.value === "" || novel.tags?.includes(selectedTag.value);
      return matchSearch && matchTag;
    }));
    function getResumeLabel(folderName) {
      return resumeProgress.value[folderName]?.replace(/-/g, " ") ?? "Resume";
    }
    function chapterFileNumber(file) {
      const match = file.match(/(\d+)/);
      return match ? Number(match[1]) : 0;
    }
    function calcProgress(novel, resumeChapter) {
      const folderName = novel.folderName ?? novel.slug;
      if (!folderName || !resumeChapter) return 0;
      const chapters = Number(novel.chapterCount || novel.chapters || 0);
      const position = chapterFileNumber(resumeChapter) || 1;
      if (chapters > 0) return Math.min(100, Math.max(1, Math.round(position / chapters * 100)));
      return 0;
    }
    const continueReading = computed(() => {
      return library.value.map((novel, index2) => {
        const folderName = novel.folderName ?? novel.slug;
        if (!folderName) return null;
        const resumeChapter = resumeProgress.value[folderName];
        if (!resumeChapter) return null;
        return { ...novel, resumeChapter, resumeLabel: getResumeLabel(folderName), progress: calcProgress(novel, resumeChapter), sortIndex: index2 };
      }).filter((x) => Boolean(x)).sort((a, b) => b.sortIndex - a.sortIndex).slice(0, 6);
    });
    function getThumbnailUrl(novel) {
      if (novel.cover) return novel.cover;
      return void 0;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "novel-library" }, _attrs))} data-v-7067f306>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-20" data-v-7067f306><div class="spinner" data-v-7067f306></div></div>`);
      } else {
        _push(`<div data-v-7067f306><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" data-v-7067f306><div class="flex items-center gap-3" data-v-7067f306><h1 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight" data-v-7067f306>Koleksi Novel</h1><span class="text-muted-foreground bg-card/80 border border-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium" data-v-7067f306>${ssrInterpolate(library.value.length)} novel</span></div><div class="flex flex-wrap items-center gap-2" data-v-7067f306><input type="file" accept=".epub" class="hidden" data-v-7067f306><button${ssrIncludeBooleanAttr(unref(novelStore).isImporting) ? " disabled" : ""} class="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed" data-v-7067f306>`);
        if (unref(novelStore).isImporting) {
          _push(`<span class="spinner border-2 w-3.5 h-3.5" data-v-7067f306></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-7067f306>${ssrInterpolate(unref(novelStore).isImporting ? "Mengimpor..." : "Import EPUB")}</span></button><button${ssrIncludeBooleanAttr(unref(novelStore).isUpdating) ? " disabled" : ""} class="flex items-center gap-2 bg-card hover:bg-gray-800 border border-gray-700 text-foreground px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all" data-v-7067f306> Perbarui Katalog </button></div></div><div class="flex flex-col sm:flex-row gap-3 mb-8 bg-card/40 p-3.5 rounded-2xl border border-gray-700/50" data-v-7067f306><div class="flex-1 relative" data-v-7067f306><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="w-full pl-4 pr-4 py-2 bg-background border border-gray-700 rounded-xl text-sm text-foreground placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all" placeholder="Cari judul novel..." data-v-7067f306></div><select class="w-full sm:w-56 px-4 py-2 bg-background border border-gray-700 rounded-xl text-sm text-foreground outline-none" data-v-7067f306><option value="" data-v-7067f306${ssrIncludeBooleanAttr(Array.isArray(selectedTag.value) ? ssrLooseContain(selectedTag.value, "") : ssrLooseEqual(selectedTag.value, "")) ? " selected" : ""}>Semua tag</option><!--[-->`);
        ssrRenderList(allTags.value, (tag) => {
          _push(`<option${ssrRenderAttr("value", tag)} data-v-7067f306${ssrIncludeBooleanAttr(Array.isArray(selectedTag.value) ? ssrLooseContain(selectedTag.value, tag) : ssrLooseEqual(selectedTag.value, tag)) ? " selected" : ""}>${ssrInterpolate(tag)}</option>`);
        });
        _push(`<!--]--></select></div>`);
        if (continueReading.value.length) {
          _push(`<div class="mb-8" data-v-7067f306><h2 class="text-lg font-bold mb-4 text-foreground" data-v-7067f306>Lanjutkan Membaca</h2><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" data-v-7067f306><!--[-->`);
          ssrRenderList(continueReading.value, (novel) => {
            _push(`<div class="group cursor-pointer" data-v-7067f306><div class="aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 border border-gray-700 shadow-lg relative" data-v-7067f306>`);
            if (getThumbnailUrl(novel)) {
              _push(`<img${ssrRenderAttr("src", getThumbnailUrl(novel))} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-v-7067f306>`);
            } else {
              _push(`<div class="flex items-center justify-center h-full text-xs text-muted-foreground" data-v-7067f306>No Cover</div>`);
            }
            _push(`<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3" data-v-7067f306><div class="text-xs text-white font-medium line-clamp-2" data-v-7067f306>${ssrInterpolate(novel.title)}</div><div class="w-full bg-gray-700 rounded-full h-1 mt-2" data-v-7067f306><div class="bg-primary h-1 rounded-full" style="${ssrRenderStyle({ width: novel.progress + "%" })}" data-v-7067f306></div></div></div></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (filteredLibrary.value.length === 0) {
          _push(`<div class="text-center py-20 bg-card/50 rounded-2xl border border-gray-700" data-v-7067f306><h2 class="text-2xl font-bold text-white mb-2" data-v-7067f306>Tidak ada novel ditemukan</h2><p class="text-gray-500" data-v-7067f306>Coba ubah filter pencarian atau tag, atau impor file EPUB baru.</p></div>`);
        } else {
          _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" data-v-7067f306><!--[-->`);
          ssrRenderList(filteredLibrary.value, (novel) => {
            _push(`<div class="group cursor-pointer" data-v-7067f306><div class="aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-primary transition-all shadow-lg relative mb-2" data-v-7067f306>`);
            if (getThumbnailUrl(novel)) {
              _push(`<img${ssrRenderAttr("src", getThumbnailUrl(novel))} class="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" data-v-7067f306>`);
            } else {
              _push(`<div class="flex items-center justify-center h-full text-xs text-muted-foreground" data-v-7067f306>No Cover</div>`);
            }
            _push(`</div><h3 class="font-medium text-sm text-gray-300 line-clamp-1 group-hover:text-primary transition-colors" data-v-7067f306>${ssrInterpolate(novel.title)}</h3>`);
            if (novel.author) {
              _push(`<p class="text-xs text-gray-500 mt-0.5" data-v-7067f306>${ssrInterpolate(novel.author)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/novels/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7067f306"]]);
export {
  index as default
};
//# sourceMappingURL=index-DqL9HHru.js.map
