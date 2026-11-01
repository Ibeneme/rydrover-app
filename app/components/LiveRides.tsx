"use client";

import { useState } from "react";
import { MapPin, Search, RefreshCw, ArrowDown } from "lucide-react";
import { RIDES } from "../lib/data";
import { display } from "../lib/fonts";
import RideCard from "./RideCard";

export default function LiveRides({ showSearch = true }: { showSearch?: boolean }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rides, setRides] = useState(RIDES);

  const search = () =>
    setRides(RIDES.map((r) => ({ ...r, from: from.trim() || r.from, to: to.trim() || r.to })));

  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
      {showSearch && (
        <div className="max-w-3xl mx-auto bg-white border border-[#0A2A1A]/15 rounded-3xl p-6 shadow-[0_20px_40px_-20px_rgb(10_42_26/0.25)]">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div>
              <label htmlFor="from" className="text-sm font-semibold text-[#0A5C34]">Pickup point</label>
              <div className="mt-1 flex items-center gap-3 bg-[#F4F6F3] rounded-2xl px-4 py-3.5 focus-within:ring-2 ring-[#E11D2E]">
                <MapPin size={20} className="text-[#0A5C34]" />
                <input id="from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Main Gate, UNILAG" className="bg-transparent outline-none flex-1" />
              </div>
            </div>
            <ArrowDown className="hidden md:block mb-4 -rotate-90 text-[#E11D2E]" size={20} strokeWidth={3} />
            <div>
              <label htmlFor="to" className="text-sm font-semibold text-[#0A5C34]">Destination</label>
              <div className="mt-1 flex items-center gap-3 bg-[#F4F6F3] rounded-2xl px-4 py-3.5 focus-within:ring-2 ring-[#E11D2E]">
                <MapPin size={20} className="text-[#E11D2E]" />
                <input id="to" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Main Library" className="bg-transparent outline-none flex-1" />
              </div>
            </div>
          </div>
          <button onClick={search} className="mt-5 w-full bg-[#E11D2E] hover:bg-[#C2121F] transition-colors text-white font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-3">
            <Search size={22} strokeWidth={2.5} /> Find rides
          </button>
        </div>
      )}

      <div className={`flex justify-between items-end gap-4 mb-8 ${showSearch ? "mt-16" : ""}`}>
        <div>
          <h2 className={`${display.className} text-3xl md:text-4xl font-extrabold tracking-tight`}>Live rides nearby</h2>
          <p className="mt-1 text-[#0A5C34] font-medium">12 people waiting in the park queue</p>
        </div>
        <button onClick={search} className="text-[#E11D2E] font-bold flex items-center gap-2 hover:text-[#C2121F] transition-colors">
          <RefreshCw size={16} strokeWidth={2.5} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides.map((r) => <RideCard key={r.id} ride={r} />)}
      </div>
    </section>
  );
}
