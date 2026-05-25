"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Card = {
  kicker: string;
  title: string;
  blurb: string;
  items: string[];
  image: string;
  // ⚠️ PHOTO MANDATE — exact subject required for owner swap.
  photoSubjectRequired: string;
};

const CARDS: Card[] = [
  {
    kicker: "01 / Bowls",
    title: "Açaí Bowls",
    blurb:
      "Organic açaí blended deep and layered with fresh fruit, granola, and house toppings.",
    items: ["Paradise", "Hawaiian", "Lit", "Glow", "Power", "Make Your Own"],
    image:
      "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=1600&q=90&auto=format&fit=crop",
    photoSubjectRequired:
      "Top-down or 3/4 angle of an açaí bowl with visible berries, sliced banana, granola, and coconut. NOT a smoothie. NOT a generic fruit bowl.",
  },
  {
    kicker: "02 / Crepes",
    title: "Crepes",
    blurb:
      "Thin, warm crepes folded over Nutella, Kinder, pistachio cream, and fresh fruit — finished by hand.",
    items: ["International Mix", "French Style", "Nutella Pistachio", "Kinder Mini Pancakes"],
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=1600&q=90&auto=format&fit=crop",
    photoSubjectRequired:
      "A finished crepe — folded or rolled — with chocolate, fruit, or pistachio visible. NOT a stack of plain pancakes. NOT a Middle Eastern bakery item.",
  },
  {
    kicker: "03 / Shakes",
    title: "Milkshakes",
    blurb:
      "Hand-spun shakes — Lotus Biscoff cookie butter and real pistachio cream.",
    items: ["Lotus", "Pistachio"],
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1600&q=90&auto=format&fit=crop",
    photoSubjectRequired:
      "A tall milkshake in a glass with whipped cream and toppings — Lotus cookie or pistachio garnish ideally. NOT a coffee drink. NOT a smoothie cup.",
  },
  {
    kicker: "04 / Sweets",
    title: "Desserts",
    blurb:
      "Nutella sushi rolls, cream puffs, chocolate-covered strawberries, Belgian waffles.",
    items: ["Nutella Sushi Rolls", "Cream Puffs", "Chocolate Strawberries", "Belgian Waffles"],
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1600&q=90&auto=format&fit=crop",
    photoSubjectRequired:
      "Plated dessert — waffle stack, cream puffs, or chocolate strawberries. NOT a generic cafe lifestyle photo. NOT a Middle Eastern pastry plate.",
  },
];

export function MenuHighlights() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".menu-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu-highlights"
      className="relative overflow-hidden bg-[#1A0F0A] py-24 md:py-32"
    >
      <span className="ghost-watermark right-[-2vw] top-[-4vw]">Menu</span>

      <div className="container-wide relative">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="text-mono mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#7FB069]">
              <span className="h-px w-8 bg-[#7FB069]" />
              The menu
            </p>
            <h2 className="text-display max-w-3xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight text-[#FAF6F0]">
              Made fresh.
              <br />
              <span className="text-[#E8A830]">Ordered fast.</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] transition-all hover:border-[#E8A830] hover:text-[#E8A830]"
          >
            Full Menu <span>→</span>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="menu-card group relative overflow-hidden rounded-2xl bg-[#120A07] ring-1 ring-[#FAF6F0]/5 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* ⚠️ PHOTO MANDATE — Owner swap target.
                    Required subject: see card.photoSubjectRequired prop above. */}
                <Image
                  src={card.image}
                  alt={`${card.title} — ${card.blurb}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120A07] via-[#120A07]/30 to-transparent" />
              </div>

              <div className="relative p-6">
                <p className="text-mono mb-3 text-[10px] uppercase tracking-[0.25em] text-[#E8A830]">
                  {card.kicker}
                </p>
                <h3 className="text-display mb-3 text-2xl tracking-tight text-[#FAF6F0]">
                  {card.title}
                </h3>
                <p className="mb-5 text-[13px] leading-relaxed text-[#FAF6F0]/65">
                  {card.blurb}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {card.items.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[#FAF6F0]/12 px-2.5 py-1 text-[11px] text-[#FAF6F0]/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
