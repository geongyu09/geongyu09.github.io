import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const ContainerVariants = cva('mx-auto', {
  variants: {
    width: {
      default: 'max-w-6xl',
      content: 'max-w-3xl',
    },
    responsive: {
      none: '',
      default: 'px-4 lg:px-0',
    },
  },
});

interface ContainerProps
  extends PropsWithChildren, VariantProps<typeof ContainerVariants> {}

export default function Container({
  width = 'default',
  responsive = 'default',
  children,
}: ContainerProps) {
  return (
    <div className={cn(ContainerVariants({ width, responsive }))}>
      {children}
    </div>
  );
}

Container.defaultProps = {
  styles: '',
};
