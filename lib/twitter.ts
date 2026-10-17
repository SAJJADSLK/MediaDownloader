export interface TwitterResult {
  id: string;
  text: string;
  author: {
    name: string;
    screenName: string;
    avatar: string;
  };
  thumbnail: string;
  downloadUrl: string;
  downloadUrlHD?: string;
  type: 'video' | 'image' | 'gif';
  duration?: string;
}

export function extractTweetId(url: string): string {
  const clean = url.trim();
  const match = clean.match(/(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/i);
  if (match && match[2]) {
    return match[2];
  }

  // Direct status ID pattern
  const idOnlyMatch = clean.match(/\/status\/(\d+)/);
  if (idOnlyMatch && idOnlyMatch[1]) {
    return idOnlyMatch[1];
  }

  throw new Error('Invalid Twitter / X link. Please provide a link formatted like https://x.com/username/status/123456789');
}

export async function fetchTwitterMedia(url: string): Promise<TwitterResult> {
  const tweetId = extractTweetId(url);

  // 1. Fetch official Twitter / X publish oEmbed
  const oEmbedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`;
  
  let authorName = 'Twitter User';
  let authorScreenName = 'user';
  let tweetText = 'Twitter Video';

  try {
    const oembedRes = await fetch(oEmbedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      authorName = oembedData.author_name || authorName;
      authorScreenName = oembedData.author_url?.split('/').pop() || authorScreenName;
      
      // Strip HTML tags from tweet text
      if (oembedData.html) {
        tweetText = oembedData.html
          .replace(/<blockquote[^>]*>/, '')
          .replace(/<\/blockquote>/, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
    }
  } catch {
    // Continue with defaults
  }

  // Construct direct video stream links
  const downloadUrl = `https://video.twimg.com/ext_tw_video/${tweetId}/pu/vid/720x1280/video.mp4`;
  const downloadUrlHD = `https://video.twimg.com/ext_tw_video/${tweetId}/pu/vid/1080x1920/video.mp4`;

  return {
    id: tweetId,
    text: tweetText.slice(0, 160) || 'Twitter / X Media',
    author: {
      name: authorName,
      screenName: authorScreenName,
      avatar: '',
    },
    thumbnail: `https://pbs.twimg.com/media/tweet_${tweetId}.jpg`,
    downloadUrl,
    downloadUrlHD,
    type: 'video',
  };
}

