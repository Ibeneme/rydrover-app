import { Mail, Phone, MessageCircle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import Faq from "../components/Faq";

export const metadata = { title: "Help | RydRover" };

const CONTACTS = [
  { icon: MessageCircle, title: "Chat with us", text: "Replies within 10 minutes on school days.", tint: "bg-[#EAF5EE] text-[#0A5C34]" },
  { icon: Mail, title: "Email support", text: "hello@rydrover.ng", tint: "bg-[#FDECEE] text-[#E11D2E]" },
  { icon: Phone, title: "Call us", text: "+234 800 000 0000", tint: "bg-[#EAF5EE] text-[#0A5C34]" },
];

export default function HelpPage() {
  return (
    <>
      <PageHeader tag="Help centre" title="How can we help?" sub="Quick answers about rides, payments and boarding, or reach our team directly." />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <SectionHeading tag="FAQ" title="Common questions" />
        <div className="mt-12"><Faq /></div>
      </section>
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24 grid md:grid-cols-3 gap-6">
        {CONTACTS.map(({ icon: Icon, title, text, tint }) => (
          <div key={title} className="border border-[#0A2A1A]/10 rounded-3xl p-8">
            <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tint}`}><Icon size={22} /></span>
            <h3 className="mt-5 font-bold text-lg">{title}</h3>
            <p className="mt-1 text-[#0A2A1A]/70">{text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
