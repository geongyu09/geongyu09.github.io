'use client';

// 모달 컴포넌트에서는 response를 set할 수 있도록 하고, 이에 대한 상태를 일반 트리에서 가져올 수 있도록 해야 함. (일반 컴포넌트 : read, 모달 :  write)
// 이 값은 모달이 닫힐 때 초기화 되어야한다.
// 모달이 닫힐 때 callback도 받아서 실행되도록 해야할듯? (열 때 실행할 콜백은 나중에)

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PortalCreator from '@/components/common/lib/modal/PortalCreator';
import { Modal, ModalContextValue, PushModal } from '../types';
import ModalContext from '../context';

/**
 * 닫기를 누른 뒤 모달을 트리에서 지우기까지 기다리는 시간입니다.
 * tailwind.config.ts 의 modal-*-out 애니메이션 중 가장 긴 길이(200ms)에 맞춰 둡니다.
 */
const CLOSE_ANIMATION_DURATION = 210;

interface ModalQueueItem {
  key: string;
  modal: Modal;
  onClose: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalQueue, setModalQueue] = useState<ModalQueueItem[]>([]);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // in modal state
  const [modalInternalDataState, setModalInternalDataState] = useState<
    boolean | string | null
  >(null);

  const currentModal = modalQueue[0];

  useEffect(() => {
    if (modalQueue.length > 0) {
      setModalInternalDataState(null);
    }
  }, [modalQueue]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const pushModal = useCallback(({ modal, onClose = () => {} }: PushModal) => {
    const key = Date.now().toString();

    const newModal: ModalQueueItem = {
      key,
      modal,
      onClose,
    };
    setModalQueue((prev) => [...prev, newModal]);
  }, []);

  /**
   * 모달의 리턴값을 설정하는 함수
   * 이는 모달 컴포넌트 내에서 사용할 수 있다.
   */
  const setResponse = useCallback((response: boolean | string) => {
    setModalInternalDataState(response);
  }, []);

  /**
   * 모달의 리턴값을 가져오는 함수
   * 이는 일반 컴포넌트에서 사용할 수 있다.
   */
  const getResponse = useCallback(() => {
    return modalInternalDataState;
  }, [modalInternalDataState]);

  /**
   * 모달을 닫는 함수
   * onClose와 콜백은 곧바로 실행하고, 퇴장 애니메이션이 끝난 뒤에 ModalQueue에서 첫번째 모달을 제거한다.
   * 애니메이션이 도는 동안 다시 호출되면 무시해서 닫기 동작이 겹치지 않도록 한다.
   */
  const closeModal = useCallback(
    (callback?: (response: boolean | string | null) => void) => {
      if (!currentModal || isClosing) return;

      currentModal.onClose();
      callback?.(modalInternalDataState);
      setIsClosing(true);

      closeTimerRef.current = setTimeout(() => {
        setModalQueue((prev) => prev.slice(1));
        setIsClosing(false);
        closeTimerRef.current = null;
      }, CLOSE_ANIMATION_DURATION);
    },
    [currentModal, isClosing, modalInternalDataState],
  );

  const value: ModalContextValue = useMemo(
    () => ({
      pushModal,
      setResponse,
      getResponse,
      closeModal,
      isClosing,
    }),
    [pushModal, setResponse, getResponse, closeModal, isClosing],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {currentModal && (
        <PortalCreator key={currentModal.key}>
          {currentModal.modal}
        </PortalCreator>
      )}
    </ModalContext.Provider>
  );
}
