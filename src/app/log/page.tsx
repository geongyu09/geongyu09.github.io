import { notFound } from 'next/navigation';

import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import Eyebrow from '@/components/ds/Eyebrow';
import SectionHeading from '@/components/ds/SectionHeading';
import GitHubActivityGraph from '@/components/feature/Log/GitHubActivityGraph';
import StudySection from '@/components/feature/Log/StudySection';
import cn from '@/utils/cn';
import getAllLogWithinYears from './_lib/getAllLogWithinYears';

const SKILLS = [
  'Frontend',
  'TypeScript',
  'React',
  'Next.js',
  'Functional',
  'LLM tools',
];

const START_YEAR = 2023;

const formatYearMonth = (date: string) => {
  if (date === '현재') return '현재';
  return date.slice(0, 7).replace('-', '.');
};

const formatRange = (startDate: string, endDate: string) =>
  `${formatYearMonth(startDate)} ~ ${formatYearMonth(endDate)}`;

export default function LogPage() {
  notFound();

  const {
    allYears,
    studiesByYear,
    experiencesByYear,
    YEARS_WITH_GITHUB_GRAPH,
  } = getAllLogWithinYears();

  const yearsSince = new Date().getFullYear() - START_YEAR + 1;

  return (
    <main>
      <FadeEffectWrapper transitionKey="log-hero">
        <section className="border-b border-ink-200">
          <div className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-7 pb-s-7 md:pt-s-9 md:pb-s-8">
            <Eyebrow className="mb-s-4 md:mb-s-5">
              about · 박건규 / geongyu
            </Eyebrow>
            <h1 className="text-[36px] leading-[1.1] tracking-[-0.03em] font-semibold md:text-[56px] md:leading-[1.1] m-0 max-w-[800px]">
              함께하고 싶은 개발자가 되는 일에 — 오래 머무르고 싶습니다.
            </h1>
            <p className="text-[15px] leading-[1.6] md:text-lead text-ink-500 mt-s-4 md:mt-s-6 max-w-reading">
              프론트엔드를 중심으로, 함수형 사고와 AI 기반 도구 사이에서 일하는
              법을 배워가는 중. 우아한테크코스 8기, 카카오 테크 캠퍼스 2기 수료.
            </p>
            <div className="mt-s-5 md:mt-s-6 flex flex-wrap gap-s-3">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-[14px] py-[6px] rounded-pill border border-ink-950 text-[13px] font-medium text-ink-950"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </FadeEffectWrapper>

      <FadeEffectWrapper transitionKey="log-journal">
        <section className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-7 md:pt-s-9 pb-s-9">
          <SectionHeading meta={`${yearsSince} years · since ${START_YEAR}`}>
            Journal — by year
          </SectionHeading>

          {allYears.map((year, idx) => {
            const yearStudies =
              studiesByYear.find((g) => g.year === year)?.items || [];
            const yearExperiences =
              experiencesByYear.find((g) => g.year === year)?.items || [];
            const hasGitHub = YEARS_WITH_GITHUB_GRAPH.includes(year);

            if (
              yearStudies.length === 0 &&
              yearExperiences.length === 0 &&
              !hasGitHub
            ) {
              return null;
            }

            return (
              <div
                key={year}
                className={cn(
                  'grid grid-cols-1 md:grid-cols-[140px_1fr] gap-s-4 md:gap-s-7 py-s-6 md:py-s-7',
                  idx > 0 && 'border-t border-ink-200',
                )}
              >
                <div>
                  <div className="text-[36px] md:text-[48px] font-semibold tracking-[-0.04em] leading-none text-ink-950">
                    {year}
                  </div>
                  <div className="font-mono text-[11px] text-ink-500 mt-s-2 tracking-[0.05em] uppercase">
                    Year / {String(year).slice(-2)}
                  </div>
                </div>

                <div className="flex flex-col gap-s-6 min-w-0">
                  {hasGitHub && (
                    <div className="min-w-0">
                      <Eyebrow className="mb-s-3">
                        Github · contributions
                      </Eyebrow>
                      <div className="overflow-x-auto">
                        <GitHubActivityGraph year={year} />
                      </div>
                    </div>
                  )}

                  {yearExperiences.length > 0 && (
                    <div>
                      <Eyebrow className="mb-s-3">Experience</Eyebrow>
                      <ul className="flex flex-col">
                        {yearExperiences.map((exp, i) => (
                          <li
                            key={`${exp.title}-${exp.startDate}`}
                            className={cn(
                              'flex justify-between items-baseline gap-s-3 py-s-3 text-[15px]',
                              i > 0 && 'border-t border-ink-200',
                            )}
                          >
                            <span className="text-ink-950">{exp.title}</span>
                            <span className="font-mono text-xs text-ink-500 shrink-0">
                              {formatRange(exp.startDate, exp.endDate)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {yearStudies.length > 0 && (
                    <StudySection studies={yearStudies} />
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </FadeEffectWrapper>
    </main>
  );
}
