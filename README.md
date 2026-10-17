# MediaHub — Universal Media & Creator Intelligence Suite

An all-in-one web platform uniting **TikTok Downloader**, **Instagram Downloader**, **YouTube Video & Shorts Downloader**, **Twitter / X Downloader**, and **Yandex Zen Publisher Analytics** into a single, high-performance web application. Built with modern web technologies and optimized for **Vercel Serverless & Edge**.

---

## ⚡ Cutting-Edge Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Runtime**: React 19 + Vercel Edge Runtime for sub-millisecond API cold starts
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first engine with `@theme`)
- **Typography**: [Geist](https://vercel.com/font) (Sans & Mono)
- **Deployment**: [Vercel](https://vercel.com/) (Serverless & Edge functions)
- **Monetization Architecture**: Built to comply with **Google AdSense Policies** (eliminates "Low-Value Content" rejections with comprehensive editorial guides, E-E-A-T publisher pages, and CLS-safe ad slots)

---

## 🚀 Supported Platforms & Tools

### 1. 🎵 TikTok Downloader (`/tiktok`)
- Downloads TikTok videos **without watermarks** in HD 1080p.
- Extracts original studio **MP3 audio** tracks.
- Direct client-side streaming prevents serverless timeout bottlenecks.

### 2. 📸 Instagram Downloader (`/instagram`)
- Downloads **Reels, multi-slide Carousel albums, and photos**.
- Unpacks multi-item carousel albums slide-by-slide.
- High-resolution JPEG/PNG and synchronized AAC/MP4 vertical video.

### 3. 📺 YouTube Shorts & Video Downloader (`/youtube`)
- Compatible with **YouTube Shorts** and standard landscape videos.
- Resolution stream selection: 1080p, 720p, 480p, 360p, and MP3 audio.
- Creator archiving guides and Fair Use (17 U.S. Code § 107) compliance notices.

### 4. 🐦 Twitter / X Video Downloader (`/twitter`)
- Extracts MP4 videos and animated GIFs from public tweets.
- Supports both `x.com` and `twitter.com` URL formats.
- No account login or application permissions needed.

### 5. 📊 Zen Channel & Post Analytics (`/zen`)
- Search and analyze **Yandex Zen (Дзен)** channels and publications.
- Metric indicators: Subscribers, post counts, total views, read-through rates, and categories.
- Trending topic pills to explore viral content.

---

## 🧠 Smart System Features

- **Universal Smart Bar**: Paste ANY link on the homepage—the engine auto-detects whether it's TikTok, Instagram, YouTube, Twitter, or Zen and routes instantly.
- **Cross-Platform Mismatch Intelligence**: If a user pastes an Instagram link on the TikTok page, a 1-click switcher banner allows instant switching without re-copying.
- **Granular Error Handling**: Provides explicit error codes (`INVALID_FORMAT`, `PRIVATE_ACCOUNT`, `NOT_FOUND`, `RATE_LIMITED`) with actionable troubleshooting advice.

---

## 📄 Google AdSense Compliance Suite

To eliminate Google AdSense "Low-Value Content" and "Site Not Ready" rejections:
- **Comprehensive Editorial Guides** on every tool page detailing video codecs, container bitrates, and device walkthroughs.
- **Knowledge Base (`/blog`)** with 4 in-depth original articles.
- **Mandatory Trust & Legal Pages**:
  - `/privacy` — GDPR/CCPA & Google DoubleClick DART cookie policy
  - `/terms` — Terms of Service & non-affiliation disclaimers
  - `/dmca` — DMCA Copyright Policy & takedown agent contacts
  - `/about` — E-E-A-T publisher credibility & engineering philosophy
  - `/contact` — Interactive contact form with response SLA
- **Dynamic SEO Indexing**:
  - `sitemap.xml` generated automatically via `app/sitemap.ts`
  - `robots.txt` generated via `app/robots.ts`
- **CLS-Safe Ad Component**: `components/AdUnit.tsx` prevents layout shifts.

---

## 📁 Project Structure

```
mediahub/
├── app/
│   ├── layout.tsx              # Root layout with Geist fonts & dark theme
│   ├── page.tsx                # Unified landing page with Universal Smart Bar
│   ├── globals.css             # Tailwind v4 theme, keyframe glows & scrollbars
│   ├── error.tsx               # Global client error boundary
│   ├── not-found.tsx           # Custom 404 recovery page
│   ├── sitemap.ts              # Dynamic sitemap.xml generator
│   ├── robots.ts               # Dynamic robots.txt generator
│   ├── tiktok/page.tsx         # TikTok downloader UI
│   ├── instagram/page.tsx      # Instagram downloader UI
│   ├── youtube/page.tsx        # YouTube Shorts & Video UI
│   ├── twitter/page.tsx        # Twitter / X downloader UI
│   ├── zen/page.tsx            # Zen analytics dashboard
│   ├── blog/page.tsx           # Creator Knowledge Base & Guides
│   ├── about/page.tsx          # About us & E-E-A-T trust page
│   ├── contact/page.tsx        # Interactive contact form
│   ├── privacy/page.tsx        # AdSense-compliant Privacy Policy
│   ├── terms/page.tsx          # Terms of Service & Disclaimers
│   ├── dmca/page.tsx           # DMCA Copyright Takedown Policy
│   └── api/
│       ├── tiktok/route.ts     # Edge API route for TikTok
│       ├── instagram/route.ts  # Edge API route for Instagram
│       ├── youtube/route.ts    # Edge API route for YouTube
│       ├── twitter/route.ts    # Edge API route for Twitter
│       └── zen/route.ts        # Edge API route for Zen search
├── components/
│   ├── Navbar.tsx              # Navigation with mobile drawer
│   ├── Footer.tsx              # Full legal, disclaimer & tool links
│   ├── UniversalBar.tsx        # Smart universal auto-detect input bar
│   ├── DownloadForm.tsx        # Platform input with live detection badge
│   ├── MediaCard.tsx           # Media card with client blob downloading
│   └── AdUnit.tsx              # CLS-safe AdSense-ready ad slot
├── lib/
│   ├── detector.ts             # Smart platform classifier & router
│   ├── tiktok.ts               # TikTok API client
│   ├── instagram.ts            # Instagram parser
│   ├── youtube.ts              # YouTube video & shorts parser
│   ├── twitter.ts              # Twitter / X video parser
│   └── zen.ts                  # Zen publisher analytics client
├── next.config.ts              # Remote pattern wildcard optimization
├── postcss.config.mjs          # Tailwind v4 PostCSS configuration
├── tsconfig.json               # TypeScript 5.7+ bundler configuration
├── vercel.json                 # Pre-configured Vercel serverless deployment
└── package.json                # Project dependencies
```

---

## 🛠️ Local Development & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server with Turbopack
npm run dev

# 3. Deploy to Vercel (CLI)
npx vercel
```

---

## 💰 Configured AdSense Credentials

- **Publisher ID**: `ca-pub-3811332485680799`
- **Verification Script**: Included in `app/layout.tsx` (`<meta name="google-adsense-account">` + asynchronous `pagead2.googlesyndication.com` script loader).
- **Authorized Digital Sellers (`ads.txt`)**: Available at `public/ads.txt`:
  ```
  google.com, pub-3811332485680799, DIRECT, f08c47fec0942fa0
  ```
- **Ad Components**: `<AdUnit />` embedded across all tool pages (`/tiktok`, `/instagram`, `/youtube`, `/twitter`, `/zen`), the homepage, and the editorial blog (`/blog`) with automatic CLS preservation to protect Google Core Web Vitals.
