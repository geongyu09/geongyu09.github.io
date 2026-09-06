import React from 'react';
import Heading from '../Heading';

interface H5Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H5({ children, className = '', ...rest }: H5Props) {
  return (
    <Heading
      level={6}
      className={`text-[15px] font-semibold mt-8 mb-3 ${className}`}
      {...rest}
    >
      {children}
    </Heading>
  );
}

H5.defaultProps = {
  children: null,
  className: '',
};
