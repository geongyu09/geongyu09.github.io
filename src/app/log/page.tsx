import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import Eyebrow from '@/components/ds/Eyebrow';
import GitHubActivityGraph from '@/components/feature/Log/GitHubActivityGraph';
import LogSummary from '@/components/feature/Log/LogSummary';
import LogViews from '@/components/feature/Log/LogViews';
import PresentationSection from '@/components/feature/Log/PresentationSection';
import ProjectSection from '@/components/feature/Log/ProjectSection';
import StudySection from '@/components/feature/Log/StudySection';
import SITE from '@/constants/site';
import { formatRangeInYear } from '@/lib/log/formatLogDate';
import { splitProjectsBySection } from '@/lib/log/projectSection';
import cn from '@/utils/cn';
import type { Metadata } from 'next';
import getAllLogEntries from './_lib/getAllLogEntries';
import getAllLogWithinYears from './_lib/getAllLogWithinYears';
import getLogSummary from './_lib/getLogSummary';

export const metadata: Metadata = {
  title: 'Log',
  description:
    '프론트엔드 개발자 박건규의 프로젝트와 경험, 발표와 스터디, GitHub 활동을 연도별로 정리한 기록입니다.',
  alternates: { canonical: `${SITE.URL}/log/` },
  openGraph: {
    type: 'profile',
    url: `${SITE.URL}/log/`,
    title: 'Log · 박건규',
    description:
      '프론트엔드 개발자 박건규의 프로젝트와 경험, 발표와 스터디, GitHub 활동을 연도별로 정리한 기록입니다.',
    siteName: SITE.TITLE,
    images: [{ url: SITE.OG_IMAGE, width: 1200, height: 630, alt: SITE.TITLE }],
  },
};

const pad2 = (n: number) => n.toString().padStart(2, '0');

export default function LogPage() {
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
        <section className="border-b border-ink-200">
          <div className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-6 md:pt-s-7 pb-s-5 md:pb-s-6">
            <Eyebrow className="mb-s-3 text-[13px]">Log</Eyebrow>

            <h1 className="m-0 text-[32px] md:text-h2 text-ink-950">
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
                  <div
                    key={year}
                    id={`year-${year}`}
                    className={cn(
                      'grid grid-cols-1 md:grid-cols-[140px_1fr] gap-s-4 md:gap-s-7 py-s-6 md:py-s-7 scroll-mt-[80px]',
                      idx > 0 && 'border-t border-ink-200',
                    )}
                  >
                    <div className="sticky top-16 z-10 self-start -mx-s-5 flex items-baseline gap-s-3 border-b border-ink-200 bg-ink-0 px-s-5 py-s-2 md:top-[88px] md:mx-0 md:block md:border-0 md:px-0 md:py-0">
                      <div className="text-[28px] md:text-[30px] font-semibold tracking-[-0.02em] leading-none text-ink-950">
                        {year}
                      </div>
                      <div className="font-mono text-[13px] text-ink-500 tracking-[0.05em] md:mt-s-2">
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
                          <Eyebrow className="mb-s-3 text-[13px] text-ink-900">
                            Github · contributions
                          </Eyebrow>
                          <div className="overflow-x-auto">
                            <GitHubActivityGraph year={year} />
                          </div>
                        </div>
                      )}

                      {experiences.length > 0 && (
                        <div>
                          <Eyebrow className="mb-s-3 text-[13px] text-ink-900">
                            Experience
                          </Eyebrow>
                          <ul className="flex flex-col">
                            {experiences.map((exp, i) => (
                              <li
                                key={`${exp.title}-${exp.startDate}`}
                                className={cn(
                                  'flex justify-between items-baseline gap-s-3 py-s-3 text-[17px]',
                                  i > 0 && 'border-t border-ink-200',
                                )}
                              >
                                <span className="text-ink-950">
                                  {exp.title}
                                </span>
                                <span className="font-mono text-[14px] text-ink-500 shrink-0">
                                  {formatRangeInYear(
                                    exp.startDate,
                                    exp.endDate,
                                    year,
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
                  </div>
                ),
              )}
            </section>
          </FadeEffectWrapper>
        }
      />
    </main>
  );
}
