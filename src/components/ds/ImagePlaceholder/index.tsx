import { HTMLAttributes, PropsWithChildren } from 'react';
import cn from '@/utils/cn';

interface Props extends HTMLAttributes<HTMLDivElement> {
  ratio?: string;
}

const ImagePlaceholder = ({
  ratio = '16/9',
  children,
  className,
  style,
  ...rest
}: PropsWithChildren<Props>) => (
  <div
    className={cn('ds-ph', className)}
    style={{ aspectRatio: ratio, ...style }}
    {...rest}
  >
    {children}
  </div>
);

export default ImagePlaceholder;
