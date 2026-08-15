import { defineComponent, ref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext, computed, unref, toDisplayString, watch, nextTick } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderTeleport, ssrRenderAttr, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { _ as __nuxt_component_0 } from "./nuxt-link-CcmIMMHP.js";
import { u as useToast } from "./useToast-B8q9yI-P.js";
import { _ as _export_sfc } from "../server.mjs";
import { useRoute, useRouter } from "vue-router";
import { u as useVideoStore } from "./video-p99v0tOr.js";
import { u as useApi } from "./useApi-CJK4OrTg.js";
import "D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const isDark = ref(true);
    const lanUrl = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 z-50 flex h-12 items-center justify-between px-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800 shadow-lg" }, _attrs))} data-v-fd3aa24b><div class="flex items-center space-x-5" data-v-fd3aa24b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xl font-extrabold text-primary tracking-tight flex items-center gap-1.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-fd3aa24b${_scopeId}>⚡</span> NexEo `);
          } else {
            return [
              createVNode("span", null, "⚡"),
              createTextVNode(" NexEo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center space-x-1 text-xs font-semibold" data-v-fd3aa24b>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`🎬 Video`);
          } else {
            return [
              createTextVNode("🎬 Video")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/novels",
        class: "px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`📖 Novels`);
          } else {
            return [
              createTextVNode("📖 Novels")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/library",
        class: "px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`📚 Pustaka`);
          } else {
            return [
              createTextVNode("📚 Pustaka")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/novel-browser",
        class: "px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`🌐 Browser`);
          } else {
            return [
              createTextVNode("🌐 Browser")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/share",
        class: "px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`📤 Share`);
          } else {
            return [
              createTextVNode("📤 Share")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/downloader",
        class: "px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`⚡ Downloader`);
          } else {
            return [
              createTextVNode("⚡ Downloader")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div><div class="flex items-center space-x-3" data-v-fd3aa24b><button class="bg-card hover:bg-border/60 border border-border/80 text-muted-foreground hover:text-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm" data-v-fd3aa24b><span data-v-fd3aa24b>🔍</span><span class="hidden sm:inline" data-v-fd3aa24b>Cari</span><kbd class="hidden sm:inline-block text-[10px] bg-background border border-border text-muted-foreground px-1.5 py-0.2 rounded font-mono" data-v-fd3aa24b>Ctrl+K</kbd></button>`);
      if (lanUrl.value) {
        _push(`<div class="cursor-pointer bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm" title="Klik untuk menyalin alamat IP LAN untuk perangkat HP / Komputer lain" data-v-fd3aa24b><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" data-v-fd3aa24b></span><span data-v-fd3aa24b>📡 ${ssrInterpolate(lanUrl.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" data-v-fd3aa24b>`);
      if (!isDark.value) {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fd3aa24b><path d="M12 3v1m0 16v1m8.66-10H19m-4.34 5.66l1.42 1.42M6.34 6.34l1.42 1.42M3 12h1m19 0h-1M6.34 17.66l1.42-1.42" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-v-fd3aa24b></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fd3aa24b><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-v-fd3aa24b></path></svg>`);
      }
      _push(`</button></div></header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Navbar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-fd3aa24b"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const videoStore = useVideoStore();
    const getIcon = (id) => {
      if (id === "anime") return "🍿";
      if (id === "youtube") return "▶️";
      return "🎥";
    };
    const sidebarLinks = computed(() => {
      const path = route.path;
      return {
        novel: [
          {
            label: "Koleksi Novel",
            href: "/novels",
            icon: "📚",
            isActive: path === "/novels" || path.startsWith("/novels/")
          },
          {
            label: "Scraper Browser",
            href: "/novel-browser",
            icon: "🔍",
            isActive: path === "/novel-browser"
          }
        ],
        tools: [
          {
            label: "File Share",
            href: "/share",
            icon: "📤",
            isActive: path === "/share"
          },
          {
            label: "Downloader Queue",
            href: "/downloader",
            icon: "⬇️",
            isActive: path === "/downloader"
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "fixed top-12 left-0 bottom-0 w-64 border-r border-gray-700 bg-[#0a0a0a]/95 overflow-y-auto hidden lg:block" }, _attrs))}><nav class="p-4 pt-6 space-y-1"><div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Media Video</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ["flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors", { "bg-gray-800 text-purple-400 font-medium": unref(route).path === "/" && !unref(route).query.category }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="w-4 h-4 flex-shrink-0 text-center"${_scopeId}>🎬</span> Semua Kategori `);
          } else {
            return [
              createVNode("span", { class: "w-4 h-4 flex-shrink-0 text-center" }, "🎬"),
              createTextVNode(" Semua Kategori ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(videoStore).categories, (cat) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: cat.id,
          to: `/?category=${cat.id}`,
          class: ["flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors", { "bg-gray-800 text-purple-400 font-medium": unref(route).query.category === cat.id }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="w-4 h-4 flex-shrink-0 text-center"${_scopeId}>${ssrInterpolate(getIcon(cat.id))}</span> ${ssrInterpolate(cat.name)}`);
            } else {
              return [
                createVNode("span", { class: "w-4 h-4 flex-shrink-0 text-center" }, toDisplayString(getIcon(cat.id)), 1),
                createTextVNode(" " + toDisplayString(cat.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><div class="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pustaka Novel</div><!--[-->`);
      ssrRenderList(sidebarLinks.value.novel, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.label,
          to: link.href,
          class: ["flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors", { "bg-gray-800 text-purple-400 font-medium": link.isActive }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="w-4 h-4 flex-shrink-0 text-center"${_scopeId}>${ssrInterpolate(link.icon)}</span> ${ssrInterpolate(link.label)}`);
            } else {
              return [
                createVNode("span", { class: "w-4 h-4 flex-shrink-0 text-center" }, toDisplayString(link.icon), 1),
                createTextVNode(" " + toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><div class="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</div><!--[-->`);
      ssrRenderList(sidebarLinks.value.tools, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.label,
          to: link.href,
          class: ["flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-gray-800 transition-colors", { "bg-gray-800 text-purple-400 font-medium": link.isActive }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="w-4 h-4 flex-shrink-0 text-center"${_scopeId}>${ssrInterpolate(link.icon)}</span> ${ssrInterpolate(link.label)}`);
            } else {
              return [
                createVNode("span", { class: "w-4 h-4 flex-shrink-0 text-center" }, toDisplayString(link.icon), 1),
                createTextVNode(" " + toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav></aside>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MobileNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const navLinks = [
      { label: "Video", href: "/", icon: "🎬", isActive: false },
      { label: "Novels", href: "/novels", icon: "📚", isActive: false },
      { label: "Browser", href: "/novel-browser", icon: "🔍", isActive: false },
      { label: "Share", href: "/share", icon: "📤", isActive: false }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "lg:hidden fixed bottom-0 left-0 right-0 z-50 h-12 bg-[#0a0a0a]/95 border-t border-gray-700" }, _attrs))}><div class="flex justify-around items-center h-full"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.label,
          to: link.href,
          class: ["flex flex-col items-center justify-center flex-1 text-xs py-1 hover:text-blue-300 transition-colors", { "text-blue-300": link.isActive }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-base mb-0.5"${_scopeId}>${ssrInterpolate(link.icon)}</span> ${ssrInterpolate(link.label)}`);
            } else {
              return [
                createVNode("span", { class: "text-base mb-0.5" }, toDisplayString(link.icon), 1),
                createTextVNode(" " + toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/MobileNavigation.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CommandPalette",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const isOpen = ref(false);
    const query = ref("");
    const loading = ref(false);
    const searchInput = ref(null);
    const selectedIndex = ref(0);
    const allResults = ref([]);
    useRouter();
    function open() {
      isOpen.value = true;
      query.value = "";
      allResults.value = [];
      selectedIndex.value = 0;
      nextTick(() => {
        searchInput.value?.focus();
      });
    }
    function close() {
      isOpen.value = false;
    }
    async function performSearch(q) {
      if (!q.trim()) {
        allResults.value = [];
        return;
      }
      loading.value = true;
      const results = [];
      try {
        const api = useApi();
        const lowerQ = q.toLowerCase();
        try {
          const vidRes = await api.get(`/video/search?q=${encodeURIComponent(q)}`);
          if (vidRes?.data) {
            vidRes.data.forEach((v) => {
              results.push({
                type: "video",
                id: v.id,
                title: v.title || v.name,
                subtitle: `${v.folder || "General"} • ${v.format}`,
                link: `/video/${encodeURIComponent(v.id)}`
              });
            });
          }
        } catch {
        }
        try {
          const novRes = await api.get("/novels/library");
          if (novRes?.data) {
            novRes.data.filter((n) => n.title?.toLowerCase().includes(lowerQ) || n.slug?.toLowerCase().includes(lowerQ)).forEach((n) => {
              results.push({
                type: "novel",
                slug: n.slug,
                title: n.title,
                subtitle: n.author ? `Author: ${n.author}` : "Koleksi Novel",
                link: `/novels/${n.slug}`
              });
            });
          }
        } catch {
        }
        try {
          const fileRes = await $fetch("/api/shared-files");
          if (Array.isArray(fileRes)) {
            fileRes.filter((f) => f.name?.toLowerCase().includes(lowerQ)).forEach((f) => {
              results.push({
                type: "file",
                name: f.name,
                title: f.name,
                subtitle: f.sizeFormatted || "Shared File",
                link: "/share"
              });
            });
          }
        } catch {
        }
        allResults.value = results.slice(0, 15);
        selectedIndex.value = 0;
      } catch (err) {
        console.error("Command Palette Search Error:", err);
      } finally {
        loading.value = false;
      }
    }
    let searchTimeout = null;
    watch(query, (next) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(next);
      }, 200);
    });
    __expose({ open, close });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in" data-v-88b1bcdf><div class="bg-card border border-border/80 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]" data-v-88b1bcdf><div class="p-4 border-b border-border/80 flex items-center gap-3 bg-background/50" data-v-88b1bcdf><span class="text-lg text-primary" data-v-88b1bcdf>🔍</span><input${ssrRenderAttr("value", query.value)} type="text" placeholder="Cari video, novel, atau file share... (Tekan Esc untuk tutup)" class="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" data-v-88b1bcdf><kbd class="hidden sm:inline-block text-[10px] bg-card border border-border text-muted-foreground px-2 py-0.5 rounded-md font-mono" data-v-88b1bcdf>ESC</kbd></div><div class="flex-1 overflow-y-auto p-4 space-y-4" data-v-88b1bcdf>`);
          if (loading.value) {
            _push2(`<div class="py-8 flex justify-center" data-v-88b1bcdf><div class="spinner" data-v-88b1bcdf></div></div>`);
          } else if (!query.value.trim()) {
            _push2(`<div class="py-8 text-center text-xs text-muted-foreground" data-v-88b1bcdf> Ketik kata kunci untuk mencari di seluruh platform NexEo... </div>`);
          } else if (allResults.value.length === 0) {
            _push2(`<div class="py-8 text-center text-xs text-muted-foreground" data-v-88b1bcdf> Tidak ditemukan hasil untuk &quot;<span class="text-foreground font-semibold" data-v-88b1bcdf>${ssrInterpolate(query.value)}</span>&quot; </div>`);
          } else {
            _push2(`<div class="space-y-2" data-v-88b1bcdf><!--[-->`);
            ssrRenderList(allResults.value, (item, idx) => {
              _push2(`<div class="${ssrRenderClass(["p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3", selectedIndex.value === idx ? "bg-primary/15 border-primary/50 text-foreground scale-[1.01]" : "bg-card/40 border-border/60 text-muted-foreground hover:bg-card"])}" data-v-88b1bcdf><div class="flex items-center gap-3 min-w-0" data-v-88b1bcdf><div class="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-lg shrink-0" data-v-88b1bcdf>${ssrInterpolate(item.type === "video" ? "🎬" : item.type === "novel" ? "📖" : "📤")}</div><div class="min-w-0" data-v-88b1bcdf><h4 class="font-bold text-xs text-foreground truncate" data-v-88b1bcdf>${ssrInterpolate(item.title || item.name)}</h4><p class="text-[10px] text-muted-foreground font-mono truncate" data-v-88b1bcdf>${ssrInterpolate(item.subtitle || item.category || item.sizeFormatted || item.type)}</p></div></div><div class="flex items-center gap-2 shrink-0" data-v-88b1bcdf><span class="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded-md bg-background border border-border text-primary" data-v-88b1bcdf>${ssrInterpolate(item.type)}</span><span class="text-xs text-muted-foreground" data-v-88b1bcdf>↵</span></div></div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div><div class="p-3 border-t border-border/60 bg-background/30 flex items-center justify-between text-[11px] text-muted-foreground px-4" data-v-88b1bcdf><div class="flex items-center gap-3" data-v-88b1bcdf><span data-v-88b1bcdf><kbd class="bg-card border px-1.5 py-0.5 rounded text-[10px]" data-v-88b1bcdf>↑↓</kbd> Navigasi</span><span data-v-88b1bcdf><kbd class="bg-card border px-1.5 py-0.5 rounded text-[10px]" data-v-88b1bcdf>↵</kbd> Buka</span></div><span data-v-88b1bcdf>NexEo Universal Search</span></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CommandPalette.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CommandPalette = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-88b1bcdf"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200" }, _attrs))}>`);
      _push(ssrRenderComponent(Navbar, null, null, _parent));
      _push(`<div class="flex flex-1 pt-12">`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<main class="flex-1 overflow-y-auto lg:ml-64 pb-20 lg:pb-0"><div class="p-4 max-w-6xl mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(CommandPalette, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-B3hqqpu-.js.map
