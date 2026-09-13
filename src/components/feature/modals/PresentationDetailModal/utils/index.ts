export type PresentationEmbedKind = 'youtube' | 'figma' | 'pdf';

export interface PresentationEmbed {
  kind: PresentationEmbedKind;
  src: string;
}

/** 유튜브 주소는 watch, live, shorts, youtu.be처럼 여러 모양으로 적히므로 영상 아이디만 뽑아 씁니다. */
const readYouTubeId = (url: URL) => {
  if (url.hostname === 'youtu.be') return url.pathname.slice(1).split('/')[0];
  if (url.pathname === '/watch') return url.searchParams.get('v') ?? '';

  const [, id] =
    url.pathname.match(/^\/(?:embed|live|shorts|v)\/([^/]+)/) ?? [];
  return id ?? '';
};

/** 발표가 시작되는 지점은 't=10670'과 't=2h57m50s' 두 가지로 적히므로 모두 초 단위로 읽습니다. */
const readStartSeconds = (url: URL) => {
  const raw = url.searchParams.get('t') ?? url.searchParams.get('start');
  if (!raw) return 0;
  if (/^\d+$/.test(raw)) return Number(raw);

  const [, hours = '0', minutes = '0', seconds = '0'] =
    raw.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/) ?? [];
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
};

const toYouTubeEmbed = (url: URL): PresentationEmbed | null => {
  const id = readYouTubeId(url);
  if (!id) return null;

  const params = new URLSearchParams({ rel: '0' });
  const start = readStartSeconds(url);
  if (start > 0) params.set('start', String(start));

  return {
    kind: 'youtube',
    src: `https://www.youtube.com/embed/${id}?${params.toString()}`,
  };
};

/** 피그마는 이런 갈래의 주소만 embed.figma.com으로 바꿔 띄울 수 있습니다. */
const FIGMA_EMBEDDABLE_PATHS = [
  '/proto/',
  '/file/',
  '/design/',
  '/board/',
  '/slides/',
];

const toFigmaEmbed = (url: URL): PresentationEmbed | null => {
  const isEmbeddable = FIGMA_EMBEDDABLE_PATHS.some((path) =>
    url.pathname.startsWith(path),
  );
  if (!isEmbeddable) return null;

  const embedUrl = new URL(url.toString());
  embedUrl.hostname = 'embed.figma.com';
  embedUrl.searchParams.set('embed-host', 'geongyu-blog');

  return { kind: 'figma', src: embedUrl.toString() };
};

/**
 * 발표 자료를 pdf 파일로만 남긴 발표는 그 파일을 public에 두고 주소를 그대로 적으므로 주소를 그대로 씁니다.
 * 뷰어 위쪽 도구 막대가 자리를 차지해 가로를 기준으로 맞추면 장표 아래가 잘리므로, 한 장이 통째로 들어오는 view=Fit을 붙입니다.
 */
const toPdfEmbed = (href: string): PresentationEmbed => ({
  kind: 'pdf',
  src: `${href}#view=Fit`,
});

/**
 * 발표 주소를 모달 안에서 바로 띄울 수 있는 임베드 주소로 바꿉니다.
 * 유튜브와 피그마와 pdf가 아니거나 주소 모양을 알아볼 수 없으면 null을 돌려주고, 모달은 원문 링크만 안내합니다.
 */
export const getPresentationEmbed = (
  href?: string,
): PresentationEmbed | null => {
  if (!href) return null;

  // pdf는 이 블로그가 들고 있는 파일이라 '/assets/...'처럼 도메인 없이 적히므로 URL로 읽기 전에 먼저 가려냅니다.
  if (/\.pdf$/i.test(href.split(/[?#]/)[0])) return toPdfEmbed(href);

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  if (/(^|\.)youtube\.com$/.test(url.hostname) || url.hostname === 'youtu.be') {
    return toYouTubeEmbed(url);
  }
  if (/(^|\.)figma\.com$/.test(url.hostname)) return toFigmaEmbed(url);

  return null;
};

export default getPresentationEmbed;
