import { Feed } from 'feed';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://geongyu09.github.io';

interface PostData {
  title: string;
  description: string;
  tags: string;
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
    [...rssContent.matchAll(/<guid[^>]*>([^<]+)<\/guid>/g)].map((m) =>
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
    title: '건규의 블로그',
    description: '박건규의 블로그',
    id: SITE_URL,
    link: SITE_URL,
    language: 'ko',
    copyright: `All rights reserved ${new Date().getFullYear()}, 박건규`,
    author: {
      name: '박건규',
      email: 'geongyu09@gmail.com',
      link: 'https://github.com/geongyu09',
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.data.title,
      id: `${SITE_URL}/post/${post.slug}/`,
      link: `${SITE_URL}/post/${post.slug}/`,
      description: post.data.description,
      date: new Date(post.data.timeStamps),
      category: post.data.tags.split(' ').map((name: string) => ({ name })),
    });
  });

  fs.writeFileSync(path.join(process.cwd(), 'public/rss.xml'), feed.rss2());
  console.log('RSS 피드 생성 완료: public/rss.xml');
}

generateRss();
