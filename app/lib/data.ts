export const naira = (n: number) => "\u20A6" + n.toLocaleString("en-NG");

export type Ride = {
  id: number;
  from: string;
  to: string;
  time: string;
  price: number;
  seats: number;
  owner: string;
};

export const RIDES: Ride[] = [
  { id: 1, from: "Main Gate", to: "Hostel Zone", time: "Now", price: 450, seats: 4, owner: "Chinedu" },
  { id: 2, from: "Main Gate", to: "Hostel Zone", time: "In 7 min", price: 450, seats: 3, owner: "Aisha" },
  { id: 3, from: "Faculty Park", to: "Main Library", time: "In 15 min", price: 300, seats: 2, owner: "Tunde" },
];

export const TRIPS = [
  { id: 1, from: "Main Gate", to: "Hostel Zone", date: "Today, 4:30 PM", price: 450, status: "upcoming", driver: "Chinedu" },
  { id: 2, from: "Hostel Zone", to: "Faculty Park", date: "Tomorrow, 7:45 AM", price: 300, status: "upcoming", driver: "Aisha" },
  { id: 3, from: "Main Library", to: "Main Gate", date: "Mon, 6:10 PM", price: 450, status: "completed", driver: "Tunde" },
  { id: 4, from: "Main Gate", to: "Engineering Block", date: "Fri, 8:00 AM", price: 350, status: "completed", driver: "Ngozi" },
  { id: 5, from: "Hostel Zone", to: "Main Gate", date: "Thu, 5:20 PM", price: 450, status: "cancelled", driver: "Ibrahim" },
] as const;

export const TXNS = [
  { id: 1, label: "Wallet top up", date: "Today", amount: 5000 },
  { id: 2, label: "Ride: Main Gate to Hostel Zone", date: "Today", amount: -450 },
  { id: 3, label: "Ride: Main Library to Main Gate", date: "Mon", amount: -450 },
  { id: 4, label: "Refund: cancelled ride", date: "Thu", amount: 450 },
  { id: 5, label: "Ride: Main Gate to Engineering Block", date: "Fri", amount: -350 },
];

export const STEPS = [
  { title: "Create your account", text: "Sign up with your school email and verify that you are a student." },
  { title: "Pick a ride at the park", text: "Search your route and join a cab that is already filling up." },
  { title: "Pay your equal share", text: "Your fare is the total split by everyone on board, paid from your wallet." },
  { title: "Confirm face to face", text: "Show your boarding code to the driver and co-riders before you move." },
];

export const TESTIMONIALS = [
  { name: "Ifeoma Okafor", role: "300 level, Law", text: "I stopped haggling at the gate. The fare is split evenly and I can see it before I join." },
  { name: "Tunde Bakare", role: "400 level, Engineering", text: "The park queue tells me when to leave my hostel. I have not missed an 8 AM lecture since." },
  { name: "Aisha Bello", role: "200 level, Medicine", text: "The boarding code makes late evening rides feel a lot safer. I know who I am sitting with." },
  { name: "Emeka Eze", role: "Driver, Hostel Zone route", text: "My cab fills faster and everyone pays the same. No more arguments about change." },
  { name: "Ngozi Adeyemi", role: "100 level, Pharmacy", text: "As a fresher I did not know the routes. The app showed me where to board and what to pay." },
  { name: "Ibrahim Musa", role: "300 level, Accounting", text: "Wallet top up is quick and I can see every naira I spent on transport this month." },
];

export const PLANS = [
  { name: "Rider", price: 0, note: "For everyday rides", features: ["Join unlimited ride shares", "Live park queue access", "Equal-split fares", "Face-to-face boarding check"], cta: "Get started", href: "/find-ride", featured: false },
  { name: "Campus Pass", price: 1500, note: "For daily commuters", features: ["Priority seat in the park queue", "Zero booking fees", "Ride history and receipts", "Wallet cashback on top ups"], cta: "Get the pass", href: "/wallet", featured: true },
  { name: "Driver", price: 3000, note: "For cab owners", features: ["Post unlimited rides", "Verified driver badge", "Earnings dashboard", "Fast payouts to your bank"], cta: "Apply to drive", href: "/drive", featured: false },
];

export const FAQS = [
  { q: "How is the fare split?", a: "The driver sets the total for the trip. Everyone who joins pays an equal share, so the price per person drops as the cab fills." },
  { q: "What is face-to-face boarding verification?", a: "Before the cab leaves, each rider shows a one-time code to the driver. This confirms who is on board and that the right people are in the right cab." },
  { q: "How do I top up my wallet?", a: "Open Wallet, tap Top up and pay by bank transfer or card. The balance updates as soon as the payment clears." },
  { q: "Can I cancel a ride?", a: "Yes. Cancel before the driver starts the trip and your share returns to your wallet straight away." },
  { q: "Who can drive on RydRover?", a: "Any verified cab owner or student driver with a valid licence and an approved vehicle. Apply from the Drive page." },
];

export const POSTS = [
  { slug: "split-fares", category: "Guides", title: "How equal-split fares keep campus rides cheap", excerpt: "A simple breakdown of how the price per person falls as seats fill.", read: "4 min read" },
  { slug: "park-queue", category: "Product", title: "Reading the park queue like a pro", excerpt: "When to leave your hostel, and which parks fill up first on a school day.", read: "3 min read" },
  { slug: "safe-boarding", category: "Safety", title: "Why we verify boarding face to face", excerpt: "The thinking behind boarding codes and what to do if something feels off.", read: "5 min read" },
  { slug: "budget-transport", category: "Money", title: "Budget your transport money for the semester", excerpt: "Three habits that stop transport from eating your allowance.", read: "4 min read" },
  { slug: "driver-tips", category: "Drivers", title: "Five habits of drivers who fill every seat", excerpt: "Timing, pickup points and communication tips from top-rated drivers.", read: "6 min read" },
  { slug: "new-campuses", category: "News", title: "RydRover is heading to more campuses", excerpt: "Where we are launching next and how to bring RydRover to your school.", read: "2 min read" },
];
