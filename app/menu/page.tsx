import type { Metadata } from "next";
import Link from "next/link";
import { MENU, DELIVERY, BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Full Cafe 88 menu \u2014 a\u00e7a\u00ed bowls, crepes, milkshakes, Turkish coffee, smoothies, and desserts. Order pickup or delivery in El Cajon.",
};

const SECTIONS = [
  { key: "acaiBowls", label: "Açaí Bowls", kicker: "01", items: MENU.acaiBowls },
  { key: "crepes", label: "Crepes", kicker: "02", items: MENU.crepes },
  { key: "milkshakes", label: "Milkshakes", kicker: "03", items: MENU.milkshakes },
  { key: "beverages", label: "Beverages", kicker: "04", items: MENU.beverages },
  { key: "desserts", label: "Desserts", kicker: "05", items: MENU.desserts },
] as const;

export default function MenuPage() {
  return (
    <div className="bg-[#1A0F0A] pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-narrow">
        <header className="mb-16 md:mb-20">
          <p className="text-mono mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#E8A830]">
            <span className="h-px w-8 bg-[#E8A830]" />
            The full menu
          </p>
          <h1 className="text-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-[#FAF6F0]">
            Bowls, crepes, shakes,{" "}
            <span className="text-[#E8A830]">and the rest.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#FAF6F0]/70 md:text-lg">
            Names and short descriptions only. For current prices, order
            through {DELIVERY.doordash.name}, {DELIVERY.ubereats.name}, or{" "}
            {DELIVERY.grubhub.name} — or call{" "}
            <a
              href={BUSINESS.phone.href}
              className="text-[#E8A830] underline-offset-4 hover:underline"
            >
              {BUSINESS.phone.display}
            </a>
            .
          </p>
        </header>

        <div className="space-y-16 md:space-y-20">
          {SECTIONS.map((section) => (
            <section key={section.key} id={section.key}>
              <div className="mb-8 flex items-baseline justify-between border-b border-[#FAF6F0]/10 pb-4">
                <h2 className="text-display text-3xl tracking-tight text-[#FAF6F0] md:text-4xl">
                  {section.label}
                </h2>
                <p className="text-mono text-[11px] uppercase tracking-[0.22em] text-[#FAF6F0]/45">
                  {section.kicker} / {String(section.items.length).padStart(2, "0")}
                </p>
              </div>
              <ul className="divide-y divide-[#FAF6F0]/8">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="grid gap-2 py-5 md:grid-cols-12 md:gap-6 md:py-6"
                  >
                    <h3 className="text-display text-xl tracking-tight text-[#FAF6F0] md:col-span-4 md:text-2xl">
                      {item.name}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#FAF6F0]/65 md:col-span-8 md:text-[15px]">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-20 rounded-2xl border border-[#FAF6F0]/8 bg-[#120A07] p-7 md:mt-24 md:p-10">
          <p className="text-mono mb-3 text-[11px] uppercase tracking-[0.22em] text-[#E8A830]">
            Pricing
          </p>
          <p className="text-display text-2xl leading-tight tracking-tight text-[#FAF6F0] md:text-3xl">
            For current pricing, order through DoorDash, Uber Eats, or
            Grubhub — or call{" "}
            <a
              href={BUSINESS.phone.href}
              className="text-[#E8A830] underline-offset-4 hover:underline"
            >
              {BUSINESS.phone.display}
            </a>
            .
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={DELIVERY.doordash.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8A830] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A0F0A] transition-all hover:bg-[#F4B842]"
            >
              DoorDash <span>→</span>
            </a>
            <a
              href={DELIVERY.ubereats.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0]"
            >
              Uber Eats <span>→</span>
            </a>
            <a
              href={DELIVERY.grubhub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0]"
            >
              Grubhub <span>→</span>
            </a>
            <Link
              href="/catering"
              className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0]"
            >
              Catering <span>→</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
