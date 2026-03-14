import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { formatDate } from "@/lib/date";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type TocItem = {
  id: string;
  level: 2 | 3;
  title: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function flattenText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(flattenText).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    return flattenText((node as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
}

function cleanHeading(rawHeading: string): string {
  return rawHeading
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

function extractToc(source: string): TocItem[] {
  const lines = source.split("\n");
  const items: TocItem[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) {
      continue;
    }

    const level = match[1].length as 2 | 3;
    const title = cleanHeading(match[2]);
    if (!title) {
      continue;
    }

    items.push({
      id: slugify(title),
      level,
      title
    });
  }

  return items;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  return {
    title: `${post.title} | Ritesh Panigrahi`,
    description: post.excerpt ?? "A backend engineering article by Ritesh Panigrahi."
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = extractToc(post.content);

  return (
    <article className="mx-auto max-w-3xl pb-8">
      {post.coverImage ? (
        <div className="mb-8 overflow-hidden rounded-xl border border-[var(--border)]">
          <Image src={post.coverImage} alt={post.title} width={1600} height={840} className="h-auto w-full" priority />
        </div>
      ) : null}

      <header className="mb-10 border-b border-[var(--border)] pb-7">
        <p className="mb-3 text-sm font-medium text-[var(--text-secondary)]">{formatDate(post.date)}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">{post.title}</h1>
      </header>

      {toc.length > 0 ? (
        <aside className="mb-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">Table of Contents</h2>
          <ul className="space-y-2">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? "ml-4" : undefined}>
                <a href={`#${item.id}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <section className="prose-content">
        <MDXRemote
          source={post.content}
          components={{
            pre: ({ children, ...props }) => {
              if (children && typeof children === "object" && "props" in children) {
                const codeElement = children as { props?: { className?: string; children?: ReactNode } };
                const className = codeElement.props?.className ?? "";

                if (className.includes("language-mermaid")) {
                  const chart = flattenText(codeElement.props?.children).trim();
                  return <MermaidDiagram chart={chart} />;
                }
              }

              return <pre {...props}>{children}</pre>;
            },
            h2: ({ children, ...props }) => {
              const heading = flattenText(children);
              return (
                <h2 id={slugify(heading)} className="scroll-mt-24" {...props}>
                  {children}
                </h2>
              );
            },
            h3: ({ children, ...props }) => {
              const heading = flattenText(children);
              return (
                <h3 id={slugify(heading)} className="scroll-mt-24" {...props}>
                  {children}
                </h3>
              );
            }
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight]
            }
          }}
        />
      </section>

      <footer className="mt-14 border-t border-[var(--border)] pt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-200 px-3 py-1 text-xs font-medium text-[var(--accent)] dark:border-blue-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
