import Link from 'next/link';

import Button from '@/components/ds/Button';
import Gap from '@/components/common/layout/Gap';
import ROUTE_PATH from '@/constants/path/routePath';
import Image from 'next/image';

export default function NotFound() {
  const codingCat = '/assets/404/codingCat.png';

  return (
    <section className="flex flex-col items-center select-none h-fit-to-screen">
      {/* 없는 주소가 검색 결과에 쌓이지 않도록 색인을 막습니다. */}
      <meta name="robots" content="noindex, follow" />
      <Gap size={5} />
      <Image
        src={codingCat}
        alt="노트북 앞에 앉아 코딩하는 고양이 일러스트"
        width={900}
        height={300}
      />
      <Gap size={10} />
      <h1 className="text-4xl font-semibold text-ink-950">404 - Not Found</h1>
      <Gap size={1} />
      <p className="text-ink-700">
        찾고계신 페이지가 없습니다! 혹은 해당 페이지는 열심히 준비중이니 조금만
        기다려주세요 🙃
      </p>
      <Gap size={5} />

      <Link href={ROUTE_PATH.HOME}>
        <Button variant="primary">홈으로 가기</Button>
      </Link>
    </section>
  );
}
