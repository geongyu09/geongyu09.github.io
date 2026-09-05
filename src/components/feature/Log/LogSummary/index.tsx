import { LogSummary as LogSummaryData } from '@/types/log';

const pad2 = (n: number) => n.toString().padStart(2, '0');

interface Props {
  summary: LogSummaryData;
}

export default function LogSummary({ summary }: Props) {
  const {
    firstRecordDate,
    latestRecordDate,
    yearSpan,
    total,
    groups,
    yearCounts,
  } = summary;
  const maxYearCount = Math.max(...yearCounts.map(({ count }) => count));

  return (
    <section className="border-b border-ink-200">
      <div className="max-w-container mx-auto px-s-5 lg:px-s-7 py-s-6">
        <div className="flex flex-wrap items-baseline justify-between gap-s-2 pb-s-3 border-b border-ink-950">
          <h2 className="m-0 text-[15px] font-semibold text-ink-950">총정리</h2>
          <p className="m-0 font-mono text-[12px] text-ink-500 tracking-[0.05em]">
            {firstRecordDate} ~ {latestRecordDate} · {yearSpan}년 · 총 {total}건
          </p>
        </div>

        <div className="grid gap-s-6 pt-s-4 md:grid-cols-[1fr_280px] md:gap-s-7">
          <dl className="m-0 divide-y divide-ink-200">
            {groups.map(({ label, count, detail }) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-s-1 py-s-3 md:grid-cols-[120px_1fr] md:gap-s-5 md:items-baseline"
              >
                <dt className="flex items-baseline gap-s-2">
                  <span className="text-[16px] text-ink-950">{label}</span>
                  <span className="font-mono text-[13px] text-ink-500">
                    {pad2(count)}
                  </span>
                </dt>
                <dd className="m-0 text-[14px] leading-[1.7] text-ink-700">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>

          <div className="md:pl-s-6 md:border-l md:border-ink-200">
            <h3 className="m-0 mb-s-3 text-[13px] font-medium text-ink-900">
              연도별 기록
            </h3>
            <ul className="flex flex-col gap-s-2">
              {yearCounts.map(({ year, count }) => (
                <li key={year} className="flex items-center gap-s-3">
                  <span className="font-mono text-[13px] text-ink-500 shrink-0">
                    {year}
                  </span>
                  <span className="h-[6px] flex-1 rounded-pill bg-ink-100">
                    <span
                      className="block h-full rounded-pill bg-ink-950"
                      style={{ width: `${(count / maxYearCount) * 100}%` }}
                    />
                  </span>
                  <span className="font-mono text-[13px] text-ink-950 shrink-0 w-[24px] text-right">
                    {pad2(count)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
