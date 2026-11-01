"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bus, Menu, X, User } from "lucide-react";
import { display } from "../lib/fonts";

const LINKS = [
  { label: "Find ride", href: "/find-ride" },
  { label: "My trips", href: "/my-trips" },
  { label: "Wallet", href: "/wallet" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Help", href: "/help" },
];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#0A2A1A]/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 bg-[#E11D2E] rounded-xl flex items-center justify-center -rotate-6">
            <Bus className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span className={`${display.className} text-2xl font-extrabold tracking-tight text-[#0A5C34]`}>
            RydRover
          </span>
        </Link>

        <nav className="hidden lg:flex gap-8 text-sm font-semibold">
          {LINKS.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`py-1 border-b-2 transition-colors ${
                  active
                    ? "text-[#0A5C34] border-[#E11D2E]"
                    : "text-[#0A2A1A]/70 border-transparent hover:text-[#0A5C34]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/drive"
            className="hidden sm:flex items-center gap-2 bg-[#E11D2E] hover:bg-[#C2121F] transition-colors text-white px-5 py-2.5 rounded-full text-sm font-bold"
          >
            <User size={16} strokeWidth={2.5} />
            Drive with us
          </Link>
          <button
            className="lg:hidden p-2 rounded-lg border border-[#0A2A1A]/15"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#0A2A1A]/10 px-5 py-4 flex flex-col gap-1">
          {[...LINKS, { label: "Drive with us", href: "/drive" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-3 rounded-xl font-semibold ${
                path === l.href ? "bg-[#EAF5EE] text-[#0A5C34]" : "text-[#0A2A1A]/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
