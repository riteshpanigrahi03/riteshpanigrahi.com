import Image from "next/image";
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
      className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      {post.coverImage ? (
        <div className="overflow-hidden border-b border-[var(--border)]">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
      ) : null}

      <div className="p-6">
        <p className="mb-2 text-sm text-[var(--text-secondary)]">{formatDate(post.date)}</p>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
          {post.title}
        </h2>
        <p className="mb-5 leading-7 text-[var(--text-secondary)]">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-200 px-2.5 py-1 text-xs font-medium text-[var(--accent)] dark:border-blue-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
