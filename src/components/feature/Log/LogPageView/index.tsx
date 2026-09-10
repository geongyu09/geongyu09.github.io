import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import ScrollFadeIn from '@/components/common/ScrollFadeIn';
import Eyebrow from '@/components/ds/Eyebrow';
import ExperienceSection from '@/components/feature/Log/ExperienceSection';
import GitHubActivityGraph from '@/components/feature/Log/GitHubActivityGraph';
import LogSummary from '@/components/feature/Log/LogSummary';
import LogViews from '@/components/feature/Log/LogViews';
import PresentationSection from '@/components/feature/Log/PresentationSection';
import ProjectSection from '@/components/feature/Log/ProjectSection';
import StudySection from '@/components/feature/Log/StudySection';
import getAllLogEntries from '@/app/log/_lib/getAllLogEntries';
import getAllLogWithinYears from '@/app/log/_lib/getAllLogWithinYears';
import getLogSummary from '@/app/log/_lib/getLogSummary';
import { splitProjectsBySection } from '@/lib/log/projectSection';
import cn from '@/utils/cn';

const pad2 = (n: number) => n.toString().padStart(2, '0');

/**
 * 로그 페이지의 본문입니다.
 * 상세 모달을 병렬 경로로 띄우는 동안에도 뒤에 같은 화면이 남아 있어야 해서
 * page.tsx 와 default.tsx 가 이 컴포넌트를 함께 그립니다.
 */
export default function LogPageView() {
  const {
    allYears,
    studiesByYear,
    experiencesByYear,
    projectsByYear,
    presentationsByYear,
    YEARS_WITH_GITHUB_GRAPH,
  } = getAllLogWithinYears();

  const yearSections = allYears
    .map((year) => ({
      year,
      studies: studiesByYear.find((g) => g.year === year)?.items || [],
      experiences: experiencesByYear.find((g) => g.year === year)?.items || [],
      projectSections: splitProjectsBySection(
        projectsByYear.find((g) => g.year === year)?.items || [],
      ),
      presentations:
        presentationsByYear.find((g) => g.year === year)?.items || [],
      hasGitHub: YEARS_WITH_GITHUB_GRAPH.includes(year),
    }))
    .filter(
      (section) =>
        section.studies.length > 0 ||
        section.experiences.length > 0 ||
        section.projectSections.length > 0 ||
        section.presentations.length > 0 ||
        section.hasGitHub,
    );

  return (
    <main>
      <FadeEffectWrapper transitionKey="log-hero">
        <section>
          <div className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-6 md:pt-s-7 pb-s-5 md:pb-s-6">
            <Eyebrow className="mb-s-3 text-[14px]">Log</Eyebrow>

            <h1 className="m-0 text-[34px] md:text-h1 text-ink-950">
              활동 기록
            </h1>
          </div>
        </section>
      </FadeEffectWrapper>

      <LogSummary summary={getLogSummary()} />

      <LogViews
        years={yearSections.map(({ year }) => year)}
        entries={getAllLogEntries()}
        yearView={
          <FadeEffectWrapper transitionKey="log-journal">
            <section className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-5 md:pt-s-6 pb-s-9">
              {yearSections.map(
                (
                  {
                    year,
                    studies,
                    experiences,
                    projectSections,
                    presentations,
                    hasGitHub,
                  },
                  idx,
                ) => (
                  <ScrollFadeIn
                    key={year}
                    id={`year-${year}`}
                    className={cn(
                      'grid grid-cols-1 md:grid-cols-[156px_1fr] gap-s-4 md:gap-s-7 py-s-6 md:py-s-7 scroll-mt-[80px]',
                      idx > 0 && 'border-t border-ink-200',
                    )}
                  >
                    <div className="sticky top-16 z-10 self-start -mx-s-5 flex items-baseline gap-s-3 border-b border-ink-200 bg-ink-0 px-s-5 py-s-2 md:top-[88px] md:mx-0 md:block md:border-0 md:px-0 md:py-0">
                      <div className="text-[32px] md:text-[34px] font-semibold tracking-[-0.02em] leading-none text-ink-950">
                        {year}
                      </div>
                      <div className="font-mono text-[14px] text-ink-500 tracking-[0.05em] md:mt-s-2">
                        기록{' '}
                        {pad2(
                          experiences.length +
                            projectSections.reduce(
                              (count, { items }) => count + items.length,
                              0,
                            ) +
                            presentations.length +
                            studies.length,
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col min-w-0 divide-y divide-ink-200 [&>*]:py-s-5 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                      {hasGitHub && (
                        <div className="min-w-0">
                          <Eyebrow className="mb-s-3 text-[14px] text-ink-900">
                            Github · contributions
                          </Eyebrow>
                          <div className="overflow-x-auto">
                            <GitHubActivityGraph year={year} />
                          </div>
                        </div>
                      )}

                      {experiences.length > 0 && (
                        <ExperienceSection
                          experiences={experiences}
                          year={year}
                        />
                      )}

                      {projectSections.map(({ key, label, items }) => (
                        <ProjectSection
                          key={key}
                          label={label}
                          projects={items}
                          year={year}
                        />
                      ))}

                      {presentations.length > 0 && (
                        <PresentationSection
                          presentations={presentations}
                          year={year}
                        />
                      )}

                      {studies.length > 0 && (
                        <StudySection studies={studies} year={year} />
                      )}
                    </div>
                  </ScrollFadeIn>
                ),
              )}
            </section>
          </FadeEffectWrapper>
        }
      />
    </main>
  );
}
