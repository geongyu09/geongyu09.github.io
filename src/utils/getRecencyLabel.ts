export type RecencyLabel = '이번 주에는' | '이번 달에는' | '최근에는';

const DAY_MS = 1000 * 60 * 60 * 24;

/**
 * 글이 발행된 시점이 얼마나 최근인지에 따라 hero용 라벨을 반환합니다.
 * - 7일 이내: '이번 주에는'
 * - 31일 이내: '이번 달에는'
 * - 그 외: '최근에는'
 */
export function getRecencyLabel(
  timestamp: number,
  now: Date = new Date(),
): RecencyLabel {
  const daysSince = (now.getTime() - timestamp) / DAY_MS;

  if (daysSince <= 7) return '이번 주에는';
  if (daysSince <= 31) return '이번 달에는';
  return '최근에는';
}
