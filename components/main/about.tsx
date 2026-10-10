"use client";

import Image from "next/image";
import React, { type ReactNode, useState } from "react";
import { BriefcaseBusiness, Code2, Headphones, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/lib/use-tilt";

const focusAreas = [
  {
    title: "AI-driven design",
    short: "Generative, original visuals",
    description: "Creative direction, generative workflows and original visual concepts shaped from imagination.",
    icon: Sparkles,
  },
  {
    title: "Modern engineering",
    short: "Scalable full-stack products",
    description: "Current frameworks, scalable architecture and polished full-stack product experiences.",
    icon: Code2,
  },
  {
    title: "Project management",
    short: "Planning and delivery",
    description: "A growing interest in planning, coordination and turning product goals into clear delivery paths.",
    icon: BriefcaseBusiness,
  },
  {
    title: "IT support",
    short: "Help desk and troubleshooting",
    description: "Interested in help desk operations, practical troubleshooting and dependable user support.",
    icon: Headphones,
  },
];

const background = [
  { step: "01", title: "Business analysis", color: "#FACC15" },
  { step: "02", title: "Digital marketing", color: "#EC4899" },
  { step: "03", title: "Software development", color: "#A855F7" },
];

const sinceStack = [".NET", "React", "Blazor", "Azure"];

// Animated WebP rendition of the sticker: same frames as giphy.gif at about half the weight.
const ALIEN_STICKER =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5sbWs3YXBlemNjdWtzeGZ3eWI0bW5wZWhvdTZsNmN4b3k5bmZtZyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/qlOso7alCUTiAX7aG5/giphy.webp";

// No backdrop-blur on these blocks: six blurred layers are costly to composite.
const block =
  "relative overflow-hidden rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-6 dark:border-white/10 dark:bg-zinc-900/70";
const label = "text-[11px] font-semibold uppercase tracking-[0.22em]";

// Same cursor-reactive tilt and glow as the project cards. `span` goes on the
// perspective wrapper, which is the actual grid item.
function BentoBlock({ span, className, children }: { span: string; className?: string; children: ReactNode }) {
  const tilt = useTilt<HTMLDivElement>();

  return (
    <div className={cn("project-card-scene", span)}>
      <div {...tilt} className={cn("project-card h-full", block, className)}>
        <div className="project-card-glow" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

export const About = () => {
  const [activeArea, setActiveArea] = useState<number | null>(null);

  return (
    <section className="w-full py-10">
      <div className="grid gap-3 lg:grid-cols-6">
        <BentoBlock span="lg:col-span-4 lg:row-span-2" className="flex flex-col justify-between gap-6 p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 bg-[radial-gradient(circle,rgba(217,70,239,0.22),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/2 h-[260px] w-[260px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_70%)]"
          />
          {/* The sticker's own animation has the alien lean in from its right edge and wave,
              so pinning it flush to the block's right edge makes it peek out from the border. */}
          <Image
            src={ALIEN_STICKER}
            alt=""
            aria-hidden="true"
            width={200}
            height={432}
            unoptimized
            className="pointer-events-none absolute -bottom-3 right-0 h-56 w-auto select-none motion-reduce:hidden sm:h-72 lg:h-[88%]"
          />
          <p className="relative text-xs uppercase tracking-[0.35em] text-fuchsia-500">About</p>
          <div className="relative pr-20 sm:pr-28">
            <h2 className="max-w-[22ch] text-balance text-[28px] font-semibold leading-[1.12] tracking-tight text-zinc-950 dark:text-white lg:text-4xl">
              I combine{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">engineering</span>,{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">AI</span> and{" "}
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">imagination</span>{" "}
              to create digital experiences with their own identity.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
              I’m a business-minded developer with a blend of technical depth and creative product thinking.
            </p>
          </div>
        </BentoBlock>

        <BentoBlock span="lg:col-span-2" className="bg-gradient-to-br from-cyan-400/10 to-white/70 dark:to-zinc-900/75">
          <p className={`${label} text-cyan-700 dark:text-cyan-300`}>Building software since</p>
          <p className="mt-3 text-[52px] font-bold leading-none tracking-tighter text-zinc-950 dark:text-white">2019</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {sinceStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[11.5px] text-cyan-800 dark:text-cyan-200"
              >
                {tech}
              </li>
            ))}
          </ul>
        </BentoBlock>

        <BentoBlock span="lg:col-span-2" className="border-green-400/20 bg-gradient-to-br from-green-400/10 to-white/70 dark:border-green-400/20 dark:to-zinc-900/75">
          <p className={`${label} flex items-center gap-2 text-green-700 dark:text-green-300`}>
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_#4ADE80]" />
            Status
          </p>
          <p className="mt-3 text-xl font-semibold text-zinc-950 dark:text-white">Available for freelance</p>
          <a
            href="https://wa.me/573125720170"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[13px] font-semibold text-green-700 transition-colors hover:text-green-600 dark:text-green-300 dark:hover:text-green-200"
          >
            Start a project ↗
          </a>
        </BentoBlock>

        <BentoBlock span="lg:col-span-3" className="border-fuchsia-400/25 bg-[radial-gradient(circle_at_0%_0%,rgba(217,70,239,0.16),transparent_55%)] dark:border-fuchsia-400/25">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 right-5 font-serif text-[140px] leading-none text-fuchsia-500/10 dark:text-fuchsia-300/10"
          >
            “
          </span>
          <p className={`${label} relative text-fuchsia-600 dark:text-fuchsia-300`}>How I use AI</p>
          <p className="relative mt-3 text-[17px] font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
            As a creative partner to explore visual directions — developing original concepts from my own imagination, not simply reproducing existing designs.
          </p>
        </BentoBlock>

        <BentoBlock span="lg:col-span-3">
          <p className={`${label} text-zinc-500 dark:text-zinc-400`}>Where I come from</p>
          <ol className="relative mt-5 grid grid-cols-3">
            <li
              aria-hidden="true"
              className="absolute left-[14%] right-[14%] top-[15px] h-px bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
            />
            {background.map(({ step, title, color }) => (
              <li key={step} className="relative flex flex-col items-center gap-2.5 text-center">
                <span
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full border bg-white text-[11px] font-semibold dark:bg-zinc-900"
                  style={{ borderColor: color, color, boxShadow: `0 0 14px ${color}66` }}
                >
                  {step}
                </span>
                <span className="text-[13px] font-semibold text-zinc-950 dark:text-white">{title}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[12.5px] text-zinc-500">
            That mix is why I connect strategy, engineering and design in a practical way.
          </p>
        </BentoBlock>

        <BentoBlock span="lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={`${label} text-zinc-500 dark:text-zinc-400`}>Currently shaping</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-600">Hover to read more</p>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {focusAreas.map(({ title, short, description, icon: Icon }, index) => {
              const isActive = activeArea === index;
              return (
                <li
                  key={title}
                  tabIndex={0}
                  onMouseEnter={() => setActiveArea(index)}
                  onMouseLeave={() => setActiveArea(null)}
                  onFocus={() => setActiveArea(index)}
                  onBlur={() => setActiveArea(null)}
                  className="rounded-[1.25rem] border border-zinc-200/70 bg-white/55 p-4 outline-none transition-all duration-300 hover:-translate-y-[3px] hover:border-fuchsia-400/35 hover:bg-fuchsia-500/[0.06] focus-visible:border-fuchsia-400/35 focus-visible:bg-fuchsia-500/[0.06] dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-zinc-950 dark:text-white">{title}</h3>
                  {/* Both lines share one grid cell so the card keeps the taller height and the row never jumps. */}
                  <div className="mt-1 grid text-xs leading-5">
                    <p
                      aria-hidden={isActive}
                      className={`[grid-area:1/1] text-zinc-600 transition-opacity duration-200 dark:text-zinc-400 ${isActive ? "opacity-0" : "opacity-100"}`}
                    >
                      {short}
                    </p>
                    <p
                      aria-hidden={!isActive}
                      className={`[grid-area:1/1] text-zinc-800 transition-opacity duration-200 dark:text-zinc-200 ${isActive ? "opacity-100" : "opacity-0"}`}
                    >
                      {description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </BentoBlock>
      </div>
    </section>
  );
};
