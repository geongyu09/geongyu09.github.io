import SITE from '@/constants/site';
import { splitTags } from '@/lib/post/post';
import { Post } from '@/types/post';

const PERSON_ID = `${SITE.URL}/#person`;
const WEBSITE_ID = `${SITE.URL}/#website`;
const BLOG_ID = `${SITE.URL}/#blog`;

const absolute = (path: string) =>
  path.startsWith('http') ? path : `${SITE.URL}${path}`;

/**
 * @description 사이트 운영자 정보. 다른 스키마들이 @id로 참조합니다.
 */
export const personJsonLd = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.AUTHOR.name,
  alternateName: 'geongyu',
  url: SITE.URL,
  sameAs: [SITE.AUTHOR.link],
  jobTitle: '프론트엔드 개발자',
} as const;

/**
 * @description 홈에서 사용하는 사이트·블로그 정보 그래프입니다.
 */
export function buildSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personJsonLd,
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE.URL}/`,
        name: SITE.TITLE,
        description: SITE.DESCRIPTION,
        inLanguage: 'ko-KR',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'Blog',
        '@id': BLOG_ID,
        url: `${SITE.URL}/`,
        name: SITE.TITLE,
        description: SITE.DESCRIPTION,
        inLanguage: 'ko-KR',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
      },
    ],
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * @description 검색 결과에 경로를 표시하기 위한 breadcrumb 데이터를 만듭니다.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.url),
    })),
  };
}

/**
 * @description 글 상세 페이지의 BlogPosting 데이터를 만듭니다.
 */
export function buildBlogPostingJsonLd(post: Post) {
  const { slug, data, content } = post;
  const url = `${SITE.URL}/post/${slug}/`;
  const tagList = splitTags(data.tags);
  const publishedISO = new Date(data.timeStamps).toISOString();
  const modifiedISO = new Date(
    data.updatedTimeStamps ?? data.timeStamps,
  ).toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: data.title,
    description: data.description,
    ...(data.thumbnail && { image: [absolute(data.thumbnail)] }),
    datePublished: publishedISO,
    dateModified: modifiedISO,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': BLOG_ID },
    ...(tagList.length > 0 && {
      keywords: tagList.join(', '),
      articleSection: tagList[0],
    }),
    wordCount: content.replace(/\s+/g, '').length,
    inLanguage: 'ko-KR',
  };
}

/**
 * @description 글 목록 페이지에서 어떤 글이 실려 있는지 알려주는 데이터를 만듭니다.
 */
export function buildPostCollectionJsonLd({
  name,
  description,
  url,
  posts,
}: {
  name: string;
  description: string;
  url: string;
  posts: Post[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name,
    description,
    inLanguage: 'ko-KR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BLOG_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.URL}/post/${post.slug}/`,
        name: post.data.title,
      })),
    },
  };
}
