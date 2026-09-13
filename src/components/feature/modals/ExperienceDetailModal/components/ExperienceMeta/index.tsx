interface Props {
  /** 시작과 끝을 연도까지 붙여 적은 활동 기간입니다. */
  period: string;
  /** 활동한 소속입니다. */
  org: string;
  /** 그 안에서 맡은 자리입니다. */
  role: string;
  /** role 줄에 붙일 문구입니다. 맡은 자리가 아닌 교육 과정은 '구분'처럼 다른 말을 받습니다. */
  roleLabel?: string;
}

/** 기간과 소속과 역할을 한 줄에 몰아 적지 않고 한 항목씩 나눠 적습니다. */
export default function ExperienceMeta({
  period,
  org,
  role,
  roleLabel = '역할',
}: Props) {
  const rows = [
    { label: '기간', value: period },
    { label: '소속', value: org },
    { label: roleLabel, value: role },
  ];

  return (
    <ul className="m-0 list-disc space-y-s-2 pl-s-4 marker:text-ink-300">
      {rows.map(({ label, value }) => (
        <li key={label} className="pl-s-1">
          <span className="inline-block w-[40px] shrink-0 font-mono text-[12px] tracking-[0.06em] text-ink-400">
            {label}
          </span>
          <span className="font-mono text-[14px] leading-[1.6] text-ink-800">
            {value}
          </span>
        </li>
      ))}
    </ul>
  );
}
