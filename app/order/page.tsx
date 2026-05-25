import type { Metadata } from "next";
import Link from "next/link";
import { DELIVERY, BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Order",
  description:
    "Order Cafe 88 in El Cajon \u2014 pickup or delivery through DoorDash, Uber Eats, or Grubhub. Or call (619) 312-1077.",
};

const PLATFORMS = [
  {
    key: "doordash",
    name: DELIVERY.doordash.name,
    url: DELIVERY.doordash.url,
    tagline: DELIVERY.doordash.tagline,
    accent: "#EB1700",
    blurb:
      "Widest delivery radius. Schedule ahead or order on-demand. DashPass eligible.",
  },
  {
    key: "ubereats",
    name: DELIVERY.ubereats.name,
    url: DELIVERY.ubereats.url,
    tagline: DELIVERY.ubereats.tagline,
    accent: "#06C167",
    blurb:
      "Uber One members get $0 delivery on eligible orders. Group order supported.",
  },
  {
    key: "grubhub",
    name: DELIVERY.grubhub.name,
    url: DELIVERY.grubhub.url,
    tagline: DELIVERY.grubhub.tagline,
    accent: "#F63440",
    blurb:
      "Pickup or delivery. Grubhub+ members get unlimited free delivery on eligible orders.",
  },
] as const;

export default function OrderPage() {
  return (
    <div className="bg-[#0E0805] pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-narrow">
        <header className="mb-14 md:mb-20">
          <p className="text-mono mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#E8A830]">
            <span className="h-px w-8 bg-[#E8A830]" />
            Order online
          </p>
          <h1 className="text-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-[#FAF6F0]">
            Three ways{" "}
            <span className="text-[#E8A830]">to order.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#FAF6F0]/70 md:text-lg">
            Same menu, same kitchen, same family — every platform sends
            the order straight to {BUSINESS.address.city}. Pick the one
            you already use.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {PLATFORMS.map((p) => (
            <a
              key={p.key}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#FAF6F0]/8 bg-[#1A0F0A] p-7 transition-all hover:-translate-y-1 hover:border-[#E8A830]/40 md:p-9"
            >
              <span
                className="absolute inset-x-0 top-0 h-px"
                style={{ backgroundColor: p.accent, opacity: 0.6 }}
                aria-hidden="true"
              />
              <div>
                <p
                  className="text-mono mb-4 text-[10px] uppercase tracking-[0.25em]"
                  style={{ color: p.accent }}
                >
                  {p.tagline}
                </p>
                <h2 className="text-display text-[2.25rem] leading-none tracking-tight text-[#FAF6F0]">
                  {p.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#FAF6F0]/60">
                  {p.blurb}
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

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#FAF6F0]/8 bg-[#120A07] p-7 md:p-9">
            <p className="text-mono text-[11px] uppercase tracking-[0.22em] text-[#E8A830]">
              Or call
            </p>
            <p className="text-display mt-2 text-3xl tracking-tight text-[#FAF6F0] md:text-4xl">
              {BUSINESS.phone.display}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#FAF6F0]/60">
              Faster for special requests, allergies, or anything not on
              the standard menu. Hours: {BUSINESS.hours.placeholder}.
            </p>
            <a
              href={BUSINESS.phone.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E8A830] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1A0F0A] transition-all hover:bg-[#F4B842]"
            >
              Call the shop <span>→</span>
            </a>
          </div>

          <div className="rounded-2xl border border-[#FAF6F0]/8 bg-[#120A07] p-7 md:p-9">
            <p className="text-mono text-[11px] uppercase tracking-[0.22em] text-[#7FB069]">
              Visit
            </p>
            <p className="text-display mt-2 text-2xl leading-tight tracking-tight text-[#FAF6F0] md:text-3xl">
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
              {BUSINESS.address.zip}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#FAF6F0]/60">
              Pickup is faster — ready in 10–15 minutes for most orders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={BUSINESS.address.gmaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0]"
              >
                Directions <span>→</span>
              </a>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-[#FAF6F0]/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0]"
              >
                See menu <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
