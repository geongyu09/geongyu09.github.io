import cn from '@/utils/cn';
import headerUtil from '@/utils/contentHeader';
import Link from 'next/link';
import React from 'react';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 실제로 렌더링할 HTML 헤딩 레벨. 글 제목이 h1이므로 본문은 h2부터 시작합니다. */
  level: HeadingLevel;
  children?: React.ReactNode;
  className?: string;
}

/**
 * @description 마크다운 헤딩을 앵커 링크가 달린 시맨틱 헤딩으로 렌더링합니다.
 * 검색엔진이 글의 목차 구조를 읽을 수 있도록 헤딩 태그를 바깥에 두고,
 * 그 안에 자기 자신을 가리키는 링크를 넣습니다.
 */
export default function Heading({
  level,
  children,
  className = '',
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const headerId = decodeURIComponent(headerUtil.getHeaderHashText(children));

  return (
    <Tag id={headerId} className={cn('scroll-mt-20', className)} {...rest}>
      <Link
        href={`#${headerId}`}
        className="text-inherit no-underline hover:opacity-80"
      >
        {children}
      </Link>
    </Tag>
  );
}

Heading.defaultProps = {
  children: null,
  className: '',
};
