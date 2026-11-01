import { Clock, ArrowRight } from "lucide-react";
import { Ride, naira } from "../lib/data";
import { display } from "../lib/fonts";

export default function RideCard({ ride }: { ride: Ride }) {
  return (
    <article className="ride-card bg-white border border-[#0A2A1A]/15 rounded-3xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between bg-[#0A5C34] text-white px-5 py-3 text-sm font-semibold">
        <span className="flex items-center gap-2"><Clock size={15} strokeWidth={2.5} /> {ride.time}</span>
        <span className="bg-[#E11D2E] px-3 py-0.5 rounded-full text-xs font-bold">{ride.seats} seats left</span>
      </div>

      <div className="p-5 flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`${display.className} text-4xl font-extrabold text-[#E11D2E]`}>{naira(ride.price)}</span>
          <span className="text-sm text-[#0A2A1A]/70">per person, equal split</span>
        </div>
        <div className="mt-6 flex gap-4">
          <div className="flex flex-col items-center pt-1.5">
            <span className="w-3 h-3 rounded-full border-[3px] border-[#0A5C34] bg-white" />
            <span className="flex-1 w-0.5 bg-[#0A2A1A]/20 my-1" />
            <span className="w-3 h-3 bg-[#E11D2E]" />
          </div>
          <div className="flex flex-col justify-between gap-5 font-semibold">
            <span>{ride.from}</span>
            <span>{ride.to}</span>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-[#0A2A1A]/20 mx-5" />
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`${display.className} w-10 h-10 rounded-full bg-[#0A2A1A] text-white flex items-center justify-center font-bold`}>
            {ride.owner[0]}
          </span>
          <div className="leading-tight">
            <div className="font-bold text-sm">{ride.owner}</div>
            <div className="text-xs text-[#0A2A1A]/60">Ride owner</div>
          </div>
        </div>
        <button className="bg-[#0A5C34] hover:bg-[#E11D2E] transition-colors text-white px-5 py-3 rounded-full text-sm font-bold flex items-center gap-2">
          Join ride <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </article>
  );
}
