import { defineComponent, mergeProps, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-CcmIMMHP.mjs';
import { u as useToast } from './useToast-B8q9yI-P.mjs';
import { _ as _export_sfc } from './server.mjs';
import { useRoute } from 'vue-router';
import { u as useVideoStore } from './video-p99v0tOr.mjs';
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
import 'pinia';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const isDark = ref(true);
    const lanUrl = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 z-50 flex h-12 items-center justify-between px-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800 shadow-lg" }, _attrs))} data-v-f103c7ab><div class="flex items-center space-x-5" data-v-f103c7ab>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xl font-extrabold text-primary tracking-tight flex items-center gap-1.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-f103c7ab${_scopeId}>\u26A1</span> NexEo `);
          } else {
            return [
              createVNode("span", null, "\u26A1"),
              createTextVNode(" NexEo ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center space-x-1 text-xs font-semibold" data-v-f103c7ab>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "px-3 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u{1F3AC} Video`);
          } else {
            return [
              createTextVNode("\u{1F3AC} Video")
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
            _push2(`\u{1F4D6} Novels`);
          } else {
            return [
              createTextVNode("\u{1F4D6} Novels")
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
            _push2(`\u{1F4DA} Pustaka`);
          } else {
            return [
              createTextVNode("\u{1F4DA} Pustaka")
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
            _push2(`\u{1F310} Browser`);
          } else {
            return [
              createTextVNode("\u{1F310} Browser")
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
            _push2(`\u{1F4E4} Share`);
          } else {
            return [
              createTextVNode("\u{1F4E4} Share")
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
            _push2(`\u26A1 Downloader`);
          } else {
            return [
              createTextVNode("\u26A1 Downloader")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div><div class="flex items-center space-x-3" data-v-f103c7ab>`);
      if (lanUrl.value) {
        _push(`<div class="cursor-pointer bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm" title="Klik untuk menyalin alamat IP LAN untuk perangkat HP / Komputer lain" data-v-f103c7ab><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" data-v-f103c7ab></span><span data-v-f103c7ab>\u{1F4E1} ${ssrInterpolate(lanUrl.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" data-v-f103c7ab>`);
      if (!isDark.value) {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f103c7ab><path d="M12 3v1m0 16v1m8.66-10H19m-4.34 5.66l1.42 1.42M6.34 6.34l1.42 1.42M3 12h1m19 0h-1M6.34 17.66l1.42-1.42" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-v-f103c7ab></path></svg>`);
      } else {
        _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f103c7ab><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-v-f103c7ab></path></svg>`);
      }
      _push(`</button></div></header>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Navbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f103c7ab"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const videoStore = useVideoStore();
    const getIcon = (id) => {
      if (id === "anime") return "\u{1F37F}";
      if (id === "youtube") return "\u25B6\uFE0F";
      return "\u{1F3A5}";
    };
    const sidebarLinks = computed(() => {
      const path = route.path;
      return {
        novel: [
          {
            label: "Koleksi Novel",
            href: "/novels",
            icon: "\u{1F4DA}",
            isActive: path === "/novels" || path.startsWith("/novels/")
          },
          {
            label: "Scraper Browser",
            href: "/novel-browser",
            icon: "\u{1F50D}",
            isActive: path === "/novel-browser"
          }
        ],
        tools: [
          {
            label: "File Share",
            href: "/share",
            icon: "\u{1F4E4}",
            isActive: path === "/share"
          },
          {
            label: "Downloader Queue",
            href: "/downloader",
            icon: "\u2B07\uFE0F",
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
            _push2(`<span class="w-4 h-4 flex-shrink-0 text-center"${_scopeId}>\u{1F3AC}</span> Semua Kategori `);
          } else {
            return [
              createVNode("span", { class: "w-4 h-4 flex-shrink-0 text-center" }, "\u{1F3AC}"),
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MobileNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const navLinks = [
      { label: "Video", href: "/", icon: "\u{1F3AC}", isActive: false },
      { label: "Novels", href: "/novels", icon: "\u{1F4DA}", isActive: false },
      { label: "Browser", href: "/novel-browser", icon: "\u{1F50D}", isActive: false },
      { label: "Share", href: "/share", icon: "\u{1F4E4}", isActive: false }
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/MobileNavigation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200" }, _attrs))}>`);
      _push(ssrRenderComponent(Navbar, null, null, _parent));
      _push(`<div class="flex flex-1 pt-12">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<main class="flex-1 overflow-y-auto lg:ml-64 pb-20 lg:pb-0"><div class="p-4 max-w-6xl mx-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
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

export { _sfc_main as default };
//# sourceMappingURL=default-D-9G0Yxl.mjs.map
