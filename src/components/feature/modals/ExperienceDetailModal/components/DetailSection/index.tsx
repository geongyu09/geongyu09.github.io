import Eyebrow from '@/components/ds/Eyebrow';

interface Props {
  /** 목록 위에 붙는 제목. 한 일, 배운 것, 남긴 것을 나눠 씁니다. */
  label: string;
  items: string[];
}

/** 활동 상세 한 갈래를 순번과 함께 늘어놓습니다. */
export default function DetailSection({ label, items }: Props) {
  return (
    <section className="mt-s-7">
      <Eyebrow className="text-[13px] text-ink-900">{label}</Eyebrow>
      <ol className="m-0 mt-s-4 flex list-none flex-col gap-s-5 p-0">
        {items.map((item, index) => (
          <li key={item} className="flex gap-s-4">
            <span
              className="mt-[7px] shrink-0 font-mono text-[12px] tracking-[0.06em] text-ink-400"
              aria-hidden
            >
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <p className="m-0 text-[17px] leading-[1.85] text-ink-700">
              {item}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
