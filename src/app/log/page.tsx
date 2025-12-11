import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import GitHubActivityGraph from '@/components/feature/Log/GitHubActivityGraph';
import LogBanner from '@/components/feature/Log/LogBanner';
import { STUDY_DATA } from '@/constants/log/studyData';
// import ROUTE_PATH from '@/constants/path/routePath';
import { groupByYear, groupStudiesByYear } from '@/lib/log/groupByYear';
import { getAllPosts } from '@/lib/post/post';
import Link from 'next/link';

const YEARS_WITH_GITHUB_GRAPH = [2024, 2025];

export default function LogPage() {
  const allPosts = getAllPosts();
  const postsByYear = groupByYear(allPosts);
  const studiesByYear = groupStudiesByYear(STUDY_DATA);

  // Get all unique years from both sources
  const allYears = Array.from(
    new Set([
      ...postsByYear.map((g) => g.year),
      ...studiesByYear.map((g) => g.year),
      ...YEARS_WITH_GITHUB_GRAPH,
    ]),
  ).sort((a, b) => b - a);

  return (
    <>
      <LogBanner />
      <FadeEffectWrapper transitionKey="log-content">
        <Gap size={14} />
        <Container>
          {allYears.map((year, index) => {
            const yearPosts =
              postsByYear.find((g) => g.year === year)?.items || [];
            const yearStudies =
              studiesByYear.find((g) => g.year === year)?.items || [];
            const hasGitHub = YEARS_WITH_GITHUB_GRAPH.includes(year);

            // Skip year if no content
            if (
              yearPosts.length === 0 &&
              yearStudies.length === 0 &&
              !hasGitHub
            ) {
              return null;
            }

            const isLastYear = index === allYears.length - 1;
            const isFirstYear = index === 0;

            return (
              <>
                <section
                  key={year}
                  className="grid grid-cols-[100px_40px_1fr] text-slate-700 gap-x-4"
                >
                  {/* year */}
                  <div>
                    <span className="text-3xl font-bold text-end">{year}</span>
                  </div>

                  {hasGitHub && (
                    <>
                      {/* line:start */}
                      <div
                        className={`flex flex-col items-center ${isFirstYear ? 'pt-4' : ''}`}
                      >
                        <div
                          className={`w-3 h-3 bg-slate-300 rounded-full ${!isFirstYear ? 'absolute translate-y-3' : ''}`}
                        />
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>

                      {/* content : github */}
                      <div>
                        <Gap size={1} />
                        <p className="text-xl font-semibold">Github</p>
                        <Gap size={6} />
                        <GitHubActivityGraph year={year} />
                      </div>
                    </>
                  )}

                  {yearStudies.length > 0 && (
                    <>
                      {/* line:space */}
                      <div />
                      <div className="flex flex-col items-center h-10">
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>
                      <div />

                      <div />
                      {/* line:middle */}
                      <div className="flex flex-col items-center relative">
                        <div className="w-3 h-3 bg-slate-300 rounded-full absolute translate-y-4" />
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>
                      {/* content : study */}
                      <div>
                        <Gap size={1} />
                        <p className="text-xl font-semibold">Study</p>
                        <Gap size={6} />
                        <ul className="flex flex-col gap-4">
                          {yearStudies.map((study) => (
                            <li
                              key={`${study.title}-${study.date}`}
                              className="text-gray-500"
                            >
                              {study.href ? (
                                <Link
                                  href={study.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium hover:text-slate-700 transition-colors"
                                >
                                  {study.title}
                                </Link>
                              ) : (
                                <span className="font-medium">
                                  {study.title}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </section>

                {/* Year connector line */}
                {!isLastYear && (
                  <div className="grid grid-cols-[100px_40px_1fr] gap-x-4 h-24">
                    <div />
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                    </div>
                    <div />
                  </div>
                )}
              </>
            );
          })}
        </Container>
        <Gap size={24} />
      </FadeEffectWrapper>
    </>
  );
}
