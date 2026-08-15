import { hasInjectionContext, inject } from "vue";
import { useHead as useHead$1, headSymbol } from "D:/MyProject/NexEo/node_modules/.pnpm/@unhead+vue@2.1.17_vue@3.5.41_typescript@5.9.3_/node_modules/@unhead/vue/dist/index.mjs";
import { t as tryUseNuxtApp } from "../server.mjs";
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
export {
  useHead as u
};
//# sourceMappingURL=v3-B1iQazbp.js.map
