import React from 'react';
import cn from '@/utils/cn';

interface OlProps extends React.HTMLAttributes<HTMLOListElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Ol({
  children,
  className = '',
  ...rest
}: OlProps): JSX.Element {
  return (
    <ol className={cn('list-decimal my-4 pl-4', className)} {...rest}>
      {children}
    </ol>
  );
}

Ol.defaultProps = {
  children: null,
  className: '',
};
