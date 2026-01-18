"use client";
import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Collect Signals",
    desc: "Weekly aggregation of purchase data from trusted Korean platforms.",
  },
  {
    id: "02",
    title: "Normalize",
    desc: "Filtering out promotional spikes to find true repurchase value.",
  },
  {
    id: "03",
    title: "Synthesize",
    desc: "Translating nuanced reviews into clear, comparable insights.",
  },
  {
    id: "04",
    title: "Publish",
    desc: "A curated list of what remains essential.",
  },
];

export function Method() {
  return (
    <section className="py-24 max-w-5xl mx-auto px-6" id="method">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
        <h2 className="text-3xl font-light tracking-widest uppercase text-stone-900 dark:text-stone-100">
          Method
        </h2>
        <p className="text-stone-500 dark:text-stone-400 max-w-xs mt-4 md:mt-0 font-serif italic">
          We filter the noise to reveal the signal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 group"
          >
            <span className="text-xs font-mono text-stone-400 dark:text-stone-600 border-b border-stone-200 dark:border-stone-800 pb-2 block w-full">
              {step.id}
            </span>
            <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 group-hover:text-amber-700/80 dark:group-hover:text-amber-200/80 transition-colors">
              {step.title}
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
