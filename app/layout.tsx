import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritesh Panigrahi",
  description: "Backend engineer writing about Java, Spring, and distributed systems.",
  icons: {
    icon: "/images/profile_pic.jpg",
    shortcut: "/images/profile_pic.jpg",
    apple: "/images/profile_pic.jpg"
  }
};

const themeInitScript = `
(() => {
  try {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved === "dark" || saved === "light" ? saved : (prefersDark ? "dark" : "light");
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
  } catch (_) {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SiteHeader />
        <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-6 pb-16 sm:px-10">{children}</main>
      </body>
    </html>
  );
}
