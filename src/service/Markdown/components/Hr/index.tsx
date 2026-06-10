import React from 'react';
import cn from '@/utils/cn';

interface HrProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
}

export default function Hr({ className = '', ...rest }: HrProps) {
  return <hr className={cn('my-4', className)} {...rest} />;
}

Hr.defaultProps = {
  className: '',
};
