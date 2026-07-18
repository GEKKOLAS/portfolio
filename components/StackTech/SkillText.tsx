"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromRight } from "@/components/utils/motion";
import ColourfulText from "../ui/colourful-text";
import { Bot, Code2, Palette, Sparkles } from "lucide-react";

const aiTools = [
  { name: "Claude", use: "Reasoning & architecture", tone: "from-orange-400/20 to-amber-400/5" },
  { name: "ChatGPT", use: "Research & ideation", tone: "from-emerald-400/20 to-cyan-400/5" },
  { name: "Codex", use: "Agentic development", tone: "from-cyan-400/20 to-blue-400/5" },
  { name: "GitHub Copilot", use: "Coding assistance", tone: "from-blue-400/20 to-violet-400/5" },
  { name: "Midjourney", use: "Visual direction", tone: "from-violet-400/20 to-fuchsia-400/5" },
  { name: "Adobe Firefly", use: "Creative assets", tone: "from-fuchsia-400/20 to-rose-400/5" },
  { name: "Gemini", use: "Multimodal workflows", tone: "from-rose-400/20 to-yellow-400/5" },
];

const SkillText = () => {
  return (
    <div className="w-full">
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/75 p-6 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/75 sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-fuchsia-500">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI-powered toolkit
            </p>
            <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-700 dark:text-fuchsia-300">
              Human-led · AI-accelerated
            </span>
          </div>

          <div className="mt-4 text-2xl font-semibold leading-tight text-zinc-950 dark:text-white sm:text-3xl">
            <ColourfulText text="From robust code to imaginative visual experiences." />
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            I use leading language and creative models to explore ideas, design systems, accelerate implementation, and refine production-ready experiences—always guided by engineering judgment and a clear creative direction.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.45 }}
                className={`group flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-gradient-to-br ${tool.tone} p-3 transition-transform duration-300 hover:-translate-y-1 dark:border-white/10`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/65 text-fuchsia-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-fuchsia-300">
                  {tool.use.includes("Visual") || tool.use.includes("Creative") ? (
                    <Palette className="h-5 w-5" aria-hidden="true" />
                  ) : tool.use.includes("development") || tool.use.includes("Coding") ? (
                    <Code2 className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Bot className="h-5 w-5" aria-hidden="true" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{tool.name}</p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{tool.use}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Prompt engineering", "AI agents", "Code generation", "Image generation", "Multimodal AI"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillText;
