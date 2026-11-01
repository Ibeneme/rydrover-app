import { ReactNode } from "react";
import { display } from "../lib/fonts";

export default function SectionHeading({
  tag,
  title,
  sub,
  center = true,
}: {
  tag: string;
  title: ReactNode;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A5C34]">
        <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
        {tag}
      </span>
      <h2 className={`${display.className} mt-3 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-[#0A2A1A]`}>
        {title}
      </h2>
      {sub && <p className="mt-4 text-lg text-[#0A2A1A]/70 leading-relaxed">{sub}</p>}
    </div>
  );
}
