export interface MangaChapter {
  id: string
  title: string
  file: string
  chapterNumber?: number
  pageCount?: number
  pages?: string[]
}

export interface MangaItem {
  id: string
  slug: string
  title: string
  author?: string
  cover?: string
  description?: string
  tags?: string[]
  chapterCount: number
  chapters?: MangaChapter[]
}
