import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import LogBanner from '@/components/feature/Log/LogBanner';

export default function LogPage() {
  return (
    <>
      <LogBanner />
      <FadeEffectWrapper transitionKey="log-content">
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        <div>asdfasdfsadfs</div>
        Fade me!
      </FadeEffectWrapper>
    </>
  );
}
