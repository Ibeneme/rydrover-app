import Link from "next/link";
import { display } from "../lib/fonts";

export default function CtaBand() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
      <div className="bg-[#0A5C34] rounded-[2rem] px-6 py-14 md:py-16 text-center text-white">
        <h2 className={`${display.className} text-4xl md:text-5xl font-extrabold tracking-tight`}>
          Your next ride is already filling up
        </h2>
        <p className="mt-3 text-white/80 max-w-lg mx-auto">Join a cab at your park, split the fare and get to class on time.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/find-ride" className="bg-[#E11D2E] hover:bg-[#C2121F] transition-colors px-7 py-3.5 rounded-full font-bold">Find a ride</Link>
          <Link href="/drive" className="bg-white text-[#0A5C34] hover:bg-[#EAF5EE] transition-colors px-7 py-3.5 rounded-full font-bold">Become a driver</Link>
        </div>
      </div>
    </section>
  );
}
