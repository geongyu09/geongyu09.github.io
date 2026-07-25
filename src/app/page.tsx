import JsonLd from '@/components/common/JsonLd';
import HomeBannerSection from '@/components/feature/Home/HomeBannerSection';
import HomeContentSection from '@/components/feature/Home/HomeContentSection';
import SITE from '@/constants/site';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.TITLE,
  description: SITE.DESCRIPTION,
  url: SITE.URL,
  inLanguage: 'ko-KR',
  author: {
    '@type': 'Person',
    name: SITE.AUTHOR.name,
    url: SITE.AUTHOR.link,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <HomeBannerSection />
      <HomeContentSection />
    </>
  );
}
