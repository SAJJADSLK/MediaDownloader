'use client';

import { useState } from 'react';

interface MediaCardProps {
  title: string;
  thumbnail?: string;
  author?: string;
  duration?: string;
  downloadUrl: string;
  downloadUrlHD?: string;
  audioUrl?: string;
  type: 'video' | 'image' | 'audio';
}

export function MediaCard({
  title,
  thumbnail,
  author,
  duration,
  downloadUrl,
  downloadUrlHD,
  audioUrl,
  type,
}: MediaCardProps) {
  const [downloading, setDownloading] = useState<string | null>(null);

  const triggerDownload = async (url: string, filename: string, id: string) => {
    setDownloading(id);
    try {
      // Attempt client-side blob download so the browser prompts Save File dialog
      const response = await fetch(url);
      if (!response.ok) throw new Error('Direct fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback for CORS restricted origins: open direct stream in new window
      const win = window.open(url, '_blank');
      if (!win) {
        window.location.href = url;
      }
    } finally {
      setDownloading(null);
    }
  };

  const sanitizeFilename = (name: string, ext: string) => {
    const clean = name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40) || 'media';
    return `MediaHub_${clean}.${ext}`;
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden shadow-xl">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/40">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 flex items-center justify-center">
            {type === 'video' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-neutral-500">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" opacity="0.6" />
              </svg>
            )}
            {type === 'image' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            )}
            {type === 'audio' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-500">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </div>
        )}

        {/* Duration badge */}
        {duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm">
            {duration}
          </span>
        )}

        {/* Type badge */}
        <span className="absolute top-2 left-2 bg-black/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm uppercase tracking-wider">
          {type}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
          {title}
        </h3>
        {author && (
          <p className="text-neutral-400 text-xs flex items-center gap-1.5 font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{author}</span>
          </p>
        )}

        {/* Download buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {downloadUrlHD && (
            <button
              onClick={() => triggerDownload(downloadUrlHD, sanitizeFilename(title, 'mp4'), 'hd')}
              disabled={downloading === 'hd'}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-xl px-4 py-2.5 text-xs transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{downloading === 'hd' ? 'Saving...' : 'Download HD (No Watermark)'}</span>
            </button>
          )}

          <button
            onClick={() => triggerDownload(downloadUrl, sanitizeFilename(title, type === 'image' ? 'jpg' : 'mp4'), 'standard')}
            disabled={downloading === 'standard'}
            className="inline-flex items-center gap-1.5 border border-white/[0.12] hover:border-white/[0.25] text-neutral-200 hover:text-white font-medium rounded-xl px-4 py-2.5 text-xs transition-all duration-200 hover:bg-white/[0.06] active:scale-[0.98] disabled:opacity-50"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{downloading === 'standard' ? 'Saving...' : downloadUrlHD ? 'Standard MP4' : 'Download File'}</span>
          </button>

          {audioUrl && (
            <button
              onClick={() => triggerDownload(audioUrl, sanitizeFilename(title, 'mp3'), 'audio')}
              disabled={downloading === 'audio'}
              className="inline-flex items-center gap-1.5 border border-white/[0.12] hover:border-white/[0.25] text-pink-300 hover:text-pink-200 font-medium rounded-xl px-4 py-2.5 text-xs transition-all duration-200 hover:bg-pink-500/10 active:scale-[0.98] disabled:opacity-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              <span>{downloading === 'audio' ? 'Saving...' : 'MP3 Audio'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
