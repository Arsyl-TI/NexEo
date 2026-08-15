import { b as useRuntimeConfig } from "../server.mjs";
function useApi() {
  const base = useRuntimeConfig().public.apiBase || "/api";
  return {
    get: (url) => $fetch(url, { baseURL: base }),
    post: (url, body) => $fetch(url, { method: "post", body, baseURL: base }),
    put: (url, body) => $fetch(url, { method: "put", body, baseURL: base }),
    del: (url) => $fetch(url, { method: "delete", baseURL: base })
  };
}
export {
  useApi as u
};
//# sourceMappingURL=useApi-CRMpFdoX.js.map
