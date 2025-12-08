import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import Container from '@/components/common/layout/Container';
import LogBanner from '@/components/feature/Log/LogBanner';

export default function LogPage() {
  return (
    <>
      <LogBanner />
      <FadeEffectWrapper transitionKey="log-content">
        <Container>
          <section className="min-h-[50vh] py-20">
            로그 콘텐츠 작성 예정
          </section>
        </Container>
      </FadeEffectWrapper>
    </>
  );
}
