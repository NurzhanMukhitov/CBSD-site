'use client';

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type ScrollToTopProps = {
  isVisible: boolean;
  onClick: () => void;
};

export function ScrollToTop({ isVisible, onClick }: ScrollToTopProps) {
  return (
    <Button
      type="button"
      aria-label="Наверх"
      title="Наверх"
      size="icon"
      className={`fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-emerald-600 text-white shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-all ${
        isVisible
          ? "pointer-events-auto opacity-100 translate-y-0 hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.55)] active:translate-y-[1px]"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
      onClick={onClick}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}

