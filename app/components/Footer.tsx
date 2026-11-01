import Link from "next/link";
import { Bus, Mail, Phone, MapPin } from "lucide-react";
import { display } from "../lib/fonts";

const COLS = [
  { title: "Product", links: [["Find ride", "/find-ride"], ["My trips", "/my-trips"], ["Wallet", "/wallet"], ["Pricing", "/pricing"]] },
  { title: "Company", links: [["About us", "/about"], ["Blog", "/blog"], ["Drive with us", "/drive"], ["Help centre", "/help"]] },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#0A2A1A]/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 bg-[#E11D2E] rounded-xl flex items-center justify-center -rotate-6">
              <Bus className="w-5 h-5 text-white" strokeWidth={2.5} />
            </span>
            <span className={`${display.className} text-2xl font-extrabold text-[#0A5C34]`}>RydRover</span>
          </div>
          <p className="mt-4 text-[#0A2A1A]/70 max-w-xs leading-relaxed">
            Equal-split rides for Nigerian campuses. Join the queue, share the fare, get to class.
          </p>
        </div>

        {COLS.map((c) => (
          <div key={c.title}>
            <h4 className="font-bold text-[#0A2A1A]">{c.title}</h4>
            <ul className="mt-4 space-y-3 text-[#0A2A1A]/70">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#E11D2E] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-bold text-[#0A2A1A]">Contact</h4>
          <ul className="mt-4 space-y-3 text-[#0A2A1A]/70">
            <li className="flex items-center gap-3"><Mail size={16} className="text-[#0A5C34]" /> hello@rydrover.ng</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-[#0A5C34]" /> +234 800 000 0000</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-[#0A5C34]" /> Port Harcourt, Nigeria</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#0A2A1A]/10">
        <p className="max-w-7xl mx-auto px-5 md:px-8 py-5 text-sm text-[#0A2A1A]/60">
          2026 RydRover. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
