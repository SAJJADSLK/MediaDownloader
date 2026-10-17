'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { detectPlatform, type DetectionResult } from '@/lib/detector';

interface DownloadFormProps {
  platform: 'tiktok' | 'instagram' | 'youtube' | 'twitter';
  placeholder: string;
  onSubmit: (url: string) => void;
  loading: boolean;
  initialUrl?: string;
}

export function DownloadForm({
  platform,
  placeholder,
  onSubmit,
  loading,
  initialUrl = '',
}: DownloadFormProps) {
  const [url, setUrl] = useState(initialUrl);
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (initialUrl) {
      setUrl(initialUrl);
      const res = detectPlatform(initialUrl, platform);
      setDetection(res);
    }
  }, [initialUrl, platform]);

  const handleInputChange = (val: string) => {
    setUrl(val);
    if (val.trim()) {
      setDetection(detectPlatform(val, platform));
    } else {
      setDetection(null);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleInputChange(text);
    } catch {
      // Clipboard access denied or unavailable
    }
  };

  const handleClear = () => {
    setUrl('');
    setDetection(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;

    // Check if platform is mismatched
    if (detection && detection.suggestedAction && detection.platform !== platform) {
      router.push(detection.suggestedAction.targetPath);
      return;
    }

    onSubmit(trimmed);
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-5 py-4 text-white text-base sm:text-lg placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all pr-24"
            />

            {/* Clear button */}
            {url && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Clear input"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            {/* Paste button */}
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors p-1.5 hover:bg-white/[0.05] rounded-lg"
              title="Paste from clipboard"
              aria-label="Paste from clipboard"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-8 py-4 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap min-w-[150px]"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Download</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Smart Platform Detection Feedback */}
      {detection && url.trim().length > 5 && (
        <div className="animate-fade-in">
          {/* Mismatched Platform Suggestion */}
          {detection.suggestedAction && detection.platform !== platform && (
            <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-500/30 text-violet-200 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="font-semibold text-white">{detection.label} Detected</p>
                  <p className="text-violet-300/80 text-xs">{detection.suggestedAction.message}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.push(detection.suggestedAction!.targetPath)}
                className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors whitespace-nowrap self-end sm:self-auto"
              >
                Switch to {detection.suggestedAction.targetName} →
              </button>
            </div>
          )}

          {/* Unsupported Platform Feedback */}
          {!detection.isSupported && detection.suggestedAction && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-semibold text-white">{detection.label}</p>
                <p className="text-rose-300/80 text-xs">{detection.suggestedAction.message}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
