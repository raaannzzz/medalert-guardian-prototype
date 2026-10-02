"use client";

import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

// Marketing links point at the real MedAlert site; Guardian Login is the in-app route.
const PRODUCT_URL = "https://medalert.io/products/medalert-plus-medical-alert-watch-4g-with-gps";
const LINKS = [
  { label: "Products", href: PRODUCT_URL },
  { label: "How It Works", href: "https://medalert.io" },
  { label: "For Families", href: "https://medalert.io" },
  { label: "Support", href: "tel:+61272275833" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative">
      <div className="flex h-[72px] items-center gap-14 px-5 min-[900px]:h-24 min-[900px]:px-20">
        <Logo className="h-9 min-[900px]:h-11" />
        <nav aria-label="Main" className="hidden grow items-center gap-10 min-[900px]:flex">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-[17px] font-semibold text-ink hover:text-blue">
              {l.label}
            </a>
          ))}
        </nav>
        <Link href="/login" className="btn-tonal ml-auto hidden h-12 px-[22px] text-[17px] min-[900px]:inline-flex">
          <User size={22} strokeWidth={1.8} aria-hidden="true" />
          Guardian Login
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="btn-tonal ml-auto size-12 min-[900px]:hidden"
        >
          {open ? <X size={24} strokeWidth={1.8} aria-hidden="true" /> : <Menu size={24} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-3 top-[68px] z-10 flex flex-col gap-1 rounded-[20px] bg-white p-3 shadow-[0_12px_32px_rgba(14,27,51,0.14),0_0_0_1px_#d8e0ec] min-[900px]:hidden"
        >
          <Link href="/login" className="btn-tonal h-14 text-[18px]">
            <User size={22} strokeWidth={1.8} aria-hidden="true" />
            Guardian Login
          </Link>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="flex h-14 items-center rounded-xl px-4 text-[18px] font-semibold hover:bg-blue-50">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
