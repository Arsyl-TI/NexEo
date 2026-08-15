import { _ as __nuxt_component_0 } from './nuxt-link-D-q3B9f2.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useMangaStore } from './manga-BDIsHlOU.mjs';
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
import './useApi-CRMpFdoX.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const mangaStore = useMangaStore();
    const searchQuery = ref("");
    const filteredManga = computed(() => {
      if (!searchQuery.value.trim()) return mangaStore.mangaList;
      const q = searchQuery.value.toLowerCase();
      return mangaStore.mangaList.filter((m) => m.title.toLowerCase().includes(q) || m.slug.toLowerCase().includes(q));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "manga-catalog min-h-screen pb-16" }, _attrs))} data-v-2b9d4547><div class="max-w-6xl mx-auto px-3 sm:px-6 pt-4" data-v-2b9d4547><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" data-v-2b9d4547><div data-v-2b9d4547><h1 class="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3" data-v-2b9d4547><span data-v-2b9d4547>\u{1F3A8}</span> Koleksi Manga &amp; Komik </h1><p class="text-xs text-muted-foreground mt-1" data-v-2b9d4547>Pembaca komik digital lokal (Webtoon &amp; Manga Mode) dalam jaringan LAN</p></div><div class="relative w-full sm:w-72" data-v-2b9d4547><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Cari judul komik..." class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" data-v-2b9d4547><span class="absolute left-3 top-2.5 text-xs text-muted-foreground" data-v-2b9d4547>\u{1F50D}</span></div></div>`);
      if (unref(mangaStore).loading) {
        _push(`<div class="flex justify-center py-20" data-v-2b9d4547><div class="spinner" data-v-2b9d4547></div></div>`);
      } else if (filteredManga.value.length === 0) {
        _push(`<div class="text-center py-20 bg-card/40 border border-border rounded-3xl p-8" data-v-2b9d4547><div class="text-4xl mb-3" data-v-2b9d4547>\u{1F3A8}</div><h3 class="text-base font-bold text-foreground mb-1" data-v-2b9d4547>Belum Ada Komik Tersedia</h3><p class="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed" data-v-2b9d4547> Simpan folder komik/manga Anda di folder <code data-v-2b9d4547>data/manga/[slug]/[chapter]</code> pada disk server untuk mulai membaca! </p></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6" data-v-2b9d4547><!--[-->`);
        ssrRenderList(filteredManga.value, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.slug,
            to: `/manga/${item.slug}`,
            class: "group glass-card-hover p-3 rounded-2xl border border-border/70 shadow-lg flex flex-col justify-between"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div data-v-2b9d4547${_scopeId}><div class="aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border/80 mb-3 relative shadow-md group-hover:shadow-xl transition-all" data-v-2b9d4547${_scopeId}>`);
                if (item.cover) {
                  _push2(`<img${ssrRenderAttr("src", item.cover)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" data-v-2b9d4547${_scopeId}>`);
                } else {
                  _push2(`<div class="flex flex-col items-center justify-center w-full h-full text-xs text-muted-foreground p-4 text-center" data-v-2b9d4547${_scopeId}><span class="text-2xl mb-1" data-v-2b9d4547${_scopeId}>\u{1F3A8}</span><span data-v-2b9d4547${_scopeId}>No Cover</span></div>`);
                }
                _push2(`<div class="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-border text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold shadow" data-v-2b9d4547${_scopeId}>${ssrInterpolate(item.chapterCount)} Chapter </div></div><h4 class="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1" data-v-2b9d4547${_scopeId}>${ssrInterpolate(item.title)}</h4>`);
                if (item.author) {
                  _push2(`<p class="text-[11px] text-muted-foreground truncate" data-v-2b9d4547${_scopeId}> \u{1F464} ${ssrInterpolate(item.author)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", null, [
                    createVNode("div", { class: "aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border/80 mb-3 relative shadow-md group-hover:shadow-xl transition-all" }, [
                      item.cover ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: item.cover,
                        class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                        loading: "lazy",
                        onError: ($event) => $event.target.style.display = "none"
                      }, null, 40, ["src", "onError"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex flex-col items-center justify-center w-full h-full text-xs text-muted-foreground p-4 text-center"
                      }, [
                        createVNode("span", { class: "text-2xl mb-1" }, "\u{1F3A8}"),
                        createVNode("span", null, "No Cover")
                      ])),
                      createVNode("div", { class: "absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-border text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold shadow" }, toDisplayString(item.chapterCount) + " Chapter ", 1)
                    ]),
                    createVNode("h4", { class: "font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1" }, toDisplayString(item.title), 1),
                    item.author ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-[11px] text-muted-foreground truncate"
                    }, " \u{1F464} " + toDisplayString(item.author), 1)) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/manga/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2b9d4547"]]);

export { index as default };
//# sourceMappingURL=index-B1j4W6cS.mjs.map
