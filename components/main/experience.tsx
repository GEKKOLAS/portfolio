import React from "react";
import { BoxReveal } from "../magicui/box-reveal";

const roles = [
  {
    period: "Feb 2025 – Present",
    title: "Freelance full-stack developer at La Veleta S&S",
    description:
      "Building modern software products with .NET, React, Blazor and Azure DevOps while shaping clean architecture, scalable delivery and product-focused UI experiences.",
    tags: [".NET", "React", "Azure", "Agile"],
  },
  {
    period: "Jan 2024 – Jul 2024",
    title: "Customer Solution Specialist at Teleperformance",
    description:
      "Worked across customer support, product education and troubleshooting, strengthening communication and problem-solving in fast-paced environments.",
    tags: ["CRM", "Support", "Training"],
  },
  {
    period: "Jan 2023 – Jan 2024",
    title: "Customer Service Representative at Teleperformance",
    description:
      "Delivered service and reservations support while building a sharp eye for user needs, process clarity and multilingual communication.",
    tags: ["Reservations", "Customer care", "Communication"],
  },
  {
    period: "Jan 2019 – Jan 2023",
    title: "Full Stack .NET Developer at Fenix Alliance Group",
    description:
      "Delivered enterprise solutions with ASP.NET Core, React, Razor Pages and Azure DevOps, combining backend stability and elegant front-end delivery.",
    tags: ["ASP.NET", "Entity Framework", "CI/CD"],
  },
];

export const Experience = () => {
  return (
    <section className="w-full py-8 sm:py-10 lg:py-12">
      <div className="rounded-[2rem] border border-white/15 bg-white/70 p-6 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/70 sm:p-8">
        <BoxReveal boxColor="#FFD600" duration={0.9}>
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-500">Experience</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              A path shaped by software craft, operations and growth.
            </h2>
          </div>
        </BoxReveal>

        <ol className="relative space-y-4">
          {roles.map((role, index) => (
            <li key={role.title} className="relative">
              <div className="absolute left-0 top-4 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-fuchsia-500 shadow-[0_0_0_6px_rgba(244,114,182,0.16)] dark:border-zinc-900" />
              <div className="ml-5 rounded-[1.25rem] border border-white/10 bg-zinc-950/5 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:bg-white/5">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  <time>{role.period}</time>
                  <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-2 py-1 text-[10px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                    #{index + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-zinc-950 dark:text-white">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {role.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
