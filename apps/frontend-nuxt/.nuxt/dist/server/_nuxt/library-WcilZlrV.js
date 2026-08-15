import { _ as __nuxt_component_0 } from "./nuxt-link-CcmIMMHP.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { u as useToast } from "./useToast-B8q9yI-P.js";
import "D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
import "D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "library",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("history");
    const searchQuery = ref("");
    const loading = ref(true);
    const historyItems = ref([]);
    const bookmarkItems = ref([]);
    useToast();
    const getThumbnailUrl = (pathStr) => {
      if (!pathStr) return "";
      if (pathStr.startsWith("http")) return pathStr;
      return `/api/thumbnails/${encodeURIComponent(pathStr)}`;
    };
    const filteredHistory = computed(() => {
      if (!searchQuery.value.trim()) return historyItems.value;
      const q = searchQuery.value.toLowerCase();
      return historyItems.value.filter((item) => item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q));
    });
    const filteredBookmarks = computed(() => {
      if (!searchQuery.value.trim()) return bookmarkItems.value;
      const q = searchQuery.value.toLowerCase();
      return bookmarkItems.value.filter((item) => item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q));
    });
    function removeBookmark(slug) {
      return;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "library-page min-h-screen pb-16" }, _attrs))} data-v-f60f4a85><div class="max-w-6xl mx-auto px-4 sm:px-6 pt-4" data-v-f60f4a85><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" data-v-f60f4a85><div data-v-f60f4a85><h1 class="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3" data-v-f60f4a85><span data-v-f60f4a85>📚</span> Pustaka &amp; Riwayat Baca Saya </h1><p class="text-xs text-muted-foreground mt-1" data-v-f60f4a85>Kelola novel favorit dan lacak progres bab novel yang sedang dibaca</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/novels",
        class: "btn-primary px-4 py-2 text-xs font-bold shadow-lg flex items-center gap-2 w-max"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-f60f4a85${_scopeId}>📖</span> Jelajahi Koleksi Novel `);
          } else {
            return [
              createVNode("span", null, "📖"),
              createTextVNode(" Jelajahi Koleksi Novel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 border-b border-border/80 pb-4" data-v-f60f4a85><div class="flex gap-4 w-full sm:w-auto" data-v-f60f4a85><button class="${ssrRenderClass(["pb-2 text-sm font-bold transition-all relative flex items-center gap-2", activeTab.value === "history" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"])}" data-v-f60f4a85><span data-v-f60f4a85>⏱️</span> Riwayat Terakhir (${ssrInterpolate(historyItems.value.length)}) </button><button class="${ssrRenderClass(["pb-2 text-sm font-bold transition-all relative flex items-center gap-2", activeTab.value === "bookmarks" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"])}" data-v-f60f4a85><span data-v-f60f4a85>📌</span> Koleksi Favorit (${ssrInterpolate(bookmarkItems.value.length)}) </button></div><div class="relative w-full sm:w-64" data-v-f60f4a85><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari dalam pustaka..." class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" data-v-f60f4a85><span class="absolute left-3 top-2.5 text-xs text-muted-foreground" data-v-f60f4a85>🔍</span></div></div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-20" data-v-f60f4a85><div class="spinner" data-v-f60f4a85></div></div>`);
      } else if (activeTab.value === "history") {
        _push(`<div data-v-f60f4a85>`);
        if (filteredHistory.value.length === 0) {
          _push(`<div class="text-center py-20 bg-card/40 border border-border/60 rounded-3xl p-8" data-v-f60f4a85><div class="text-4xl mb-3" data-v-f60f4a85>📖</div><h3 class="text-base font-bold text-foreground mb-1" data-v-f60f4a85>Belum Ada Riwayat Baca</h3><p class="text-xs text-muted-foreground mb-6" data-v-f60f4a85>Setiap bab novel yang Anda baca akan otomatis tercatat di sini!</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/novels",
            class: "btn-primary px-5 py-2.5 text-xs font-bold inline-flex items-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Mulai Membaca Novel `);
              } else {
                return [
                  createTextVNode(" Mulai Membaca Novel ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="space-y-4" data-v-f60f4a85><div class="flex justify-end mb-2" data-v-f60f4a85><button class="text-xs text-muted-foreground hover:text-rose-400 transition-colors" data-v-f60f4a85> Hapus Semua Riwayat </button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-f60f4a85><!--[-->`);
          ssrRenderList(filteredHistory.value, (item) => {
            _push(`<div class="glass-card-hover p-4 rounded-2xl border border-border/70 shadow-lg flex items-center justify-between gap-4" data-v-f60f4a85><div class="flex items-center gap-4 min-w-0" data-v-f60f4a85><div class="w-14 h-20 rounded-xl overflow-hidden bg-card border border-border shrink-0 shadow-md" data-v-f60f4a85>`);
            if (item.cover) {
              _push(`<img${ssrRenderAttr("src", getThumbnailUrl(item.cover))} class="w-full h-full object-cover" data-v-f60f4a85>`);
            } else {
              _push(`<div class="w-full h-full flex items-center justify-center text-xs" data-v-f60f4a85>📖</div>`);
            }
            _push(`</div><div class="min-w-0" data-v-f60f4a85><h4 class="font-bold text-sm text-foreground truncate mb-1" data-v-f60f4a85>${ssrInterpolate(item.title)}</h4><p class="text-xs text-amber-400 font-mono font-semibold mb-1" data-v-f60f4a85> 📍 Terakhir: ${ssrInterpolate(item.lastChapterTitle || item.lastChapter)}</p>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/novels/${item.slug}`,
              class: "text-[11px] text-muted-foreground hover:text-primary transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Halaman Novel → `);
                } else {
                  return [
                    createTextVNode(" Halaman Novel → ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/novels/${item.slug}/${encodeURIComponent(item.lastChapter)}`,
              class: "btn-primary px-4 py-2.5 text-xs font-bold shrink-0 shadow-md flex items-center gap-1.5 active:scale-95"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span data-v-f60f4a85${_scopeId}>▶</span> Lanjutkan `);
                } else {
                  return [
                    createVNode("span", null, "▶"),
                    createTextVNode(" Lanjutkan ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div></div>`);
        }
        _push(`</div>`);
      } else if (activeTab.value === "bookmarks") {
        _push(`<div data-v-f60f4a85>`);
        if (filteredBookmarks.value.length === 0) {
          _push(`<div class="text-center py-20 bg-card/40 border border-border/60 rounded-3xl p-8" data-v-f60f4a85><div class="text-4xl mb-3" data-v-f60f4a85>📌</div><h3 class="text-base font-bold text-foreground mb-1" data-v-f60f4a85>Koleksi Favorit Kosong</h3><p class="text-xs text-muted-foreground mb-6" data-v-f60f4a85>Tandai novel favorit Anda saat membuka detail novel untuk menyimpannya di sini.</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/novels",
            class: "btn-primary px-5 py-2.5 text-xs font-bold inline-flex items-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Cari Novel Favorit `);
              } else {
                return [
                  createTextVNode(" Cari Novel Favorit ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6" data-v-f60f4a85><!--[-->`);
          ssrRenderList(filteredBookmarks.value, (novel) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: novel.slug,
              to: `/novels/${novel.slug}`,
              class: "group glass-card-hover p-3 rounded-2xl border border-border/70 shadow-lg flex flex-col justify-between"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div data-v-f60f4a85${_scopeId}><div class="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border/80 mb-3 relative shadow-md" data-v-f60f4a85${_scopeId}>`);
                  if (novel.cover) {
                    _push2(`<img${ssrRenderAttr("src", getThumbnailUrl(novel.cover))} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-v-f60f4a85${_scopeId}>`);
                  } else {
                    _push2(`<div class="flex items-center justify-center w-full h-full text-xs text-muted-foreground" data-v-f60f4a85${_scopeId}>No Cover</div>`);
                  }
                  _push2(`</div><h4 class="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1" data-v-f60f4a85${_scopeId}>${ssrInterpolate(novel.title)}</h4>`);
                  if (novel.author) {
                    _push2(`<p class="text-[11px] text-muted-foreground truncate" data-v-f60f4a85${_scopeId}>👤 ${ssrInterpolate(novel.author)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><button class="mt-3 w-full py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-[11px] font-semibold transition-all" data-v-f60f4a85${_scopeId}> Hapus Favorit </button>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("div", { class: "aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border/80 mb-3 relative shadow-md" }, [
                        novel.cover ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: getThumbnailUrl(novel.cover),
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                          onError: ($event) => $event.target.style.display = "none"
                        }, null, 40, ["src", "onError"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center justify-center w-full h-full text-xs text-muted-foreground"
                        }, "No Cover"))
                      ]),
                      createVNode("h4", { class: "font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1" }, toDisplayString(novel.title), 1),
                      novel.author ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-[11px] text-muted-foreground truncate"
                      }, "👤 " + toDisplayString(novel.author), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("button", {
                      onClick: withModifiers(($event) => removeBookmark(novel.slug), ["prevent"]),
                      class: "mt-3 w-full py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-[11px] font-semibold transition-all"
                    }, " Hapus Favorit ", 8, ["onClick"])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/library.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const library = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f60f4a85"]]);
export {
  library as default
};
//# sourceMappingURL=library-WcilZlrV.js.map
