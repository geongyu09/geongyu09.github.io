import { getAllTags, getFilteredPostsByTag } from '@/lib/post/post';

/**
 * 글이 이만큼 모이지 않은 태그 페이지는 색인에서 제외합니다.
 * 글 하나짜리 목록은 그 글 자체와 내용이 겹쳐 검색 결과에서 서로를 갉아먹습니다.
 */
export const MIN_POSTS_TO_INDEX = 2;

/**
 * @description 검색엔진에 색인시킬 만큼 글이 쌓인 태그만 반환합니다.
 */
export function getIndexableTags(): string[] {
  return getAllTags().filter(
    (tag) => getFilteredPostsByTag(tag).length >= MIN_POSTS_TO_INDEX,
  );
}
