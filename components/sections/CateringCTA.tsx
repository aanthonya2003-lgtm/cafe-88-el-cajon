"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUSINESS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CateringCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".catering-img",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".catering-fade",
        { y: 30, opacity: 0 },
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
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#1A0F0A] py-24 md:py-32"
    >
      <div className="container-wide">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          {/* ⚠️ PHOTO MANDATE — Catering image.
              REQUIRED SUBJECT: Catered spread of Cafe 88 items — açaí bowl
              bar, crepe station, or dessert platter set up for an event.
              NOT a generic banquet photo. NOT a wedding cake. NOT food
              from a different cuisine. */}
          <div className="catering-img relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-5">
            <Image
              src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1800&q=90&auto=format&fit=crop"
              alt="Cafe 88 catering spread for an event"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="md:col-span-7 md:pl-6">
            <p className="catering-fade text-mono mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#7FB069]">
              <span className="h-px w-8 bg-[#7FB069]" />
              Catering
            </p>
            <h2 className="catering-fade text-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight text-[#FAF6F0]">
              Bring Cafe 88 to your{" "}
              <span className="text-[#E8A830]">next event.</span>
            </h2>
            <p className="catering-fade mt-6 max-w-xl text-base leading-relaxed text-[#FAF6F0]/70">
              Açaí bowl bars, crepe stations, dessert platters, and
              beverage service for offices, weddings, birthdays, and
              corporate events {BUSINESS.catering.serviceArea.toLowerCase()}.
            </p>
            <ul className="catering-fade mt-8 grid grid-cols-2 gap-3 text-[13px] text-[#FAF6F0]/75 md:max-w-md">
              <li className="flex items-center gap-2">
                <span className="text-[#E8A830]">→</span> Açaí bowl bar
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E8A830]">→</span> Crepe station
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E8A830]">→</span> Dessert platters
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#E8A830]">→</span> Beverage service
              </li>
            </ul>
            <div className="catering-fade mt-10 flex flex-wrap gap-3">
              <Link
                href="/catering"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8A830] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#1A0F0A] transition-all hover:bg-[#F4B842]"
              >
                Request Catering <span>→</span>
              </Link>
              <a
                href={BUSINESS.phone.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0]"
              >
                Or call {BUSINESS.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
