import { _ as __nuxt_component_0 } from './nuxt-link-CcmIMMHP.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import { u as useVideoStore } from './video-p99v0tOr.mjs';
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
import 'pinia';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const videoStore = useVideoStore();
    useToast();
    const categoryId = ref("");
    const categoryName = ref("");
    const folders = ref([]);
    const selectedFolder = ref(null);
    const videos = ref([]);
    const loading = ref(false);
    const recentHistory = ref([]);
    const showYtModal = ref(false);
    const ytUrl = ref("");
    const ytMeta = ref(null);
    const ytTargetCategory = ref("youtube");
    const ytCustomSubfolder = ref("");
    const isFetchingInfo = ref(false);
    const isDownloading = ref(false);
    const loadCategoryData = async () => {
      const queryCategory = route.query.category;
      if (queryCategory) {
        categoryId.value = queryCategory;
        loading.value = true;
        selectedFolder.value = null;
        try {
          const cat = videoStore.categories.find((c) => c.id === queryCategory);
          categoryName.value = cat ? cat.name : queryCategory;
          await videoStore.fetchFolders(queryCategory);
          folders.value = videoStore.folders;
        } catch (err) {
          console.error("Failed to load category folders:", err);
        } finally {
          loading.value = false;
        }
      } else {
        categoryId.value = "";
        categoryName.value = "";
        folders.value = [];
        selectedFolder.value = null;
      }
    };
    watch(() => route.query.category, () => {
      loadCategoryData();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-home" }, _attrs))} data-v-d6a6b59a>`);
      if (loading.value) {
        _push(`<div class="flex justify-center py-20" data-v-d6a6b59a><div class="spinner" data-v-d6a6b59a></div></div>`);
      } else {
        _push(`<div data-v-d6a6b59a><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" data-v-d6a6b59a><div data-v-d6a6b59a><h1 class="text-3xl font-extrabold text-foreground tracking-tight" data-v-d6a6b59a>${ssrInterpolate(categoryId.value ? categoryName.value : "Kategori Video")}</h1><p class="text-xs text-muted-foreground mt-1" data-v-d6a6b59a>Koleksi video lokal &amp; pemutar streaming dalam jaringan LAN</p></div><button class="btn-primary px-4 py-2.5 text-xs font-bold shadow-lg flex items-center gap-2 w-max" data-v-d6a6b59a><span class="text-base" data-v-d6a6b59a>\u25B6\uFE0F</span> Unduh Video YouTube </button></div>`);
        if (!categoryId.value && recentHistory.value.length > 0) {
          _push(`<section class="mb-10" data-v-d6a6b59a><div class="flex items-center justify-between mb-4" data-v-d6a6b59a><h2 class="text-lg font-bold text-foreground flex items-center gap-2" data-v-d6a6b59a><span data-v-d6a6b59a>\u{1F37F}</span> Lanjutkan Menonton </h2><button class="text-xs text-muted-foreground hover:text-rose-400 transition-colors" data-v-d6a6b59a> Bersihkan Riwayat </button></div><div class="flex gap-4 overflow-x-auto pb-4 scrollbar-thin" data-v-d6a6b59a><!--[-->`);
          ssrRenderList(recentHistory.value, (item) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: item.id,
              to: `/video/${encodeURIComponent(item.id)}`,
              class: "w-60 sm:w-64 shrink-0 group glass-card-hover p-3 shadow-lg rounded-2xl"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="aspect-video rounded-xl overflow-hidden bg-card border border-border/80 group-hover:border-primary mb-2.5 relative shadow-md" data-v-d6a6b59a${_scopeId}><img${ssrRenderAttr("src", `/api/video/thumbnail/${encodeURIComponent(item.id)}`)} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-v-d6a6b59a${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" data-v-d6a6b59a${_scopeId}></div><div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-mono" data-v-d6a6b59a${_scopeId}><span class="bg-black/70 px-2 py-0.5 rounded-md" data-v-d6a6b59a${_scopeId}>\u23F1\uFE0F ${ssrInterpolate(item.timestampFormatted)}</span><span class="bg-primary/90 px-2 py-0.5 rounded-md font-bold" data-v-d6a6b59a${_scopeId}>${ssrInterpolate(item.percent)}%</span></div></div><div class="w-full h-1.5 bg-card border border-border/60 rounded-full overflow-hidden mb-2" data-v-d6a6b59a${_scopeId}><div class="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style="${ssrRenderStyle({ width: `${item.percent}%` })}" data-v-d6a6b59a${_scopeId}></div></div><h4 class="font-bold text-xs text-foreground truncate group-hover:text-primary transition-colors mb-0.5" data-v-d6a6b59a${_scopeId}>${ssrInterpolate(item.title || item.name)}</h4><p class="text-[10px] text-muted-foreground font-mono flex items-center justify-between" data-v-d6a6b59a${_scopeId}><span data-v-d6a6b59a${_scopeId}>\u{1F4C1} ${ssrInterpolate(item.folder)}</span><span class="uppercase text-primary font-bold" data-v-d6a6b59a${_scopeId}>${ssrInterpolate(item.format)}</span></p>`);
                } else {
                  return [
                    createVNode("div", { class: "aspect-video rounded-xl overflow-hidden bg-card border border-border/80 group-hover:border-primary mb-2.5 relative shadow-md" }, [
                      createVNode("img", {
                        src: `/api/video/thumbnail/${encodeURIComponent(item.id)}`,
                        class: "object-cover w-full h-full group-hover:scale-105 transition-transform duration-300",
                        onError: ($event) => $event.target.style.display = "none"
                      }, null, 40, ["src", "onError"]),
                      createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" }),
                      createVNode("div", { class: "absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white font-mono" }, [
                        createVNode("span", { class: "bg-black/70 px-2 py-0.5 rounded-md" }, "\u23F1\uFE0F " + toDisplayString(item.timestampFormatted), 1),
                        createVNode("span", { class: "bg-primary/90 px-2 py-0.5 rounded-md font-bold" }, toDisplayString(item.percent) + "%", 1)
                      ])
                    ]),
                    createVNode("div", { class: "w-full h-1.5 bg-card border border-border/60 rounded-full overflow-hidden mb-2" }, [
                      createVNode("div", {
                        class: "h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full",
                        style: { width: `${item.percent}%` }
                      }, null, 4)
                    ]),
                    createVNode("h4", { class: "font-bold text-xs text-foreground truncate group-hover:text-primary transition-colors mb-0.5" }, toDisplayString(item.title || item.name), 1),
                    createVNode("p", { class: "text-[10px] text-muted-foreground font-mono flex items-center justify-between" }, [
                      createVNode("span", null, "\u{1F4C1} " + toDisplayString(item.folder), 1),
                      createVNode("span", { class: "uppercase text-primary font-bold" }, toDisplayString(item.format), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (showYtModal.value) {
          _push(`<div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" data-v-d6a6b59a><div class="bg-card border border-border rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto" data-v-d6a6b59a><button class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl" data-v-d6a6b59a>\u2715</button><h2 class="text-xl font-bold text-foreground mb-1 flex items-center gap-2" data-v-d6a6b59a><span data-v-d6a6b59a>\u25B6\uFE0F</span> Unduh Video YouTube </h2><p class="text-xs text-muted-foreground mb-6" data-v-d6a6b59a>Unduh video YouTube langsung ke folder pustaka video NexEo</p><div class="space-y-4 mb-6" data-v-d6a6b59a><div data-v-d6a6b59a><label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5" data-v-d6a6b59a>Tautan / Link YouTube</label><div class="flex gap-2" data-v-d6a6b59a><input${ssrRenderAttr("value", ytUrl.value)} type="url" placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..." class="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary" data-v-d6a6b59a><button${ssrIncludeBooleanAttr(isFetchingInfo.value || !ytUrl.value) ? " disabled" : ""} class="btn-secondary px-4 py-2.5 text-xs font-bold shrink-0 disabled:opacity-50" data-v-d6a6b59a>`);
          if (isFetchingInfo.value) {
            _push(`<span class="spinner border-2 w-3.5 h-3.5 mr-1" data-v-d6a6b59a></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-d6a6b59a>Ambil Info</span></button></div></div>`);
          if (ytMeta.value) {
            _push(`<div class="bg-background/80 border border-border/80 rounded-2xl p-4 flex flex-col gap-3" data-v-d6a6b59a><div class="flex gap-4 items-start" data-v-d6a6b59a>`);
            if (ytMeta.value.thumbnailUrl) {
              _push(`<img${ssrRenderAttr("src", ytMeta.value.thumbnailUrl)} class="w-32 aspect-video object-cover rounded-xl border border-border shrink-0 shadow-md" data-v-d6a6b59a>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="min-w-0 flex-1" data-v-d6a6b59a><h4 class="font-bold text-sm text-foreground line-clamp-2 leading-tight mb-1" data-v-d6a6b59a>${ssrInterpolate(ytMeta.value.title)}</h4><p class="text-xs text-purple-400 font-semibold mb-1" data-v-d6a6b59a>\u{1F464} ${ssrInterpolate(ytMeta.value.author)}</p><span class="inline-block px-2.5 py-0.5 rounded-full bg-card border border-border text-[11px] text-muted-foreground font-mono" data-v-d6a6b59a> \u23F1\uFE0F ${ssrInterpolate(ytMeta.value.durationFormatted)}</span></div></div>`);
            if (ytMeta.value.description) {
              _push(`<div class="pt-2 border-t border-border/50" data-v-d6a6b59a><div class="text-[11px] text-muted-foreground line-clamp-3 leading-relaxed whitespace-pre-line bg-card/40 p-2.5 rounded-xl border border-border/40" data-v-d6a6b59a>${ssrInterpolate(ytMeta.value.description)}</div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div data-v-d6a6b59a><label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5" data-v-d6a6b59a>Folder Tujuan Simpan</label><select class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary" data-v-d6a6b59a><option value="youtube" data-v-d6a6b59a${ssrIncludeBooleanAttr(Array.isArray(ytTargetCategory.value) ? ssrLooseContain(ytTargetCategory.value, "youtube") : ssrLooseEqual(ytTargetCategory.value, "youtube")) ? " selected" : ""}>\u{1F3AC} Kategori YouTube (D:\\Video\\YouTube)</option><option value="anime" data-v-d6a6b59a${ssrIncludeBooleanAttr(Array.isArray(ytTargetCategory.value) ? ssrLooseContain(ytTargetCategory.value, "anime") : ssrLooseEqual(ytTargetCategory.value, "anime")) ? " selected" : ""}>\u{1F37F} Kategori Anime (D:\\Video\\Anime)</option></select></div><div data-v-d6a6b59a><label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5" data-v-d6a6b59a>Subfolder Tambahan (Opsional)</label><input${ssrRenderAttr("value", ytCustomSubfolder.value)} type="text" placeholder="Contoh: Musik / Gameplay / Tutorial" class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary" data-v-d6a6b59a></div></div><div class="flex gap-3" data-v-d6a6b59a><button class="flex-1 px-4 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground" data-v-d6a6b59a> Batal </button><button${ssrIncludeBooleanAttr(isDownloading.value || !ytUrl.value) ? " disabled" : ""} class="flex-1 btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50" data-v-d6a6b59a>`);
          if (isDownloading.value) {
            _push(`<span class="spinner border-2 w-3.5 h-3.5" data-v-d6a6b59a></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-d6a6b59a>${ssrInterpolate(isDownloading.value ? "Memulai Unduhan..." : "Mulai Unduh Video")}</span></button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (categoryId.value && !selectedFolder.value) {
          _push(`<section data-v-d6a6b59a><div class="flex items-center justify-between mb-6" data-v-d6a6b59a><span class="text-muted-foreground bg-card border border-border/60 px-3.5 py-1 rounded-full text-xs font-mono font-medium" data-v-d6a6b59a>${ssrInterpolate(folders.value.length)} folder</span></div>`);
          if (folders.value.length === 0) {
            _push(`<div class="text-center py-20 text-muted-foreground" data-v-d6a6b59a>Kategori ini kosong atau folder tidak ditemukan di disk.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-v-d6a6b59a><!--[-->`);
          ssrRenderList(folders.value, (folder) => {
            _push(`<div class="cursor-pointer group relative" data-v-d6a6b59a><div class="aspect-video rounded-2xl overflow-hidden bg-card border border-border/80 group-hover:border-primary transition-all shadow-lg" data-v-d6a6b59a>`);
            if (folder.hasCoverThumbnail && folder.coverId) {
              _push(`<img${ssrRenderAttr("src", `/api/video/thumbnail/${encodeURIComponent(folder.coverId)}`)} class="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" data-v-d6a6b59a>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" data-v-d6a6b59a></div><div class="absolute bottom-0 left-0 p-4 w-full" data-v-d6a6b59a><h3 class="font-bold text-base text-foreground truncate" data-v-d6a6b59a>${ssrInterpolate(folder.name === "Root" ? "General" : folder.name)}</h3><span class="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-md shadow" data-v-d6a6b59a>${ssrInterpolate(folder.videoCount)} Video</span></div></div></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else if (selectedFolder.value) {
          _push(`<section data-v-d6a6b59a><div class="flex flex-col gap-4 mb-8 border-b border-border/80 pb-6" data-v-d6a6b59a><button class="w-max text-muted-foreground bg-card border border-border/60 px-4 py-2 rounded-full text-xs font-medium hover:text-foreground" data-v-d6a6b59a>\u2190 Kembali ke Kategori</button><div class="flex justify-between items-end" data-v-d6a6b59a><h1 class="text-2xl md:text-3xl font-bold text-foreground" data-v-d6a6b59a>${ssrInterpolate(selectedFolder.value.name === "Root" ? "General" : selectedFolder.value.name)}</h1><span class="text-muted-foreground bg-card border border-border/60 px-3.5 py-1 rounded-full text-xs font-mono font-medium" data-v-d6a6b59a>${ssrInterpolate(videos.value.length)} video</span></div></div><div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" data-v-d6a6b59a><!--[-->`);
          ssrRenderList(videos.value, (video) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: video.id,
              to: `/video/${encodeURIComponent(video.id)}`,
              class: "group"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="aspect-video rounded-2xl overflow-hidden bg-card border border-border/80 group-hover:border-primary mb-3 relative shadow-lg" data-v-d6a6b59a${_scopeId}>`);
                  if (video.hasThumbnail) {
                    _push2(`<img${ssrRenderAttr("src", `/api/video/thumbnail/${encodeURIComponent(video.id)}`)} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" data-v-d6a6b59a${_scopeId}>`);
                  } else {
                    _push2(`<div class="flex items-center justify-center w-full h-full text-muted-foreground text-xs" data-v-d6a6b59a${_scopeId}>No thumbnail</div>`);
                  }
                  _push2(`<div class="absolute bottom-2 right-2 bg-background/80 border border-border text-foreground text-[10px] font-mono px-2 py-0.5 rounded-md font-bold" data-v-d6a6b59a${_scopeId}>${ssrInterpolate(video.format)}</div></div><h3 class="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug" data-v-d6a6b59a${_scopeId}>${ssrInterpolate(video.title || video.name)}</h3><p class="text-xs text-muted-foreground font-mono mt-1" data-v-d6a6b59a${_scopeId}>${ssrInterpolate(video.sizeFormatted)}</p>`);
                } else {
                  return [
                    createVNode("div", { class: "aspect-video rounded-2xl overflow-hidden bg-card border border-border/80 group-hover:border-primary mb-3 relative shadow-lg" }, [
                      video.hasThumbnail ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: `/api/video/thumbnail/${encodeURIComponent(video.id)}`,
                        class: "object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center justify-center w-full h-full text-muted-foreground text-xs"
                      }, "No thumbnail")),
                      createVNode("div", { class: "absolute bottom-2 right-2 bg-background/80 border border-border text-foreground text-[10px] font-mono px-2 py-0.5 rounded-md font-bold" }, toDisplayString(video.format), 1)
                    ]),
                    createVNode("h3", { class: "font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug" }, toDisplayString(video.title || video.name), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground font-mono mt-1" }, toDisplayString(video.sizeFormatted), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<section data-v-d6a6b59a>`);
          if (unref(videoStore).categories.length === 0) {
            _push(`<div class="text-center py-20 text-muted-foreground" data-v-d6a6b59a> Kategori video tidak ditemukan. </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-v-d6a6b59a><!--[-->`);
          ssrRenderList(unref(videoStore).categories, (cat) => {
            var _a;
            _push(`<div class="cursor-pointer group glass-card-hover p-6 shadow-xl" data-v-d6a6b59a><div class="flex items-center gap-4" data-v-d6a6b59a><div class="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center text-3xl group-hover:scale-110 transition-transform" data-v-d6a6b59a>${ssrInterpolate(cat.id === "anime" ? "\u{1F37F}" : cat.id === "youtube" ? "\u{1F3AC}" : "\u{1F3A5}")}</div><div data-v-d6a6b59a><h3 class="font-bold text-xl text-foreground group-hover:text-primary transition-colors" data-v-d6a6b59a>${ssrInterpolate(cat.name)}</h3><p class="text-xs text-muted-foreground mt-1 font-mono" data-v-d6a6b59a>${ssrInterpolate(cat.path)}</p><span class="inline-block mt-2 text-[11px] bg-primary/15 text-primary border border-primary/30 px-3 py-0.5 rounded-full font-bold" data-v-d6a6b59a>${ssrInterpolate((_a = cat.videoCount) != null ? _a : 0)} Total Video </span></div></div></div>`);
          });
          _push(`<!--]--></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d6a6b59a"]]);

export { index as default };
//# sourceMappingURL=index-C3mfIvL_.mjs.map
