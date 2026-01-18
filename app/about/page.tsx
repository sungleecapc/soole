"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-stone-200 dark:selection:bg-stone-800">
      <Header />

      <article className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 max-w-3xl mx-auto space-y-24 md:space-y-32">
        {/* 1) Hero Section */}
        <section className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            What is quietly chosen.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 font-serif italic"
          >
            SOOLE observes the slow, deliberate movement of Korean beauty
            choices over time.
          </motion.p>
        </section>

        {/* 2) Why SOOLE Exists */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
            Why We Exist
          </h2>
          <div className="prose dark:prose-invert prose-stone prose-lg leading-relaxed">
            <p>
              The global conversation around Korean beauty is often dominated by
              speed. New launches, viral TikTok trends, and the 10-step routine
              of the month.
            </p>
            <p>
              But inside Korea, the reality is different. Consumers choose
              products slowly. They repurchase what works. They trust
              consistency over novelty. SOOLE exists to bridge this gap—moving
              the focus from what is loud to what is lasting.
            </p>
          </div>
        </section>

        {/* 3) Meaning */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
            The Name
          </h2>
          <div className="prose dark:prose-invert prose-stone prose-lg leading-relaxed">
            <p>
              <span className="font-bold">SOOLE (술레)</span> refers to the
              "seeker" or "tagger" in a game of hide-and-seek. It implies
              looking for something that is hidden.
            </p>
            <p>
              For us, it represents the act of discovering value that isn't
              immediately obvious. In skincare, the best products are often
              "hidden" in plain sight—quietly building trust on bathroom shelves
              for years, rather than shouting from billboards.
            </p>
          </div>
        </section>

        {/* 4) What We Do */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
            Our Work
          </h2>
          <div className="prose dark:prose-invert prose-stone prose-lg leading-relaxed">
            <p>
              We track public signals. By analyzing ranking data, repurchase
              rates, and long-term bestseller lists across major Korean
              platforms, we identify patterns that single data points miss.
            </p>
            <p>
              We observe movement. Does a product spike and crash, or does it
              climb slowly and stay? We interpret these patterns to explain{" "}
              <em>why</em> a product matters, not just <em>that</em> it is
              trending.
            </p>
          </div>
        </section>

        {/* 5) What We Are Not */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
            What We Are Not
          </h2>
          <div className="prose dark:prose-invert prose-stone prose-lg leading-relaxed">
            <p>
              SOOLE does not sell products. We do not accept payment to promote
              brands or influencers. We are not a trend forecasting agency
              driven by hype cycles.
            </p>
            <p>
              Our independence is our currency. We are a neutral observer of the
              market.
            </p>
          </div>
        </section>

        {/* 6) Who It's For */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6">
            For the Curious
          </h2>
          <div className="prose dark:prose-invert prose-stone prose-lg leading-relaxed">
            <p>
              This platform is for those who already know where to shop but want
              to know <em>what</em> to choose. It is for those who seek context,
              not pressure. It is for anyone curious about the culture of Korean
              beauty beyond the marketing surface.
            </p>
          </div>
        </section>

        {/* 7) Closing */}
        <section className="pt-12 border-t border-stone-200 dark:border-stone-800">
          <p className="text-2xl md:text-3xl font-serif italic text-stone-800 dark:text-stone-200 mb-4">
            "SOOLE — What is quietly chosen."
          </p>
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} SOOLE. All rights reserved.
          </p>
        </section>
      </article>

      <Footer />
    </main>
  );
}
