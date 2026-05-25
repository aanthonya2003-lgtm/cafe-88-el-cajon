"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
};

// Stat #4: 3+ Delivery Platforms = DoorDash + Uber Eats + Grubhub.
// Verified live in lib/constants DELIVERY block. Reflects the actual
// number of channels the site connects to, not a vague "signature
// creations" count that wasn't auditable.
const STATS: Stat[] = [
  { value: BUSINESS.rating.stars, decimals: 1, label: "Average rating" },
  { value: BUSINESS.rating.count, suffix: "+", label: "Verified reviews" },
  { value: BUSINESS.rating.healthScore, suffix: "/100", label: "Health score" },
  { value: 3, suffix: "+", label: "Delivery Platforms" },
];

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray<HTMLElement>(".stat-number");
      numbers.forEach((el) => {
        const target = Number(el.dataset.target ?? "0");
        const decimals = Number(el.dataset.decimals ?? "0");
        const counter = { v: 0 };

        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = counter.v.toFixed(decimals);
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 15%",
            // Bidirectional: counts up on enter, resets on leave-back.
            // NEVER once: true.
            toggleActions: "restart none none reset",
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#1A0F0A] py-20 md:py-28"
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative border-t border-[#FAF6F0]/10 pt-5 md:pt-7"
            >
              <p className="text-mono mb-3 text-[10px] uppercase tracking-[0.25em] text-[#E8A830]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="text-display flex items-baseline text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight text-[#FAF6F0]">
                <span
                  className="stat-number tabular-nums"
                  data-target={stat.value}
                  data-decimals={stat.decimals ?? 0}
                >
                  0
                </span>
                {stat.suffix && (
                  <span className="ml-1 text-[#E8A830]">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.18em] text-[#FAF6F0]/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
