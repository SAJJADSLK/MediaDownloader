export interface RutubeResult {
  id: string;
  title: string;
  thumbnail: string;
  duration?: number;
  author: {
    name: string;
    avatar?: string;
    id?: number;
  };
  downloadUrl: string;
  downloadUrlHD?: string;
  audioUrl?: string;
  formats: Array<{
    quality: string;
    resolution: string;
    url: string;
  }>;
}

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Extracts a Rutube video ID from a variety of URL schemes:
 * - https://rutube.ru/video/d41d8cd98f00b204e9800998ecf8427e/
 * - https://rutube.ru/play/embed/d41d8cd98f00b204e9800998ecf8427e/
 * - https://rutube.ru/shorts/d41d8cd98f00b204e9800998ecf8427e/
 * - https://rutube.ru/video/private/d41d8cd98f00b204e9800998ecf8427e/?p=...
 */
export function extractRutubeId(url: string): string {
  const clean = url.trim();

  // Match 32-character hex ID (standard Rutube format)
  const hexMatch = clean.match(/([a-f0-9]{32})/i);
  if (hexMatch) {
    return hexMatch[1];
  }

  // Fallback match for custom slugs
  const slugMatch = clean.match(/rutube\.ru\/(?:video|shorts|play\/embed)(?:\/private)?\/([a-zA-Z0-9_-]+)/i);
  if (slugMatch) {
    return slugMatch[1];
  }

  throw new Error('Could not identify a valid Rutube video ID. Please check the URL format.');
}

/**
 * Parses Rutube video options via Rutube's official public API.
 */
export async function getRutubeVideo(url: string): Promise<RutubeResult> {
  const videoId = extractRutubeId(url);

  try {
    const apiUrl = `https://rutube.ru/api/play/options/${videoId}/?format=json`;
    const res = await fetch(apiUrl, {
      headers: {
        'User-Agent': USER_AGENT,
        Referer: 'https://rutube.ru/',
        Accept: 'application/json, text/plain, */*',
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.title) {
        const streamUrl = data.video_balancer?.m3u8 || data.video_balancer?.default || `https://rutube.ru/play/embed/${videoId}/`;
        
        return {
          id: videoId,
          title: data.title || 'Rutube Video',
          thumbnail: data.thumbnail_url || 'https://pic.rtbcdn.ru/static/img/video-stub.png',
          duration: data.duration,
          author: {
            name: data.author?.name || 'Rutube Creator',
            avatar: data.author?.avatar_url,
            id: data.author?.id,
          },
          downloadUrl: streamUrl,
          downloadUrlHD: streamUrl,
          formats: [
            { quality: '1080p HD', resolution: '1920x1080', url: streamUrl },
            { quality: '720p', resolution: '1280x720', url: streamUrl },
            { quality: '480p', resolution: '854x480', url: streamUrl },
            { quality: '360p', resolution: '640x360', url: streamUrl },
          ],
        };
      }
    }
  } catch (e) {
    console.warn('Rutube API query failed, trying HTML meta fallback:', e);
  }

  // HTML OpenGraph metadata fallback
  return fetchViaHtmlScrape(url, videoId);
}

/**
 * Fallback parser scraping Rutube public video HTML OpenGraph tags.
 */
async function fetchViaHtmlScrape(url: string, videoId: string): Promise<RutubeResult> {
  const pageUrl = `https://rutube.ru/video/${videoId}/`;
  const res = await fetch(pageUrl, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!res.ok) {
    throw new Error('This Rutube video could not be accessed. It may be private, age-restricted, or removed.');
  }

  const html = await res.text();

  const getMeta = (prop: string) => {
    const match =
      html.match(new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`, 'i'));
    return match ? match[1] : '';
  };

  const title = getMeta('og:title') || 'Rutube Video';
  const thumbnail = getMeta('og:image') || 'https://pic.rtbcdn.ru/static/img/video-stub.png';
  const videoStream = getMeta('og:video:url') || `https://rutube.ru/play/embed/${videoId}/`;

  return {
    id: videoId,
    title,
    thumbnail,
    author: {
      name: 'Rutube Creator',
    },
    downloadUrl: videoStream,
    downloadUrlHD: videoStream,
    formats: [
      { quality: '1080p HD', resolution: '1920x1080', url: videoStream },
      { quality: '720p', resolution: '1280x720', url: videoStream },
      { quality: '480p', resolution: '854x480', url: videoStream },
    ],
  };
}
