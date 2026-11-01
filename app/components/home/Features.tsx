"use client"

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  animate,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue, Variants } from "framer-motion";
import {
  Users,
  ListOrdered,
  ShieldCheck,
  Check,
  Clock,
  MapPin,
  Wallet,
  BadgeCheck,
  History,
  Bell,
} from "lucide-react";

/* =====================================================================
   Motion helpers
   ===================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Runs `fn` every `ms` while `active` is true. */
function useTicker(active: boolean, ms: number, fn: () => void) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [active, ms]);
}

/** Fade + rise + un-blur when scrolled into view. */
function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Endless gentle bobbing. */
function Float({
  children,
  amp = 10,
  duration = 4,
  delay = 0,
  rotate = 0,
  className = "",
}: {
  children: ReactNode;
  amp?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amp, 0, amp, 0],
        rotate: rotate ? [0, rotate, 0, -rotate, 0] : 0,
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Springy entrance + scroll parallax + float. Used for the header decorations. */
function Drift({
  progress,
  speed,
  delay,
  className,
  children,
}: {
  progress: MotionValue<number>;
  speed: number;
  delay: number;
  className: string;
  children: ReactNode;
}) {
  const y = useTransform(progress, [0, 1], [60 * speed, -60 * speed]);
  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay }}
      >
        <Float amp={8} duration={3.5 + speed} delay={delay} rotate={3}>
          {children}
        </Float>
      </motion.div>
    </motion.div>
  );
}

/** Mouse-follow 3D tilt. */
function Tilt({ children }: { children: ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });
  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 10);
        rx.set(-py * 10);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Slow drifting colour blob. */
function Blob({
  className,
  dx = 30,
  dy = 20,
  duration = 9,
}: {
  className: string;
  dx?: number;
  dy?: number;
  duration?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{
        x: [0, dx, -dx, 0],
        y: [0, -dy, dy, 0],
        scale: [1, 1.15, 0.95, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Text that slides up/out when its value changes (prices, counts, labels). */
function Roll({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Counts up from 0 when it scrolls into view. */
function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix]);
  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
}

/* =====================================================================
   Small building blocks
   ===================================================================== */

function Avatar({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ring-white ${className}`}
    >
      {label}
    </span>
  );
}

/** Chat bubble that shows typing dots, then swaps to the message. */
function ChatBubble({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [typed, setTyped] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setTyped(true), delay * 1000 + 1500);
    return () => clearTimeout(t);
  }, [inView, delay]);
  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl px-4 py-2.5 text-sm text-[#0A2A1A]/80 shadow-md min-w-[64px]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {typed ? (
          <motion.span
            key="text"
            className="block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {text}
          </motion.span>
        ) : (
          <motion.span
            key="dots"
            className="flex gap-1 py-1.5 justify-center"
            exit={{ opacity: 0, scale: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#0A2A1A]/40"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Seats pop in one after another with a spring. */
function Seats({ filled, total = 4 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="relative w-6 h-6 rounded-full border-2 border-dashed border-[#0A2A1A]/25"
        >
          <AnimatePresence>
            {i < filled && (
              <motion.span
                key="on"
                className="absolute -inset-0.5 rounded-full bg-[#0A5C34] text-white text-[10px] font-bold flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      ))}
    </div>
  );
}

/** Shared gradient card with drifting blobs behind the content. */
function Shell({
  gradient,
  children,
  innerClass = "",
}: {
  gradient: string;
  children: ReactNode;
  innerClass?: string;
}) {
  return (
    <div
      className={`relative rounded-[2rem] bg-gradient-to-br ${gradient} p-6 sm:p-10 overflow-hidden min-h-[360px] flex items-center justify-center`}
    >
      <Blob className="w-56 h-56 -top-10 -left-10 bg-[#0A5C34]/20" />
      <Blob
        className="w-64 h-64 -bottom-16 -right-10 bg-[#E11D2E]/15"
        dx={-30}
        dy={25}
        duration={11}
      />
      <div className={`relative z-10 w-full ${innerClass}`}>{children}</div>
    </div>
  );
}

/* =====================================================================
   Visual cards
   ===================================================================== */

function FareVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [n, setN] = useState(1);
  useTicker(inView, 1800, () => setN((v) => (v >= 4 ? 1 : v + 1)));

  const TOTAL = 2000;
  const each = Math.round(TOTAL / n);
  const saved = TOTAL - each;
  const full = n === 4;

  return (
    <div ref={ref}>
      <Shell
        gradient="from-[#FDECEE] via-white to-[#EAF5EE]"
        innerClass="relative pt-14"
      >
        <div className="absolute top-0 left-0 flex items-center gap-3">
          <motion.span
            key={n}
            className="w-12 h-12 rounded-full bg-[#E11D2E] text-white flex items-center justify-center shadow-md"
            animate={{ rotate: [0, -18, 18, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
          >
            <Wallet size={22} />
          </motion.span>
          <span className="bg-white rounded-full px-3 py-1 text-xs font-bold text-[#E11D2E] shadow">
            <Roll
              value={
                n === 1
                  ? "Fill seats to save"
                  : `You save ₦${saved.toLocaleString()}`
              }
            />
          </span>
        </div>

        <div className="absolute left-6 right-6 top-14 bottom-[-14px] rounded-3xl bg-white/50" />
        <div className="absolute left-3 right-3 top-14 bottom-[-7px] rounded-3xl bg-white/70" />

        <motion.div
          className="relative bg-white rounded-3xl p-5"
          animate={{
            boxShadow: full
              ? "0 0 0 3px rgba(10,92,52,0.35), 0 20px 40px -12px rgba(0,0,0,0.2)"
              : "0 0 0 0px rgba(10,92,52,0), 0 20px 40px -12px rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar label="CB" className="w-10 h-10 text-xs bg-[#0A5C34]" />
              <div>
                <p className="font-bold text-sm">Cab 14 · Main Gate</p>
                <p
                  className={`text-xs ${
                    full ? "text-[#0A5C34] font-semibold" : "text-[#0A2A1A]/60"
                  }`}
                >
                  <Roll
                    value={full ? "Full · leaving now" : "Leaving when full"}
                  />
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs text-[#0A2A1A]/60">
              <Clock size={14} /> 2:30 PM
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-xs text-[#0A2A1A]/60">Your share</p>
              <p className="flex items-baseline gap-2">
                <Roll
                  value={`₦${each.toLocaleString()}`}
                  className="text-3xl font-extrabold tracking-tight"
                />
                <span className="text-sm font-semibold text-[#0A2A1A]/50 line-through">
                  ₦{TOTAL.toLocaleString()}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#0A2A1A]/60 mb-1.5">{n} of 4 seats</p>
              <Seats filled={n} />
            </div>
          </div>

          <div className="mt-5 h-1.5 rounded-full bg-[#0A2A1A]/10 overflow-hidden">
            <motion.div
              className="h-full bg-[#0A5C34] rounded-full"
              animate={{ width: `${(n / 4) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </motion.div>
      </Shell>
    </div>
  );
}

type Cab = { id: string; name: string; filled: number };

function QueueVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const tick = useRef(0);
  const [cabs, setCabs] = useState<Cab[]>([
    { id: "14", name: "Cab 14", filled: 3 },
    { id: "09", name: "Cab 09", filled: 2 },
    { id: "21", name: "Cab 21", filled: 1 },
  ]);

  useTicker(inView, 2200, () => {
    const t = tick.current++;
    setCabs((prev) => {
      const next = prev.map((c) => ({ ...c }));
      const target = next[t % next.length];
      target.filled = target.filled >= 4 ? 1 : target.filled + 1;
      return next;
    });
  });

  const sorted = [...cabs].sort((a, b) => b.filled - a.filled);
  const waiting = cabs.reduce((sum, c) => sum + c.filled, 0);

  return (
    <div ref={ref}>
      <Shell gradient="from-[#EAF5EE] via-white to-[#FDECEE]">
        <div className="flex items-center gap-3">
          <motion.span
            className="relative w-12 h-12 rounded-full bg-[#0A5C34] text-white flex items-center justify-center shadow-md"
            style={{ transformOrigin: "50% 10%" }}
            animate={{ rotate: [0, -18, 18, -12, 12, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.6 }}
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-[#E11D2E] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              <Roll value={String(waiting)} />
            </span>
          </motion.span>
          <p className="text-sm font-semibold flex items-center gap-1.5">
            <Roll value={String(waiting)} /> students waiting at Library Park
          </p>
          <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-[#E11D2E]">
            <motion.span
              className="w-2 h-2 rounded-full bg-[#E11D2E]"
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {sorted.map((c, i) => {
            const boarding = c.filled === 4;
            return (
              <motion.div
                key={c.id}
                layout
                className={`bg-white rounded-2xl shadow-md p-4 flex items-center justify-between ${
                  boarding ? "ring-2 ring-[#E11D2E]/40" : ""
                }`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                transition={{
                  layout: { type: "spring", stiffness: 380, damping: 34 },
                  opacity: { duration: 0.5, delay: i * 0.12 },
                  x: {
                    type: "spring",
                    stiffness: 200,
                    damping: 22,
                    delay: i * 0.12,
                  },
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#EAF5EE] text-[#0A5C34] flex items-center justify-center">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="font-bold text-sm">{c.name}</p>
                    <p className="text-xs text-[#0A2A1A]/60">Library Park</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Seats filled={c.filled} />
                  <p
                    className={`mt-1 text-xs font-semibold ${
                      boarding ? "text-[#E11D2E]" : "text-[#0A2A1A]/60"
                    }`}
                  >
                    <Roll
                      value={
                        boarding ? "Boarding now" : `~${(4 - c.filled) * 3} min`
                      }
                    />
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Shell>
    </div>
  );
}

function Digit({ d, i }: { d: string; i: number }) {
  return (
    <motion.span
      className="relative w-11 h-14 rounded-xl bg-[#EAF5EE] overflow-hidden flex items-center justify-center text-2xl font-extrabold text-[#0A5C34]"
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 16,
        delay: 0.3 + i * 0.1,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={d}
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            delay: i * 0.07,
          }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

const SPARKS = Array.from({ length: 10 }, (_, i) => i * 36);
const RIDERS = [
  { label: "DR", bg: "bg-[#0A2A1A]" },
  { label: "AO", bg: "bg-[#0A5C34]" },
  { label: "TK", bg: "bg-[#E11D2E]" },
  { label: "MI", bg: "bg-[#7A9E87]" },
];

function BoardingVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [code, setCode] = useState("4829");
  const [boarded, setBoarded] = useState(false);

  useTicker(inView && !boarded, 6000, () =>
    setCode(String(Math.floor(1000 + Math.random() * 9000)))
  );

  useEffect(() => {
    if (!boarded) return;
    const t = setTimeout(() => setBoarded(false), 3500);
    return () => clearTimeout(t);
  }, [boarded]);

  return (
    <div ref={ref}>
      <Shell
        gradient="from-[#EAF5EE] via-white to-[#FDECEE]"
        innerClass="flex flex-col items-center"
      >
        <div className="flex mb-6">
          {RIDERS.map((r, i) => (
            <motion.div
              key={r.label}
              className="relative -ml-3 first:ml-0"
              initial={{ scale: 0, y: 30 }}
              whileInView={{ scale: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, zIndex: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: i * 0.1,
              }}
            >
              <Avatar label={r.label} className={`w-12 h-12 text-sm ${r.bg}`} />
              <AnimatePresence>
                {boarded && (
                  <motion.span
                    className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#0A5C34] text-white ring-2 ring-white flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 14,
                      delay: i * 0.12,
                    }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="w-full max-w-xs bg-white rounded-3xl shadow-xl p-6 text-center">
          <p className="text-xs font-semibold text-[#0A2A1A]/60">
            Show this code to your driver
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {code.split("").map((d, i) => (
              <Digit key={i} d={d} i={i} />
            ))}
          </div>
          <div className="mt-4 h-1 rounded-full bg-[#0A2A1A]/10 overflow-hidden">
            <motion.div
              key={code}
              className="h-full bg-[#E11D2E] rounded-full"
              style={{ originX: 0 }}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: boarded ? 1 : 0 }}
              transition={{ duration: 6, ease: "linear" }}
            />
          </div>
          <p className="mt-2 text-xs text-[#0A2A1A]/50">
            Refreshes every trip · valid for 5 minutes
          </p>

          <div className="relative mt-5">
            <motion.button
              type="button"
              onClick={() => setBoarded((b) => !b)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              initial={false}
              animate={{ backgroundColor: boarded ? "#0A5C34" : "#0A2A1A" }}
              className="w-full rounded-full text-white text-sm font-semibold py-3 overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={boarded ? "done" : "idle"}
                  className="flex items-center justify-center gap-2"
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {boarded ? (
                    <>
                      <Check size={16} /> Boarded · safe trip
                    </>
                  ) : (
                    <>
                      <BadgeCheck size={16} /> Confirm boarding
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            {boarded &&
              SPARKS.map((a) => (
                <motion.span
                  key={a}
                  className={`pointer-events-none absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full ${
                    a % 72 === 0 ? "bg-[#E11D2E]" : "bg-[#0A5C34]"
                  }`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((a * Math.PI) / 180) * 90,
                    y: Math.sin((a * Math.PI) / 180) * 40 - 10,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              ))}
          </div>
        </div>
      </Shell>
    </div>
  );
}

/* =====================================================================
   Feature rows
   ===================================================================== */

type Row = {
  icon: typeof Users;
  tint: string;
  title: ReactNode;
  text: string;
  points: string[];
  visual: ReactNode;
};

const ROWS: Row[] = [
  {
    icon: Users,
    tint: "bg-[#FDECEE] text-[#E11D2E]",
    title: (
      <>
        Split the fare,
        <br />
        not the stress
      </>
    ),
    text: "Everyone in the cab pays the same share. The price per person drops as seats fill, so a full cab is always the cheapest ride on campus.",
    points: [
      "Live price per person, updated as seats fill",
      "No awkward change or chasing people for money",
      "See your total before you confirm a seat",
    ],
    visual: <FareVisual />,
  },
  {
    icon: ListOrdered,
    tint: "bg-[#EAF5EE] text-[#0A5C34]",
    title: (
      <>
        Know the queue
        <br />
        before you walk over
      </>
    ),
    text: "See who is waiting at your park and which cabs are filling, so you never stand around guessing when the next ride leaves.",
    points: [
      "Real-time waiting list for every park",
      "Seat counts and rough departure times",
      "Get a nudge when a cab near you is almost full",
    ],
    visual: <QueueVisual />,
  },
  {
    icon: ShieldCheck,
    tint: "bg-[#EAF5EE] text-[#0A5C34]",
    title: (
      <>
        Board safely,
        <br />
        face to face
      </>
    ),
    text: "Show a one-time code to the driver and your co-riders before the cab moves. Everyone knows who is in the car and that it is the right one.",
    points: [
      "One-time code for every trip",
      "Driver and co-riders confirmed before departure",
      "Trip details saved if you ever need them",
    ],
    visual: <BoardingVisual />,
  },
];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const pop: Variants = {
  hidden: { scale: 0, rotate: -90 },
  show: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 16 },
  },
};
const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};
const tick: Variants = {
  hidden: { scale: 0 },
  show: {
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 14 },
  },
};

function FeatureRow({ row, flip }: { row: Row; flip: boolean }) {
  const { icon: Icon, tint, title, text, points, visual } = row;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
    >
      <motion.div style={{ y }} className={flip ? "md:order-2" : ""}>
        <motion.div
          initial={{
            opacity: 0,
            x: flip ? 90 : -90,
            rotate: flip ? 4 : -4,
            scale: 0.92,
          }}
          whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <Tilt>{visual}</Tilt>
        </motion.div>
      </motion.div>

      <motion.div
        className={flip ? "md:order-1" : ""}
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span
          variants={pop}
          whileHover={{
            rotate: [0, -12, 12, 0],
            scale: 1.1,
            transition: { duration: 0.5 },
          }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tint}`}
        >
          <Icon size={24} />
        </motion.span>
        <motion.h3
          variants={rise}
          className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1]"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={rise}
          className="mt-4 text-[#0A2A1A]/70 leading-relaxed max-w-md"
        >
          {text}
        </motion.p>
        <motion.ul variants={listStagger} className="mt-6 space-y-3">
          {points.map((p) => (
            <motion.li
              key={p}
              variants={slideIn}
              className="flex items-start gap-3 text-sm text-[#0A2A1A]/80"
            >
              <motion.span
                variants={tick}
                className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#0A5C34] text-white flex items-center justify-center"
              >
                <Check size={12} strokeWidth={3} />
              </motion.span>
              {p}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

/* =====================================================================
   Extras
   ===================================================================== */

const STATS = [
  { to: 4, prefix: "Up to ", suffix: "", label: "students share one cab" },
  { to: 50, prefix: "", suffix: "%", label: "average saving on a full cab" },
  { to: 5, prefix: "< ", suffix: " min", label: "typical wait at a busy park" },
];

const MORE = [
  {
    icon: BadgeCheck,
    title: "Verified students",
    text: "Sign in with your campus email so every co-rider is a real student.",
  },
  {
    icon: History,
    title: "Trip history",
    text: "Review past rides, fares and who you travelled with.",
  },
  {
    icon: Bell,
    title: "Smart alerts",
    text: "Hear when your cab is filling, boarding or about to leave.",
  },
  {
    icon: Wallet,
    title: "Fare estimate",
    text: "Know the likely cost per person before you join a queue.",
  },
];

const moreStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const moreItem: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 20 },
  },
};

/** Words slide up out of a mask, one after another. */
function SplitHeading({ lines }: { lines: string[] }) {
  let i = 0;
  return (
    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((w) => {
            const idx = i++;
            return (
              <span
                key={idx}
                className="inline-block overflow-hidden align-bottom pb-1 mr-[0.25em]"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotate: 4 }}
                  whileInView={{ y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + idx * 0.07,
                    ease: EASE,
                  }}
                >
                  {w}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

/* =====================================================================
   Section
   ===================================================================== */

export default function Features() {
  const headRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ["start end", "end start"],
  });

  return (
    <MotionConfig reducedMotion="user">
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        {/* heading with floating avatars + chat bubbles */}
        <div
          ref={headRef}
          className="relative max-w-4xl mx-auto text-center py-16 md:py-24"
        >
          <Blob
            className="w-72 h-72 left-0 top-10 bg-[#0A5C34]/10"
            duration={12}
          />
          <Blob
            className="w-72 h-72 right-0 bottom-0 bg-[#E11D2E]/10"
            dx={-40}
            dy={30}
            duration={14}
          />

          <Drift
            progress={scrollYProgress}
            speed={1}
            delay={0.2}
            className="hidden sm:block left-[22%] top-0"
          >
            <Avatar label="AO" className="w-12 h-12 text-sm bg-[#0A5C34]" />
          </Drift>
          <Drift
            progress={scrollYProgress}
            speed={1.6}
            delay={0.35}
            className="hidden sm:block right-[24%] top-2"
          >
            <Avatar label="TK" className="w-12 h-12 text-sm bg-[#E11D2E]" />
          </Drift>
          <Drift
            progress={scrollYProgress}
            speed={0.8}
            delay={0.5}
            className="hidden sm:block left-[4%] bottom-6"
          >
            <Avatar label="MI" className="w-12 h-12 text-sm bg-[#0A2A1A]" />
          </Drift>
          <Drift
            progress={scrollYProgress}
            speed={1.3}
            delay={0.65}
            className="hidden sm:block right-[6%] bottom-0"
          >
            <Avatar label="DR" className="w-14 h-14 text-base bg-[#7A9E87]" />
          </Drift>

          <Drift
            progress={scrollYProgress}
            speed={1.2}
            delay={0.8}
            className="hidden md:block right-0 -top-2"
          >
            <ChatBubble text="Seat saved! See you at the park." delay={0.8} />
          </Drift>
          <Drift
            progress={scrollYProgress}
            speed={0.7}
            delay={1.1}
            className="hidden md:block left-[12%] -bottom-6"
          >
            <ChatBubble text="Thanks for the code!" delay={1.1} />
          </Drift>

          <div className="relative z-10">
            <SplitHeading
              lines={["Essential features for", "smarter campus travel"]}
            />
            <Reveal delay={0.7} y={16}>
              <p className="mt-5 text-[#0A2A1A]/70 max-w-xl mx-auto">
                Everything you need to find a cab, share the cost and board
                safely.
              </p>
            </Reveal>
          </div>
        </div>

        {/* alternating rows */}
        <div className="mt-10 space-y-20 md:space-y-28">
          {ROWS.map((row, i) => (
            <FeatureRow key={i} row={row} flip={i % 2 === 1} />
          ))}
        </div>

        {/* stats strip */}
        <motion.div
          className="relative mt-24 grid sm:grid-cols-3 gap-6 rounded-[2rem] bg-[#0A2A1A] text-white p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            initial={{ x: "-150%" }}
            animate={{ x: "500%" }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={0.2 + i * 0.15}
              y={24}
              className="relative text-center sm:text-left"
            >
              <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-white/70 text-sm">{s.label}</p>
            </Reveal>
          ))}
        </motion.div>

        {/* more features */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-center">
              And a few small things that help
            </h3>
          </Reveal>
          <motion.div
            className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={moreStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {MORE.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={moreItem}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
                className="group rounded-3xl bg-gradient-to-br from-[#EAF5EE] to-white p-6"
              >
                <motion.span
                  className="w-10 h-10 rounded-xl bg-white shadow-sm text-[#0A5C34] flex items-center justify-center"
                  whileHover={{ rotate: 14, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  <Icon size={20} />
                </motion.span>
                <h4 className="mt-4 font-bold">{title}</h4>
                <p className="mt-1 text-sm text-[#0A2A1A]/70 leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
