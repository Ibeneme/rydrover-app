import Link from "next/link";
import { Check } from "lucide-react";
import { PLANS, naira } from "../lib/data";
import { display } from "../lib/fonts";
import SectionHeading from "./SectionHeading";

export default function Pricing() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionHeading tag="Affordable pricing" title={<>Select a plan<br />for how you ride</>} />
      <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((p) => (
          <div key={p.name} className={`rounded-3xl p-8 flex flex-col text-white ${p.featured ? "bg-[#0A5C34] ring-4 ring-[#E11D2E]" : "bg-[#0A2A1A]"}`}>
            <p className="text-sm font-semibold text-white/70">{p.note}</p>
            <h3 className={`${display.className} mt-1 text-2xl font-bold`}>{p.name}</h3>
            <p className="mt-4"><span className={`${display.className} text-4xl font-extrabold`}>{p.price === 0 ? "Free" : naira(p.price)}</span>{p.price > 0 && <span className="text-white/70"> / month</span>}</p>
            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-white/90"><Check size={18} className="text-[#FF5A66] shrink-0" strokeWidth={3} />{f}</li>
              ))}
            </ul>
            <Link href={p.href} className={`mt-8 text-center py-3.5 rounded-full font-bold transition-colors ${p.featured ? "bg-[#E11D2E] hover:bg-[#C2121F]" : "bg-white text-[#0A2A1A] hover:bg-[#EAF5EE]"}`}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
