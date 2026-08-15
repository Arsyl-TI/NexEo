import { _ as __nuxt_component_0 } from './nuxt-link-CcmIMMHP.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = route.params.slug;
    useToast();
    const novel = ref(null);
    const chapters = ref([]);
    const loading = ref(true);
    const resumeChapter = ref(null);
    const activeTab = ref("chapters");
    const chapterSearch = ref("");
    const chapterSort = ref("asc");
    const showBatchTransModal = ref(false);
    const isBatchTranslating = ref(false);
    const transEngine = ref("google");
    const transConfig = ref({
      geminiApiKey: "",
      deeplApiKey: "",
      libreUrl: "http://localhost:5000",
      libreApiKey: ""
    });
    const hasResumeChapter = computed(() => {
      const savedChapter = typeof resumeChapter.value === "string" ? resumeChapter.value.trim() : "";
      return Boolean(savedChapter) && chapters.value.some((chapter) => chapter.file === savedChapter);
    });
    const filteredChapters = computed(() => {
      let list = [...chapters.value];
      if (chapterSearch.value.trim()) {
        const q = chapterSearch.value.toLowerCase();
        list = list.filter((c) => {
          var _a;
          return (_a = c.title) == null ? void 0 : _a.toLowerCase().includes(q);
        });
      }
      if (chapterSort.value === "desc") {
        list.reverse();
      }
      return list;
    });
    const novelGenres = computed(() => {
      var _a;
      const allTags = ((_a = novel.value) == null ? void 0 : _a.tags) || [];
      const knownGenres = ["Action", "Adult", "Adventure", "Ecchi", "Fantasy", "Horror", "Mystery", "Romance", "Comedy", "Drama", "Sci-Fi", "Slice of Life", "Supernatural"];
      const styles = [
        "bg-rose-500/20 text-rose-300 border-rose-500/40",
        "bg-amber-500/20 text-amber-300 border-amber-500/40",
        "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        "bg-sky-500/20 text-sky-300 border-sky-500/40",
        "bg-purple-500/20 text-purple-300 border-purple-500/40",
        "bg-pink-500/20 text-pink-300 border-pink-500/40",
        "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
      ];
      return allTags.filter((t) => knownGenres.some((kg) => kg.toLowerCase() === t.toLowerCase())).map((g, idx) => ({ name: g, style: styles[idx % styles.length] }));
    });
    const getThumbnailUrl = (pathStr) => {
      if (pathStr.startsWith("http")) return pathStr;
      return `/api/thumbnails/${encodeURIComponent(pathStr)}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "novel-detail relative min-h-screen bg-background pb-16" }, _attrs))} data-v-5259d09c><div class="absolute inset-0 top-0 left-0 right-0 h-[380px] sm:h-[480px] overflow-hidden pointer-events-none z-0" data-v-5259d09c>`);
      if ((_a = novel.value) == null ? void 0 : _a.cover) {
        _push(`<div class="absolute inset-0 opacity-25 blur-3xl scale-110" style="${ssrRenderStyle({
          backgroundImage: `url(${getThumbnailUrl(novel.value.cover)})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        })}" data-v-5259d09c></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" data-v-5259d09c></div></div><div class="max-w-6xl mx-auto relative z-10 px-3 sm:px-6 pt-4" data-v-5259d09c>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/novels",
        class: "inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/70 hover:bg-border/80 border border-border/60 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all shadow-md backdrop-blur-md"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5259d09c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-5259d09c${_scopeId}></path></svg> Kembali ke Koleksi `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 19l-7-7 7-7"
                })
              ])),
              createTextVNode(" Kembali ke Koleksi ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (loading.value) {
        _push(`<div class="flex justify-center py-20" data-v-5259d09c><div class="spinner" data-v-5259d09c></div></div>`);
      } else if (!novel.value) {
        _push(`<div class="text-center py-20 bg-card/40 border border-border rounded-2xl text-muted-foreground" data-v-5259d09c>Novel tidak ditemukan.</div>`);
      } else {
        _push(`<div data-v-5259d09c><div class="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10" data-v-5259d09c><div class="w-full lg:w-72 shrink-0 flex flex-col items-center lg:items-start" data-v-5259d09c><div class="w-48 sm:w-60 lg:w-full aspect-[2/3] rounded-2xl overflow-hidden border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-card mb-5 relative group" data-v-5259d09c>`);
        if (novel.value.cover) {
          _push(`<img${ssrRenderAttr("src", getThumbnailUrl(novel.value.cover))} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" loading="lazy" data-v-5259d09c>`);
        } else {
          _push(`<div class="flex flex-col items-center justify-center h-full text-muted-foreground text-xs p-4 text-center" data-v-5259d09c><span data-v-5259d09c>\u{1F4D6}</span><span class="mt-2" data-v-5259d09c>No Cover Available</span></div>`);
        }
        _push(`</div><div class="w-full flex flex-col gap-2.5" data-v-5259d09c>`);
        if (hasResumeChapter.value) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/novels/${unref(slug)}/${resumeChapter.value}`,
            class: "w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all flex items-center justify-center gap-2 active:scale-95"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-5259d09c${_scopeId}>\u25B6</span> Lanjutkan Membaca `);
              } else {
                return [
                  createVNode("span", null, "\u25B6"),
                  createTextVNode(" Lanjutkan Membaca ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (chapters.value.length > 0) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/novels/${unref(slug)}/${chapters.value[0].file}`,
            class: "w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all flex items-center justify-center gap-2 active:scale-95"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-5259d09c${_scopeId}>\u{1F4D6}</span> Mulai Membaca `);
              } else {
                return [
                  createVNode("span", null, "\u{1F4D6}"),
                  createTextVNode(" Mulai Membaca ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-950/40 transition-all flex items-center justify-center gap-2 active:scale-95" data-v-5259d09c><span data-v-5259d09c>\u{1F310}</span> Terjemahkan Semua Chapter (Permanen) </button><a${ssrRenderAttr("href", `/api/novels/${unref(slug)}/export`)} target="_blank" download class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-2" data-v-5259d09c><span data-v-5259d09c>\u{1F4E5}</span> Unduh Seluruh Chapter (.txt) </a>`);
        if (novel.value.sourceUrl) {
          _push(`<a${ssrRenderAttr("href", novel.value.sourceUrl)} target="_blank" class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-card/60 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-border/60 transition-all flex items-center justify-center gap-2" data-v-5259d09c><span data-v-5259d09c>\u{1F310}</span> Buka Sumber Asli \u2197 </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="w-full mt-4 p-4 rounded-2xl bg-card/50 border border-border/60 flex items-center justify-between text-xs" data-v-5259d09c><span class="text-muted-foreground font-medium" data-v-5259d09c>Total Bab</span><span class="text-amber-400 font-bold font-mono text-base" data-v-5259d09c>${ssrInterpolate(chapters.value.length)}</span></div></div><div class="flex-1 min-w-0" data-v-5259d09c><h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-3" data-v-5259d09c>${ssrInterpolate(novel.value.title)}</h1><div class="flex flex-wrap items-center gap-2.5 mb-5 text-xs" data-v-5259d09c>`);
        if (novel.value.author) {
          _push(`<div class="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3.5 py-1.5 rounded-full font-medium" data-v-5259d09c><span data-v-5259d09c>\u{1F464}</span> Author: <span class="font-bold text-white" data-v-5259d09c>${ssrInterpolate(novel.value.author)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="inline-flex items-center gap-2 bg-card/80 border border-border text-muted-foreground px-3.5 py-1.5 rounded-full font-medium" data-v-5259d09c><span data-v-5259d09c>\u{1F310}</span> Bahasa: <span class="text-foreground font-semibold" data-v-5259d09c>Indonesia / English</span></div></div>`);
        if (novelGenres.value.length) {
          _push(`<div class="flex flex-wrap gap-2 mb-4" data-v-5259d09c><!--[-->`);
          ssrRenderList(novelGenres.value, (g) => {
            _push(`<span class="${ssrRenderClass(["px-3 py-1 rounded-lg text-xs font-bold shadow-md border", g.style])}" data-v-5259d09c>${ssrInterpolate(g.name)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_b = novel.value.tags) == null ? void 0 : _b.length) {
          _push(`<div class="flex flex-wrap gap-1.5 mb-6" data-v-5259d09c><!--[-->`);
          ssrRenderList(novel.value.tags, (tag) => {
            _push(`<span class="px-2.5 py-0.5 rounded-full bg-card/40 border border-border/50 text-[11px] text-muted-foreground" data-v-5259d09c> #${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex border-b border-border/80 mb-6 gap-6" data-v-5259d09c><button class="${ssrRenderClass(["pb-3 text-sm font-bold transition-all relative", activeTab.value === "chapters" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"])}" data-v-5259d09c> \u{1F4CB} Daftar Bab (${ssrInterpolate(chapters.value.length)}) </button><button class="${ssrRenderClass(["pb-3 text-sm font-bold transition-all relative", activeTab.value === "synopsis" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"])}" data-v-5259d09c> \u{1F4C4} Sinopsis Novel </button></div>`);
        if (activeTab.value === "chapters") {
          _push(`<div class="space-y-4" data-v-5259d09c><div class="flex flex-col sm:flex-row gap-3 justify-between items-center bg-card/40 border border-border/60 p-3 rounded-2xl" data-v-5259d09c><div class="relative w-full sm:w-72" data-v-5259d09c><input${ssrRenderAttr("value", chapterSearch.value)} type="text" placeholder="Cari judul bab..." class="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" data-v-5259d09c><span class="absolute left-3 top-2.5 text-xs text-muted-foreground" data-v-5259d09c>\u{1F50D}</span></div><div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end" data-v-5259d09c><button class="px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5" data-v-5259d09c><span data-v-5259d09c>${ssrInterpolate(chapterSort.value === "asc" ? "\u2B07 Urut Awal" : "\u2B06 Urut Akhir")}</span></button></div></div>`);
          if (filteredChapters.value.length === 0) {
            _push(`<div class="py-12 text-center text-muted-foreground text-xs" data-v-5259d09c> Tidak ada bab yang cocok dengan kata kunci pencarian. </div>`);
          } else {
            _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-3" data-v-5259d09c><!--[-->`);
            ssrRenderList(filteredChapters.value, (c) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: c.id,
                to: `/novels/${unref(slug)}/${c.file}`,
                class: "group flex items-center justify-between p-3.5 rounded-xl bg-card/60 hover:bg-card border border-border/60 hover:border-primary/50 transition-all shadow-sm"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<div class="flex items-center gap-3 min-w-0" data-v-5259d09c${_scopeId}><div class="w-8 h-10 rounded-md overflow-hidden bg-card border border-border shrink-0" data-v-5259d09c${_scopeId}>`);
                    if (novel.value.cover) {
                      _push2(`<img${ssrRenderAttr("src", getThumbnailUrl(novel.value.cover))} class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" data-v-5259d09c${_scopeId}>`);
                    } else {
                      _push2(`<div class="w-full h-full flex items-center justify-center text-[10px]" data-v-5259d09c${_scopeId}>\u{1F4D6}</div>`);
                    }
                    _push2(`</div><span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate" data-v-5259d09c${_scopeId}>${ssrInterpolate(c.title)}</span></div><span class="text-[10px] text-muted-foreground font-mono shrink-0 ml-2 group-hover:text-primary" data-v-5259d09c${_scopeId}>Baca \u2192</span>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-3 min-w-0" }, [
                        createVNode("div", { class: "w-8 h-10 rounded-md overflow-hidden bg-card border border-border shrink-0" }, [
                          novel.value.cover ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: getThumbnailUrl(novel.value.cover),
                            class: "w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "w-full h-full flex items-center justify-center text-[10px]"
                          }, "\u{1F4D6}"))
                        ]),
                        createVNode("span", { class: "text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate" }, toDisplayString(c.title), 1)
                      ]),
                      createVNode("span", { class: "text-[10px] text-muted-foreground font-mono shrink-0 ml-2 group-hover:text-primary" }, "Baca \u2192")
                    ];
                  }
                }),
                _: 2
              }, _parent));
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else if (activeTab.value === "synopsis") {
          _push(`<div class="bg-card/70 border border-border/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl" data-v-5259d09c><h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2" data-v-5259d09c><span data-v-5259d09c>\u{1F4C4}</span> Sinopsis Novel </h2><div class="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm" data-v-5259d09c>${(_c = novel.value.description || "Tidak ada sinopsis resmi untuk novel ini.") != null ? _c : ""}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      }
      _push(`</div>`);
      if (showBatchTransModal.value) {
        _push(`<div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" data-v-5259d09c><div class="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto" data-v-5259d09c><button class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl" data-v-5259d09c>\u2715</button><h2 class="text-xl font-bold text-foreground mb-1 flex items-center gap-2" data-v-5259d09c><span data-v-5259d09c>\u{1F310}</span> Terjemahkan Semua Chapter </h2><p class="text-xs text-muted-foreground mb-4" data-v-5259d09c>Terjemahan ini akan disimpan secara <strong data-v-5259d09c>PERMANEN</strong> di disk server sehingga Anda dapat membacanya langsung kapan saja!</p><div class="space-y-4 mb-6" data-v-5259d09c><div data-v-5259d09c><label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2" data-v-5259d09c>Mesin Penerjemah AI</label><select class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" data-v-5259d09c><option value="google" data-v-5259d09c${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "google") : ssrLooseEqual(transEngine.value, "google")) ? " selected" : ""}>\u{1F310} Google Translate (Gratis/Bawaan)</option><option value="gemini" data-v-5259d09c${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "gemini") : ssrLooseEqual(transEngine.value, "gemini")) ? " selected" : ""}>\u26A1 Gemini 1.5 Flash API (AI Disarankan)</option><option value="deepl" data-v-5259d09c${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "deepl") : ssrLooseEqual(transEngine.value, "deepl")) ? " selected" : ""}>\u{1F3AF} DeepL API (Kualitas Sastra)</option><option value="libre" data-v-5259d09c${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "libre") : ssrLooseEqual(transEngine.value, "libre")) ? " selected" : ""}>\u{1F433} LibreTranslate (Self-Hosted Docker)</option></select></div>`);
        if (transEngine.value === "gemini") {
          _push(`<div data-v-5259d09c><label class="block text-xs font-semibold text-muted-foreground mb-1" data-v-5259d09c>Gemini API Key</label><input${ssrRenderAttr("value", transConfig.value.geminiApiKey)} type="password" placeholder="Masukkan Gemini API Key..." class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" data-v-5259d09c></div>`);
        } else {
          _push(`<!---->`);
        }
        if (transEngine.value === "deepl") {
          _push(`<div data-v-5259d09c><label class="block text-xs font-semibold text-muted-foreground mb-1" data-v-5259d09c>DeepL API Key</label><input${ssrRenderAttr("value", transConfig.value.deeplApiKey)} type="password" placeholder="Contoh: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" data-v-5259d09c></div>`);
        } else {
          _push(`<!---->`);
        }
        if (transEngine.value === "libre") {
          _push(`<div class="space-y-3" data-v-5259d09c><div data-v-5259d09c><label class="block text-xs font-semibold text-muted-foreground mb-1" data-v-5259d09c>LibreTranslate Docker URL</label><input${ssrRenderAttr("value", transConfig.value.libreUrl)} type="text" placeholder="http://localhost:5000" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" data-v-5259d09c></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-purple-950/30 border border-purple-500/30 rounded-xl p-3.5 text-xs text-purple-300 leading-relaxed" data-v-5259d09c> \u{1F4A1} Teks terjemahan akan ditulis langsung ke file disk <code data-v-5259d09c>.txt</code> seluruh chapter novel. </div></div><div class="flex gap-3" data-v-5259d09c><button class="flex-1 px-4 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:text-foreground" data-v-5259d09c> Batal </button><button${ssrIncludeBooleanAttr(isBatchTranslating.value) ? " disabled" : ""} class="flex-1 btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50" data-v-5259d09c>`);
        if (isBatchTranslating.value) {
          _push(`<span class="spinner border-2 w-3.5 h-3.5" data-v-5259d09c></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-5259d09c>${ssrInterpolate(isBatchTranslating.value ? "Menerjemahkan..." : "Mulai Terjemahkan Permanen")}</span></button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/novels/[slug]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5259d09c"]]);

export { index as default };
//# sourceMappingURL=index-Bxa7ycsU.mjs.map
