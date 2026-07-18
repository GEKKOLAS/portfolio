import React from "react";
import { BriefcaseBusiness, Code2, Headphones, Sparkles } from "lucide-react";

const focusAreas = [
  {
    title: "AI-driven design",
    description: "Creative direction, generative workflows and original visual concepts shaped from imagination.",
    icon: Sparkles,
  },
  {
    title: "Modern engineering",
    description: "Current frameworks, scalable architecture and polished full-stack product experiences.",
    icon: Code2,
  },
  {
    title: "Project management",
    description: "A growing interest in planning, coordination and turning product goals into clear delivery paths.",
    icon: BriefcaseBusiness,
  },
  {
    title: "IT support",
    description: "Interested in help desk operations, practical troubleshooting and dependable user support.",
    icon: Headphones,
  },
];

export const About = () => {
  return (
    <section className="w-full py-8 sm:py-10 lg:py-12">
      <div className="rounded-[2rem] border border-white/15 bg-white/70 p-6 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.4)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-500">About</p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              I combine engineering, AI and imagination to create digital experiences with their own identity.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              I&apos;m a business-minded developer with a blend of technical depth and creative product thinking.
              My background spans business analysis, digital marketing and software development, helping me connect strategy, engineering and design in a practical way. I use AI as a creative partner to explore visual directions while developing original concepts from my own imagination—not simply reproducing existing designs.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              I stay curious about the latest frameworks and product practices, and I&apos;m also expanding toward project management and IT help desk work, where communication, organization and practical problem-solving matter as much as technical execution.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Product-minded",
                "Full-stack",
                "AI creative direction",
                "Original design",
                "Continuous learning",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-fuchsia-700 dark:text-fuchsia-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 via-violet-400/10 to-cyan-400/10 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-700 dark:bg-zinc-950/70 dark:text-zinc-200">
                Currently shaping
              </span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Available for freelance
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {focusAreas.map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="group rounded-[1.25rem] border border-white/15 bg-zinc-950/90 p-4 text-zinc-200 shadow-inner transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-zinc-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
