import React from 'react';
import cn from '@/utils/cn';

interface EmProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Em({ children, className = '', ...rest }: EmProps) {
  return (
    <em className={cn('italic mx-1', className)} {...rest}>
      {children}
    </em>
  );
}

Em.defaultProps = {
  children: null,
  className: '',
};
