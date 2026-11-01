import { Bus, Clock, Home, Wallet, User, Search } from "lucide-react";
import { display } from "../lib/fonts";

export default function PhoneMock() {
  return (
    <div className="relative w-[250px] h-[500px] rounded-[2.6rem] border-[8px] border-[#0A2A1A] bg-white shadow-2xl overflow-hidden mx-auto">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0A2A1A] rounded-full" />
      <div className="pt-12 px-4">
        <p className="text-[11px] text-[#0A2A1A]/60">Hello, Chinedu</p>
        <p className={`${display.className} text-lg font-bold`}>Where to today?</p>
        <div className="mt-3 flex items-center gap-2 bg-[#F4F6F3] rounded-xl px-3 py-2 text-xs text-[#0A2A1A]/60">
          <Search size={14} /> Main Library
        </div>

        <div className="mt-4 bg-[#0A5C34] rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between text-[11px] text-white/80">
            <span className="flex items-center gap-1"><Clock size={12} /> Now</span>
            <span className="bg-[#E11D2E] rounded-full px-2 py-0.5 font-bold text-white">4 seats</span>
          </div>
          <p className={`${display.className} mt-3 text-3xl font-extrabold`}>{"\u20A6"}450</p>
          <p className="text-[11px] text-white/80">per person, equal split</p>
          <p className="mt-3 text-xs font-semibold">Main Gate to Hostel Zone</p>
        </div>

        {["Aisha, in 7 min", "Tunde, in 15 min"].map((r) => (
          <div key={r} className="mt-3 flex items-center gap-3 border border-[#0A2A1A]/10 rounded-xl p-3">
            <span className="w-8 h-8 rounded-lg bg-[#FDECEE] flex items-center justify-center"><Bus size={16} className="text-[#E11D2E]" /></span>
            <span className="text-xs font-semibold">{r}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 inset-x-0 h-14 bg-white border-t border-[#0A2A1A]/10 flex items-center justify-around text-[#0A2A1A]/50">
        <Home size={18} className="text-[#0A5C34]" /><Bus size={18} /><Wallet size={18} /><User size={18} />
      </div>
    </div>
  );
}
