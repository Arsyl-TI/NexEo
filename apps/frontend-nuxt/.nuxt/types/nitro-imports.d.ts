declare global {
  const H3Error: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').H3Error
  const H3Event: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').H3Event
  const NOVEL_SOURCES: typeof import('../../server/utils/novel/catalogScraper').NOVEL_SOURCES
  const NovelServerRepository: typeof import('../../server/utils/novel').NovelServerRepository
  const __buildAssetsURL: typeof import('../../../../node_modules/.pnpm/@nuxt+nitro-server@3.21.11__ab6b34050c574ac4ae20c7ed2556094e/node_modules/@nuxt/nitro-server/dist/runtime/utils/paths').buildAssetsURL
  const __publicAssetsURL: typeof import('../../../../node_modules/.pnpm/@nuxt+nitro-server@3.21.11__ab6b34050c574ac4ae20c7ed2556094e/node_modules/@nuxt/nitro-server/dist/runtime/utils/paths').publicAssetsURL
  const appendCorsHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').appendCorsHeaders
  const appendCorsPreflightHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').appendCorsPreflightHeaders
  const appendHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').appendHeader
  const appendHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').appendHeaders
  const appendResponseHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').appendResponseHeader
  const appendResponseHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').appendResponseHeaders
  const assertMethod: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').assertMethod
  const cachedEventHandler: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/cache').cachedEventHandler
  const cachedFunction: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/cache').cachedFunction
  const callNodeListener: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').callNodeListener
  const cancelDownloadTask: typeof import('../../server/utils/downloader').cancelDownloadTask
  const clearResponseHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').clearResponseHeaders
  const clearSession: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').clearSession
  const createApp: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').createApp
  const createAppEventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').createAppEventHandler
  const createDownloadTask: typeof import('../../server/utils/downloader').createDownloadTask
  const createError: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').createError
  const createEvent: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').createEvent
  const createEventStream: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').createEventStream
  const createRouter: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').createRouter
  const defaultContentType: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defaultContentType
  const defineAppConfig: typeof import('../../../../node_modules/.pnpm/@nuxt+nitro-server@3.21.11__ab6b34050c574ac4ae20c7ed2556094e/node_modules/@nuxt/nitro-server/dist/runtime/utils/config').defineAppConfig
  const defineCachedEventHandler: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/cache').defineCachedEventHandler
  const defineCachedFunction: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/cache').defineCachedFunction
  const defineEventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineEventHandler
  const defineLazyEventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineLazyEventHandler
  const defineNitroErrorHandler: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/error/utils').defineNitroErrorHandler
  const defineNitroPlugin: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/plugin').defineNitroPlugin
  const defineNodeListener: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineNodeListener
  const defineNodeMiddleware: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineNodeMiddleware
  const defineRenderHandler: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/renderer').defineRenderHandler
  const defineRequestMiddleware: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineRequestMiddleware
  const defineResponseMiddleware: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineResponseMiddleware
  const defineRouteMeta: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/meta').defineRouteMeta
  const defineTask: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/task').defineTask
  const defineWebSocket: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineWebSocket
  const defineWebSocketHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').defineWebSocketHandler
  const deleteCookie: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').deleteCookie
  const deleteDownloadTask: typeof import('../../server/utils/downloader').deleteDownloadTask
  const deleteSharedFile: typeof import('../../server/utils/sharedFiles').deleteSharedFile
  const dynamicEventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').dynamicEventHandler
  const ensureYtDlpBinary: typeof import('../../server/utils/youtubeDownloader').ensureYtDlpBinary
  const eventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').eventHandler
  const fetchWithEvent: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').fetchWithEvent
  const formatFileSize: typeof import('../../server/utils/config').formatFileSize
  const fromNodeMiddleware: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').fromNodeMiddleware
  const fromPlainHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').fromPlainHandler
  const fromWebHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').fromWebHandler
  const getCookie: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getCookie
  const getDownloadTasks: typeof import('../../server/utils/downloader').getDownloadTasks
  const getFoldersByCategory: typeof import('../../server/utils/video').getFoldersByCategory
  const getHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getHeader
  const getHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getHeaders
  const getLocalChapterContent: typeof import('../../server/utils/novel').getLocalChapterContent
  const getLocalChapters: typeof import('../../server/utils/novel').getLocalChapters
  const getLocalIP: typeof import('../../server/utils/network').getLocalIP
  const getLocalMangaChapters: typeof import('../../server/utils/manga').getLocalMangaChapters
  const getLocalMangaDetail: typeof import('../../server/utils/manga').getLocalMangaDetail
  const getLocalNovel: typeof import('../../server/utils/novel').getLocalNovel
  const getMangaChapterPages: typeof import('../../server/utils/manga').getMangaChapterPages
  const getMangaDir: typeof import('../../server/utils/manga').getMangaDir
  const getMethod: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getMethod
  const getOrGenerateThumbnail: typeof import('../../server/utils/thumbnail').getOrGenerateThumbnail
  const getProxyRequestHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getProxyRequestHeaders
  const getQuery: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getQuery
  const getRequestFingerprint: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestFingerprint
  const getRequestHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestHeader
  const getRequestHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestHeaders
  const getRequestHost: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestHost
  const getRequestIP: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestIP
  const getRequestPath: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestPath
  const getRequestProtocol: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestProtocol
  const getRequestURL: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestURL
  const getRequestWebStream: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRequestWebStream
  const getResponseHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getResponseHeader
  const getResponseHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getResponseHeaders
  const getResponseStatus: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getResponseStatus
  const getResponseStatusText: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getResponseStatusText
  const getRouteRules: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/route-rules').getRouteRules
  const getRouterParam: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRouterParam
  const getRouterParams: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getRouterParams
  const getSession: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getSession
  const getSharedFilePath: typeof import('../../server/utils/sharedFiles').getSharedFilePath
  const getSourceCatalog: typeof import('../../server/utils/novel/catalogScraper').getSourceCatalog
  const getValidatedQuery: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getValidatedQuery
  const getValidatedRouterParams: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').getValidatedRouterParams
  const getVideoById: typeof import('../../server/utils/video').getVideoById
  const getVideoCategories: typeof import('../../server/utils/video').getVideoCategories
  const getVideosByFolder: typeof import('../../server/utils/video').getVideosByFolder
  const getYoutubeMetadata: typeof import('../../server/utils/youtubeDownloader').getYoutubeMetadata
  const handleCacheHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').handleCacheHeaders
  const handleCors: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').handleCors
  const importEpubFile: typeof import('../../server/utils/novel/epubImporter').importEpubFile
  const importNovelFromSource: typeof import('../../server/utils/novel/massScraper').importNovelFromSource
  const invalidateVideoCache: typeof import('../../server/utils/video').invalidateVideoCache
  const isCorsOriginAllowed: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isCorsOriginAllowed
  const isError: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isError
  const isEvent: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isEvent
  const isEventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isEventHandler
  const isMethod: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isMethod
  const isPreflightRequest: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isPreflightRequest
  const isStream: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isStream
  const isWebResponse: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').isWebResponse
  const lazyEventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').lazyEventHandler
  const listLocalManga: typeof import('../../server/utils/manga').listLocalManga
  const listLocalNovels: typeof import('../../server/utils/novel').listLocalNovels
  const listSharedFiles: typeof import('../../server/utils/sharedFiles').listSharedFiles
  const nitroPlugin: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/plugin').nitroPlugin
  const novelServerRepo: typeof import('../../server/utils/novel').novelServerRepo
  const parseCookies: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').parseCookies
  const promisifyNodeListener: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').promisifyNodeListener
  const proxyRequest: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').proxyRequest
  const readBody: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').readBody
  const readFormData: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').readFormData
  const readMultipartFormData: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').readMultipartFormData
  const readRawBody: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').readRawBody
  const readValidatedBody: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').readValidatedBody
  const removeResponseHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').removeResponseHeader
  const runTask: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/task').runTask
  const sanitizeStatusCode: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sanitizeStatusCode
  const sanitizeStatusMessage: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sanitizeStatusMessage
  const saveTasksToFile: typeof import('../../server/utils/downloader').saveTasksToFile
  const scanVideos: typeof import('../../server/utils/video').scanVideos
  const scrapeDreamyCatalog: typeof import('../../server/utils/novel/catalogScraper').scrapeDreamyCatalog
  const scrapeDreamyNovelDetail: typeof import('../../server/utils/novel/catalogScraper').scrapeDreamyNovelDetail
  const scrapeNoveldexCatalog: typeof import('../../server/utils/novel/catalogScraper').scrapeNoveldexCatalog
  const scrapeNoveldexNovelDetail: typeof import('../../server/utils/novel/catalogScraper').scrapeNoveldexNovelDetail
  const sealSession: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sealSession
  const searchVideos: typeof import('../../server/utils/video').searchVideos
  const send: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').send
  const sendError: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sendError
  const sendIterable: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sendIterable
  const sendNoContent: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sendNoContent
  const sendProxy: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sendProxy
  const sendRedirect: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sendRedirect
  const sendStream: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sendStream
  const sendWebResponse: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').sendWebResponse
  const serveStatic: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').serveStatic
  const serverConfig: typeof import('../../server/utils/config').serverConfig
  const setCookie: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').setCookie
  const setHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').setHeader
  const setHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').setHeaders
  const setResponseHeader: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').setResponseHeader
  const setResponseHeaders: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').setResponseHeaders
  const setResponseStatus: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').setResponseStatus
  const splitCookiesString: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').splitCookiesString
  const startYoutubeDownload: typeof import('../../server/utils/youtubeDownloader').startYoutubeDownload
  const toEventHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').toEventHandler
  const toNodeListener: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').toNodeListener
  const toPlainHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').toPlainHandler
  const toWebHandler: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').toWebHandler
  const toWebRequest: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').toWebRequest
  const translateBatch: typeof import('../../server/utils/novel/translator').translateBatch
  const translateBatchDeepL: typeof import('../../server/utils/novel/translator').translateBatchDeepL
  const translateBatchGoogle: typeof import('../../server/utils/novel/translator').translateBatchGoogle
  const translateBatchLibre: typeof import('../../server/utils/novel/translator').translateBatchLibre
  const translateWithGemini: typeof import('../../server/utils/novel/translator').translateWithGemini
  const unsealSession: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').unsealSession
  const updateSession: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').updateSession
  const useAppConfig: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/config').useAppConfig
  const useBase: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').useBase
  const useEvent: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/context').useEvent
  const useNitroApp: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/app').useNitroApp
  const useRuntimeConfig: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/config').useRuntimeConfig
  const useSession: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').useSession
  const useStorage: typeof import('../../../../node_modules/.pnpm/nitropack@2.13.4_oxc-parser_29676ebf26610b0896453b821c788422/node_modules/nitropack/dist/runtime/internal/storage').useStorage
  const writeEarlyHints: typeof import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3').writeEarlyHints
}
// for type re-export
declare global {
  // @ts-ignore
  export type { EventHandler, EventHandlerRequest, EventHandlerResponse, EventHandlerObject, H3EventContext } from '../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3'
  import('../../../../node_modules/.pnpm/h3@1.15.11/node_modules/h3')
  // @ts-ignore
  export type { VideoCategoryConfig, VideoConfig, NovelConfig, MangaConfig, ServerConfig } from '../../server/utils/config'
  import('../../server/utils/config')
  // @ts-ignore
  export type { NovelServerRepository, LocalChapter, NovelDetail } from '../../server/utils/novel'
  import('../../server/utils/novel')
  // @ts-ignore
  export type { NovelSource, CatalogNovel } from '../../server/utils/novel/catalogScraper'
  import('../../server/utils/novel/catalogScraper')
  // @ts-ignore
  export type { EpubImportResult } from '../../server/utils/novel/epubImporter'
  import('../../server/utils/novel/epubImporter')
  // @ts-ignore
  export type { MassImportOptions, ImportResult } from '../../server/utils/novel/massScraper'
  import('../../server/utils/novel/massScraper')
  // @ts-ignore
  export type { TranslationEngine, TranslationConfig } from '../../server/utils/novel/translator'
  import('../../server/utils/novel/translator')
  // @ts-ignore
  export type { VideoScanResult } from '../../server/utils/video'
  import('../../server/utils/video')
  // @ts-ignore
  export type { YoutubeVideoMetadata } from '../../server/utils/youtubeDownloader'
  import('../../server/utils/youtubeDownloader')
}
export { H3Event, H3Error, appendCorsHeaders, appendCorsPreflightHeaders, appendHeader, appendHeaders, appendResponseHeader, appendResponseHeaders, assertMethod, callNodeListener, clearResponseHeaders, clearSession, createApp, createAppEventHandler, createError, createEvent, createEventStream, createRouter, defaultContentType, defineEventHandler, defineLazyEventHandler, defineNodeListener, defineNodeMiddleware, defineRequestMiddleware, defineResponseMiddleware, defineWebSocket, defineWebSocketHandler, deleteCookie, dynamicEventHandler, eventHandler, fetchWithEvent, fromNodeMiddleware, fromPlainHandler, fromWebHandler, getCookie, getHeader, getHeaders, getMethod, getProxyRequestHeaders, getQuery, getRequestFingerprint, getRequestHeader, getRequestHeaders, getRequestHost, getRequestIP, getRequestPath, getRequestProtocol, getRequestURL, getRequestWebStream, getResponseHeader, getResponseHeaders, getResponseStatus, getResponseStatusText, getRouterParam, getRouterParams, getSession, getValidatedQuery, getValidatedRouterParams, handleCacheHeaders, handleCors, isCorsOriginAllowed, isError, isEvent, isEventHandler, isMethod, isPreflightRequest, isStream, isWebResponse, lazyEventHandler, parseCookies, promisifyNodeListener, proxyRequest, readBody, readFormData, readMultipartFormData, readRawBody, readValidatedBody, removeResponseHeader, sanitizeStatusCode, sanitizeStatusMessage, sealSession, send, sendError, sendIterable, sendNoContent, sendProxy, sendRedirect, sendStream, sendWebResponse, serveStatic, setCookie, setHeader, setHeaders, setResponseHeader, setResponseHeaders, setResponseStatus, splitCookiesString, toEventHandler, toNodeListener, toPlainHandler, toWebHandler, toWebRequest, unsealSession, updateSession, useBase, useSession, writeEarlyHints } from 'h3';
export { useNitroApp } from 'nitropack/runtime/internal/app';
export { useRuntimeConfig, useAppConfig } from 'nitropack/runtime/internal/config';
export { defineNitroPlugin, nitroPlugin } from 'nitropack/runtime/internal/plugin';
export { defineCachedFunction, defineCachedEventHandler, cachedFunction, cachedEventHandler } from 'nitropack/runtime/internal/cache';
export { useStorage } from 'nitropack/runtime/internal/storage';
export { defineRenderHandler } from 'nitropack/runtime/internal/renderer';
export { defineRouteMeta } from 'nitropack/runtime/internal/meta';
export { getRouteRules } from 'nitropack/runtime/internal/route-rules';
export { useEvent } from 'nitropack/runtime/internal/context';
export { defineTask, runTask } from 'nitropack/runtime/internal/task';
export { defineNitroErrorHandler } from 'nitropack/runtime/internal/error/utils';
export { buildAssetsURL as __buildAssetsURL, publicAssetsURL as __publicAssetsURL } from 'D:/MyProject/NexEo/node_modules/.pnpm/@nuxt+nitro-server@3.21.11__ab6b34050c574ac4ae20c7ed2556094e/node_modules/@nuxt/nitro-server/dist/runtime/utils/paths';
export { defineAppConfig } from 'D:/MyProject/NexEo/node_modules/.pnpm/@nuxt+nitro-server@3.21.11__ab6b34050c574ac4ae20c7ed2556094e/node_modules/@nuxt/nitro-server/dist/runtime/utils/config';
export { serverConfig, formatFileSize } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/config';
export { saveTasksToFile, getDownloadTasks, createDownloadTask, cancelDownloadTask, deleteDownloadTask } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/downloader';
export { getMangaDir, listLocalManga, getLocalMangaDetail, getLocalMangaChapters, getMangaChapterPages } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/manga';
export { getLocalIP } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/network';
export { NovelServerRepository, novelServerRepo, listLocalNovels, getLocalNovel, getLocalChapters, getLocalChapterContent } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/novel';
export { NOVEL_SOURCES, scrapeDreamyCatalog, scrapeDreamyNovelDetail, scrapeNoveldexCatalog, scrapeNoveldexNovelDetail, getSourceCatalog } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/novel/catalogScraper';
export { importEpubFile } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/novel/epubImporter';
export { importNovelFromSource } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/novel/massScraper';
export { translateWithGemini, translateBatchDeepL, translateBatchLibre, translateBatchGoogle, translateBatch } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/novel/translator';
export { listSharedFiles, getSharedFilePath, deleteSharedFile } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/sharedFiles';
export { getOrGenerateThumbnail } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/thumbnail';
export { scanVideos, getVideoCategories, getFoldersByCategory, getVideosByFolder, getVideoById, searchVideos, invalidateVideoCache } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/video';
export { ensureYtDlpBinary, getYoutubeMetadata, startYoutubeDownload } from 'D:/MyProject/NexEo/apps/frontend-nuxt/server/utils/youtubeDownloader';