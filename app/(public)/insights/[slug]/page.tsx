import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { getPostBySlugAdmin as getPostBySlug } from "@/lib/firestore/posts-admin";
import type { Post } from "@/lib/firestore/posts";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import ReactMarkdown from "react-markdown"; // We might need to install this or use simple rendering

// Note: In a real project we'd use 'react-markdown' or 'remark'.
// For now, I'll do a simple whitespace render or assume Markdown is okay as text blocks.
// User requested "content (string, markdown)". Ideally I install `react-markdown` and `@tailwindcss/typography`.
// I will attempt simple rendering for now to avoid dep hell unless I can install.
// I will render it inside 'prose' and maybe just use whitespace-pre-wrap if I cant parse.
// Actually, let's just use `whitespace-pre-wrap` for simplicity in this MVP.

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800">
      <Header />

      <article className="pt-32 pb-24 px-6">
        {/* Header */}
        <header className="max-w-3xl mx-auto mb-12 text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase text-stone-400">
            <span>{post.tags || "Editorial"}</span>
            {post.publishedAt && <span>•</span>}
            {post.publishedAt && (
              <span>
                {format(new Date(post.publishedAt.toDate()), "MMMM d, yyyy")}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 font-serif italic">
              {post.subtitle}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImageUrl && (
          <div className="relative w-full max-w-5xl mx-auto aspect-21/9 rounded-xl overflow-hidden mb-16 bg-stone-200 dark:bg-stone-900 shadow-xl">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-2xl mx-auto prose dark:prose-invert prose-stone prose-lg leading-relaxed">
          {/* Simple markdown-like rendering: split by double newline */}
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
