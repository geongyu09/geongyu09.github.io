import Eyebrow from '@/components/ds/Eyebrow';
import { ExperienceTrait } from '@/types/log';
import EvidenceList from './components/EvidenceList';
import TraitParagraph from './components/TraitParagraph';

interface Props {
  traits: ExperienceTrait[];
}

/**
 * 활동에서 보여준 모습을 소주제별로 나눠 보여 줍니다.
 * 한 일과 배운 것처럼 한 줄씩 늘어놓는 대신, 태도를 문단으로 풀어 적고 그 아래에 근거가 된 활동을 답니다.
 */
export default function TraitSection({ traits }: Props) {
  return (
    <section className="mt-s-7 border-t border-ink-200 pt-s-7">
      <Eyebrow className="text-[13px] text-ink-900">보여준 모습</Eyebrow>
      {/* 소주제 사이에는 선을 두지 않습니다. 보여준 모습 전체가 한 섹션으로 읽혀야 합니다. */}
      <div className="mt-s-5 flex flex-col gap-s-7">
        {traits.map((trait, index) => (
          <div key={trait.title}>
            <div className="flex items-baseline gap-s-3">
              <span
                className="shrink-0 font-mono text-[12px] tracking-[0.06em] text-ink-400"
                aria-hidden
              >
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <h3 className="m-0 text-[19px] font-semibold leading-[1.45] tracking-[-0.02em] text-ink-950 sm:text-[21px]">
                {trait.title}
              </h3>
            </div>

            <div className="mt-s-4 flex flex-col gap-s-4">
              {trait.paragraphs.map((paragraph) => (
                <TraitParagraph key={paragraph} text={paragraph} />
              ))}
            </div>

            <EvidenceList
              label={trait.evidenceLabel}
              evidences={trait.evidences}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
