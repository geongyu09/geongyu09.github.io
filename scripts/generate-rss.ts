import { Feed } from 'feed';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import SITE from '../src/constants/site';

const SITE_URL = SITE.URL;

interface PostData {
  title: string;
  description: string;
  tags: string;
  thumbnail?: string;
  timeStamps: number;
}

function getAllPosts() {
  const postsDir = path.join(process.cwd(), '_posts');
  const slugs = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  return slugs
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
      const { data } = matter(raw);
      return { slug: filename.replace(/\.md$/, ''), data: data as PostData };
    })
    .sort((a, b) => b.data.timeStamps - a.data.timeStamps);
}

function isRssUpToDate(): boolean {
  const rssPath = path.join(process.cwd(), 'public/rss.xml');
  if (!fs.existsSync(rssPath)) return false;

  const rssContent = fs.readFileSync(rssPath, 'utf-8');
  const registeredSlugs = new Set(
    Array.from(rssContent.matchAll(/<guid[^>]*>([^<]+)<\/guid>/g)).map((m) =>
      m[1].replace(`${SITE_URL}/post/`, '').replace(/\/$/, ''),
    ),
  );

  const postsDir = path.join(process.cwd(), '_posts');
  const currentSlugs = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));

  return currentSlugs.every((slug) => registeredSlugs.has(slug));
}

async function generateRss() {
  if (isRssUpToDate()) {
    console.log('RSS 피드가 최신 상태입니다. 건너뜁니다.');
    return;
  }

  const posts = getAllPosts();

  const feed = new Feed({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'ko',
    image: `${SITE_URL}/icon-512.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE.AUTHOR.name}`,
    author: SITE.AUTHOR,
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.data.title,
      id: `${SITE_URL}/post/${post.slug}/`,
      link: `${SITE_URL}/post/${post.slug}/`,
      description: post.data.description,
      date: new Date(post.data.timeStamps),
      category: post.data.tags.split(' ').map((name: string) => ({ name })),
      ...(post.data.thumbnail && {
        image: `${SITE_URL}${post.data.thumbnail}`,
      }),
    });
  });

  fs.writeFileSync(path.join(process.cwd(), 'public/rss.xml'), feed.rss2());
  console.log('RSS 피드 생성 완료: public/rss.xml');
}

generateRss();
