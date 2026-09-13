interface Props {
  paragraphs: string[];
}

/** 한 일과 배운 것으로 나누기 어려운 활동을 제목 없이 문단으로만 이어 적습니다. */
export default function NarrativeSection({ paragraphs }: Props) {
  return (
    <section className="mt-s-7 flex flex-col gap-s-4 border-t border-ink-200 pt-s-7">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="m-0 text-[17px] leading-[1.85] text-ink-700"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}
