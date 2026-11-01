import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/data";
import { display } from "../../lib/fonts";
import SectionHeading from "../SectionHeading";

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-32 overflow-hidden">
      {/* Top Header Section with Floating Avatars/Bubbles vibe */}
      <div className="relative text-center max-w-3xl mx-auto mb-20">
        {/* Floating elements / chat bubbles (matching reference style) */}
        <div className="absolute -top-12 left-6 md:left-12 hidden md:flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-emerald-900/10 text-xs font-medium text-[#0A2A1A]">
          <div className="w-6 h-6 rounded-full bg-[#0A5C34] text-white flex items-center justify-center font-bold text-[10px]">
            {TESTIMONIALS[0]?.name[0] || "S"}
          </div>
          <span>{TESTIMONIALS[0]?.text.slice(0, 38)}...</span>
        </div>

        <div className="absolute top-2 right-4 md:right-12 hidden md:flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-emerald-900/10 text-xs font-medium text-[#0A2A1A] rotate-2">
          <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
          <span>Amazing student rides experience!</span>
        </div>

        <SectionHeading
          tag="Testimonials"
          title={
            <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A2A1A] leading-tight block">
              Our students get reliable rides,{" "}
              <br className="hidden md:block" />
              fast support, and instant booking,{" "}
              <br className="hidden md:block" />
              avoiding <span className="text-[#0A5C34]">campus</span>{" "}
              <span className="text-amber-500">transit</span>{" "}
              <span className="text-sky-600">chaos</span>
            </span>
          }
        />
      </div>

      {/* Alternating Grid Rows matching the reference layout */}
      <div className="space-y-12">
        {TESTIMONIALS.map((t, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={t.name}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-br ${
                isEven
                  ? "from-[#F4F6F3] to-[#EAF5EE]"
                  : "from-[#FDECEE] to-[#fff5f6]"
              } rounded-[32px] p-8 md:p-12 border border-black/[0.03] shadow-sm`}
            >
              {/* Content Box (alternates text left / card right or vice versa) */}
              <div
                className={isEven ? "order-1 md:order-1" : "order-1 md:order-2"}
              >
                <div
                  className="flex gap-1 text-[#E11D2E] mb-4"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={16} fill="currentColor" />
                  ))}
                </div>
                <blockquote
                  className={`${display.className} text-xl md:text-2xl font-bold text-[#0A2A1A] leading-snug`}
                >
                  "{t.text}"
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${
                      i % 2 ? "bg-[#E11D2E]" : "bg-[#0A5C34]"
                    }`}
                  >
                    {t.name[0]}
                  </span>
                  <div>
                    <span className="block font-bold text-sm text-[#0A2A1A]">
                      {t.name}
                    </span>
                    <span className="text-xs text-[#0A2A1A]/60">{t.role}</span>
                  </div>
                </div>
              </div>

              {/* Visual Card Side */}
              <div
                className={isEven ? "order-2 md:order-2" : "order-2 md:order-1"}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-lg border border-black/[0.04] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A2A1A]/50">
                    Student Feedback #{i + 1}
                  </span>
                  <p className="mt-4 text-[#0A2A1A]/80 text-sm md:text-base italic">
                    "Using RydRover completely changed how I get to my morning
                    lectures. No more long queues or stressing over fares."
                  </p>
                  <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0A5C34]">
                      Verified Student Rider
                    </span>
                    <span className="text-xs bg-emerald-500/10 text-[#0A5C34] px-2.5 py-1 rounded-full font-bold">
                      5.0 Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
