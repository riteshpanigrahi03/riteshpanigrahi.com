import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/date";

type BlogCardProps = {
  post: BlogPostMeta;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="mb-2 text-sm text-[var(--text-secondary)]">{formatDate(post.date)}</p>
      <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
        {post.title}
      </h2>
    </Link>
  );
}
