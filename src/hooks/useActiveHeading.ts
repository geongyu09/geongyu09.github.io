'use client';

import { useEffect, useState } from 'react';

export default function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join('|')]);

  return activeId;
}
