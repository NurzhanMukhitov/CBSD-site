'use client';

import * as React from "react";

export function useScrollSpy(sectionIds: string[], offset = 76) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    function updateActiveSection() {
      let bestId: string | null = null;
      let bestTop = -Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.top <= offset && rect.top > bestTop) {
          bestTop = rect.top;
          bestId = id;
        }
      });

      // Если проскроллили практически до самого низа страницы,
      // явно считаем активным последний раздел ("Контакты").
      const doc = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = doc.scrollHeight;
      if (docHeight - scrollBottom <= 2 && sectionIds.length > 0) {
        bestId = sectionIds[sectionIds.length - 1];
      }

      setActiveId(bestId);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [sectionIds, offset]);

  return activeId;
}

