import React from 'react';
import cn from '@/utils/cn';

interface UlProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Ul({
  children,
  className = '',
  ...rest
}: UlProps): JSX.Element {
  return (
    <ul className={cn('list-disc my-4 pl-4', className)} {...rest}>
      {children}
    </ul>
  );
}

Ul.defaultProps = {
  children: null,
  className: '',
};
