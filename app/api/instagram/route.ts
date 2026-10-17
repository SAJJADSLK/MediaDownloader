import { NextResponse } from 'next/server';
import { fetchInstagramMedia } from '@/lib/instagram';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url } = body as { url?: string };

    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please provide an Instagram post or reel URL.' },
        { status: 400 }
      );
    }

    const normalizedUrl = url.trim().toLowerCase();
    if (!normalizedUrl.includes('instagram.com') && !normalizedUrl.includes('instagr.am')) {
      return NextResponse.json(
        { success: false, error: 'Invalid URL. Please provide a valid link from instagram.com.' },
        { status: 400 }
      );
    }

    const result = await fetchInstagramMedia(url.trim());

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'An unexpected error occurred while parsing Instagram media.';
    
    const isPrivate = message.toLowerCase().includes('private') || message.toLowerCase().includes('login');
    const isNotFound = message.toLowerCase().includes('not found') || message.toLowerCase().includes('deleted');
    const status = isPrivate ? 403 : isNotFound ? 404 : 500;

    return NextResponse.json({ success: false, error: message }, { status });
  }
}
