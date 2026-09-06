import React from 'react';
import Heading from '../Heading';

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H1({ children, className = '', ...rest }: H1Props) {
  return (
    <Heading
      level={2}
      className={`text-[25px] font-bold mt-10 mb-8 ${className}`}
      {...rest}
    >
      {children}
    </Heading>
  );
}

H1.defaultProps = {
  children: null,
  className: '',
};
