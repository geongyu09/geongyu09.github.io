import React from 'react';
import Heading from '../Heading';

interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H2({ children, className = '', ...rest }: H2Props) {
  return (
    <Heading
      level={3}
      className={`text-[21px] font-bold mt-10 mb-6 ${className}`}
      {...rest}
    >
      {children}
    </Heading>
  );
}

H2.defaultProps = {
  children: null,
  className: '',
};
