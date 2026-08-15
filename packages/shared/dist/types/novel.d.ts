export interface NovelLibraryItem {
    id: string;
    slug: string;
    title: string;
    author?: string;
    cover?: string;
    localThumbnail?: string;
    thumbnail?: string | null;
    tags?: string[];
    updatedAt?: string;
    folderName?: string;
    chapterCount?: number;
    chapters?: number;
    description?: string;
    sourceUrl?: string;
}
export interface NovelSource {
    id: string;
    name: string;
    url?: string;
}
export interface NovelExternal {
    slug: string;
    title: string;
    author?: string;
    cover?: string;
    tags?: string[];
    sourceUrl?: string;
}
export interface NovelDetail extends NovelExternal {
    description?: string;
    chapters?: NovelChapter[];
    status?: string;
    language?: string;
    type?: string;
}
export interface NovelMetadata {
    title: string;
    author?: string;
    tags: string[];
    coverUrl?: string;
    description?: string;
    sourceUrl?: string;
}
export interface NovelChapter {
    id: string;
    title: string;
    number?: number;
    url?: string;
    file?: string;
    content?: string;
    translated?: boolean;
    translationProvider?: string;
}
export interface NovelChapterIndex {
    chapterId: string;
    title: string;
    number?: number;
    url?: string;
}
export interface MasterIndexEntry {
    id: string | number;
    title: string;
    file?: string;
    number?: number;
    url?: string;
}
export interface NovelImportPayload {
    slug: string;
    title: string;
    author?: string;
    chapters: NovelChapter[];
    metadata: NovelMetadata;
}
//# sourceMappingURL=novel.d.ts.map