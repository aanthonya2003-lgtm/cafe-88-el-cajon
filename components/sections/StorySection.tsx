"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-fade",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax on the image — moves slower than scroll.
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="story"
      className="relative overflow-hidden bg-[#FAF6F0] py-24 text-[#2A1F1A] md:py-32"
    >
      <div className="container-wide relative">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          {/* ⚠️ PHOTO MANDATE — Story image.
              REQUIRED SUBJECT: Real Cafe 88 interior (warm lighting,
              counter, seating) OR owner Kevin in the shop OR staff
              preparing a bowl. NOT a generic cafe stock photo. NOT a
              barista pulling espresso (different cuisine type). */}
          <div className="story-fade relative md:col-span-6">
            <div
              ref={imgRef}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#2A1F1A]/5 will-change-transform"
            >
              <Image
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1800&q=90&auto=format&fit=crop"
                alt="Cafe 88 interior — warm, family-run space in El Cajon"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 md:pl-6">
            <p className="story-fade text-mono mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#6B3FA0]">
              <span className="h-px w-8 bg-[#6B3FA0]" />
              Our story
            </p>
            <h2 className="story-fade text-display mb-8 text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-tight">
              A small shop on Jamacha Road that the regulars built.
            </h2>
            <div className="story-fade space-y-5 text-base leading-relaxed text-[#2A1F1A]/80 md:text-[17px]">
              <p>
                {BUSINESS.owner} opened Cafe 88 to do a few things very
                well — organic açaí blended the way it should be, crepes
                folded warm from the pan, and real Turkish coffee brewed
                slow.
              </p>
              <p>
                The menu grew because the regulars asked for it. Lotus
                milkshakes, pistachio everything, Nutella sushi rolls,
                Belgian waffles done classic. Nothing on the board that
                hasn&apos;t earned its spot.
              </p>
              <p>
                We&apos;re still the same family-run shop on Jamacha
                Road. Health score {BUSINESS.rating.healthScore}/100,
                {" "}{BUSINESS.rating.count}+ five-star reviews, and a lot
                of regulars who&apos;ve been coming for years.
              </p>
            </div>

            <div className="story-fade mt-10 flex flex-wrap gap-3">
              <a
                href={BUSINESS.address.gmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#2A1F1A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] transition-all hover:bg-[#1A0F0A]"
              >
                Get Directions <span>→</span>
              </a>
              <a
                href={BUSINESS.phone.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#2A1F1A]/20 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2A1F1A] transition-all hover:border-[#2A1F1A]"
              >
                {BUSINESS.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
