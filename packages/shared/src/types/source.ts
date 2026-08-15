// Source Plugin Types
export interface SourcePlugin {
  id: string;
  name: string;
  baseUrl: string;
  search(query: string): Promise<SourceSearchResult[]>;
  getChapters(novelUrl: string): Promise<SourceChapterLink[]>;
  getChapterContent(chapterUrl: string): Promise<SourceChapterPayload>;
}

export interface SourceSearchResult {
  id: string;
  title: string;
  author?: string;
  cover?: string;
  url: string;
}

export interface SourceChapterLink {
  id: string;
  title: string;
  number?: number;
  url: string;
}

export interface SourceChapterPayload {
  title: string;
  content: string;
  images?: string[];
  nextUrl?: string;
  prevUrl?: string;
}

export type TranslationProvider = 'google' | 'gemini' | 'deepl' | 'libretranslate';

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  provider: TranslationProvider;
}

export interface TranslationResult {
  original: string;
  translated: string;
  provider: TranslationProvider;
}
