import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                MediaHub
              </span>
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
              Universal media toolkit and creator audience intelligence suite. Built for privacy, speed, and lossless content preservation.
            </p>
            <div className="text-[11px] text-neutral-500 pt-2 leading-tight">
              <strong>Disclaimer:</strong> MediaHub is an independent utility and is not affiliated with ByteDance, TikTok, Meta, Instagram, or Yandex.
            </div>
          </div>

          {/* Quick Tools */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider">
              Media Tools
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/tiktok"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  TikTok Video Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/instagram"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Instagram Reels & Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/youtube"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  YouTube Video & Shorts
                </Link>
              </li>
              <li>
                <Link
                  href="/twitter"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Twitter / X Video Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/rutube"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Rutube Video Downloader
                </Link>
              </li>
              <li>
                <Link
                  href="/zen"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Zen Channel Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Guides */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider">
              Editorial & Guides
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Creator Knowledge Base
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider">
              Legal & Compliance
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Privacy Policy & Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/dmca"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  DMCA Copyright Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] bg-[#070709]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <p>© 2026 MediaHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-neutral-400 transition-colors">Terms</Link>
            <Link href="/dmca" className="hover:text-neutral-400 transition-colors">DMCA</Link>
            <Link href="/contact" className="hover:text-neutral-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
