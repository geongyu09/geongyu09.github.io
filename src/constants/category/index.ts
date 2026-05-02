import { Post } from '@/types/post';
import ROUTE_PATH from '@/constants/path/routePath';

export interface Category {
  id: string;
  label: string;
  moreHref: string;
  filter: (post: Post) => boolean;
}

const hasTag = (post: Post, target: string) =>
  post.data.tags.split(' ').includes(target);

const CATEGORIES: Category[] = [
  {
    id: 'retrospective',
    label: '회고',
    moreHref: ROUTE_PATH.POSTS({ tag: '회고' }),
    filter: (post) => hasTag(post, '회고'),
  },
  {
    id: 'tech',
    label: '기술 블로그',
    moreHref: ROUTE_PATH.POSTS({}),
    filter: (post) => !hasTag(post, '회고') && !hasTag(post, 'project'),
  },
  {
    id: 'project',
    label: '프로젝트',
    moreHref: ROUTE_PATH.POSTS({ tag: 'project' }),
    filter: (post) => hasTag(post, 'project'),
  },
];

export default CATEGORIES;
