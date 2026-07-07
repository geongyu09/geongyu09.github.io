import React from 'react';
import cn from '@/utils/cn';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Pre({ children, className = '', ...rest }: PreProps) {
  return (
    <pre
      className={cn(
        'my-s-5 overflow-x-auto rounded-r-1 border border-ink-200',
        'bg-ink-50 text-code font-mono leading-[1.6]',
        'py-s-4',
        className,
      )}
      {...rest}
    >
      {children}
    </pre>
  );
}

Pre.defaultProps = {
  children: null,
  className: '',
};
