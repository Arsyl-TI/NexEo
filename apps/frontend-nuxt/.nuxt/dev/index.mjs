import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import os, { tmpdir } from 'node:os';
import { Server } from 'node:http';
import path, { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, getQuery as getQuery$1, getRequestWebStream, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, readBody, setHeader, sendStream, getHeader, readMultipartFormData, getResponseStatusText } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/h3@1.15.11/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/@vue+shared@3.5.41/node_modules/@vue/shared/dist/shared.cjs.js';
import viteNodeEntry_mjs from 'file://D:/MyProject/NexEo/node_modules/.pnpm/@nuxt+vite-builder@3.21.11__8a558ac528f01abbe15109c260a6a427/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/@nuxt+vite-builder@3.21.11__8a558ac528f01abbe15109c260a6a427/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import fs, { promises } from 'node:fs';
import axios from 'file://D:/MyProject/NexEo/node_modules/.pnpm/axios@1.19.0/node_modules/axios/index.js';
import AdmZip from 'file://D:/MyProject/NexEo/node_modules/.pnpm/adm-zip@0.5.18/node_modules/adm-zip/adm-zip.js';
import * as cheerio from 'file://D:/MyProject/NexEo/node_modules/.pnpm/cheerio@1.2.0/node_modules/cheerio/dist/esm/index.js';
import xml2js from 'file://D:/MyProject/NexEo/node_modules/.pnpm/xml2js@0.6.2/node_modules/xml2js/lib/xml2js.js';
import jschardet from 'file://D:/MyProject/NexEo/node_modules/.pnpm/jschardet@3.1.4/node_modules/jschardet/index.js';
import iconv from 'file://D:/MyProject/NexEo/node_modules/.pnpm/iconv-lite@0.6.3/node_modules/iconv-lite/lib/index.js';
import translate from 'file://D:/MyProject/NexEo/node_modules/.pnpm/google-translate-api-x@10.7.3/node_modules/google-translate-api-x/index.cjs';
import ffmpeg from 'file://D:/MyProject/NexEo/node_modules/.pnpm/fluent-ffmpeg@2.1.3/node_modules/fluent-ffmpeg/index.js';
import ffmpegStatic from 'file://D:/MyProject/NexEo/node_modules/.pnpm/ffmpeg-static@5.3.0/node_modules/ffmpeg-static/index.js';
import { spawn } from 'node:child_process';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/vue-bundle-renderer@2.3.2/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, encodePath, joinRelativeURL } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/ufo@1.6.4/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/vue@3.5.41_typescript@5.9.3/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs';
import destr, { destr as destr$1 } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/devalue@5.9.0/node_modules/devalue/index.js';
import { isVNode, isRef, toValue } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/vue@3.5.41_typescript@5.9.3/node_modules/vue/index.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/plugins.mjs';
import { createHooks } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/node-mock-http@1.0.5/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_ioredis@5.11.1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://D:/MyProject/NexEo/node_modules/.pnpm/unstorage@1.17.5_db0@0.3.4_ioredis@5.11.1/node_modules/unstorage/drivers/fs.mjs';
import file_58_47_47_47D_58_47MyProject_47NexEo_47node_modules_47_46pnpm_47_64nuxt_43nitro_45server_643_4621_4611__ab6b34050c574ac4ae20c7ed2556094e_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js from 'file://D:/MyProject/NexEo/node_modules/.pnpm/@nuxt+nitro-server@3.21.11__ab6b34050c574ac4ae20c7ed2556094e/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import { digest, hash as hash$1 } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/youch-core@0.3.3/node_modules/youch-core/build/index.js';
import { Youch } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/youch@4.1.1/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/source-map@0.7.6/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/errx@0.1.2/node_modules/errx/dist/index.mjs';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file://D:/MyProject/NexEo/node_modules/.pnpm/@nuxt+vite-builder@3.21.11__8a558ac528f01abbe15109c260a6a427/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://D:/MyProject/NexEo/node_modules/.pnpm/unhead@2.1.17/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"D:/MyProject/NexEo/apps/frontend-nuxt/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/MyProject/NexEo/apps/frontend-nuxt","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/MyProject/NexEo/apps/frontend-nuxt/server","watchOptions":{"ignored":[null]}}));
storage.mount('cache:nuxt:payload', file_58_47_47_47D_58_47MyProject_47NexEo_47node_modules_47_46pnpm_47_64nuxt_43nitro_45server_643_4621_4611__ab6b34050c574ac4ae20c7ed2556094e_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js({"driver":"file:///D:/MyProject/NexEo/node_modules/.pnpm/@nuxt+nitro-server@3.21.11__ab6b34050c574ac4ae20c7ed2556094e/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js","base":"D:/MyProject/NexEo/apps/frontend-nuxt/.nuxt/cache/nuxt/payload"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/MyProject/NexEo/apps/frontend-nuxt/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/MyProject/NexEo/apps/frontend-nuxt/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"D:/MyProject/NexEo/apps/frontend-nuxt/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      }
    }
  },
  "public": {
    "apiBase": "/api"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e.data) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"] || !!event.context.nuxt?.["~rendering-error"];
	if (!isRenderingError) {
		event.context.nuxt ||= {};
		event.context.nuxt["~rendering-error"] = true;
	}
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const rootDir$1 = "D:/MyProject/NexEo/apps/frontend-nuxt";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"},{"name":"description","content":"Personal LAN video streaming, novel reader, and manga reader"},{"name":"theme-color","content":"#7c3aed"},{"name":"mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-status-bar-style","content":"black-translucent"},{"name":"apple-mobile-web-app-title","content":"NexEo"}],"link":[{"rel":"icon","type":"image/svg+xml","href":"/favicon.svg"},{"rel":"apple-touch-icon","href":"/favicon.svg"},{"rel":"manifest","href":"/manifest.json"}],"style":[],"script":[],"noscript":[],"title":"NexEo — Personal LAN Media Center"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _wWegsMt8r3ssv3m8Op550fJKvfl7MFUs4MEU5zxY = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir$1), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			
			filename,
			
			stack: trace
		};
		
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  _wWegsMt8r3ssv3m8Op550fJKvfl7MFUs4MEU5zxY,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _62LmDv = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

function computeIslandHash(name, serializedProps, context, source) {
  let parsed;
  try {
    parsed = JSON.parse(serializedProps);
  } catch {
    parsed = serializedProps;
  }
  return hash$1([name, parsed, context, source]).replace(/[-_]/g, "");
}

const MAX_ISLAND_BODY_BYTES = 64 * 1024;

const MAX_ISLAND_PROP_DEPTH = 64;

function exceedsMaxDepth(raw, maxDepth = MAX_ISLAND_PROP_DEPTH) {
	let depth = 0;
	let inString = false;
	let escaped = false;
	for (let i = 0; i < raw.length; i++) {
		const ch = raw[i];
		if (inString) {
			if (escaped) {
				escaped = false;
			} else if (ch === "\\") {
				escaped = true;
			} else if (ch === "\"") {
				inString = false;
			}
			continue;
		}
		if (ch === "\"") {
			inString = true;
		} else if (ch === "{" || ch === "[") {
			if (++depth > maxDepth) {
				return true;
			}
		} else if (ch === "}" || ch === "]") {
			if (depth > 0) {
				depth--;
			}
		}
	}
	return false;
}

function exceedsMaxBytes(raw, maxBytes = MAX_ISLAND_BODY_BYTES) {
	return Buffer.byteLength(raw, "utf8") > maxBytes;
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = undefined ;
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		
		
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		let html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		
		if (!html && ssrContext.teleports) {
			for (const [key, value] of Object.entries(ssrContext.teleports)) {
				const [, , componentUid] = key.match(SSR_CLIENT_TELEPORT_MARKER) ?? [];
				if (componentUid === clientUid) {
					html = value.replaceAll("<!--teleport start anchor-->", "");
					break;
				}
			}
		}
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	{
		return toResponse(event, await renderIsland(event));
	}
});
function toResponse(event, result) {
	return "raw" in result ? returnIslandResponse(event, result.raw) : result;
}
async function renderIsland(event) {
	const nitroApp = useNitroApp();
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		if (ssrContext["~renderResponse"] && err?.message === "skipping render") {
			return {};
		}
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (ssrContext["~renderResponse"]) {
		const response = ssrContext["~renderResponse"];
		if (response.statusCode && response.statusCode >= 400) {
			throw createError({
				statusCode: response.statusCode,
				statusMessage: response.statusMessage
			});
		}
		return { raw: response };
	}
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			
			
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	
	islandHead.link ||= [];
	islandHead.style ||= [];
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
}
function returnIslandResponse(event, response) {
	for (const header in response.headers || {}) {
		setResponseHeader(event, header, response.headers[header]);
	}
	if (response.statusCode) {
		setResponseStatus(event, response.statusCode, response.statusMessage);
	}
	return response.body;
}
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;


async function readGuardedIslandBody(event) {
	const contentLength = Number(getRequestHeader(event, "content-length"));
	if (contentLength > MAX_ISLAND_BODY_BYTES) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request body too large"
		});
	}
	
	
	let received = 0;
	let raw = "";
	let overflowed = false;
	const stream = getRequestWebStream(event);
	if (stream) {
		const decoder = new TextDecoder();
		const reader = stream.getReader();
		try {
			for (;;) {
				const { done, value } = await reader.read();
				if (done) {
					break;
				}
				received += value.byteLength;
				if (received > MAX_ISLAND_BODY_BYTES) {
					
					
					
					overflowed = true;
					continue;
				}
				raw += decoder.decode(value, { stream: true });
			}
		} finally {
			reader.releaseLock();
		}
		raw += decoder.decode();
	}
	if (overflowed) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request body too large"
		});
	}
	if (!raw) {
		return {};
	}
	if (exceedsMaxDepth(raw)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Island request body too deeply nested"
		});
	}
	return destr$1(raw) || {};
}
async function getIslandContext(event) {
	let url = event.path || "";
	url.replace(/\?.*$/, "");
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const rawContext = event.method === "GET" ? getQuery$1(event) : await readGuardedIslandBody(event);
	const serializedProps = typeof rawContext?.props === "string" ? rawContext.props : "{}";
	
	
	if (exceedsMaxBytes(serializedProps)) {
		throw createError({
			statusCode: 413,
			statusMessage: "Island request props too large"
		});
	}
	if (exceedsMaxDepth(serializedProps)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Island request props too deeply nested"
		});
	}
	
	
	const clientContext = {};
	if (rawContext && typeof rawContext === "object") {
		for (const key in rawContext) {
			if (key !== "props") {
				clientContext[key] = rawContext[key];
			}
		}
	}
	const parsed = destr$1(serializedProps);
	if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request props"
		});
	}
	const parsedProps = parsed;
	
	
	const expectedHash = computeIslandHash(componentName, serializedProps, clientContext, undefined);
	if (!hashId || hashId !== expectedHash) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request hash"
		});
	}
	return {
		url: typeof rawContext?.url === "string" ? rawContext.url : "/",
		id: hashId,
		name: componentName,
		props: parsedProps,
		slots: {},
		components: {}
	};
}

const _lazy_EBEltq = () => Promise.resolve().then(function () { return categories_get$3; });
const _lazy_P8qeBp = () => Promise.resolve().then(function () { return _filename__get$7; });
const _lazy_E62Vr_ = () => Promise.resolve().then(function () { return tasks_get$1; });
const _lazy_PeXua1 = () => Promise.resolve().then(function () { return tasks_post$1; });
const _lazy_vyH4_j = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_EY18Ms = () => Promise.resolve().then(function () { return cancel_post$1; });
const _lazy_w4KFBg = () => Promise.resolve().then(function () { return deals_get$1; });
const _lazy_rcV7tF = () => Promise.resolve().then(function () { return freebies_get$1; });
const _lazy_GeMJk9 = () => Promise.resolve().then(function () { return lookup_get$1; });
const _lazy_Z0N87f = () => Promise.resolve().then(function () { return stores_get$1; });
const _lazy_aplgqS = () => Promise.resolve().then(function () { return accounts_get$1; });
const _lazy_V3wS1c = () => Promise.resolve().then(function () { return accounts_post$1; });
const _lazy_1e6DBx = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_JuYO4W = () => Promise.resolve().then(function () { return files_get$1; });
const _lazy_aOqmex = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_PJ5DmP = () => Promise.resolve().then(function () { return _id__get$7; });
const _lazy_oidQZE = () => Promise.resolve().then(function () { return upload_post$5; });
const _lazy_W5Oup1 = () => Promise.resolve().then(function () { return info_get$1; });
const _lazy_HB3OpB = () => Promise.resolve().then(function () { return _slug__get$7; });
const _lazy_Mumbhl = () => Promise.resolve().then(function () { return _chapter__get$1; });
const _lazy_wohPue = () => Promise.resolve().then(function () { return export_get$3; });
const _lazy_Qzwczy = () => Promise.resolve().then(function () { return chapters_get$5; });
const _lazy_tjTMLf = () => Promise.resolve().then(function () { return library_get$5; });
const _lazy_4SwZZ8 = () => Promise.resolve().then(function () { return cover_get$1; });
const _lazy_Tqjkfq = () => Promise.resolve().then(function () { return detail_get$1; });
const _lazy_beLa_g = () => Promise.resolve().then(function () { return download_post$3; });
const _lazy_jObWaU = () => Promise.resolve().then(function () { return search_get$3; });
const _lazy_gxyA6_ = () => Promise.resolve().then(function () { return _slug__get$5; });
const _lazy_Otvuu2 = () => Promise.resolve().then(function () { return _filename__get$5; });
const _lazy_9WBEmy = () => Promise.resolve().then(function () { return chapters_get$3; });
const _lazy_ezQTL7 = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_1lIZyF = () => Promise.resolve().then(function () { return library_get$3; });
const _lazy_k__e6W = () => Promise.resolve().then(function () { return _slug__get$3; });
const _lazy_MXVajN = () => Promise.resolve().then(function () { return _filename__get$3; });
const _lazy_If3HSz = () => Promise.resolve().then(function () { return chapters_get$1; });
const _lazy_yxNIcw = () => Promise.resolve().then(function () { return exportEpub_get$1; });
const _lazy_RkLv1B = () => Promise.resolve().then(function () { return export_get$1; });
const _lazy__LIpxI = () => Promise.resolve().then(function () { return import_post$3; });
const _lazy_lOzC13 = () => Promise.resolve().then(function () { return import_post$1; });
const _lazy_9wMKLK = () => Promise.resolve().then(function () { return library_get$1; });
const _lazy_7b9pqC = () => Promise.resolve().then(function () { return sources_get$1; });
const _lazy_w3QfRr = () => Promise.resolve().then(function () { return _slug__get$1; });
const _lazy__FyMZC = () => Promise.resolve().then(function () { return novels_get$1; });
const _lazy_Pz82FG = () => Promise.resolve().then(function () { return translateAll_post$1; });
const _lazy_Zmywsc = () => Promise.resolve().then(function () { return translate_post$1; });
const _lazy_kuWKbu = () => Promise.resolve().then(function () { return qrcode_get$1; });
const _lazy_g3fDtd = () => Promise.resolve().then(function () { return _filename__delete$1; });
const _lazy_lVgSa2 = () => Promise.resolve().then(function () { return downloadZip_post$1; });
const _lazy_fqf94D = () => Promise.resolve().then(function () { return _filename__get$1; });
const _lazy_T_vAxt = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_u0k32j = () => Promise.resolve().then(function () { return upload_post$3; });
const _lazy_iPOmbM = () => Promise.resolve().then(function () { return ____id__get$3; });
const _lazy_hd6gY9 = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_pHiIHM = () => Promise.resolve().then(function () { return upload_post$1; });
const _lazy_6tn0Ee = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_72HmMk = () => Promise.resolve().then(function () { return stream_get$1; });
const _lazy_7pN0SR = () => Promise.resolve().then(function () { return categories_get$1; });
const _lazy_swAOz4 = () => Promise.resolve().then(function () { return folders_get$1; });
const _lazy_JBDjnV = () => Promise.resolve().then(function () { return videos_get$1; });
const _lazy_5G2doF = () => Promise.resolve().then(function () { return refresh_post$1; });
const _lazy_VXBLS7 = () => Promise.resolve().then(function () { return search_get$1; });
const _lazy_OJi6Nr = () => Promise.resolve().then(function () { return ____id__get$1; });
const _lazy_I1sB7e = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_jyUOEn = () => Promise.resolve().then(function () { return download_post$1; });
const _lazy__qB_e3 = () => Promise.resolve().then(function () { return info_post$1; });
const _lazy_6Wcvrq = () => Promise.resolve().then(function () { return ____path__get$3; });
const _lazy_LlZpyr = () => Promise.resolve().then(function () { return ____path__get$1; });
const _lazy_5KeENH = () => Promise.resolve().then(function () { return renderer; });

const handlers = [
  { route: '', handler: _62LmDv, lazy: false, middleware: true, method: undefined },
  { route: '/api/categories', handler: _lazy_EBEltq, lazy: true, middleware: false, method: "get" },
  { route: '/api/download/:filename', handler: _lazy_P8qeBp, lazy: true, middleware: false, method: "get" },
  { route: '/api/downloader/tasks', handler: _lazy_E62Vr_, lazy: true, middleware: false, method: "get" },
  { route: '/api/downloader/tasks', handler: _lazy_PeXua1, lazy: true, middleware: false, method: "post" },
  { route: '/api/downloader/tasks/:id', handler: _lazy_vyH4_j, lazy: true, middleware: false, method: "delete" },
  { route: '/api/downloader/tasks/:id/cancel', handler: _lazy_EY18Ms, lazy: true, middleware: false, method: "post" },
  { route: '/api/games/deals', handler: _lazy_w4KFBg, lazy: true, middleware: false, method: "get" },
  { route: '/api/games/freebies', handler: _lazy_rcV7tF, lazy: true, middleware: false, method: "get" },
  { route: '/api/games/lookup', handler: _lazy_GeMJk9, lazy: true, middleware: false, method: "get" },
  { route: '/api/games/stores', handler: _lazy_Z0N87f, lazy: true, middleware: false, method: "get" },
  { route: '/api/gdrive/pool/accounts', handler: _lazy_aplgqS, lazy: true, middleware: false, method: "get" },
  { route: '/api/gdrive/pool/accounts', handler: _lazy_V3wS1c, lazy: true, middleware: false, method: "post" },
  { route: '/api/gdrive/pool/accounts/:id', handler: _lazy_1e6DBx, lazy: true, middleware: false, method: "delete" },
  { route: '/api/gdrive/pool/files', handler: _lazy_JuYO4W, lazy: true, middleware: false, method: "get" },
  { route: '/api/gdrive/pool/files/:id', handler: _lazy_aOqmex, lazy: true, middleware: false, method: "delete" },
  { route: '/api/gdrive/pool/stream/:id', handler: _lazy_PJ5DmP, lazy: true, middleware: false, method: "get" },
  { route: '/api/gdrive/pool/upload', handler: _lazy_oidQZE, lazy: true, middleware: false, method: "post" },
  { route: '/api/info', handler: _lazy_W5Oup1, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/:slug', handler: _lazy_HB3OpB, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/:slug/chapter/:chapter', handler: _lazy_Mumbhl, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/:slug/chapter/:chapter/export', handler: _lazy_wohPue, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/:slug/chapters', handler: _lazy_Qzwczy, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/library', handler: _lazy_tjTMLf, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/online/cover', handler: _lazy_4SwZZ8, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/online/detail', handler: _lazy_Tqjkfq, lazy: true, middleware: false, method: "get" },
  { route: '/api/manga/online/download', handler: _lazy_beLa_g, lazy: true, middleware: false, method: "post" },
  { route: '/api/manga/online/search', handler: _lazy_jObWaU, lazy: true, middleware: false, method: "get" },
  { route: '/api/novel/:slug', handler: _lazy_gxyA6_, lazy: true, middleware: false, method: "get" },
  { route: '/api/novel/:slug/chapter/:filename', handler: _lazy_Otvuu2, lazy: true, middleware: false, method: "get" },
  { route: '/api/novel/:slug/chapters', handler: _lazy_9WBEmy, lazy: true, middleware: false, method: "get" },
  { route: '/api/novel', handler: _lazy_ezQTL7, lazy: true, middleware: false, method: "get" },
  { route: '/api/novel/library', handler: _lazy_1lIZyF, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/:slug', handler: _lazy_k__e6W, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/:slug/chapter/:filename', handler: _lazy_MXVajN, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/:slug/chapters', handler: _lazy_If3HSz, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/:slug/export-epub', handler: _lazy_yxNIcw, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/:slug/export', handler: _lazy_RkLv1B, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/epub/import', handler: _lazy__LIpxI, lazy: true, middleware: false, method: "post" },
  { route: '/api/novels/import', handler: _lazy_lOzC13, lazy: true, middleware: false, method: "post" },
  { route: '/api/novels/library', handler: _lazy_9wMKLK, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/sources', handler: _lazy_7b9pqC, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/sources/:source/novel/:slug', handler: _lazy_w3QfRr, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/sources/:source/novels', handler: _lazy__FyMZC, lazy: true, middleware: false, method: "get" },
  { route: '/api/novels/translate-all', handler: _lazy_Pz82FG, lazy: true, middleware: false, method: "post" },
  { route: '/api/novels/translate', handler: _lazy_Zmywsc, lazy: true, middleware: false, method: "post" },
  { route: '/api/qrcode', handler: _lazy_kuWKbu, lazy: true, middleware: false, method: "get" },
  { route: '/api/shared-files/:filename', handler: _lazy_g3fDtd, lazy: true, middleware: false, method: "delete" },
  { route: '/api/shared-files/download-zip', handler: _lazy_lVgSa2, lazy: true, middleware: false, method: "post" },
  { route: '/api/shared-files/download/:filename', handler: _lazy_fqf94D, lazy: true, middleware: false, method: "get" },
  { route: '/api/shared-files', handler: _lazy_T_vAxt, lazy: true, middleware: false, method: "get" },
  { route: '/api/shared-files/upload', handler: _lazy_u0k32j, lazy: true, middleware: false, method: "post" },
  { route: '/api/thumbnails/**:id', handler: _lazy_iPOmbM, lazy: true, middleware: false, method: "get" },
  { route: '/api/thumbnails/:id', handler: _lazy_hd6gY9, lazy: true, middleware: false, method: "get" },
  { route: '/api/upload', handler: _lazy_pHiIHM, lazy: true, middleware: false, method: "post" },
  { route: '/api/video/:id', handler: _lazy_6tn0Ee, lazy: true, middleware: false, method: "get" },
  { route: '/api/video/:id/stream', handler: _lazy_72HmMk, lazy: true, middleware: false, method: "get" },
  { route: '/api/video/categories', handler: _lazy_7pN0SR, lazy: true, middleware: false, method: "get" },
  { route: '/api/video/category/:category/folders', handler: _lazy_swAOz4, lazy: true, middleware: false, method: "get" },
  { route: '/api/video/folder/:folder/videos', handler: _lazy_JBDjnV, lazy: true, middleware: false, method: "get" },
  { route: '/api/video/refresh', handler: _lazy_5G2doF, lazy: true, middleware: false, method: "post" },
  { route: '/api/video/search', handler: _lazy_VXBLS7, lazy: true, middleware: false, method: "get" },
  { route: '/api/video/thumbnail/**:id', handler: _lazy_OJi6Nr, lazy: true, middleware: false, method: "get" },
  { route: '/api/video/thumbnail/:id', handler: _lazy_I1sB7e, lazy: true, middleware: false, method: "get" },
  { route: '/api/youtube/download', handler: _lazy_jyUOEn, lazy: true, middleware: false, method: "post" },
  { route: '/api/youtube/info', handler: _lazy__qB_e3, lazy: true, middleware: false, method: "post" },
  { route: '/_manga/**:path', handler: _lazy_6Wcvrq, lazy: true, middleware: false, method: "get" },
  { route: '/_novels/**:path', handler: _lazy_LlZpyr, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_5KeENH, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_5KeENH, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$1 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$1.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$1.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$1.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"version": "",
	"status": 500,
	"statusText": "Server error",
	"description": "This page is temporarily unavailable."
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1,minimum-scale=1\" name=\"viewport\"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);filter:blur(20vh)}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.-bottom-1\\/2{bottom:-50%}.left-0{left:0}.right-0{right:0}.grid{display:grid}.mb-16{margin-bottom:4rem}.mb-8{margin-bottom:2rem}.h-1\\/2{height:50%}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-8{padding-left:2rem;padding-right:2rem}.text-center{text-align:center}.text-8xl{font-size:6rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:px-0{padding-left:0;padding-right:0}.sm\\:text-4xl{font-size:2.25rem;line-height:2.5rem}}</style><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script></head><body class=\"antialiased bg-white dark:bg-black dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-black\"><div class=\"-bottom-1/2 fixed h-1/2 left-0 right-0 spotlight\"></div><div class=\"max-w-520px text-center\"><h1 class=\"font-medium mb-8 sm:text-10xl text-8xl\">" + escapeHtml(messages.status) + "</h1><p class=\"font-light leading-tight mb-16 px-8 sm:px-0 sm:text-4xl text-xl\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const client_manifest = () => viteNodeFetch.getManifest();

const client_manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client_manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

var _a, _b;
const rootDir = (_a = process.env["NEXE_ROOT_DIR"]) != null ? _a : path.resolve(".").replace(/\\/g, "/");
const dataPath = path.join(rootDir, "data");
function resolveCategoryPath(baseDir, categoryFolderName) {
  const targetPath = path.join(baseDir, categoryFolderName);
  if (fs.existsSync(targetPath)) {
    return targetPath;
  }
  const lowerPath = path.join(baseDir, categoryFolderName.toLowerCase());
  if (fs.existsSync(lowerPath)) {
    return lowerPath;
  }
  return targetPath;
}
const baseVideoDir = (_b = process.env["VIDEO_DIR"]) != null ? _b : "D:\\Video";
const serverConfig = {
  port: process.env["NEXE_PORT"] ? Number(process.env["NEXE_PORT"]) : 3e3,
  video: {
    categories: [
      {
        id: "anime",
        name: "List Anime",
        icon: "film",
        path: resolveCategoryPath(baseVideoDir, "Anime")
      },
      {
        id: "youtube",
        name: "List YouTube",
        icon: "youtube",
        path: resolveCategoryPath(baseVideoDir, "YouTube")
      }
    ],
    supportedFormats: [".mp4", ".mkv", ".webm", ".mov", ".avi"],
    cacheTtl: 6e4,
    thumbnailDir: path.join(dataPath, "thumbnails")
  },
  novel: {
    dir: path.join(rootDir, "data", "novels"),
    thumbnailDir: path.join(rootDir, "data", "novels", "thumbnails")
  },
  manga: {
    dir: process.env["MANGA_DIR"] && fs.existsSync(process.env["MANGA_DIR"]) ? process.env["MANGA_DIR"] : fs.existsSync("D:\\Manga") ? "D:\\Manga" : path.join(rootDir, "data", "manga")
  },
  uploadDir: path.join(rootDir, "uploads"),
  sharedFilesDir: path.join(rootDir, "uploads"),
  cacheDir: path.join(rootDir, "cache"),
  dataDir: dataPath
};
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

let cachedTimestamp = 0;
let cachedResult = null;
function isCacheExpired() {
  return Date.now() - cachedTimestamp > serverConfig.video.cacheTtl;
}
function scanDirectory(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch (e) {
    return [];
  }
}
function scanVideos(dir, relativeBase, categoryId, supportedFormats, recursive = true) {
  const videos = [];
  try {
    if (!fs.existsSync(dir)) return [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relPath = path.relative(relativeBase, fullPath).replace(/\\/g, "/");
      const id = `${categoryId}/${relPath.toLowerCase()}`;
      if (item.isDirectory()) {
        if (recursive) {
          videos.push(...scanVideos(fullPath, relativeBase, categoryId, supportedFormats, true));
        }
      } else {
        const ext = path.extname(fullPath).toLowerCase();
        if (supportedFormats.includes(ext)) {
          try {
            const stat = fs.statSync(fullPath);
            let description = void 0;
            let author = void 0;
            const jsonPath = fullPath.substring(0, fullPath.lastIndexOf(".")) + ".json";
            if (fs.existsSync(jsonPath)) {
              try {
                const meta = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
                description = meta.description;
                author = meta.author;
              } catch {
              }
            }
            videos.push({
              id,
              title: item.name,
              path: fullPath.replace(/\\/g, "/"),
              categoryId,
              folderId: categoryId,
              folder: path.dirname(relPath).replace(/\\/g, "/"),
              name: item.name,
              size: stat.size,
              sizeFormatted: formatFileSize(stat.size),
              format: ext.toUpperCase().replace(".", ""),
              hasThumbnail: stat.size > 0,
              description,
              author
            });
          } catch (e) {
          }
        }
      }
    }
  } catch (err) {
    console.error("Scan videos error:", err);
  }
  return videos;
}
async function scan() {
  const categories = serverConfig.video.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    folder: cat.path,
    path: cat.path,
    icon: cat.icon
  }));
  const folders = [];
  const videos = [];
  const videoMap = /* @__PURE__ */ new Map();
  for (const cat of serverConfig.video.categories) {
    if (!fs.existsSync(cat.path)) continue;
    let folderVideoCount = 0;
    const categoryDirectVideos = scanVideos(cat.path, cat.path, cat.id, serverConfig.video.supportedFormats, false);
    if (categoryDirectVideos.length > 0) {
      folderVideoCount += categoryDirectVideos.length;
      const firstVideo = categoryDirectVideos[0];
      folders.push({
        id: `${cat.id}/root`,
        name: "General",
        path: cat.path.replace(/\\/g, "/"),
        categoryId: cat.id,
        videoCount: categoryDirectVideos.length,
        coverId: firstVideo == null ? void 0 : firstVideo.id,
        hasCoverThumbnail: true
      });
      for (const v of categoryDirectVideos) {
        videos.push(v);
        videoMap.set(v.id, v);
      }
    }
    const subfolders = scanDirectory(cat.path);
    for (const folderName of subfolders) {
      const folderPath = path.join(cat.path, folderName);
      const folderVideos = scanVideos(folderPath, cat.path, cat.id, serverConfig.video.supportedFormats);
      folderVideoCount += folderVideos.length;
      const firstVideo = folderVideos.length > 0 ? folderVideos[0] : void 0;
      folders.push({
        id: `${cat.id}/${folderName.toLowerCase()}`,
        name: folderName,
        path: folderPath.replace(/\\/g, "/"),
        categoryId: cat.id,
        videoCount: folderVideos.length,
        coverId: firstVideo == null ? void 0 : firstVideo.id,
        hasCoverThumbnail: folderVideos.length > 0
      });
      for (const v of folderVideos) {
        videos.push(v);
        videoMap.set(v.id, v);
      }
    }
    const catIndex = categories.findIndex((c) => c.id === cat.id);
    if (catIndex >= 0) {
      const existing = categories[catIndex];
      if (existing) {
        existing.videoCount = folderVideoCount;
      }
    }
  }
  return { categories, folders, videos, videoMap };
}
async function ensureCache() {
  if (isCacheExpired() || !cachedResult) {
    cachedResult = await scan();
    cachedTimestamp = Date.now();
  }
  return cachedResult;
}
async function getVideoCategories() {
  const result = await ensureCache();
  return result.categories;
}
async function getFoldersByCategory(categoryId) {
  const result = await ensureCache();
  return result.folders.filter((f) => f.categoryId === categoryId);
}
async function getVideosByFolder(categoryId, folderName) {
  const result = await ensureCache();
  const normFolder = folderName === "Root" ? "" : folderName;
  return result.videos.filter((v) => v.categoryId === categoryId && (normFolder === "" || v.folderId === normFolder || v.folder === folderName || folderName === "General" && (!v.folder || v.folder === ".")));
}
async function getVideoById(id) {
  const result = await ensureCache();
  return result.videoMap.get(decodeURIComponent(id)) || null;
}
async function searchVideos(query) {
  const result = await ensureCache();
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return result.videos.filter((v) => {
    var _a, _b;
    const text = ((_b = (_a = v.title) != null ? _a : v.name) != null ? _b : "").toLowerCase();
    return text.includes(q);
  });
}
function invalidateVideoCache() {
  cachedTimestamp = 0;
  cachedResult = null;
}

const categories_get$2 = defineEventHandler(async () => {
  return await getVideoCategories();
});

const categories_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: categories_get$2
}, Symbol.toStringTag, { value: 'Module' }));

function listSharedFiles() {
  const uploadDir = serverConfig.uploadDir;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const files = [];
  try {
    const entries = fs.readdirSync(uploadDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const fullPath = path.join(uploadDir, entry.name);
        const stats = fs.statSync(fullPath);
        files.push({
          name: entry.name,
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
          modified: stats.mtime.toISOString()
        });
      }
    }
  } catch (err) {
    console.error("Error reading upload dir:", err);
  }
  files.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime());
  return files;
}
function getSharedFilePath(filename) {
  const safeFilename = path.basename(filename);
  const filePath = path.join(serverConfig.uploadDir, safeFilename);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  return null;
}
function deleteSharedFile(filename) {
  const filePath = getSharedFilePath(filename);
  if (!filePath) return false;
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (err) {
    console.error(`Failed to delete file ${filename}:`, err);
    return false;
  }
}

const _filename__get$6 = defineEventHandler((event) => {
  const filename = getRouterParam(event, "filename");
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: "Filename is required" });
  }
  const filePath = getSharedFilePath(filename);
  if (!filePath) {
    throw createError({ statusCode: 404, statusMessage: "File not found" });
  }
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);
  return sendStream(event, fs.createReadStream(filePath));
});

const _filename__get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _filename__get$6
}, Symbol.toStringTag, { value: 'Module' }));

const QUEUE_FILE = path.join(process.cwd(), "data", "downloader_queue.json");
const activeCancelTokens = /* @__PURE__ */ new Map();
let isProcessingQueue = false;
function ensureQueueFileExists() {
  const dir = path.dirname(QUEUE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(QUEUE_FILE)) {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify([], null, 2));
  }
}
function loadTasksFromFile() {
  ensureQueueFileExists();
  const map = /* @__PURE__ */ new Map();
  try {
    const raw = fs.readFileSync(QUEUE_FILE, "utf-8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      list.forEach((t) => {
        if (t.status === "downloading") t.status = "pending";
        map.set(t.id, t);
      });
    }
  } catch {
  }
  return map;
}
const tasksMap = loadTasksFromFile();
function saveTasksToFile() {
  ensureQueueFileExists();
  try {
    const list = Array.from(tasksMap.values());
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("Failed to save downloader queue to file:", err);
  }
}
function formatBytes$1(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
function getDownloadTasks() {
  return Array.from(tasksMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
function createDownloadTask(title, source, targetFolder = "uploads") {
  const id = Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64url");
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const task = {
    id,
    title,
    source,
    status: "pending",
    progress: 0,
    targetFolder,
    createdAt: now,
    updatedAt: now
  };
  tasksMap.set(id, task);
  saveTasksToFile();
  void processQueue();
  return task;
}
function cancelDownloadTask(id) {
  const task = tasksMap.get(id);
  if (!task) return false;
  const cancelToken = activeCancelTokens.get(id);
  if (cancelToken) {
    cancelToken.cancel("Download task cancelled by user");
    activeCancelTokens.delete(id);
  }
  task.status = "cancelled";
  task.speedFormatted = void 0;
  task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  tasksMap.set(id, task);
  saveTasksToFile();
  return true;
}
function deleteDownloadTask(id) {
  cancelDownloadTask(id);
  const deleted = tasksMap.delete(id);
  if (deleted) saveTasksToFile();
  return deleted;
}
async function processQueue() {
  if (isProcessingQueue) return;
  isProcessingQueue = true;
  try {
    const pendingTask = Array.from(tasksMap.values()).find((t) => t.status === "pending");
    if (!pendingTask) {
      isProcessingQueue = false;
      return;
    }
    await runSingleDownload(pendingTask);
  } catch (err) {
    console.error("[DownloaderEngine] Queue processing error:", err);
  } finally {
    isProcessingQueue = false;
    const nextPending = Array.from(tasksMap.values()).find((t) => t.status === "pending");
    if (nextPending) void processQueue();
  }
}
async function runSingleDownload(task) {
  var _a;
  if (task.source.type === "youtube") {
    return;
  }
  task.status = "downloading";
  task.progress = 0;
  task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  saveTasksToFile();
  const cancelSource = axios.CancelToken.source();
  activeCancelTokens.set(task.id, cancelSource);
  let destDir = serverConfig.uploadDir;
  if (task.targetFolder === "novels") {
    destDir = serverConfig.novel.dir;
  } else if (task.targetFolder === "video" || task.targetFolder === "youtube" || task.targetFolder === "anime") {
    const catFound = serverConfig.video.categories.find((c) => c.id === task.targetFolder);
    destDir = (catFound == null ? void 0 : catFound.path) || ((_a = serverConfig.video.categories[0]) == null ? void 0 : _a.path) || serverConfig.uploadDir;
  }
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const rawUrl = task.source.url;
  let filename = path.basename(new URL(rawUrl).pathname);
  if (!filename || filename === "/" || !filename.includes(".")) {
    const ext = task.source.type === "video" ? ".mp4" : task.source.type === "novel" ? ".epub" : ".bin";
    filename = `${task.title.replace(/[^a-zA-Z0-9_-]/g, "_")}${ext}`;
  }
  const destPath = path.join(destDir, filename);
  try {
    const response = await axios({
      method: "GET",
      url: task.source.url,
      responseType: "stream",
      cancelToken: cancelSource.token,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 6e4
    });
    const rawLen = response.headers["content-length"];
    const totalBytes = parseInt(String(rawLen || "0"), 10);
    task.totalBytes = totalBytes > 0 ? totalBytes : void 0;
    let downloadedBytes = 0;
    let lastTime = Date.now();
    let lastBytes = 0;
    const writer = fs.createWriteStream(destPath);
    response.data.on("data", (chunk) => {
      downloadedBytes += chunk.length;
      task.downloadedBytes = downloadedBytes;
      if (totalBytes > 0) {
        task.progress = Math.min(100, Math.round(downloadedBytes / totalBytes * 100));
      }
      const now = Date.now();
      const timeDiff = (now - lastTime) / 1e3;
      if (timeDiff >= 0.5) {
        const bytesDiff = downloadedBytes - lastBytes;
        const bytesPerSec = bytesDiff / timeDiff;
        task.speedFormatted = `${formatBytes$1(bytesPerSec)}`;
        lastTime = now;
        lastBytes = downloadedBytes;
        saveTasksToFile();
      }
    });
    await new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(true));
      writer.on("error", (err) => reject(err));
      response.data.on("error", (err) => reject(err));
    });
    task.status = "completed";
    task.progress = 100;
    task.speedFormatted = void 0;
    task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    activeCancelTokens.delete(task.id);
    saveTasksToFile();
  } catch (err) {
    activeCancelTokens.delete(task.id);
    if (axios.isCancel(err)) {
      task.status = "cancelled";
    } else {
      task.status = "failed";
      task.error = (err == null ? void 0 : err.message) || "Download failed";
    }
    task.speedFormatted = void 0;
    task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    saveTasksToFile();
    if (fs.existsSync(destPath)) {
      try {
        fs.unlinkSync(destPath);
      } catch {
      }
    }
  }
}

const tasks_get = defineEventHandler(() => {
  const tasks = getDownloadTasks();
  return { success: true, data: tasks };
});

const tasks_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: tasks_get
}, Symbol.toStringTag, { value: 'Module' }));

const tasks_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { title, source, targetFolder } = body || {};
  if (!title || !source || !source.url) {
    throw createError({ statusCode: 400, statusMessage: "Title and valid source URL are required" });
  }
  const task = createDownloadTask(title, source, targetFolder || "uploads");
  setResponseStatus(event, 201);
  return { success: true, data: task };
});

const tasks_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: tasks_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$4 = defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Task ID is required" });
  }
  const success = deleteDownloadTask(id);
  if (success) {
    return { success: true, message: "Task deleted" };
  } else {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const cancel_post = defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Task ID is required" });
  }
  const success = cancelDownloadTask(id);
  if (success) {
    return { success: true, message: "Task cancelled" };
  } else {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }
});

const cancel_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: cancel_post
}, Symbol.toStringTag, { value: 'Module' }));

const STORE_MAP = {
  "1": "Steam",
  "25": "Epic Games Store",
  "11": "Ubisoft Store",
  "7": "GOG.com",
  "15": "Fanatical",
  "2": "GamersGate",
  "3": "GreenManGaming",
  "8": "EA Origin"
};
let cachedDeals = [];
let lastDealsFetchTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1e3;
async function fetchAllGameDeals(options) {
  const now = Date.now();
  if (!options.title && !options.storeID && cachedDeals.length > 0 && now - lastDealsFetchTime < CACHE_TTL_MS) {
    return filterAndSortDeals(cachedDeals, options);
  }
  if (options.storeID === "eneba") {
    return await fetchEnebaDeals(options.title);
  }
  try {
    const params = {
      pageSize: 60,
      onSale: options.onSaleOnly !== false ? 1 : 0
    };
    if (options.storeID && options.storeID !== "all") {
      params.storeID = options.storeID;
    }
    if (options.title) {
      params.title = options.title;
    }
    if (options.sortBy) {
      const s = options.sortBy.toLowerCase();
      if (s === "price") params.sortBy = "Price";
      else if (s === "title") params.sortBy = "Title";
      else if (s === "metacritic") params.sortBy = "Metacritic";
      else if (s === "reviews") params.sortBy = "Reviews";
      else params.sortBy = "Savings";
    } else {
      params.sortBy = "Savings";
    }
    const res = await axios.get("https://www.cheapshark.com/api/1.0/deals", {
      params,
      timeout: 1e4,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    let deals = [];
    if (Array.isArray(res.data)) {
      deals = res.data.map((item) => {
        var _a;
        const savingsNum = Math.round(parseFloat(item.savings || "0"));
        const isFree = parseFloat(item.salePrice) === 0 || savingsNum === 100;
        const cheapVal = ((_a = item.cheapestPriceEver) == null ? void 0 : _a.price) || item.cheapestPrice;
        const isAtl = isFree || cheapVal && parseFloat(item.salePrice) <= parseFloat(cheapVal) || savingsNum >= 75;
        return {
          id: item.dealID || `deal_${Math.random()}`,
          title: item.title,
          dealID: item.dealID,
          storeID: item.storeID,
          storeName: STORE_MAP[item.storeID] || `Store #${item.storeID}`,
          gameID: item.gameID,
          salePrice: parseFloat(item.salePrice) === 0 ? "GRATIS" : `$${item.salePrice}`,
          normalPrice: `$${item.normalPrice}`,
          savings: `${savingsNum}%`,
          savingsPercent: savingsNum,
          metacriticScore: item.metacriticScore !== "0" ? item.metacriticScore : void 0,
          steamRatingText: item.steamRatingText !== "0" ? item.steamRatingText : void 0,
          steamRatingPercent: item.steamRatingPercent !== "0" ? `${item.steamRatingPercent}%` : void 0,
          thumb: item.thumb || "https://via.placeholder.com/120x45",
          dealLink: `https://www.cheapshark.com/redirect?dealID=${item.dealID}`,
          isFreebie: isFree,
          cheapestPriceEver: cheapVal ? `$${cheapVal}` : void 0,
          isAllTimeLow: isAtl
        };
      });
    }
    if (!options.storeID || options.storeID === "all") {
      const enebaDeals = await fetchEnebaDeals(options.title);
      deals = [...enebaDeals, ...deals];
    }
    if (!options.title && (!options.storeID || options.storeID === "all")) {
      cachedDeals = deals;
      lastDealsFetchTime = now;
    }
    return filterAndSortDeals(deals, options);
  } catch (err) {
    console.error("[GameDeals Error] Failed to fetch CheapShark deals:", err.message);
    return cachedDeals.length > 0 ? filterAndSortDeals(cachedDeals, options) : [];
  }
}
async function fetchEnebaDeals(titleQuery = "") {
  try {
    const deals = [];
    const enebaFeatured = [
      { title: "Cyberpunk 2077: Phantom Liberty (Global Steam Key)", salePrice: "$24.99", normalPrice: "$39.99", savings: "38%", thumb: "https://images.eneba.com/resize_380x340/v1/content/products/VlQ5T3dIcFZoc0M1WnJybG1WOUtSZz09/Cyberpunk_2077_Phantom_Liberty.jpg", dealLink: "https://www.eneba.com/steam-cyberpunk-2077-phantom-liberty-dlc-pc-steam-key-global" },
      { title: "Grand Theft Auto V: Premium Edition (PC Key)", salePrice: "$11.49", normalPrice: "$29.99", savings: "62%", thumb: "https://images.eneba.com/resize_380x340/v1/content/products/7o99s02r051515.jpg", dealLink: "https://www.eneba.com/rockstar_games_launcher-grand-theft-auto-v-premium-online-edition-rockstar-games-launcher-key-global" },
      { title: "Elden Ring (Steam Key Global)", salePrice: "$34.50", normalPrice: "$59.99", savings: "42%", thumb: "https://images.eneba.com/resize_380x340/v1/content/products/fN37213824.jpg", dealLink: "https://www.eneba.com/steam-elden-ring-pc-steam-key-global" },
      { title: "Red Dead Redemption 2 (PC Global)", salePrice: "$17.99", normalPrice: "$59.99", savings: "70%", thumb: "https://images.eneba.com/resize_380x340/v1/content/products/123145612.jpg", dealLink: "https://www.eneba.com/rockstar_games_launcher-red-dead-redemption-2-rockstar-games-launcher-key-global" },
      { title: "Minecraft: Java & Bedrock Edition (PC)", salePrice: "$18.90", normalPrice: "$29.99", savings: "37%", thumb: "https://images.eneba.com/resize_380x340/v1/content/products/minecraft.jpg", dealLink: "https://www.eneba.com/microsoft_store-minecraft-java-bedrock-edition-pc-official-website-key-global" },
      { title: "EA SPORTS FC 24 (PC EA App Key)", salePrice: "$19.99", normalPrice: "$69.99", savings: "71%", thumb: "https://images.eneba.com/resize_380x340/v1/content/products/FC24.jpg", dealLink: "https://www.eneba.com/origin-ea-sports-fc-24-ea-app-key-global" }
    ];
    enebaFeatured.forEach((item, idx) => {
      if (!titleQuery || item.title.toLowerCase().includes(titleQuery.toLowerCase())) {
        deals.push({
          id: `eneba_${idx}`,
          title: item.title,
          dealID: `eneba_${idx}`,
          storeID: "eneba",
          storeName: "Eneba Marketplace",
          gameID: `eneba_${idx}`,
          salePrice: item.salePrice,
          normalPrice: item.normalPrice,
          savings: item.savings,
          savingsPercent: parseInt(item.savings, 10) || 40,
          thumb: item.thumb,
          dealLink: item.dealLink,
          isFreebie: false
        });
      }
    });
    return deals;
  } catch (err) {
    console.error("[Eneba Deals Error]:", err.message);
    return [];
  }
}
async function fetchEpicFreebies() {
  var _a, _b, _c, _d;
  try {
    const res = await axios.get("https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=en-US&country=US&allowCountries=US", {
      timeout: 8e3
    });
    const elements = ((_d = (_c = (_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.Catalog) == null ? void 0 : _c.searchStore) == null ? void 0 : _d.elements) || [];
    const freebies = [];
    elements.forEach((item) => {
      var _a2, _b2, _c2, _d2, _e, _f, _g, _h, _i, _j, _k, _l;
      const isCurrentlyFree = (_b2 = (_a2 = item.promotions) == null ? void 0 : _a2.promotionalOffers) == null ? void 0 : _b2.some(
        (offerGroup) => {
          var _a3;
          return (_a3 = offerGroup.promotionalOffers) == null ? void 0 : _a3.some((off) => {
            var _a4;
            return ((_a4 = off.discountSetting) == null ? void 0 : _a4.discountPercentage) === 0;
          });
        }
      );
      if (isCurrentlyFree || ((_d2 = (_c2 = item.price) == null ? void 0 : _c2.totalPrice) == null ? void 0 : _d2.discountPrice) === 0) {
        let image = (_f = (_e = item.keyImages) == null ? void 0 : _e.find((img) => img.type === "OfferImageWide" || img.type === "Thumbnail")) == null ? void 0 : _f.url;
        if (!image && ((_g = item.keyImages) == null ? void 0 : _g.length) > 0) image = item.keyImages[0].url;
        freebies.push({
          id: `epic_free_${item.id}`,
          title: item.title,
          dealID: item.id,
          storeID: "25",
          storeName: "Epic Games Store",
          gameID: item.id,
          salePrice: "GRATIS (100% OFF)",
          normalPrice: ((_i = (_h = item.price) == null ? void 0 : _h.totalPrice) == null ? void 0 : _i.originalPrice) ? `$${(item.price.totalPrice.originalPrice / 100).toFixed(2)}` : "GRATIS",
          savings: "100%",
          savingsPercent: 100,
          thumb: image || "https://via.placeholder.com/300x160",
          dealLink: `https://store.epicgames.com/p/${((_l = (_k = (_j = item.catalogNs) == null ? void 0 : _j.mappings) == null ? void 0 : _k[0]) == null ? void 0 : _l.pageSlug) || item.productSlug || item.urlSlug || ""}`,
          isFreebie: true
        });
      }
    });
    return freebies;
  } catch (err) {
    console.error("[Epic Freebies Error]:", err.message);
    return [];
  }
}
function filterAndSortDeals(deals, options) {
  let filtered = [...deals];
  if (options.storeID && options.storeID !== "all") {
    filtered = filtered.filter((d) => d.storeID === options.storeID);
  }
  if (options.lowerPrice !== void 0) {
    filtered = filtered.filter((d) => d.savingsPercent >= options.lowerPrice);
  }
  if (options.sortBy === "savings") {
    filtered.sort((a, b) => b.savingsPercent - a.savingsPercent);
  } else if (options.sortBy === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }
  return filtered;
}

const deals_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const storeID = query.storeID || "all";
  const title = query.title || "";
  const sortBy = query.sortBy || "Savings";
  const minDiscount = query.minDiscount ? parseInt(query.minDiscount, 10) : 0;
  try {
    const deals = await fetchAllGameDeals({
      storeID,
      title,
      sortBy,
      lowerPrice: minDiscount
    });
    return {
      success: true,
      data: deals
    };
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});

const deals_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: deals_get
}, Symbol.toStringTag, { value: 'Module' }));

const freebies_get = defineEventHandler(async () => {
  try {
    const epicFreebies = await fetchEpicFreebies();
    const cheapSharkDeals = await fetchAllGameDeals({ onSaleOnly: true });
    const cheapSharkFreebies = cheapSharkDeals.filter((d) => d.isFreebie);
    const combined = [...epicFreebies];
    cheapSharkFreebies.forEach((csItem) => {
      if (!combined.some((item) => item.title.toLowerCase() === csItem.title.toLowerCase())) {
        combined.push(csItem);
      }
    });
    return {
      success: true,
      data: combined
    };
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});

const freebies_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: freebies_get
}, Symbol.toStringTag, { value: 'Module' }));

const lookup_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const dealID = query.dealID;
  if (!dealID) {
    throw createError({ statusCode: 400, statusMessage: "Parameter dealID diperlukan." });
  }
  try {
    const res = await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`, {
      timeout: 8e3
    });
    return {
      success: true,
      data: res.data
    };
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});

const lookup_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: lookup_get
}, Symbol.toStringTag, { value: 'Module' }));

const stores_get = defineEventHandler(async () => {
  const stores = [
    { storeID: "all", storeName: "Semua Store", icon: "\u{1F6D2}" },
    { storeID: "1", storeName: "Steam Store", icon: "\u{1F3AE}" },
    { storeID: "25", storeName: "Epic Games Store", icon: "\u26A1" },
    { storeID: "11", storeName: "Ubisoft Store", icon: "\u{1F6E1}\uFE0F" },
    { storeID: "eneba", storeName: "Eneba Marketplace", icon: "\u{1F6CD}\uFE0F" },
    { storeID: "7", storeName: "GOG.com", icon: "\u{1F4DC}" },
    { storeID: "15", storeName: "Fanatical / Microsoft", icon: "\u{1F7E9}" },
    { storeID: "3", storeName: "GreenManGaming", icon: "\u{1F7E2}" },
    { storeID: "8", storeName: "EA Origin", icon: "\u{1F534}" }
  ];
  return {
    success: true,
    data: stores
  };
});

const stores_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: stores_get
}, Symbol.toStringTag, { value: 'Module' }));

const DATA_DIR = path.join(process.cwd(), "server", "data");
const ACCOUNTS_FILE = path.join(DATA_DIR, "gdrive_accounts.json");
const FILES_FILE = path.join(DATA_DIR, "gdrive_pooled_files.json");
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}
function loadAccounts() {
  ensureDataDir();
  if (!fs.existsSync(ACCOUNTS_FILE)) return [];
  try {
    const raw = fs.readFileSync(ACCOUNTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveAccounts(accounts) {
  ensureDataDir();
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), "utf-8");
}
function loadPooledFiles() {
  ensureDataDir();
  if (!fs.existsSync(FILES_FILE)) return [];
  try {
    const raw = fs.readFileSync(FILES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function savePooledFiles(files) {
  ensureDataDir();
  fs.writeFileSync(FILES_FILE, JSON.stringify(files, null, 2), "utf-8");
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
async function getAccessToken(account) {
  var _a, _b;
  try {
    const res = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: account.clientId,
      client_secret: account.clientSecret,
      refresh_token: account.refreshToken,
      grant_type: "refresh_token"
    });
    if (res.data && res.data.access_token) {
      return res.data.access_token;
    }
    throw new Error("No access_token returned in Google OAuth response");
  } catch (err) {
    const msg = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error_description) || err.message;
    throw new Error(`Gagal mendapatkan token akses Google Drive (${account.email}): ${msg}`);
  }
}
async function fetchAccountQuota(account) {
  var _a, _b, _c;
  const token = await getAccessToken(account);
  const res = await axios.get("https://www.googleapis.com/drive/v3/about?fields=user,storageQuota", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const userEmail = ((_b = (_a = res.data) == null ? void 0 : _a.user) == null ? void 0 : _b.emailAddress) || account.email;
  const quota = ((_c = res.data) == null ? void 0 : _c.storageQuota) || {};
  const total = parseInt(quota.limit || String(15 * 1024 * 1024 * 1024), 10);
  const used = parseInt(quota.usage || "0", 10);
  return { total, used, email: userEmail };
}
async function syncAllAccountsQuota() {
  const accounts = loadAccounts();
  for (const acc of accounts) {
    try {
      const q = await fetchAccountQuota(acc);
      acc.quotaBytesTotal = q.total;
      acc.quotaBytesUsed = q.used;
      if (q.email) acc.email = q.email;
      acc.status = q.used >= q.total - 100 * 1024 * 1024 ? "full" : "active";
    } catch (e) {
      console.error(`[GDrive Quota Error] Account ${acc.name}:`, e.message);
      acc.status = "error";
    }
  }
  saveAccounts(accounts);
  return accounts;
}
async function selectAccountForUpload(fileSizeBytes) {
  const accounts = await syncAllAccountsQuota();
  const activeAccounts = accounts.filter((a) => a.status === "active");
  if (activeAccounts.length === 0) {
    throw new Error("Tidak ada akun Google Drive aktif yang tersedia di storage pool. Harap tambahkan akun baru!");
  }
  for (const acc of activeAccounts) {
    const remaining = acc.quotaBytesTotal - acc.quotaBytesUsed;
    if (remaining > fileSizeBytes + 10 * 1024 * 1024) {
      const token = await getAccessToken(acc);
      return { account: acc, accessToken: token };
    } else {
      acc.status = "full";
    }
  }
  saveAccounts(accounts);
  throw new Error(`Seluruh akun Google Drive di storage pool sudah penuh untuk mengunggah berkas sebesar ${formatBytes(fileSizeBytes)}. Harap tambahkan akun Google Drive baru!`);
}
async function uploadFileToGDrive(account, token, fileName, mimeType, buffer) {
  const metadata = {
    name: fileName,
    mimeType: mimeType
  };
  const boundary = "-------314159265358979323846";
  const delimiter = `\r
--${boundary}\r
`;
  const closeDelimiter = `\r
--${boundary}--`;
  let multipartRequestBody = delimiter + "Content-Type: application/json; charset=UTF-8\r\n\r\n" + JSON.stringify(metadata) + delimiter + `Content-Type: ${mimeType}\r
\r
`;
  const payload = Buffer.concat([
    Buffer.from(multipartRequestBody, "utf-8"),
    buffer,
    Buffer.from(closeDelimiter, "utf-8")
  ]);
  const res = await axios.post("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink", payload, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
      "Content-Length": payload.length
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity
  });
  if (res.data && res.data.id) {
    return { fileId: res.data.id, webViewLink: res.data.webViewLink };
  }
  throw new Error("Google Drive API tidak mengembalikan ID berkas setelah upload.");
}
async function deleteFileFromGDrive(account, gdriveFileId) {
  try {
    const token = await getAccessToken(account);
    await axios.delete(`https://www.googleapis.com/drive/v3/files/${gdriveFileId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (err) {
    console.error(`[GDrive Delete Error] File ${gdriveFileId}:`, err.message);
    return false;
  }
}

const accounts_get = defineEventHandler(async () => {
  try {
    const accounts = await syncAllAccountsQuota();
    const totalBytes = accounts.reduce((acc, a) => acc + a.quotaBytesTotal, 0);
    const usedBytes = accounts.reduce((acc, a) => acc + a.quotaBytesUsed, 0);
    const freeBytes = Math.max(0, totalBytes - usedBytes);
    return {
      success: true,
      data: {
        accounts,
        totalBytes,
        usedBytes,
        freeBytes,
        totalBytesFormatted: formatBytes(totalBytes),
        usedBytesFormatted: formatBytes(usedBytes),
        freeBytesFormatted: formatBytes(freeBytes)
      }
    };
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});

const accounts_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: accounts_get
}, Symbol.toStringTag, { value: 'Module' }));

const accounts_post = defineEventHandler(async (event) => {
  const body = await readBody(event) || {};
  const { name, clientId, clientSecret, refreshToken } = body;
  if (!clientId || !clientSecret || !refreshToken) {
    throw createError({ statusCode: 400, statusMessage: "Harap isi Client ID, Client Secret, dan Refresh Token Google Drive." });
  }
  const accounts = loadAccounts();
  const accountId = `gdrive_acc_${Date.now()}`;
  const newAccount = {
    id: accountId,
    name: name || `Google Drive Account ${accounts.length + 1}`,
    email: name || "Google Account",
    clientId,
    clientSecret,
    refreshToken,
    quotaBytesTotal: 15 * 1024 * 1024 * 1024,
    quotaBytesUsed: 0,
    status: "active",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  try {
    const q = await fetchAccountQuota(newAccount);
    newAccount.quotaBytesTotal = q.total;
    newAccount.quotaBytesUsed = q.used;
    if (q.email) newAccount.email = q.email;
    newAccount.status = q.used >= q.total - 100 * 1024 * 1024 ? "full" : "active";
    accounts.push(newAccount);
    saveAccounts(accounts);
    return {
      success: true,
      message: `Akun Google Drive (${newAccount.email}) berhasil ditambahkan ke storage pool!`,
      data: newAccount
    };
  } catch (err) {
    throw createError({ statusCode: 400, statusMessage: `Kredensial Google Drive tidak valid: ${err.message}` });
  }
});

const accounts_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: accounts_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$2 = defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "id") || "";
  const accounts = loadAccounts();
  const filtered = accounts.filter((a) => a.id !== accountId);
  if (filtered.length === accounts.length) {
    throw createError({ statusCode: 404, statusMessage: "Akun Google Drive tidak ditemukan di storage pool." });
  }
  saveAccounts(filtered);
  return {
    success: true,
    message: "Akun Google Drive telah dihapus dari storage pool."
  };
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const files_get = defineEventHandler(async () => {
  const files = loadPooledFiles();
  return {
    success: true,
    data: files
  };
});

const files_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: files_get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, "id") || "";
  const files = loadPooledFiles();
  const fileItem = files.find((f) => f.id === fileId);
  if (!fileItem) {
    throw createError({ statusCode: 404, statusMessage: "Berkas tidak ditemukan di Storage Pool." });
  }
  const accounts = loadAccounts();
  const account = accounts.find((a) => a.id === fileItem.gdriveAccountId);
  if (account) {
    await deleteFileFromGDrive(account, fileItem.gdriveFileId);
  }
  const updatedFiles = files.filter((f) => f.id !== fileId);
  savePooledFiles(updatedFiles);
  await syncAllAccountsQuota();
  return {
    success: true,
    message: `Berkas "${fileItem.name}" berhasil dihapus dari Google Drive & Storage Pool.`
  };
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$6 = defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, "id") || "";
  const files = loadPooledFiles();
  const fileItem = files.find((f) => f.id === fileId);
  if (!fileItem) {
    throw createError({ statusCode: 404, statusMessage: "Berkas tidak ditemukan di Storage Pool." });
  }
  const accounts = loadAccounts();
  const account = accounts.find((a) => a.id === fileItem.gdriveAccountId);
  if (!account) {
    throw createError({ statusCode: 404, statusMessage: "Akun Google Drive penyimpan berkas ini tidak ditemukan." });
  }
  try {
    const token = await getAccessToken(account);
    const rangeHeader = getHeader(event, "range");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    if (rangeHeader) {
      headers.Range = rangeHeader;
    }
    const gdriveRes = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileItem.gdriveFileId}?alt=media`, {
      headers,
      responseType: "stream",
      validateStatus: () => true
    });
    setResponseStatus(event, gdriveRes.status);
    const contentType = String(gdriveRes.headers["content-type"] || fileItem.mimeType || "application/octet-stream");
    setResponseHeader(event, "Content-Type", contentType);
    if (gdriveRes.headers["content-length"]) {
      setResponseHeader(event, "Content-Length", Number(gdriveRes.headers["content-length"]));
    }
    if (gdriveRes.headers["content-range"]) {
      setResponseHeader(event, "Content-Range", String(gdriveRes.headers["content-range"]));
    }
    setResponseHeader(event, "Accept-Ranges", "bytes");
    setResponseHeader(event, "Content-Disposition", `inline; filename="${encodeURIComponent(fileItem.name)}"`);
    return sendStream(event, gdriveRes.data);
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: `Gagal melakukan streaming dari Google Drive: ${err.message}` });
  }
});

const _id__get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$6
}, Symbol.toStringTag, { value: 'Module' }));

const upload_post$4 = defineEventHandler(async (event) => {
  try {
    const parts = await readMultipartFormData(event);
    if (!parts || parts.length === 0) {
      throw createError({ statusCode: 400, statusMessage: "Tidak ada berkas yang dikirim untuk diunggah." });
    }
    const uploadedItems = [];
    const pooledFiles = loadPooledFiles();
    for (const part of parts) {
      if (part.name === "file" && part.filename && part.data) {
        const fileName = part.filename;
        const mimeType = part.type || "application/octet-stream";
        const buffer = part.data;
        const size = buffer.length;
        const { account, accessToken } = await selectAccountForUpload(size);
        const gdriveRes = await uploadFileToGDrive(account, accessToken, fileName, mimeType, buffer);
        const fileItem = {
          id: `pool_file_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          name: fileName,
          size,
          sizeFormatted: formatBytes(size),
          mimeType,
          gdriveAccountId: account.id,
          gdriveAccountEmail: account.email,
          gdriveFileId: gdriveRes.fileId,
          uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        pooledFiles.unshift(fileItem);
        uploadedItems.push(fileItem);
        account.quotaBytesUsed += size;
      }
    }
    savePooledFiles(pooledFiles);
    await syncAllAccountsQuota();
    return {
      success: true,
      message: `Berhasil mengunggah ${uploadedItems.length} berkas ke Storage Pool Google Drive!`,
      data: uploadedItems
    };
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});

const upload_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: upload_post$4
}, Symbol.toStringTag, { value: 'Module' }));

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let fallbackIp = "localhost";
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (!iface) continue;
    for (const addr of iface) {
      if (addr.family === "IPv4" && !addr.internal) {
        if (addr.address.startsWith("192.168.") || addr.address.startsWith("10.") || !fallbackIp) {
          return addr.address;
        }
        fallbackIp = addr.address;
      }
    }
  }
  return fallbackIp;
}

const info_get = defineEventHandler(() => {
  const ip = getLocalIP();
  return {
    success: true,
    ip,
    status: "online"
  };
});

const info_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: info_get
}, Symbol.toStringTag, { value: 'Module' }));

function getMangaDir() {
  const dir = serverConfig.manga.dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}
function listLocalManga() {
  const mangaDir = getMangaDir();
  if (!fs.existsSync(mangaDir)) return [];
  const entries = fs.readdirSync(mangaDir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const item = getLocalMangaDetail(slug);
    if (item) {
      result.push(item);
    }
  }
  return result.sort((a, b) => a.title.localeCompare(b.title));
}
function getLocalMangaDetail(slug) {
  const mangaDir = getMangaDir();
  const targetDir = path.join(mangaDir, slug);
  if (!fs.existsSync(targetDir)) return null;
  let title = slug.replace(/_/g, " ").replace(/-/g, " ");
  let author;
  let description;
  let cover;
  let tags = [];
  const metaPath = path.join(targetDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      title = meta.title || title;
      author = meta.author;
      description = meta.description;
      tags = meta.tags || [];
      if (meta.cover) cover = meta.cover;
    } catch {
    }
  }
  if (!cover) {
    const rootFiles = fs.readdirSync(targetDir);
    const coverFile = rootFiles.find((f) => {
      const l = f.toLowerCase();
      return (l.includes("cover") || l.endsWith(".jpg") || l.endsWith(".png") || l.endsWith(".webp")) && !fs.statSync(path.join(targetDir, f)).isDirectory();
    });
    if (coverFile) {
      cover = `/_manga/${slug}/${coverFile}`;
    }
  }
  const chapters = getLocalMangaChapters(slug);
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    cover,
    tags,
    chapterCount: chapters.length,
    chapters
  };
}
function getLocalMangaChapters(slug) {
  const mangaDir = getMangaDir();
  const targetDir = path.join(mangaDir, slug);
  if (!fs.existsSync(targetDir)) return [];
  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  const chapterFolders = entries.filter((e) => e.isDirectory()).sort((a, b) => {
    const numA = parseFloat(a.name.replace(/\D/g, "") || "0");
    const numB = parseFloat(b.name.replace(/\D/g, "") || "0");
    return numA - numB;
  });
  return chapterFolders.map((c, idx) => {
    const chapterPath = path.join(targetDir, c.name);
    const files = fs.readdirSync(chapterPath).filter((f) => {
      const l = f.toLowerCase();
      return l.endsWith(".jpg") || l.endsWith(".jpeg") || l.endsWith(".png") || l.endsWith(".webp");
    });
    const chapterNum = parseFloat(c.name.replace(/\D/g, "") || String(idx + 1));
    return {
      id: c.name,
      title: c.name.replace(/_/g, " ").replace(/-/g, " "),
      file: c.name,
      chapterNumber: chapterNum,
      pageCount: files.length
    };
  });
}
function getMangaChapterPages(slug, chapter) {
  const mangaDir = getMangaDir();
  const chapterDir = path.join(mangaDir, slug, chapter);
  if (!fs.existsSync(chapterDir)) return [];
  const files = fs.readdirSync(chapterDir).filter((f) => {
    const l = f.toLowerCase();
    return l.endsWith(".jpg") || l.endsWith(".jpeg") || l.endsWith(".png") || l.endsWith(".webp");
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  return files.map((f) => `/_manga/${encodeURIComponent(slug)}/${encodeURIComponent(chapter)}/${encodeURIComponent(f)}`);
}

const _slug__get$6 = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "slug is required" });
  }
  const manga = getLocalMangaDetail(slug);
  if (!manga) {
    throw createError({ statusCode: 404, statusMessage: "Manga not found" });
  }
  return {
    success: true,
    data: manga
  };
});

const _slug__get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _slug__get$6
}, Symbol.toStringTag, { value: 'Module' }));

const _chapter__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const chapter = getRouterParam(event, "chapter");
  if (!slug || !chapter) {
    throw createError({ statusCode: 400, statusMessage: "slug and chapter parameters are required" });
  }
  const pages = getMangaChapterPages(slug, chapter);
  return {
    success: true,
    data: pages
  };
});

const _chapter__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _chapter__get
}, Symbol.toStringTag, { value: 'Module' }));

const export_get$2 = defineEventHandler(async (event) => {
  var _a;
  const slug = getRouterParam(event, "slug");
  const chapter = getRouterParam(event, "chapter");
  const query = getQuery$1(event);
  const format = ((_a = query.format) == null ? void 0 : _a.toLowerCase()) === "zip" ? "zip" : "cbz";
  if (!slug || !chapter) {
    throw createError({ statusCode: 400, statusMessage: "Slug dan Chapter manga wajib diisi" });
  }
  const mangaDir = getMangaDir();
  const chapterDir = path.join(mangaDir, slug, chapter);
  if (!fs.existsSync(chapterDir)) {
    throw createError({ statusCode: 404, statusMessage: "Folder chapter manga tidak ditemukan" });
  }
  const files = fs.readdirSync(chapterDir).filter((f) => {
    const l = f.toLowerCase();
    return l.endsWith(".jpg") || l.endsWith(".jpeg") || l.endsWith(".png") || l.endsWith(".webp") || l.endsWith(".gif");
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  if (files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Tidak ada gambar halaman dalam chapter ini" });
  }
  const zip = new AdmZip();
  for (const file of files) {
    const filePath = path.join(chapterDir, file);
    zip.addLocalFile(filePath);
  }
  const buffer = zip.toBuffer();
  const safeFilename = `${slug}_${chapter}.${format}`;
  setHeader(event, "Content-Type", format === "zip" ? "application/zip" : "application/vnd.comicbook+zip");
  setHeader(event, "Content-Disposition", `attachment; filename="${encodeURIComponent(safeFilename)}"`);
  setHeader(event, "Content-Length", buffer.length);
  return buffer;
});

const export_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: export_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const chapters_get$4 = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "slug is required" });
  }
  const chapters = getLocalMangaChapters(slug);
  return {
    success: true,
    data: chapters
  };
});

const chapters_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: chapters_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const library_get$4 = defineEventHandler(async () => {
  const mangaList = listLocalManga();
  return {
    success: true,
    data: mangaList
  };
});

const library_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: library_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const coverCache = /* @__PURE__ */ new Map();
const cover_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const id = typeof query.id === "string" ? query.id : "";
  const file = typeof query.file === "string" ? query.file : "";
  if (!id || !file) {
    throw createError({ statusCode: 400, statusMessage: "Manga ID and Cover file required" });
  }
  const cacheKey = `${id}_${file}`;
  const now = Date.now();
  if (coverCache.has(cacheKey)) {
    const cached = coverCache.get(cacheKey);
    if (cached.expiry > now) {
      setHeader(event, "Content-Type", cached.contentType);
      setHeader(event, "Cache-Control", "public, max-age=604800, immutable");
      return cached.data;
    }
  }
  try {
    const targetUrl = `https://uploads.mangadex.org/covers/${id}/${file}.256.jpg`;
    const res = await axios.get(targetUrl, {
      responseType: "arraybuffer",
      timeout: 8e3,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });
    const buffer = Buffer.from(res.data);
    const rawType = res.headers["content-type"];
    const contentType = typeof rawType === "string" ? rawType : "image/jpeg";
    coverCache.set(cacheKey, {
      data: buffer,
      contentType,
      expiry: now + 3600 * 1e3
    });
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, max-age=604800, immutable");
    return buffer;
  } catch (err) {
    try {
      const fallbackUrl = `https://uploads.mangadex.org/covers/${id}/${file}`;
      const res = await axios.get(fallbackUrl, {
        responseType: "arraybuffer",
        timeout: 8e3,
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
      });
      const buffer = Buffer.from(res.data);
      const rawType = res.headers["content-type"];
      const contentType = typeof rawType === "string" ? rawType : "image/jpeg";
      setHeader(event, "Content-Type", contentType);
      setHeader(event, "Cache-Control", "public, max-age=604800, immutable");
      return buffer;
    } catch {
      throw createError({ statusCode: 404, statusMessage: "Cover image not found" });
    }
  }
});

const cover_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: cover_get
}, Symbol.toStringTag, { value: 'Module' }));

const searchCache = /* @__PURE__ */ new Map();
const detailCache = /* @__PURE__ */ new Map();
const CACHE_TTL = 15 * 60 * 1e3;
const DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "id,en-US;q=0.9,en;q=0.8"
};
async function searchMangaDex(query, lang = "id") {
  var _a;
  const cacheKey = `mangadex_${query.trim().toLowerCase()}_${lang}`;
  const now = Date.now();
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey);
    if (cached.expiry > now) return cached.data;
  }
  try {
    const params = {
      limit: 24,
      "includes[]": ["cover_art", "author"],
      "contentRating[]": ["safe", "suggestive", "erotica"]
    };
    if (query && query.trim()) {
      params.title = query.trim();
      params["order[relevance]"] = "desc";
    } else {
      params["order[followedCount]"] = "desc";
    }
    if (lang && lang !== "all") {
      params["availableTranslatedLanguage[]"] = [lang];
    }
    const res = await axios.get("https://api.mangadex.org/manga", {
      params,
      timeout: 1e4,
      headers: { "User-Agent": "NexEo-LocalApp/1.0" }
    });
    const data = ((_a = res.data) == null ? void 0 : _a.data) || [];
    const results = data.map((item) => {
      var _a2, _b;
      const attrs = item.attributes || {};
      const titleObj = attrs.title || {};
      const title = titleObj[lang] || titleObj["en"] || titleObj["ja-ro"] || Object.values(titleObj)[0] || "Unknown Title";
      const descObj = attrs.description || {};
      const description = descObj[lang] || descObj["en"] || Object.values(descObj)[0] || "";
      let coverFile = "";
      let author = "Unknown";
      if (Array.isArray(item.relationships)) {
        for (const rel of item.relationships) {
          if (rel.type === "cover_art" && ((_a2 = rel.attributes) == null ? void 0 : _a2.fileName)) {
            coverFile = rel.attributes.fileName;
          }
          if (rel.type === "author" && ((_b = rel.attributes) == null ? void 0 : _b.name)) {
            author = rel.attributes.name;
          }
        }
      }
      const cover = coverFile ? `/api/manga/online/cover?id=${item.id}&file=${encodeURIComponent(coverFile)}` : null;
      const tags = (attrs.tags || []).map((t) => {
        var _a3, _b2;
        return ((_b2 = (_a3 = t.attributes) == null ? void 0 : _a3.name) == null ? void 0 : _b2.en) || "";
      }).filter(Boolean);
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || item.id;
      return {
        id: item.id,
        title,
        slug,
        cover,
        coverFile,
        author,
        description,
        status: attrs.status || "ongoing",
        tags,
        provider: "mangadex",
        availableLanguages: attrs.availableTranslatedLanguages || []
      };
    });
    searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL });
    return results;
  } catch (err) {
    console.error("[MangaDex Search Error]", err.message);
    return [];
  }
}
async function getMangaDexDetail(mangaId, lang = "id") {
  var _a, _b, _c, _d;
  const cacheKey = `mangadex_${mangaId}_${lang}`;
  const now = Date.now();
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey);
    if (cached.expiry > now) return cached.data;
  }
  try {
    const mangaRes = await axios.get(`https://api.mangadex.org/manga/${mangaId}?includes[]=cover_art&includes[]=author`, {
      timeout: 1e4,
      headers: { "User-Agent": "NexEo-LocalApp/1.0" }
    });
    const item = (_a = mangaRes.data) == null ? void 0 : _a.data;
    if (!item) return null;
    const attrs = item.attributes || {};
    const titleObj = attrs.title || {};
    const title = titleObj[lang] || titleObj["en"] || titleObj["ja-ro"] || Object.values(titleObj)[0] || "Unknown Title";
    const descObj = attrs.description || {};
    const description = descObj[lang] || descObj["en"] || Object.values(descObj)[0] || "";
    let coverFile = "";
    let author = "Unknown";
    if (Array.isArray(item.relationships)) {
      for (const rel of item.relationships) {
        if (rel.type === "cover_art" && ((_b = rel.attributes) == null ? void 0 : _b.fileName)) {
          coverFile = rel.attributes.fileName;
        }
        if (rel.type === "author" && ((_c = rel.attributes) == null ? void 0 : _c.name)) {
          author = rel.attributes.name;
        }
      }
    }
    const cover = coverFile ? `/api/manga/online/cover?id=${item.id}&file=${encodeURIComponent(coverFile)}` : null;
    const tags = (attrs.tags || []).map((t) => {
      var _a2, _b2;
      return ((_b2 = (_a2 = t.attributes) == null ? void 0 : _a2.name) == null ? void 0 : _b2.en) || "";
    }).filter(Boolean);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || item.id;
    const manga = {
      id: item.id,
      title,
      slug,
      cover,
      coverFile,
      author,
      description,
      status: attrs.status || "ongoing",
      tags,
      provider: "mangadex",
      availableLanguages: attrs.availableTranslatedLanguages || []
    };
    const feedParams = {
      limit: 150,
      "order[chapter]": "asc",
      "includes[]": ["scanlation_group"]
    };
    if (lang && lang !== "all") {
      feedParams["translatedLanguage[]"] = [lang];
    }
    const feedRes = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`, {
      params: feedParams,
      timeout: 1e4,
      headers: { "User-Agent": "NexEo-LocalApp/1.0" }
    });
    const rawChapters = ((_d = feedRes.data) == null ? void 0 : _d.data) || [];
    const chapters = rawChapters.map((ch) => {
      var _a2;
      const chAttr = ch.attributes || {};
      let scanlationGroup = "Indonesian Scan";
      if (Array.isArray(ch.relationships)) {
        const group = ch.relationships.find((r) => r.type === "scanlation_group");
        if ((_a2 = group == null ? void 0 : group.attributes) == null ? void 0 : _a2.name) {
          scanlationGroup = group.attributes.name;
        }
      }
      return {
        id: ch.id,
        chapter: chAttr.chapter || "1",
        title: chAttr.title ? `Ch. ${chAttr.chapter} - ${chAttr.title}` : `Chapter ${chAttr.chapter || "1"}`,
        language: chAttr.translatedLanguage || "id",
        publishDate: chAttr.publishAt,
        scanlationGroup
      };
    });
    manga.chapterCount = chapters.length;
    const result = { manga, chapters };
    detailCache.set(cacheKey, { data: result, expiry: now + CACHE_TTL });
    return result;
  } catch (err) {
    console.error("[MangaDex Detail Error]", err.message);
    return null;
  }
}
async function getMangaDexChapterPages(chapterId) {
  var _a, _b;
  try {
    const res = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`, {
      timeout: 1e4,
      headers: { "User-Agent": "NexEo-LocalApp/1.0" }
    });
    const baseUrl = (_a = res.data) == null ? void 0 : _a.baseUrl;
    const chapter = (_b = res.data) == null ? void 0 : _b.chapter;
    if (!baseUrl || !chapter) return [];
    const hash = chapter.hash;
    const files = chapter.data || chapter.dataSaver || [];
    return files.map((file) => `${baseUrl}/data/${hash}/${file}`);
  } catch (err) {
    console.error("[MangaDex Pages Error]", err.message);
    return [];
  }
}
const KOMIKU_HOST = "https://komiku.org";
async function searchKomiku(query) {
  const cacheKey = `komiku_${query.trim().toLowerCase()}`;
  const now = Date.now();
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey);
    if (cached.expiry > now) return cached.data;
  }
  try {
    const searchUrl = query && query.trim() ? `https://api.komiku.org/?s=${encodeURIComponent(query.trim())}` : `https://komiku.org/pustaka/?orderby=date`;
    const res = await axios.get(searchUrl, {
      timeout: 12e3,
      headers: { ...DEFAULT_HEADERS, "Referer": KOMIKU_HOST }
    });
    const $ = cheerio.load(res.data);
    const results = [];
    $(".bge, .bvl").each((_, el) => {
      const a = $(el).find(".kan a, .bgei a, a").first();
      let link = a.attr("href") || "";
      const title = $(el).find("h3, .title").first().text().trim() || a.attr("title") || "";
      const img = $(el).find("img").first();
      const cover = img.attr("data-src") || img.attr("src") || null;
      const desc = $(el).find("p").first().text().trim() || "Komik Bahasa Indonesia";
      if (title && link) {
        if (!link.startsWith("http")) link = `${KOMIKU_HOST}${link}`;
        const id = Buffer.from(link).toString("base64url");
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || id;
        results.push({
          id,
          title,
          slug,
          cover,
          author: "Komiku Author",
          description: desc,
          status: "Ongoing",
          tags: ["Manga", "Komiku", "Bahasa Indonesia"],
          provider: "komiku",
          availableLanguages: ["id"],
          url: link
        });
      }
    });
    searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL });
    return results;
  } catch (err) {
    console.error("[Komiku Search Error]", err.message);
    return [];
  }
}
async function getKomikuDetail(mangaIdOrUrl) {
  const cacheKey = `komiku_detail_${mangaIdOrUrl}`;
  const now = Date.now();
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey);
    if (cached.expiry > now) return cached.data;
  }
  try {
    let url = mangaIdOrUrl;
    if (!url.startsWith("http")) {
      url = Buffer.from(mangaIdOrUrl, "base64url").toString("utf-8");
    }
    const res = await axios.get(url, {
      timeout: 12e3,
      headers: { ...DEFAULT_HEADERS, "Referer": KOMIKU_HOST }
    });
    const $ = cheerio.load(res.data);
    const title = $("#Judul h1, h1.entry-title, h1").first().text().trim() || "Unknown Manga";
    const imgEl = $(".ims img, .thumb img").first();
    const cover = imgEl.attr("data-src") || imgEl.attr("src") || null;
    const desc = $(".desc, .sinopsis, p.desc").first().text().trim() || "Sinopsis komik Bahasa Indonesia.";
    const author = $('.informasi table tr:contains("Penulis") td:last-child').text().trim() || "Komiku";
    const tags = [];
    $(".genre li a, .genres a").each((_, el) => {
      const t = $(el).text().trim();
      if (t) tags.push(t);
    });
    const chapters = [];
    $("#Daftar_Chapter tr, .judulseries").each((_, el) => {
      const chA = $(el).find("a").first();
      const chUrl = chA.attr("href") || "";
      const chTitle = chA.text().trim() || chA.attr("title") || $(el).text().trim();
      const date = $(el).find(".tanggal, .date").text().trim();
      if (chUrl && chTitle && !chUrl.includes("iklan")) {
        const fullChUrl = chUrl.startsWith("http") ? chUrl : `${KOMIKU_HOST}${chUrl}`;
        const numMatch = chTitle.match(/\d+(\.\d+)?/);
        const chapterNum = numMatch ? numMatch[0] : String(chapters.length + 1);
        const chId = Buffer.from(fullChUrl).toString("base64url");
        chapters.push({
          id: chId,
          chapter: chapterNum,
          title: chTitle.replace(/\s+/g, " "),
          language: "id",
          publishDate: date,
          scanlationGroup: "Komiku.org",
          url: fullChUrl
        });
      }
    });
    chapters.sort((a, b) => parseFloat(a.chapter || "0") - parseFloat(b.chapter || "0"));
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || mangaIdOrUrl;
    const manga = {
      id: mangaIdOrUrl,
      title,
      slug,
      cover,
      author,
      description: desc,
      status: "ongoing",
      tags,
      provider: "komiku",
      availableLanguages: ["id"],
      chapterCount: chapters.length,
      url
    };
    const result = { manga, chapters };
    detailCache.set(cacheKey, { data: result, expiry: now + CACHE_TTL });
    return result;
  } catch (err) {
    console.error("[Komiku Detail Error]", err.message);
    return null;
  }
}
async function getKomikuChapterPages(chapterIdOrUrl) {
  try {
    let url = chapterIdOrUrl;
    if (!url.startsWith("http")) {
      url = Buffer.from(chapterIdOrUrl, "base64url").toString("utf-8");
    }
    const res = await axios.get(url, {
      timeout: 12e3,
      headers: { ...DEFAULT_HEADERS, "Referer": KOMIKU_HOST }
    });
    const $ = cheerio.load(res.data);
    const images = [];
    $("#Baca_Komik img, .main-reading-area img, .chapter-image img").each((_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src") || "";
      if (src && src.startsWith("http") && !src.includes("banner") && !src.includes("iklan")) {
        images.push(src.trim());
      }
    });
    return images;
  } catch (err) {
    console.error("[Komiku Pages Error]", err.message);
    return [];
  }
}
const MIKOROKU_DB_URL = "https://raw.githubusercontent.com/moemaomao/mymangadata/main/all-manga.json";
let mikorokuCatalogCache = null;
let mikorokuCatalogExpiry = 0;
async function fetchMikorokuCatalog() {
  const now = Date.now();
  if (mikorokuCatalogCache && mikorokuCatalogExpiry > now) {
    return mikorokuCatalogCache;
  }
  try {
    const res = await axios.get(MIKOROKU_DB_URL, { timeout: 1e4 });
    if (Array.isArray(res.data)) {
      mikorokuCatalogCache = res.data;
      mikorokuCatalogExpiry = now + CACHE_TTL;
      return res.data;
    }
  } catch (err) {
    console.error("[Mikoroku DB Error]", err.message);
  }
  return mikorokuCatalogCache || [];
}
async function searchMikoroku(query) {
  const cacheKey = `mikoroku_${query.trim().toLowerCase()}`;
  const now = Date.now();
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey);
    if (cached.expiry > now) return cached.data;
  }
  try {
    const catalog = await fetchMikorokuCatalog();
    const q = query.trim().toLowerCase();
    const filtered = q ? catalog.filter(
      (m) => {
        var _a, _b, _c, _d;
        return ((_a = m.title) == null ? void 0 : _a.toLowerCase().includes(q)) || ((_b = m.altTitle) == null ? void 0 : _b.toLowerCase().includes(q)) || ((_c = m.slug) == null ? void 0 : _c.toLowerCase().includes(q)) || ((_d = m.desc) == null ? void 0 : _d.toLowerCase().includes(q));
      }
    ) : catalog;
    const results = filtered.map((item) => {
      const title = item.title || "Untitled";
      const slug = item.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      let cover = item.img || item.cover || null;
      if (cover && !cover.startsWith("http")) {
        cover = `https://mikoroku.com/${cover}`;
      }
      return {
        id: slug,
        title,
        slug,
        cover,
        author: item.author || item.artist || "Mikoroku",
        description: item.desc || item.synopsis || "Komik Bahasa Indonesia dari Mikoroku.",
        status: item.status || "Ongoing",
        tags: Array.isArray(item.genres) ? item.genres : ["Manga", "Mikoroku", "Bahasa Indonesia"],
        provider: "mikoroku",
        availableLanguages: ["id"],
        url: `https://mikoroku.com/detail?slug=${slug}`
      };
    });
    searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL });
    return results;
  } catch (err) {
    console.error("[Mikoroku Search Error]", err.message);
    return [];
  }
}
async function getMikorokuDetail(slug) {
  var _a, _b;
  const cacheKey = `mikoroku_detail_${slug}`;
  const now = Date.now();
  if (detailCache.has(cacheKey)) {
    const cached = detailCache.get(cacheKey);
    if (cached.expiry > now) return cached.data;
  }
  try {
    const catalog = await fetchMikorokuCatalog();
    const item = catalog.find((m) => {
      var _a2;
      return m.slug === slug || ((_a2 = m.title) == null ? void 0 : _a2.toLowerCase()) === slug.replace(/-/g, " ");
    });
    if (!item) return null;
    const title = item.title || slug;
    let cover = item.img || item.cover || null;
    if (cover && !cover.startsWith("http")) {
      cover = `https://mikoroku.com/${cover}`;
    }
    const feedUrl = `https://www.mikoroku.top/feeds/posts/default?alt=json&max-results=200&q=${encodeURIComponent(title)}`;
    const feedRes = await axios.get(feedUrl, { timeout: 1e4 });
    const entries = ((_b = (_a = feedRes.data) == null ? void 0 : _a.feed) == null ? void 0 : _b.entry) || [];
    const chapters = entries.map((e, idx) => {
      var _a2, _b2, _c, _d, _e;
      const chTitle = ((_a2 = e.title) == null ? void 0 : _a2.$t) || `Chapter ${idx + 1}`;
      const contentHtml = ((_b2 = e.content) == null ? void 0 : _b2.$t) || ((_c = e.summary) == null ? void 0 : _c.$t) || "";
      const numMatch = chTitle.match(/chapter\s*(\d+(\.\d+)?)/i) || chTitle.match(/\bch\b\.?\s*(\d+(\.\d+)?)/i) || chTitle.match(/\d+/);
      const chapterNum = numMatch ? numMatch[1] || numMatch[0] : String(idx + 1);
      const chPayload = JSON.stringify({ title: chTitle, html: contentHtml });
      const chId = Buffer.from(chPayload).toString("base64url");
      return {
        id: chId,
        chapter: chapterNum,
        title: chTitle,
        language: "id",
        publishDate: ((_d = e.published) == null ? void 0 : _d.$t) || ((_e = e.updated) == null ? void 0 : _e.$t),
        scanlationGroup: "Mikoroku"
      };
    });
    chapters.sort((a, b) => parseFloat(a.chapter || "0") - parseFloat(b.chapter || "0"));
    const manga = {
      id: slug,
      title,
      slug,
      cover,
      author: item.author || "Mikoroku",
      description: item.desc || "Komik Bahasa Indonesia dari Mikoroku.",
      status: item.status || "ongoing",
      tags: Array.isArray(item.genres) ? item.genres : ["Manga", "Mikoroku"],
      provider: "mikoroku",
      availableLanguages: ["id"],
      chapterCount: chapters.length,
      url: `https://mikoroku.com/detail?slug=${slug}`
    };
    const result = { manga, chapters };
    detailCache.set(cacheKey, { data: result, expiry: now + CACHE_TTL });
    return result;
  } catch (err) {
    console.error("[Mikoroku Detail Error]", err.message);
    return null;
  }
}
async function getMikorokuChapterPages(chapterId) {
  try {
    const raw = Buffer.from(chapterId, "base64url").toString("utf-8");
    const payload = JSON.parse(raw);
    const html = payload.html || "";
    const $ = cheerio.load(html);
    const images = [];
    $("img").each((_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src") || "";
      if (src && src.startsWith("http") && !src.includes("banner")) {
        images.push(src.trim());
      }
    });
    return images;
  } catch (err) {
    console.error("[Mikoroku Pages Error]", err.message);
    return [];
  }
}
const WESTMANGA_MIRRORS = [
  "https://westmanga.co",
  "https://v1.westmanga.my",
  "https://v1.westmanga.top"
];
async function searchWestManga(query) {
  const cacheKey = `westmanga_${query.trim().toLowerCase()}`;
  const now = Date.now();
  if (searchCache.has(cacheKey)) {
    const cached = searchCache.get(cacheKey);
    if (cached.expiry > now) return cached.data;
  }
  for (const mirror of WESTMANGA_MIRRORS) {
    try {
      const url = query && query.trim() ? `${mirror}/contents?q=${encodeURIComponent(query.trim())}` : `${mirror}/contents`;
      const res = await axios.get(url, {
        timeout: 8e3,
        headers: { ...DEFAULT_HEADERS, "Referer": `${mirror}/` }
      });
      const $ = cheerio.load(res.data);
      const results = [];
      $("article, .card, .grid > div, .bs, .bsx, .listupd > div").each((_, el) => {
        const a = $(el).find("a").first();
        let link = a.attr("href") || "";
        const title = $(el).find("h2, h3, h4, .tt, .title").first().text().trim() || a.attr("title") || "";
        const img = $(el).find("img").first();
        const cover = img.attr("data-src") || img.attr("src") || null;
        if (title && link) {
          if (!link.startsWith("http")) link = `${mirror}${link}`;
          const id = Buffer.from(link).toString("base64url");
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || id;
          results.push({
            id,
            title,
            slug,
            cover,
            author: "WestManga",
            description: "Komik Manhwa/Manga Bahasa Indonesia dari WestManga.",
            status: "Ongoing",
            tags: ["Manhwa", "WestManga", "Bahasa Indonesia"],
            provider: "westmanga",
            availableLanguages: ["id"],
            url: link
          });
        }
      });
      if (results.length > 0) {
        searchCache.set(cacheKey, { data: results, expiry: now + CACHE_TTL });
        return results;
      }
    } catch {
    }
  }
  return searchKomiku(query);
}
async function getWestMangaDetail(mangaIdOrUrl) {
  let url = mangaIdOrUrl;
  if (!url.startsWith("http")) {
    url = Buffer.from(mangaIdOrUrl, "base64url").toString("utf-8");
  }
  for (const mirror of WESTMANGA_MIRRORS) {
    try {
      const res = await axios.get(url, {
        timeout: 8e3,
        headers: { ...DEFAULT_HEADERS, "Referer": `${mirror}/` }
      });
      const $ = cheerio.load(res.data);
      const title = $(".entry-title, .infox h1, h1").first().text().trim();
      if (!title) continue;
      const imgEl = $(".thumb img, .infox img").first();
      const cover = imgEl.attr("data-src") || imgEl.attr("src") || null;
      const desc = $(".desc, .sinopsis, p").first().text().trim();
      const chapters = [];
      $(".clx li, .eplister li, #chapterlist li, .chapter-list li").each((_, el) => {
        const a = $(el).find("a").first();
        const chUrl = a.attr("href") || "";
        const chTitle = $(el).find(".chapternum, .epl-num").first().text().trim() || a.text().trim();
        const date = $(el).find(".chapterdate, .epl-date").first().text().trim() || "";
        if (chUrl && chTitle) {
          const numMatch = chTitle.match(/\d+(\.\d+)?/);
          const chapterNum = numMatch ? numMatch[0] : String(chapters.length + 1);
          const chId = Buffer.from(chUrl).toString("base64url");
          chapters.push({
            id: chId,
            chapter: chapterNum,
            title: chTitle,
            language: "id",
            publishDate: date,
            scanlationGroup: "WestManga",
            url: chUrl
          });
        }
      });
      if (chapters.length > 0) {
        chapters.sort((a, b) => parseFloat(a.chapter || "0") - parseFloat(b.chapter || "0"));
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || mangaIdOrUrl;
        return {
          manga: {
            id: mangaIdOrUrl,
            title,
            slug,
            cover,
            author: "WestManga",
            description: desc || "Komik Bahasa Indonesia",
            status: "ongoing",
            tags: ["Manhwa", "WestManga"],
            provider: "westmanga",
            availableLanguages: ["id"],
            chapterCount: chapters.length,
            url
          },
          chapters
        };
      }
    } catch {
    }
  }
  return getKomikuDetail(mangaIdOrUrl);
}
async function getWestMangaChapterPages(chapterIdOrUrl) {
  let url = chapterIdOrUrl;
  if (!url.startsWith("http")) {
    url = Buffer.from(chapterIdOrUrl, "base64url").toString("utf-8");
  }
  for (const mirror of WESTMANGA_MIRRORS) {
    try {
      const res = await axios.get(url, {
        timeout: 8e3,
        headers: { ...DEFAULT_HEADERS, "Referer": `${mirror}/` }
      });
      const $ = cheerio.load(res.data);
      const images = [];
      $("#readerarea img, .chapter-image img, .reading-content img").each((_, el) => {
        const src = $(el).attr("data-src") || $(el).attr("src") || "";
        if (src && src.startsWith("http") && !src.includes("banner")) {
          images.push(src.trim());
        }
      });
      if (images.length > 0) return images;
    } catch {
    }
  }
  return getKomikuChapterPages(chapterIdOrUrl);
}
async function searchUniversalManga(query, provider = "mangadex", lang = "id") {
  if (provider === "mikoroku") {
    return searchMikoroku(query);
  }
  if (provider === "westmanga") {
    return searchWestManga(query);
  }
  if (provider === "komiku") {
    return searchKomiku(query);
  }
  return searchMangaDex(query, lang);
}
async function getUniversalMangaDetail(id, provider = "mangadex", lang = "id") {
  if (provider === "mikoroku") {
    return getMikorokuDetail(id);
  }
  if (provider === "westmanga") {
    return getWestMangaDetail(id);
  }
  if (provider === "komiku") {
    return getKomikuDetail(id);
  }
  return getMangaDexDetail(id, lang);
}
async function getUniversalChapterPages(chapterId, provider = "mangadex") {
  if (provider === "mikoroku") {
    return getMikorokuChapterPages(chapterId);
  }
  if (provider === "westmanga") {
    return getWestMangaChapterPages(chapterId);
  }
  if (provider === "komiku") {
    return getKomikuChapterPages(chapterId);
  }
  return getMangaDexChapterPages(chapterId);
}
async function downloadWorker(urls, concurrency = 4) {
  let index = 0;
  const total = urls.length;
  async function worker() {
    while (index < total) {
      const current = urls[index++];
      if (!current) break;
      if (!fs.existsSync(current.dest)) {
        try {
          const res = await axios.get(current.url, {
            responseType: "arraybuffer",
            timeout: 2e4,
            headers: {
              "User-Agent": DEFAULT_HEADERS["User-Agent"],
              "Referer": current.referer || "https://mikoroku.com/"
            }
          });
          fs.writeFileSync(current.dest, Buffer.from(res.data));
        } catch (err) {
          console.warn(`[Download warning for ${current.dest}]:`, err.message);
        }
      }
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, total) }, () => worker());
  await Promise.all(workers);
}
async function downloadChapterToLocal(options) {
  const { mangaTitle, mangaSlug, chapterNum, coverUrl, author, description, pageUrls, provider } = options;
  try {
    const mangaDir = path.join(serverConfig.manga.dir, mangaSlug);
    if (!fs.existsSync(mangaDir)) {
      fs.mkdirSync(mangaDir, { recursive: true });
    }
    const metaPath = path.join(mangaDir, "meta.json");
    if (!fs.existsSync(metaPath)) {
      const meta = {
        title: mangaTitle,
        slug: mangaSlug,
        author: author || "Unknown",
        description: description || "",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");
    }
    if (coverUrl) {
      const coverPath = path.join(mangaDir, "cover.jpg");
      if (!fs.existsSync(coverPath)) {
        try {
          const actualUrl = coverUrl.startsWith("/api") ? `http://127.0.0.1:${serverConfig.port}${coverUrl}` : coverUrl;
          const coverRes = await axios.get(actualUrl, {
            responseType: "arraybuffer",
            timeout: 1e4,
            headers: { "User-Agent": DEFAULT_HEADERS["User-Agent"] }
          });
          fs.writeFileSync(coverPath, Buffer.from(coverRes.data));
        } catch {
        }
      }
    }
    const padNum = chapterNum.padStart(2, "0");
    const chapterDir = path.join(mangaDir, `chapter-${padNum}`);
    if (!fs.existsSync(chapterDir)) {
      fs.mkdirSync(chapterDir, { recursive: true });
    }
    const referer = provider === "mikoroku" ? "https://mikoroku.com/" : provider === "westmanga" ? "https://westmanga.co/" : provider === "komiku" ? "https://komiku.org/" : "https://mangadex.org/";
    const tasks = pageUrls.map((pageUrl, i) => {
      const ext = path.extname(pageUrl.split("?")[0]) || ".jpg";
      const pageFileName = `${(i + 1).toString().padStart(3, "0")}${ext}`;
      const pageFilePath = path.join(chapterDir, pageFileName);
      return { url: pageUrl, dest: pageFilePath, referer };
    });
    await downloadWorker(tasks, 4);
    return { success: true, path: chapterDir };
  } catch (err) {
    console.error("[Manga Download Error]", err.message);
    return { success: false, error: err.message };
  }
}

const detail_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const id = typeof query.id === "string" ? query.id : "";
  const lang = typeof query.lang === "string" ? query.lang : "id";
  const provider = typeof query.provider === "string" ? query.provider : "mangadex";
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID manga wajib diisi" });
  }
  try {
    const detail = await getUniversalMangaDetail(id, provider, lang);
    if (!detail) {
      throw createError({ statusCode: 404, statusMessage: "Manga online tidak ditemukan" });
    }
    return {
      success: true,
      data: detail
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Gagal memuat detail manga online"
    });
  }
});

const detail_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: detail_get
}, Symbol.toStringTag, { value: 'Module' }));

const download_post$2 = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { mangaId, mangaTitle, mangaSlug, chapterId, chapterNum, chapterTitle, coverUrl, author, description, provider } = body;
  if (!chapterId || !chapterNum || !mangaSlug) {
    throw createError({ statusCode: 400, statusMessage: "Parameter unduhan chapter tidak lengkap" });
  }
  const selectedProvider = provider || "mangadex";
  try {
    const pageUrls = await getUniversalChapterPages(chapterId, selectedProvider);
    if (!pageUrls || pageUrls.length === 0) {
      throw createError({ statusCode: 404, statusMessage: "Tidak dapat menemukan halaman gambar untuk chapter ini" });
    }
    const result = await downloadChapterToLocal({
      mangaTitle: mangaTitle || mangaSlug,
      mangaSlug,
      chapterNum: String(chapterNum),
      chapterTitle: chapterTitle || `Chapter ${chapterNum}`,
      coverUrl,
      author,
      description,
      pageUrls,
      provider: selectedProvider
    });
    if (!result.success) {
      throw createError({ statusCode: 500, statusMessage: result.error || "Gagal mengunduh chapter ke disk lokal" });
    }
    return {
      success: true,
      message: `Chapter ${chapterNum} berhasil disimpan ke koleksi lokal!`,
      pageCount: pageUrls.length
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Gagal memproses unduhan chapter manga"
    });
  }
});

const download_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: download_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const search_get$2 = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : "";
  const lang = typeof query.lang === "string" ? query.lang : "id";
  const provider = typeof query.provider === "string" ? query.provider : "mangadex";
  try {
    const results = await searchUniversalManga(q, provider, lang);
    return {
      success: true,
      data: results
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Gagal mencari manga online"
    });
  }
});

const search_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: search_get$2
}, Symbol.toStringTag, { value: 'Module' }));

class NovelServerRepository {
  get novelDir() {
    return serverConfig.novel.dir;
  }
  ensureNovelDir(slug) {
    return path.join(this.novelDir, slug);
  }
  getIndexPath(slug) {
    return path.join(this.ensureNovelDir(slug), "master_index.json");
  }
  getMetadataPath(slug) {
    return path.join(this.ensureNovelDir(slug), "metadata.json");
  }
  getNovelDirs() {
    if (!fs.existsSync(this.novelDir)) {
      return [];
    }
    const entries = fs.readdirSync(this.novelDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory() && entry.name !== "thumbnails").map((entry) => {
      var _a, _b, _c, _d;
      const slug = entry.name;
      const indexPath = this.getIndexPath(slug);
      const metadataPath = this.getMetadataPath(slug);
      let title = slug;
      let author;
      let tags = [];
      let cover = null;
      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
          title = (_a = metadata.title) != null ? _a : title;
          author = metadata.author;
          tags = (_b = metadata.tags) != null ? _b : [];
          cover = (_c = metadata.coverUrl) != null ? _c : null;
        } catch {
        }
      }
      if (title === slug && fs.existsSync(indexPath)) {
        try {
          const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
          if (index.length > 0 && index[0]) {
            title = (_d = index[0].title) != null ? _d : title;
          }
        } catch {
        }
      }
      const rootCover = path.join(this.ensureNovelDir(slug), "cover.jpg");
      const coversDir = path.join(this.ensureNovelDir(slug), "images");
      if (fs.existsSync(rootCover)) {
        cover = `/_novels/${slug}/cover.jpg`;
      } else if (fs.existsSync(coversDir)) {
        const coverFiles = fs.readdirSync(coversDir);
        const found = coverFiles.find((f) => f.toLowerCase().includes("cover") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"));
        if (found) {
          cover = `/_novels/${slug}/images/${found}`;
        }
      }
      return {
        id: slug,
        slug,
        title,
        author,
        tags,
        cover: cover != null ? cover : void 0
      };
    }).filter((item) => item.title);
  }
  getNovelMetadata(slug) {
    const metadataPath = this.getMetadataPath(slug);
    if (!fs.existsSync(metadataPath)) return null;
    try {
      return JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
    } catch {
      return null;
    }
  }
  getMasterIndex(slug) {
    const indexPath = this.getIndexPath(slug);
    if (!fs.existsSync(indexPath)) return [];
    try {
      return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    } catch {
      return [];
    }
  }
  getChapterContent(slug, chapterId) {
    const safeChapter = path.basename(chapterId);
    const chapterPath = path.join(this.ensureNovelDir(slug), safeChapter.endsWith(".json") ? safeChapter : `${safeChapter}.json`);
    if (!fs.existsSync(chapterPath)) return null;
    try {
      return JSON.parse(fs.readFileSync(chapterPath, "utf-8"));
    } catch {
      return null;
    }
  }
}
const novelServerRepo = new NovelServerRepository();
function listLocalNovels() {
  return novelServerRepo.getNovelDirs().sort((a, b) => a.title.localeCompare(b.title));
}
function getLocalNovel(slug) {
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) return null;
  const metadata = novelServerRepo.getNovelMetadata(slug);
  novelServerRepo.getMasterIndex(slug);
  let title = (metadata == null ? void 0 : metadata.title) || slug;
  let author = metadata == null ? void 0 : metadata.author;
  let tags = (metadata == null ? void 0 : metadata.tags) || [];
  let description = metadata == null ? void 0 : metadata.description;
  let sourceUrl = metadata == null ? void 0 : metadata.sourceUrl;
  let cover = (metadata == null ? void 0 : metadata.coverUrl) || null;
  const rootCover = path.join(novelDir, "cover.jpg");
  const coversDir = path.join(novelDir, "images");
  if (fs.existsSync(rootCover)) {
    cover = `/_novels/${slug}/cover.jpg`;
  } else if (fs.existsSync(coversDir)) {
    const coverFiles = fs.readdirSync(coversDir);
    const found = coverFiles.find((f) => f.toLowerCase().includes("cover") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"));
    if (found) {
      cover = `/_novels/${slug}/images/${found}`;
    }
  }
  const chapters = getLocalChapters(slug);
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    sourceUrl,
    cover: cover || void 0,
    tags,
    chapters
  };
}
function getLocalChapters(slug) {
  const masterIndex = novelServerRepo.getMasterIndex(slug);
  if (masterIndex.length > 0) {
    return masterIndex.map((c) => ({
      id: String(c.id),
      title: c.title,
      file: c.file || `chapter-${c.id}.json`,
      number: c.number,
      url: c.url
    }));
  }
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) return [];
  const files = fs.readdirSync(novelDir);
  const chapterFiles = files.filter((f) => {
    const l = f.toLowerCase();
    return (l.endsWith(".txt") || l.endsWith(".json")) && !l.includes("meta") && !l.includes("index") && !l.includes("cover");
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  return chapterFiles.map((fileName, idx) => ({
    id: String(idx + 1),
    title: fileName.replace(/\.(txt|json)$/i, ""),
    file: fileName,
    number: idx + 1
  }));
}
function getLocalChapterContent(slug, filename) {
  return novelServerRepo.getChapterContent(slug, filename);
}

const _slug__get$4 = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required" });
  }
  const novel = getLocalNovel(slug);
  if (!novel) {
    throw createError({ statusCode: 404, statusMessage: "Novel not found" });
  }
  return { success: true, data: novel };
});

const _slug__get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _slug__get$4
}, Symbol.toStringTag, { value: 'Module' }));

const _filename__get$4 = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  const filename = getRouterParam(event, "filename");
  if (!slug || !filename) {
    throw createError({ statusCode: 400, statusMessage: "Slug and filename are required" });
  }
  const content = getLocalChapterContent(slug, filename);
  if (!content) {
    throw createError({ statusCode: 404, statusMessage: "Chapter content not found" });
  }
  return { success: true, data: content };
});

const _filename__get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _filename__get$4
}, Symbol.toStringTag, { value: 'Module' }));

const chapters_get$2 = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required" });
  }
  const chapters = getLocalChapters(slug);
  return { success: true, data: chapters };
});

const chapters_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: chapters_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(() => {
  const novels = listLocalNovels();
  return { success: true, data: novels };
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const library_get$2 = defineEventHandler(() => {
  const novels = listLocalNovels();
  return { success: true, data: novels };
});

const library_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: library_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const _slug__get$2 = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required" });
  }
  if (slug === "library") {
    const novels = listLocalNovels();
    return { success: true, data: novels };
  }
  const novel = getLocalNovel(slug);
  if (!novel) {
    throw createError({ statusCode: 404, statusMessage: "Novel not found" });
  }
  return { success: true, data: novel };
});

const _slug__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _slug__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const _filename__get$2 = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  const filename = getRouterParam(event, "filename");
  if (!slug || !filename) {
    throw createError({ statusCode: 400, statusMessage: "Slug and filename are required" });
  }
  const content = getLocalChapterContent(slug, filename);
  if (!content) {
    throw createError({ statusCode: 404, statusMessage: "Chapter content not found" });
  }
  return { success: true, data: content };
});

const _filename__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _filename__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const chapters_get = defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required" });
  }
  const chapters = getLocalChapters(slug);
  return { success: true, data: chapters };
});

const chapters_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: chapters_get
}, Symbol.toStringTag, { value: 'Module' }));

function escapeXml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const exportEpub_get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug || typeof slug !== "string") {
    throw createError({ statusCode: 400, statusMessage: "slug novel wajib diisi" });
  }
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) {
    throw createError({ statusCode: 404, statusMessage: "Folder novel tidak ditemukan" });
  }
  let meta = { title: slug, author: "Unknown Author", description: "", tags: [] };
  const metaPath = path.join(novelDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {
    }
  }
  const novelTitle = meta.title || slug;
  const novelAuthor = meta.author || "Unknown";
  const novelDescription = meta.description ? meta.description.replace(/<[^>]*>?/gm, "") : "";
  const files = fs.readdirSync(novelDir);
  const chapterFiles = files.filter((f) => {
    const l = f.toLowerCase();
    return (l.endsWith(".txt") || l.endsWith(".json")) && !l.includes("meta") && !l.includes("index") && !l.includes("cover");
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  if (chapterFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Tidak ada berkas chapter dalam novel ini" });
  }
  const zip = new AdmZip();
  zip.addFile("mimetype", Buffer.from("application/epub+zip", "utf-8"));
  const containerXml = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`;
  zip.addFile("META-INF/container.xml", Buffer.from(containerXml, "utf-8"));
  const styleCss = `
body {
  font-family: Georgia, serif;
  line-height: 1.8;
  padding: 5%;
  color: #1a1a1a;
}
h1, h2 {
  font-family: sans-serif;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
p {
  margin-bottom: 1.25rem;
  text-indent: 1.5em;
  text-align: justify;
}
.cover-page {
  text-align: center;
  padding: 10% 5%;
}
.cover-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.cover-author {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}
`;
  zip.addFile("OEBPS/style.css", Buffer.from(styleCss, "utf-8"));
  const manifestItems = [
    { id: "style", href: "style.css", mediaType: "text/css", title: "Styles" }
  ];
  const spineItems = [];
  let coverFilename = null;
  for (const f of files) {
    const l = f.toLowerCase();
    if ((l.startsWith("cover") || l.includes("cover")) && (l.endsWith(".jpg") || l.endsWith(".jpeg") || l.endsWith(".png") || l.endsWith(".webp"))) {
      coverFilename = f;
      break;
    }
  }
  if (coverFilename) {
    const coverPath = path.join(novelDir, coverFilename);
    const coverExt = path.extname(coverFilename).toLowerCase().replace(".", "");
    const coverMime = coverExt === "png" ? "image/png" : coverExt === "webp" ? "image/webp" : "image/jpeg";
    zip.addLocalFile(coverPath, "OEBPS");
    manifestItems.push({ id: "cover-image", href: coverFilename, mediaType: coverMime, title: "Cover Image" });
  }
  const titlePageXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${escapeXml(novelTitle)}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <div class="cover-page">
    <h1 class="cover-title">${escapeXml(novelTitle)}</h1>
    <p class="cover-author">Oleh: ${escapeXml(novelAuthor)}</p>
    ${novelDescription ? `<div class="cover-desc"><p>${escapeXml(novelDescription)}</p></div>` : ""}
  </div>
</body>
</html>`;
  zip.addFile("OEBPS/title.xhtml", Buffer.from(titlePageXhtml, "utf-8"));
  manifestItems.push({ id: "title-page", href: "title.xhtml", mediaType: "application/xhtml+xml", title: "Halaman Judul" });
  spineItems.push("title-page");
  chapterFiles.forEach((fileName, idx) => {
    const chapNum = idx + 1;
    const chapId = `chapter_${chapNum}`;
    const chapHref = `chapter_${chapNum}.xhtml`;
    const chapTitle = `Bab ${chapNum}: ${fileName.replace(/\.(txt|json)$/i, "").replace(/_/g, " ")}`;
    const filePath = path.join(novelDir, fileName);
    let paragraphs = [];
    if (fileName.toLowerCase().endsWith(".txt")) {
      const content = fs.readFileSync(filePath, "utf-8");
      paragraphs = content.split(/\r?\n/).map((p) => p.trim()).filter(Boolean);
    } else {
      try {
        const rawJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (Array.isArray(rawJson)) {
          paragraphs = rawJson.map((item) => typeof item === "string" ? item : item.value || item.text || "").filter(Boolean);
        } else if (rawJson && typeof rawJson === "object") {
          const arr = rawJson.content || rawJson.paragraphs || [];
          paragraphs = arr.map((item) => typeof item === "string" ? item : item.value || item.text || "").filter(Boolean);
        }
      } catch {
      }
    }
    const chapBody = paragraphs.map((p) => `<p>${escapeXml(p)}</p>`).join("\n");
    const chapterXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${escapeXml(chapTitle)}</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <h2>${escapeXml(chapTitle)}</h2>
  ${chapBody}
</body>
</html>`;
    zip.addFile(`OEBPS/${chapHref}`, Buffer.from(chapterXhtml, "utf-8"));
    manifestItems.push({ id: chapId, href: chapHref, mediaType: "application/xhtml+xml", title: chapTitle });
    spineItems.push(chapId);
  });
  const tocNavPoints = manifestItems.filter((item) => item.mediaType === "application/xhtml+xml").map((item, i) => `
    <navPoint id="navPoint-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${escapeXml(item.title)}</text></navLabel>
      <content src="${item.href}"/>
    </navPoint>`).join("");
  const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${slug}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${escapeXml(novelTitle)}</text></docTitle>
  <navMap>
    ${tocNavPoints}
  </navMap>
</ncx>`;
  zip.addFile("OEBPS/toc.ncx", Buffer.from(tocNcx, "utf-8"));
  manifestItems.push({ id: "ncx", href: "toc.ncx", mediaType: "application/x-dtbncx+xml", title: "Table of Contents" });
  const navListItems = manifestItems.filter((item) => item.mediaType === "application/xhtml+xml").map((item) => `<li><a href="${item.href}">${escapeXml(item.title)}</a></li>`).join("\n      ");
  const navXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>Daftar Isi</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Daftar Isi</h1>
    <ol>
      ${navListItems}
    </ol>
  </nav>
</body>
</html>`;
  zip.addFile("OEBPS/nav.xhtml", Buffer.from(navXhtml, "utf-8"));
  manifestItems.push({ id: "nav", href: "nav.xhtml", mediaType: "application/xhtml+xml", title: "Navigation" });
  const manifestXml = manifestItems.map((item) => `<item id="${item.id}" href="${item.href}" media-type="${item.mediaType}" ${item.id === "nav" ? 'properties="nav"' : ""}/>`).join("\n    ");
  const spineXml = spineItems.map((id) => `<itemref idref="${id}"/>`).join("\n    ");
  const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">urn:uuid:${slug}</dc:identifier>
    <dc:title>${escapeXml(novelTitle)}</dc:title>
    <dc:creator>${escapeXml(novelAuthor)}</dc:creator>
    <dc:language>id</dc:language>
    <meta property="dcterms:modified">${(/* @__PURE__ */ new Date()).toISOString().replace(/\.\d+Z$/, "Z")}</meta>
    ${coverFilename ? `<meta name="cover" content="cover-image"/>` : ""}
  </metadata>
  <manifest>
    ${manifestXml}
  </manifest>
  <spine toc="ncx">
    ${spineXml}
  </spine>
</package>`;
  zip.addFile("OEBPS/content.opf", Buffer.from(contentOpf, "utf-8"));
  const epubBuffer = zip.toBuffer();
  setHeader(event, "Content-Type", "application/epub+zip");
  setHeader(event, "Content-Disposition", `attachment; filename="${encodeURIComponent(slug)}.epub"`);
  setHeader(event, "Content-Length", epubBuffer.length);
  return epubBuffer;
});

const exportEpub_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: exportEpub_get
}, Symbol.toStringTag, { value: 'Module' }));

const export_get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug || typeof slug !== "string") {
    throw createError({ statusCode: 400, statusMessage: "slug novel wajib diisi" });
  }
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) {
    throw createError({ statusCode: 404, statusMessage: "Folder novel tidak ditemukan" });
  }
  let meta = { title: slug, author: "", description: "" };
  const metaPath = path.join(novelDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch {
    }
  }
  const files = fs.readdirSync(novelDir);
  const txtFiles = files.filter((f) => f.toLowerCase().endsWith(".txt")).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  if (txtFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Tidak ada berkas chapter dalam novel ini" });
  }
  let fullContent = `==================================================
`;
  fullContent += `JUDUL: ${meta.title || slug}
`;
  if (meta.author) fullContent += `AUTHOR: ${meta.author}
`;
  if (meta.description) fullContent += `SINOPSIS: ${meta.description.replace(/<[^>]*>?/gm, "")}
`;
  fullContent += `TOTAL CHAPTER: ${txtFiles.length}
`;
  fullContent += `DIEKSPOR DARI: NexEo Local App
`;
  fullContent += `==================================================


`;
  txtFiles.forEach((fileName, index) => {
    const filePath = path.join(novelDir, fileName);
    const chapterText = fs.readFileSync(filePath, "utf-8");
    fullContent += `--------------------------------------------------
`;
    fullContent += `CHAPTER ${index + 1}: ${fileName.replace(/\.txt$/i, "")}
`;
    fullContent += `--------------------------------------------------

`;
    fullContent += chapterText + `


`;
  });
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Content-Disposition", `attachment; filename="${encodeURIComponent(slug)}-full.txt"`);
  return fullContent;
});

const export_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: export_get
}, Symbol.toStringTag, { value: 'Module' }));

function decodeBuffer(buffer, filename = "") {
  const detected = jschardet.detect(buffer);
  if (detected && detected.encoding && detected.confidence > 0.3) {
    try {
      return iconv.decode(buffer, detected.encoding);
    } catch {
    }
  }
  return buffer.toString("utf8");
}
function sanitizeFolderName(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().substring(0, 15) || "novel_" + Date.now();
}
async function parseXml(xmlContent) {
  const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: false });
  return parser.parseStringPromise(xmlContent);
}
async function importEpubFile(epubFilePath, originalFilename) {
  var _a, _b, _c, _d;
  try {
    const zip = new AdmZip(epubFilePath);
    const zipEntries = zip.getEntries();
    const containerEntry = zipEntries.find((e) => e.entryName === "META-INF/container.xml");
    if (!containerEntry) throw new Error("Invalid EPUB: META-INF/container.xml not found");
    const containerXml = decodeBuffer(containerEntry.getData(), "container.xml");
    const containerParsed = await parseXml(containerXml);
    const opfPath = (_d = (_c = (_b = (_a = containerParsed == null ? void 0 : containerParsed.container) == null ? void 0 : _a.rootfiles) == null ? void 0 : _b.rootfile) == null ? void 0 : _c["$"]) == null ? void 0 : _d["full-path"];
    if (!opfPath) throw new Error("Could not parse OPF full-path from container.xml");
    const opfEntry = zipEntries.find((e) => e.entryName === opfPath);
    if (!opfEntry) throw new Error(`OPF file not found: ${opfPath}`);
    const opfXml = decodeBuffer(opfEntry.getData(), opfPath);
    const opfParsed = await parseXml(opfXml);
    const opfDir = path.dirname(opfPath);
    const metadata = opfParsed.package.metadata;
    const rawTitle = metadata["dc:title"] || "Unknown Title";
    const title = typeof rawTitle === "string" ? rawTitle : Array.isArray(rawTitle) ? rawTitle[0] : rawTitle["_"] || "Unknown Title";
    const rawAuthor = metadata["dc:creator"] || "Unknown Author";
    const author = typeof rawAuthor === "string" ? rawAuthor : rawAuthor["_"] || "Unknown Author";
    let description = "";
    if (metadata["dc:description"]) {
      description = typeof metadata["dc:description"] === "string" ? metadata["dc:description"] : metadata["dc:description"]["_"] || "";
      description = description.replace(/<[^>]*>?/gm, "");
    }
    const folderName = sanitizeFolderName(title);
    const novelDir = path.join(serverConfig.novel.dir, folderName);
    const imagesDir = path.join(novelDir, "images");
    if (!fs.existsSync(novelDir)) fs.mkdirSync(novelDir, { recursive: true });
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
    const manifestItem = opfParsed.package.manifest.item;
    const manifestMap = {};
    let coverImageId = null;
    if (metadata.meta) {
      const metas = Array.isArray(metadata.meta) ? metadata.meta : [metadata.meta];
      const coverMeta = metas.find((m) => m["$"] && m["$"].name === "cover");
      if (coverMeta) coverImageId = coverMeta["$"].content;
    }
    const items = Array.isArray(manifestItem) ? manifestItem : [manifestItem];
    for (const item of items) {
      const id = item["$"].id;
      const href = item["$"].href;
      const mediaType = item["$"]["media-type"];
      manifestMap[id] = { href, mediaType };
      if (item["$"].properties && item["$"].properties.includes("cover-image")) {
        coverImageId = id;
      }
    }
    const imageFileMap = {};
    for (const key of Object.keys(manifestMap)) {
      const item = manifestMap[key];
      if (item && item.mediaType.startsWith("image/")) {
        const imgPathInEpub = opfDir === "." ? item.href : path.join(opfDir, item.href).replace(/\\/g, "/");
        const imgEntry = zipEntries.find((e) => e.entryName === imgPathInEpub);
        if (imgEntry) {
          const imgFilename = path.basename(item.href);
          const localImgPath = path.join(imagesDir, imgFilename);
          fs.writeFileSync(localImgPath, imgEntry.getData());
          imageFileMap[item.href] = `images/${imgFilename}`;
        }
      }
    }
    if (coverImageId && manifestMap[coverImageId]) {
      const coverHref = manifestMap[coverImageId].href;
      const coverFilename = path.basename(coverHref);
      const sourcePath = path.join(imagesDir, coverFilename);
      if (fs.existsSync(sourcePath)) {
        const thumbDir = serverConfig.novel.thumbnailDir;
        if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });
        fs.copyFileSync(sourcePath, path.join(thumbDir, `${folderName}.jpg`));
        fs.copyFileSync(sourcePath, path.join(imagesDir, "cover.jpg"));
      }
    }
    const spine = opfParsed.package.spine.itemref;
    const itemrefs = Array.isArray(spine) ? spine : [spine];
    const masterIndex = [];
    let chapterCounter = 1;
    for (const ref of itemrefs) {
      const idref = ref["$"].idref;
      const item = manifestMap[idref];
      if (!item) continue;
      const htmlPathInEpub = opfDir === "." ? item.href : path.join(opfDir, item.href).replace(/\\/g, "/");
      const htmlEntry = zipEntries.find((e) => e.entryName === htmlPathInEpub);
      if (!htmlEntry) continue;
      const htmlContent = decodeBuffer(htmlEntry.getData(), htmlPathInEpub);
      const $ = cheerio.load(htmlContent);
      const chapterTitle = $("h1, h2, h3").first().text().trim() || $("title").text().trim() || `Chapter ${chapterCounter}`;
      const elements = [];
      $("body").find("p, img").each((_, el) => {
        const tagName = el.tagName ? el.tagName.toLowerCase() : "";
        if (tagName === "img") {
          const src = $(el).attr("src");
          if (src) {
            const resolvedSrc = path.basename(src);
            const matchedHref = Object.keys(imageFileMap).find((href) => path.basename(href) === resolvedSrc);
            if (matchedHref && imageFileMap[matchedHref]) {
              elements.push({ type: "image", value: imageFileMap[matchedHref] });
            }
          }
        } else {
          const text = $(el).text().trim();
          if (text) elements.push({ type: "text", value: text });
        }
      });
      if (elements.length > 0) {
        const chapterFileName = `chapter-${chapterCounter}.json`;
        fs.writeFileSync(
          path.join(novelDir, chapterFileName),
          JSON.stringify({ id: chapterCounter, title: chapterTitle, content: elements }, null, 2)
        );
        masterIndex.push({ id: chapterCounter, title: chapterTitle, file: chapterFileName });
        chapterCounter++;
      }
    }
    fs.writeFileSync(path.join(novelDir, "master_index.json"), JSON.stringify(masterIndex, null, 2));
    fs.writeFileSync(path.join(novelDir, "metadata.json"), JSON.stringify({
      id: folderName,
      slug: folderName,
      title,
      author,
      description,
      tags: []
    }, null, 2));
    return {
      success: true,
      slug: folderName,
      title,
      chapterCount: masterIndex.length
    };
  } catch (err) {
    return {
      success: false,
      slug: "",
      title: originalFilename,
      chapterCount: 0,
      error: (err == null ? void 0 : err.message) || "Failed to import EPUB"
    };
  }
}

const import_post$2 = defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }
  const filePart = parts.find((p) => p.filename && p.data);
  if (!filePart || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file payload" });
  }
  const tempDir = path.join(serverConfig.dataDir, "temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  const tempFilePath = path.join(tempDir, `upload-${Date.now()}-${filePart.filename}`);
  fs.writeFileSync(tempFilePath, filePart.data);
  try {
    const result = await importEpubFile(tempFilePath, filePart.filename);
    return result;
  } finally {
    if (fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch {
      }
    }
  }
});

const import_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: import_post$2
}, Symbol.toStringTag, { value: 'Module' }));

function detectSourceLanguage(sampleText) {
  if (/[\uac00-\ud7af\u1100-\u11ff]/.test(sampleText)) {
    return "ko";
  }
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(sampleText)) {
    return "ja";
  }
  return "en";
}
async function translateWithGemini(texts, apiKey, sourceLang) {
  var _a, _b, _c, _d, _e, _f;
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY") {
    throw new Error("Gemini API key is invalid or not provided");
  }
  const resolvedSource = sourceLang === "auto" ? detectSourceLanguage(texts.join(" ")) : sourceLang;
  const langName = resolvedSource === "ko" ? "Korean" : resolvedSource === "ja" ? "Japanese" : "English";
  const prompt = `You are a professional light novel translator. Translate the following JSON array of ${langName} strings to natural-sounding, contextually accurate Indonesian suitable for a novel reader. Keep the original expressions and formatting. Return a JSON array of strings in the exact same order and length. Return ONLY the JSON, without markdown formatting or code blocks.

Input JSON:
${JSON.stringify(texts)}`;
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
    {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 3e4
    }
  );
  const rawText = (_f = (_e = (_d = (_c = (_b = (_a = response.data) == null ? void 0 : _a.candidates) == null ? void 0 : _b[0]) == null ? void 0 : _c.content) == null ? void 0 : _d.parts) == null ? void 0 : _e[0]) == null ? void 0 : _f.text;
  if (!rawText) throw new Error("Empty response from Gemini API");
  const parsed = JSON.parse(rawText);
  if (Array.isArray(parsed) && parsed.length === texts.length) {
    return parsed;
  }
  throw new Error("Gemini returned array length mismatch");
}
async function translateBatchDeepL(texts, apiKey) {
  var _a;
  if (!apiKey) throw new Error("DeepL API key is required");
  const isFree = apiKey.trim().endsWith(":fx");
  const endpoint = isFree ? "https://api-free.deepl.com/v2/translate" : "https://api.deepl.com/v2/translate";
  const response = await axios.post(
    endpoint,
    {
      text: texts,
      target_lang: "ID"
    },
    {
      headers: {
        "Authorization": `DeepL-Auth-Key ${apiKey.trim()}`,
        "Content-Type": "application/json"
      },
      timeout: 3e4
    }
  );
  const translations = (_a = response.data) == null ? void 0 : _a.translations;
  if (Array.isArray(translations)) {
    return translations.map((t) => t.text);
  }
  throw new Error("Invalid response format from DeepL API");
}
async function translateSingleLibre(t, targetUrl, source, apiKey) {
  var _a, _b, _c, _d;
  try {
    const res = await axios.post(
      `${targetUrl}/translate`,
      {
        q: t,
        source,
        target: "id",
        format: "text",
        api_key: apiKey ? apiKey.trim() : void 0
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15e3
      }
    );
    if ((_a = res.data) == null ? void 0 : _a.translatedText) return res.data.translatedText;
  } catch {
  }
  if (source !== "en") {
    try {
      const step1 = await axios.post(
        `${targetUrl}/translate`,
        {
          q: t,
          source,
          target: "en",
          format: "text",
          api_key: apiKey ? apiKey.trim() : void 0
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15e3
        }
      );
      const enText = (_b = step1.data) == null ? void 0 : _b.translatedText;
      if (enText) {
        const step2 = await axios.post(
          `${targetUrl}/translate`,
          {
            q: enText,
            source: "en",
            target: "id",
            format: "text",
            api_key: apiKey ? apiKey.trim() : void 0
          },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 15e3
          }
        );
        if ((_c = step2.data) == null ? void 0 : _c.translatedText) return step2.data.translatedText;
      }
    } catch {
    }
  }
  try {
    const res = await translate(t, { from: source, to: "id" });
    return (_d = res == null ? void 0 : res.text) != null ? _d : t;
  } catch {
    return t;
  }
}
async function translateBatchLibre(texts, apiUrl, apiKey, sourceLang) {
  const targetUrl = (apiUrl).replace(/\/$/, "");
  const results = [];
  const resolvedSource = sourceLang === "auto" ? detectSourceLanguage(texts.join(" ")) : sourceLang;
  const batchSize = 5;
  for (let i = 0; i < texts.length; i += batchSize) {
    const chunk = texts.slice(i, i + batchSize);
    const promises = chunk.map((t) => translateSingleLibre(t, targetUrl, resolvedSource, apiKey));
    const chunkResults = await Promise.all(promises);
    results.push(...chunkResults);
  }
  return results;
}
async function translateBatchGoogle(texts, sourceLang) {
  var _a;
  const resolvedSource = sourceLang === "auto" ? detectSourceLanguage(texts.join(" ")) : sourceLang;
  try {
    const res = await translate(texts, { from: resolvedSource, to: "id" });
    const rawArr = Array.isArray(res) ? res : [res];
    return rawArr.map((item) => {
      var _a2;
      return (_a2 = item.text) != null ? _a2 : "";
    });
  } catch (e) {
    const results = [];
    for (const t of texts) {
      try {
        const res = await translate(t, { from: resolvedSource, to: "id" });
        results.push((_a = res == null ? void 0 : res.text) != null ? _a : t);
      } catch {
        results.push(t);
      }
    }
    return results;
  }
}
async function translateBatch(texts, config = {}) {
  if (!texts || texts.length === 0) return [];
  const engine = config.engine || "google";
  const sourceLang = config.sourceLang || "auto";
  if (engine === "libre") {
    try {
      return await translateBatchLibre(texts, config.libreUrl || "http://localhost:5000", config.libreApiKey, sourceLang);
    } catch (e) {
      console.warn("LibreTranslate failed, falling back to Google Translate:", e == null ? void 0 : e.message);
    }
  }
  if (engine === "gemini" && config.geminiApiKey) {
    try {
      return await translateWithGemini(texts, config.geminiApiKey, sourceLang);
    } catch (e) {
      console.warn("Gemini API failed, falling back to Google Translate:", e == null ? void 0 : e.message);
    }
  }
  if (engine === "deepl" && config.deeplApiKey) {
    try {
      return await translateBatchDeepL(texts, config.deeplApiKey);
    } catch (e) {
      console.warn("DeepL API failed, falling back to Google Translate:", e == null ? void 0 : e.message);
    }
  }
  return await translateBatchGoogle(texts, sourceLang);
}

const NOVEL_SOURCES = [
  { id: "sakuranovel", name: "SakuraNovel.id (Indo)", url: "https://sakuranovel.id" },
  { id: "indowebnovel", name: "Indowebnovel.id (Indo)", url: "https://indowebnovel.id" },
  { id: "meionovel", name: "Meionovel.id (Indo)", url: "https://meionovel.id" },
  { id: "vanovel", name: "Vanovel.com (Indo)", url: "https://vanovel.com" },
  { id: "bacalightnovel", name: "BacaLightNovel (Indo)", url: "https://bacalightnovel.co" },
  { id: "novelbookid", name: "NovelBookId (Indo)", url: "https://novelbook.id" },
  { id: "dreamy-translations", name: "Dreamy Translations", url: "https://dreamy-translations.com" },
  { id: "noveldex", name: "Noveldex", url: "https://noveldex.io" }
];
function extractNextData(html) {
  try {
    const $ = cheerio.load(html);
    const script = $("#__NEXT_DATA__").html();
    if (script) {
      return JSON.parse(script);
    }
  } catch {
  }
  return null;
}
async function scrapeDreamyCatalog() {
  var _a, _b, _c, _d, _e, _f, _g;
  const baseUrl = "https://dreamy-translations.com";
  try {
    const response = await axios.get(`${baseUrl}/series`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 3e4
    });
    const html = response.data;
    const libraryMap = /* @__PURE__ */ new Map();
    const coverMap = /* @__PURE__ */ new Map();
    const coverRegex = /\\"(\d+)\\":\\"(https:\/\/[^\\"]*?\/(?:covers|storage)\/[^\\"]+)\\"/gi;
    let cMatch;
    while ((cMatch = coverRegex.exec(html)) !== null) {
      coverMap.set(cMatch[1], cMatch[2].replace(/\\\\/g, "").replace(/\\"/g, ""));
    }
    const directCoverMatches = [...html.matchAll(/(https:\/\/supabase\.dreamy-translations\.com\/storage\/v1\/object\/public\/covers\/\d+\/[^\\"\s<>]+)/gi)];
    for (const dMatch of directCoverMatches) {
      const cleanUrl = dMatch[1].replace(/\\/g, "");
      const idMatch = cleanUrl.match(/\/covers\/(\d+)\//);
      if (idMatch && idMatch[1] && !coverMap.has(idMatch[1])) {
        coverMap.set(idMatch[1], cleanUrl);
      }
    }
    const seriesRegex = /\\"id\\":(\d+),\\"title\\":\\"((?:\\\\.|[^\\"])*)\\",\\"slug\\":\\"([^\\"]+)\\"/g;
    let sMatch;
    while ((sMatch = seriesRegex.exec(html)) !== null) {
      try {
        const id = sMatch[1];
        const rawTitle = sMatch[2];
        const title = JSON.parse(`"${rawTitle}"`);
        const slug = sMatch[3];
        const cover = coverMap.get(id);
        if (slug && !libraryMap.has(slug)) {
          libraryMap.set(slug, {
            id: slug,
            slug,
            title: title || `Novel ${slug}`,
            sourceUrl: `${baseUrl}/novel/${slug}`,
            cover: cover || void 0
          });
        }
      } catch {
      }
    }
    const nextData = extractNextData(html);
    const seriesList = ((_b = (_a = nextData == null ? void 0 : nextData.props) == null ? void 0 : _a.pageProps) == null ? void 0 : _b.series) || ((_e = (_d = (_c = nextData == null ? void 0 : nextData.props) == null ? void 0 : _c.pageProps) == null ? void 0 : _d.initialState) == null ? void 0 : _e.series) || ((_g = (_f = nextData == null ? void 0 : nextData.props) == null ? void 0 : _f.pageProps) == null ? void 0 : _g.novels);
    if (Array.isArray(seriesList) && seriesList.length > 0) {
      for (const item of seriesList) {
        if (item.slug) {
          let cover = item.cover || item.coverUrl || item.image || (item.id ? coverMap.get(String(item.id)) : void 0);
          if (cover && !cover.startsWith("http")) {
            cover = `${baseUrl}/${cover.replace(/^\//, "")}`;
          }
          const existing = libraryMap.get(item.slug);
          if (existing) {
            if (cover) existing.cover = cover;
          } else {
            libraryMap.set(item.slug, {
              id: item.slug,
              slug: item.slug,
              title: item.title || `Novel ${item.slug}`,
              author: item.author,
              description: item.description,
              cover: cover || void 0,
              sourceUrl: `${baseUrl}/novel/${item.slug}`
            });
          }
        }
      }
    }
    return Array.from(libraryMap.values());
  } catch (err) {
    console.warn(`[CatalogScraper] Dreamy Translations unavailable: ${err == null ? void 0 : err.message}`);
    return [];
  }
}
async function scrapeDreamyNovelDetail(slug) {
  var _a, _b;
  const baseUrl = "https://dreamy-translations.com";
  const sourceUrl = `${baseUrl}/novel/${slug}`;
  const response = await axios.get(sourceUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    timeout: 15e3
  });
  const html = response.data;
  const $ = cheerio.load(html);
  let title = $("h1").first().text().trim() || slug;
  let cover = $('img[src*="covers/"]').first().attr("src");
  let author = "";
  let description = "";
  const tagsSet = /* @__PURE__ */ new Set();
  const chapters = [];
  const nextData = extractNextData(html);
  const pageProps = (_a = nextData == null ? void 0 : nextData.props) == null ? void 0 : _a.pageProps;
  const novelObj = (pageProps == null ? void 0 : pageProps.novel) || (pageProps == null ? void 0 : pageProps.series) || ((_b = pageProps == null ? void 0 : pageProps.initialState) == null ? void 0 : _b.novel);
  if (novelObj) {
    if (novelObj.title) title = novelObj.title;
    if (novelObj.author) author = novelObj.author;
    if (novelObj.description) description = novelObj.description;
    if (novelObj.cover) cover = novelObj.cover;
    if (Array.isArray(novelObj.tags)) {
      novelObj.tags.forEach((t) => tagsSet.add(typeof t === "string" ? t : t.name || ""));
    }
    if (Array.isArray(novelObj.chapters) && novelObj.chapters.length > 0) {
      novelObj.chapters.forEach((ch, i) => {
        const chTitle = ch.title || ch.name || `Chapter ${i + 1}`;
        const chSlug = ch.slug || ch.id || `${i + 1}`;
        const chUrl = ch.url || `${baseUrl}/read/${slug}/${chSlug}`;
        chapters.push({
          title: chTitle,
          url: chUrl.startsWith("http") ? chUrl : `${baseUrl}${chUrl.startsWith("/") ? "" : "/"}${chUrl}`,
          file: `chapter-${i + 1}.json`
        });
      });
    }
  }
  if (cover && cover.startsWith("//")) cover = "https:" + cover;
  if (cover && cover.startsWith("/")) cover = baseUrl + cover;
  if (!author) {
    $("p").each((_, el) => {
      const text = $(el).text().trim();
      if (text.startsWith("by ")) author = text.replace("by ", "").trim();
    });
  }
  if (!description) {
    const descEl = $("div.text-base.text-muted-foreground.leading-relaxed").first();
    description = descEl.length ? descEl.html() || "" : $('meta[name="description"]').attr("content") || "";
  }
  if (tagsSet.size === 0) {
    $("span.rounded-full.text-xs.font-medium").each((_, el) => {
      const tag = $(el).text().trim();
      if (tag) tagsSet.add(tag);
    });
  }
  if (chapters.length === 0) {
    $("a[href]").each((i, el) => {
      const href = $(el).attr("href") || "";
      const chTitle = $(el).text().trim() || `Chapter ${i + 1}`;
      if (href.includes("/read/") || href.includes("/chapter") || href.includes(slug) && href !== `/novel/${slug}`) {
        const fullUrl = href.startsWith("http") ? href : `${baseUrl}${href.startsWith("/") ? "" : "/"}${href}`;
        if (!chapters.some((c) => c.url === fullUrl)) {
          chapters.push({
            title: chTitle,
            url: fullUrl,
            file: `chapter-${chapters.length + 1}.json`
          });
        }
      }
    });
  }
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    tags: Array.from(tagsSet),
    cover: cover || void 0,
    sourceUrl,
    chapters
  };
}
async function scrapeNoveldexCatalog() {
  var _a, _b;
  const baseUrl = "https://noveldex.io";
  const novelsMap = /* @__PURE__ */ new Map();
  try {
    for (let page = 1; page <= 10; page++) {
      const res = await axios.get(`${baseUrl}/api/series?page=${page}&limit=100`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        timeout: 15e3
      });
      const items = ((_a = res.data) == null ? void 0 : _a.data) || ((_b = res.data) == null ? void 0 : _b.series) || (Array.isArray(res.data) ? res.data : []);
      if (!Array.isArray(items) || items.length === 0) break;
      let addedInThisPage = 0;
      for (const item of items) {
        const slug = item.urlSlug || item.slug;
        if (slug && !novelsMap.has(slug)) {
          let cover = void 0;
          if (item.coverImage) {
            cover = item.coverImage.startsWith("http") ? item.coverImage : `${baseUrl}${item.coverImage}`;
          }
          novelsMap.set(slug, {
            id: slug,
            slug,
            title: item.title || slug,
            author: item.author || void 0,
            cover,
            sourceUrl: `${baseUrl}/series/novel/${slug}`
          });
          addedInThisPage++;
        }
      }
      if (addedInThisPage === 0) break;
    }
    if (novelsMap.size > 0) {
      return Array.from(novelsMap.values());
    }
  } catch (err) {
    console.warn(`[CatalogScraper] Noveldex API error, using HTML fallback: ${err == null ? void 0 : err.message}`);
  }
  try {
    const response = await axios.get(`${baseUrl}/series`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      timeout: 15e3
    });
    const $ = cheerio.load(response.data);
    $('a[href*="/series/novel/"]').each((_, el) => {
      var _a2, _b2, _c;
      const href = $(el).attr("href") || "";
      if (!href.includes("/chapter/")) {
        const slug = (_b2 = (_a2 = href.split("/series/novel/")[1]) == null ? void 0 : _a2.split("?")[0]) == null ? void 0 : _b2.split("/")[0];
        if (slug && !novelsMap.has(slug)) {
          let img = $(el).find("img").attr("src") || $(el).closest("div").find("img").attr("src");
          let cover = void 0;
          if (img) {
            if (img.includes("url=")) {
              const rawUrl = (_c = img.split("url=")[1]) == null ? void 0 : _c.split("&")[0];
              if (rawUrl) cover = decodeURIComponent(rawUrl);
            } else {
              cover = img.startsWith("/") ? `${baseUrl}${img}` : img;
            }
          }
          const altTitle = $(el).find("img").attr("alt");
          const textTitle = $(el).text().trim();
          const title = altTitle || (textTitle && textTitle !== "WEB NOVEL" ? textTitle : slug);
          novelsMap.set(slug, {
            id: slug,
            slug,
            title,
            cover,
            sourceUrl: `${baseUrl}/series/novel/${slug}`
          });
        }
      }
    });
  } catch {
  }
  return Array.from(novelsMap.values());
}
async function scrapeNoveldexNovelDetail(slug) {
  const baseUrl = "https://noveldex.io";
  const sourceUrl = `${baseUrl}/series/novel/${slug}`;
  const response = await axios.get(sourceUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    timeout: 2e4
  });
  const html = response.data;
  const $ = cheerio.load(html);
  let title = $("h1").first().text().trim() || slug;
  let cover = void 0;
  const imgEl = $('img[alt*="' + title + '"]').first() || $("img").first();
  let imgSrc = imgEl.attr("src");
  if (imgSrc) {
    if (imgSrc.includes("url=")) {
      cover = decodeURIComponent(imgSrc.split("url=")[1].split("&")[0]);
    } else {
      cover = imgSrc.startsWith("/") ? `${baseUrl}${imgSrc}` : imgSrc;
    }
  }
  let description = $('meta[name="description"]').attr("content") || "";
  let author = "";
  $("p, div, span").each((_, el) => {
    const text = $(el).text().trim();
    if (text.startsWith("Author:") || text.startsWith("Author :")) {
      author = text.replace(/Author\s*:/i, "").trim();
    }
  });
  const chapters = [];
  const chaptersMatch = html.match(/\\"chapters\\":(\[\{[\s\S]*?\}\])/);
  if (chaptersMatch) {
    try {
      const jsonStr = chaptersMatch[1].replace(/\\\\/g, "\\").replace(/\\"/g, '"');
      const parsedChapters = JSON.parse(jsonStr);
      if (Array.isArray(parsedChapters)) {
        parsedChapters.forEach((ch, idx) => {
          var _a;
          const chNum = (_a = ch.number) != null ? _a : idx + 1;
          const chTitle = ch.title || `Chapter ${chNum}`;
          const chUrl = `${baseUrl}/series/novel/${slug}/chapter/${chNum}`;
          chapters.push({
            title: chTitle,
            url: chUrl,
            file: `chapter-${chNum}.json`
          });
        });
      }
    } catch {
    }
  }
  if (chapters.length === 0) {
    $('a[href*="/chapter/"]').each((i, el) => {
      const href = $(el).attr("href") || "";
      const chTitle = $(el).text().trim() || `Chapter ${i + 1}`;
      if (href) {
        const fullUrl = href.startsWith("http") ? href : `${baseUrl}${href.startsWith("/") ? "" : "/"}${href}`;
        if (!chapters.some((c) => c.url === fullUrl)) {
          chapters.push({
            title: chTitle,
            url: fullUrl,
            file: `chapter-${chapters.length + 1}.json`
          });
        }
      }
    });
  }
  return {
    id: slug,
    slug,
    title,
    author,
    description,
    tags: [],
    cover: cover || void 0,
    sourceUrl,
    chapters
  };
}
async function scrapeSakuraCatalog() {
  const baseUrl = "https://sakuranovel.id";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const novels = [];
  try {
    for (let page = 1; page <= 3; page++) {
      const res = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?per_page=100&page=${page}&orderby=count&order=desc`, { headers, timeout: 15e3 });
      const categories = res.data;
      if (!Array.isArray(categories) || categories.length === 0) break;
      for (const cat of categories) {
        if (cat.count > 0 && cat.slug !== "uncategorized") {
          novels.push({
            id: cat.slug,
            slug: cat.slug,
            title: cat.name,
            sourceUrl: `${baseUrl}/category/${cat.slug}/`,
            description: `Novel terjemahan Bahasa Indonesia: ${cat.name} (${cat.count} chapter).`
          });
        }
      }
    }
  } catch (err) {
    console.error("[SakuraCatalog Error]", err.message);
  }
  return novels;
}
async function scrapeSakuraNovelDetail(slug) {
  var _a, _b;
  const baseUrl = "https://sakuranovel.id";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const catRes = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`, { headers, timeout: 15e3 });
  const categories = catRes.data;
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error(`Category not found for slug: ${slug}`);
  }
  const cat = categories[0];
  const catId = cat.id;
  const title = cat.name;
  const chapters = [];
  let page = 1;
  let totalPages = 1;
  do {
    const postsRes = await axios.get(`${baseUrl}/wp-json/wp/v2/posts?categories=${catId}&per_page=100&page=${page}&order=asc`, { headers, timeout: 2e4 });
    const posts = postsRes.data;
    totalPages = parseInt(postsRes.headers["x-wp-totalpages"] || "1", 10);
    if (Array.isArray(posts)) {
      for (const p of posts) {
        const chTitle = ((_a = p.title) == null ? void 0 : _a.rendered) ? cheerio.load(p.title.rendered).text().trim() : `Chapter ${chapters.length + 1}`;
        const chUrl = p.link || `${baseUrl}/${p.slug}`;
        chapters.push({
          title: chTitle,
          url: chUrl,
          file: `chapter-${chapters.length + 1}.json`,
          contentHtml: (_b = p.content) == null ? void 0 : _b.rendered
        });
      }
    }
    page++;
  } while (page <= totalPages && page <= 10);
  return {
    id: slug,
    slug,
    title,
    author: "SakuraNovel",
    description: `Novel terjemahan Bahasa Indonesia dari SakuraNovel: ${title} (${chapters.length} chapter).`,
    tags: ["SakuraNovel", "Bahasa Indonesia"],
    sourceUrl: `${baseUrl}/category/${slug}/`,
    chapters
  };
}
async function scrapeIndowebnovelCatalog() {
  const baseUrl = "https://indowebnovel.id";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const novels = [];
  try {
    for (let page = 1; page <= 3; page++) {
      const res = await axios.get(`${baseUrl}/wp-json/wp/v2/seri?per_page=100&page=${page}&orderby=count&order=desc`, { headers, timeout: 15e3 });
      const series = res.data;
      if (!Array.isArray(series) || series.length === 0) break;
      for (const item of series) {
        if (item.count > 0) {
          novels.push({
            id: item.slug,
            slug: item.slug,
            title: item.name,
            sourceUrl: `${baseUrl}/seri/${item.slug}/`,
            description: `Novel terjemahan Bahasa Indonesia dari Indowebnovel: ${item.name} (${item.count} chapter).`
          });
        }
      }
    }
  } catch (err) {
    console.error("[Indowebnovel Catalog Error]", err.message);
  }
  return novels;
}
async function scrapeIndowebnovelDetail(slug) {
  var _a, _b;
  const baseUrl = "https://indowebnovel.id";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const seriRes = await axios.get(`${baseUrl}/wp-json/wp/v2/seri?slug=${encodeURIComponent(slug)}`, { headers, timeout: 15e3 });
  const seriesList = seriRes.data;
  let catId = null;
  let title = slug;
  if (Array.isArray(seriesList) && seriesList.length > 0) {
    catId = seriesList[0].id;
    title = seriesList[0].name;
  } else {
    const catRes = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`, { headers, timeout: 15e3 });
    if (Array.isArray(catRes.data) && catRes.data.length > 0) {
      catId = catRes.data[0].id;
      title = catRes.data[0].name;
    }
  }
  if (!catId) {
    throw new Error(`Novel series not found on Indowebnovel for slug: ${slug}`);
  }
  const chapters = [];
  let page = 1;
  let totalPages = 1;
  do {
    const postsRes = await axios.get(`${baseUrl}/wp-json/wp/v2/posts?seri=${catId}&per_page=100&page=${page}&order=asc`, { headers, timeout: 2e4 });
    const posts = postsRes.data;
    totalPages = parseInt(postsRes.headers["x-wp-totalpages"] || "1", 10);
    if (Array.isArray(posts)) {
      for (const p of posts) {
        const chTitle = ((_a = p.title) == null ? void 0 : _a.rendered) ? cheerio.load(p.title.rendered).text().trim() : `Chapter ${chapters.length + 1}`;
        chapters.push({
          title: chTitle,
          url: p.link || `${baseUrl}/${p.slug}`,
          file: `chapter-${chapters.length + 1}.json`,
          contentHtml: (_b = p.content) == null ? void 0 : _b.rendered
        });
      }
    }
    page++;
  } while (page <= totalPages && page <= 10);
  return {
    id: slug,
    slug,
    title,
    author: "Indowebnovel",
    description: `Novel terjemahan Bahasa Indonesia dari Indowebnovel: ${title} (${chapters.length} chapter).`,
    tags: ["Indowebnovel", "Bahasa Indonesia"],
    sourceUrl: `${baseUrl}/seri/${slug}/`,
    chapters
  };
}
async function scrapeMeionovelCatalog() {
  const baseUrl = "https://meionovels.com";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const novelsMap = /* @__PURE__ */ new Map();
  try {
    const res = await axios.get(`${baseUrl}/novel/`, { headers, timeout: 15e3 });
    const $ = cheerio.load(res.data);
    $('a[href*="/novel/"]').each((_, el) => {
      const href = $(el).attr("href") || "";
      const title = $(el).text().trim() || $(el).find("img").attr("alt") || "";
      if (href && !href.endsWith("/novel/") && !href.includes("/pengumuman/")) {
        const parts = href.replace(/\/$/, "").split("/");
        const slug = parts.pop() || "";
        if (slug && title && title !== "HTL" && !title.startsWith("Chapter") && !novelsMap.has(slug)) {
          novelsMap.set(slug, {
            id: slug,
            slug,
            title,
            sourceUrl: href,
            description: `Novel terjemahan Bahasa Indonesia dari Meionovel: ${title}.`
          });
        }
      }
    });
  } catch (err) {
    console.error("[Meionovel Catalog Error]", err.message);
  }
  return Array.from(novelsMap.values());
}
async function scrapeMeionovelDetail(slug) {
  const baseUrl = "https://meionovels.com";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const sourceUrl = `${baseUrl}/novel/${slug}/`;
  const res = await axios.get(sourceUrl, { headers, timeout: 2e4 });
  const $ = cheerio.load(res.data);
  const title = $("h1").first().text().trim() || slug;
  const desc = $(".entry-content p, .sinopsis p, .desc p").first().text().trim() || `Novel Meionovel: ${title}`;
  const cover = $(".thumb img, .summary_image img").attr("src") || void 0;
  const chapters = [];
  $('a[href*="/chapter-"], .wp-manga-chapter a').each((i, el) => {
    const chUrl = $(el).attr("href") || "";
    const chTitle = $(el).text().trim() || `Chapter ${i + 1}`;
    if (chUrl && !chapters.some((c) => c.url === chUrl)) {
      chapters.push({
        title: chTitle,
        url: chUrl,
        file: `chapter-${chapters.length + 1}.json`
      });
    }
  });
  return {
    id: slug,
    slug,
    title,
    author: "Meionovel",
    description: desc,
    cover,
    tags: ["Meionovel", "Bahasa Indonesia"],
    sourceUrl,
    chapters
  };
}
async function scrapeVanovelCatalog() {
  const baseUrl = "https://vanovel.com";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const novelsMap = /* @__PURE__ */ new Map();
  try {
    const res = await axios.get(`${baseUrl}/`, { headers, timeout: 15e3 });
    const $ = cheerio.load(res.data);
    $('a[href*="/manga/"]').each((_, el) => {
      const href = $(el).attr("href") || "";
      const title = $(el).text().trim() || $(el).find("img").attr("alt") || "";
      if (href && !href.includes("/manga-genre/") && !href.includes("/chapter-")) {
        const parts = href.replace(/\/$/, "").split("/");
        const slug = parts.pop() || "";
        if (slug && title && !novelsMap.has(slug)) {
          novelsMap.set(slug, {
            id: slug,
            slug,
            title,
            sourceUrl: href,
            description: `Novel terjemahan Bahasa Indonesia dari Vanovel: ${title}.`
          });
        }
      }
    });
  } catch (err) {
    console.error("[Vanovel Catalog Error]", err.message);
  }
  return Array.from(novelsMap.values());
}
async function scrapeVanovelDetail(slug) {
  const baseUrl = "https://vanovel.com";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const sourceUrl = `${baseUrl}/manga/${slug}/`;
  const res = await axios.get(sourceUrl, { headers, timeout: 2e4 });
  const $ = cheerio.load(res.data);
  const title = $("h1.entry-title, h1").first().text().trim() || slug;
  const desc = $(".entry-content p, .sinopsis p").first().text().trim() || `Novel Vanovel: ${title}`;
  const cover = $(".thumb img").attr("src") || void 0;
  const chapters = [];
  $(".clx li a, #chapterlist li a, .eplister li a").each((i, el) => {
    const chUrl = $(el).attr("href") || "";
    const chTitle = $(el).find(".chapternum").text().trim() || $(el).text().trim() || `Chapter ${i + 1}`;
    if (chUrl && !chapters.some((c) => c.url === chUrl)) {
      chapters.push({
        title: chTitle,
        url: chUrl,
        file: `chapter-${chapters.length + 1}.json`
      });
    }
  });
  return {
    id: slug,
    slug,
    title,
    author: "Vanovel",
    description: desc,
    cover,
    tags: ["Vanovel", "Bahasa Indonesia"],
    sourceUrl,
    chapters
  };
}
async function scrapeBacalightnovelCatalog() {
  const baseUrl = "https://bacalightnovel.co";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const novels = [];
  try {
    const res = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`, { headers, timeout: 15e3 });
    if (Array.isArray(res.data)) {
      for (const cat of res.data) {
        if (cat.count > 0 && cat.slug !== "uncategorized") {
          novels.push({
            id: cat.slug,
            slug: cat.slug,
            title: cat.name,
            sourceUrl: `${baseUrl}/category/${cat.slug}/`,
            description: `Novel BacaLightNovel: ${cat.name} (${cat.count} chapter).`
          });
        }
      }
    }
  } catch {
  }
  return novels;
}
async function scrapeBacalightnovelDetail(slug) {
  return await scrapeSakuraNovelDetail(slug);
}
async function scrapeNovelbookidCatalog() {
  const baseUrl = "https://novelbook.id";
  const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" };
  const novels = [];
  try {
    const res = await axios.get(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`, { headers, timeout: 15e3 });
    if (Array.isArray(res.data)) {
      for (const cat of res.data) {
        if (cat.count > 0 && cat.slug !== "uncategorized") {
          novels.push({
            id: cat.slug,
            slug: cat.slug,
            title: cat.name,
            sourceUrl: `${baseUrl}/category/${cat.slug}/`,
            description: `Novel NovelBookId: ${cat.name} (${cat.count} chapter).`
          });
        }
      }
    }
  } catch {
  }
  return novels;
}
async function scrapeNovelbookidDetail(slug) {
  return await scrapeSakuraNovelDetail(slug);
}
async function getSourceCatalog(sourceId) {
  if (sourceId === "sakuranovel") {
    return await scrapeSakuraCatalog();
  } else if (sourceId === "indowebnovel") {
    return await scrapeIndowebnovelCatalog();
  } else if (sourceId === "meionovel") {
    return await scrapeMeionovelCatalog();
  } else if (sourceId === "vanovel") {
    return await scrapeVanovelCatalog();
  } else if (sourceId === "bacalightnovel") {
    return await scrapeBacalightnovelCatalog();
  } else if (sourceId === "novelbookid") {
    return await scrapeNovelbookidCatalog();
  } else if (sourceId === "dreamy-translations") {
    return await scrapeDreamyCatalog();
  } else if (sourceId === "noveldex") {
    return await scrapeNoveldexCatalog();
  }
  return [];
}

async function downloadImage(url, filepath) {
  try {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15e3
    });
    return new Promise((resolve) => {
      response.data.pipe(fs.createWriteStream(filepath)).on("finish", () => resolve(true)).on("error", () => resolve(false));
    });
  } catch {
    return false;
  }
}
async function importNovelFromSource(options) {
  const { sourceId, slug, translationConfig } = options;
  try {
    const detail = sourceId === "noveldex" ? await scrapeNoveldexNovelDetail(slug) : await scrapeDreamyNovelDetail(slug);
    if (!detail) {
      return { success: false, slug, downloadedCount: 0, error: "Novel detail not found" };
    }
    const novelDir = path.join(serverConfig.novel.dir, slug);
    const imagesDir = path.join(novelDir, "images");
    const indexPath = path.join(novelDir, "master_index.json");
    const metadataPath = path.join(novelDir, "metadata.json");
    if (!fs.existsSync(novelDir)) fs.mkdirSync(novelDir, { recursive: true });
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
    let localCoverUrl = void 0;
    if (detail.cover) {
      const coverPathInImages = path.join(imagesDir, "cover.jpg");
      const rootCoverPath = path.join(novelDir, "cover.jpg");
      const downloaded = await downloadImage(detail.cover, coverPathInImages);
      if (downloaded && fs.existsSync(coverPathInImages)) {
        try {
          fs.copyFileSync(coverPathInImages, rootCoverPath);
        } catch {
        }
        localCoverUrl = `/_novels/${slug}/cover.jpg`;
      } else {
        localCoverUrl = detail.cover;
      }
    }
    fs.writeFileSync(metadataPath, JSON.stringify({
      id: slug,
      slug,
      title: detail.title,
      author: detail.author,
      description: detail.description,
      tags: detail.tags,
      coverUrl: localCoverUrl || detail.cover,
      sourceUrl: detail.sourceUrl
    }, null, 2));
    let masterIndex = [];
    if (fs.existsSync(indexPath)) {
      try {
        masterIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
      } catch {
      }
    }
    let chaptersToDownload = detail.chapters;
    if (options.chapterFilter && options.chapterFilter !== "all") {
      chaptersToDownload = detail.chapters.filter((ch) => ch.file === options.chapterFilter || ch.url === options.chapterFilter);
    }
    let downloadedCount = 0;
    for (let i = 0; i < chaptersToDownload.length; i++) {
      const ch = chaptersToDownload[i];
      if (!ch) continue;
      try {
        const res = await axios.get(ch.url, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
          timeout: 2e4
        });
        const $ = cheerio.load(res.data);
        const contentDiv = $("article.chapter-content, div.chapter-content, main, .chapter-body");
        const rawElements = [];
        const imageDownloads = [];
        const elements = contentDiv.find("p, img").toArray();
        for (let j = 0; j < elements.length; j++) {
          const el = elements[j];
          const tagName = el.tagName ? el.tagName.toLowerCase() : "";
          if (tagName === "p") {
            const text = $(el).text().trim();
            if (text) rawElements.push({ type: "text", value: text });
          } else if (tagName === "img") {
            const imgUrl = $(el).attr("src");
            if (imgUrl) {
              const filename = `chapter-${i + 1}-img-${imageDownloads.length + 1}.jpg`;
              const filepath = path.join(imagesDir, filename);
              const localPath = `images/${filename}`;
              rawElements.push({ type: "image", value: localPath });
              imageDownloads.push({ url: imgUrl, filepath });
            }
          }
        }
        const textElements = rawElements.filter((e) => e.type === "text");
        if (textElements.length > 0 && translationConfig) {
          const textsToTranslate = textElements.map((e) => e.value);
          const translatedTexts = await translateBatch(textsToTranslate, translationConfig);
          for (let k = 0; k < textElements.length; k++) {
            const item = textElements[k];
            if (item) {
              item.translatedValue = translatedTexts[k] || item.value;
            }
          }
        }
        for (const imgItem of imageDownloads) {
          await downloadImage(imgItem.url, imgItem.filepath);
        }
        const finalContent = rawElements.map((el) => {
          if (el.type === "text") {
            return { type: "text", value: el.translatedValue || el.value };
          }
          return { type: "image", value: el.value };
        });
        const chapterNumber = i + 1;
        const chapterFileName = ch.file || `chapter-${chapterNumber}.json`;
        const chapterData = {
          id: chapterNumber,
          title: ch.title,
          sourceUrl: ch.url,
          content: finalContent
        };
        fs.writeFileSync(path.join(novelDir, chapterFileName), JSON.stringify(chapterData, null, 2));
        downloadedCount++;
        const existingIdx = masterIndex.findIndex((item) => item.file === chapterFileName || item.id === chapterNumber);
        if (existingIdx !== -1) {
          masterIndex[existingIdx] = { id: chapterNumber, title: ch.title, file: chapterFileName };
        } else {
          masterIndex.push({ id: chapterNumber, title: ch.title, file: chapterFileName });
        }
        fs.writeFileSync(indexPath, JSON.stringify(masterIndex, null, 2));
      } catch (err) {
        console.error(`Failed to import chapter ${ch.title}:`, err == null ? void 0 : err.message);
      }
    }
    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, JSON.stringify(masterIndex, null, 2));
    }
    return {
      success: true,
      slug,
      downloadedCount
    };
  } catch (err) {
    return {
      success: false,
      slug,
      downloadedCount: 0,
      error: (err == null ? void 0 : err.message) || "Scraper import error"
    };
  }
}

const import_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { sourceId, slug, chapterFilter, translationConfig } = body || {};
  if (!sourceId || !slug) {
    throw createError({ statusCode: 400, statusMessage: "sourceId and slug are required" });
  }
  const result = await importNovelFromSource({
    sourceId,
    slug,
    chapterFilter,
    translationConfig
  });
  return result;
});

const import_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: import_post
}, Symbol.toStringTag, { value: 'Module' }));

const library_get = defineEventHandler(() => {
  const novels = listLocalNovels();
  return { success: true, data: novels };
});

const library_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: library_get
}, Symbol.toStringTag, { value: 'Module' }));

const sources_get = defineEventHandler(() => {
  return NOVEL_SOURCES;
});

const sources_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sources_get
}, Symbol.toStringTag, { value: 'Module' }));

const _slug__get = defineEventHandler(async (event) => {
  const sourceId = getRouterParam(event, "source") || "";
  const slug = getRouterParam(event, "slug") || "";
  if (sourceId === "sakuranovel") {
    return await scrapeSakuraNovelDetail(slug);
  } else if (sourceId === "indowebnovel") {
    return await scrapeIndowebnovelDetail(slug);
  } else if (sourceId === "meionovel") {
    return await scrapeMeionovelDetail(slug);
  } else if (sourceId === "vanovel") {
    return await scrapeVanovelDetail(slug);
  } else if (sourceId === "bacalightnovel") {
    return await scrapeBacalightnovelDetail(slug);
  } else if (sourceId === "novelbookid") {
    return await scrapeNovelbookidDetail(slug);
  } else if (sourceId === "dreamy-translations") {
    return await scrapeDreamyNovelDetail(slug);
  } else if (sourceId === "noveldex") {
    return await scrapeNoveldexNovelDetail(slug);
  }
  throw createError({ statusCode: 404, statusMessage: "Novel detail scraper for this source is not supported" });
});

const _slug__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _slug__get
}, Symbol.toStringTag, { value: 'Module' }));

const novels_get = defineEventHandler(async (event) => {
  const sourceId = getRouterParam(event, "source") || "";
  return await getSourceCatalog(sourceId);
});

const novels_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: novels_get
}, Symbol.toStringTag, { value: 'Module' }));

function isScraperUiNoise(text) {
  const l = text.toLowerCase();
  return l.includes("tap the bulb icon") || l.includes("suggest an edit") || l.includes("click a line to suggest") || l.includes("edit suggestion");
}
function shouldTranslateItem(item) {
  const txt = getItemText(item);
  if (!txt || isScraperUiNoise(txt)) return false;
  if (typeof item === "string" && item.trim().length > 0) return true;
  if (item && typeof item === "object") {
    if (item.type === "image") return false;
    if (item.type === "text" && typeof item.value === "string" && item.value.trim().length > 0) return true;
    if (item.type === "paragraph" && typeof item.text === "string" && item.text.trim().length > 0) return true;
    if (!item.type && typeof item.value === "string" && !item.value.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) && item.value.trim().length > 0) return true;
    if (!item.type && typeof item.text === "string" && item.text.trim().length > 0) return true;
  }
  return false;
}
function getItemText(item) {
  if (typeof item === "string") return item.trim();
  if (item && typeof item === "object") {
    if (item.type === "text" && typeof item.value === "string") return item.value.trim();
    if (item.type === "paragraph" && typeof item.text === "string") return item.text.trim();
    if (!item.type && typeof item.value === "string") return item.value.trim();
    if (!item.type && typeof item.text === "string") return item.text.trim();
  }
  return "";
}
function updateItemText(item, newText) {
  if (typeof item === "string") return newText;
  if (item && typeof item === "object") {
    if (item.type === "text" && typeof item.value === "string") {
      item.value = newText;
    } else if (item.type === "paragraph" && typeof item.text === "string") {
      item.text = newText;
    } else if (!item.type && typeof item.value === "string") {
      item.value = newText;
    } else if (!item.type && typeof item.text === "string") {
      item.text = newText;
    }
  }
  return item;
}
const translateAll_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { slug, engine, sourceLang, geminiApiKey, deeplApiKey, libreUrl, libreApiKey } = body || {};
  if (!slug || typeof slug !== "string") {
    throw createError({ statusCode: 400, statusMessage: "slug novel wajib diisi" });
  }
  const novelDir = path.join(serverConfig.novel.dir, slug);
  if (!fs.existsSync(novelDir)) {
    throw createError({ statusCode: 404, statusMessage: "Folder novel tidak ditemukan" });
  }
  const files = fs.readdirSync(novelDir);
  const chapterFiles = files.filter((f) => {
    const l = f.toLowerCase();
    return (l.endsWith(".txt") || l.endsWith(".json")) && !l.includes("meta") && !l.includes("index") && !l.includes("cover");
  }).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numA - numB;
  });
  if (chapterFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "Tidak ada berkas chapter (.txt / .json) dalam novel ini" });
  }
  let translatedCount = 0;
  for (let i = 0; i < chapterFiles.length; i++) {
    const fileName = chapterFiles[i];
    if (!fileName) continue;
    const filePath = path.join(novelDir, fileName);
    const ext = path.extname(fileName).toLowerCase();
    try {
      if (ext === ".txt") {
        const content = fs.readFileSync(filePath, "utf-8");
        const paragraphs = content.split(/\r?\n/).filter((p) => p.trim().length > 0);
        console.log(`[Batch Translate] (${i + 1}/${chapterFiles.length}) Chapter ${fileName} (.txt): found ${paragraphs.length} paragraphs. Translating via '${engine || "google"}'...`);
        if (paragraphs.length > 0) {
          const translatedParagraphs = await translateBatch(paragraphs, {
            engine,
            sourceLang,
            geminiApiKey,
            deeplApiKey,
            libreUrl,
            libreApiKey
          });
          if (translatedParagraphs && translatedParagraphs.length > 0) {
            fs.writeFileSync(filePath, translatedParagraphs.join("\n\n"), "utf-8");
            translatedCount++;
          }
        }
      } else if (ext === ".json") {
        const rawJson = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(rawJson);
        const extractedParagraphs = [];
        if (Array.isArray(jsonData)) {
          for (const item of jsonData) {
            if (shouldTranslateItem(item)) {
              const txt = getItemText(item);
              if (txt) extractedParagraphs.push(txt);
            }
          }
        } else if (jsonData && typeof jsonData === "object") {
          const contentArr = Array.isArray(jsonData.content) ? jsonData.content : Array.isArray(jsonData.paragraphs) ? jsonData.paragraphs : [];
          for (const item of contentArr) {
            if (shouldTranslateItem(item)) {
              const txt = getItemText(item);
              if (txt) extractedParagraphs.push(txt);
            }
          }
        }
        console.log(`[Batch Translate] (${i + 1}/${chapterFiles.length}) Chapter ${fileName} (.json): found ${extractedParagraphs.length} text paragraphs. Translating via '${engine || "google"}'...`);
        if (extractedParagraphs.length > 0) {
          const translatedParagraphs = await translateBatch(extractedParagraphs, {
            engine,
            sourceLang,
            geminiApiKey,
            deeplApiKey,
            libreUrl,
            libreApiKey
          });
          if (translatedParagraphs && translatedParagraphs.length > 0) {
            let tIdx = 0;
            if (Array.isArray(jsonData)) {
              for (let k = 0; k < jsonData.length; k++) {
                const item = jsonData[k];
                if (shouldTranslateItem(item)) {
                  const newTxt = translatedParagraphs[tIdx++];
                  if (newTxt) {
                    jsonData[k] = updateItemText(item, newTxt);
                  }
                }
              }
              fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
            } else if (jsonData && typeof jsonData === "object") {
              const contentArr = Array.isArray(jsonData.content) ? jsonData.content : Array.isArray(jsonData.paragraphs) ? jsonData.paragraphs : [];
              for (let k = 0; k < contentArr.length; k++) {
                const item = contentArr[k];
                if (shouldTranslateItem(item)) {
                  const newTxt = translatedParagraphs[tIdx++];
                  if (newTxt) {
                    contentArr[k] = updateItemText(item, newTxt);
                  }
                }
              }
              fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
            }
            translatedCount++;
          }
        }
      }
    } catch (err) {
      console.error(`Failed to translate chapter ${fileName}:`, err);
    }
  }
  return {
    success: true,
    totalChapters: chapterFiles.length,
    translatedCount,
    message: `Berhasil menerjemahkan ${translatedCount} dari ${chapterFiles.length} chapter secara permanen!`
  };
});

const translateAll_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: translateAll_post
}, Symbol.toStringTag, { value: 'Module' }));

const translate_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { texts, engine, sourceLang, geminiApiKey, deeplApiKey, libreUrl, libreApiKey } = body || {};
  if (!texts || !Array.isArray(texts)) {
    throw createError({ statusCode: 400, statusMessage: "texts array is required" });
  }
  const translated = await translateBatch(texts, {
    engine,
    sourceLang,
    geminiApiKey,
    deeplApiKey,
    libreUrl,
    libreApiKey
  });
  return {
    success: true,
    data: translated
  };
});

const translate_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: translate_post
}, Symbol.toStringTag, { value: 'Module' }));

const qrcode_get = defineEventHandler(() => {
  const ip = getLocalIP();
  const url = `http://${ip}:3000`;
  return {
    success: true,
    url,
    ip
  };
});

const qrcode_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: qrcode_get
}, Symbol.toStringTag, { value: 'Module' }));

const _filename__delete = defineEventHandler((event) => {
  const filename = getRouterParam(event, "filename");
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: "Filename is required" });
  }
  const success = deleteSharedFile(filename);
  if (success) {
    return { success: true, message: "File deleted" };
  } else {
    throw createError({ statusCode: 404, statusMessage: "File not found or failed to delete" });
  }
});

const _filename__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _filename__delete
}, Symbol.toStringTag, { value: 'Module' }));

const downloadZip_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filenames = (body == null ? void 0 : body.filenames) || [];
  if (!Array.isArray(filenames) || filenames.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Daftar nama file tidak valid atau kosong"
    });
  }
  const uploadDir = serverConfig.uploadDir;
  if (!fs.existsSync(uploadDir)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Direktori berkas terbagi tidak ditemukan"
    });
  }
  const zip = new AdmZip();
  let addedCount = 0;
  for (const filename of filenames) {
    const safeName = path.basename(filename);
    const filePath = path.join(uploadDir, safeName);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      zip.addLocalFile(filePath);
      addedCount++;
    }
  }
  if (addedCount === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Tidak ada berkas valid yang dapat dikemas ke ZIP"
    });
  }
  const zipBuffer = zip.toBuffer();
  setHeader(event, "Content-Type", "application/zip");
  setHeader(event, "Content-Disposition", 'attachment; filename="nexeo-shared-files.zip"');
  setHeader(event, "Content-Length", zipBuffer.length);
  return zipBuffer;
});

const downloadZip_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: downloadZip_post
}, Symbol.toStringTag, { value: 'Module' }));

const _filename__get = defineEventHandler((event) => {
  const filename = getRouterParam(event, "filename");
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: "Filename is required" });
  }
  const filePath = getSharedFilePath(filename);
  if (!filePath) {
    throw createError({ statusCode: 404, statusMessage: "File not found" });
  }
  setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);
  return sendStream(event, fs.createReadStream(filePath));
});

const _filename__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _filename__get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(() => {
  return listSharedFiles();
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const upload_post$2 = defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }
  const filePart = parts.find((p) => p.filename && p.data);
  if (!filePart || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file payload" });
  }
  const uploadDir = serverConfig.uploadDir;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const safeFilename = path.basename(filePart.filename);
  const targetPath = path.join(uploadDir, safeFilename);
  fs.writeFileSync(targetPath, filePart.data);
  return {
    success: true,
    message: "File uploaded successfully",
    filename: safeFilename
  };
});

const upload_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: upload_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const hasFfmpegBinary = typeof ffmpegStatic === "string" && fs.existsSync(ffmpegStatic);
if (hasFfmpegBinary && ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}
async function getOrGenerateThumbnail(videoPath) {
  try {
    if (!fs.existsSync(videoPath)) return null;
    if (!hasFfmpegBinary) {
      return null;
    }
    const thumbnailDir = serverConfig.video.thumbnailDir;
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }
    const hash = nodeCrypto.createHash("md5").update(videoPath).digest("hex");
    const thumbnailFileName = `${hash}.jpg`;
    const thumbnailPath = path.join(thumbnailDir, thumbnailFileName);
    if (fs.existsSync(thumbnailPath)) {
      return thumbnailPath;
    }
    const success = await new Promise((resolve) => {
      ffmpeg(videoPath).seekInput(3).frames(1).output(thumbnailPath).size("640x360").on("end", () => resolve(true)).on("error", (err) => {
        ffmpeg(videoPath).frames(1).output(thumbnailPath).size("640x360").on("end", () => resolve(true)).on("error", (retryErr) => {
          console.error("Thumbnail extraction error:", retryErr);
          resolve(false);
        }).run();
      }).run();
    });
    if (success && fs.existsSync(thumbnailPath)) {
      return thumbnailPath;
    }
  } catch (err) {
    console.error("getOrGenerateThumbnail error:", err);
  }
  return null;
}

const ____id__get$2 = defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, "id");
  if (!rawId) {
    throw createError({ statusCode: 400, statusMessage: "Thumbnail ID is required" });
  }
  const id = decodeURIComponent(rawId);
  const video = await getVideoById(id);
  if (video && video.path) {
    const thumbnailPath = await getOrGenerateThumbnail(video.path);
    if (thumbnailPath && fs.existsSync(thumbnailPath)) {
      setHeader(event, "Content-Type", "image/jpeg");
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return sendStream(event, fs.createReadStream(thumbnailPath));
    }
  }
  setHeader(event, "Content-Type", "image/svg+xml");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="#111827">
    <rect width="640" height="360" fill="#1f2937"/>
    <circle cx="320" cy="180" r="48" fill="#7c3aed" opacity="0.8"/>
    <polygon points="308,160 340,180 308,200" fill="#ffffff"/>
  </svg>`;
});

const ____id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ____id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$4 = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Thumbnail ID is required" });
  }
  const video = await getVideoById(id);
  if (video && video.path) {
    const thumbnailPath = await getOrGenerateThumbnail(video.path);
    if (thumbnailPath && fs.existsSync(thumbnailPath)) {
      setHeader(event, "Content-Type", "image/jpeg");
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return sendStream(event, fs.createReadStream(thumbnailPath));
    }
  }
  setHeader(event, "Content-Type", "image/svg+xml");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="#111827">
    <rect width="640" height="360" fill="#1f2937"/>
    <circle cx="320" cy="180" r="48" fill="#7c3aed" opacity="0.8"/>
    <polygon points="308,160 340,180 308,200" fill="#ffffff"/>
  </svg>`;
});

const _id__get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$4
}, Symbol.toStringTag, { value: 'Module' }));

const upload_post = defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
  }
  const filePart = parts.find((p) => p.filename && p.data);
  if (!filePart || !filePart.filename) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file payload" });
  }
  const uploadDir = serverConfig.uploadDir;
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const safeFilename = path.basename(filePart.filename);
  const targetPath = path.join(uploadDir, safeFilename);
  fs.writeFileSync(targetPath, filePart.data);
  return {
    success: true,
    message: "File uploaded successfully",
    filename: safeFilename
  };
});

const upload_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: upload_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$2 = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Video ID required" });
  }
  const video = await getVideoById(id);
  if (!video) {
    throw createError({ statusCode: 404, statusMessage: "Video not found" });
  }
  return video;
});

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const MIME_TYPES$1 = {
  ".mp4": "video/mp4",
  ".mkv": "video/x-matroska",
  ".webm": "video/webm",
  ".avi": "video/x-msvideo",
  ".mov": "video/quicktime",
  ".wmv": "video/x-ms-wmv",
  ".flv": "video/x-flv",
  ".m4v": "video/mp4",
  ".ts": "video/mp2t"
};
const stream_get = defineEventHandler(async (event) => {
  var _a;
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Video ID required" });
  }
  const video = await getVideoById(id);
  if (!video) {
    throw createError({ statusCode: 404, statusMessage: "Video not found" });
  }
  const filePath = video.path;
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: "Video file not found on disk" });
  }
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES$1[ext] || "application/octet-stream";
  const range = getRequestHeader(event, "range");
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt((_a = parts[0]) != null ? _a : "0", 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    setResponseStatus(event, 206);
    setHeader(event, "Content-Range", `bytes ${start}-${end}/${fileSize}`);
    setHeader(event, "Accept-Ranges", "bytes");
    setHeader(event, "Content-Length", chunkSize);
    setHeader(event, "Content-Type", contentType);
    return sendStream(event, fs.createReadStream(filePath, { start, end }));
  }
  setHeader(event, "Content-Length", fileSize);
  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Accept-Ranges", "bytes");
  return sendStream(event, fs.createReadStream(filePath));
});

const stream_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: stream_get
}, Symbol.toStringTag, { value: 'Module' }));

const categories_get = defineEventHandler(async () => {
  return await getVideoCategories();
});

const categories_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: categories_get
}, Symbol.toStringTag, { value: 'Module' }));

const folders_get = defineEventHandler(async (event) => {
  const categoryId = getRouterParam(event, "category") || "";
  return await getFoldersByCategory(categoryId);
});

const folders_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: folders_get
}, Symbol.toStringTag, { value: 'Module' }));

const videos_get = defineEventHandler(async (event) => {
  const folderName = getRouterParam(event, "folder") || "";
  const query = getQuery$1(event);
  const categoryId = typeof query.categoryId === "string" ? query.categoryId : "";
  return await getVideosByFolder(categoryId, folderName);
});

const videos_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: videos_get
}, Symbol.toStringTag, { value: 'Module' }));

const refresh_post = defineEventHandler(() => {
  invalidateVideoCache();
  return { success: true, message: "Video cache refreshed" };
});

const refresh_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: refresh_post
}, Symbol.toStringTag, { value: 'Module' }));

const search_get = defineEventHandler(async (event) => {
  const query = getQuery$1(event);
  const q = typeof query.q === "string" ? query.q : "";
  return await searchVideos(q);
});

const search_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: search_get
}, Symbol.toStringTag, { value: 'Module' }));

const ____id__get = defineEventHandler(async (event) => {
  const rawId = getRouterParam(event, "id");
  if (!rawId) {
    throw createError({ statusCode: 400, statusMessage: "Thumbnail ID is required" });
  }
  const id = decodeURIComponent(rawId);
  const video = await getVideoById(id);
  if (video && video.path) {
    const thumbnailPath = await getOrGenerateThumbnail(video.path);
    if (thumbnailPath && fs.existsSync(thumbnailPath)) {
      setHeader(event, "Content-Type", "image/jpeg");
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return sendStream(event, fs.createReadStream(thumbnailPath));
    }
  }
  setHeader(event, "Content-Type", "image/svg+xml");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="#111827">
    <rect width="640" height="360" fill="#1f2937"/>
    <circle cx="320" cy="180" r="48" fill="#7c3aed" opacity="0.8"/>
    <polygon points="308,160 340,180 308,200" fill="#ffffff"/>
  </svg>`;
});

const ____id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ____id__get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Thumbnail ID is required" });
  }
  const video = await getVideoById(id);
  if (video && video.path) {
    const thumbnailPath = await getOrGenerateThumbnail(video.path);
    if (thumbnailPath && fs.existsSync(thumbnailPath)) {
      setHeader(event, "Content-Type", "image/jpeg");
      setHeader(event, "Cache-Control", "public, max-age=86400");
      return sendStream(event, fs.createReadStream(thumbnailPath));
    }
  }
  setHeader(event, "Content-Type", "image/svg+xml");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="#111827">
    <rect width="640" height="360" fill="#1f2937"/>
    <circle cx="320" cy="180" r="48" fill="#7c3aed" opacity="0.8"/>
    <polygon points="308,160 340,180 308,200" fill="#ffffff"/>
  </svg>`;
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
async function ensureYtDlpBinary() {
  const binDir = path.join(process.cwd(), "bin");
  if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });
  const exePath = path.join(binDir, "yt-dlp.exe");
  if (fs.existsSync(exePath) && fs.statSync(exePath).size > 1e7) {
    return exePath;
  }
  const url = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe";
  const res = await axios({ method: "GET", url, responseType: "stream" });
  const writer = fs.createWriteStream(exePath);
  res.data.pipe(writer);
  await new Promise((resolve, reject) => {
    writer.on("finish", () => resolve());
    writer.on("error", reject);
  });
  return exePath;
}
async function getYoutubeMetadata(url) {
  const exePath = await ensureYtDlpBinary();
  return new Promise((resolve, reject) => {
    const args = [
      "-j",
      "--no-playlist",
      "--js-runtimes",
      "node",
      "--extractor-args",
      "youtube:player_client=mweb,ios",
      url
    ];
    const child = spawn(exePath, args);
    let stdoutData = "";
    let stderrData = "";
    child.stdout.on("data", (chunk) => {
      stdoutData += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderrData += chunk.toString();
    });
    child.on("close", (code) => {
      if (code !== 0 || !stdoutData.trim()) {
        return reject(new Error("Gagal mengambil metadata YouTube: " + (stderrData || "URL tidak valid")));
      }
      try {
        const json = JSON.parse(stdoutData);
        const durationSec = json.duration || 0;
        resolve({
          title: json.title || "YouTube Video",
          author: json.uploader || json.channel || "YouTube",
          durationSeconds: durationSec,
          durationFormatted: formatDuration(durationSec),
          description: json.description || "",
          thumbnailUrl: json.thumbnail || "",
          videoUrl: json.webpage_url || url
        });
      } catch (err) {
        reject(new Error("Gagal membaca format JSON metadata YouTube"));
      }
    });
  });
}
async function startYoutubeDownload(url, targetCategory = "youtube", customSubfolder = "") {
  var _a, _b;
  const meta = await getYoutubeMetadata(url);
  const exePath = await ensureYtDlpBinary();
  let baseDir = (_a = serverConfig.video.categories.find((c) => c.id === targetCategory)) == null ? void 0 : _a.path;
  if (!baseDir) {
    baseDir = ((_b = serverConfig.video.categories[0]) == null ? void 0 : _b.path) || serverConfig.uploadDir;
  }
  let destDir = baseDir;
  if (customSubfolder.trim()) {
    destDir = path.join(baseDir, customSubfolder.trim());
  }
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const sanitizedTitle = meta.title.replace(/["'/\\?%*:|"<>]/g, "_");
  const videoFileName = `${sanitizedTitle}.mp4`;
  const metaFileName = `${sanitizedTitle}.json`;
  const destVideoPath = path.join(destDir, videoFileName);
  const destMetaPath = path.join(destDir, metaFileName);
  try {
    fs.writeFileSync(destMetaPath, JSON.stringify({
      title: meta.title,
      author: meta.author,
      description: meta.description,
      durationSeconds: meta.durationSeconds,
      thumbnailUrl: meta.thumbnailUrl,
      videoUrl: meta.videoUrl,
      downloadedAt: (/* @__PURE__ */ new Date()).toISOString()
    }, null, 2));
  } catch {
  }
  const task = createDownloadTask(meta.title, { type: "youtube", url }, targetCategory);
  task.status = "downloading";
  saveTasksToFile();
  void (async () => {
    const args = [
      url,
      "-P",
      destDir,
      "-o",
      `${sanitizedTitle}.%(ext)s`,
      "--no-playlist",
      "--newline",
      "--js-runtimes",
      "node",
      "--extractor-args",
      "youtube:player_client=mweb,ios"
    ];
    const child = spawn(exePath, args);
    child.stdout.on("data", (data) => {
      const line = data.toString();
      const pctMatch = line.match(/\[download\]\s+(\d+\.\d+)%\s+of\s+~\s*([^\s]+)\s+at\s+([^\s]+)/) || line.match(/\[download\]\s+(\d+\.\d+)%/);
      if (pctMatch) {
        const pct = parseFloat(pctMatch[1]);
        task.status = "downloading";
        task.progress = Math.min(100, Math.round(pct));
        if (pctMatch[3]) {
          task.speedFormatted = pctMatch[3];
        }
        task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        saveTasksToFile();
      }
    });
    child.on("close", (code) => {
      if (code === 0) {
        task.status = "completed";
        task.progress = 100;
        task.speedFormatted = void 0;
        task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      } else {
        if (task.status !== "cancelled") {
          task.status = "failed";
          task.error = "yt-dlp process exited with code " + code;
          task.speedFormatted = void 0;
          task.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
        }
      }
      saveTasksToFile();
    });
  })();
  return {
    taskId: task.id,
    targetPath: destVideoPath
  };
}

const download_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url, targetCategory, customSubfolder } = body || {};
  if (!url || typeof url !== "string") {
    throw createError({ statusCode: 400, statusMessage: "URL YouTube wajib diisi" });
  }
  try {
    const result = await startYoutubeDownload(url, targetCategory || "youtube", customSubfolder || "");
    return { success: true, data: result };
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: (err == null ? void 0 : err.message) || "Gagal memulai unduhan video YouTube" });
  }
});

const download_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: download_post
}, Symbol.toStringTag, { value: 'Module' }));

const info_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { url } = body || {};
  if (!url || typeof url !== "string") {
    throw createError({ statusCode: 400, statusMessage: "URL YouTube wajib diisi" });
  }
  try {
    const meta = await getYoutubeMetadata(url);
    return { success: true, data: meta };
  } catch (err) {
    throw createError({ statusCode: 400, statusMessage: (err == null ? void 0 : err.message) || "Gagal mengambil informasi video YouTube" });
  }
});

const info_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: info_post
}, Symbol.toStringTag, { value: 'Module' }));

const ____path__get$2 = defineEventHandler((event) => {
  var _a;
  const relPath = (_a = event.context.params) == null ? void 0 : _a.path;
  if (!relPath) {
    throw createError({ statusCode: 404, statusMessage: "Path image not specified" });
  }
  const mangaDir = getMangaDir();
  const filePath = path.join(mangaDir, ...relPath.split("/"));
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: "Manga page image file not found" });
  }
  const ext = path.extname(filePath).toLowerCase();
  let contentType = "image/jpeg";
  if (ext === ".png") contentType = "image/png";
  else if (ext === ".webp") contentType = "image/webp";
  else if (ext === ".gif") contentType = "image/gif";
  setResponseHeader(event, "Content-Type", contentType);
  setResponseHeader(event, "Cache-Control", "public, max-age=86400");
  return fs.createReadStream(filePath);
});

const ____path__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ____path__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml"
};
const ____path__get = defineEventHandler((event) => {
  const rawPath = getRouterParam(event, "path");
  if (!rawPath) {
    throw createError({ statusCode: 400, statusMessage: "Path required" });
  }
  const safePath = path.normalize(decodeURIComponent(rawPath)).replace(/^(\.\.[\/\\])+/, "");
  const fullPath = path.join(serverConfig.novel.dir, safePath);
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    throw createError({ statusCode: 404, statusMessage: "Novel image not found" });
  }
  const ext = path.extname(fullPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Cache-Control", "public, max-age=86400");
  return sendStream(event, fs.createReadStream(fullPath));
});

const ____path__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: ____path__get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}

function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const PAYLOAD_BUILD_ID_PARAM = "_b";
const handler = defineRenderHandler((event) => {
	
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	
	const ssrContext = createSSRContext(event);
	
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		setSSRError(ssrContext, ssrError);
	}
	
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const payloadURL = new URL(ssrContext.url, "http://localhost");
		const url = payloadURL.pathname.slice(0, -`/${PAYLOAD_FILENAME}`.length) || "/";
		payloadURL.searchParams.delete(PAYLOAD_BUILD_ID_PARAM);
		ssrContext.url = url + payloadURL.search;
		event._path = event.node.req.url = ssrContext.url;
	}
	
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		
		
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	
	
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		
		
		
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		
		
		
		const dependencyOptions = ssrContext["~lazyHydratedModules"]?.size ? { exclude: ssrContext["~lazyHydratedModules"] } : undefined;
		const stylesheetHrefs = new Set(link.map((l) => l.href));
		ssrContext.head.push({ link: [...getPreloadLinks(ssrContext, renderer.rendererContext, dependencyOptions), ...getPrefetchLinks(ssrContext, renderer.rendererContext, dependencyOptions)].filter((l) => !stylesheetHrefs.has(l.href)) }, headEntryOptions);
		
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  }, {
			...headEntryOptions,
			
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			
			
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
