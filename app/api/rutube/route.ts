import { NextRequest, NextResponse } from 'next/server';
import { getRutubeVideo } from '@/lib/rutube';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid Rutube video URL is required.' },
        { status: 400 }
      );
    }

    const trimmed = url.trim();
    if (!trimmed.includes('rutube.ru')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid link from rutube.ru (e.g. https://rutube.ru/video/...).' },
        { status: 400 }
      );
    }

    const data = await getRutubeVideo(trimmed);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to extract Rutube media.';
    console.error('Rutube API Route Error:', message);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
