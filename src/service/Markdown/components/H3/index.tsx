import cn from '@/utils/cn';
import headerUtil from '@/utils/contentHeader';
import Link from 'next/link';
import React from 'react';

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H3({ children, className = '', ...rest }: H3Props) {
  const headerId = decodeURIComponent(
    headerUtil.getHeaderHashText(children as string),
  );
  return (
    <Link href={`#${headerId}`}>
      <h6
        id={headerId}
        className={cn(
          'text-xl font-bold mt-10 mb-4 scroll-mt-20',
          'hover:opacity-80',
          className,
        )}
        {...rest}
      >
        {children}
      </h6>
    </Link>
  );
}

H3.defaultProps = {
  children: null,
  className: '',
};
