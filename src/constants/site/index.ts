const SITE = {
  URL: 'https://geongyu09.github.io',
  TITLE: '건규의 블로그',
  /** 검색 결과 제목에 노출되는 문구. 사이트 이름만으로는 무엇을 다루는지 알기 어려워 한 줄 설명을 붙입니다. */
  TITLE_WITH_TAGLINE: '건규의 블로그 | 프론트엔드 개발자 박건규의 기술 블로그',
  DESCRIPTION:
    '프론트엔드 개발자 박건규가 React, 테스트 코드, 함수형 프로그래밍, 웹뷰를 공부하며 남긴 기록입니다.',
  KEYWORDS: [
    '프론트엔드',
    '프론트엔드 개발자',
    '기술 블로그',
    'React',
    'Next.js',
    '테스트 코드',
    'Jest',
    '함수형 프로그래밍',
    '웹뷰',
    '우아한테크코스',
    '박건규',
  ],
  OG_IMAGE: '/assets/og-image.png',
  AUTHOR: {
    name: '박건규',
    email: 'geongyu09@gmail.com',
    link: 'https://github.com/geongyu09',
  },
  /**
   * Google Search Console의 HTML 태그 방식 소유 확인 코드입니다.
   * search.google.com/search-console 에서 발급받은 content 값을 그대로 넣으면
   * 루트 레이아웃의 메타 태그로 자동 반영됩니다.
   */
  GOOGLE_SITE_VERIFICATION: '4Vr5RCGKyaAI-Ch2HjWGZA8m4mTv5H_kuAxunrJQmU4',
  /** 네이버 서치어드바이저 소유 확인 코드. 비어 있으면 메타 태그를 넣지 않습니다. */
  NAVER_SITE_VERIFICATION: '',
} as const;

export default SITE;
