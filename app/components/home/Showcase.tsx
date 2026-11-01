"use client"; // If using Next.js App Router client components, ensure this or 'use client' is at the top if needed

import Link from "next/link";
import { Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { display } from "../../lib/fonts";
import { naira } from "../../lib/data";
import SectionHeading from "../SectionHeading";

const BARS = [30, 45, 80, 100, 70, 40, 55, 90, 60, 35];

export default function Showcase() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-32 overflow-hidden">
      {/* Top Header Section with Floating Avatars/Bubbles vibe */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-3xl mx-auto mb-20"
      >
        {/* Floating elements backdrop */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute -top-12 left-1/4 hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-emerald-900/10 text-xs font-medium text-[#0A2A1A]"
        >
          <span className="w-2 h-2 rounded-full bg-[#E11D2E]" /> Got it! I&apos;ll take a look and send over the invoice
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-4 right-10 hidden md:block bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-emerald-900/10 text-xs text-[#0A2A1A]/70 rotate-3"
        >
          Thanks for sharing this!
        </motion.div>

        <SectionHeading 
          tag="Highlights" 
          title={
            <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0A2A1A] leading-tight block">
              Explore our standout features, <br className="hidden md:block"/>
              avoiding <span className="text-[#0A5C34]">campus</span> <span className="text-[#E11D2E]">commute</span> <span className="text-[#E11D2E]">chaos</span>
            </span>
          } 
        />
      </motion.div>

      {/* Bento Grid Layout matching reference style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Feature 1: Park Queue Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#F4F6F3] to-[#EAF5EE] rounded-[32px] p-8 md:p-12 border border-black/[0.03] flex flex-col justify-between relative overflow-hidden shadow-sm"
        >
          <div className="relative z-10">
            <div className="inline-block p-3 rounded-2xl bg-white shadow-sm mb-6 text-[#0A5C34]">
              <span className="text-xl font-bold">01</span>
            </div>
            <h3 className={`${display.className} text-2xl md:text-3xl font-bold text-[#0A2A1A]`}>
              Stop piecing together endless park queues
            </h3>
            <p className="mt-3 text-[#0A2A1A]/70 text-base max-w-md">
              You don&apos;t waste time guessing traffic. RydRover gives you clean, accurate queue summaries upfront.
            </p>
          </div>

          {/* Visual element: Queue bar graph card with animated bars */}
          <div className="mt-10 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-black/[0.04]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#0A2A1A]/60 uppercase tracking-wider">Live Park Traffic</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#E11D2E]/10 text-[#E11D2E] font-bold">Peak at 8 AM</span>
            </div>
            <div className="flex items-end gap-1.5 h-28" role="img" aria-label="Queue length by time of day">
              {BARS.map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`flex-1 rounded-t-md transition-all ${h === 100 ? "bg-[#E11D2E]" : "bg-[#0A5C34]/70 hover:bg-[#0A5C34]"}`} 
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-medium text-[#0A2A1A]/50">
              <span>6 AM</span>
              <span>Busiest at 8 AM</span>
              <span>6 PM</span>
            </div>
          </div>
        </motion.div>

        {/* Feature 2: Equal-split fares */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-[#FDECEE] to-[#fff5f6] rounded-[32px] p-8 md:p-12 border border-black/[0.03] flex flex-col justify-between relative overflow-hidden shadow-sm"
        >
          <div className="relative z-10">
            <div className="inline-block p-3 rounded-2xl bg-white shadow-sm mb-6 text-[#E11D2E]">
              <span className="text-xl font-bold">02</span>
            </div>
            <h3 className={`${display.className} text-2xl md:text-3xl font-bold text-[#0A2A1A]`}>
              Equal-split fares, without starting from zero
            </h3>
            <p className="mt-3 text-[#0A2A1A]/70 text-base max-w-md">
              Get solid savings every time you ride with peers, so you can share costs effortlessly and move on in seconds.
            </p>
          </div>

          {/* Visual element: Split options grid card */}
          <div className="mt-10 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-black/[0.04]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#0A2A1A]/60 uppercase tracking-wider">Dynamic Splitting</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-[#0A5C34] font-bold">Save up to 50%</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ n: 2, p: 900 }, { n: 3, p: 600 }, { n: 4, p: 450 }].map(({ n, p }) => (
                <motion.div 
                  key={n}
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-xl p-3.5 text-center ${n === 4 ? "bg-[#E11D2E] text-white shadow-md shadow-[#E11D2E]/20" : "bg-[#F9FAFB] text-[#0A2A1A] border border-black/5"}`}
                >
                  <p className="text-[11px] font-semibold opacity-75">{n} riders</p>
                  <p className={`${display.className} text-lg md:text-xl font-extrabold mt-1`}>{naira(p)}</p>
                  <p className="text-[10px] opacity-75">each</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature 3: Campus Wallet & App Download combo box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-2 bg-gradient-to-r from-[#0A2A1A] to-[#0A5C34] text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="max-w-xl relative z-10">
            <span aria-hidden className={`${display.className} absolute -top-10 -left-6 text-[100px] leading-none font-extrabold text-white/5 select-none hidden md:block`}>RYDROVER</span>
            <h3 className={`${display.className} text-3xl md:text-4xl font-bold text-white`}>
              Get the app & your campus wallet
            </h3>
            <p className="mt-3 text-white/80 text-base">
              Rides, wallet and instant boarding codes in your pocket. Manage funds and commute seamlessly.
            </p>
            <Link href="/find-ride" className="mt-6 inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#c51423] transition-colors text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-[#E11D2E]/30">
              <Download size={16} /> Download app now
            </Link>
          </div>

          {/* Wallet Preview Card with hover effect */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="w-full md:w-80 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-6 text-white shadow-2xl relative z-10"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-white/60 font-medium">RydRover wallet</span>
              <Sparkles size={16} className="text-emerald-400" />
            </div>
            <p className={`${display.className} text-3xl font-extrabold tracking-tight`}>{naira(12450)}</p>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs tracking-widest text-white/60 font-mono">•••• 5168</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">Active</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}