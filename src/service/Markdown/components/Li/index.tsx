import cn from '@/utils/cn';
import React from 'react';

interface LiProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Li({ children, className = '', ...rest }: LiProps) {
  return (
    <li
      className={cn(
        'text-[17.5px] leading-relaxed my-2 ml-1 marker:m-0 marker:p-0 marker:text-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
}

Li.defaultProps = {
  children: null,
  className: '',
};
