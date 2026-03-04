'use client';

import * as React from "react";
import Image from "next/image";
import type { SectionConfig } from "@/data/sections";

type HeroProps = {
  sections: SectionConfig[];
  onNavigate: (id: string) => void;
};

export function Hero({ sections, onNavigate }: HeroProps) {
  return (
    <header
      id="main"
      className="relative flex min-h-screen items-center justify-center px-4 py-12"
    >
      {/* Световой слой как в оригинальном hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_20%,rgba(255,255,255,0.07),transparent_70%)]" />

      {/* Центральная стеклянная панель */}
      <div className="relative z-10 mx-auto flex w-full max-w-[68.75rem] flex-col items-center gap-10 rounded-[18px] border border-white/8 bg-[rgba(0,0,0,0.14)] p-10 shadow-[0_12px_48px_4px_rgba(0,0,0,0.4)] backdrop-blur-[7px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/assets/img/logo/logo_white.svg"
            alt="CBSD"
            width={96}
            height={32}
            className="opacity-90"
          />
          <h1 className="text-balance text-[clamp(22px,3.2vw,38px)] font-semibold leading-tight tracking-[0.02em]">
            База знаний тренера CBSD
          </h1>
        </div>
        <nav
          className="grid w-full gap-3 sm:grid-cols-3"
          aria-label="Разделы страницы"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="w-full min-h-[44px] rounded-[10px] border border-[rgba(255,255,255,0.18)] bg-[rgba(22,117,114,0.88)] px-4 py-2 text-[1rem] font-semibold text-[rgba(255,255,255,0.98)] shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-[1px] hover:bg-[rgba(22,117,114,0.96)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,255,0.35)] active:translate-y-0"
              onClick={() => onNavigate(section.id)}
            >
              {section.navLabel}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

