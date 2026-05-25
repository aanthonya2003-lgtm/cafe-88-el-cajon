"use client";

import Link from "next/link";
import { BUSINESS, SOCIAL, DELIVERY } from "@/lib/constants";

function InstagramIcon() {
  // Canonical IG mark — rounded square camera outline with center lens dot.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  // Canonical FB mark — lowercase f inside circle.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#120A07] text-[#FAF6F0]">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-4 md:gap-8 md:py-20">
        <div className="md:col-span-2">
          <Link
            href="/"
            className="text-display text-3xl tracking-tight"
            aria-label="Cafe 88 \u2014 home"
          >
            Cafe <span className="text-[#E8A830]">88</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#FAF6F0]/65">
            {BUSINESS.shortDescription}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${SOCIAL.instagram.handle}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF6F0]/15 text-[#FAF6F0]/80 transition-all hover:border-[#E8A830] hover:text-[#E8A830]"
            >
              <InstagramIcon />
            </a>
            <a
              href={SOCIAL.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook /wecafe88"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FAF6F0]/15 text-[#FAF6F0]/80 transition-all hover:border-[#E8A830] hover:text-[#E8A830]"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-mono text-[11px] uppercase tracking-[0.22em] text-[#FAF6F0]/45">
            Visit
          </h4>
          <address className="mt-4 not-italic text-sm leading-relaxed text-[#FAF6F0]/80">
            <a
              href={BUSINESS.address.gmaps}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#E8A830]"
            >
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
              {BUSINESS.address.zip}
            </a>
            <div className="mt-3">
              <a
                href={BUSINESS.phone.href}
                className="text-[#FAF6F0] transition-colors hover:text-[#E8A830]"
              >
                {BUSINESS.phone.display}
              </a>
            </div>
            <p className="mt-3 text-[12px] text-[#FAF6F0]/55">
              Hours: {BUSINESS.hours.placeholder}
            </p>
          </address>
        </div>

        <div>
          <h4 className="text-mono text-[11px] uppercase tracking-[0.22em] text-[#FAF6F0]/45">
            Order
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={DELIVERY.doordash.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF6F0]/80 transition-colors hover:text-[#E8A830]"
              >
                DoorDash
              </a>
            </li>
            <li>
              <a
                href={DELIVERY.ubereats.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF6F0]/80 transition-colors hover:text-[#E8A830]"
              >
                Uber Eats
              </a>
            </li>
            <li>
              <a
                href={DELIVERY.grubhub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF6F0]/80 transition-colors hover:text-[#E8A830]"
              >
                Grubhub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#FAF6F0]/8">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-6 text-[12px] text-[#FAF6F0]/45 md:flex-row md:items-center">
          <p>
            \u00a9 {new Date().getFullYear()} Cafe 88. All rights reserved.
          </p>
          <p className="text-mono uppercase tracking-[0.18em]">
            El Cajon \u00b7 California
          </p>
        </div>
      </div>
    </footer>
  );
}
