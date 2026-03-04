'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import type { SectionConfig } from "@/data/sections";

type StickyNavProps = {
  sections: SectionConfig[];
  activeId: string | null;
  isVisible: boolean;
  onNavigate: (id: string) => void;
};

export function StickyNav({
  sections,
  activeId,
  isVisible,
  onNavigate,
}: StickyNavProps) {
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-md transition-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } hidden md:block`}
      aria-label="Навигация по разделам"
    >
      <div className="mx-auto flex w-full max-w-[68.75rem] items-center justify-center gap-4 px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              size="sm"
              variant={activeId === section.id ? "default" : "ghost"}
              className="rounded-full px-3 text-xs"
              onClick={() => onNavigate(section.id)}
            >
              {section.navLabel}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}

