'use client';

import { Ssgoi } from '@ssgoi/react';
import { fade } from '@ssgoi/react/view-transitions';
import { PropsWithChildren } from 'react';

const config = {
  transitions: [
    {
      from: '/',
      to: '/log',
      transition: fade(),
    },
    {
      from: '/log',
      to: '/',
      transition: fade(),
    },
  ],
};

export default function SsgoiProvider({ children }: PropsWithChildren) {
  return <Ssgoi config={config}>{children}</Ssgoi>;
}
