import CATEGORIES, { Category } from '@/constants/category';
import { Post } from '@/types/post';
import { getAllPosts } from './post';

export function getPostsByCategory(category: Category, limit?: number): Post[] {
  const posts = getAllPosts().filter(category.filter);
  return typeof limit === 'number' ? posts.slice(0, limit) : posts;
}

export interface CategorizedPostGroup {
  category: Category;
  posts: Post[];
}

export function getCategorizedPostGroups(
  perCategory = 3,
): CategorizedPostGroup[] {
  return CATEGORIES.map((category) => ({
    category,
    posts: getPostsByCategory(category, perCategory),
  })).filter(({ posts }) => posts.length > 0);
}
