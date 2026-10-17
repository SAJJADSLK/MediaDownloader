'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DownloadForm } from '@/components/DownloadForm';
import { MediaCard } from '@/components/MediaCard';
import { AdUnit } from '@/components/AdUnit';
import type { InstagramResult } from '@/lib/instagram';

function InstagramDownloaderContent() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const [result, setResult] = useState<InstagramResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string; suggestion?: string } | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let code = 'FETCH_FAILED';
        let suggestion = 'Make sure the post is from a public profile and the URL is copied properly.';

        if (res.status === 400) {
          code = 'INVALID_FORMAT';
          suggestion = 'Ensure your link is from instagram.com and follows /p/, /reel/, or /reels/ formatting.';
        } else if (res.status === 403 || res.status === 401) {
          code = 'PRIVATE_ACCOUNT';
          suggestion = 'This account is set to private. Platform privacy policies prevent downloading private media without authentication.';
        } else if (res.status === 404) {
          code = 'MEDIA_NOT_FOUND';
          suggestion = 'This post might have been removed, archived, or is restricted in your region.';
        }

        setError({
          message: data.error || 'Failed to download Instagram media.',
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
        suggestion: 'Please verify your internet connection or disable ad-blockers that might intercept API requests.',
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
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            Reels &bull; Stories &bull; Carousel Albums &bull; 4K Photos
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Instagram{' '}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Media Downloader
            </span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Extract and save Instagram Reels, carousel albums, video clips, and high-resolution photography without compression or quality degradation.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <DownloadForm
            platform="instagram"
            placeholder="Paste Instagram link here (e.g. https://www.instagram.com/reel/C3abcXYZ...)"
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
                <span>✅</span> {result.type === 'carousel' ? `Album Extracted (${result.items?.length || 0} Slides)` : 'Media Ready to Save'}
              </h2>
              {result.author && (
                <span className="text-xs text-neutral-400">By @{result.author}</span>
              )}
            </div>

            {result.type === 'carousel' && result.items && result.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.items.map((item, idx) => (
                  <MediaCard
                    key={idx}
                    title={result.caption || `Slide ${idx + 1}`}
                    thumbnail={item.thumbnail}
                    author={result.author ? `@${result.author}` : undefined}
                    downloadUrl={item.url}
                    type={item.type}
                  />
                ))}
              </div>
            ) : (
              <MediaCard
                title={result.caption || 'Instagram Post'}
                thumbnail={result.thumbnail}
                author={result.author ? `@${result.author}` : undefined}
                downloadUrl={result.downloadUrl}
                type={result.type === 'video' ? 'video' : 'image'}
              />
            )}
          </div>
        )}

        {/* Compliant Ad Placement Slot 1 */}
        <AdUnit format="horizontal" />

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-pink-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-xl mb-4 font-bold">
              🎬
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Reels & Audio Sync</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Grab high-framerate vertical Reels with complete multichannel stereo audio synchronization in MP4 container format.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-rose-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl mb-4 font-bold">
              🖼️
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Original Resolutions</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Download native high-resolution JPEG/PNG files up to 1080p and 4K without the aggressive client compression of screenshots.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl mb-4 font-bold">
              📚
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Carousel Slide Parser</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Multi-item posts are unpacked item by item so you can download individual photos or select specific videos from the collection.
            </p>
          </div>
        </div>

        {/* AdSense Value-Add Editorial Section: Detailed Guide */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-8 text-neutral-300">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Comprehensive Guide: Saving Instagram Media Safely and Legally
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Instagram provides an engaging multimedia experience with feed photos, short-form Reels, Stories, and carousel albums. Unlike native gallery apps, the Instagram app does not provide an integrated &quot;Save to Camera Roll&quot; feature for third-party public posts to protect user bandwidth and platform stickiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <span>📋</span> Copying Links from Instagram App
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-400">
                <li>Locate the post, Reel, or photo you want to download.</li>
                <li>Tap the <strong>Paper Airplane (Share)</strong> or <strong>Three Dots (&bull;&bull;&bull;)</strong> icon.</li>
                <li>Tap <strong>Copy Link</strong> to place the post URL on your system clipboard.</li>
                <li>Open your browser and navigate to MediaHub&apos;s Instagram Downloader.</li>
                <li>Use the <strong>Paste</strong> button and tap <strong>Download</strong>.</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <span>🔍</span> Understanding Instagram URL Formats
              </h3>
              <ul className="space-y-2 text-neutral-400">
                <li><strong className="text-white">Feed Post:</strong> <code className="text-pink-400">instagram.com/p/SHORTCODE/</code></li>
                <li><strong className="text-white">Reels Video:</strong> <code className="text-pink-400">instagram.com/reel/SHORTCODE/</code></li>
                <li><strong className="text-white">IGTV:</strong> <code className="text-pink-400">instagram.com/tv/SHORTCODE/</code></li>
                <li><strong className="text-white">Stories:</strong> Temporary 24h media (public accounts only).</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6 space-y-4">
            <h3 className="font-semibold text-white text-base">
              Supported Formats & Quality Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-400">
                <thead>
                  <tr className="border-b border-white/[0.08] text-white">
                    <th className="py-2.5 pr-4">Media Type</th>
                    <th className="py-2.5 px-4">Container</th>
                    <th className="py-2.5 px-4">Aspect Ratio</th>
                    <th className="py-2.5 px-4">Max Resolution</th>
                    <th className="py-2.5 pl-4">Audio Track</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="py-2.5 pr-4 text-pink-400 font-medium">Reels Video</td>
                    <td className="py-2.5 px-4">MP4</td>
                    <td className="py-2.5 px-4">9:16 (Vertical)</td>
                    <td className="py-2.5 px-4 text-white">1080 x 1920</td>
                    <td className="py-2.5 pl-4 text-white">AAC Stereo</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-rose-400 font-medium">Feed Photo</td>
                    <td className="py-2.5 px-4">JPEG / WebP</td>
                    <td className="py-2.5 px-4">1:1 / 4:5</td>
                    <td className="py-2.5 px-4 text-white">1080 x 1350</td>
                    <td className="py-2.5 pl-4 text-neutral-500">None</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-amber-400 font-medium">Carousel Album</td>
                    <td className="py-2.5 px-4">Mixed MP4 / JPEG</td>
                    <td className="py-2.5 px-4">Multiple</td>
                    <td className="py-2.5 px-4 text-white">Up to 10 Slides</td>
                    <td className="py-2.5 pl-4 text-white">Preserved per slide</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <h3 className="font-semibold text-white text-base mb-2">Fair Use & Intellectual Property Policy</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We advocate strictly for fair use, personal reference, and educational archiving. Users are reminded that re-uploading content without proper authorization or commercial exploitation of copyrighted material violates copyright statutes worldwide. MediaHub does not store or mirror downloaded assets on private servers.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-4 space-y-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-semibold text-white">
                <span>Can I download content from a private Instagram account?</span>
                <span className="text-pink-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                No. MediaHub strictly adheres to user privacy boundaries. Content must be publicly discoverable and not gated behind private follower permissions.
              </p>
            </details>

            <details className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-semibold text-white">
                <span>How do I save carousel posts with both photos and videos?</span>
                <span className="text-pink-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Our parser unpacks each slide into an individual card. You can download the entire collection or just the specific slide you need.
              </p>
            </details>

            <details className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-semibold text-white">
                <span>Why is this better than taking a screenshot?</span>
                <span className="text-pink-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Screenshots capture UI elements, battery status icons, and lower screen resolution. MediaHub grabs the original full-bitrate file direct from the CDN.
              </p>
            </details>
          </div>
        </div>

        {/* Compliant Ad Placement Slot 2 */}
        <AdUnit format="banner" />
      </div>
    </div>
  );
}

export default function InstagramPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-neutral-400">
        Loading Instagram Downloader...
      </div>
    }>
      <InstagramDownloaderContent />
    </Suspense>
  );
}
