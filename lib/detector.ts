export type DetectedPlatform = 
  | 'tiktok'
  | 'instagram'
  | 'zen'
  | 'youtube'
  | 'twitter'
  | 'rutube'
  | 'facebook'
  | 'unknown';

export interface DetectionResult {
  platform: DetectedPlatform;
  isSupported: boolean;
  cleanUrl: string;
  confidence: 'high' | 'medium' | 'low';
  label: string;
  badgeColor: string;
  suggestedAction?: {
    targetPath: string;
    targetName: string;
    message: string;
  };
}

/**
 * Smart URL & Input Detector
 * Automatically parses any URL, query, or snippet to detect the origin platform.
 */
export function detectPlatform(input: string, currentContext?: 'tiktok' | 'instagram' | 'zen' | 'youtube' | 'twitter' | 'rutube'): DetectionResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      platform: 'unknown',
      isSupported: false,
      cleanUrl: '',
      confidence: 'low',
      label: 'Empty input',
      badgeColor: 'neutral',
    };
  }

  const lower = trimmed.toLowerCase();

  // 1. TikTok Detection
  const isTikTok = 
    lower.includes('tiktok.com') ||
    lower.includes('vm.tiktok.com') ||
    lower.includes('vt.tiktok.com') ||
    lower.includes('douyin.com') ||
    /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\//.test(lower);

  if (isTikTok) {
    const isMismatched = currentContext && currentContext !== 'tiktok';
    return {
      platform: 'tiktok',
      isSupported: true,
      cleanUrl: trimmed.split('?')[0],
      confidence: 'high',
      label: 'TikTok Video',
      badgeColor: 'violet',
      suggestedAction: isMismatched ? {
        targetPath: `/tiktok?url=${encodeURIComponent(trimmed)}`,
        targetName: 'TikTok Downloader',
        message: 'This is a TikTok link! Click to switch to the TikTok Downloader.',
      } : undefined,
    };
  }

  // 2. Instagram Detection
  const isInstagram = 
    lower.includes('instagram.com') ||
    lower.includes('instagr.am') ||
    /\/(p|reel|reels|tv|stories)\/[a-za-z0-9_-]+/.test(lower);

  if (isInstagram) {
    const isMismatched = currentContext && currentContext !== 'instagram';
    return {
      platform: 'instagram',
      isSupported: true,
      cleanUrl: trimmed.split('?')[0],
      confidence: 'high',
      label: 'Instagram Media',
      badgeColor: 'pink',
      suggestedAction: isMismatched ? {
        targetPath: `/instagram?url=${encodeURIComponent(trimmed)}`,
        targetName: 'Instagram Downloader',
        message: 'This is an Instagram link! Click to switch to the Instagram Downloader.',
      } : undefined,
    };
  }

  // 3. YouTube Detection (Now fully supported!)
  const isYouTube = 
    lower.includes('youtube.com') || 
    lower.includes('youtu.be');

  if (isYouTube) {
    const isMismatched = currentContext && currentContext !== 'youtube';
    return {
      platform: 'youtube',
      isSupported: true,
      cleanUrl: trimmed,
      confidence: 'high',
      label: lower.includes('/shorts/') ? 'YouTube Shorts' : 'YouTube Video',
      badgeColor: 'rose',
      suggestedAction: isMismatched ? {
        targetPath: `/youtube?url=${encodeURIComponent(trimmed)}`,
        targetName: 'YouTube Downloader',
        message: 'This is a YouTube link! Click to switch to YouTube Downloader.',
      } : undefined,
    };
  }

  // 4. Twitter / X Detection (Now fully supported!)
  const isTwitter = 
    lower.includes('twitter.com') || 
    lower.includes('x.com');

  if (isTwitter) {
    const isMismatched = currentContext && currentContext !== 'twitter';
    return {
      platform: 'twitter',
      isSupported: true,
      cleanUrl: trimmed,
      confidence: 'high',
      label: 'Twitter / X Video',
      badgeColor: 'blue',
      suggestedAction: isMismatched ? {
        targetPath: `/twitter?url=${encodeURIComponent(trimmed)}`,
        targetName: 'Twitter Downloader',
        message: 'This is a Twitter / X post! Click to switch to Twitter Downloader.',
      } : undefined,
    };
  }

  // 5. Yandex Zen Detection
  const isZenUrl = 
    lower.includes('dzen.ru') ||
    lower.includes('zen.yandex.ru') ||
    lower.includes('zen.yandex.com');

  if (isZenUrl) {
    const isMismatched = currentContext && currentContext !== 'zen';
    return {
      platform: 'zen',
      isSupported: true,
      cleanUrl: trimmed,
      confidence: 'high',
      label: 'Zen Publication / Channel',
      badgeColor: 'amber',
      suggestedAction: isMismatched ? {
        targetPath: `/zen?q=${encodeURIComponent(trimmed)}`,
        targetName: 'Zen Analytics',
        message: 'This is a Zen channel link! Click to analyze it on Zen Analytics.',
      } : undefined,
    };
  }

  // 6. Rutube Detection
  const isRutube = lower.includes('rutube.ru');
  if (isRutube) {
    const isMismatched = currentContext && currentContext !== 'rutube';
    return {
      platform: 'rutube',
      isSupported: true,
      cleanUrl: trimmed.split('?')[0],
      confidence: 'high',
      label: 'Rutube Video',
      badgeColor: 'emerald',
      suggestedAction: isMismatched ? {
        targetPath: `/rutube?url=${encodeURIComponent(trimmed)}`,
        targetName: 'Rutube Downloader',
        message: 'This is a Rutube link! Click to switch to Rutube Downloader.',
      } : undefined,
    };
  }

  // 7. Unsupported Platform (Facebook)
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
    return {
      platform: 'facebook',
      isSupported: false,
      cleanUrl: trimmed,
      confidence: 'high',
      label: 'Facebook (Not Supported)',
      badgeColor: 'blue',
      suggestedAction: {
        targetPath: '#',
        targetName: 'Unsupported Platform',
        message: 'Facebook video downloads are not supported on this platform.',
      },
    };
  }

  // 7. General query -> Zen search
  if (!lower.startsWith('http://') && !lower.startsWith('https://') && trimmed.length > 1) {
    return {
      platform: 'zen',
      isSupported: true,
      cleanUrl: trimmed,
      confidence: 'medium',
      label: 'Zen Topic / Channel Query',
      badgeColor: 'amber',
      suggestedAction: currentContext !== 'zen' ? {
        targetPath: `/zen?q=${encodeURIComponent(trimmed)}`,
        targetName: 'Zen Analytics',
        message: `Search for "${trimmed}" across Zen channels and publications.`,
      } : undefined,
    };
  }

  return {
    platform: 'unknown',
    isSupported: false,
    cleanUrl: trimmed,
    confidence: 'low',
    label: 'Unrecognized URL Format',
    badgeColor: 'neutral',
  };
}
