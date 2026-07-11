import React from "react";

export const About = () => {
  return (
    <section className="w-full py-8 sm:py-10 lg:py-12">
      <div className="rounded-[2rem] border border-white/15 bg-white/70 p-6 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.4)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-500">About</p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              I build digital experiences that feel effortless, polished and useful.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              I&apos;m a business-minded developer with a blend of technical depth and creative product thinking.
              My background spans business analysis, digital marketing and software development, helping me connect strategy, engineering and design in a practical way.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Product-minded",
                "Full-stack",
                "AI workflows",
                "Design systems",
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
            <div className="mt-4 rounded-[1.25rem] border border-white/15 bg-zinc-950/90 p-4 text-sm text-zinc-200 shadow-inner">
              <p className="font-medium text-white">Focus areas</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                <li>• Next.js, React and polished front-end systems</li>
                <li>• Azure deployments with pragmatic cloud architecture</li>
                <li>• Product storytelling through motion and interaction</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
