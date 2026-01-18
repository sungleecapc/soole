"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function YouTubePage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-stone-200 dark:selection:bg-stone-800">
      <Header />

      <article className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 max-w-4xl mx-auto space-y-24 md:space-y-32">
        {/* 1) Hero Section */}
        <section className="space-y-8 text-center max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            SOOLE on YouTube
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 font-serif italic"
          >
            Translating Korean beauty choices into clear, long-term insights.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base"
            >
              <Link
                href="https://www.youtube.com/@SooleBeauty"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="mr-2 w-4 h-4 fill-current" /> Watch on YouTube
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base border-stone-300 dark:border-stone-700 bg-transparent hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              <Link href="#formats">How to watch</Link>
            </Button>
          </motion.div>
        </section>

        {/* 2) What this channel is about */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
            Channel Focus
          </h2>
          <div className="prose dark:prose-invert prose-stone prose-lg leading-relaxed max-w-none">
            <p>
              The SOOLE YouTube channel is a visual record of the Korean beauty
              market. We focus on{" "}
              <span className="font-semibold text-stone-900 dark:text-white">
                what stays popular
              </span>{" "}
              in Korea, precisely when it disappears, and the subtle shifts in
              how consumers choose skincare.
            </p>
            <p>
              We prioritize interpretation over enumeration. A list of products
              is just data; understanding <em>why</em> a texture trend shifted
              or why a brand fell out of favor is insight.
            </p>
          </div>
        </section>

        {/* 3) What you will (and won't) see */}
        <section className="grid md:grid-cols-2 gap-12 md:gap-24 border-t border-stone-200 dark:border-stone-800 pt-12 md:pt-16">
          <div>
            <h3 className="text-xl font-serif italic mb-6">
              What you will see
            </h3>
            <ul className="space-y-4 text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-600">•</span>
                <span>Long-term ranking analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-600">•</span>
                <span>Category-specific patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-600">•</span>
                <span>Context for cultural shifts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-600">•</span>
                <span>Calm, documentary-style storytelling</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif italic mb-6 text-stone-400 dark:text-stone-500">
              What you won't see
            </h3>
            <ul className="space-y-4 text-stone-500 dark:text-stone-500">
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-700">×</span>
                <span>Sponsored "morning routines"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-700">×</span>
                <span>Influencer hype cycles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-700">×</span>
                <span>"Top 10 You Must Buy" urgency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-stone-300 dark:text-stone-700">×</span>
                <span>Aggressive product pushing</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4) Video formats */}
        <section id="formats">
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-8">
            Core Formats
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-stone-100/50 dark:bg-stone-900/30 p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Monthly Insights</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                A review of the previous month's ranking shifts. We filter out
                the noise to highlight the products that actually gained
                traction.
              </p>
            </div>
            <div className="bg-stone-100/50 dark:bg-stone-900/30 p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Category Deep Dives</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                Focused examinations of a specific sector (e.g., Toner Pads,
                Sunscreen) to understand the current standard of quality.
              </p>
            </div>
            <div className="bg-stone-100/50 dark:bg-stone-900/30 p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Stayed vs. Faded</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                Retrospective analysis. We look back at viral hits from 6-12
                months ago to see which ones are still being repurchased.
              </p>
            </div>
            <div className="bg-stone-100/50 dark:bg-stone-900/30 p-8 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Cultural Notes</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                Short essays on broader shifts in Korean lifestyle and aesthetic
                preferences that influence skincare choices.
              </p>
            </div>
          </div>
        </section>

        {/* 5) How often & 6) Why YouTube */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <section>
            <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
              Frequency
            </h2>
            <p className="text-lg text-stone-800 dark:text-stone-200 leading-relaxed">
              We publish periodically, prioritizing consistency of thought over
              volume of content. We do not chase the algorithm.
            </p>
          </section>
          <section>
            <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
              Why Video
            </h2>
            <p className="text-lg text-stone-800 dark:text-stone-200 leading-relaxed">
              Video allows us to control pacing and emphasis. It provides visual
              continuity over time, allowing viewers to see the texture and
              reality of the market in a way text cannot convey.
            </p>
          </section>
        </div>

        {/* 7) Closing */}
        <section className="pt-12 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="text-2xl md:text-3xl font-serif italic text-stone-800 dark:text-stone-200 mb-6 max-w-lg">
              "SOOLE — What is quietly chosen."
            </p>
            <p className="text-stone-500 text-sm">
              © {new Date().getFullYear()} SOOLE. All rights reserved.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 h-12 text-base shadow-xl"
          >
            <Link
              href="https://www.youtube.com/@SooleBeauty"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe to Channel <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </section>
      </article>

      <Footer />
    </main>
  );
}
