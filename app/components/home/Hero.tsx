import Link from "next/link";
import { ShieldCheck, Users } from "lucide-react";
import { display } from "../../lib/fonts";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A5C34] text-[#FFF1D6]">
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-24 md:pt-20 md:pb-32 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#FFF1D6] text-[#0A5C34] px-4 py-2 rounded-full text-sm font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF0000]" />
            </span>
            12 students in the park queue right now
          </div>

          <h1
            className={`${display.className} mt-6 text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight`}
          >
            Fill the cab.
            <br />
            Split the fare.
            <br />
            Get to class.
          </h1>

          <p className="mt-6 text-lg text-[#FFF1D6]/80 max-w-md leading-relaxed">
            Join a ride at the park, pay your equal share in naira and confirm
            your seat face to face before you board.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/find-ride"
              className="bg-[#FF0000] hover:bg-[#E24A30] transition-colors text-white px-8 py-4 rounded-full font-bold"
            >
              Find a ride
            </Link>
            <Link
              href="/drive"
              className="border-2 border-dotted border-[#FFF1D6] hover:bg-[#FFF1D6] hover:text-[#0A5C34] transition-colors px-8 py-4 rounded-full font-bold"
            >
              Drive with us
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Students commuting together on campus"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute top-16 -left-2 sm:left-6 bg-[#FFF1D6] text-[#0A5C34] rounded-3xl px-4 py-3 flex items-center gap-3 shadow-lg">
            <span className="w-9 h-9 rounded-full bg-[#0A5C34] flex items-center justify-center">
              <ShieldCheck size={18} className="text-[#FFF1D6]" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Seat confirmed</p>
              <p className="text-xs opacity-70">Code 4821 verified</p>
            </div>
          </div>

          <div className="absolute bottom-24 -right-2 sm:right-6 bg-[#FF0000] text-white rounded-3xl px-4 py-3 flex items-center gap-3 shadow-lg">
            <span className="w-9 h-9 rounded-full bg-[#FFF1D6] flex items-center justify-center">
              <Users size={18} className="text-[#FF0000]" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">4 riders</p>
              <p className="text-xs opacity-80">Fare split evenly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
