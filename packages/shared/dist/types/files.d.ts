export interface SharedFileEntry {
    name: string;
    size: number;
    sizeFormatted: string;
    modified: string;
}
export interface UploadResult {
    success: boolean;
    message?: string;
    filename?: string;
}
export interface DeleteFileResult {
    success: boolean;
    message?: string;
}
//# sourceMappingURL=files.d.ts.map