import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getUniqueBlogSeries, toSeriesSlug } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Series | Ritesh Panigrahi",
  description: "Browse blog series."
};

export default function SeriesPage() {
  const posts = getAllBlogPosts();
  const seriesList = getUniqueBlogSeries();

  const counts = new Map<string, number>();
  for (const post of posts) {
    if (post.series) {
      counts.set(post.series, (counts.get(post.series) ?? 0) + 1);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8 pb-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">Series</h1>
        <p className="max-w-2xl text-[1.04rem] leading-7 text-[var(--text-secondary)]">Browse posts grouped as learning series.</p>
        <p className="text-sm font-medium text-[var(--text-secondary)]">{seriesList.length} series</p>
      </header>

      {seriesList.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-6 text-[var(--text-secondary)]">
          No series yet.
        </p>
      ) : (
        <div className="grid gap-4">
          {seriesList.map((series) => (
            <Link
              key={series}
              href={`/series/${toSeriesSlug(series)}`}
              className="group block rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xl font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
                {series}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {counts.get(series) ?? 0} {(counts.get(series) ?? 0) === 1 ? "post" : "posts"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
