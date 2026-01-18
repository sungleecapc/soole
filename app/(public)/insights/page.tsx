import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { getPublishedPosts } from "@/lib/firestore/posts";
import { Link } from "lucide-react";
import NextLink from "next/link";
import { format } from "date-fns";
import Image from "next/image";

export const revalidate = 60; // ISR everyone 60 seconds

export default async function InsightsPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800">
      <Header />

      <div className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Insights.
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 font-serif italic max-w-2xl">
            Observations on Korean beauty culture, market shifts, and what
            lasts.
          </p>
        </header>

        <section className="space-y-12">
          {posts.length === 0 ? (
            <p className="text-stone-500 italic">No insights published yet.</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="group">
                <NextLink
                  href={`/insights/${post.slug}`}
                  className="block space-y-4"
                >
                  {post.coverImageUrl && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-md bg-stone-200 dark:bg-stone-900">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-stone-400">
                      <span>{post.tags || "Editorial"}</span>
                      {post.publishedAt && <span>•</span>}
                      {post.publishedAt && (
                        <span>
                          {format(
                            new Date(post.publishedAt.seconds * 1000),
                            "MMMM d, yyyy",
                          )}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold group-hover:underline decoration-stone-300 dark:decoration-stone-700 underline-offset-4">
                      {post.title}
                    </h2>
                    {post.subtitle && (
                      <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                        {post.subtitle}
                      </p>
                    )}
                  </div>
                </NextLink>
              </article>
            ))
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
