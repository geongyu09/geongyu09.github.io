import Button from '@/components/ds/Button';
import Callout from '@/components/ds/Callout';
import Chip from '@/components/ds/Chip';
import Eyebrow from '@/components/ds/Eyebrow';
import ImagePlaceholder from '@/components/ds/ImagePlaceholder';
import InlineTag from '@/components/ds/InlineTag';
import Pagination from '@/components/ds/Pagination';
import PostCard, { FeaturedPostCard } from '@/components/ds/PostCard';
import Quote from '@/components/ds/Quote';
import SearchField from '@/components/ds/SearchField';
import SectionHeading from '@/components/ds/SectionHeading';
import YearHeader from '@/components/ds/YearHeader';

const INK = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const Swatch = ({ token, hex }: { token: string; hex: string }) => (
  <div className="border border-ink-200 rounded-r-1 overflow-hidden">
    <div className="aspect-[16/9]" style={{ background: hex }} />
    <div className="px-3 py-[10px] bg-white">
      <div className="text-[13px] font-semibold">{token}</div>
      <div className="font-mono text-[11px] text-ink-500 mt-[2px]">
        {hex.toUpperCase()}
      </div>
    </div>
  </div>
);

const Block = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-s-8">
    <SectionHeading>{title}</SectionHeading>
    {children}
  </section>
);

export default function DesignSystemPage() {
  return (
    <div className="max-w-container mx-auto px-s-7 py-s-9">
      {/* Hero */}
      <Eyebrow className="mb-s-4">
        Design system · v1.0 · based on V1 Editorial
      </Eyebrow>
      <h1 className="text-display m-0">
        조용하게,
        <br />
        <span className="text-ink-500">정확하게.</span>
      </h1>
      <p className="text-lead text-ink-500 mt-s-5 max-w-[640px]">
        geongyu 블로그의 디자인 시스템 v1. 흰 종이, 검은 잉크, 한 방울의 파랑 —
        그리고 두 개의 글씨 가족.
      </p>

      <div className="my-s-9" />

      {/* Color */}
      <Block title="01 · Color · Ink scale">
        <div className="grid grid-cols-6 gap-s-3">
          {INK.map((step) => (
            <Swatch
              key={step}
              token={`ink-${step}`}
              hex={
                {
                  0: '#ffffff',
                  50: '#fafafa',
                  100: '#f4f4f4',
                  200: '#e8e8e8',
                  300: '#d4d4d4',
                  400: '#a3a3a3',
                  500: '#737373',
                  600: '#525252',
                  700: '#404040',
                  800: '#262626',
                  900: '#171717',
                  950: '#0a0a0a',
                }[step] as string
              }
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-s-3 mt-s-5">
          <Swatch token="blue-50" hex="#e8eeff" />
          <Swatch token="blue-600 · primary" hex="#2c5eff" />
          <Swatch token="blue-800 · hover" hex="#1f43c2" />
        </div>
      </Block>

      {/* Typography */}
      <Block title="02 · Typography">
        <div className="space-y-s-5">
          <div>
            <Eyebrow>display · 64 / 600 / -0.035em</Eyebrow>
            <div className="text-display mt-s-2">Aa 안녕</div>
          </div>
          <div>
            <Eyebrow>h1 · 44 / 600</Eyebrow>
            <div className="text-h1 mt-s-2">함께하고 싶은 개발자</div>
          </div>
          <div>
            <Eyebrow>h2 · 28 / 600</Eyebrow>
            <div className="text-h2 mt-s-2">조용하게, 정확하게</div>
          </div>
          <div>
            <Eyebrow>h3 · 20 / 600</Eyebrow>
            <div className="text-h3 mt-s-2">우테코 3, 4주차 회고</div>
          </div>
          <div>
            <Eyebrow>lead · 18 / 400 · ink-500</Eyebrow>
            <p className="text-lead text-ink-500 mt-s-2 m-0">
              매주 한 편씩, 배운 것을 정리합니다.
            </p>
          </div>
          <div>
            <Eyebrow>body · 17 / 400 · line 1.75</Eyebrow>
            <p className="text-body mt-s-2 m-0 max-w-reading">
              본문 텍스트. 줄간격은 1.75를 기준으로 합니다. 가장 먼저 눈에
              들어온 건 <span className="ds-link">agentic loop</span>라는
              다이어그램이었다.
            </p>
          </div>
          <div>
            <Eyebrow>caption · mono 11px uppercase</Eyebrow>
            <div className="font-mono text-caption uppercase text-ink-500 mt-s-2">
              Established 2024 · Seoul · Vol. IV
            </div>
          </div>
        </div>
      </Block>

      {/* Spacing */}
      <Block title="03 · Spacing (4px base)">
        <div className="flex items-end gap-s-3">
          {[
            ['s-1', 4],
            ['s-2', 8],
            ['s-3', 12],
            ['s-4', 16],
            ['s-5', 24],
            ['s-6', 32],
            ['s-7', 48],
            ['s-8', 64],
            ['s-9', 88],
            ['s-10', 128],
          ].map(([t, px]) => (
            <div key={t as string} className="text-center">
              <div
                className="bg-ink-950"
                style={{ width: px as number, height: 24 }}
              />
              <div className="font-mono text-[11px] text-ink-500 mt-s-2">
                {t}
              </div>
              <div className="font-mono text-[11px] text-ink-400">{px}</div>
            </div>
          ))}
        </div>
      </Block>

      {/* Radius */}
      <Block title="04 · Radius">
        <div className="grid grid-cols-4 gap-s-4">
          {[
            ['r-0', 0, '이미지, full-bleed'],
            ['r-1', 6, 'placeholder, code'],
            ['r-2', 12, '카드, 콜아웃'],
            ['r-pill', 999, 'chip, pill button'],
          ].map(([t, r, use]) => (
            <div key={t as string} className="text-center">
              <div
                className="aspect-square bg-ink-100 mb-s-2"
                style={{ borderRadius: r as number }}
              />
              <div className="font-mono text-[11px] text-ink-500">{t}</div>
              <div className="text-[13px]">{use}</div>
            </div>
          ))}
        </div>
      </Block>

      {/* Components */}
      <Block title="05 · Buttons">
        <div className="flex flex-wrap items-center gap-s-4">
          <Button variant="primary">전체 아카이브 →</Button>
          <Button variant="default">RSS 구독</Button>
          <Button variant="ghost">이전</Button>
          <span className="ds-link cursor-pointer">inline link</span>
        </div>
      </Block>

      <Block title="06 · Chips & inline tags">
        <div className="flex flex-wrap gap-s-2 mb-s-5">
          <Chip active>전체 · 47</Chip>
          <Chip>기술분석</Chip>
          <Chip>회고</Chip>
          <Chip>react</Chip>
          <Chip>TypeScript</Chip>
        </div>
        <div className="flex gap-s-4">
          <InlineTag>Claude-Code</InlineTag>
          <InlineTag>LLM</InlineTag>
          <InlineTag>기술분석</InlineTag>
        </div>
      </Block>

      <Block title="07 · Search field">
        <SearchField />
      </Block>

      <Block title="08 · Callout & Quote">
        <Callout>
          이 글은 Claude Code 4.2 docs (2026-04 기준)을 바탕으로 합니다.
        </Callout>
        <div className="mt-s-5">
          <Quote by="Claude Code docs">
            &quot;The harness is the operating system; the model is the
            CPU.&quot;
          </Quote>
        </div>
      </Block>

      <Block title="09 · Post cards">
        <FeaturedPostCard
          href="#"
          eyebrow="★ FEATURED · 기술 분석"
          date="2026.04.23"
          readingTime="12분 읽기"
          title="LLM은 어떻게 개발자가 되는가"
          excerpt="Claude Code가 LLM 모델을 어떻게 코딩 에이전트로 변환하는지, 공식 문서와 소스 코드를 분석하여 살펴보았습니다."
          tags={['Claude-Code', 'LLM', '기술분석']}
        />
        <div className="mt-s-5">
          <PostCard
            href="#"
            date="2026.03.22"
            title="우테코 3, 4주차 회고"
            excerpt="함수형 원정대 활동과 공유회 준비를 통해 함수형 사고를 익히고, AI 기반 개발 도구를 직접 활용해본 한 달간의 성장 기록입니다."
            tags={['우테코', '회고', '함수형프로그래밍']}
            readingTime="9분"
          />
          <PostCard
            href="#"
            date="2026.03.08"
            title="[회고] 우테코 2주차 회고"
            excerpt="우아한 테크 코스의 두 번째 주를 돌아보며 연극, 첫 FE 수업, 페어 프로그래밍을 통해 배운 것들을 정리하였습니다."
            tags={['우테코', '회고']}
            readingTime="7분"
          />
        </div>
      </Block>

      <Block title="10 · Year header">
        <YearHeader year={2026} count={5}>
          올해 발행된 글의 묶음. 우측 영역에 포스트 카드들이 1px hairline으로
          이어붙습니다.
        </YearHeader>
      </Block>

      <Block title="11 · Image placeholder">
        <ImagePlaceholder>DIAGRAM · CLAUDE CODE AGENTIC LOOP</ImagePlaceholder>
      </Block>

      <Block title="12 · Pagination">
        <Pagination current={1} total={4} />
      </Block>

      <footer className="mt-s-10 pt-s-7 border-t border-ink-200 flex justify-between text-sm text-ink-500">
        <div>© 2026 박건규 (geongyu) · Design System v1.0</div>
        <div className="font-mono text-caption">
          5 SECTIONS · 11 COMPONENTS · 1 ACCENT
        </div>
      </footer>
    </div>
  );
}
