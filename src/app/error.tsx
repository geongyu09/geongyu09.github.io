'use client';

import DefaultButton from '@/components/common/Button/DefaultButton';
import Gap from '@/components/common/layout/Gap';
import ROUTE_PATH from '@/constants/path/routePath';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const codingCat = '/assets/error/Designer.jpeg';

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center select-none h-fit-to-screen">
      <Gap size={5} />
      <div
        style={{
          width: '900px',
          height: '350px',
          backgroundImage: `url(${codingCat})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="bg-cover rounded-xl"
      />
      <Gap size={10} />
      <h2 className="text-4xl font-semibold">아니 이럴수가..</h2>
      <Gap size={8} />
      <p className="text-lg text-center">
        에러가 발생했습니다 🤦‍♂️ 다시 한번 시도해주세요! 혹은 홈으로 가서 다른
        페이지를 확인해보세요. 🙇‍♂️
      </p>
      <Gap size={12} />

      <DefaultButton
        text="다시 시도하기"
        onClick={reset}
        theme="primary"
        widthStyle="auto"
      />

      <Gap size={4} />
      <Link href={ROUTE_PATH.HOME}>홈으로 가기</Link>
    </section>
  );
}
