# Minimal Personal Website (Next.js + TypeScript + Tailwind)

A clean personal website with:

- Home page (`/`)
- Blog listing (`/blog`)
- Blog detail (`/blog/[slug]`)
- MDX-based blog content from `content/blog`
- Static generation for blog routes
- Dark mode support

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX rendering with syntax highlighting

## Folder Structure

```txt
app/
components/
content/blog/
lib/
public/
```

## Blog Frontmatter

Each post in `content/blog/*.mdx` supports:

- `title`
- `date`
- `slug`
- `tags`
- `coverImage` (optional)
- `excerpt` (optional)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

This project is ready to deploy on Vercel.
