import Link from "next/link";
import { POSTS } from "../../lib/data";
import SectionHeading from "../SectionHeading";
import BlogCard from "../BlogCard";

export default function Blog() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionHeading tag="RydRover blog" title={<>News and articles<br />from the park</>} />
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {POSTS.slice(0, 3).map((p, i) => <BlogCard key={p.slug} post={p} index={i} />)}
      </div>
      <div className="mt-10 text-center">
        <Link href="/blog" className="inline-block border-2 border-[#0A5C34] text-[#0A5C34] hover:bg-[#EAF5EE] transition-colors px-7 py-3 rounded-full font-bold">View all articles</Link>
      </div>
    </section>
  );
}
