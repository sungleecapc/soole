import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { getPublishedRankings } from "@/lib/firestore/rankings";
import NextLink from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export default async function RankingsFeedPage() {
  const rankings = await getPublishedRankings();

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-stone-200 dark:selection:bg-stone-800">
      <Header />

      <div className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 max-w-5xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Rankings.
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 font-serif italic max-w-2xl">
            Verified snapshots of what Korea is actually buying.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 gap-8">
          {rankings.length === 0 ? (
            <p className="text-stone-500 italic col-span-2">
              No rankings published yet.
            </p>
          ) : (
            rankings.map((ranking) => (
              <NextLink
                key={ranking.id}
                href={`/rankings/${ranking.slug}`}
                className="group block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
              >
                {ranking.coverImageUrl ? (
                  <div className="relative aspect-video w-full bg-stone-100 dark:bg-stone-950">
                    <Image
                      src={ranking.coverImageUrl}
                      alt={ranking.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-stone-100 dark:bg-stone-950 flex items-center justify-center">
                    <span className="text-stone-300 text-4xl font-bold opacity-20">
                      SOOLE
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-1">
                        {ranking.source}
                      </p>
                      <h2 className="text-xl font-bold">{ranking.title}</h2>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-stone-400" />
                  </div>

                  <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4">
                    {ranking.summary ||
                      `Top ${ranking.items.length} items in ${ranking.category}`}
                  </p>

                  <p className="text-xs text-stone-400">
                    Captured: {ranking.capturedAt}
                  </p>
                </div>
              </NextLink>
            ))
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
