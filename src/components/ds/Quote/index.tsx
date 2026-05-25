import { BlockquoteHTMLAttributes, PropsWithChildren } from 'react';
import cn from '@/utils/cn';

interface Props extends BlockquoteHTMLAttributes<HTMLQuoteElement> {
  by?: string;
}

const Quote = ({
  by,
  children,
  className,
  ...rest
}: PropsWithChildren<Props>) => (
  <blockquote
    className={cn(
      'm-0 py-s-4 px-s-5 border-l-[3px] border-ink-950 text-[17px] text-ink-800',
      className,
    )}
    {...rest}
  >
    {children}
    {by && (
      <span className="block mt-s-2 font-mono text-xs text-ink-500">
        — {by}
      </span>
    )}
  </blockquote>
);

export default Quote;
