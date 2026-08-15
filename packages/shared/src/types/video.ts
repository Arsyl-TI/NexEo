// Video Types
export interface VideoCategory {
  id: string;
  name: string;
  folder: string;
  path: string;
  icon?: string;
  videoCount?: number;
}

export interface VideoFolder {
  id: string;
  name: string;
  path: string;
  categoryId: string;
  videoCount?: number;
  coverId?: string;
  hasCoverThumbnail?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  path: string;
  thumbnail?: string;
  duration?: string;
  folderId: string;
  categoryId: string;
  folder?: string;
  name?: string;
  size?: number;
  sizeFormatted?: string;
  format?: string;
  hasThumbnail?: boolean;
  description?: string;
  author?: string;
}

export interface VideoSourceConfig {
  category: string;
  folder: string;
  path: string;
}
