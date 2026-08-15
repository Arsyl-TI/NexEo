import { _ as __nuxt_component_0 } from "./nuxt-link-D-q3B9f2.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { u as useMangaStore } from "./manga-BDIsHlOU.js";
import { _ as _export_sfc } from "../server.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "pinia";
import "./useApi-CRMpFdoX.js";
import "D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = route.params.slug;
    const mangaStore = useMangaStore();
    const chapterSearch = ref("");
    const chapterSort = ref("asc");
    const resumeChapter = ref(null);
    const manga = computed(() => mangaStore.currentManga);
    const chapters = computed(() => mangaStore.currentManga?.chapters || []);
    const hasResumeChapter = computed(() => {
      const saved = typeof resumeChapter.value === "string" ? resumeChapter.value.trim() : "";
      return Boolean(saved) && chapters.value.some((c) => c.file === saved);
    });
    const filteredChapters = computed(() => {
      let list = [...chapters.value];
      if (chapterSearch.value.trim()) {
        const q = chapterSearch.value.toLowerCase();
        list = list.filter((c) => c.title.toLowerCase().includes(q));
      }
      if (chapterSort.value === "desc") {
        list.reverse();
      }
      return list;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "manga-detail relative min-h-screen bg-background pb-16" }, _attrs))} data-v-4c54d9a8><div class="absolute inset-0 top-0 left-0 right-0 h-[380px] sm:h-[480px] overflow-hidden pointer-events-none z-0" data-v-4c54d9a8>`);
      if (manga.value?.cover) {
        _push(`<div class="absolute inset-0 opacity-25 blur-3xl scale-110" style="${ssrRenderStyle({
          backgroundImage: `url(${manga.value.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        })}" data-v-4c54d9a8></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" data-v-4c54d9a8></div></div><div class="max-w-6xl mx-auto relative z-10 px-3 sm:px-6 pt-4" data-v-4c54d9a8>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/manga",
        class: "inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/70 hover:bg-border/80 border border-border/60 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all shadow-md backdrop-blur-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Kembali ke Koleksi Manga `);
          } else {
            return [
              createTextVNode(" ← Kembali ke Koleksi Manga ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(mangaStore).loading) {
        _push(`<div class="flex justify-center py-20" data-v-4c54d9a8><div class="spinner" data-v-4c54d9a8></div></div>`);
      } else if (!manga.value) {
        _push(`<div class="text-center py-20 bg-card/40 border border-border rounded-2xl text-muted-foreground" data-v-4c54d9a8>Komik tidak ditemukan.</div>`);
      } else {
        _push(`<div data-v-4c54d9a8><div class="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10" data-v-4c54d9a8><div class="w-full lg:w-72 shrink-0 flex flex-col items-center lg:items-start" data-v-4c54d9a8><div class="w-48 sm:w-60 lg:w-full aspect-[2/3] rounded-2xl overflow-hidden border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-card mb-5 relative group" data-v-4c54d9a8>`);
        if (manga.value.cover) {
          _push(`<img${ssrRenderAttr("src", manga.value.cover)} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" data-v-4c54d9a8>`);
        } else {
          _push(`<div class="flex flex-col items-center justify-center h-full text-muted-foreground text-xs p-4 text-center" data-v-4c54d9a8><span data-v-4c54d9a8>🎨</span><span class="mt-2" data-v-4c54d9a8>No Cover</span></div>`);
        }
        _push(`</div><div class="w-full flex flex-col gap-2.5" data-v-4c54d9a8>`);
        if (hasResumeChapter.value) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/manga/${unref(slug)}/${resumeChapter.value}`,
            class: "w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-4c54d9a8${_scopeId}>▶</span> Lanjutkan Membaca `);
              } else {
                return [
                  createVNode("span", null, "▶"),
                  createTextVNode(" Lanjutkan Membaca ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (chapters.value.length > 0) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/manga/${unref(slug)}/${chapters.value[0].file}`,
            class: "w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-4c54d9a8${_scopeId}>🎨</span> Mulai Membaca Chapter 1 `);
              } else {
                return [
                  createVNode("span", null, "🎨"),
                  createTextVNode(" Mulai Membaca Chapter 1 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full mt-4 p-4 rounded-2xl bg-card/50 border border-border/60 flex items-center justify-between text-xs" data-v-4c54d9a8><span class="text-muted-foreground font-medium" data-v-4c54d9a8>Total Chapter</span><span class="text-amber-400 font-bold font-mono text-base" data-v-4c54d9a8>${ssrInterpolate(chapters.value.length)}</span></div></div><div class="flex-1 min-w-0" data-v-4c54d9a8><h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-3" data-v-4c54d9a8>${ssrInterpolate(manga.value.title)}</h1><div class="flex flex-wrap items-center gap-2.5 mb-5 text-xs" data-v-4c54d9a8>`);
        if (manga.value.author) {
          _push(`<div class="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3.5 py-1.5 rounded-full font-medium" data-v-4c54d9a8><span data-v-4c54d9a8>👤</span> Author: <span class="font-bold text-white" data-v-4c54d9a8>${ssrInterpolate(manga.value.author)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (manga.value.description) {
          _push(`<p class="text-sm text-muted-foreground leading-relaxed mb-6 bg-card/40 border border-border/60 p-4 rounded-2xl" data-v-4c54d9a8>${ssrInterpolate(manga.value.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col sm:flex-row gap-3 justify-between items-center bg-card/40 border border-border/60 p-3 rounded-2xl mb-4" data-v-4c54d9a8><div class="relative w-full sm:w-72" data-v-4c54d9a8><input${ssrRenderAttr("value", chapterSearch.value)} type="text" placeholder="Cari chapter komik..." class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" data-v-4c54d9a8><span class="absolute left-3 top-2.5 text-xs text-muted-foreground" data-v-4c54d9a8>🔍</span></div><button class="px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5" data-v-4c54d9a8><span data-v-4c54d9a8>${ssrInterpolate(chapterSort.value === "asc" ? "⬇ Urut Awal" : "⬆ Urut Akhir")}</span></button></div>`);
        if (filteredChapters.value.length === 0) {
          _push(`<div class="py-12 text-center text-muted-foreground text-xs" data-v-4c54d9a8> Tidak ada chapter yang ditemukan. </div>`);
        } else {
          _push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-3" data-v-4c54d9a8><!--[-->`);
          ssrRenderList(filteredChapters.value, (c) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: c.id,
              to: `/manga/${unref(slug)}/${encodeURIComponent(c.file)}`,
              class: "group flex items-center justify-between p-3.5 rounded-xl bg-card/60 hover:bg-card border border-border/60 hover:border-primary/50 transition-all shadow-sm"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center gap-3 min-w-0" data-v-4c54d9a8${_scopeId}><span class="text-lg" data-v-4c54d9a8${_scopeId}>🎨</span><span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate" data-v-4c54d9a8${_scopeId}>${ssrInterpolate(c.title)}</span></div><span class="text-[10px] text-muted-foreground font-mono shrink-0 ml-2 group-hover:text-primary" data-v-4c54d9a8${_scopeId}>${ssrInterpolate(c.pageCount ? `${c.pageCount} Hal` : "Baca")} → </span>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3 min-w-0" }, [
                      createVNode("span", { class: "text-lg" }, "🎨"),
                      createVNode("span", { class: "text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate" }, toDisplayString(c.title), 1)
                    ]),
                    createVNode("span", { class: "text-[10px] text-muted-foreground font-mono shrink-0 ml-2 group-hover:text-primary" }, toDisplayString(c.pageCount ? `${c.pageCount} Hal` : "Baca") + " → ", 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manga/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c54d9a8"]]);
export {
  index as default
};
//# sourceMappingURL=index-CrGzZAvu.js.map
