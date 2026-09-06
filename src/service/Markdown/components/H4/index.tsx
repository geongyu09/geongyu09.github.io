import React from 'react';
import Heading from '../Heading';

interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function H4({ children, className = '', ...rest }: H4Props) {
  return (
    <Heading
      level={5}
      className={`text-[17px] font-semibold mt-8 mb-3 ${className}`}
      {...rest}
    >
      {children}
    </Heading>
  );
}

H4.defaultProps = {
  children: null,
  className: '',
};
