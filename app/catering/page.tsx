"use client";

import { useState } from "react";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

export default function CateringPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      eventDate: String(data.get("eventDate") ?? ""),
      guestCount: String(data.get("guestCount") ?? ""),
      eventType: String(data.get("eventType") ?? ""),
      details: String(data.get("details") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; message?: string; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setMessage(
          json.error ??
            `Something went wrong. Please call ${BUSINESS.phone.display}.`
        );
        return;
      }
      setStatus("success");
      setMessage(
        json.message ??
          "Thanks \u2014 we got your inquiry. We\u2019ll be in touch."
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        `Could not send right now. Please call ${BUSINESS.phone.display}.`
      );
    }
  }

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
            {" "}{BUSINESS.catering.serviceArea.toLowerCase()}.
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
            <div>
              <dt className="text-mono text-[10px] uppercase tracking-[0.25em] text-[#FAF6F0]/45">
                Or call directly
              </dt>
              <dd className="mt-1">
                <a
                  href={BUSINESS.phone.href}
                  className="text-display text-2xl text-[#E8A830] underline-offset-4 hover:underline"
                >
                  {BUSINESS.phone.display}
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <section className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#FAF6F0]/8 bg-[#120A07] p-6 md:p-10"
            noValidate
          >
            {/* Honeypot — hidden from real users. */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
            >
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name" name="name" type="text" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
              <Field label="Event date" name="eventDate" type="date" required />
              <Field label="Guest count" name="guestCount" type="number" required min="1" />
              <Field label="Event type" name="eventType" type="text" placeholder="Office, wedding, birthday\u2026" />
            </div>

            <div className="mt-5">
              <label className="block">
                <span className="text-mono mb-2 block text-[10px] uppercase tracking-[0.22em] text-[#FAF6F0]/55">
                  Tell us about it
                </span>
                <textarea
                  name="details"
                  rows={5}
                  placeholder="Menu preferences, dietary needs, setup details\u2026"
                  className="w-full resize-none rounded-lg border border-[#FAF6F0]/12 bg-[#1A0F0A] px-4 py-3 text-[15px] text-[#FAF6F0] placeholder:text-[#FAF6F0]/30 focus:border-[#E8A830] focus:outline-none"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E8A830] px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1A0F0A] transition-all hover:bg-[#F4B842] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#1A0F0A]/30 border-t-[#1A0F0A]" />
                  Sending…
                </>
              ) : (
                <>
                  Send catering request <span>→</span>
                </>
              )}
            </button>

            {status === "success" && (
              <div
                role="status"
                className="mt-6 rounded-lg border border-[#7FB069]/30 bg-[#7FB069]/10 p-4 text-sm text-[#7FB069]"
              >
                {message}
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
              >
                {message}{" "}
                <Link
                  href={BUSINESS.phone.href}
                  className="underline underline-offset-2"
                >
                  Call {BUSINESS.phone.display}
                </Link>
                .
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
  autoComplete,
  min,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="text-mono mb-2 block text-[10px] uppercase tracking-[0.22em] text-[#FAF6F0]/55">
        {label}
        {required && <span className="ml-1 text-[#E8A830]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        className="w-full rounded-lg border border-[#FAF6F0]/12 bg-[#1A0F0A] px-4 py-3 text-[15px] text-[#FAF6F0] placeholder:text-[#FAF6F0]/30 focus:border-[#E8A830] focus:outline-none"
      />
    </label>
  );
}
