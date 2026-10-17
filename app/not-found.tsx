import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#09090b]">
      <div className="max-w-md w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 text-violet-400 text-3xl flex items-center justify-center mx-auto font-bold font-mono">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
          <Link href="/tiktok" className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors">
            TikTok Downloader
          </Link>
          <Link href="/instagram" className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors">
            Instagram Downloader
          </Link>
          <Link href="/zen" className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors">
            Zen Analytics
          </Link>
          <Link href="/blog" className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors">
            Guides & Blog
          </Link>
        </div>

        <Link
          href="/"
          className="inline-block w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl py-3 text-sm transition-all shadow-lg shadow-violet-500/25"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

