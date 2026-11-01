import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import CtaBand from "../components/CtaBand";
import { display } from "../lib/fonts";

export const metadata = { title: "About | RydRover" };

const STATS = [["12,000+", "Rides shared"], ["40%", "Average fare saved"], ["3", "Campuses live"], ["4.8", "Average rating"]];
const VALUES = [
  { title: "Fair by design", text: "Every rider pays the same share. No haggling and no surprise charges.", tint: "bg-[#EAF5EE]" },
  { title: "Safety first", text: "Boarding codes and verified drivers mean you know who you ride with.", tint: "bg-[#FDECEE]" },
  { title: "Built for campus", text: "We shape routes, prices and parks around how students actually move.", tint: "bg-[#EAF5EE]" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader tag="About us" title="Making campus transport fair for everyone" sub="RydRover started when a group of students got tired of queueing, haggling and overpaying for short trips." />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map(([n, l]) => (
          <div key={l} className="border border-[#0A2A1A]/10 rounded-3xl p-7 text-center">
            <p className={`${display.className} text-4xl font-extrabold text-[#E11D2E]`}>{n}</p>
            <p className="mt-1 text-sm text-[#0A2A1A]/70">{l}</p>
          </div>
        ))}
      </section>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <SectionHeading tag="What we believe" title="Our values" />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className={`${v.tint} rounded-3xl p-8`}>
              <h3 className={`${display.className} text-2xl font-bold`}>{v.title}</h3>
              <p className="mt-2 text-[#0A2A1A]/75 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
