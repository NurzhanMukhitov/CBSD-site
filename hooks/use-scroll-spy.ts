'use client';

import * as React from "react";

export function useScrollSpy(sectionIds: string[], offset = 76) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const indexById = new Map<string, number>();
    sectionIds.forEach((id, index) => indexById.set(id, index));

    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const id = el.id;
          if (!id) return;
          if (entry.isIntersecting) {
            visibleIds.add(id);
          } else {
            visibleIds.delete(id);
          }
        });

        if (!visibleIds.size) return;

        // Берём видимый раздел с наименьшим индексом (ближе всего к верху страницы).
        const ordered = Array.from(visibleIds).sort((a, b) => {
          return (indexById.get(a) ?? 0) - (indexById.get(b) ?? 0);
        });

        setActiveId(ordered[0] ?? null);
      },
      {
        // Центральная "полоса внимания" по вертикали
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}

