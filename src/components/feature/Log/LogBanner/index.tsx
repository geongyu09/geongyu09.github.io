import Banner from '@/components/common/Banner';
import Link from 'next/link';

export default function LogBanner() {
  return (
    <section className="relative">
      <Link href="/" className="w-full">
        <Banner />
      </Link>
    </section>
  );
}
