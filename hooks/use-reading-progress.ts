'use client';

import * as React from "react";

export function useReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const next = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setProgress(next);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

