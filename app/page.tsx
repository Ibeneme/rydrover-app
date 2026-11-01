import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import LiveRides from "./components/LiveRides";
import Showcase from "./components/home/Showcase";
import HowItWorks from "./components/home/HowItWorks";
import Testimonials from "./components/home/Testimonials";
import Pricing from "./components/Pricing";
import Blog from "./components/home/Blog";
import CtaBand from "./components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <LiveRides showSearch={false} />
      <Showcase />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Blog />
      <CtaBand />
    </>
  );
}
