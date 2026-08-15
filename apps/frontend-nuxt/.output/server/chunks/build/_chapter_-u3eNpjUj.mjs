import { _ as __nuxt_component_0 } from './nuxt-link-D-q3B9f2.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useMangaStore } from './manga-BDIsHlOU.mjs';
import { u as useApi } from './useApi-CRMpFdoX.mjs';
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
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[chapter]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const mangaStore = useMangaStore();
    const slug = route.params.slug;
    const chapter = route.params.chapter;
    const loading = ref(true);
    const immersive = ref(false);
    const readPercent = ref(0);
    const currentPageIndex = ref(0);
    const chaptersList = ref([]);
    const readerMode = computed(() => mangaStore.readerMode);
    const fitMode = ref("width");
    const pages = computed(() => mangaStore.currentChapterPages);
    const fitClasses = computed(() => {
      if (fitMode.value === "height") return "max-h-[90vh] w-auto";
      if (fitMode.value === "full") return "w-full max-w-none";
      return "max-w-3xl w-full";
    });
    const currentIndex = computed(() => {
      if (!chaptersList.value.length) return -1;
      const currentFileName = chapter.replace(/\\/g, "/").split("/").pop() || chapter;
      return chaptersList.value.findIndex((c) => {
        const fn = (c.file || c.id || "").replace(/\\/g, "/").split("/").pop();
        return fn === currentFileName || c.file === chapter || c.title === chapter;
      });
    });
    const prevChapter = computed(() => {
      if (currentIndex.value > 0) {
        return chaptersList.value[currentIndex.value - 1];
      }
      return null;
    });
    const nextChapter = computed(() => {
      if (currentIndex.value >= 0 && currentIndex.value < chaptersList.value.length - 1) {
        return chaptersList.value[currentIndex.value + 1];
      }
      return null;
    });
    async function loadChapter() {
      loading.value = true;
      currentPageIndex.value = 0;
      try {
        const api = useApi();
        if (!chaptersList.value.length) {
          const listRes = await api.get(`/manga/${slug}/chapters`);
          if (listRes == null ? void 0 : listRes.data) {
            chaptersList.value = listRes.data;
          }
        }
        await mangaStore.fetchChapterPages(slug, chapter);
        if (false) ;
      } catch (e) {
        console.error("Failed to load manga chapter", e);
      } finally {
        loading.value = false;
      }
    }
    watch(() => route.params.chapter, (next) => {
      if (typeof next === "string") void loadChapter();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "manga-reader min-h-screen bg-[#07090e] text-gray-200 relative pb-16 select-none" }, _attrs))} data-v-e4e711f0><div class="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-40 pointer-events-none" data-v-e4e711f0><div class="bg-primary h-1 transition-all duration-150" style="${ssrRenderStyle({ width: `${readPercent.value}%` })}" data-v-e4e711f0></div></div>`);
      if (!immersive.value) {
        _push(`<header class="sticky top-1 z-30 backdrop-blur-xl py-2.5 mb-4 border border-border/80 bg-card/90 flex flex-wrap items-center justify-between px-3 md:px-6 max-w-5xl mx-auto gap-2.5 rounded-2xl shadow-2xl" data-v-e4e711f0>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/manga/${unref(slug)}`,
          class: "px-3.5 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u2190 Detail `);
            } else {
              return [
                createTextVNode(" \u2190 Detail ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center gap-2 flex-wrap" data-v-e4e711f0><button class="px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-md active:scale-95" data-v-e4e711f0><span data-v-e4e711f0>${ssrInterpolate(readerMode.value === "webtoon" ? "\u{1F4DC} Mode Webtoon (Vertical)" : "\u{1F4C4} Mode Manga (Flip)")}</span></button><select class="bg-background border border-border rounded-full px-3 py-1 text-xs font-semibold text-foreground focus:outline-none focus:border-primary" data-v-e4e711f0><option value="width" data-v-e4e711f0${ssrIncludeBooleanAttr(Array.isArray(fitMode.value) ? ssrLooseContain(fitMode.value, "width") : ssrLooseEqual(fitMode.value, "width")) ? " selected" : ""}>Fit Lebar</option><option value="height" data-v-e4e711f0${ssrIncludeBooleanAttr(Array.isArray(fitMode.value) ? ssrLooseContain(fitMode.value, "height") : ssrLooseEqual(fitMode.value, "height")) ? " selected" : ""}>Fit Tinggi</option><option value="full" data-v-e4e711f0${ssrIncludeBooleanAttr(Array.isArray(fitMode.value) ? ssrLooseContain(fitMode.value, "full") : ssrLooseEqual(fitMode.value, "full")) ? " selected" : ""}>100% Asli</option></select><button class="px-3 py-1.5 rounded-full text-xs font-semibold bg-background border border-border text-foreground hover:bg-border/60" data-v-e4e711f0>${ssrInterpolate(immersive.value ? "Normal" : "Immersive")}</button></div></header>`);
      } else {
        _push(`<!---->`);
      }
      if (!immersive.value && !loading.value) {
        _push(`<div class="max-w-5xl mx-auto px-3 sm:px-4 mb-4" data-v-e4e711f0><div class="flex items-center justify-between gap-2 p-2.5 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm" data-v-e4e711f0><button${ssrIncludeBooleanAttr(!prevChapter.value) ? " disabled" : ""} class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed" data-v-e4e711f0><span data-v-e4e711f0>\u2B05\uFE0F</span> <span class="hidden sm:inline" data-v-e4e711f0>Chapter Sebelumnya</span></button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/manga/${unref(slug)}`,
          class: "px-3 py-2 rounded-xl text-xs font-bold bg-background border border-border text-foreground hover:bg-border/60 text-center truncate max-w-[150px] sm:max-w-xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F4CB} <span class="hidden sm:inline" data-v-e4e711f0${_scopeId}>Daftar Chapter</span>`);
            } else {
              return [
                createTextVNode(" \u{1F4CB} "),
                createVNode("span", { class: "hidden sm:inline" }, "Daftar Chapter")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button${ssrIncludeBooleanAttr(!nextChapter.value) ? " disabled" : ""} class="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed" data-v-e4e711f0><span class="hidden sm:inline" data-v-e4e711f0>Chapter Selanjutnya</span> <span data-v-e4e711f0>\u27A1\uFE0F</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="max-w-5xl mx-auto px-2 sm:px-4 pb-12" data-v-e4e711f0>`);
      if (loading.value) {
        _push(`<div class="py-20 flex justify-center" data-v-e4e711f0><div class="spinner" data-v-e4e711f0></div></div>`);
      } else if (pages.value.length === 0) {
        _push(`<div class="py-20 text-center text-muted-foreground" data-v-e4e711f0>Tidak ada gambar halaman di chapter ini.</div>`);
      } else if (readerMode.value === "webtoon") {
        _push(`<div class="flex flex-col items-center gap-1 sm:gap-2" data-v-e4e711f0><!--[-->`);
        ssrRenderList(pages.value, (pageUrl, idx) => {
          _push(`<div${ssrRenderAttr("id", `page-${idx}`)} class="${ssrRenderClass(["transition-all flex justify-center w-full", fitClasses.value])}" data-v-e4e711f0><img${ssrRenderAttr("src", pageUrl)}${ssrRenderAttr("alt", `Halaman ${idx + 1}`)} class="rounded-lg shadow-2xl object-contain max-w-full" loading="lazy" data-v-e4e711f0></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (readerMode.value === "flip") {
        _push(`<div class="flex flex-col items-center justify-center min-h-[70vh]" data-v-e4e711f0><div class="relative max-w-full flex justify-center mb-4" data-v-e4e711f0><img${ssrRenderAttr("src", pages.value[currentPageIndex.value])}${ssrRenderAttr("alt", `Halaman ${currentPageIndex.value + 1}`)} class="${ssrRenderClass(["rounded-xl shadow-2xl object-contain max-h-[85vh]", fitClasses.value])}" data-v-e4e711f0></div><div class="flex items-center gap-4 bg-card/90 border border-border/80 px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md" data-v-e4e711f0><button${ssrIncludeBooleanAttr(currentPageIndex.value === 0) ? " disabled" : ""} class="px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold hover:bg-border/60 disabled:opacity-30" data-v-e4e711f0> \u2190 Halaman Sebelum </button><span class="text-xs font-mono font-bold text-amber-400" data-v-e4e711f0> Halaman ${ssrInterpolate(currentPageIndex.value + 1)} dari ${ssrInterpolate(pages.value.length)}</span><button${ssrIncludeBooleanAttr(currentPageIndex.value === pages.value.length - 1) ? " disabled" : ""} class="px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold hover:bg-border/60 disabled:opacity-30" data-v-e4e711f0> Halaman Berikut \u2192 </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && pages.value.length > 0) {
        _push(`<div class="mt-8 flex items-center justify-between gap-3 p-3 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md shadow-md" data-v-e4e711f0><button${ssrIncludeBooleanAttr(!prevChapter.value) ? " disabled" : ""} class="px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md" data-v-e4e711f0><span data-v-e4e711f0>\u2B05\uFE0F</span> <span data-v-e4e711f0>Chapter Sebelumnya</span></button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/manga/${unref(slug)}`,
          class: "px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-background border border-border text-foreground hover:bg-border/60 text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u{1F4CB} <span class="hidden sm:inline" data-v-e4e711f0${_scopeId}>Daftar Chapter</span>`);
            } else {
              return [
                createTextVNode(" \u{1F4CB} "),
                createVNode("span", { class: "hidden sm:inline" }, "Daftar Chapter")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button${ssrIncludeBooleanAttr(!nextChapter.value) ? " disabled" : ""} class="px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-background border border-border text-foreground hover:bg-border/60 flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md" data-v-e4e711f0><span data-v-e4e711f0>Chapter Selanjutnya</span> <span data-v-e4e711f0>\u27A1\uFE0F</span></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manga/[slug]/[chapter].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _chapter_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e4e711f0"]]);

export { _chapter_ as default };
//# sourceMappingURL=_chapter_-u3eNpjUj.mjs.map
