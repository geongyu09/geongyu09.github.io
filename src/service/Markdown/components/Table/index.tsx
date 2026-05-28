import React from 'react';
import cn from '@/utils/cn';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Table({
  children,
  className = '',
  ...rest
}: TableProps): JSX.Element {
  return (
    <div
      className="my-6 w-full overflow-x-auto"
      style={{
        border: '1px solid var(--ink-200)',
        borderRadius: 'var(--r-1)',
      }}
    >
      <table
        className={cn('w-max min-w-full border-collapse', className)}
        style={{ fontFamily: 'var(--font-sans)' }}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}

Table.defaultProps = {
  children: null,
  className: '',
};
