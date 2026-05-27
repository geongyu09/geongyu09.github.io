'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/log');
  }, [router]);

  return null;
}
