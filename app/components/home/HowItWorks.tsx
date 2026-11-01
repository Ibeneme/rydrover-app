"use client";

import { display } from "../../lib/fonts";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0A5C34] text-[#FFF1D6] py-20 md:py-32">
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Header & Intro Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 items-end mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFF1D6] text-[#0A5C34] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF0000]" />
              </span>
              Seamless Campus Transit
            </div>
            <h2
              className={`${display.className} text-4xl sm:text-6xl font-extrabold tracking-tight leading-none`}
            >
              How RydRover gets you to class on time.
            </h2>
          </div>
          <p className="text-lg text-[#FFF1D6]/80 leading-relaxed">
            No more endless haggling at the park gates or standing blindly in
            long queues. We bring transparency, equal-split pricing, and secure
            face-to-face boarding right to your fingertips.
          </p>
        </motion.div>

        {/* Multi-column Layout: Feature Cards Flanking a Centered Image */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Column: Steps 1 & 2 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-[#FFF1D6] text-[#0A5C34] rounded-[32px] p-8 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-[#0A5C34] text-[#FFF1D6] flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className={`${display.className} font-bold text-xl mb-2`}>
                Create your student profile
              </h3>
              <p className="text-sm opacity-85 leading-relaxed">
                Sign up instantly using your campus credentials to verify that
                you are a bonafide student in your university community.
              </p>
            </div>

            <div className="bg-[#FF0000] text-white rounded-[32px] p-8 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-[#FFF1D6] text-[#FF0000] flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className={`${display.className} font-bold text-xl mb-2`}>
                Join a live park queue
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Check active queues in real-time. Choose your preferred cab and
                lock down your seat before leaving your hostel.
              </p>
            </div>
          </motion.div>

          {/* Center Column: Unsplash Image with scale-in animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center my-6 lg:my-0"
          >
            <div className="relative w-full max-w-sm h-[520px] rounded-[32px] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1773332611514-238856b76198?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                alt="Students waiting and riding together on campus"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column: Steps 3 & 4 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-[#FFF1D6] text-[#0A5C34] rounded-[32px] p-8 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-[#0A5C34] text-[#FFF1D6] flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className={`${display.className} font-bold text-xl mb-2`}>
                Split fares transparently
              </h3>
              <p className="text-sm opacity-85 leading-relaxed">
                The total cab fare is divided equally among passengers. Watch
                the price per head automatically drop as more riders join your
                vehicle.
              </p>
            </div>

            <div className="bg-[#FFF1D6] text-[#0A5C34] rounded-[32px] p-8 shadow-xl border-2 border-[#FF0000]/20">
              <div className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h3 className={`${display.className} font-bold text-xl mb-2`}>
                Verify face-to-face
              </h3>
              <p className="text-sm opacity-85 leading-relaxed">
                Present your secure one-time verification code to the driver and
                co-riders right at the park before the vehicle pulls away.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
