import { ArrowUpRight } from "lucide-react";
import { POSTS } from "../lib/data";
import { display } from "../lib/fonts";

const TINTS = ["bg-[#EAF5EE] text-[#0A5C34]", "bg-[#FDECEE] text-[#E11D2E]", "bg-[#F4F6F3] text-[#0A2A1A]"];

export default function BlogCard({ post, index }: { post: (typeof POSTS)[number]; index: number }) {
  return (
    <article className="group border border-[#0A2A1A]/10 rounded-3xl p-3 bg-white">
      <div className={`${TINTS[index % 3]} rounded-2xl h-44 flex items-end p-5`}>
        <span className={`${display.className} text-5xl font-extrabold opacity-40`}>{post.category}</span>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-[#0A5C34]">{post.category} &middot; {post.read}</p>
        <h3 className={`${display.className} mt-2 text-xl font-bold leading-snug`}>{post.title}</h3>
        <p className="mt-2 text-sm text-[#0A2A1A]/70 leading-relaxed">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#E11D2E]">
          Read more <ArrowUpRight size={16} />
        </span>
      </div>
    </article>
  );
}
