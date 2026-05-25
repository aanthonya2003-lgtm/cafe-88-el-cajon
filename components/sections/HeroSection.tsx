"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINE_TOP = "Açaí. Crepes.";
const HEADLINE_BOTTOM = "Turkish Coffee.";

function splitChars(text: string): string[] {
  return Array.from(text);
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Character reveal — manual SplitText (avoids paid GSAP plugin).
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      gsap.fromTo(
        chars,
        { y: "110%", opacity: 0, rotateZ: 6 },
        {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.022,
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".hero-fade",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.7,
        }
      );

      // Ken Burns — slow continuous zoom on hero background.
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.0 },
          {
            scale: 1.08,
            duration: 8,
            ease: "none",
            repeat: -1,
            yoyo: true,
          }
        );
      }

      // Parallax — bg moves slower than scroll.
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-h grain relative isolate flex flex-col justify-end overflow-hidden bg-[#0E0805]"
    >
      {/* ⚠️ PHOTO MANDATE — Hero background.
          REQUIRED SUBJECT: Close-up overhead or 3/4 angle of a real Cafe 88
          açaí bowl with visible berries, granola, and toppings. OR a moody
          cafe interior with low warm lighting. NO laundromat, NO travel
          landscape, NO lifestyle / coffee-cup-on-laptop substitutes.
          Owner: swap src with HD photo from official Instagram. */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=2400&q=90&auto=format&fit=crop"
          alt="Açaí bowl close-up — Cafe 88 hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0805]/45 via-[#0E0805]/55 to-[#1A0F0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,transparent_0%,rgba(14,8,5,0.55)_100%)]" />
      </div>

      {/* Ghost watermark */}
      <span className="ghost-watermark -left-4 bottom-[-3vw] md:-left-2 md:bottom-[-5vw]">
        88
      </span>

      <div className="container-wide relative z-10 pb-20 pt-32 md:pb-28 md:pt-40">
        <p className="hero-fade text-mono mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#E8A830]">
          <span className="h-px w-8 bg-[#E8A830]" />
          El Cajon · Since the regulars started showing up
        </p>

        <h1 className="text-display text-[clamp(3.25rem,9vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.025em] text-[#FAF6F0]">
          <span className="block overflow-hidden">
            {splitChars(HEADLINE_TOP).map((c, i) => (
              <span
                key={`t-${i}`}
                className="hero-char inline-block whitespace-pre will-change-transform"
              >
                {c}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden text-[#E8A830]">
            {splitChars(HEADLINE_BOTTOM).map((c, i) => (
              <span
                key={`b-${i}`}
                className="hero-char inline-block whitespace-pre will-change-transform"
              >
                {c}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-fade mt-8 max-w-xl text-base leading-relaxed text-[#FAF6F0]/75 md:text-lg">
          A family-run café in El Cajon. Organic bowls layered to order,
          crepes folded warm, real Turkish coffee — and dessert worth the
          drive.
        </p>

        <div className="hero-fade mt-10 flex flex-wrap items-center gap-3 md:gap-4">
          {/* Primary CTA — routes to /order (multi-platform hub), not a
              single delivery service. Sends users to choose their
              preferred platform. */}
          <a
            href="/order"
            className="group inline-flex items-center gap-2 rounded-full bg-[#E8A830] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#1A0F0A] transition-all hover:bg-[#F4B842]"
          >
            Order Now
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0]"
          >
            View Menu
          </a>
        </div>

        <div className="hero-fade mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.18em] text-[#FAF6F0]/55">
          <span className="flex items-center gap-2">
            <span className="text-[#E8A830]">★</span>
            {BUSINESS.rating.stars} · {BUSINESS.rating.count}+ reviews
          </span>
          <span className="hidden h-3 w-px bg-[#FAF6F0]/20 sm:block" />
          <span>Health score {BUSINESS.rating.healthScore}/100</span>
          <span className="hidden h-3 w-px bg-[#FAF6F0]/20 sm:block" />
          <span>{BUSINESS.address.city}, CA</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-fade pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-10">
        <div className="text-mono flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#FAF6F0]/45">
          <span>Scroll</span>
          <span className="h-12 w-px bg-gradient-to-b from-[#FAF6F0]/45 to-transparent" />
        </div>
      </div>
    </section>
  );
}
