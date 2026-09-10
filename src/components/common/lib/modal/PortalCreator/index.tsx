'use client';

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps extends PropsWithChildren {
  domNode?: HTMLElement;
}

// key 는 리액트가 가져가는 이름이라 props 로 읽을 수 없습니다. 바깥에서 걸어 둔 key 로 이미 구분됩니다.
export default function PortalCreator({
  children,
  domNode = document.body,
}: ModalProps) {
  return createPortal(children, domNode);
}
