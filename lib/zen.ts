export interface ZenChannel {
  id: string;
  title: string;
  description: string;
  avatar: string;
  subscriberCount: number;
  publicationCount: number;
  viewCount: number;
  category: string;
  url: string;
}

export interface ZenPost {
  id: string;
  title: string;
  snippet: string;
  publishDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  channelTitle: string;
  url: string;
  readTime: number;
}

export interface ZenSearchResult {
  channels: ZenChannel[];
  posts: ZenPost[];
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000_000) {
    return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return n.toString();
}

export function formatDate(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  if (diffWeek < 5) return `${diffWeek} week${diffWeek === 1 ? '' : 's'} ago`;
  return `${diffMonth} month${diffMonth === 1 ? '' : 's'} ago`;
}

function getMockData(query: string): ZenSearchResult {
  const q = query.toLowerCase();

  const channels: ZenChannel[] = [
    {
      id: 'ch-1',
      title: 'Технологии Будущего',
      description: 'Обзоры новейших технологий, гаджетов и научных открытий. Ежедневные новости из мира IT.',
      avatar: '',
      subscriberCount: 2_450_000,
      publicationCount: 3_812,
      viewCount: 187_000_000,
      category: 'Технологии',
      url: `https://dzen.ru/techfuture?q=${q}`,
    },
    {
      id: 'ch-2',
      title: 'Мир Науки',
      description: 'Научно-популярный канал о космосе, физике, биологии и химии. Разбираем сложное простым языком.',
      avatar: '',
      subscriberCount: 1_870_000,
      publicationCount: 2_145,
      viewCount: 92_300_000,
      category: 'Наука',
      url: `https://dzen.ru/mirnauki?q=${q}`,
    },
    {
      id: 'ch-3',
      title: 'Финансовый Аналитик',
      description: 'Инвестиции, экономика, криптовалюты. Аналитика рынков и прогнозы от профессионалов.',
      avatar: '',
      subscriberCount: 980_000,
      publicationCount: 1_567,
      viewCount: 45_600_000,
      category: 'Финансы',
      url: `https://dzen.ru/finanalyst?q=${q}`,
    },
    {
      id: 'ch-4',
      title: 'Спортивный Вестник',
      description: 'Все о спорте: футбол, хоккей, баскетбол. Обзоры матчей, трансферы, аналитика.',
      avatar: '',
      subscriberCount: 3_120_000,
      publicationCount: 5_230,
      viewCount: 256_000_000,
      category: 'Спорт',
      url: `https://dzen.ru/sportvest?q=${q}`,
    },
    {
      id: 'ch-5',
      title: 'Путешествия и Мир',
      description: 'Путеводители, лайфхаки для путешественников, обзоры стран и городов мира.',
      avatar: '',
      subscriberCount: 1_340_000,
      publicationCount: 1_890,
      viewCount: 78_400_000,
      category: 'Путешествия',
      url: `https://dzen.ru/travelworld?q=${q}`,
    },
  ];

  const now = Date.now();
  const posts: ZenPost[] = [
    {
      id: 'p-1',
      title: 'Новый процессор Apple M4 Ultra: полный разбор характеристик и тестов производительности',
      snippet: 'Компания Apple представила свой самый мощный чип — M4 Ultra. Разбираем архитектуру, бенчмарки и сравниваем с конкурентами.',
      publishDate: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
      viewCount: 342_000,
      likeCount: 12_400,
      commentCount: 1_890,
      channelTitle: 'Технологии Будущего',
      url: `https://dzen.ru/a/post1?q=${q}`,
      readTime: 8,
    },
    {
      id: 'p-2',
      title: 'Учёные обнаружили новую экзопланету в обитаемой зоне звезды Проксима Центавра',
      snippet: 'Международная команда астрономов подтвердила существование каменистой планеты с условиями, потенциально пригодными для жизни.',
      publishDate: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
      viewCount: 189_000,
      likeCount: 8_700,
      commentCount: 956,
      channelTitle: 'Мир Науки',
      url: `https://dzen.ru/a/post2?q=${q}`,
      readTime: 6,
    },
    {
      id: 'p-3',
      title: 'Курс рубля: прогноз на декабрь 2025 — что ждать инвесторам',
      snippet: 'Анализируем макроэкономические факторы и даём прогноз по курсу рубля на ближайший месяц.',
      publishDate: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: 567_000,
      likeCount: 23_100,
      commentCount: 4_320,
      channelTitle: 'Финансовый Аналитик',
      url: `https://dzen.ru/a/post3?q=${q}`,
      readTime: 12,
    },
    {
      id: 'p-4',
      title: 'Лига Чемпионов: итоги группового этапа и расклад сил перед плей-офф',
      snippet: 'Подводим итоги группового этапа Лиги Чемпионов. Кто фаворит, а кто может удивить в плей-офф.',
      publishDate: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: 1_230_000,
      likeCount: 45_600,
      commentCount: 8_900,
      channelTitle: 'Спортивный Вестник',
      url: `https://dzen.ru/a/post4?q=${q}`,
      readTime: 10,
    },
    {
      id: 'p-5',
      title: '10 скрытых жемчужин Грузии: места, о которых не знают туристы',
      snippet: 'Забудьте про Тбилиси и Батуми — мы нашли уникальные места в Грузии, которые подарят незабываемые впечатления.',
      publishDate: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: 892_000,
      likeCount: 34_200,
      commentCount: 2_150,
      channelTitle: 'Путешествия и Мир',
      url: `https://dzen.ru/a/post5?q=${q}`,
      readTime: 7,
    },
  ];

  return { channels, posts };
}

export async function searchZen(query: string): Promise<ZenSearchResult> {
  try {
    const res = await fetch(
      `https://dzen.ru/api/v3/launcher/more?channel_name=${encodeURIComponent(query)}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!res.ok) {
      throw new Error(`Dzen API responded with ${res.status}`);
    }

    const data = await res.json();

    const channels: ZenChannel[] = (data.channels ?? data.items ?? [])
      .slice(0, 10)
      .map((item: Record<string, unknown>, i: number) => ({
        id: String(item.id ?? `ch-${i}`),
        title: String(item.title ?? item.name ?? 'Untitled'),
        description: String(item.description ?? item.snippet ?? ''),
        avatar: String(item.avatar ?? item.logo ?? ''),
        subscriberCount: Number(item.subscriberCount ?? item.subscribers ?? 0),
        publicationCount: Number(item.publicationCount ?? item.publications ?? 0),
        viewCount: Number(item.viewCount ?? item.views ?? 0),
        category: String(item.category ?? 'General'),
        url: String(item.url ?? item.link ?? '#'),
      }));

    const posts: ZenPost[] = (data.posts ?? data.documents ?? [])
      .slice(0, 10)
      .map((item: Record<string, unknown>, i: number) => ({
        id: String(item.id ?? `p-${i}`),
        title: String(item.title ?? 'Untitled'),
        snippet: String(item.snippet ?? item.text ?? ''),
        publishDate: String(item.publishDate ?? item.date ?? new Date().toISOString()),
        viewCount: Number(item.viewCount ?? item.views ?? 0),
        likeCount: Number(item.likeCount ?? item.likes ?? 0),
        commentCount: Number(item.commentCount ?? item.comments ?? 0),
        channelTitle: String(item.channelTitle ?? item.source ?? ''),
        url: String(item.url ?? item.link ?? '#'),
        readTime: Number(item.readTime ?? 5),
      }));

    if (channels.length === 0 && posts.length === 0) {
      return getMockData(query);
    }

    return { channels, posts };
  } catch {
    return getMockData(query);
  }
}
