import type { Metadata } from 'next';
import Script from 'next/script';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'MediaHub — Universal Video Downloader & Creator Analytics Suite',
  description:
    'Download videos from TikTok (No Watermark), Instagram Reels, YouTube Shorts, and Twitter/X in 1080p HD or MP3, plus real-time Yandex Zen channel analytics.',
  other: {
    'google-adsense-account': 'ca-pub-3811332485680799',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3811332485680799" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3811332485680799"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans min-h-screen bg-[#09090b] text-white antialiased selection:bg-violet-500/30 selection:text-white">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
