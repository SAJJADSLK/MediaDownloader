import { NextResponse } from 'next/server';
import { fetchYouTubeVideo } from '@/lib/youtube';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url } = body as { url?: string };

    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid YouTube video or Shorts link.' },
        { status: 400 }
      );
    }

    const normalizedUrl = url.trim().toLowerCase();
    if (!normalizedUrl.includes('youtube.com') && !normalizedUrl.includes('youtu.be')) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL. Please provide a link from youtube.com or youtu.be.' },
        { status: 400 }
      );
    }

    const result = await fetchYouTubeVideo(url.trim());

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An error occurred while fetching YouTube video data.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

