"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromRight } from "@/components/utils/motion";
import ColourfulText from "../ui/colourful-text";

const SkillText = () => {
  return (
    <div className="w-full">
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="rounded-[2rem] border border-white/15 bg-white/70 p-6 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 sm:p-8"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-500">Toolkit</p>
        <div className="mt-3 text-2xl font-semibold leading-tight text-zinc-950 dark:text-white sm:text-3xl">
          <ColourfulText text="I craft polished digital experiences with modern tools, thoughtful systems and motion-driven detail." />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "React",
            "Next.js",
            "Azure",
            "Design systems",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillText;
