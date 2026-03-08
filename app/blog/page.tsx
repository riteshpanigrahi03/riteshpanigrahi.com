import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { getAllBlogPosts, getUniqueBlogSeries, getUniqueBlogTags, toSeriesSlug, toTagSlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Ritesh Panigrahi",
  description: "Thoughts on Java, Spring, system design, and distributed systems."
};

export default function BlogListPage() {
  const posts = getAllBlogPosts();
  const tags = getUniqueBlogTags();
  const series = getUniqueBlogSeries();

  return (
    <section className="mx-auto max-w-5xl space-y-8 pb-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">Blog</h1>
        <p className="max-w-2xl text-[1.04rem] leading-7 text-[var(--text-secondary)]">
          Notes on backend engineering, system design, and practical software architecture.
        </p>
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div>
          {posts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-6 text-[var(--text-secondary)]">
              No posts yet.
            </p>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          {series.length > 0 ? (
            <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">Browse by series</p>
              <div className="flex flex-wrap gap-2">
                {series.map((name) => (
                  <Link
                    key={name}
                    href={`/series/${toSeriesSlug(name)}`}
                    className="rounded-full border border-blue-200 px-3 py-1 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-slate-900"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {tags.length > 0 ? (
            <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">Browse by topic</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${toTagSlug(tag)}`}
                    className="rounded-full border border-blue-200 px-3 py-1 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-slate-900"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
