import Banner from '@/components/common/Banner';
import Link from 'next/link';

export default function HomeBannerSection() {
  return (
    <section className="relative">
      <Link href="/log" className="w-full">
        <Banner />
      </Link>
    </section>
  );
}
