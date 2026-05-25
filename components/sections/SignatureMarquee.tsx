"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ITEMS = [
  "Açaí Bowls",
  "Hand-Folded Crepes",
  "Turkish Coffee",
  "Lotus Milkshakes",
  "Nutella Sushi Rolls",
  "Belgian Waffles",
  "Pistachio Cream",
  "Cream Puffs",
];

export function SignatureMarquee() {
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
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  // Render the loop twice so the wrap-around is seamless at xPercent -50.
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Cafe 88 signature items"
      className="relative overflow-hidden border-y border-[#FAF6F0]/8 bg-[#120A07] py-8 md:py-10"
    >
      <div ref={trackRef} className="marquee-track items-center gap-12 md:gap-16">
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-12 md:gap-16"
          >
            <span className="text-display text-3xl tracking-tight text-[#FAF6F0] md:text-5xl">
              {item}
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#E8A830]" />
          </div>
        ))}
      </div>
    </section>
  );
}
