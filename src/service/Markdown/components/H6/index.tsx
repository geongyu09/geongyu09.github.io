import React from 'react';
import Heading from '../Heading';

interface H6Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H6({ children, className = '', ...rest }: H6Props) {
  return (
    <Heading
      level={6}
      className={`text-[14px] font-semibold mt-8 mb-3 ${className}`}
      {...rest}
    >
      {children}
    </Heading>
  );
}

H6.defaultProps = {
  children: null,
  className: '',
};
