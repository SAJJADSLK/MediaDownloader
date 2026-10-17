export interface TikTokResult {
  id: string;
  title: string;
  cover: string;
  duration: number;
  author: {
    name: string;
    avatar: string;
  };
  playCount: number;
  downloadUrl: string;
  hdDownloadUrl: string;
  musicUrl: string;
}

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

export async function fetchTikTokVideo(url: string): Promise<TikTokResult> {
  if (!url || typeof url !== 'string') {
    throw new Error('A valid TikTok URL is required.');
  }

  const response = await fetch('https://www.tikwm.com/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': USER_AGENT,
    },
    body: `url=${encodeURIComponent(url)}&hd=1`,
  });

  if (!response.ok) {
    throw new Error(
      `TikTok API request failed with status ${response.status}. Please try again later.`
    );
  }

  const json = await response.json();

  if (json.code !== 0 || !json.data) {
    throw new Error(
      json.msg || 'Failed to fetch video data. The link may be invalid or the video is private.'
    );
  }

  const data = json.data;

  return {
    id: String(data.id ?? ''),
    title: data.title ?? 'Untitled',
    cover: data.cover ?? data.origin_cover ?? '',
    duration: Number(data.duration ?? 0),
    author: {
      name: data.author?.nickname ?? data.author?.unique_id ?? 'Unknown',
      avatar: data.author?.avatar ?? '',
    },
    playCount: Number(data.play_count ?? 0),
    downloadUrl: data.play ?? '',
    hdDownloadUrl: data.hdplay ?? data.play ?? '',
    musicUrl: data.music ?? '',
  };
}
