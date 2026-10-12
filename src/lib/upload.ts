import { api } from './api';
import { rememberFileUrl } from './files';

export interface UploadedFile {
  key: string;
  url: string;
  originalName: string;
}

/**
 * Uploads a single file to POST /api/v1/upload and returns the stored
 * `key` (storage path) and `url` (access URL) for the uploaded asset.
 */
export async function uploadFile(file: File): Promise<UploadedFile> {
  const formData = new FormData();
  formData.append('file', file);
  const r: any = await api.postFormData('/upload', formData);
  const f = (r?.data?.file ?? r?.file) as
    | { key?: string; url?: string; originalName?: string }
    | undefined;
  const uploaded: UploadedFile = {
    key: f?.key ?? '',
    url: f?.url ?? '',
    originalName: f?.originalName ?? file.name,
  };
  // Keep the signed URL: profile endpoints only store the key, and previews
  // must go through this URL (the raw key 403s against the private bucket).
  rememberFileUrl(uploaded.key, uploaded.url);
  return uploaded;
}
