"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "../lib/data";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto divide-y divide-[#0A2A1A]/10 border border-[#0A2A1A]/10 rounded-3xl bg-white">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-bold"
            >
              {f.q}
              <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? "bg-[#E11D2E] text-white" : "bg-[#EAF5EE] text-[#0A5C34]"}`}>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            {isOpen && <p className="px-6 pb-5 -mt-1 text-[#0A2A1A]/70 leading-relaxed">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
