'use client';

import cn from '@/utils/cn';

interface Props {
  current: number;
  total: number;
  onChange?: (page: number) => void;
}

const PageButton = ({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={cn(
      'w-8 h-8 text-[13px] rounded-r-1 border transition-colors',
      active
        ? 'bg-ink-950 text-white border-ink-950 font-semibold'
        : 'bg-white text-ink-700 border-ink-200 hover:border-ink-950 disabled:opacity-30 disabled:hover:border-ink-200',
    )}
  >
    {children}
  </button>
);

const Pagination = ({ current, total, onChange }: Props) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="inline-flex gap-1" aria-label="Pagination">
      <PageButton
        disabled={current <= 1}
        onClick={() => onChange?.(current - 1)}
      >
        ‹
      </PageButton>
      {pages.map((p) => (
        <PageButton
          key={p}
          active={p === current}
          onClick={() => onChange?.(p)}
        >
          {p}
        </PageButton>
      ))}
      <PageButton
        disabled={current >= total}
        onClick={() => onChange?.(current + 1)}
      >
        ›
      </PageButton>
    </nav>
  );
};

export default Pagination;
