'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DownloadForm } from '@/components/DownloadForm';
import { MediaCard } from '@/components/MediaCard';
import { AdUnit } from '@/components/AdUnit';
import type { YouTubeResult } from '@/lib/youtube';

function YouTubeDownloaderContent() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const [result, setResult] = useState<YouTubeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string; suggestion?: string } | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let code = 'FETCH_FAILED';
        let suggestion = 'Make sure the YouTube link is public and accessible in your web browser.';

        if (res.status === 400) {
          code = 'INVALID_FORMAT';
          suggestion = 'Ensure your link is from youtube.com or youtu.be (e.g. youtube.com/watch?v=... or youtube.com/shorts/...).';
        }

        setError({
          message: data.error || 'Failed to resolve YouTube media.',
          code,
          suggestion,
        });
        return;
      }

      setResult(data.data);
    } catch (err: unknown) {
      setError({
        message: err instanceof Error ? err.message : 'Network communication failed.',
        code: 'NETWORK_ERROR',
        suggestion: 'Please verify your internet connection and ensure your browser is not blocking API fetch calls.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialUrl) {
      handleSubmit(initialUrl);
    }
  }, [initialUrl]);

  return (
    <div className="relative min-h-screen bg-[#09090b] py-12 px-4 sm:px-6">
      {/* Decorative Glow Blob */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider">
            Shorts &bull; Videos &bull; 1080p HD &bull; Studio MP3
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            YouTube{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              Video & Shorts Archiver
            </span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Preserve high-definition YouTube videos and vertical Shorts in pristine MP4 format or extract high-bitrate audio for personal archiving and fair-use review.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <DownloadForm
            platform="youtube"
            placeholder="Paste YouTube video or Shorts link here (e.g. https://www.youtube.com/watch?v=...)"
            onSubmit={handleSubmit}
            loading={loading}
            initialUrl={initialUrl}
          />

          {error && (
            <div className="mt-6 p-5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-rose-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Error {error.code ? `[${error.code}]` : ''}: {error.message}</span>
              </div>
              {error.suggestion && (
                <p className="text-rose-200/80 text-xs pl-7 leading-relaxed">
                  <strong>Recommended Fix:</strong> {error.suggestion}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>✅</span> Media Manifest Identified
              </h2>
              <span className="text-xs text-neutral-400">By {result.author}</span>
            </div>

            <MediaCard
              title={result.title}
              thumbnail={result.thumbnail}
              author={result.author}
              downloadUrl={result.downloadUrl}
              downloadUrlHD={result.downloadUrlHD}
              audioUrl={result.audioUrl}
              type="video"
            />

            {/* Formats Grid */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-white text-sm">Available Quality Streams</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.formats.map((fmt, idx) => (
                  <a
                    key={idx}
                    href={fmt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-center transition-all group"
                  >
                    <p className="text-white font-bold text-sm group-hover:text-red-400 transition-colors">{fmt.quality}</p>
                    <p className="text-neutral-400 text-xs mt-1">{fmt.container.toUpperCase()} &bull; {fmt.resolution}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Compliant Ad Placement Slot 1 */}
        <AdUnit format="horizontal" />

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-xl mb-4 font-bold">
              📱
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Shorts & Longform</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Native compatibility with both vertical YouTube Shorts and standard landscape widescreen productions.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-rose-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl mb-4 font-bold">
              🎚️
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Preserved Audio Tracks</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Extract high-fidelity MP3/AAC audio streams directly for podcasts, research interviews, and audio editing.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-orange-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center text-xl mb-4 font-bold">
              ⚡
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Zero Software Install</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              100% browser-based. No bulky command-line dependencies or desktop software required.
            </p>
          </div>
        </div>

        {/* AdSense Value Section: Deep Educational Content */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-8 text-neutral-300">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Creator Archiving Guide: Video Resolution Standards & Fair Use
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              YouTube employs advanced VP9 and AV1 compression profiles alongside standard H.264 video streams. For video editors and educational commentators, understanding how to preserve source video fidelity without introducing multi-generation compression artifacts is paramount.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base">Supported Link Formats</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><strong className="text-white">Standard Video:</strong> <code className="text-red-400">youtube.com/watch?v=ID</code></li>
                <li><strong className="text-white">Shortened URL:</strong> <code className="text-red-400">youtu.be/ID</code></li>
                <li><strong className="text-white">YouTube Shorts:</strong> <code className="text-red-400">youtube.com/shorts/ID</code></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base">Fair Use Legal Notice</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Under Section 107 of the US Copyright Act, the fair use of a copyrighted work for purposes such as criticism, comment, news reporting, teaching, scholarship, or research is not an infringement of copyright. MediaHub does not host or redistribute media.
              </p>
            </div>
          </div>
        </div>

        {/* Compliant Ad Placement Slot 2 */}
        <AdUnit format="banner" />
      </div>
    </div>
  );
}

export default function YouTubePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-neutral-400">
        Loading YouTube Downloader...
      </div>
    }>
      <YouTubeDownloaderContent />
    </Suspense>
  );
}

