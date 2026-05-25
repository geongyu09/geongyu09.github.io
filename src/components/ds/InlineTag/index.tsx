import { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import cn from '@/utils/cn';

const InlineTag = ({
  children,
  className,
  ...rest
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => (
  <a
    className={cn(
      'text-xs text-ink-950 border-b border-ink-950 hover:text-blue-600 hover:border-blue-600',
      className,
    )}
    {...rest}
  >
    {children.toString().startsWith('#') ? children : `#${children}`}
  </a>
);

export default InlineTag;
