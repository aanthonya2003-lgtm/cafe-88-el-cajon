"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
      frameRef.current = null;
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="text-mono fixed right-4 top-4 z-[60] flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#FAF6F0]/60 md:right-6 md:top-6"
    >
      <span className="hidden sm:inline">Scroll</span>
      <span className="tabular-nums text-[#FAF6F0]">
        {String(Math.round(progress)).padStart(3, "0")}%
      </span>
    </div>
  );
}
