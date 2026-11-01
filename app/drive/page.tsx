"use client";

import { useState } from "react";
import { BadgeCheck, TrendingUp, Banknote, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { display } from "../lib/fonts";

const PERKS = [
  { icon: TrendingUp, title: "Fill every seat", text: "Riders find your cab from the park queue, so you spend less time waiting." },
  { icon: Banknote, title: "Fast payouts", text: "Earnings reach your bank account within one working day." },
  { icon: BadgeCheck, title: "Verified badge", text: "Riders trust drivers who are checked and approved." },
];
const FIELDS = [
  ["Full name", "name", "Chinedu Okeke"],
  ["Phone number", "phone", "0800 000 0000"],
  ["Car model", "car", "Toyota Corolla"],
  ["Plate number", "plate", "ABC 123 XY"],
];

export default function DrivePage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader tag="Drive with us" title="Turn your empty seats into income" sub="Post a ride, let students fill the cab and get paid your full fare." />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-5">
          {PERKS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="flex gap-5 border border-[#0A2A1A]/10 rounded-3xl p-6">
              <span className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${i === 1 ? "bg-[#FDECEE] text-[#E11D2E]" : "bg-[#EAF5EE] text-[#0A5C34]"}`}><Icon size={22} /></span>
              <div><h3 className="font-bold text-lg">{title}</h3><p className="mt-1 text-[#0A2A1A]/70">{text}</p></div>
            </div>
          ))}
        </div>

        <div className="border border-[#0A2A1A]/15 rounded-3xl p-8 shadow-[0_20px_40px_-20px_rgb(10_42_26/0.25)]">
          {sent ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto text-[#0A5C34]" size={48} />
              <h2 className={`${display.className} mt-4 text-2xl font-bold`}>Application received</h2>
              <p className="mt-2 text-[#0A2A1A]/70">We will review your details and contact you within 2 working days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <h2 className={`${display.className} text-2xl font-bold`}>Apply to drive</h2>
              {FIELDS.map(([label, id, ph]) => (
                <div key={id}>
                  <label htmlFor={id} className="text-sm font-semibold text-[#0A5C34]">{label}</label>
                  <input id={id} required placeholder={ph} className="mt-1 w-full bg-[#F4F6F3] rounded-2xl px-4 py-3.5 outline-none focus:ring-2 ring-[#E11D2E]" />
                </div>
              ))}
              <button type="submit" className="w-full bg-[#E11D2E] hover:bg-[#C2121F] transition-colors text-white font-bold py-4 rounded-2xl text-lg">Submit application</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
