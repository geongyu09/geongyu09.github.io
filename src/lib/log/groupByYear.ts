import { Post } from '@/types/post';

export interface YearGroup<T> {
  year: number;
  items: T[];
}

/**
 * Groups items by year based on timeStamps field
 * @param items - Array of Post items with timeStamps in data property
 * @returns Array of YearGroup objects sorted by year descending
 */
export function groupByYear(items: Post[]): YearGroup<Post>[] {
  const grouped = items.reduce(
    (acc, item) => {
      // Auto-detect if timestamp is in seconds or milliseconds
      // If timestamp > 10000000000, it's in milliseconds
      const timestamp =
        item.data.timeStamps > 10000000000
          ? item.data.timeStamps
          : item.data.timeStamps * 1000;
      const year = new Date(timestamp).getFullYear();

      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);

      return acc;
    },
    {} as Record<number, Post[]>,
  );

  return Object.entries(grouped)
    .map(([year, yearItems]) => ({
      year: parseInt(year, 10),
      items: yearItems.sort((a, b) => b.data.timeStamps - a.data.timeStamps),
    }))
    .sort((a, b) => b.year - a.year);
}

/**
 * Groups study/manual items by year based on timeStamps field
 * @param items - Array of items with timeStamps property (Unix timestamp in seconds or milliseconds)
 * @returns Array of YearGroup objects sorted by year descending
 */
export function groupStudiesByYear<T extends { timeStamps: number }>(
  items: T[],
): YearGroup<T>[] {
  const grouped = items.reduce(
    (acc, item) => {
      // Auto-detect if timestamp is in seconds or milliseconds
      const timestamp =
        item.timeStamps > 10000000000
          ? item.timeStamps
          : item.timeStamps * 1000;
      const year = new Date(timestamp).getFullYear();

      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);

      return acc;
    },
    {} as Record<number, T[]>,
  );

  return Object.entries(grouped)
    .map(([year, yearItems]) => ({
      year: parseInt(year, 10),
      items: yearItems.sort((a, b) => b.timeStamps - a.timeStamps),
    }))
    .sort((a, b) => b.year - a.year);
}
