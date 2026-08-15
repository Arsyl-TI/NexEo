// Downloader Types
export interface DownloadTask {
  id: string;
  title: string;
  source: DownloadSource;
  status: DownloadTaskStatus;
  progress: number;
  total?: number;
  downloadedBytes?: number;
  totalBytes?: number;
  speedFormatted?: string;
  targetFolder?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export type DownloadTaskStatus = 'pending' | 'downloading' | 'completed' | 'failed' | 'cancelled';

export interface DownloadSource {
  type: 'novel' | 'video' | 'episode' | 'file' | 'youtube';
  url: string;
  provider?: string;
}

export interface DownloadQueueItem {
  taskId: string;
  source: DownloadSource;
  options?: Record<string, unknown>;
}
