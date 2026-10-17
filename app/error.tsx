'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime client error
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#09090b]">
      <div className="max-w-md w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 text-3xl flex items-center justify-center mx-auto">
          ⚠️
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            An unexpected error occurred while executing this operation. You can retry the request or return to the home screen.
          </p>
        </div>

        {error.message && (
          <div className="p-3 bg-black/40 rounded-xl text-left border border-white/[0.06] text-xs text-rose-300/80 font-mono break-words">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl py-3 text-sm transition-all shadow-lg shadow-violet-500/25"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium rounded-xl py-3 text-sm transition-all border border-white/[0.1] text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

