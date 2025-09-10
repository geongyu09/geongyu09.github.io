// 'use client';

import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
// import useModal from '@/lib/modal/hooks/useModal';
// import { useState } from 'react';

function HomeBanner() {
  // const { getResponse } = useModal();
  // console.log(getResponse());

  return (
    <div className="bg-[#f1f1f1] group select-none relative">
      <Container>
        {/* <Link href="/portfolio" className="relative"> */}
        <div className="h-96 text-center flex flex-col justify-center group-hover:scale-105 transition-transform">
          <h1 className="text-4xl font-bold">&quot;Hello World!&quot; 👋</h1>
          <Gap size={4} />
          <p className="text-lg">
            안녕하세요! 함께하고싶은 개발자가 되고싶은 박건규입니다!
          </p>
        </div>
        <span className="font-semibold opacity-70 group-hover:opacity-100 transition absolute right-10 bottom-10 cursor-pointer">
          Check Logs &rarr;
        </span>
        {/* </Link> */}
      </Container>
    </div>
  );
}

export default function HomeBannerSection() {
  // const { pushModal, getResponse } = useModal();

  // const handleClick = () => {
  //   pushModal({
  //     modal: <TestModal />,
  //     onClose: () => {
  //       alert(getResponse());
  //     },
  //   });
  // };

  return (
    <section className="relative">
      {/* <button onClick={handleClick} type="button" className="w-full"> */}
      <HomeBanner />
      {/* </button> */}
    </section>
  );
}
