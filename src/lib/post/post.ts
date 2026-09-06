import { Post } from '@/types/post';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { checkPostData } from './utils/validator';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  checkPostData({ data, slug: realSlug, content } as Post);

  return { data, slug: realSlug, content } as Post;
}

/**
 * @description 모든 포스트를 반환합니다.
 * @returns Post[]
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      post1.data.timeStamps > post2.data.timeStamps ? -1 : 1,
    );

  if (posts.length === 0) {
    throw new Error('No posts found');
  }

  posts.forEach((post) => checkPostData(post));

  return posts;
}

/**
 * @description 공백으로 구분된 태그 문자열을 태그 배열로 변환합니다.
 */
export function splitTags(rawTags: string): string[] {
  return rawTags
    .split(' ')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * @description 인자로 주어진 태그에 해당하는 포스트들을 반환합니다.
 * 부분 문자열이 아니라 태그 하나가 정확히 일치하는 글만 골라냅니다.
 * @param tag 태그
 * @returns Post[]
 */
export function getFilteredPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => splitTags(post.data.tags).includes(tag));
}

export function getAllTags() {
  const allPosts = getAllPosts();

  const tags = new Set<string>();

  allPosts
    .map((post) => post.data.tags)
    .forEach((rawTags) => splitTags(rawTags).forEach((tag) => tags.add(tag)));

  return Array.from(tags);
}

/**
 * @description 인자로 주어진 수만큼 최근 포스트를 반환합니다
 * @param amount 보여줄 포스트의 수
 * @returns Post[]
 */
export function getCurrentPosts(amount: number): Post[] {
  const allPosts = getAllPosts();

  return allPosts.slice(0, amount);
}

/**
 * @description 가장 최근에 발행된 포스트 한 개를 반환합니다.
 */
export function getLatestPost(): Post {
  return getAllPosts()[0];
}

/**
 * @description 특정 연도에 발행된 포스트의 개수를 반환합니다.
 */
export function getPostsCountByYear(year: number): number {
  return getAllPosts().filter(
    (post) => new Date(post.data.timeStamps).getFullYear() === year,
  ).length;
}

/**
 * @description 가장 처음 발행된 포스트의 연도를 반환합니다.
 */
export function getStartYear(): number {
  const posts = getAllPosts();
  return new Date(posts[posts.length - 1].data.timeStamps).getFullYear();
}

/**
 * @description 전체 포스트에서 가장 많이 사용된 태그 상위 N개를 반환합니다.
 */
export function getTopTags(limit: number): string[] {
  const counts = new Map<string, number>();

  getAllPosts().forEach((post) => {
    splitTags(post.data.tags).forEach((tag) =>
      counts.set(tag, (counts.get(tag) ?? 0) + 1),
    );
  });

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
