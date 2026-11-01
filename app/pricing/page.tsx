import PageHeader from "../components/PageHeader";
import Pricing from "../components/Pricing";
import SectionHeading from "../components/SectionHeading";
import Faq from "../components/Faq";

export const metadata = { title: "Pricing | RydRover" };

export default function PricingPage() {
  return (
    <>
      <PageHeader tag="Pricing" title="Simple plans, fair fares" sub="Riding is free. Upgrade for priority seats or start earning as a driver." />
      <Pricing />
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
        <SectionHeading tag="FAQ" title="Questions about plans" />
        <div className="mt-12"><Faq /></div>
      </section>
    </>
  );
}
