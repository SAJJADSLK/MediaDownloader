import Link from 'next/link';
import { UniversalBar } from '@/components/UniversalBar';
import { AdUnit } from '@/components/AdUnit';

export default function HomePage() {
  return (
    <div className="bg-[#09090b] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 pt-28 overflow-hidden">
        {/* Decorative glow blobs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-neutral-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All-in-One Creator & Media Toolkit &bull; Serverless Vercel Edge
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Universal Media Hub &<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Content Analytics Suite
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Download high-definition TikTok videos without watermarks, preserve Instagram Reels and carousel albums, and analyze Yandex Zen channel performance — instantly from one unified platform.
          </p>

          {/* Universal Smart Bar */}
          <div className="pt-4 pb-2">
            <UniversalBar />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 pt-2">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              No Registration Required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Zero Watermark Retention
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              100% Free & Unlimited
            </span>
          </div>

          {/* Compliant Ad Placement Slot 1 */}
          <div className="pt-6">
            <AdUnit format="horizontal" />
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">All Your Media Tools in One Unified Platform</h2>
            <p className="text-neutral-400 text-sm mt-2">Switch effortlessly between short-form video downloading, high-resolution media saving, and audience analytics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TikTok Card */}
            <Link
              href="/tiktok"
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-violet-500/40 transition-all duration-300 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 flex items-center justify-between">
                  <span>TikTok Downloader</span>
                  <span className="text-xs font-normal text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full">HD / MP3</span>
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Download TikTok videos in 1080p without any watermarks or platform overlays. Extract original studio-quality MP3 audio tracks in two clicks.
                </p>
              </div>
              <div className="mt-8 text-violet-400 group-hover:text-violet-300 transition-colors flex items-center gap-2 text-sm font-semibold">
                Open Downloader
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* Instagram Card */}
            <Link
              href="/instagram"
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-pink-500/40 transition-all duration-300 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 flex items-center justify-between">
                  <span>Instagram Downloader</span>
                  <span className="text-xs font-normal text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded-full">Reels & Carousels</span>
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Save Instagram Reels, multi-slide Carousel posts, high-res photos, and Stories directly in full original resolution with zero compression.
                </p>
              </div>
              <div className="mt-8 text-pink-400 group-hover:text-pink-300 transition-colors flex items-center gap-2 text-sm font-semibold">
                Open Downloader
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* YouTube Card */}
            <Link
              href="/youtube"
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-red-500/40 transition-all duration-300 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-6 shadow-lg shadow-red-500/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="currentColor" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#09090b" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 flex items-center justify-between">
                  <span>YouTube Downloader</span>
                  <span className="text-xs font-normal text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full">Shorts & 1080p</span>
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Preserve high-definition YouTube videos and vertical Shorts in MP4 format or extract high-bitrate audio for personal archiving.
                </p>
              </div>
              <div className="mt-8 text-red-400 group-hover:text-red-300 transition-colors flex items-center gap-2 text-sm font-semibold">
                Open Downloader
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* Twitter / X Card */}
            <Link
              href="/twitter"
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-blue-500/40 transition-all duration-300 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 flex items-center justify-between">
                  <span>Twitter / X Downloader</span>
                  <span className="text-xs font-normal text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">Videos & GIFs</span>
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Extract high-quality video files and animated GIFs from Twitter/X tweets into standard MP4 files without any quality loss.
                </p>
              </div>
              <div className="mt-8 text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-2 text-sm font-semibold">
                Open Downloader
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* Rutube Card */}
            <Link
              href="/rutube"
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-emerald-500/40 transition-all duration-300 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                  <span className="text-2xl">🇷🇺</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 flex items-center justify-between">
                  <span>Rutube Downloader</span>
                  <span className="text-xs font-normal text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">1080p HD & Shorts</span>
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Download full-length Rutube videos, TV episodes, and vertical Shorts in high-definition MP4 directly without logins.
                </p>
              </div>
              <div className="mt-8 text-emerald-400 group-hover:text-emerald-300 transition-colors flex items-center gap-2 text-sm font-semibold">
                Open Downloader
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>

            {/* Zen Analytics Card */}
            <Link
              href="/zen"
              className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl backdrop-blur-sm hover:bg-white/[0.06] hover:border-violet-500/40 transition-all duration-300 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-violet-500 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 flex items-center justify-between">
                  <span>Zen Analytics</span>
                  <span className="text-xs font-normal text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">Rankings & Stats</span>
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Benchmark Yandex Zen channel metrics, track subscriber velocity, inspect publication reach, and discover trending niche categories.
                </p>
              </div>
              <div className="mt-8 text-amber-400 group-hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-semibold">
                Open Analytics
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step Visual Workflow Section (Better than ssstik.com) */}
      <section className="py-16 border-t border-white/[0.06] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest text-violet-400 font-semibold px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
              Seamless 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How MediaHub Works
            </h2>
            <p className="text-neutral-400 text-sm">
              Save any short-form video or unpack social content in seconds with zero loss of quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-violet-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-300 font-extrabold text-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Copy & Paste URL</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Copy the link to any TikTok video, Instagram Reel, YouTube Short, or Twitter tweet from your browser or mobile app and paste it into our smart search bar.
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Auto-detects platform instantly
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-fuchsia-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 font-extrabold text-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Instant Edge Parsing</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Our serverless edge nodes negotiate directly with CDN streaming manifests in under 50ms, stripping watermarks and isolating the highest bitrate progressive streams.
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Vercel Edge Runtime &bull; Zero Server Delay
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-pink-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-300 font-extrabold text-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Studio-Quality Download</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Choose between Full HD 1080p MP4 without watermark, pristine 320kbps MP3 audio, or high-res photo albums with direct client-side blob download.
              </p>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-neutral-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                Lossless H.264 &bull; 100% Free & Unlimited
              </div>
            </div>
          </div>

          {/* Compliant Ad Placement Slot 2 */}
          <div className="mt-14">
            <AdUnit format="banner" />
          </div>
        </div>
      </section>

      {/* AdSense Value Section: Deep Educational Content */}
      <section className="py-16 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Modern Digital Media Engineering & Content Preservation
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              In today&apos;s digital creator economy, short-form video dominates social engagement. Content creators, digital marketers, and educators regularly face the challenge of backing up creative portfolios across fragmented proprietary ecosystems. MediaHub provides a standards-compliant solution for cross-platform media extraction and editorial audience analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-300 text-sm">
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <span className="text-violet-400">01.</span> Edge Cloud Parsing
              </h3>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Traditional downloaders rely on slow, centralized servers that re-encode video files, introducing artifacting and latency. MediaHub utilizes Vercel Edge compute regions to resolve direct CDN media manifests in under 50 milliseconds.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <span className="text-pink-400">02.</span> Lossless Quality Retention
              </h3>
              <p className="text-neutral-400 leading-relaxed text-xs">
                By negotiating stream endpoints directly with media CDNs, videos are saved using their native H.264/AAC profiles without lossy secondary re-compression. The visual fidelity of high-bitrate cameras is completely preserved.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-semibold text-base flex items-center gap-2">
                <span className="text-blue-400">03.</span> Creator Analytics Intelligence
              </h3>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Understanding algorithmic distribution on platforms like Yandex Zen requires quantifiable metrics. Our analytical tool aggregates views, reading times, and audience engagement to empower strategic publishing decisions.
              </p>
            </div>
          </div>

          {/* Architecture Diagram Box */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-white font-bold text-lg">Platform Feature & Compliance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-400">
                <thead>
                  <tr className="border-b border-white/[0.08] text-white">
                    <th className="py-3 pr-4">Feature</th>
                    <th className="py-3 px-4">TikTok Downloader</th>
                    <th className="py-3 px-4">Instagram Downloader</th>
                    <th className="py-3 px-4">Rutube Downloader</th>
                    <th className="py-3 pl-4">Zen Analytics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">No Watermarks</td>
                    <td className="py-3 px-4 text-emerald-400">&check; Included</td>
                    <td className="py-3 px-4 text-emerald-400">&check; Native Feed</td>
                    <td className="py-3 px-4 text-emerald-400">&check; Clean Streams</td>
                    <td className="py-3 pl-4 text-neutral-500">N/A (Analytics)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Maximum Resolution</td>
                    <td className="py-3 px-4 text-neutral-300">1080p Full HD</td>
                    <td className="py-3 px-4 text-neutral-300">Up to 4K / 1080p</td>
                    <td className="py-3 px-4 text-neutral-300">1080p Full HD</td>
                    <td className="py-3 pl-4 text-neutral-500">N/A</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Audio Track Extraction</td>
                    <td className="py-3 px-4 text-emerald-400">&check; MP3 320kbps</td>
                    <td className="py-3 px-4 text-emerald-400">&check; Integrated AAC</td>
                    <td className="py-3 px-4 text-emerald-400">&check; Native Audio</td>
                    <td className="py-3 pl-4 text-neutral-500">N/A</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Batch / Carousel Support</td>
                    <td className="py-3 px-4 text-neutral-300">Slideshows supported</td>
                    <td className="py-3 px-4 text-emerald-400">&check; Multi-Slide Unpacking</td>
                    <td className="py-3 px-4 text-neutral-300">Shorts & Episodes</td>
                    <td className="py-3 pl-4 text-neutral-500">N/A</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Audience & Reach Analytics</td>
                    <td className="py-3 px-4 text-neutral-500">Basic play counts</td>
                    <td className="py-3 px-4 text-neutral-500">N/A</td>
                    <td className="py-3 px-4 text-neutral-500">N/A</td>
                    <td className="py-3 pl-4 text-emerald-400">&check; Subscribers, Views, Read Time</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
            <div className="text-center">
              <p className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                100K+
              </p>
              <p className="text-neutral-400 text-sm mt-1">Videos Archived</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/[0.08]" />
            <div className="text-center">
              <p className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                50K+
              </p>
              <p className="text-neutral-400 text-sm mt-1">Active Creators</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/[0.08]" />
            <div className="text-center">
              <p className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                99.9%
              </p>
              <p className="text-neutral-400 text-sm mt-1">Serverless Uptime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
