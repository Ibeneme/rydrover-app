import { ReactNode } from "react";
import { display } from "../lib/fonts";

export default function PageHeader({ tag, title, sub }: { tag: string; title: ReactNode; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-[#0A2A1A]/10">
      <div aria-hidden className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#0A5C34]/10 blur-3xl" />
      <div aria-hidden className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-[#E11D2E]/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-20">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A5C34]">
          <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
          {tag}
        </span>
        <h1 className={`${display.className} mt-3 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02] max-w-3xl`}>
          {title}
        </h1>
        <p className="mt-4 text-lg text-[#0A2A1A]/70 max-w-xl leading-relaxed">{sub}</p>
      </div>
    </section>
  );
}
