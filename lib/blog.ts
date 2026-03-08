import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

type BlogFrontmatter = {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  coverImage?: string;
  excerpt?: string;
  series?: string;
  seriesOrder?: number;
};

export type BlogPostMeta = BlogFrontmatter;

export type BlogPost = BlogFrontmatter & {
  content: string;
};

function normalizeBlogMarkdown(markdown: string): string {
  // Hashnode exports often wrap images in <kbd>...</kbd>, which can break MDX parsing.
  const withoutKbd = markdown.replace(/<\/?kbd>/gi, "");

  const lines = withoutKbd.split("\n");
  let inCodeFence = false;

  const normalized = lines.map((line) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      return line;
    }

    if (inCodeFence) {
      return line;
    }

    // MDX interprets Java-style generics like List<GrantedAuthority> as JSX tags.
    // Convert only identifier generics to escaped form, while leaving HTML tags (<br />, <h1>, etc.) untouched.
    const normalizedHtmlVoidTags = line.replace(/<hr>/gi, "<hr />").replace(/<br>/gi, "<br />");

    const escapedGenerics = normalizedHtmlVoidTags.replace(
      /([A-Za-z_][A-Za-z0-9_$.]*)<([A-Za-z_][A-Za-z0-9_$.?,\s]*)>/g,
      (_match, left, inner) => `${left}&lt;${inner.trim()}&gt;`
    );

    // MDX evaluates braces in prose as JS expressions.
    // Escape literal braces outside code fences to avoid compile failures from exported markdown.
    return escapedGenerics
      .replace(/&#123;/g, "__LBRACE__")
      .replace(/&#125;/g, "__RBRACE__")
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;")
      .replace(/__LBRACE__/g, "&#123;")
      .replace(/__RBRACE__/g, "&#125;");
  });

  return normalized.join("\n");
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const frontmatter = data as BlogFrontmatter;

  return {
    title: frontmatter.title,
    date: frontmatter.date,
    slug: frontmatter.slug,
    tags: frontmatter.tags ?? [],
    coverImage: frontmatter.coverImage,
    excerpt: frontmatter.excerpt,
    series: frontmatter.series,
    seriesOrder: frontmatter.seriesOrder,
    content: normalizeBlogMarkdown(content)
  };
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getAllBlogSlugs();

  return slugs
    .map((slug): BlogPostMeta | null => {
      const post = getBlogPostBySlug(slug);
      if (!post) {
        return null;
      }

      return {
        title: post.title,
        date: post.date,
        slug: post.slug,
        tags: post.tags,
        ...(post.coverImage ? { coverImage: post.coverImage } : {}),
        ...(post.series ? { series: post.series } : {}),
        ...(typeof post.seriesOrder === "number" ? { seriesOrder: post.seriesOrder } : {}),
        excerpt: post.excerpt ?? "Read this post for practical backend engineering insights."
      };
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function toTagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getUniqueBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      if (tag.trim()) {
        tags.add(tag.trim());
      }
    }
  }

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getPostsByTagSlug(tagSlug: string): BlogPostMeta[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.tags.some((tag) => toTagSlug(tag) === tagSlug));
}

export function toSeriesSlug(series: string): string {
  return series
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getUniqueBlogSeries(): string[] {
  const posts = getAllBlogPosts();
  const seriesSet = new Set<string>();

  for (const post of posts) {
    if (post.series && post.series.trim()) {
      seriesSet.add(post.series.trim());
    }
  }

  return Array.from(seriesSet).sort((a, b) => a.localeCompare(b));
}

export function getPostsBySeriesSlug(seriesSlug: string): BlogPostMeta[] {
  const posts = getAllBlogPosts().filter((post) => post.series && toSeriesSlug(post.series) === seriesSlug);

  return posts.sort((a, b) => {
    const aOrder = typeof a.seriesOrder === "number" ? a.seriesOrder : Number.MAX_SAFE_INTEGER;
    const bOrder = typeof b.seriesOrder === "number" ? b.seriesOrder : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}
