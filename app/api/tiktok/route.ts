import { NextResponse } from 'next/server';
import { fetchTikTokVideo } from '@/lib/tiktok';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url } = body as { url?: string };

    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid TikTok video URL.' },
        { status: 400 }
      );
    }

    const normalizedUrl = url.trim().toLowerCase();
    if (
      !normalizedUrl.includes('tiktok.com') &&
      !normalizedUrl.includes('douyin.com')
    ) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid URL format. Please ensure your link is from tiktok.com or vm.tiktok.com.' 
        },
        { status: 400 }
      );
    }

    const result = await fetchTikTokVideo(url.trim());

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred while processing the video.';
    
    // Distinguish between private/not found and server issues
    const isNotFound = message.toLowerCase().includes('not found') || message.toLowerCase().includes('private');
    const status = isNotFound ? 404 : 500;

    return NextResponse.json({ success: false, error: message }, { status });
  }
}
