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
    <div className="my-4 w-full overflow-x-auto">
      <table className={cn('w-max min-w-full', className)} {...rest}>
        {children}
      </table>
    </div>
  );
}

Table.defaultProps = {
  children: null,
  className: '',
};
