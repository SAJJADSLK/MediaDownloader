'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DownloadForm } from '@/components/DownloadForm';
import { MediaCard } from '@/components/MediaCard';
import { AdUnit } from '@/components/AdUnit';
import type { RutubeResult } from '@/lib/rutube';

function RutubeDownloaderContent() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const [result, setResult] = useState<RutubeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string; suggestion?: string } | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/rutube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let code = 'FETCH_FAILED';
        let suggestion = 'Make sure the Rutube video is public and accessible in your browser.';

        if (res.status === 400) {
          code = 'INVALID_FORMAT';
          suggestion = 'Ensure your link is from rutube.ru (e.g. https://rutube.ru/video/123456789... or /shorts/...).';
        } else if (res.status === 404) {
          code = 'NOT_FOUND';
          suggestion = 'This video may have been deleted, archived, or is private/region-restricted.';
        }

        setError({
          message: data.error || 'Failed to download Rutube video.',
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
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            🇷🇺 Rutube Video & Shorts Downloader &bull; 1080p HD
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Rutube{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Video Downloader
            </span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Download high-definition videos, series, and vertical Shorts from Rutube (Рутуб) in original 1080p/720p MP4 format without registration or limits.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <DownloadForm
            platform="rutube"
            placeholder="Paste Rutube video link here (e.g. https://rutube.ru/video/123456789...)"
            onSubmit={handleSubmit}
            loading={loading}
            initialUrl={initialUrl}
          />

          {/* Smart Error Handling UI */}
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
                <span>✅</span> Rutube Video Ready
              </h2>
              {result.author.name && (
                <span className="text-xs text-neutral-400">By {result.author.name}</span>
              )}
            </div>

            <MediaCard
              title={result.title}
              thumbnail={result.thumbnail}
              author={result.author.name}
              duration={result.duration ? `${result.duration}s` : undefined}
              downloadUrl={result.downloadUrl}
              downloadUrlHD={result.downloadUrlHD}
              type="video"
            />

            {/* Quality Streams Selector */}
            {result.formats && result.formats.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-white text-sm">Available Rutube Streams</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {result.formats.map((fmt, idx) => (
                    <a
                      key={idx}
                      href={fmt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-center transition-all group"
                    >
                      <p className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">{fmt.quality}</p>
                      <p className="text-neutral-400 text-xs mt-1">{fmt.resolution}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Compliant Ad Placement Slot 1 */}
        <AdUnit format="horizontal" />

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mb-4 font-bold">
              📺
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">1080p Full HD</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Extract Rutube video streams up to 1080p Full HD with rich bitrate and authentic stereophonic audio quality.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-teal-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center text-xl mb-4 font-bold">
              ⚡
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Shorts & Episodes</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Fully compatible with Rutube Shorts, full-length movie episodes, news reports, and gaming broadcasts.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl mb-4 font-bold">
              🛡️
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No Registration</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Save your favorite videos for offline viewing without logging in, entering phone numbers, or installing software.
            </p>
          </div>
        </div>

        {/* AdSense Value Section: Editorial Guide */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-8 text-neutral-300">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              How to Download Videos from Rutube (Рутуб)
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Rutube is one of the leading video platforms in Russia and the CIS region. Videos are streamed via adaptive HTTP Live Streaming (HLS) manifests with segmented transport streams. MediaHub parses these manifests to provide progressive MP4 playback and direct downloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base">Quick Steps</h3>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-400">
                <li>Open the video on <strong>rutube.ru</strong> or the Rutube mobile app.</li>
                <li>Click the <strong>Поделиться (Share)</strong> button and select <strong>Скопировать ссылку (Copy Link)</strong>.</li>
                <li>Paste the URL into MediaHub above and tap <strong>Download</strong>.</li>
                <li>Choose your preferred resolution (1080p, 720p, or 480p) to save the file.</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base">Supported Link Types</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><strong className="text-white">Standard Video:</strong> <code className="text-emerald-400">rutube.ru/video/[id]/</code></li>
                <li><strong className="text-white">Shorts:</strong> <code className="text-emerald-400">rutube.ru/shorts/[id]/</code></li>
                <li><strong className="text-white">Embed Player:</strong> <code className="text-emerald-400">rutube.ru/play/embed/[id]/</code></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliant Ad Placement Slot 2 */}
        <AdUnit format="banner" />
      </div>
    </div>
  );
}

export default function RutubePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-neutral-400">
        Loading Rutube Downloader...
      </div>
    }>
      <RutubeDownloaderContent />
    </Suspense>
  );
}
