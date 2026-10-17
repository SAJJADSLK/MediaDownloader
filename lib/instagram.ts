export interface InstagramResult {
  type: 'image' | 'video' | 'carousel';
  thumbnail: string;
  downloadUrl: string;
  items?: Array<{
    type: 'image' | 'video';
    url: string;
    thumbnail: string;
  }>;
  caption?: string;
  author?: string;
}

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Extracts the shortcode from an Instagram URL.
 * Handles /p/XXXXX/, /reel/XXXXX/, /reels/XXXXX/, and /tv/XXXXX/ patterns.
 */
export function extractShortcode(url: string): string {
  const match = url.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (!match || !match[2]) {
    throw new Error(
      'Could not extract shortcode from URL. Please provide a valid Instagram post, reel, or story link.'
    );
  }
  return match[2];
}

/**
 * Attempt to fetch media data via Instagram's JSON endpoint.
 */
async function fetchViaJsonEndpoint(url: string): Promise<InstagramResult | null> {
  try {
    const cleanUrl = url.split('?')[0].replace(/\/$/, '');
    const jsonUrl = `${cleanUrl}/?__a=1&__d=dis`;

    const response = await fetch(jsonUrl, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Fetch-Mode': 'navigate',
      },
      redirect: 'follow',
    });

    if (!response.ok) return null;

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('json')) return null;

    const json = await response.json();

    const media =
      json?.graphql?.shortcode_media ??
      json?.items?.[0] ??
      null;

    if (!media) return null;

    // Carousel / sidecar
    const edges =
      media.edge_sidecar_to_children?.edges ??
      media.carousel_media ??
      null;

    if (edges && Array.isArray(edges) && edges.length > 1) {
      const items = edges.map((edge: Record<string, unknown>) => {
        const node = (edge as { node?: Record<string, unknown> }).node ?? edge;
        const isVideo = Boolean(
          (node as Record<string, unknown>).is_video ??
          (node as Record<string, unknown>).video_versions
        );
        return {
          type: (isVideo ? 'video' : 'image') as 'image' | 'video',
          url: String(
            (node as Record<string, unknown>).video_url ??
            (node as Record<string, unknown>).display_url ??
            ((node as { image_versions2?: { candidates?: Array<{ url: string }> } }).image_versions2?.candidates?.[0]?.url) ??
            ''
          ),
          thumbnail: String(
            (node as Record<string, unknown>).display_url ??
            ((node as { image_versions2?: { candidates?: Array<{ url: string }> } }).image_versions2?.candidates?.[0]?.url) ??
            ''
          ),
        };
      });

      return {
        type: 'carousel',
        thumbnail: items[0]?.thumbnail ?? '',
        downloadUrl: items[0]?.url ?? '',
        items,
        caption: extractCaption(media),
        author: extractAuthor(media),
      };
    }

    // Single post
    const isVideo = Boolean(media.is_video ?? media.video_versions);
    const videoUrl =
      media.video_url ??
      media.video_versions?.[0]?.url ??
      '';
    const imageUrl =
      media.display_url ??
      media.image_versions2?.candidates?.[0]?.url ??
      '';

    return {
      type: isVideo ? 'video' : 'image',
      thumbnail: String(imageUrl || videoUrl),
      downloadUrl: String(isVideo ? videoUrl : imageUrl),
      caption: extractCaption(media),
      author: extractAuthor(media),
    };
  } catch {
    return null;
  }
}

/**
 * Fallback: fetch the page HTML and extract media from og meta tags.
 */
async function fetchViaHtmlScraping(url: string): Promise<InstagramResult> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(
      `Instagram returned HTTP ${response.status}. The post may be private or deleted.`
    );
  }

  const html = await response.text();

  // Extract og:video
  const ogVideoMatch = html.match(
    /<meta\s+(?:property|name)=["']og:video["']\s+content=["']([^"']+)["']/i
  ) ?? html.match(
    /content=["']([^"']+)["']\s+(?:property|name)=["']og:video["']/i
  );

  // Extract og:image
  const ogImageMatch = html.match(
    /<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i
  ) ?? html.match(
    /content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i
  );

  // Extract og:description for caption
  const ogDescMatch = html.match(
    /<meta\s+(?:property|name)=["']og:description["']\s+content=["']([^"']+)["']/i
  );

  // Extract og:title for author
  const ogTitleMatch = html.match(
    /<meta\s+(?:property|name)=["']og:title["']\s+content=["']([^"']+)["']/i
  );

  const videoUrl = ogVideoMatch?.[1] ?? '';
  const imageUrl = ogImageMatch?.[1] ?? '';
  const caption = ogDescMatch?.[1]?.replace(/&amp;/g, '&')?.replace(/&quot;/g, '"') ?? undefined;
  const author = ogTitleMatch?.[1]?.match(/@([\w.]+)/)?.[1] ?? ogTitleMatch?.[1] ?? undefined;

  if (!videoUrl && !imageUrl) {
    throw new Error(
      'Could not extract media from this Instagram post. It may be private, deleted, or require login.'
    );
  }

  const isVideo = Boolean(videoUrl);

  return {
    type: isVideo ? 'video' : 'image',
    thumbnail: decodeHtmlEntities(imageUrl || videoUrl),
    downloadUrl: decodeHtmlEntities(isVideo ? videoUrl : imageUrl),
    caption,
    author,
  };
}

function extractCaption(media: Record<string, unknown>): string | undefined {
  const edges = (
    media as {
      edge_media_to_caption?: { edges?: Array<{ node?: { text?: string } }> };
    }
  ).edge_media_to_caption?.edges;
  if (edges && edges.length > 0) {
    return edges[0]?.node?.text ?? undefined;
  }
  const captionObj = media.caption as { text?: string } | undefined;
  return captionObj?.text ?? undefined;
}

function extractAuthor(media: Record<string, unknown>): string | undefined {
  const owner = media.owner as { username?: string } | undefined;
  if (owner?.username) return owner.username;
  const user = media.user as { username?: string } | undefined;
  return user?.username ?? undefined;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function fetchInstagramMedia(url: string): Promise<InstagramResult> {
  if (!url || typeof url !== 'string') {
    throw new Error('A valid Instagram URL is required.');
  }

  // Validate we can extract a shortcode
  extractShortcode(url);

  // Strategy 1: Try the JSON endpoint
  const jsonResult = await fetchViaJsonEndpoint(url);
  if (jsonResult) return jsonResult;

  // Strategy 2: Fall back to HTML scraping
  return fetchViaHtmlScraping(url);
}
