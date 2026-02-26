import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/date";

const linkedInUrl = "https://www.linkedin.com/in/riteshpanigrahi/";

export default function HomePage() {
  const recentPosts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="mx-auto max-w-5xl space-y-10 pb-6">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-start">
          <Image
            src="/images/profile_pic.jpg"
            alt="Ritesh Panigrahi"
            width={220}
            height={220}
            quality={95}
            sizes="(max-width: 768px) 180px, 220px"
            className="mx-auto rounded-full border-4 border-blue-100 bg-white object-cover p-1 shadow-md dark:border-blue-900 md:mx-0"
            priority
          />

          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">Hey, I&apos;m Ritesh.</h1>
            <p className="text-lg font-medium text-[var(--text-secondary)]">
              Backend engineering, distributed systems, and continuous learning.
            </p>
            <div className="h-px w-full bg-[var(--border)]" />
            <div className="space-y-4 text-[1.04rem] leading-8 text-[var(--text-secondary)]">
              <p>
                {/* I&apos;m a backend engineer passionate about Java, Spring, system design, (now AI as well), and building reliable
                distributed systems. */}
                I&apos;m a backend engineer passionate about building reliable systems and exploring technologies like Java, Spring, system design, and now AI.
              </p>
              <p>
                I enjoy breaking down complex ideas into simple, structured explanations, both for myself and for
                others walking a similar path.
              </p>
              <p>
                I believe the best way to learn is to build and to teach. This space is where I share what I&apos;m
                learning, what I&apos;m building, and the engineering lessons I gather along the way.
              </p>
              <p>Still learning. Still improving.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[var(--accent-hover)] hover:shadow-md"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M6.94 8.48v8.56H4.09V8.48h2.85ZM5.51 7.31c-.91 0-1.51-.64-1.51-1.44s.61-1.44 1.54-1.44c.93 0 1.51.63 1.53 1.44 0 .8-.6 1.44-1.56 1.44Zm12.49 4.82v4.91h-2.85v-4.58c0-1.15-.41-1.94-1.44-1.94-.79 0-1.26.53-1.47 1.04-.08.18-.1.43-.1.68v4.8H9.29s.04-7.79 0-8.56h2.85v1.21l-.02.03h.02v-.03c.38-.59 1.07-1.43 2.61-1.43 1.9 0 3.33 1.24 3.33 3.9Z" />
                </svg>
                Connect on LinkedIn
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Read My Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Recent Blogs</h2>
          <Link href="/blog" className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]">
            View all blogs
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-[var(--text-secondary)]">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-[var(--border)] px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <p className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">{post.title}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{formatDate(post.date)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
