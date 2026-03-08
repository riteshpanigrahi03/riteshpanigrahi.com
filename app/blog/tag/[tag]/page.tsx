import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog-card";
import { getAllBlogPosts, getPostsByTagSlug, getUniqueBlogTags, toTagSlug } from "@/lib/blog";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getUniqueBlogTags().map((tag) => ({ tag: toTagSlug(tag) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTagSlug(tag);

  if (posts.length === 0) {
    return { title: "Tag Not Found | Blog" };
  }

  const displayTag = posts[0].tags.find((t) => toTagSlug(t) === tag) ?? tag;

  return {
    title: `${displayTag} Blogs | Ritesh Panigrahi`,
    description: `Posts related to ${displayTag}.`
  };
}

export default async function BlogTagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTagSlug(tag);

  if (posts.length === 0) {
    notFound();
  }

  const displayTag = posts[0].tags.find((t) => toTagSlug(t) === tag) ?? tag;

  return (
    <section className="mx-auto max-w-3xl space-y-8 pb-6">
      <header className="space-y-3">
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          <Link href="/blog" className="hover:text-[var(--accent)]">
            Blog
          </Link>{" "}
          / {displayTag}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">{displayTag}</h1>
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
