import cn from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const DefaultButtonVariants = cva(
  `py-4 text-center block bg-slate-100 rounded-md text-slate-900 font-semibold transition-all`,
  {
    variants: {
      theme: {
        default: 'bg-slate-100 hover:bg-slate-200',
        primary: 'bg-indigo-500 text-white hover:bg-indigo-400',
        secondary: 'bg-slate-100 hover:bg-slate-200',
      },
      widthStyle: {
        default: 'w-full',
        auto: 'w-auto px-4 py-2 rounded-lg w-fit',
      },
    },
  },
);

interface DefaultButtonProps
  extends
    React.HTMLProps<HTMLButtonElement>,
    VariantProps<typeof DefaultButtonVariants> {
  classname?: string;
  text?: string;
}

export default function DefaultButton({
  text,
  classname,
  onClick,
  theme = 'default',
  widthStyle = 'default',
}: DefaultButtonProps) {
  return (
    <button
      type="button"
      className={cn(DefaultButtonVariants({ theme, widthStyle }), classname)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

DefaultButton.defaultProps = {
  classname: '',
  text: '',
};
