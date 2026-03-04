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

      setActiveId(bestId);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [sectionIds, offset]);

  return activeId;
}

