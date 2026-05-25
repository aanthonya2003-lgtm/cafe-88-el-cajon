import type { Metadata } from "next";
import { BUSINESS, SOCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Cafe 88 catering — açaí bowl bars, crepe stations, and dessert platters throughout San Diego County. Call (619) 312-1077 or DM @wecafe88 to book.",
};

const SERVICES = [
  "Açaí bowl bar",
  "Crepe station",
  "Dessert platters",
  "Beverage service",
];

export default function CateringPage() {
  return (
    <div className="bg-[#1A0F0A] pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="container-narrow grid gap-12 md:grid-cols-12 md:gap-16">
        <aside className="md:col-span-5">
          <p className="text-mono mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#7FB069]">
            <span className="h-px w-8 bg-[#7FB069]" />
            Catering
          </p>
          <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-tight text-[#FAF6F0]">
            Let&apos;s feed{" "}
            <span className="text-[#E8A830]">your event.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#FAF6F0]/70 md:text-lg">
            Açaí bowl bars, crepe stations, dessert spreads, and beverage
            service for offices, weddings, birthdays, and corporate events
            throughout San Diego County.
          </p>

          <dl className="mt-10 space-y-5">
            <div>
              <dt className="text-mono text-[10px] uppercase tracking-[0.25em] text-[#FAF6F0]/45">
                Service area
              </dt>
              <dd className="mt-1 text-[#FAF6F0]">
                {BUSINESS.catering.serviceArea}
              </dd>
            </div>
            <div>
              <dt className="text-mono text-[10px] uppercase tracking-[0.25em] text-[#FAF6F0]/45">
                Lead time
              </dt>
              <dd className="mt-1 text-[#FAF6F0]">
                {BUSINESS.catering.leadTime}
              </dd>
            </div>
          </dl>
        </aside>

        {/* ============================================================
            🔴 IRON LAW — No catering form ships until BOTH confirmed:
              1. Kevin's preferred catering recipient email
              2. RESEND_API_KEY set in Vercel environment variables

            Until then this page is phone + Instagram DM only.
            The /api/catering route stays staged with Resend wiring
            commented out — flip it on once the two prerequisites land.
            ============================================================ */}
        <section className="md:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-[#FAF6F0]/8 bg-[#120A07] p-8 md:p-12">
            <p className="text-mono mb-5 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#E8A830]">
              <span className="h-px w-8 bg-[#E8A830]" />
              Book catering
            </p>
            <h2 className="text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight text-[#FAF6F0]">
              Ready to bring Cafe 88 to your event?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#FAF6F0]/70 md:text-[17px]">
              Call or DM us directly — we&apos;ll put together a custom
              quote.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-3 text-[13px] text-[#FAF6F0]/80">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2">
                  <span className="text-[#E8A830]">→</span>
                  {service}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <a
                href={BUSINESS.phone.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8A830] px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#1A0F0A] transition-all hover:bg-[#F4B842]"
              >
                {BUSINESS.phone.display} — call to book catering
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FAF6F0]/25 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#FAF6F0] transition-all hover:border-[#FAF6F0] hover:text-[#E8A830]"
              >
                DM {SOCIAL.instagram.handle} on Instagram
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            <p className="mt-8 text-[12px] leading-relaxed text-[#FAF6F0]/45">
              Online booking form coming soon. Until then, call or DM is
              the fastest way to lock in your date.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
