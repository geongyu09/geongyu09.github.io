import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

export const SideFixedPositionerVariants = cva('fixed top-64 right-0 w-64', {
  variants: {
    responsive: {
      none: '',
      default: 'hidden lg:block',
      hide: 'hidden lg:block',
    },
  },
});

interface SideFixedPositionerProps
  extends PropsWithChildren, VariantProps<typeof SideFixedPositionerVariants> {}

export default function SideFixedPositioner({
  children,
  responsive = 'default',
}: SideFixedPositionerProps) {
  return (
    <div className={cn(SideFixedPositionerVariants({ responsive }))}>
      {children}
    </div>
  );
}
