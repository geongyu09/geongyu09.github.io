import Gap from '@/components/common/layout/Gap';
import HomeBannerSection from '@/components/feature/Home/HomeBannerSection';
import HomeContentSection from '@/components/feature/Home/HomeContentSection';

export default function Home() {
  return (
    <>
      <HomeBannerSection />
      <Gap size={12} />

      <HomeContentSection />
    </>
  );
}
