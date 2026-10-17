import { NextResponse } from 'next/server';
import { fetchTwitterMedia } from '@/lib/twitter';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url } = body as { url?: string };

    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid Twitter / X post link.' },
        { status: 400 }
      );
    }

    const normalizedUrl = url.trim().toLowerCase();
    if (!normalizedUrl.includes('twitter.com') && !normalizedUrl.includes('x.com')) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL. Please provide a link from x.com or twitter.com.' },
        { status: 400 }
      );
    }

    const result = await fetchTwitterMedia(url.trim());

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An error occurred while fetching Twitter / X video.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

