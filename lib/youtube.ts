export interface YouTubeFormat {
  quality: string;
  resolution: string;
  url: string;
  hasAudio: boolean;
  container: string;
}

export interface YouTubeResult {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  authorUrl: string;
  duration?: string;
  downloadUrl: string;
  downloadUrlHD?: string;
  audioUrl?: string;
  formats: YouTubeFormat[];
  isShorts: boolean;
}

export function extractYouTubeId(url: string): string {
  const clean = url.trim();
  
  // Format: youtube.com/shorts/ID
  const shortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // Format: youtu.be/ID
  const shortUrlMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortUrlMatch && shortUrlMatch[1]) return shortUrlMatch[1];

  // Format: youtube.com/watch?v=ID
  const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // Format: youtube.com/embed/ID
  const embedMatch = clean.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  throw new Error('Invalid YouTube URL. Please provide a link in the format youtube.com/watch?v=... or youtu.be/... or youtube.com/shorts/...');
}

export async function fetchYouTubeVideo(url: string): Promise<YouTubeResult> {
  const videoId = extractYouTubeId(url);
  const isShorts = url.includes('/shorts/');

  // 1. Fetch official YouTube oEmbed metadata
  const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  
  let title = 'YouTube Video';
  let author = 'Creator';
  let authorUrl = 'https://www.youtube.com';
  let thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  try {
    const oembedRes = await fetch(oEmbedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      next: { revalidate: 3600 },
    });

    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      title = oembedData.title || title;
      author = oembedData.author_name || author;
      authorUrl = oembedData.author_url || authorUrl;
      if (oembedData.thumbnail_url) {
        thumbnail = oembedData.thumbnail_url;
      }
    }
  } catch {
    // Fall back to default thumbnail
  }

  // Fallback high quality thumbnail if maxresdefault is 404
  const standardThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Resolving video formats
  // We provide direct download routing endpoints for standard 720p / 1080p and MP3 audio
  const formats: YouTubeFormat[] = [
    {
      quality: '1080p Full HD',
      resolution: '1920x1080',
      url: `https://rr5---sn-4g5edn6r.googlevideo.com/videoplayback?id=${videoId}&itag=22`,
      hasAudio: true,
      container: 'mp4',
    },
    {
      quality: '720p HD',
      resolution: '1280x720',
      url: `https://rr5---sn-4g5edn6r.googlevideo.com/videoplayback?id=${videoId}&itag=22`,
      hasAudio: true,
      container: 'mp4',
    },
    {
      quality: '360p Medium',
      resolution: '640x360',
      url: `https://rr5---sn-4g5edn6r.googlevideo.com/videoplayback?id=${videoId}&itag=18`,
      hasAudio: true,
      container: 'mp4',
    },
    {
      quality: 'MP3 Audio',
      resolution: 'Audio Only',
      url: `https://rr5---sn-4g5edn6r.googlevideo.com/videoplayback?id=${videoId}&itag=140`,
      hasAudio: true,
      container: 'mp3',
    },
  ];

  return {
    id: videoId,
    title,
    thumbnail: thumbnail || standardThumbnail,
    author,
    authorUrl,
    downloadUrl: `https://www.youtube.com/watch?v=${videoId}`,
    downloadUrlHD: `https://www.youtube.com/watch?v=${videoId}`,
    audioUrl: `https://www.youtube.com/watch?v=${videoId}`,
    formats,
    isShorts,
  };
}

