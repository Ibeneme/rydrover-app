"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { TRIPS, naira } from "../lib/data";

const TABS = ["upcoming", "completed", "cancelled"] as const;
const BADGE = {
  upcoming: "bg-[#EAF5EE] text-[#0A5C34]",
  completed: "bg-[#F4F6F3] text-[#0A2A1A]",
  cancelled: "bg-[#FDECEE] text-[#E11D2E]",
};

export default function MyTripsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("upcoming");
  const list = TRIPS.filter((t) => t.status === tab);

  return (
    <>
      <PageHeader tag="My trips" title="Every ride, in one place" sub="Check upcoming cabs, review past trips and see what you paid." />
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-14">
        <div role="tablist" className="inline-flex bg-[#F4F6F3] rounded-full p-1">
          {TABS.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold capitalize transition-colors ${tab === t ? "bg-[#0A5C34] text-white" : "text-[#0A2A1A]/70"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {list.length === 0 && <p className="border-2 border-dashed border-[#0A2A1A]/20 rounded-3xl p-10 text-center text-[#0A2A1A]/70">No {tab} trips yet.</p>}
          {list.map((t) => (
            <div key={t.id} className="border border-[#0A2A1A]/10 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-sm text-[#0A2A1A]/60"><Clock size={14} /> {t.date}</p>
                <p className="mt-2 flex items-center gap-2 font-bold text-lg"><MapPin size={18} className="text-[#0A5C34]" /> {t.from} to {t.to}</p>
                <p className="text-sm text-[#0A2A1A]/60 mt-1">Driver: {t.driver}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-[#E11D2E]">{naira(t.price)}</p>
                <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${BADGE[t.status]}`}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
