import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { u as useToast } from "./useToast-B8q9yI-P.js";
import { u as useNovelStore } from "./index-D8kQjp-3.js";
import "pinia";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "novel-browser",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    useNovelStore();
    const sources = ref([]);
    const selectedSource = ref("");
    const searchQuery = ref("");
    const novelList = ref([]);
    ref(null);
    const selectedNovelDetail = ref(null);
    const isLoadingDetail = ref(false);
    const detailTab = ref("synopsis");
    const chapterFilter = ref("all");
    const filteredNovels = computed(() => {
      const validNovels = novelList.value.filter((n) => {
        const title = typeof n?.title === "string" ? n.title.trim() : "";
        const slug = typeof n?.slug === "string" ? n.slug.trim() : "";
        return title && slug && title !== "Unknown" && title !== "undefined";
      });
      if (!searchQuery.value) return validNovels;
      const q = searchQuery.value.toLowerCase();
      return validNovels.filter((n) => n.title.toLowerCase().includes(q) || n.author && n.author.toLowerCase().includes(q));
    });
    computed(() => {
      return selectedNovelDetail.value?.chapters?.length || 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "novel-browser" }, _attrs))}>`);
      if (selectedNovelDetail.value || isLoadingDetail.value) {
        _push(`<div class="fixed inset-0 bg-black/80 z-50 overflow-y-auto backdrop-blur-sm transition-opacity duration-300"><div class="min-h-screen flex items-start justify-center p-4 py-8"><div class="bg-background backdrop-blur-xl rounded-2xl max-w-4xl w-full relative border border-border/50 my-auto">`);
        if (selectedNovelDetail.value?.cover) {
          _push(`<div class="absolute left-0 right-0 top-0 h-96 overflow-hidden rounded-t-2xl pointer-events-none"><div class="absolute inset-0 blur-3xl opacity-40" style="${ssrRenderStyle({ backgroundImage: `url(${selectedNovelDetail.value.cover})`, backgroundSize: "cover", backgroundPosition: "center" })}"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="absolute top-4 right-4 z-30 p-2 rounded-full bg-card/60 hover:bg-border/80 text-muted-foreground hover:text-foreground transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
        if (isLoadingDetail.value) {
          _push(`<div class="p-20 flex flex-col items-center justify-center"><div class="spinner mb-4"></div><p class="text-muted-foreground text-sm">Memuat detail novel...</p></div>`);
        } else if (selectedNovelDetail.value) {
          _push(`<div class="p-8 relative z-10"><div class="flex flex-col md:flex-row gap-8 mb-8 pb-8"><div class="w-48 flex-shrink-0 mx-auto md:mx-0"><div class="aspect-[2/3] rounded-xl overflow-hidden border border-border shadow-2xl bg-card">`);
          if (selectedNovelDetail.value.cover) {
            _push(`<img${ssrRenderAttr("src", selectedNovelDetail.value.cover)} class="object-cover w-full h-full" loading="lazy">`);
          } else {
            _push(`<div class="flex items-center justify-center h-full text-muted-foreground">No Cover</div>`);
          }
          _push(`</div></div><div class="flex-1 text-center md:text-left"><h1 class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-3">${ssrInterpolate(selectedNovelDetail.value.title)}</h1>`);
          if (selectedNovelDetail.value.author) {
            _push(`<p class="text-muted-foreground mb-4">by <span class="text-primary font-semibold">${ssrInterpolate(selectedNovelDetail.value.author)}</span></p>`);
          } else {
            _push(`<!---->`);
          }
          if (selectedNovelDetail.value.tags?.length) {
            _push(`<div class="flex flex-wrap gap-2 justify-center md:justify-start mb-4"><!--[-->`);
            ssrRenderList(selectedNovelDetail.value.tags, (tag) => {
              _push(`<span class="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs">${ssrInterpolate(tag)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="h-px bg-border my-6"></div><p class="text-card-foreground text-sm leading-relaxed line-clamp-3">${ssrInterpolate(selectedNovelDetail.value.description || "Tidak ada sinopsis tersedia.")}</p><div class="mt-6 flex flex-col md:flex-row gap-3"><button class="flex-1 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"> Tambah ke Perpustakaan </button>`);
          if (selectedNovelDetail.value.sourceUrl) {
            _push(`<a${ssrRenderAttr("href", selectedNovelDetail.value.sourceUrl)} target="_blank" class="flex-1 px-4 py-2 bg-card text-card-foreground rounded-lg hover:bg-border transition-colors text-sm font-medium flex items-center justify-center"> Buka Sumber â†— </a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div><nav class="mb-6 border-b border-border"><!--[-->`);
          ssrRenderList(["synopsis", "info", "chapters"], (tab) => {
            _push(`<button class="${ssrRenderClass(["px-4 py-3 text-sm border-b-2 capitalize", detailTab.value === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"])}">${ssrInterpolate(tab)}</button>`);
          });
          _push(`<!--]--></nav>`);
          if (detailTab.value === "synopsis") {
            _push(`<section class="bg-card/40 rounded-xl p-6"><h2 class="text-lg font-bold text-foreground mb-3">Sinopsis</h2><div class="text-card-foreground text-sm leading-relaxed">${ssrInterpolate(selectedNovelDetail.value.description || "Tidak ada sinopsis tersedia.")}</div></section>`);
          } else if (detailTab.value === "info") {
            _push(`<section class="bg-card/40 rounded-xl p-6"><h2 class="text-lg font-bold text-foreground mb-3">Informasi</h2><div class="grid grid-cols-2 gap-4 text-sm">`);
            if (selectedNovelDetail.value.author) {
              _push(`<div class="text-muted-foreground">Author: <span class="text-foreground">${ssrInterpolate(selectedNovelDetail.value.author)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (selectedNovelDetail.value.status) {
              _push(`<div class="text-muted-foreground">Status: <span class="text-foreground">${ssrInterpolate(selectedNovelDetail.value.status)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (selectedNovelDetail.value.language) {
              _push(`<div class="text-muted-foreground">Language: <span class="text-foreground">${ssrInterpolate(selectedNovelDetail.value.language)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            if (selectedNovelDetail.value.type) {
              _push(`<div class="text-muted-foreground">Type: <span class="text-foreground">${ssrInterpolate(selectedNovelDetail.value.type)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></section>`);
          } else if (detailTab.value === "chapters") {
            _push(`<section class="bg-card/40 rounded-xl p-6 max-h-[50vh] overflow-y-auto"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-foreground">Daftar Bab</h2><div class="text-xs text-muted-foreground">${ssrInterpolate(selectedNovelDetail.value.chapters?.length || 0)} bab tersedia</div></div>`);
            if (!selectedNovelDetail.value.chapters || selectedNovelDetail.value.chapters.length === 0) {
              _push(`<div class="text-center py-8 text-muted-foreground text-sm"> Tidak ada daftar bab tersedia </div>`);
            } else {
              _push(`<div class="space-y-2"><div class="flex gap-2 mb-4"><button class="flex-1 px-3 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary rounded-lg text-xs font-medium transition-colors"> Unduh Semua Bab </button><select class="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-xs text-card-foreground focus:border-primary outline-none"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(chapterFilter.value) ? ssrLooseContain(chapterFilter.value, "all") : ssrLooseEqual(chapterFilter.value, "all")) ? " selected" : ""}>Semua Bab</option><!--[-->`);
              ssrRenderList(selectedNovelDetail.value.chapters, (ch) => {
                _push(`<option${ssrRenderAttr("value", ch.file)}${ssrIncludeBooleanAttr(Array.isArray(chapterFilter.value) ? ssrLooseContain(chapterFilter.value, ch.file) : ssrLooseEqual(chapterFilter.value, ch.file)) ? " selected" : ""}>${ssrInterpolate(ch.title)}</option>`);
              });
              _push(`<!--]--></select><button class="px-3 py-2 bg-primary hover:bg-primary/90 text-foreground rounded-lg text-xs font-medium transition-colors"> Unduh Pilihan </button></div><div class="space-y-2"><!--[-->`);
              ssrRenderList(selectedNovelDetail.value.chapters, (ch) => {
                _push(`<div class="p-3 flex items-center justify-between bg-card/60 border border-border/60 hover:border-amber-500/50 rounded-xl transition-all group"><div class="flex items-center gap-3 min-w-0"><div class="w-8 h-11 rounded-lg overflow-hidden shrink-0 border border-border/50 bg-background/60">`);
                if (selectedNovelDetail.value.cover) {
                  _push(`<img${ssrRenderAttr("src", selectedNovelDetail.value.cover)} class="object-cover w-full h-full" loading="lazy">`);
                } else {
                  _push(`<div class="flex items-center justify-center h-full text-[9px] text-muted-foreground">📖</div>`);
                }
                _push(`</div><span class="text-xs font-semibold text-foreground group-hover:text-amber-400 transition-colors truncate">${ssrInterpolate(ch.title)}</span></div><span class="text-[10px] font-mono text-muted-foreground px-2 py-0.5 bg-background border border-border rounded-md shrink-0">${ssrInterpolate(ch.file)}</span></div>`);
              });
              _push(`<!--]--></div></div>`);
            }
            _push(`</section>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-card/50 border border-border/50 rounded-2xl p-4 mb-6"><div class="flex flex-col md:flex-row gap-4 items-end"><div class="flex-1"><label class="block text-sm font-medium text-card-foreground mb-2">Sumber Novel</label><select class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-card-foreground focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all appearance-none"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedSource.value) ? ssrLooseContain(selectedSource.value, "") : ssrLooseEqual(selectedSource.value, "")) ? " selected" : ""}>-- Pilih Sumber --</option><!--[-->`);
      ssrRenderList(sources.value, (source) => {
        _push(`<option${ssrRenderAttr("value", source.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedSource.value) ? ssrLooseContain(selectedSource.value, source.id) : ssrLooseEqual(selectedSource.value, source.id)) ? " selected" : ""}>${ssrInterpolate(source.name)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      if (selectedSource.value) {
        _push(`<div class="flex-1"><label class="block text-sm font-medium text-card-foreground mb-2">Filter Novel</label><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-brand outline-none transition-all" placeholder="Ketik untuk filter..."></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (selectedSource.value && novelList.value.length > 0) {
        _push(`<div><h2 class="text-xl font-bold text-foreground mb-4"> Daftar Novel: <span class="text-primary">${ssrInterpolate(filteredNovels.value.length)}</span> novel ditemukan </h2>`);
        if (filteredNovels.value.length === 0) {
          _push(`<div class="text-center py-10 bg-card/30 rounded-xl border border-border/50 text-muted-foreground"> Tidak ada hasil filter. Coba kata kunci lain. </div>`);
        } else {
          _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"><!--[-->`);
          ssrRenderList(filteredNovels.value, (novel) => {
            _push(`<div class="group cursor-pointer"><div class="aspect-[2/3] w-full rounded-xl overflow-hidden bg-card border border-border group-hover:border-primary transition-all shadow-lg relative mb-3">`);
            if (novel.cover) {
              _push(`<img${ssrRenderAttr("src", novel.cover)} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" loading="lazy">`);
            } else {
              _push(`<div class="flex items-center justify-center w-full h-full text-muted-foreground text-sm">No Cover</div>`);
            }
            _push(`<div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4"><span class="text-foreground text-sm font-semibold bg-primary px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-brand/30">LIHAT DETAIL</span></div></div><h3 class="font-semibold text-sm text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">${ssrInterpolate(novel.title)}</h3><p class="text-xs text-muted-foreground mt-1">${ssrInterpolate(novel.author || "Unknown")}</p></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/novel-browser.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=novel-browser-NdZC1hGE.js.map
