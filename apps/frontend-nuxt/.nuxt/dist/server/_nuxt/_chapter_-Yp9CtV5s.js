import { _ as __nuxt_component_0 } from "./nuxt-link-CcmIMMHP.js";
import { ref, computed, defineComponent, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { defineStore } from "pinia";
import { u as useNovelStore } from "./index-D8kQjp-3.js";
import { u as useToast } from "./useToast-B8q9yI-P.js";
import "D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import { u as useApi } from "./useApi-CJK4OrTg.js";
import "D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
const useUIStore = defineStore("ui", () => {
  const isSidebarOpen = ref(false);
  const readerTheme = ref("dark");
  const readerFontSize = ref(18);
  const toasts = ref([]);
  const initPreferences = () => {
    return;
  };
  const setReaderTheme = (theme) => {
    readerTheme.value = theme;
    return;
  };
  const setReaderFontSize = (size) => {
    readerFontSize.value = size;
    return;
  };
  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 3e3);
  };
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  const closeSidebar = () => {
    isSidebarOpen.value = false;
  };
  const themeClasses = computed(() => {
    if (readerTheme.value === "sepia") {
      return {
        bg: "bg-[#f4ecd8]",
        headerBg: "bg-[#f4ecd8]/90",
        border: "border-[#d5c3a1]",
        title: "text-[#5b4636]",
        text: "text-[#433422]",
        btn: "bg-[#e4d5b7] text-[#5b4636] hover:bg-[#d5c3a1]",
        textBtn: "text-[#7a5e46] hover:text-[#433422] hover:bg-[#e4d5b7]",
        navBtn: "bg-[#e4d5b7] text-[#5b4636] border-[#d5c3a1] hover:bg-[#d5c3a1] hover:border-brand"
      };
    } else if (readerTheme.value === "light") {
      return {
        bg: "bg-white",
        headerBg: "bg-white/90",
        border: "border-gray-200",
        title: "text-gray-900",
        text: "text-gray-800",
        btn: "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200",
        textBtn: "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
        navBtn: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-brand"
      };
    } else {
      return {
        bg: "bg-gray-900",
        headerBg: "bg-gray-900/90",
        border: "border-gray-800",
        title: "text-white",
        text: "text-gray-300",
        btn: "bg-gray-800 text-gray-400 hover:text-white",
        textBtn: "text-gray-400 hover:text-white hover:bg-gray-800",
        navBtn: "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-brand"
      };
    }
  });
  return {
    isSidebarOpen,
    readerTheme,
    readerFontSize,
    toasts,
    themeClasses,
    initPreferences,
    setReaderTheme,
    setReaderFontSize,
    showToast,
    toggleSidebar,
    closeSidebar
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[chapter]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const uiStore = useUIStore();
    useNovelStore();
    useToast();
    const slug = route.params.slug;
    const chapter = route.params.chapter;
    const loading = ref(true);
    const immersive = ref(false);
    const chapterContent = ref(null);
    const translatedContent = ref(null);
    const chaptersList = ref([]);
    const showTextSearch = ref(false);
    const searchQuery = ref("");
    const readPercent = ref(0);
    const showAudiobookBar = ref(false);
    const isSpeaking = ref(false);
    const isPaused = ref(false);
    const currentParagraphIndex = ref(0);
    const speechRate = ref(1);
    const showTranslateModal = ref(false);
    const isTranslating = ref(false);
    const transEngine = ref("google");
    const transConfig = ref({
      geminiApiKey: "",
      deeplApiKey: "",
      libreUrl: "http://localhost:5000",
      libreApiKey: ""
    });
    const paragraphTexts = computed(() => {
      const contentToRender = translatedContent.value || chapterContent.value;
      if (!contentToRender) return [];
      if (typeof contentToRender === "string") {
        return contentToRender.split(/<\/p>|<br\s*\/?>/gi).map((s) => s.replace(/<[^>]*>?/gm, "").trim()).filter(Boolean);
      }
      if (Array.isArray(contentToRender)) {
        return contentToRender.filter((i) => i.type === "text" && i.value?.trim()).map((i) => i.value.trim());
      }
      if (contentToRender.content && Array.isArray(contentToRender.content)) {
        return contentToRender.content.filter((i) => i.type === "text" && i.value?.trim()).map((i) => i.value.trim());
      }
      return [];
    });
    function stopAudiobook() {
      isSpeaking.value = false;
      isPaused.value = false;
    }
    const currentIndex = computed(() => {
      if (!chaptersList.value.length) return -1;
      const currentFileName = chapter.replace(/\\/g, "/").split("/").pop() || chapter;
      return chaptersList.value.findIndex((c) => {
        const fn = (c.file || c.filename || c.id || "").replace(/\\/g, "/").split("/").pop();
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
    const themeClasses = computed(() => ({
      wrap: uiStore.readerTheme === "sepia" ? "bg-[#f4ecd8] text-[#2f2416]" : uiStore.readerTheme === "light" ? "bg-white text-slate-900" : "bg-[#0b0f19] text-gray-200",
      headerBg: uiStore.readerTheme === "sepia" ? "bg-[#f4ecd8]/90" : uiStore.readerTheme === "light" ? "bg-white/90" : "bg-[#131b2e]/90",
      border: uiStore.readerTheme === "sepia" ? "border-[#d8c59a]" : uiStore.readerTheme === "light" ? "border-slate-200" : "border-slate-800",
      navBtn: uiStore.readerTheme === "sepia" ? "bg-[#efe1bf] text-[#2f2416] hover:bg-[#e4d3a9]" : uiStore.readerTheme === "light" ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-slate-800 text-gray-200 hover:bg-slate-700",
      textBtn: uiStore.readerTheme === "sepia" ? "bg-[#efe1bf] text-[#2f2416]" : uiStore.readerTheme === "light" ? "bg-slate-100 text-slate-900" : "bg-slate-800 text-gray-200",
      reader: uiStore.readerTheme === "sepia" ? "bg-[#f9f1df] border-[#d8c59a] text-[#2f2416]" : uiStore.readerTheme === "light" ? "bg-white border-slate-200 text-slate-900" : "bg-[#131b2e] border-slate-800 text-gray-200"
    }));
    const matchCount = computed(() => {
      if (!searchQuery.value.trim()) return 0;
      const baseHtml = rawRenderedHtml.value;
      const regex = new RegExp(escapeRegExp(searchQuery.value.trim()), "gi");
      const matches = baseHtml.match(regex);
      return matches ? matches.length : 0;
    });
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    const rawRenderedHtml = computed(() => {
      const contentToRender = translatedContent.value || chapterContent.value;
      if (!contentToRender) return "<p>Konten bab ini belum tersedia.</p>";
      if (typeof contentToRender === "string") return contentToRender;
      if (Array.isArray(contentToRender)) {
        return contentToRender.map((item) => {
          if (item.type === "image") {
            return `<div class="my-6 text-center"><img src="/_novels/${slug}/${item.value}" class="rounded-xl max-h-[600px] mx-auto shadow-md" loading="lazy" /></div>`;
          }
          return `<p class="mb-4 leading-relaxed">${item.value}</p>`;
        }).join("");
      }
      if (contentToRender.content && Array.isArray(contentToRender.content)) {
        return contentToRender.content.map((item) => {
          if (item.type === "image") {
            return `<div class="my-6 text-center"><img src="/_novels/${slug}/${item.value}" class="rounded-xl max-h-[600px] mx-auto shadow-md" loading="lazy" /></div>`;
          }
          return `<p class="mb-4 leading-relaxed">${item.value}</p>`;
        }).join("");
      }
      return "<p>Format konten bab tidak didukung.</p>";
    });
    const renderedHtml = computed(() => {
      const html = rawRenderedHtml.value;
      const q = searchQuery.value.trim();
      if (!q) return html;
      const regex = new RegExp(`(${escapeRegExp(q)})`, "gi");
      return html.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
        if (tag) return tag;
        if (text) {
          return text.replace(regex, '<mark class="search-highlight">$1</mark>');
        }
        return match;
      });
    });
    async function loadChapter() {
      loading.value = true;
      translatedContent.value = null;
      stopAudiobook();
      try {
        const api = useApi();
        if (!chaptersList.value.length) {
          const listRes = await api.get(`/novel/${slug}/chapters`);
          if (listRes?.data) {
            chaptersList.value = listRes.data;
          }
        }
        const res = await api.get(`/novel/${slug}/chapter/${chapter}`);
        chapterContent.value = res?.data || "<p>Konten bab ini belum tersedia.</p>";
        if (false) ;
      } catch (e) {
        console.error("Failed to load chapter content", e);
        chapterContent.value = '<p class="text-red-500">Gagal memuat isi bab novel.</p>';
      } finally {
        loading.value = false;
      }
    }
    watch(() => route.params.chapter, (next) => {
      if (typeof next === "string") void loadChapter();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["min-h-screen transition-all duration-300 relative", themeClasses.value.wrap]
      }, _attrs))} data-v-cd33a977><div class="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-40 pointer-events-none" data-v-cd33a977><div class="bg-primary h-1 transition-all duration-150" style="${ssrRenderStyle({ width: `${readPercent.value}%` })}" data-v-cd33a977></div></div>`);
      if (!immersive.value) {
        _push(`<header class="${ssrRenderClass(["sticky top-1 z-20 backdrop-blur-xl py-3 mb-4 border-b flex flex-wrap items-center justify-between px-3 md:px-6 max-w-5xl mx-auto gap-2.5 rounded-2xl shadow-xl", themeClasses.value.headerBg, themeClasses.value.border])}" data-v-cd33a977>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/novels/${unref(slug)}`,
          class: ["px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5", themeClasses.value.navBtn]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ← Kembali `);
            } else {
              return [
                createTextVNode(" ← Kembali ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center gap-2 flex-wrap" data-v-cd33a977><button class="${ssrRenderClass(["px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md active:scale-95", isSpeaking.value ? "bg-emerald-600 text-white animate-pulse" : "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-500 hover:to-orange-500"])}" data-v-cd33a977><span data-v-cd33a977>🎧</span> ${ssrInterpolate(isSpeaking.value ? "Audiobook Aktif" : "Audiobook Suara")}</button><button class="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors bg-card border border-border text-foreground hover:bg-border/60 flex items-center gap-1.5" data-v-cd33a977><span data-v-cd33a977>🔍</span> Cari Teks </button><button class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-md active:scale-95" data-v-cd33a977><span data-v-cd33a977>🌐</span> Terjemahkan Bab </button><div class="flex items-center gap-1 bg-card border border-border rounded-full px-2.5 py-1" data-v-cd33a977><button class="text-xs font-bold px-1 text-muted-foreground hover:text-foreground" data-v-cd33a977>A-</button><span class="text-xs px-1 font-mono text-foreground" data-v-cd33a977>${ssrInterpolate(unref(uiStore).readerFontSize)}px</span><button class="text-xs font-bold px-1 text-muted-foreground hover:text-foreground" data-v-cd33a977>A+</button></div><button class="${ssrRenderClass([themeClasses.value.textBtn, "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"])}" data-v-cd33a977> Tema: ${ssrInterpolate(unref(uiStore).readerTheme)}</button><button class="${ssrRenderClass([themeClasses.value.textBtn, "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"])}" data-v-cd33a977>${ssrInterpolate(immersive.value ? "Normal" : "Immersive")}</button></div>`);
        if (showTextSearch.value) {
          _push(`<div class="w-full pt-2 flex items-center gap-2 border-t border-border/50" data-v-cd33a977><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Ketik kata kunci untuk dicari di bab ini..." class="flex-1 bg-background border border-border rounded-xl px-4 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary" data-v-cd33a977>`);
          if (searchQuery.value) {
            _push(`<span class="text-xs font-mono text-muted-foreground" data-v-cd33a977>${ssrInterpolate(matchCount.value)} hasil</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="text-xs text-muted-foreground hover:text-foreground px-2 py-1" data-v-cd33a977>Tutup</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</header>`);
      } else {
        _push(`<!---->`);
      }
      if (showAudiobookBar.value) {
        _push(`<div class="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-40 bg-card/95 border border-primary/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in" data-v-cd33a977><div class="flex items-center gap-3 w-full sm:w-auto" data-v-cd33a977><div class="w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-xl shrink-0" data-v-cd33a977> 🎧 </div><div class="min-w-0 flex-1" data-v-cd33a977><h4 class="text-xs font-bold text-foreground truncate" data-v-cd33a977>Pemutar Audiobook Text-to-Speech</h4><p class="text-[11px] text-muted-foreground font-mono" data-v-cd33a977> Paragraf ${ssrInterpolate(currentParagraphIndex.value + 1)} dari ${ssrInterpolate(paragraphTexts.value.length)}</p></div></div><div class="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end" data-v-cd33a977><button class="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary/90 flex items-center gap-1" data-v-cd33a977><span data-v-cd33a977>${ssrInterpolate(isSpeaking.value && !isPaused.value ? "⏸ Pause" : "▶ Putar")}</span></button><button class="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30" data-v-cd33a977> ⏹ Stop </button><select class="bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-primary" data-v-cd33a977><option${ssrRenderAttr("value", 0.75)} data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(speechRate.value) ? ssrLooseContain(speechRate.value, 0.75) : ssrLooseEqual(speechRate.value, 0.75)) ? " selected" : ""}>0.75x</option><option${ssrRenderAttr("value", 1)} data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(speechRate.value) ? ssrLooseContain(speechRate.value, 1) : ssrLooseEqual(speechRate.value, 1)) ? " selected" : ""}>1.0x</option><option${ssrRenderAttr("value", 1.25)} data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(speechRate.value) ? ssrLooseContain(speechRate.value, 1.25) : ssrLooseEqual(speechRate.value, 1.25)) ? " selected" : ""}>1.25x</option><option${ssrRenderAttr("value", 1.5)} data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(speechRate.value) ? ssrLooseContain(speechRate.value, 1.5) : ssrLooseEqual(speechRate.value, 1.5)) ? " selected" : ""}>1.5x</option><option${ssrRenderAttr("value", 2)} data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(speechRate.value) ? ssrLooseContain(speechRate.value, 2) : ssrLooseEqual(speechRate.value, 2)) ? " selected" : ""}>2.0x</option></select><button class="text-xs text-muted-foreground hover:text-foreground p-1" data-v-cd33a977>✕</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!immersive.value && !loading.value) {
        _push(`<div class="max-w-5xl mx-auto px-3 sm:px-4 mb-4" data-v-cd33a977><div class="${ssrRenderClass([[themeClasses.value.headerBg, themeClasses.value.border], "flex items-center justify-between gap-2 p-2.5 rounded-2xl border backdrop-blur-md shadow-sm"])}" data-v-cd33a977><button${ssrIncludeBooleanAttr(!prevChapter.value) ? " disabled" : ""} class="${ssrRenderClass([themeClasses.value.navBtn, "px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"])}" data-v-cd33a977><span data-v-cd33a977>⬅️</span> <span class="hidden sm:inline" data-v-cd33a977>Bab Sebelumnya</span></button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/novels/${unref(slug)}`,
          class: ["px-3 py-2 rounded-xl text-xs font-bold transition-all text-center truncate max-w-[150px] sm:max-w-xs", themeClasses.value.navBtn]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📋 <span class="hidden sm:inline" data-v-cd33a977${_scopeId}>Daftar Bab</span>`);
            } else {
              return [
                createTextVNode(" 📋 "),
                createVNode("span", { class: "hidden sm:inline" }, "Daftar Bab")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button${ssrIncludeBooleanAttr(!nextChapter.value) ? " disabled" : ""} class="${ssrRenderClass([themeClasses.value.navBtn, "px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"])}" data-v-cd33a977><span class="hidden sm:inline" data-v-cd33a977>Bab Selanjutnya</span> <span data-v-cd33a977>➡️</span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showTranslateModal.value) {
        _push(`<div class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm" data-v-cd33a977><div class="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative" data-v-cd33a977><button class="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl" data-v-cd33a977>✕</button><h2 class="text-xl font-bold text-foreground mb-1 flex items-center gap-2" data-v-cd33a977><span data-v-cd33a977>🌐</span> Terjemahkan Bab </h2><p class="text-xs text-muted-foreground mb-6" data-v-cd33a977>Pilih mesin penerjemah otomatis ke Bahasa Indonesia</p><div class="space-y-4" data-v-cd33a977><div data-v-cd33a977><label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2" data-v-cd33a977>Mesin Penerjemah</label><select class="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" data-v-cd33a977><option value="google" data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "google") : ssrLooseEqual(transEngine.value, "google")) ? " selected" : ""}>🌐 Google Translate (Gratis/Bawaan)</option><option value="gemini" data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "gemini") : ssrLooseEqual(transEngine.value, "gemini")) ? " selected" : ""}>⚡ Gemini 1.5 Flash API (AI Disarankan)</option><option value="deepl" data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "deepl") : ssrLooseEqual(transEngine.value, "deepl")) ? " selected" : ""}>🎯 DeepL API (Kualitas Sastra)</option><option value="libre" data-v-cd33a977${ssrIncludeBooleanAttr(Array.isArray(transEngine.value) ? ssrLooseContain(transEngine.value, "libre") : ssrLooseEqual(transEngine.value, "libre")) ? " selected" : ""}>🐳 LibreTranslate (Self-Hosted Docker)</option></select></div>`);
        if (transEngine.value === "gemini") {
          _push(`<div data-v-cd33a977><label class="block text-xs font-semibold text-muted-foreground mb-1" data-v-cd33a977>Gemini API Key</label><input${ssrRenderAttr("value", transConfig.value.geminiApiKey)} type="password" placeholder="Masukkan Gemini API Key..." class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" data-v-cd33a977></div>`);
        } else {
          _push(`<!---->`);
        }
        if (transEngine.value === "deepl") {
          _push(`<div data-v-cd33a977><label class="block text-xs font-semibold text-muted-foreground mb-1" data-v-cd33a977>DeepL API Key</label><input${ssrRenderAttr("value", transConfig.value.deeplApiKey)} type="password" placeholder="Contoh: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" data-v-cd33a977></div>`);
        } else {
          _push(`<!---->`);
        }
        if (transEngine.value === "libre") {
          _push(`<div class="space-y-3" data-v-cd33a977><div data-v-cd33a977><label class="block text-xs font-semibold text-muted-foreground mb-1" data-v-cd33a977>LibreTranslate Docker URL</label><input${ssrRenderAttr("value", transConfig.value.libreUrl)} type="text" placeholder="http://localhost:5000" class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" data-v-cd33a977></div><div data-v-cd33a977><label class="block text-xs font-semibold text-muted-foreground mb-1" data-v-cd33a977>API Key (Opsional)</label><input${ssrRenderAttr("value", transConfig.value.libreApiKey)} type="password" placeholder="Dikosongkan jika tidak memakai key..." class="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary" data-v-cd33a977></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mt-8 flex gap-3" data-v-cd33a977><button class="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card" data-v-cd33a977> Batal </button><button${ssrIncludeBooleanAttr(isTranslating.value) ? " disabled" : ""} class="flex-1 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg disabled:opacity-50" data-v-cd33a977>`);
        if (isTranslating.value) {
          _push(`<span class="spinner border-2 w-4 h-4" data-v-cd33a977></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-cd33a977>${ssrInterpolate(isTranslating.value ? "Menerjemahkan..." : "Mulai Terjemahkan")}</span></button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="max-w-5xl mx-auto px-3 sm:px-4 pb-24" data-v-cd33a977>`);
      if (loading.value) {
        _push(`<div class="py-20 flex justify-center" data-v-cd33a977><div class="spinner" data-v-cd33a977></div></div>`);
      } else if (!chapterContent.value) {
        _push(`<div class="py-20 text-center text-muted-foreground" data-v-cd33a977>Bab tidak ditemukan.</div>`);
      } else {
        _push(`<article class="${ssrRenderClass(["prose max-w-none rounded-2xl p-4 sm:p-8 md:p-12 border shadow-lg leading-relaxed", themeClasses.value.reader])}" style="${ssrRenderStyle({ fontSize: `${unref(uiStore).readerFontSize}px` })}" data-v-cd33a977>${renderedHtml.value ?? ""}</article>`);
      }
      if (!loading.value && chapterContent.value) {
        _push(`<div class="${ssrRenderClass([[themeClasses.value.headerBg, themeClasses.value.border], "mt-8 flex items-center justify-between gap-3 p-3 rounded-2xl border backdrop-blur-md shadow-md"])}" data-v-cd33a977><button${ssrIncludeBooleanAttr(!prevChapter.value) ? " disabled" : ""} class="${ssrRenderClass([themeClasses.value.navBtn, "px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"])}" data-v-cd33a977><span data-v-cd33a977>⬅️</span> <span data-v-cd33a977>Bab Sebelumnya</span></button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/novels/${unref(slug)}`,
          class: ["px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all text-center", themeClasses.value.navBtn]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 📋 <span class="hidden sm:inline" data-v-cd33a977${_scopeId}>Daftar Bab</span>`);
            } else {
              return [
                createTextVNode(" 📋 "),
                createVNode("span", { class: "hidden sm:inline" }, "Daftar Bab")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button${ssrIncludeBooleanAttr(!nextChapter.value) ? " disabled" : ""} class="${ssrRenderClass([themeClasses.value.navBtn, "px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-md"])}" data-v-cd33a977><span data-v-cd33a977>Bab Selanjutnya</span> <span data-v-cd33a977>➡️</span></button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/novels/[slug]/[chapter].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _chapter_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cd33a977"]]);
export {
  _chapter_ as default
};
//# sourceMappingURL=_chapter_-Yp9CtV5s.js.map
