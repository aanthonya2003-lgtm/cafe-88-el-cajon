"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DELIVERY, BUSINESS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PLATFORMS = [
  {
    key: "doordash",
    name: DELIVERY.doordash.name,
    url: DELIVERY.doordash.url,
    tagline: DELIVERY.doordash.tagline,
    accent: "#EB1700",
  },
  {
    key: "ubereats",
    name: DELIVERY.ubereats.name,
    url: DELIVERY.ubereats.url,
    tagline: DELIVERY.ubereats.tagline,
    accent: "#06C167",
  },
  {
    key: "grubhub",
    name: DELIVERY.grubhub.name,
    url: DELIVERY.grubhub.url,
    tagline: DELIVERY.grubhub.tagline,
    accent: "#F63440",
  },
] as const;

export function OrderSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".order-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="order"
      className="relative overflow-hidden bg-[#0E0805] py-24 md:py-32"
    >
      <span className="ghost-watermark left-[-2vw] top-[8vw]">Order</span>

      <div className="container-wide relative">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="order-fade text-mono mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#E8A830]">
            <span className="h-px w-8 bg-[#E8A830]" />
            Order online
          </p>
          <h2 className="order-fade text-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-[#FAF6F0]">
            Three ways to get it{" "}
            <span className="text-[#E8A830]">to your door.</span>
          </h2>
          <p className="order-fade mt-6 max-w-xl text-base leading-relaxed text-[#FAF6F0]/70">
            Pickup or delivery — same menu, same kitchen, same family.
            Pick the platform you already have.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PLATFORMS.map((p) => (
            <a
              key={p.key}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="order-fade group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#FAF6F0]/8 bg-[#1A0F0A] p-7 transition-all hover:-translate-y-1 hover:border-[#E8A830]/40 md:p-8"
            >
              <span
                className="absolute inset-x-0 top-0 h-px opacity-50"
                style={{ backgroundColor: p.accent }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="text-mono mb-4 text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: p.accent }}
                >
                  Available now
                </p>
                <h3 className="text-display text-3xl tracking-tight text-[#FAF6F0]">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#FAF6F0]/60">
                  {p.tagline}
                </p>
              </div>
              <div className="mt-10 flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0]">
                  Open {p.name}
                </span>
                <span
                  className="text-2xl transition-transform group-hover:translate-x-1"
                  style={{ color: p.accent }}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="order-fade mt-12 flex flex-col items-start gap-3 rounded-2xl border border-[#FAF6F0]/8 bg-[#120A07] p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <p className="text-mono text-[11px] uppercase tracking-[0.22em] text-[#E8A830]">
              Or call
            </p>
            <p className="text-display mt-1 text-2xl tracking-tight text-[#FAF6F0] md:text-3xl">
              {BUSINESS.phone.display}
            </p>
          </div>
          <a
            href={BUSINESS.phone.href}
            className="inline-flex items-center gap-2 rounded-full bg-[#E8A830] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A0F0A] transition-all hover:bg-[#F4B842]"
          >
            Call the shop <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
