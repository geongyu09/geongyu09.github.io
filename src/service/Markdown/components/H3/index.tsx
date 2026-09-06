import React from 'react';
import Heading from '../Heading';

interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H3({ children, className = '', ...rest }: H3Props) {
  return (
    <Heading
      level={4}
      className={`text-[18px] font-bold mt-10 mb-4 ${className}`}
      {...rest}
    >
      {children}
    </Heading>
  );
}

H3.defaultProps = {
  children: null,
  className: '',
};
