'use client';

import cn from '@/utils/cn';
import headerUtil from '@/utils/contentHeader';
import Link from 'next/link';
import React from 'react';

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H1({ children, className = '', ...rest }: H1Props) {
  const headerId = decodeURIComponent(
    headerUtil.getHeaderHashText(children as string),
  );
  return (
    <Link href={`#${headerId}`}>
      <h4
        id={headerId}
        className={cn(
          'text-3xl font-bold mt-10 mb-8 scroll-mt-20',
          'hover:opacity-80 hover:',
          className,
        )}
        {...rest}
      >
        {children}
      </h4>
    </Link>
  );
}

H1.defaultProps = {
  children: null,
  className: '',
};
