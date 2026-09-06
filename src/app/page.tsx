import JsonLd from '@/components/common/JsonLd';
import HomeBannerSection from '@/components/feature/Home/HomeBannerSection';
import HomeContentSection from '@/components/feature/Home/HomeContentSection';
import { buildSiteJsonLd } from '@/lib/seo/jsonLd';

export default function Home() {
  return (
    <>
      <JsonLd data={buildSiteJsonLd()} />
      <HomeBannerSection />
      <HomeContentSection />
    </>
  );
}
