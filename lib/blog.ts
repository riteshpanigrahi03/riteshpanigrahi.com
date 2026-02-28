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
};

export type BlogPostMeta = BlogFrontmatter;

export type BlogPost = BlogFrontmatter & {
  content: string;
};

function normalizeBlogMarkdown(markdown: string): string {
  // Hashnode exports often wrap images in <kbd>...</kbd>, which can break MDX parsing.
  return markdown.replace(/<\/?kbd>/gi, "");
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
        excerpt: post.excerpt ?? "Read this post for practical backend engineering insights."
      };
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
