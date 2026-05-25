"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/order", label: "Order" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1A0F0A]/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="container-wide flex items-center justify-between py-4 md:py-5">
          <Link
            href="/"
            className="text-display text-2xl tracking-tight text-[#FAF6F0] md:text-3xl"
            aria-label="Cafe 88 — home"
          >
            Cafe <span className="text-[#E8A830]">88</span>
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.18em] text-[#FAF6F0]/80 transition-colors hover:text-[#E8A830]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Primary nav CTA — routes to /order (multi-platform hub), not
              a single delivery service. Avoids abandoning Uber Eats and
              Grubhub from the primary conversion path. */}
          <Link
            href="/order"
            className="hidden rounded-full bg-[#E8A830] px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1A0F0A] transition-transform hover:scale-[1.03] md:inline-block"
          >
            Order Now
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="relative h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-[2px] w-6 bg-[#FAF6F0] transition-all ${
                  mobileOpen ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-6 bg-[#FAF6F0] transition-all ${
                  mobileOpen ? "bottom-[7px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#1A0F0A]/98 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-display text-4xl text-[#FAF6F0] transition-colors hover:text-[#E8A830]"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5 }}
              >
                <Link
                  href="/order"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-block rounded-full bg-[#E8A830] px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1A0F0A]"
                >
                  Order Now
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
