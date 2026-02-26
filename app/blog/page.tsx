import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Ritesh Panigrahi",
  description: "Thoughts on Java, Spring, system design, and distributed systems."
};

export default function BlogListPage() {
  const posts = getAllBlogPosts();

  return (
    <section className="mx-auto max-w-3xl space-y-8 pb-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">Blog</h1>
        <p className="max-w-2xl text-[1.04rem] leading-7 text-[var(--text-secondary)]">
          Notes on backend engineering, system design, and practical software architecture.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-6 text-[var(--text-secondary)]">
          No posts yet.
        </p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
