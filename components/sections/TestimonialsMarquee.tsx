"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration: 45,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      aria-label="Customer reviews"
      className="relative overflow-hidden bg-[#120A07] py-20 md:py-24"
    >
      <div className="container-wide mb-10 md:mb-14">
        <p className="text-mono mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#7FB069]">
          <span className="h-px w-8 bg-[#7FB069]" />
          The regulars say
        </p>
        <h2 className="text-display max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight text-[#FAF6F0]">
          Four-point-six stars across two hundred reviews —{" "}
          <span className="text-[#E8A830]">and counting.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="marquee-track items-stretch gap-5 md:gap-7"
      >
        {doubled.map((t, i) => (
          <article
            key={`${t.author}-${i}`}
            className="flex w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-[#FAF6F0]/8 bg-[#1A0F0A] p-7 md:w-[400px] md:p-8"
          >
            <div>
              <div
                className="mb-4 flex gap-0.5 text-[#E8A830]"
                aria-label="5 out of 5 stars"
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="text-display text-lg leading-snug tracking-tight text-[#FAF6F0] md:text-xl">
                “{t.quote}”
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
              <span className="text-[#FAF6F0]/85">{t.author}</span>
              <span className="text-[#FAF6F0]/45">{t.source}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
