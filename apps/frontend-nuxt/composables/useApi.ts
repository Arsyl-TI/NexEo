// Composables for API access
// NOTE: All Nuxt composables (useState, useRuntimeConfig) must be called
// inside a Vue setup function or a composable invoked from setup — never at module-level.

export function useApi<T = unknown>() {
  const base = useRuntimeConfig().public.apiBase as string || '/api'

  return {
    get: <P = T>(url: string) => $fetch<P>(url, { baseURL: base }),
    post: <P = T>(url: string, body?: unknown) => $fetch<P>(url, { method: 'post', body: body as Record<string, any> | undefined, baseURL: base }),
    put: <P = T>(url: string, body?: unknown) => $fetch<P>(url, { method: 'put', body: body as Record<string, any> | undefined, baseURL: base }),
    del: <P = T>(url: string) => $fetch<P>(url, { method: 'delete', baseURL: base })
  }
}
