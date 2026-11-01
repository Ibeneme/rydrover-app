import PageHeader from "../components/PageHeader";
import BlogCard from "../components/BlogCard";
import { POSTS } from "../lib/data";

export const metadata = { title: "Blog | RydRover" };

export default function BlogPage() {
  return (
    <>
      <PageHeader tag="RydRover blog" title="News and articles from the park" sub="Guides, product updates and safety tips for riders and drivers." />
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map((p, i) => <BlogCard key={p.slug} post={p} index={i} />)}
      </section>
    </>
  );
}
