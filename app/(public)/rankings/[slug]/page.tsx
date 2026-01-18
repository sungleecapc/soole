import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { getRankingBySlug } from "@/lib/firestore/rankings";
import { notFound } from "next/navigation";
import Image from "next/image";
import NextLink from "next/link";
import { ExternalLink } from "lucide-react";

export const revalidate = 60;

export default async function RankingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const ranking = await getRankingBySlug(slug);

  if (!ranking) notFound();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800">
      <Header />

      <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <NextLink
            href="/rankings"
            className="text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 mb-6 inline-block"
          >
            ← Back to Rankings
          </NextLink>
          <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-stone-400 mb-4">
            <span>{ranking.source}</span>
            <span>•</span>
            <span>{ranking.category}</span>
            <span>•</span>
            <span>Captured {ranking.capturedAt}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            {ranking.title}
          </h1>
          {ranking.summary && (
            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic max-w-2xl border-l-2 border-stone-200 dark:border-stone-800 pl-6">
              {ranking.summary}
            </p>
          )}
        </header>

        {/* Ranking List */}
        <section className="space-y-4">
          {ranking.items
            .sort((a, b) => a.rank - b.rank)
            .map((item) => (
              <div
                key={item.rank}
                className="flex gap-6 p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 items-start hover:border-stone-200 dark:hover:border-stone-700 transition-colors"
              >
                <div className="text-4xl font-bold text-stone-200 dark:text-stone-800 font-serif w-12 text-center shrink-0">
                  {item.rank}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-500">
                    {item.brand}
                  </p>
                  <h3 className="text-xl font-bold mb-2">
                    {item.productUrl ? (
                      <a
                        href={item.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline decoration-stone-300 underline-offset-4 flex items-center gap-2"
                      >
                        {item.productName}{" "}
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </a>
                    ) : (
                      item.productName
                    )}
                  </h3>
                  {item.notes && (
                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed bg-stone-50 dark:bg-stone-950 p-3 rounded-md mt-3 inline-block">
                      <span className="font-bold text-xs text-stone-400 uppercase mr-2">
                        Observed:
                      </span>
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </section>
      </article>

      <Footer />
    </main>
  );
}
