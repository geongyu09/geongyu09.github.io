'use client';

import { useModal } from '@/lib/modal';
import cn from '@/utils/cn';
import Image from 'next/image';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface ImageModalProps {
  src: string;
  alt: string;
}

export default function ImageModal({ src, alt }: ImageModalProps) {
  const { closeModal, isClosing } = useModal();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [closeModal]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <button
        type="button"
        aria-label="이미지 모달 닫기"
        onClick={() => closeModal()}
        className={cn(
          'absolute inset-0 w-full h-full bg-black/85 backdrop-blur-sm cursor-zoom-out',
          isClosing
            ? 'animate-modal-backdrop-out'
            : 'animate-modal-backdrop-in',
        )}
      />
      <button
        type="button"
        aria-label="닫기"
        onClick={() => closeModal()}
        className={cn(
          'absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors',
          isClosing
            ? 'animate-modal-backdrop-out'
            : 'animate-modal-backdrop-in',
        )}
      >
        <IoClose size={24} />
      </button>
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        className={cn(
          'relative max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-lg select-none pointer-events-none',
          isClosing ? 'animate-modal-panel-out' : 'animate-modal-panel-in',
        )}
        priority
        unoptimized
      />
    </div>
  );
}
