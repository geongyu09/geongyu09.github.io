'use client';

import Gap from '@/components/common/layout/Gap';
import { useModal } from '@/lib/modal';
import { useState } from 'react';

export default function TestModal() {
  // 모달에서도 onClose를 설정할 수 있어야 한다..?
  const { closeModal, setResponse, getResponse } = useModal();

  const [text, setText] = useState<string>(getResponse() as string);

  return (
    <div className="fixed bottom-0 right-0 w-screen h-screen z-50 ">
      <div className="fixed  bottom-0 w-full h-[95%] max-h-[95%]  bg-white flex flex-col items-center justify-center border">
        <h1 className="text-4xl font-bold">Test Modal</h1>
        <Gap size={4} />
        <p className="text-lg">모달 테스트입니다.</p>
        <Gap size={4} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setResponse(text);
            closeModal(() => {
              // eslint-disable-next-line no-alert
              alert('submit');
            });
          }}
        >
          <input
            type="text"
            className="border"
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <button
          type="button"
          onClick={() => {
            setResponse('close');
            closeModal();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
