import Gap from '@/components/common/layout/Gap';

export default function loading() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="-translate-y-10 text-center">
        <p className="text-4xl font-bold">로딩중...</p>
        <Gap size={4} />
        <p className="text-lg">
          <span className="text-indigo-900">오래 </span>
          걸리지 <span className="text-indigo-900">않기를 </span>
          바라요..!
        </p>
      </div>
    </section>
  );
}
