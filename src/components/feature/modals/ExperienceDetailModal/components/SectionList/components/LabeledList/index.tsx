interface Props {
  /** 목록 위에 붙는 문구입니다. 한 일과 러닝 포인트처럼 그 목록이 무엇인지 적습니다. */
  label: string;
  items: string[];
}

/** 문구를 단 목록 하나입니다. 성격이 다른 줄을 한 목록에 몰아 적지 않도록 묶음마다 나눠 담습니다. */
export default function LabeledList({ label, items }: Props) {
  return (
    <div className="mt-s-5">
      <span className="font-mono text-[12px] tracking-[0.06em] text-ink-400">
        {label}
      </span>
      <ul className="m-0 mt-s-3 list-disc space-y-s-3 pl-s-4 marker:text-ink-300">
        {items.map((item) => (
          <li
            key={item}
            className="pl-s-1 text-[16px] leading-[1.8] text-ink-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
