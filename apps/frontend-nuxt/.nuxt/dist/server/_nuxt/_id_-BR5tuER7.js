import { defineComponent, computed, ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useRoute, useRouter } from "vue-router";
import { u as useVideoStore } from "./video-p99v0tOr.js";
import "plyr";
import { _ as _export_sfc } from "../server.mjs";
import "pinia";
import "D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs";
import "D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useVideoStore();
    computed(() => {
      const id = route.params.id;
      return Array.isArray(id) ? id[0] : id;
    });
    const video = ref(null);
    const loading = ref(true);
    const error = ref(null);
    ref(null);
    const savedTime = ref(0);
    const showResumeBanner = ref(false);
    const currentSpeed = ref(1);
    const mimeType = computed(() => {
      if (!video.value) return "video/mp4";
      const format = (video.value.format ?? "mp4").toLowerCase();
      const mimeMap = {
        "mp4": "video/mp4",
        "mkv": "video/x-matroska",
        "webm": "video/webm",
        "avi": "video/x-msvideo",
        "mov": "video/quicktime"
      };
      return mimeMap[format] || "video/mp4";
    });
    function formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? "0" : ""}${s}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "video-player-page min-h-screen bg-background" }, _attrs))} data-v-3e42edcc>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center min-h-[50vh]" data-v-3e42edcc><div class="spinner" data-v-3e42edcc></div></div>`);
      } else if (error.value) {
        _push(`<div class="container mx-auto p-4 py-10" data-v-3e42edcc><div class="bg-rose-500/10 border border-rose-500/50 text-rose-300 p-6 rounded-2xl flex flex-col items-center shadow-xl" data-v-3e42edcc><h2 class="text-xl font-bold mb-2" data-v-3e42edcc>Error Memuat Video</h2><p class="text-sm text-muted-foreground mb-4" data-v-3e42edcc>${ssrInterpolate(error.value)}</p><button class="btn-primary px-5 py-2 text-sm" data-v-3e42edcc> Kembali ke Beranda </button></div></div>`);
      } else if (video.value) {
        _push(`<div class="max-w-6xl mx-auto p-4 lg:p-6" data-v-3e42edcc><button class="mb-4 px-4 py-2 flex items-center gap-2 text-muted-foreground bg-card/60 hover:bg-border/60 rounded-full text-xs font-medium w-max transition border border-border/50" data-v-3e42edcc><span data-v-3e42edcc>←</span> Kembali </button>`);
        if (showResumeBanner.value) {
          _push(`<div class="mb-4 p-4 rounded-2xl bg-purple-900/30 border border-purple-500/40 text-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl backdrop-blur-md" data-v-3e42edcc><div class="flex items-center gap-3" data-v-3e42edcc><span class="text-xl" data-v-3e42edcc>⏯️</span><span class="text-sm font-medium" data-v-3e42edcc>Anda sebelumnya menonton sampai <b data-v-3e42edcc>${ssrInterpolate(formatTime(savedTime.value))}</b>. Lanjutkan?</span></div><div class="flex items-center gap-2" data-v-3e42edcc><button class="px-3.5 py-1.5 rounded-xl border border-purple-500/30 hover:bg-purple-500/20 text-xs font-medium" data-v-3e42edcc>Mulai Awal</button><button class="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium shadow-md" data-v-3e42edcc>Lanjutkan</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-4 relative border border-border/80" data-v-3e42edcc><video class="w-full h-full object-contain" controls playsinline crossorigin="anonymous" data-v-3e42edcc><source${ssrRenderAttr("src", `/api/video/${encodeURIComponent(video.value.id)}/stream`)}${ssrRenderAttr("type", mimeType.value)} data-v-3e42edcc> Browser Anda tidak mendukung video tag. </video></div><div class="bg-card/70 border border-border/60 p-6 rounded-2xl shadow-xl backdrop-blur-xl mb-6" data-v-3e42edcc><div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4" data-v-3e42edcc><div data-v-3e42edcc><h1 class="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight" data-v-3e42edcc>${ssrInterpolate(video.value.name)}</h1><div class="flex flex-wrap gap-2 mb-4 text-xs" data-v-3e42edcc>`);
        if (video.value.author) {
          _push(`<span class="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full font-semibold" data-v-3e42edcc> 👤 ${ssrInterpolate(video.value.author)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full font-semibold uppercase" data-v-3e42edcc>${ssrInterpolate(video.value.format)}</span><span class="bg-gray-800/80 border border-gray-700 text-gray-300 px-3 py-1 rounded-full font-medium" data-v-3e42edcc> 💾 ${ssrInterpolate(video.value.sizeFormatted)}</span><span class="bg-gray-800/80 border border-gray-700 text-gray-300 px-3 py-1 rounded-full font-medium" data-v-3e42edcc> 📁 ${ssrInterpolate(video.value.folder)}</span></div></div><div class="flex flex-wrap gap-2 shrink-0" data-v-3e42edcc><a${ssrRenderAttr("href", `/api/video/${encodeURIComponent(video.value.id)}/stream`)} download class="btn-primary px-4 py-2.5 text-xs font-semibold flex items-center gap-2" data-v-3e42edcc><svg width="18" height="18" viewBox="0 0 24 24" fill="none" data-v-3e42edcc><path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.02 19.412 19.412C19.02 19.804 18.55 20 18 20H6Z" fill="currentColor" data-v-3e42edcc></path></svg> Unduh Video </a></div></div><div class="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3" data-v-3e42edcc><div class="flex items-center gap-2" data-v-3e42edcc><span class="text-xs text-muted-foreground font-medium" data-v-3e42edcc>⚡ Kecepatan:</span><!--[-->`);
        ssrRenderList([0.5, 0.75, 1, 1.25, 1.5, 2], (s) => {
          _push(`<button class="${ssrRenderClass(["px-2.5 py-1 rounded-lg text-xs font-mono transition-all", currentSpeed.value === s ? "bg-primary text-white font-bold shadow-md" : "bg-background border border-border text-muted-foreground hover:text-foreground"])}" data-v-3e42edcc>${ssrInterpolate(s)}x </button>`);
        });
        _push(`<!--]--></div></div>`);
        if (video.value.description) {
          _push(`<div class="mt-6 pt-5 border-t border-border/50" data-v-3e42edcc><h3 class="text-sm font-bold text-foreground mb-2 flex items-center gap-2" data-v-3e42edcc><span data-v-3e42edcc>📄</span> Deskripsi Video </h3><div class="text-xs text-muted-foreground leading-relaxed whitespace-pre-line bg-background/50 border border-border/50 p-4 rounded-xl max-h-60 overflow-y-auto font-sans" data-v-3e42edcc>${ssrInterpolate(video.value.description)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/video/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e42edcc"]]);
export {
  _id_ as default
};
//# sourceMappingURL=_id_-BR5tuER7.js.map
