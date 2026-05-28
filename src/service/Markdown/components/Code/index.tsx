import React from 'react';
import cn from '@/utils/cn';

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  'data-language'?: string;
}

export default function Code({
  children,
  className = '',
  ...rest
}: CodeProps): JSX.Element {
  const isBlock =
    className?.includes('language-') ||
    (rest as { style?: React.CSSProperties }).style?.display === 'grid';

  if (isBlock) {
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  }

  return (
    <code
      className={cn(
        'font-mono text-[0.9em] px-1.5 py-0.5 rounded-r-1',
        'bg-ink-100 text-ink-800',
        className,
      )}
      {...rest}
    >
      {children}
    </code>
  );
}

Code.defaultProps = {
  children: null,
  className: '',
};
