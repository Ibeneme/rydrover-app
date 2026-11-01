import { ArrowDownLeft, ArrowUpRight, Plus, Banknote } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { TXNS, naira } from "../lib/data";
import { display } from "../lib/fonts";

export const metadata = { title: "Wallet | RydRover" };

export default function WalletPage() {
  return (
    <>
      <PageHeader tag="Wallet" title="Your campus wallet" sub="Top up once, pay your share in a tap and track every naira you spend on transport." />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid lg:grid-cols-[1fr_1.4fr] gap-8">
        <div className="bg-[#0A5C34] text-white rounded-3xl p-8 self-start">
          <p className="text-white/70 text-sm">Available balance</p>
          <p className={`${display.className} mt-2 text-5xl font-extrabold`}>{naira(12450)}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="bg-[#E11D2E] hover:bg-[#C2121F] transition-colors rounded-2xl py-3.5 font-bold flex items-center justify-center gap-2"><Plus size={18} /> Top up</button>
            <button className="bg-white text-[#0A5C34] hover:bg-[#EAF5EE] transition-colors rounded-2xl py-3.5 font-bold flex items-center justify-center gap-2"><Banknote size={18} /> Withdraw</button>
          </div>
        </div>

        <div className="border border-[#0A2A1A]/10 rounded-3xl p-6">
          <h2 className={`${display.className} text-2xl font-bold`}>Recent activity</h2>
          <ul className="mt-4 divide-y divide-[#0A2A1A]/10">
            {TXNS.map((t) => {
              const credit = t.amount > 0;
              return (
                <li key={t.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center ${credit ? "bg-[#EAF5EE] text-[#0A5C34]" : "bg-[#FDECEE] text-[#E11D2E]"}`}>
                      {credit ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                    </span>
                    <div><p className="font-semibold">{t.label}</p><p className="text-xs text-[#0A2A1A]/60">{t.date}</p></div>
                  </div>
                  <p className={`font-bold ${credit ? "text-[#0A5C34]" : "text-[#E11D2E]"}`}>{credit ? "+" : "-"}{naira(Math.abs(t.amount))}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
