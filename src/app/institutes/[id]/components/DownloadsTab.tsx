'use client';

import { useState } from 'react';
import { ArrowLeft, FileText, Download, FolderOpen } from 'lucide-react';
import { DOWNLOAD_ALBUMS } from '../../data';

export interface DownloadFile {
  name: string;
  format: string;
  size: string;
  updated: string;
}

type Downloads = Record<string, DownloadFile[]>;

/**
 * Downloadable resources rendered as a catalog: seven resource albums in a
 * grid, each opening into its own file list — the same pattern as the media
 * gallery.
 */
export default function DownloadsTab({ downloads }: { downloads?: Downloads }) {
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);

  const albums = DOWNLOAD_ALBUMS.map(a => ({ ...a, files: downloads?.[a.key] || [] }));
  const totalFiles = albums.reduce((sum, a) => sum + a.files.length, 0);
  const filledAlbums = albums.filter(a => a.files.length > 0).length;

  const active = albums.find(a => a.key === openAlbum);

  if (active) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => setOpenAlbum(null)}
            className="flex items-center gap-1.5 text-sm text-brand-red-600 hover:text-brand-red-700 font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> All Resources
          </button>
          <span className="text-neutral-gray-light">|</span>
          <h3 className="text-lg font-bold text-neutral-black">{active.label}</h3>
          <span className="text-xs text-neutral-gray-medium ml-auto">
            {active.files.length} {active.files.length === 1 ? 'file' : 'files'}
          </span>
        </div>

        {active.files.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-gray-light">
            <FolderOpen className="h-12 w-12 text-neutral-gray-light mx-auto mb-4" />
            <p className="text-neutral-gray-medium">No files in this album yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {active.files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-4 rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm hover:border-brand-red-100 transition-colors">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-brand-red-100 text-brand-red-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-black truncate">{file.name}</p>
                  <p className="text-xs text-neutral-gray-medium">
                    {file.format} · {file.size} · Updated {file.updated}
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg bg-brand-navy-900 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-navy-800 transition-colors cursor-pointer"
                  onClick={() => setOpenAlbum(null)}
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-neutral-black flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-brand-red-600" /> Downloadable Resources
        </h3>
        <span className="text-xs text-neutral-gray-medium">
          {totalFiles} files · {filledAlbums} of {albums.length} albums
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {albums.map((album) => (
          <button
            key={album.key}
            onClick={() => setOpenAlbum(album.key)}
            className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-gray-light bg-gradient-to-br from-brand-navy-900 to-brand-navy-800 hover:shadow-lg hover:border-brand-red-600/40 transition-all text-left cursor-pointer"
          >
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm">
              <FileText className="h-5 w-5" />
            </div>

            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 text-white rounded-full px-2 py-1 backdrop-blur-sm">
              <FileText className="h-3 w-3" />
              <span className="text-[10px] font-bold">{album.files.length}</span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-3 z-10">
              <p className="text-white text-sm font-bold leading-tight">{album.label}</p>
              <p className="text-white/70 text-[10px] mt-0.5">
                {album.files.length} {album.files.length === 1 ? 'file' : 'files'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
