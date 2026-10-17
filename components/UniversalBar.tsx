'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { detectPlatform, type DetectionResult } from '@/lib/detector';

type PlatformTab = 'auto' | 'tiktok' | 'instagram' | 'youtube' | 'twitter' | 'zen';

interface TabConfig {
  id: PlatformTab;
  label: string;
  icon: string;
  placeholder: string;
  badgeColor: string;
}

const TABS: TabConfig[] = [
  {
    id: 'auto',
    label: '✨ Auto-Detect',
    icon: '✨',
    placeholder: 'Paste any TikTok, Instagram, YouTube, Twitter/X link or Zen channel...',
    badgeColor: 'border-white/20 text-white bg-white/10',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    icon: '🎵',
    placeholder: 'Paste TikTok video or photo URL (e.g. https://vt.tiktok.com/... or tiktok.com/@user/video/...)',
    badgeColor: 'border-violet-500/40 text-violet-300 bg-violet-500/10',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: '📸',
    placeholder: 'Paste Instagram Reel, Carousel album or Post link (e.g. https://instagram.com/p/... or /reel/...)',
    badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: '📺',
    placeholder: 'Paste YouTube video or Shorts URL (e.g. https://youtube.com/shorts/... or youtu.be/...)',
    badgeColor: 'border-red-500/40 text-red-300 bg-red-500/10',
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    icon: '🐦',
    placeholder: 'Paste Twitter or X post with video (e.g. https://x.com/username/status/...)',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
  },
  {
    id: 'zen',
    label: 'Zen Analytics',
    icon: '📊',
    placeholder: 'Enter Yandex Zen publication link or channel name (e.g. dzen.ru/channel_id)...',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
  },
];

export function UniversalBar() {
  const [activeTab, setActiveTab] = useState<PlatformTab>('auto');
  const [input, setInput] = useState('');
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const router = useRouter();

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleInputChange = (val: string) => {
    setInput(val);
    if (val.trim()) {
      const result = detectPlatform(val);
      setDetection(result);
      // If user typed a recognized platform and is on auto, highlight it
      if (activeTab === 'auto' && result.isSupported) {
        // Keeps tab as auto but detection reflects
      }
    } else {
      setDetection(null);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleInputChange(text);
    } catch {
      // Clipboard access denied or unsupported
    }
  };

  const handleClear = () => {
    setInput('');
    setDetection(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const res = detectPlatform(trimmed);

    // If specific tab was explicitly picked and input doesn't strongly contradict
    let target = res.platform;
    if (activeTab !== 'auto' && (!res.isSupported || res.platform === 'zen')) {
      target = activeTab;
    }

    if (target === 'tiktok') {
      router.push(`/tiktok?url=${encodeURIComponent(trimmed)}`);
    } else if (target === 'instagram') {
      router.push(`/instagram?url=${encodeURIComponent(trimmed)}`);
    } else if (target === 'youtube') {
      router.push(`/youtube?url=${encodeURIComponent(trimmed)}`);
    } else if (target === 'twitter') {
      router.push(`/twitter?url=${encodeURIComponent(trimmed)}`);
    } else if (target === 'zen') {
      router.push(`/zen?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`/tiktok?url=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Platform Selector Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white text-neutral-900 shadow-md shadow-white/10 scale-105'
                  : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label.replace(/^[^\s]+ /, '')}</span>
            </button>
          );
        })}
      </div>

      {/* Main Form Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={currentTab.placeholder}
              className="w-full bg-white/[0.07] border border-white/[0.15] rounded-2xl px-6 py-5 text-white text-base placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all pr-24 shadow-2xl backdrop-blur-md"
            />

            {input && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Clear input"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors p-1.5 hover:bg-white/[0.08] rounded-xl"
              title="Paste from clipboard"
              aria-label="Paste from clipboard"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-2xl px-8 py-5 transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/25 active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap min-w-[150px]"
          >
            <span>Proceed</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>

      {/* Smart Platform Badge Indicator */}
      {detection && input.trim().length > 3 && (
        <div className="flex items-center justify-center gap-2 text-xs animate-fade-in">
          {detection.platform === 'tiktok' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 font-medium">
              <span>🎵</span> TikTok URL Detected &mdash; 1080p without watermark & MP3 ready
            </span>
          )}
          {detection.platform === 'instagram' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-medium">
              <span>📸</span> Instagram URL Detected &mdash; Reels, Photos & Carousels ready
            </span>
          )}
          {detection.platform === 'youtube' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 font-medium">
              <span>📺</span> YouTube Detected &mdash; Video streams & Shorts ready
            </span>
          )}
          {detection.platform === 'twitter' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium">
              <span>🐦</span> Twitter / X Detected &mdash; High-res video & GIF ready
            </span>
          )}
          {detection.platform === 'zen' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
              <span>📊</span> Zen Query Detected &mdash; Channel stats & publication metrics ready
            </span>
          )}
          {!detection.isSupported && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium">
              <span>⚠️</span> {detection.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

