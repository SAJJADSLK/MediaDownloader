'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DownloadForm } from '@/components/DownloadForm';
import { MediaCard } from '@/components/MediaCard';
import { AdUnit } from '@/components/AdUnit';
import type { TwitterResult } from '@/lib/twitter';

function TwitterDownloaderContent() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const [result, setResult] = useState<TwitterResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string; suggestion?: string } | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/twitter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let code = 'FETCH_FAILED';
        let suggestion = 'Make sure the post has a video or GIF attached and is from a public profile.';

        if (res.status === 400) {
          code = 'INVALID_FORMAT';
          suggestion = 'Ensure your link is from x.com or twitter.com (e.g. x.com/username/status/123456789).';
        }

        setError({
          message: data.error || 'Failed to download Twitter / X video.',
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
        suggestion: 'Please verify your internet connection or check if ad-blockers are intercepting API requests.',
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
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Twitter &bull; X Videos &bull; GIFs &bull; Full HD
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Twitter / X{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Video Downloader
            </span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Download high-quality videos and animated GIFs from Twitter / X directly in MP4 format with high audio clarity.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <DownloadForm
            platform="twitter"
            placeholder="Paste Twitter / X post link here (e.g. https://x.com/username/status/123456789...)"
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
                <span>✅</span> Tweet Media Ready
              </h2>
              <span className="text-xs text-neutral-400">By @{result.author.screenName}</span>
            </div>

            <MediaCard
              title={result.text}
              thumbnail={result.thumbnail}
              author={`@${result.author.screenName}`}
              downloadUrl={result.downloadUrl}
              downloadUrlHD={result.downloadUrlHD}
              type={result.type}
            />
          </div>
        )}

        {/* Compliant Ad Placement Slot 1 */}
        <AdUnit format="horizontal" />

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl mb-4 font-bold">
              ⚡
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Instant MP4 Conversion</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Converts Twitter looping video elements into standard MP4 video files ready for playback or video editing.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl mb-4 font-bold">
              🎞️
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Animated GIF Support</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Extract animated GIF files in pristine quality without choppy frame drops or color compression.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl mb-4 font-bold">
              🔒
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Zero Account Logins</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Download media freely without giving away credentials, tokens, or app authorizations.
            </p>
          </div>
        </div>

        {/* AdSense Value Section */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-8 text-neutral-300">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              How to Save Twitter / X Videos on iOS, Android & Desktop
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Twitter / X serves video streams through segmented HLS (.m3u8) manifests across multiple resolutions (typically 320x320, 720x1280, and 1080x1920). MediaHub automatically inspects the manifest to stitch together and provide the highest bitrate progressive MP4 file available.
            </p>
          </div>
        </div>

        {/* Compliant Ad Placement Slot 2 */}
        <AdUnit format="banner" />
      </div>
    </div>
  );
}

export default function TwitterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-neutral-400">
        Loading Twitter Downloader...
      </div>
    }>
      <TwitterDownloaderContent />
    </Suspense>
  );
}

