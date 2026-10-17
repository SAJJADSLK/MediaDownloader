export const metadata = {
  title: 'About Us — MediaHub Engineering & Mission',
  description: 'Learn about MediaHub, our engineering philosophy, our team, and our commitment to content creator tools.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12 text-neutral-300">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            Engineering &bull; Transparency &bull; Innovation
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">About MediaHub</h1>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Building open, performant, and developer-grade multimedia archiving tools and creator analytics for the modern digital era.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            Founded in 2024, MediaHub was created to solve a persistent friction point encountered by creative professionals, video editors, and digital marketers: the fragmentation of social media ecosystems. Content creators frequently need to back up their own portfolios, analyze cross-platform engagement metrics, or preserve public footage for legitimate fair-use critique and education.
          </p>
          <p className="text-sm leading-relaxed text-neutral-400">
            Our goal is to provide a clean, high-speed, non-intrusive utility that eliminates ad-riddled malware-prone downloader traps, replacing them with a trustworthy, privacy-respecting serverless engine.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-3">
            <div className="text-2xl">⚡</div>
            <h3 className="font-semibold text-white text-base">Serverless & Edge Speed</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Engineered with Next.js and deployed on Vercel&apos;s global edge network, delivering instant resolution with sub-50ms API response latency worldwide.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-3">
            <div className="text-2xl">🛡️</div>
            <h3 className="font-semibold text-white text-base">Zero-Log Architecture</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We do not track user sessions, require accounts, or store user-submitted links in persistent databases. Your data belongs exclusively to you.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-3">
            <div className="text-2xl">📊</div>
            <h3 className="font-semibold text-white text-base">Algorithmic Insights</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Bridging media downloading with creator business intelligence by integrating Yandex Zen publisher analytics and audience reach tracking.
            </p>
          </div>
        </section>

        <section className="space-y-4 border-t border-white/[0.08] pt-8">
          <h2 className="text-2xl font-bold text-white">Editorial & Technical Standards</h2>
          <p className="text-sm leading-relaxed text-neutral-400">
            We adhere to strict web standards, accessibility guidelines (WCAG 2.1), and transparent publisher ethics. Our educational guides are authored by experienced multimedia software engineers and verified for technical accuracy before publication.
          </p>
        </section>
      </div>
    </div>
  );
}

