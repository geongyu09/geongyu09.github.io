import { PropsWithChildren } from 'react';

interface Props {
  year: number | string;
  count?: number | string;
}

const YearHeader = ({ year, count, children }: PropsWithChildren<Props>) => (
  <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-s-3 md:gap-s-8 pt-s-3 md:pt-s-4 border-t border-ink-950">
    <div className="flex items-baseline justify-between md:block">
      <div className="text-[28px] md:text-[36px] font-semibold tracking-[-0.03em] leading-none">
        {year}
      </div>
      {count != null && (
        <div className="font-mono text-[10px] md:text-[11px] text-ink-500 md:mt-[6px] tracking-[0.08em] uppercase">
          {count} posts
        </div>
      )}
    </div>
    <div className="md:pt-[6px] text-sm text-ink-500">{children}</div>
  </div>
);

export default YearHeader;
