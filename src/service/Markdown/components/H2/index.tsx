import cn from '@/utils/cn';
import headerUtil from '@/utils/contentHeader';
import Link from 'next/link';
import React from 'react';

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H2({ children, className = '', ...rest }: H2Props) {
  const headerId = decodeURIComponent(
    headerUtil.getHeaderHashText(children as string),
  );
  return (
    <Link href={`#${headerId}`}>
      <h5
        id={headerId}
        className={cn(
          'text-2xl font-bold mt-10 mb-6 scroll-mt-20',
          'hover:opacity-80',
          className,
        )}
        {...rest}
      >
        {children}
      </h5>
    </Link>
  );
}

H2.defaultProps = {
  children: null,
  className: '',
};
