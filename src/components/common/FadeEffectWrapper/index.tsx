'use client';

import { transition } from '@ssgoi/react';
import { fade } from '@ssgoi/react/transitions';
import { PropsWithChildren } from 'react';

interface FadeEffectWrapper extends PropsWithChildren {
  transitionKey: string;
}

export default function TransitionWrapper({
  children,
  transitionKey,
}: FadeEffectWrapper) {
  return (
    <div
      ref={transition({
        key: transitionKey,
        ...fade({ from: 0, to: 1 }),
      })}
    >
      {children}
    </div>
  );
}
