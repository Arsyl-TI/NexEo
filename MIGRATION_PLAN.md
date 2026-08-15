# Migration Plan

## Overview
Refactor NexEo from a monolithic Vue + Vite + Express application into a Turborepo monorepo using pnpm workspaces, Nuxt 3, modular Express, PostgreSQL through Prisma, JSON repositories, shared contracts, and strict isolation between Video Player, Novel Scraper, and YouTube Downloader domains.

The migration is incremental: establish contracts and tests first, migrate one domain at a time, preserve endpoint and UI behavior, and delete legacy files only after replacement tests and builds pass. The current baseline is Vue 3 + Vite 8 + Vue Router + Pinia + Tailwind + Axios + Plyr, Express 5, filesystem JSON novel storage, video caches, and 54 passing frontend Vitest tests.

## Target Structure
```text
apps/
  frontend-nuxt/       # Nuxt 3 pages, domain components, Pinia stores
  backend-express/     # Express app, domain routers, controllers, services
packages/
  shared/              # TypeScript DTOs, interfaces, API contracts
  shared-ui/           # reusable Vue UI components only
prisma/                # migration location may be backend-owned
pnpm-workspace.yaml
turbo.json
```

## Types
Create `packages/shared/src/types/` with:
- `video.ts`: `VideoCategory`, `VideoFolder`, `VideoItem`, `VideoSourceConfig`.
- `novel.ts`: `NovelLibraryItem`, `NovelMetadata`, `NovelChapter`, `NovelChapterIndex`, `MasterIndexEntry`, `NovelImportPayload`.
- `downloader.ts`: `DownloadTask`, `DownloadTaskStatus`, `DownloadSource`, `DownloadQueueItem`.
- `files.ts`: `SharedFileEntry`, `UploadResult`, `DeleteFileResult`.
- `source.ts`: `SourcePlugin`, `SourceSearchResult`, `SourceChapterLink`, `SourceChapterPayload`, `TranslationProvider`.
- `api.ts`: generic `ApiSuccessResponse<T>`, `ApiErrorResponse`, `PaginationMeta`.

Use strict nullability and explicit optional fields. Define JSON contracts before converting parsers: `master_index.json`, `metadata.json`, chapter JSON, video cache entries, and shared-file listings. Validate untrusted scraper/request data at runtime (Zod may be introduced if needed), while TypeScript remains the compile-time contract.

## Files

### New workspace files
- `D:\MyProject\NexEo\pnpm-workspace.yaml`: include `apps/*` and `packages/*`.
- `D:\MyProject\NexEo\turbo.json`: pipelines for `dev`, `build`, `test`, `typecheck`, `lint`; build depends on dependencies and caches outputs.
- `D:\MyProject\NexEo\apps\frontend-nuxt\package.json`: Nuxt, Pinia integration, Axios, Tailwind, Plyr, Vitest.
- `D:\MyProject\NexEo\apps\backend-express\package.json`: Express, TypeScript, Prisma, Vitest, Supertest, runtime TS tooling.
- `D:\MyProject\NexEo\packages\shared\package.json` and `src/index.ts`: shared type exports.
- `D:\MyProject\NexEo\packages\shared-ui\package.json`, `src/index.ts`, and `src/components/`: reusable UI exports.

### Nuxt frontend files
Create `apps/frontend-nuxt/nuxt.config.ts`, `app.vue`, `layouts/default.vue`, `plugins/pinia.ts`, `plugins/axios.ts`, `composables/useApi.ts`, and `composables/useToast.ts`.

Map existing manual routes to pages:
- `pages/index.vue` <- `VideoHome.vue`
- `pages/video/[id].vue` <- `VideoPlayer.vue`
- `pages/share.vue` <- `FileShare.vue`
- `pages/novels/index.vue` <- `NovelLibrary.vue`
- `pages/novels/[slug]/index.vue` <- `NovelDetail.vue`
- `pages/novels/[slug]/[chapter].vue` <- `NovelReader.vue`
- `pages/novel-browser.vue` <- `NovelBrowser.vue`

Use stores only under domain namespaces: `stores/video/`, `stores/novel/`, and `stores/downloader/`. Shared UI belongs in `packages/shared-ui`; app-specific components stay in the relevant domain folder.

### Express files
Create `apps/backend-express/src/app.ts`, `server.ts`, `config/index.ts`, `db/prisma.ts`, and domain folders:
```text
src/domains/video/{routes,controllers,services,repositories,types}/
src/domains/novel/{routes,controllers,services,repositories,sources,types}/
src/domains/downloader/{routes,controllers,services,repositories,types}/
src/domains/shared-files/{routes,controllers,services,repositories,types}/
```
Create `prisma/schema.prisma` for relational entities and keep JSON filesystem access behind repositories during transition.

### Existing files to migrate
- `D:\MyProject\NexEo\server.js`: split bootstrap, middleware, cache, and endpoints into domain routers.
- `D:\MyProject\NexEo\config.js`: typed environment/config module.
- `D:\MyProject\NexEo\server\sources\*.js`: move to Novel domain and convert to TypeScript.
- `D:\MyProject\NexEo\server\services\ScraperService.js`: move to Novel services and type all inputs/outputs.
- `D:\MyProject\NexEo\scripts\epub_importer.js`, `catalog_scraper.js`, `mass_scraper.js`, `translator.js`: migrate after shared contracts and service boundaries exist.
- `D:\MyProject\NexEo\frontend\src\store\*.js`: migrate to scoped Nuxt Pinia stores.
- `D:\MyProject\NexEo\frontend\src\views\*.vue`: migrate page by page.
- `D:\MyProject\NexEo\frontend\src\router\index.js`: retire only after Nuxt routes pass.

Do not modify generated `public/assets` during source migration except through the approved build process.

## Functions

### New functions
- `createNuxtApiClient()` in `apps/frontend-nuxt/composables/useApi.ts`: typed Axios instance.
- `buildVideoRoutes()` in `apps/backend-express/src/domains/video/routes/index.ts`.
- `buildNovelRoutes()` in `apps/backend-express/src/domains/novel/routes/index.ts`.
- `buildDownloaderRoutes()` in `apps/backend-express/src/domains/downloader/routes/index.ts`.
- `buildSharedFileRoutes()` in `apps/backend-express/src/domains/shared-files/routes/index.ts`.
- `readMasterIndex()`, `readNovelMetadata()`, `writeMasterIndex()` in Novel repository.
- `normalizeVideoCatalog()` in Video service.
- `registerSourcePlugin()` and `resolveSource()` in Novel source registry.

### Functions to migrate/refactor
- `getLocalNovelLibrary()` and `refreshCache()` from `server.js`: split into domain services and repository functions with test coverage.
- `getLocalIP()`: move to backend utility module.
- `importEpub()`, `translateBatch()`: add strict payload interfaces.
- Frontend store actions: migrate to scoped TypeScript stores.

### Removed functions (after replacement)
- Manual route registration in `frontend/src/router/index.js`.
- SPA fallback route in `server.js` once Nuxt deployment is configured.

## Classes

### New classes/services (composition-based)
- `NovelSourceRegistry` in `apps/backend-express/src/domains/novel/services/SourceRegistry.ts`.
- `PrismaNovelRepository` and `PrismaVideoRepository` in `apps/backend-express/src/domains/.../repositories/`.
- `VideoCatalogService` and `DownloadQueueService` in respective domain folders.

### Migration notes
- Backend keeps service functions modular but may introduce lightweight classes for registries/repositories if DI helps testability.
- No class-based inheritance in shared packages; prefer interfaces plus factory functions.

## Dependencies

### Root / workspaces
- Add `turbo`, enable pnpm workspaces via `pnpm-workspace.yaml`, add pnpm lockfile (`.gitignore` compatible).

### Frontend Nuxt 3
- `nuxt`, `@pinia/nuxt`, `@nuxtjs/tailwindcss`, keep `pinia`, `axios`, `plyr`, `tailwindcss`, `@vue/test-utils`, `vitest`. Match versions to current frontend set.

### Backend Express
- `typescript`, `tsx`, `prisma`, `@prisma/client`, `supertest`, `vitest`. Keep existing runtime deps (express, cheerio, fluent-ffmpeg, multer, etc.).

### Shared packages
- `vue` as a peer dependency for `shared-ui`; no heavy runtime dependencies.

### Integration requirements
- Ensure Prisma generate runs before backend typecheck/build.
- Align Vue/peer dependency versions across Nuxt and shared-ui.
- Preserve current Tailwind config approach in Nuxt.

## Testing

### Pre-condition (preserve current tests)
- Keep all 54 existing frontend Vitest tests passing through every phase.
- Run `npm run test` (frontend) or equivalent pnpm script to re-validate before deletion of legacy files.

### Guard tests required before refactor steps
Write tests for:
- Video catalog normalization and folder/category grouping.
- Novel library parsing from `master_index.json`, `metadata.json`, and chapter JSON.
- Novel chapter ordering, ID parsing, and resume progress.
- Novel source plugin interface conformance.
- File-share upload/list/delete response shapes.
- All former Vue Router paths (now Nuxt routes) resolve.

### Backend test additions
- Repository unit tests for JSON and Prisma access.
- Supertest integration tests per domain router.
- Migration validation tests for schema changes.

### Validation strategy
- Run Vitest suites at every milestone.
- Run `pnpm turbo run build` and `pnpm turbo run test` before legacy folder retirement.
- Use `git diff` after each task to ensure domain isolation; revert cross-domain contamination immediately.

## AI Isolation Rules (Kacamata Kuda)

1. Each migration task is scoped to ONE domain: Video, Novel, Downloader, or Shared UI.
2. A subagent assigned to the Novel domain MUST NOT import from or edit files in Video or Downloader folders.
3. Before completion, run `git diff --stat` and confirm changed files belong only to the assigned domain.
4. If a cross-domain dependency is required (shared types, shared UI), it MUST live in `packages/shared` or `packages/shared-ui` and be consumed via dependency imports—NOT via relative paths across domains.
5. Violations are treated as failed tasks; offending changes are reverted and the agent must re-run with corrected scoping.

## Implementation Order
1. Create `pnpm-workspace.yaml`, `turbo.json`, and workspace scaffolding; lock down domains.
2. Define shared type contracts in `packages/shared` and write guard tests.
3. Migrate Nuxt frontend scaffolding; ensure all current routes exist as Nuxt pages.
4. Move reusable UI primitives into `packages/shared-ui`; add component tests.
5. Split `server.js` into domain routers while keeping endpoints identical.
6. Convert novel domain to TypeScript; enforce novel-only file access.
7. Convert video domain to TypeScript; enforce video-only file access.
8. Convert downloader domain to TypeScript; enforce downloader-only file access.
9. Introduce Prisma schema and repositories; migrate storage as planned.
10. Migrate legacy scripts (`epub_importer`, `mass_scraper`, `translator`, `catalog_scraper`) using shared contracts.
11. Retire legacy `frontend/src/router` and `frontend/src/main.js` after Nuxt parity.
12. Final regression: run full Vitest suite, full build, and `git diff` isolation check.