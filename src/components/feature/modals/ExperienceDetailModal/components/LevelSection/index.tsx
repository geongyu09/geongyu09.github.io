import Eyebrow from '@/components/ds/Eyebrow';
import { ExperienceLevel } from '@/types/log';
import MissionList from './components/MissionList';

interface Props {
  levels: ExperienceLevel[];
}

/**
 * 교육 과정을 레벨 단위로 끊어 보여 줍니다.
 * 레벨마다 무엇을 목표로 삼았는지 문단으로 먼저 적고, 그 아래에 그 레벨에서 수행한 미션을 답니다.
 */
export default function LevelSection({ levels }: Props) {
  return (
    <section className="mt-s-7 border-t border-ink-200 pt-s-7">
      <Eyebrow className="text-[13px] text-ink-900">레벨별 정리</Eyebrow>
      {/* 레벨 사이에는 선을 두지 않습니다. 레벨별 정리 전체가 한 섹션으로 읽혀야 합니다. */}
      <div className="mt-s-5 flex flex-col gap-s-7">
        {levels.map((level) => (
          <div key={level.label}>
            <h3 className="m-0 font-mono text-[19px] font-semibold leading-[1.45] tracking-[-0.02em] text-ink-950 sm:text-[21px]">
              {level.label}
            </h3>

            <div className="mt-s-4 flex flex-col gap-s-4">
              {level.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="m-0 text-[17px] leading-[1.85] text-ink-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {level.missions && level.missions.length > 0 && (
              <MissionList
                label={level.missionLabel}
                missions={level.missions}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
