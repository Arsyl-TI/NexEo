import { readonly, ref } from 'vue';

const toasts = ref([]);
let counter = 0;
function useToast() {
  function remove(id) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }
  function add(message, type = "info", duration = 3e3) {
    const id = counter++;
    const toast = { id, message, type, duration };
    toasts.value.push(toast);
    setTimeout(() => remove(id), duration);
    return id;
  }
  return {
    toasts: readonly(toasts),
    success: (msg, dur) => add(msg, "success", dur),
    error: (msg, dur) => add(msg, "error", dur),
    info: (msg, dur) => add(msg, "info", dur),
    warning: (msg, dur) => add(msg, "warning", dur)
  };
}

export { useToast as u };
//# sourceMappingURL=useToast-B8q9yI-P.mjs.map
