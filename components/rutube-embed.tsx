'use client';

import * as React from "react";

export type RutubeEmbedProps = {
  src: string;
  title: string;
};

export function RutubeEmbed({ src, title }: RutubeEmbedProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black/40 shadow-sm">
      <iframe
        src={src}
        title={title}
        allow="clipboard-write; autoplay"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}

