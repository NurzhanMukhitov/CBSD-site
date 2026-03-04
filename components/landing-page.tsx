'use client';

import * as React from "react";
import { sections } from "@/data/sections";
import { Hero } from "@/components/hero";
import { StickyNav } from "@/components/sticky-nav";
import { ScrollToTop } from "@/components/scroll-to-top";
import { RutubeEmbed } from "@/components/rutube-embed";
import { useReadingProgress } from "@/hooks/use-reading-progress";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LandingPage() {
  const progress = useReadingProgress();
  const sectionIds = sections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds, 76);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [visibleSections, setVisibleSections] = React.useState<
    Record<string, boolean>
  >({});

  React.useEffect(() => {
    const hero = document.getElementById("main");
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            const id = entry.target.id;
            if (!id) return;
            if (entry.isIntersecting) {
              next[id] = true;
            }
          });
          return next;
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  const handleScrollToId = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  return (
    <div className="relative min-h-screen text-foreground">
      {/* Background image + overlay (как в оригинальном проекте) */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[url('/assets/img/bg/fon.webp')] bg-cover bg-center" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(0,0,0,0.1),rgba(0,0,0,0.55))]" />

      {/* Reading progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px] bg-foreground/10">
        <div
          className="h-full origin-left bg-emerald-500 transition-transform"
          style={{ transform: `scaleX(${progress || 0})` }}
        />
      </div>

      <StickyNav
        sections={sections}
        activeId={activeId}
        isVisible={isScrolled}
        onNavigate={handleScrollToId}
      />

      <main className="mx-auto flex max-w-[68.75rem] flex-col gap-8 pb-16">
        <Hero sections={sections} onNavigate={handleScrollToId} />

        <div className="space-y-8 px-4 pb-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className={cn(
                "scroll-mt-24 transition-all duration-500 ease-out",
                "opacity-0 translate-y-3",
                visibleSections[section.id] && "opacity-100 translate-y-0",
              )}
              aria-label={section.title}
            >
              <Card className="border border-white/10 bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[clamp(20px,2.4vw,28px)] font-semibold leading-snug">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {section.type === "text" && section.text && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.text}
                    </p>
                  )}

                  {section.type === "video-with-buttons" && section.video && (
                    <>
                      {section.id === "money-docs" ? (
                        // Для "Деньги и документы": подпись под видео слева, кнопка справа
                        <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-center">
                          <div className="space-y-2">
                            <RutubeEmbed
                              src={section.video.src}
                              title={section.video.title}
                            />
                            {section.caption && (
                              <p className="text-xs text-muted-foreground">
                                {section.caption}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-stretch gap-2">
                            {section.buttons?.map((button) => (
                              <a
                                key={button.href}
                                href={button.href}
                                target={button.external ? "_blank" : undefined}
                                rel={button.external ? "noopener" : undefined}
                                download={button.download}
                                className="inline-flex items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.18)] bg-[rgba(22,117,114,0.88)] px-4 py-2 text-sm font-semibold text-[rgba(255,255,255,0.98)] shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-[1px] hover:bg-[rgba(22,117,114,0.96)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,255,0.35)] active:translate-y-0"
                              >
                                {button.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : (
                        // Для остальных: видео слева, кнопки справа (как было)
                        <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-center">
                          <RutubeEmbed
                            src={section.video.src}
                            title={section.video.title}
                          />
                          <div className="flex flex-col items-stretch gap-2">
                            {section.caption && (
                              <p className="text-xs text-muted-foreground">
                                {section.caption}
                              </p>
                            )}
                            {section.buttons?.map((button) => (
                              <a
                                key={button.href}
                                href={button.href}
                                target={button.external ? "_blank" : undefined}
                                rel={button.external ? "noopener" : undefined}
                                download={button.download}
                                className="inline-flex items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.18)] bg-[rgba(22,117,114,0.88)] px-4 py-2 text-sm font-semibold text-[rgba(255,255,255,0.98)] shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-[1px] hover:bg-[rgba(22,117,114,0.96)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,255,0.35)] active:translate-y-0"
                              >
                                {button.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {section.type === "video-with-extra-video" &&
                    section.video && (
                      <div className="space-y-8">
                        <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-center">
                          <RutubeEmbed
                            src={section.video.src}
                            title={section.video.title}
                          />
                          <div className="flex flex-col items-stretch gap-2">
                            {section.buttons?.map((button) => (
                              <a
                                key={button.href}
                                href={button.href}
                                target={
                                  button.external ? "_blank" : undefined
                                }
                                rel={button.external ? "noopener" : undefined}
                                download={button.download}
                                className="inline-flex items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.18)] bg-[rgba(22,117,114,0.88)] px-4 py-2 text-sm font-semibold text-[rgba(255,255,255,0.98)] shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-[1px] hover:bg-[rgba(22,117,114,0.96)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,255,0.35)] active:translate-y-0"
                              >
                                {button.label}
                              </a>
                            ))}
                          </div>
                        </div>

                        {section.extraVideo && (
                          <div className="space-y-4">
                            <h3 className="text-sm font-semibold">
                              Методологический стандарт
                            </h3>
                            <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] md:items-start">
                              <RutubeEmbed
                                src={section.extraVideo.src}
                                title={section.extraVideo.title}
                              />
                              <div className="hidden md:block" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </main>

      <ScrollToTop
        isVisible={isScrolled}
        onClick={() => handleScrollToId("main")}
      />

      <footer className="border-t border-border/40 bg-background/80">
        <div className="mx-auto flex max-w-5xl justify-center px-4 py-6 text-xs text-muted-foreground">
          <span>© 2026 CBSD</span>
        </div>
      </footer>
    </div>
  );
}

