import React from "react";
import { BoxReveal } from "../magicui/box-reveal";

const roles = [
  {
    period: "Feb 2025 – Present",
    title: "Freelance Full-Stack Developer",
    company: "La Veleta S&S",
    description:
      "Building modern software products with .NET, React, Blazor and Azure DevOps while shaping clean architecture, scalable delivery and product-focused UI experiences.",
    tags: [".NET", "React", "Azure", "Agile"],
    current: true,
  },
  {
    period: "Jan 2024 – Jul 2024",
    title: "Customer Solution Specialist",
    company: "Teleperformance",
    description:
      "Worked across customer support, product education and troubleshooting, strengthening communication and problem-solving in fast-paced environments.",
    tags: ["CRM", "Support", "Training"],
  },
  {
    period: "Jan 2023 – Jan 2024",
    title: "Customer Service Representative",
    company: "Teleperformance",
    description:
      "Delivered service and reservations support while building a sharp eye for user needs, process clarity and multilingual communication.",
    tags: ["Reservations", "Customer care", "Communication"],
  },
  {
    period: "Jan 2019 – Jan 2023",
    title: "Full-Stack .NET Developer",
    company: "Fenix Alliance Group",
    description:
      "Delivered enterprise solutions with ASP.NET Core, React, Razor Pages and Azure DevOps, combining backend stability and elegant front-end delivery.",
    tags: ["ASP.NET", "Entity Framework", "CI/CD"],
  },
];

export const Experience = () => {
  return (
    <section className="w-full py-6 sm:py-8 lg:py-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/70 p-5 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 sm:p-7 xl:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl"
        />

        <BoxReveal boxColor="#FFD600" duration={0.9}>
          <div className="relative mb-7 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-fuchsia-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-500">
                Career journey
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl xl:text-4xl">
              Experience built across technology and people.
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
              A timeline of building software, solving problems and understanding the people behind every product.
            </p>
          </div>
        </BoxReveal>

        <ol className="relative space-y-4 before:absolute before:bottom-5 before:left-[0.42rem] before:top-5 before:w-px before:bg-gradient-to-b before:from-fuchsia-500 before:via-purple-400/60 before:to-transparent sm:space-y-5 sm:before:left-[10.75rem]">
          {roles.map((role) => (
            <li
              key={`${role.company}-${role.period}`}
              className="relative grid grid-cols-[0.9rem_minmax(0,1fr)] gap-3 sm:grid-cols-[9.25rem_1rem_minmax(0,1fr)] sm:gap-4"
            >
              <time className="hidden pt-4 text-right text-[11px] font-semibold uppercase leading-5 tracking-[0.16em] text-zinc-500 dark:text-zinc-400 sm:block">
                {role.period}
              </time>

              <div className="relative flex justify-center pt-5">
                <span
                  className={`relative z-10 h-3 w-3 rounded-full border-2 border-white dark:border-zinc-900 ${
                    role.current
                      ? "bg-fuchsia-500 shadow-[0_0_0_5px_rgba(217,70,239,0.14),0_0_18px_rgba(217,70,239,0.7)]"
                      : "bg-purple-400 shadow-[0_0_0_4px_rgba(192,132,252,0.12)]"
                  }`}
                />
              </div>

              <article className="group rounded-[1.25rem] border border-zinc-200/70 bg-white/55 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/60 hover:bg-white/80 hover:shadow-[0_18px_45px_-28px_rgba(217,70,239,0.6)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-fuchsia-400/30 dark:hover:bg-white/[0.07] sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:hidden">
                  <time className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    {role.period}
                  </time>
                  {role.current && (
                    <span className="rounded-full bg-fuchsia-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-fuchsia-600 dark:text-fuchsia-300">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="mt-2 text-base font-semibold text-zinc-950 dark:text-white sm:mt-0 sm:text-lg">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-fuchsia-600 dark:text-fuchsia-300">
                      {role.company}
                    </p>
                  </div>
                  {role.current && (
                    <span className="hidden rounded-full bg-fuchsia-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-fuchsia-600 dark:text-fuchsia-300 sm:inline-flex">
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {role.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/80 bg-white/70 px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-700 transition-colors group-hover:border-fuchsia-200 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300 dark:group-hover:border-fuchsia-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
