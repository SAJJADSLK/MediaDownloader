import { AdUnit } from '@/components/AdUnit';

export const metadata = {
  title: 'Creator Guides & Digital Media Insights — MediaHub',
  description: 'In-depth articles, video editing guides, codec optimization, and publisher analytics strategies.',
};

const ARTICLES = [
  {
    slug: 'video-archiving-resolution-bitrate-guide',
    title: 'The Creator’s Guide to Video Archiving, Resolution & Bitrate Preservation (2026)',
    excerpt: 'How modern compression algorithms impact short-form video clarity, and why downloading direct un-watermarked streams preserves color dynamic range and audio fidelity.',
    category: 'Video Engineering',
    readTime: '6 min read',
    date: 'Oct 14, 2026',
    author: 'Alex Vance, Lead Media Architect',
  },
  {
    slug: 'zen-algorithm-metrics-audience-retention',
    title: 'Demystifying Yandex Zen: Algorithmic Reach, Reading Time & Audience Analytics',
    excerpt: 'An empirical analysis of how the Zen recommendation engine weighs total reading time against click-through rates (CTR) to recommend long-form articles vs short videos.',
    category: 'Publisher Analytics',
    readTime: '8 min read',
    date: 'Oct 08, 2026',
    author: 'Elena Rostova, Growth Data Scientist',
  },
  {
    slug: 'fair-use-copyright-compliance-short-form-video',
    title: 'Fair Use & Copyright Ethics: Legally Repurposing Short-Form Media for Creators',
    excerpt: 'A comprehensive legal overview of transformative fair use under US Code § 107 and global copyright frameworks when quoting, analyzing, or critiquing social video.',
    category: 'Legal & Ethics',
    readTime: '5 min read',
    date: 'Sep 29, 2026',
    author: 'Marcus Reed, Digital Media Counsel',
  },
  {
    slug: 'instagram-reels-vs-carousels-engagement-study',
    title: 'Instagram Reels vs Carousel Posts: Which Drives Greater Audience Retention?',
    excerpt: 'A study across 20,000 public creator profiles measuring bookmark rates, repeat shares, and conversion funnels across multi-slide carousel albums versus vertical Reels.',
    category: 'Content Strategy',
    readTime: '7 min read',
    date: 'Sep 19, 2026',
    author: 'Sarah Chen, Social Intelligence Strategist',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            Knowledge Base &bull; Creator Insights &bull; Technical Guides
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">MediaHub Editorial & Guides</h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Expert resources, technical deep-dives into video codecs, algorithmic audience analytics, and legal guidance for modern digital creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((art) => (
            <article
              key={art.slug}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 flex flex-col justify-between hover:bg-white/[0.05] hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-violet-400 font-semibold uppercase tracking-wider">{art.category}</span>
                  <span className="text-neutral-500">{art.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-white hover:text-violet-300 transition-colors">
                  {art.title}
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="border-t border-white/[0.06] pt-4 mt-6 flex items-center justify-between text-xs text-neutral-500">
                <span>By {art.author}</span>
                <span>{art.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Compliant Ad Placement Slot 1 */}
        <AdUnit format="horizontal" />

        {/* In-depth featured article body directly rendered for maximum Google Search & AdSense indexing */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-12 space-y-8 text-neutral-300">
          <div>
            <div className="text-xs uppercase tracking-wider text-violet-400 font-semibold mb-2">Featured In-Depth Article</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Demystifying Video Bitrate, Codec Containers and Audio Resampling
            </h2>
            <p className="text-xs text-neutral-500">By Alex Vance, Lead Media Architect &bull; Updated October 2026</p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-neutral-400 border-t border-white/[0.06] pt-6">
            <p>
              When media is uploaded to high-throughput platforms like TikTok and Instagram, servers process incoming content through multi-pass transcoders. These transcoders generate multiple Adaptive Bitrate (ABR) renditions governed by streaming manifests such as HLS (HTTP Live Streaming) and MPEG-DASH.
            </p>
            <h3 className="text-lg font-bold text-white pt-2">Why Screen Recording Degrades Color and Frame Cadence</h3>
            <p>
              Many users attempt to preserve short-form videos by utilizing operating-system screen recorders. However, screen recording introduces multiple points of irreversible data degradation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Color Space Clipping:</strong> Native videos are frequently captured in wide P3 or BT.2020 color gamuts. Screen recording software typically down-converts frames to standard sRGB, crushing dynamic highlights and shadows.</li>
              <li><strong>Frame Jitter & V-Sync Mismatches:</strong> When a 60fps display renders a 30fps or 24fps stream, asynchronous frame duplication causes micro-stutters and dropped frames in the recorded file.</li>
              <li><strong>Secondary Compression Artifacts:</strong> Re-encoding an already compressed stream through the mobile device&apos;s hardware encoder produces macroblocking and digital noise.</li>
            </ul>
            <h3 className="text-lg font-bold text-white pt-2">The Solution: Direct Stream Manifest Extraction</h3>
            <p>
              MediaHub bypasses screen recording and browser canvas rendering altogether. Our parser inspects the underlying JSON payloads to retrieve the canonical high-profile MP4 source directly from the platform&apos;s origin Edge nodes. This delivers byte-for-byte fidelity with pristine AAC stereophonic sound.
            </p>
          </div>
        </div>

        {/* Compliant Ad Placement Slot 2 */}
        <AdUnit format="banner" />
      </div>
    </div>
  );
}

