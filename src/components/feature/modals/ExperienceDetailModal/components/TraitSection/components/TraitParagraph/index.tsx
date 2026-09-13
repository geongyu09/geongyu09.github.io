import { Fragment } from 'react';
import { splitByEmphasis } from './utils';

interface Props {
  /** 먼저 읽히고 싶은 자리를 `**`로 감싸 적은 문단입니다. */
  text: string;
}

/**
 * 보여준 모습을 풀어 적은 문단 한 줄입니다.
 * 문단이 길어 전부 같은 무게로 읽히면 하고 싶은 말이 묻히므로, `**`로 감싼 자리만 굵게 쓰고 밑줄을 그어 먼저 눈에 들어오게 합니다.
 */
export default function TraitParagraph({ text }: Props) {
  return (
    <p className="m-0 text-[17px] leading-[1.85] text-ink-700">
      {splitByEmphasis(text).map((segment) =>
        segment.emphasized ? (
          <strong
            key={segment.id}
            className="font-semibold text-ink-950 underline decoration-ink-300 decoration-[1.5px] underline-offset-[5px]"
          >
            {segment.text}
          </strong>
        ) : (
          <Fragment key={segment.id}>{segment.text}</Fragment>
        ),
      )}
    </p>
  );
}
