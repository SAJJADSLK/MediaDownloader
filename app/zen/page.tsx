'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatNumber, formatDate } from '@/lib/zen';
import { AdUnit } from '@/components/AdUnit';
import type { ZenSearchResult } from '@/lib/zen';

const TRENDING_TOPICS = [
  'Technology',
  'Sports',
  'Politics',
  'Food',
  'Entertainment',
  'Science',
  'Travel',
  'Gaming',
  'Health',
  'Finance',
];

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={10} />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx={9} cy={7} r={4} />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function TrendingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton loaders                                                   */
/* ------------------------------------------------------------------ */

function ChannelCardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-white/[0.05]" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-white/[0.05] rounded-lg" />
          <div className="h-3 w-1/3 bg-white/[0.05] rounded-lg" />
        </div>
      </div>
      <div className="h-4 w-full bg-white/[0.05] rounded-lg mb-2" />
      <div className="h-4 w-2/3 bg-white/[0.05] rounded-lg mb-5" />
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 bg-white/[0.05] rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 animate-pulse flex gap-4">
      <div className="w-8 h-8 rounded-lg bg-white/[0.05] shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-5 w-4/5 bg-white/[0.05] rounded-lg" />
        <div className="h-3 w-1/3 bg-white/[0.05] rounded-lg" />
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-white/[0.05] rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

function ZenAnalyticsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<ZenSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'channels' | 'posts'>('channels');

  const handleSearch = useCallback(
    async (searchQuery?: string) => {
      const q = (searchQuery ?? query).trim();
      if (!q) return;

      setLoading(true);
      setError('');
      setResults(null);
      if (searchQuery) setQuery(searchQuery);

      try {
        const res = await fetch(`/api/zen?q=${encodeURIComponent(q)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? `Request failed (${res.status})`);
        }
        const data: ZenSearchResult = await res.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  useEffect(() => {
    if (initialQ) {
      handleSearch(initialQ);
    }
  }, [initialQ, handleSearch]);

  const gradientColors = [
    'from-violet-500 to-fuchsia-500',
    'from-fuchsia-500 to-pink-500',
    'from-pink-500 to-rose-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
    'from-cyan-500 to-blue-500',
    'from-blue-500 to-indigo-500',
    'from-indigo-500 to-violet-500',
  ];

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* ---- Header ---- */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
              <TrendingIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Zen Analytics
            </h1>
          </div>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Explore Dzen channels and posts. Analyze engagement metrics,
            subscriber growth, and content performance across the platform.
          </p>
        </div>
      </section>

      {/* ---- Search ---- */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search channels, topics, or keywords…"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-13 pr-5 py-4 text-white text-lg placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl px-8 py-3.5 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2 shrink-0"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <SearchIcon className="w-5 h-5" />
              )}
              Analyze
            </button>
          </form>
        </div>
      </section>

      {/* Compliant Ad Placement Slot 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdUnit format="horizontal" />
      </div>

      {/* ---- Error ---- */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}

      {/* ---- Results ---- */}
      {(loading || results) && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Tab switcher */}
            <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
              {(['channels', 'posts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-3 text-sm font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {tab === 'channels' ? 'Channels' : 'Posts'}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full" />
                  )}
                  {results && (
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                        activeTab === tab
                          ? 'bg-violet-500/20 text-violet-300'
                          : 'bg-white/[0.05] text-neutral-500'
                      }`}
                    >
                      {tab === 'channels'
                        ? results.channels.length
                        : results.posts.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Channels grid */}
            {activeTab === 'channels' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <ChannelCardSkeleton key={i} />
                    ))
                  : results?.channels.map((ch, idx) => {
                      const firstLetter = ch.title.charAt(0).toUpperCase();
                      const gradient =
                        gradientColors[idx % gradientColors.length];

                      return (
                        <a
                          key={ch.id}
                          href={ch.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group block"
                        >
                          {/* Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div
                              className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}
                            >
                              <span className="text-white font-bold text-lg">
                                {firstLetter}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-white font-semibold text-base truncate group-hover:text-violet-300 transition-colors">
                                {ch.title}
                              </h3>
                              <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                                {ch.category}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 mb-5">
                            {ch.description}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white/[0.03] rounded-xl px-3 py-2.5 text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <UsersIcon className="w-3 h-3 text-neutral-500" />
                                <span className="text-neutral-500 text-xs">
                                  Subs
                                </span>
                              </div>
                              <span className="text-white font-semibold text-sm">
                                {formatNumber(ch.subscriberCount)}
                              </span>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl px-3 py-2.5 text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <FileIcon className="w-3 h-3 text-neutral-500" />
                                <span className="text-neutral-500 text-xs">
                                  Posts
                                </span>
                              </div>
                              <span className="text-white font-semibold text-sm">
                                {formatNumber(ch.publicationCount)}
                              </span>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl px-3 py-2.5 text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <EyeIcon className="w-3 h-3 text-neutral-500" />
                                <span className="text-neutral-500 text-xs">
                                  Views
                                </span>
                              </div>
                              <span className="text-white font-semibold text-sm">
                                {formatNumber(ch.viewCount)}
                              </span>
                            </div>
                          </div>
                        </a>
                      );
                    })}
              </div>
            )}

            {/* Posts list */}
            {activeTab === 'posts' && (
              <div className="flex flex-col gap-3">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <PostCardSkeleton key={i} />
                    ))
                  : results?.posts.map((post, idx) => (
                      <a
                        key={post.id}
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group flex gap-4"
                      >
                        {/* Rank */}
                        <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                          <span className="text-neutral-400 font-semibold text-sm">
                            {idx + 1}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium text-base leading-snug mb-1.5 group-hover:text-violet-300 transition-colors line-clamp-2">
                            {post.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                            <span className="text-sm text-neutral-400">
                              {post.channelTitle}
                            </span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-sm text-neutral-500 flex items-center gap-1">
                              <ClockIcon className="w-3.5 h-3.5" />
                              {formatDate(post.publishDate)}
                            </span>
                            <span className="text-neutral-600">·</span>
                            <span className="text-sm text-neutral-500">
                              {post.readTime} min read
                            </span>
                          </div>

                          {/* Stats badges */}
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.05] text-neutral-300">
                              <EyeIcon className="w-3.5 h-3.5 text-blue-400" />
                              {formatNumber(post.viewCount)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.05] text-neutral-300">
                              <HeartIcon className="w-3.5 h-3.5 text-pink-400" />
                              {formatNumber(post.likeCount)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.05] text-neutral-300">
                              <ChatIcon className="w-3.5 h-3.5 text-violet-400" />
                              {formatNumber(post.commentCount)}
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---- Trending Topics ---- */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2.5 mb-6">
            <TrendingIcon className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-xl font-semibold text-white">
              Trending Topics
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setActiveTab('channels');
                  handleSearch(topic);
                }}
                className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] hover:border-white/[0.12] rounded-full px-4 py-2 text-sm text-neutral-300 hover:text-white transition-all duration-200 active:scale-[0.97]"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Value Section: In-Depth Zen Analytics Guide */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 sm:p-12 space-y-8 text-neutral-300">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Understanding Yandex Zen (Дзен) Algorithmic Metrics & Monetization
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-4xl">
                Yandex Zen is one of the largest content recommendation platforms in Eastern Europe and Central Asia, utilizing machine learning to analyze user reading sessions and content affinity. For digital publishers and creators, understanding how key metrics influence distribution is essential for sustainable channel growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-400 border-t border-white/[0.06] pt-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-white text-sm">1. Read-Through Rate (Дочитывания)</h3>
                <p className="leading-relaxed">
                  Unlike platforms that prioritize raw clicks, Zen calculates the percentage of users who scroll to the end of a publication and spend at least 40 seconds reading. A read-through rate above 70% signals high editorial quality to the algorithm.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-white text-sm">2. Engagement Velocity (ER)</h3>
                <p className="leading-relaxed">
                  The speed at which initial impressions turn into likes, bookmarks, and meaningful comment threads within the first two hours of publication determines whether the post enters broad algorithmic recommendation feeds.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-white text-sm">3. Audience Retention Curve</h3>
                <p className="leading-relaxed">
                  Channels that retain subscribers through recurring daily publications receive compounding reach bonuses. Analyzing publication cadence and average view counts helps creators diagnose audience churn.
                </p>
              </div>
            </div>
          </div>

          {/* Compliant Ad Placement Slot 2 */}
          <div className="mt-8">
            <AdUnit format="banner" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ZenPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-neutral-400">
        Loading Zen Analytics...
      </div>
    }>
      <ZenAnalyticsContent />
    </Suspense>
  );
}
