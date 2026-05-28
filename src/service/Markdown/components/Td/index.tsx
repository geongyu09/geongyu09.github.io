import React from 'react';
import cn from '@/utils/cn';

interface TdProps extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Td({
  children,
  className = '',
  ...rest
}: TdProps): JSX.Element {
  return (
    <td
      className={cn('align-top', className)}
      style={{
        color: 'var(--ink-800)',
        padding: 'var(--s-3) var(--s-4)',
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      }}
      {...rest}
    >
      {children}
    </td>
  );
}

Td.defaultProps = {
  children: null,
  className: '',
};
