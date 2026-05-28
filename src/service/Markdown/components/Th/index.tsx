import React from 'react';
import cn from '@/utils/cn';

interface ThProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Th({
  children,
  className = '',
  ...rest
}: ThProps): JSX.Element {
  return (
    <th
      className={cn('text-left font-semibold', className)}
      style={{
        backgroundColor: 'var(--ink-100)',
        color: 'var(--ink-900)',
        borderBottom: '1px solid var(--ink-300)',
        padding: 'var(--s-3) var(--s-4)',
        fontSize: '0.9375rem',
      }}
      {...rest}
    >
      {children}
    </th>
  );
}

Th.defaultProps = {
  children: null,
  className: '',
};
