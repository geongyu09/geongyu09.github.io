import { HTMLAttributes, PropsWithChildren } from 'react';
import cn from '@/utils/cn';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const Callout = ({
  label = 'NOTE',
  children,
  className,
  ...rest
}: PropsWithChildren<Props>) => (
  <div
    className={cn(
      'flex gap-3 px-[18px] py-[14px] rounded-[10px] text-sm leading-relaxed',
      'bg-[#f7faff] border border-[#cfd9ff] text-[#1a3aa0]',
      className,
    )}
    {...rest}
  >
    <strong className="font-bold">{label}</strong>
    <span>{children}</span>
  </div>
);

export default Callout;
