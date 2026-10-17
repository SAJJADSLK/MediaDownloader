'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DownloadForm } from '@/components/DownloadForm';
import { MediaCard } from '@/components/MediaCard';
import { AdUnit } from '@/components/AdUnit';
import type { TikTokResult } from '@/lib/tiktok';

function TikTokDownloaderContent() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get('url') || '';

  const [result, setResult] = useState<TikTokResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string; suggestion?: string } | null>(null);

  const handleSubmit = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/tiktok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        let code = 'FETCH_FAILED';
        let suggestion = 'Please verify that the TikTok link is public and accessible in your web browser.';

        if (res.status === 400) {
          code = 'INVALID_FORMAT';
          suggestion = 'Ensure your link begins with https://www.tiktok.com/ or https://vm.tiktok.com/';
        } else if (res.status === 404) {
          code = 'NOT_FOUND';
          suggestion = 'The video creator may have removed this video or changed account privacy settings to private.';
        } else if (res.status === 429) {
          code = 'RATE_LIMITED';
          suggestion = 'Our servers are experiencing high request volume. Please wait 10-15 seconds and try again.';
        }

        setError({
          message: data.error || 'Unable to process this TikTok video.',
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
        suggestion: 'Please check your internet connection and verify that your browser is not blocking API fetch requests.',
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
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            Verified Cloud Downloader &bull; 1080p Full HD
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            TikTok{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Video Downloader
            </span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Download high-definition TikTok videos without watermark in original MP4 format or extract pristine 320kbps MP3 audio tracks directly to your device.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <DownloadForm
            platform="tiktok"
            placeholder="Paste TikTok video link here (e.g. https://www.tiktok.com/@creator/video/123456789...)"
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

        {/* Result Card */}
        {result && (
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>✅</span> Media Processed Successfully
              </h2>
              <span className="text-xs text-neutral-400">Direct CDN Stream</span>
            </div>
            <MediaCard
              title={result.title}
              thumbnail={result.cover}
              author={`@${result.author.name}`}
              duration={result.duration ? `${result.duration}s` : undefined}
              downloadUrl={result.downloadUrl}
              downloadUrlHD={result.hdDownloadUrl}
              audioUrl={result.musicUrl}
              type="video"
            />
          </div>
        )}

        {/* Compliant Ad Placement Slot 1 */}
        <AdUnit format="horizontal" />

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-violet-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center text-xl mb-4 font-bold">
              🚫
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Zero Watermark</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Our backend parser extracts the raw source stream before watermark rendering occurs, saving clean MP4 files without intrusive logos.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-fuchsia-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center text-xl mb-4 font-bold">
              📺
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Preserved 1080p HD</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Maintains the original video encoding bitrate and color profile, delivering authentic high-definition video fidelity on mobile and desktop.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-pink-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-xl mb-4 font-bold">
              🎧
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Studio MP3 Audio</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Easily isolate trending audio, background music, or speech recordings into universal MP3 audio files with high sampling frequency.
            </p>
          </div>
        </div>

        {/* AdSense Value-Add Editorial Section: In-Depth Guide */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-10 space-y-8 text-neutral-300">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Comprehensive Guide: How to Save TikTok Videos Without Losing Quality
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              TikTok uses modern video compression codecs (typically H.264/AVC and H.265/HEVC) packaged in standard MP4 containers. When content creators export videos directly from the native TikTok client, the application compresses the footage and superimposes an animated watermark containing the creator handle and platform logo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <span>📱</span> Mobile Instructions (iOS & Android)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-400">
                <li>Open the TikTok application and locate the video you wish to preserve.</li>
                <li>Tap the <strong>Share</strong> icon (the right-pointing arrow) on the lower right panel.</li>
                <li>Select <strong>Copy Link</strong> from the share menu tray.</li>
                <li>Open Safari, Chrome, or any modern mobile browser and navigate to MediaHub.</li>
                <li>Paste the URL into the input field above and tap <strong>Download</strong>.</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <span>💻</span> Desktop Instructions (Windows, Mac, Linux)
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-400">
                <li>Browse TikTok on your web browser of choice.</li>
                <li>Copy the full URL directly from your browser&apos;s address bar.</li>
                <li>Switch to MediaHub and paste the link into the designated field.</li>
                <li>Click <strong>Download</strong> and choose between HD MP4 (No Watermark) or Studio MP3.</li>
                <li>The asset will instantly download into your local downloads directory.</li>
              </ol>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6 space-y-4">
            <h3 className="font-semibold text-white text-base">
              Technical Specifications & Codec Support
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-400">
                <thead>
                  <tr className="border-b border-white/[0.08] text-white">
                    <th className="py-2.5 pr-4">Format</th>
                    <th className="py-2.5 px-4">Container</th>
                    <th className="py-2.5 px-4">Video Codec</th>
                    <th className="py-2.5 px-4">Audio Stream</th>
                    <th className="py-2.5 pl-4">Max Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="py-2.5 pr-4 text-violet-400 font-medium">MP4 HD</td>
                    <td className="py-2.5 px-4">.mp4</td>
                    <td className="py-2.5 px-4">H.264 / AVC Baseline</td>
                    <td className="py-2.5 px-4">AAC Stereo 128-192kbps</td>
                    <td className="py-2.5 pl-4 text-white">1080 x 1920 (9:16)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-pink-400 font-medium">MP3 Audio</td>
                    <td className="py-2.5 px-4">.mp3</td>
                    <td className="py-2.5 px-4">N/A (Audio Only)</td>
                    <td className="py-2.5 px-4">MPEG Audio Layer III</td>
                    <td className="py-2.5 pl-4 text-white">44.1 kHz / 320kbps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-6">
            <h3 className="font-semibold text-white text-base mb-2">Legal Compliance & Ethical Usage</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              MediaHub respects intellectual property rights and adheres to digital fair use frameworks. Content downloaded through this platform should be utilized strictly for personal archiving, educational analysis, or fair commentary under applicable copyright laws. We do not host, store, or duplicate any copyrighted media on our servers; all assets are delivered through direct streams between the client and public CDNs.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-4 space-y-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-semibold text-white">
                <span>Why are videos downloaded without a watermark?</span>
                <span className="text-violet-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                When a video is uploaded to TikTok, the server processes both an unrendered raw stream and an overlay-encoded watermarked version. MediaHub retrieves the clean source stream directly, bypassing the dynamic watermark renderer for pristine clarity.
              </p>
            </details>

            <details className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-semibold text-white">
                <span>Is there any limit on how many videos I can download?</span>
                <span className="text-violet-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                No. MediaHub is an open utility providing unlimited downloads without daily caps, account restrictions, or software installation requirements.
              </p>
            </details>

            <details className="group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-semibold text-white">
                <span>Can I download TikTok slideshows or multi-photo posts?</span>
                <span className="text-violet-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Yes! Slideshows and photo carousel posts are supported. The parser will extract the individual images in high-resolution PNG/JPEG alongside the associated background audio.
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

export default function TikTokPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-neutral-400">
        Loading TikTok Downloader...
      </div>
    }>
      <TikTokDownloaderContent />
    </Suspense>
  );
}
