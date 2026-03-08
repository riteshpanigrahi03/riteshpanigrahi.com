import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog-card";
import { getPostsBySeriesSlug, getUniqueBlogSeries, toSeriesSlug } from "@/lib/blog";

type SeriesDetailPageProps = {
  params: Promise<{ series: string }>;
};

export function generateStaticParams() {
  return getUniqueBlogSeries().map((series) => ({ series: toSeriesSlug(series) }));
}

export async function generateMetadata({ params }: SeriesDetailPageProps): Promise<Metadata> {
  const { series } = await params;
  const posts = getPostsBySeriesSlug(series);

  if (posts.length === 0) {
    return { title: "Series Not Found | Ritesh Panigrahi" };
  }

  const name = posts[0].series ?? series;
  return {
    title: `${name} | Series`,
    description: `Posts in ${name} series.`
  };
}

export default async function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const { series } = await params;
  const posts = getPostsBySeriesSlug(series);

  if (posts.length === 0) {
    notFound();
  }

  const seriesName = posts[0].series ?? series;

  return (
    <section className="mx-auto max-w-3xl space-y-8 pb-6">
      <header className="space-y-3">
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          <Link href="/series" className="hover:text-[var(--accent)]">
            Series
          </Link>{" "}
          / {seriesName}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">{seriesName}</h1>
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <div className="grid gap-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
