"use client";

import Image from "next/image";
import React, { type CSSProperties, type ReactNode, useState } from "react";
import { ChartNoAxesCombined, Code2, Megaphone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/lib/use-tilt";

// `accent` is an "r g b" triplet so the cards can apply their own alpha.
// The four skills Nicolás brings to a project, framed around the development
// work rather than as separate services.
const focusAreas = [
  {
    title: "Software development",
    short: "Full-stack products",
    description: ".NET, React, Blazor, Azure and AWS: web apps, APIs and dashboards built to grow with the business.",
    icon: Code2,
    accent: "168 85 247",
  },
  {
    title: "Business analysis",
    short: "Requirements & processes",
    description: "I map how the business works, gather requirements and turn goals into a scoped, prioritised plan, documented in Microsoft 365.",
    icon: ChartNoAxesCombined,
    accent: "250 204 21",
  },
  {
    title: "Design",
    short: "UI & visual identity",
    description: "Interfaces, brand visuals and motion in Photoshop and After Effects, designed alongside the code with AI as a creative partner.",
    icon: Sparkles,
    accent: "34 211 238",
  },
  {
    title: "Marketing & automation",
    short: "Leads, CRM & ads",
    description: "n8n and Zapier automations that connect ads, CRM and follow-ups so no lead slips through.",
    icon: Megaphone,
    accent: "236 72 153",
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
  "theme-paper bento-board relative overflow-hidden rounded-[1.75rem] border border-zinc-200/70 bg-white/70 p-6 dark:border-white/10";
const label = "text-[11px] font-semibold uppercase tracking-[0.22em]";

// Paint each glow on the board itself so it stays visible without 3D transforms.
type Light = { surface: string; glow: string; line: string };

const lights = {
  hero: {
    surface: "#121014",
    glow: "radial-gradient(ellipse 70% 90% at 100% 0%, rgba(168,85,247,0.30), transparent 60%), radial-gradient(ellipse 60% 70% at 0% 100%, rgba(236,72,153,0.20), transparent 60%), radial-gradient(ellipse 40% 50% at 55% 110%, rgba(34,211,238,0.16), transparent 70%)",
    line: "linear-gradient(90deg, transparent, #E879F9, transparent)",
  },
  since: {
    surface: "#0D1416",
    glow: "radial-gradient(ellipse 90% 80% at 100% 100%, rgba(34,211,238,0.30), transparent 65%)",
    line: "linear-gradient(90deg, transparent, #22D3EE, transparent)",
  },
  status: {
    surface: "#0D150F",
    glow: "radial-gradient(ellipse 90% 80% at 0% 0%, rgba(74,222,128,0.28), transparent 65%)",
    line: "linear-gradient(90deg, transparent, #4ADE80, transparent)",
  },
  quote: {
    surface: "#150E12",
    glow: "radial-gradient(ellipse 80% 100% at 0% 0%, rgba(236,72,153,0.26), transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(249,115,22,0.18), transparent 60%)",
    line: "linear-gradient(90deg, transparent, #F472B6, transparent)",
  },
  origin: {
    surface: "#121012",
    glow: "radial-gradient(ellipse 50% 70% at 15% 100%, rgba(250,204,21,0.20), transparent 70%), radial-gradient(ellipse 50% 70% at 50% 100%, rgba(236,72,153,0.16), transparent 70%), radial-gradient(ellipse 50% 70% at 85% 100%, rgba(168,85,247,0.20), transparent 70%)",
    line: "linear-gradient(90deg, transparent, #FACC15, #EC4899, #A855F7, transparent)",
  },
  shaping: {
    surface: "#111113",
    glow: "radial-gradient(ellipse 30% 120% at 12% 0%, rgba(34,211,238,0.14), transparent 70%), radial-gradient(ellipse 30% 120% at 38% 0%, rgba(168,85,247,0.14), transparent 70%), radial-gradient(ellipse 30% 120% at 62% 0%, rgba(236,72,153,0.14), transparent 70%), radial-gradient(ellipse 30% 120% at 88% 0%, rgba(249,115,22,0.14), transparent 70%)",
    line: "linear-gradient(90deg, transparent, #22D3EE, #A855F7, #EC4899, #F97316, transparent)",
  },
} satisfies Record<string, Light>;

// Same cursor-reactive tilt and glow as the project cards. `span` goes on the
// perspective wrapper, which is the actual grid item.
function BentoBlock({
  span,
  light,
  className,
  children,
}: {
  span: string;
  light: Light;
  className?: string;
  children: ReactNode;
}) {
  const tilt = useTilt<HTMLDivElement>();

  return (
    <div className={cn("project-card-scene", span)}>
      <div
        {...tilt}
        className={cn("project-card h-full", block, className)}
        style={{ "--bento-glow": light.glow, "--bento-surface": light.surface } as CSSProperties}
      >
        <div aria-hidden="true" className="bento-accent-rule pointer-events-none absolute inset-x-8 top-0 h-px" style={{ background: light.line }} />
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
        <BentoBlock
          span="lg:col-span-4 lg:row-span-2"
          light={lights.hero}
          className="flex flex-col justify-between gap-6 border-fuchsia-400/25 p-7 dark:border-fuchsia-400/25"
        >
          {/* The sticker's own animation has the alien lean in from its right edge and wave,
              so pinning it flush to the block's right edge makes it peek out from the border. */}
          <Image
            src={ALIEN_STICKER}
            alt=""
            aria-hidden="true"
            width={200}
            height={432}
            unoptimized
            className="about-sticker pointer-events-none absolute -bottom-3 right-0 h-56 w-auto select-none motion-reduce:hidden sm:h-72 lg:h-[88%]"
          />
          <p className="relative text-xs uppercase tracking-[0.35em] text-fuchsia-500">About</p>
          <div className="about-intro relative pr-20 sm:pr-28">
            <h2 className="max-w-[24ch] text-balance text-[28px] font-semibold leading-[1.12] tracking-tight text-zinc-950 dark:text-white lg:text-4xl">
              A developer who also thinks like a{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">business analyst</span>, a{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">designer</span> and a{" "}
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">marketer</span>.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
              Most projects don&apos;t fail on code. They fail in the gaps between the business, the design and the launch.
              I work across all three: I map the process and the requirements, design the experience, build it with .NET,
              React and Azure, and connect it to the CRM, ads and automations that bring in customers.
            </p>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
              Bilingual (Spanish and English) and used to working directly with clients, from the first conversation to the
              final result.
            </p>
          </div>
        </BentoBlock>

        <BentoBlock span="lg:col-span-2" light={lights.since} className="border-cyan-400/25 dark:border-cyan-400/25">
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

        <BentoBlock span="lg:col-span-2" light={lights.status} className="border-green-400/25 dark:border-green-400/25">
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
          <a
            href="mailto:nikolasarango@outlook.com"
            className="mt-2 block break-all text-[13px] text-zinc-700 underline-offset-4 transition-colors hover:text-green-600 hover:underline dark:text-zinc-300 dark:hover:text-green-200"
          >
            nikolasarango@outlook.com
          </a>
        </BentoBlock>

        <BentoBlock span="lg:col-span-3" light={lights.quote} className="border-pink-400/25 dark:border-pink-400/25">
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

        <BentoBlock span="lg:col-span-3" light={lights.origin} className="border-yellow-400/25 dark:border-yellow-400/25">
          <p className={`${label} text-zinc-600 dark:text-zinc-300`}>Where I come from</p>
          <ol className="relative mt-5 grid grid-cols-3">
            <li
              aria-hidden="true"
              className="absolute left-[14%] right-[14%] top-[15px] h-px bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
            />
            {background.map(({ step, title, color }) => (
              <li key={step} className="relative flex flex-col items-center gap-2.5 text-center">
                <span
                  className="about-origin-step flex h-[30px] w-[30px] items-center justify-center rounded-full border bg-white text-[11px] font-semibold dark:bg-zinc-900"
                  style={{ borderColor: color, color, boxShadow: `0 0 14px ${color}66` }}
                >
                  {step}
                </span>
                <span className="text-[13px] font-semibold text-zinc-950 dark:text-white">{title}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[12.5px] text-zinc-600 dark:text-zinc-400">
            That mix lets me take a project from requirements to launch without losing anything in the hand-offs.
          </p>
        </BentoBlock>

        <BentoBlock span="lg:col-span-6" light={lights.shaping}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={`${label} text-zinc-600 dark:text-zinc-300`}>What I bring to a project</p>
            <p className="text-xs text-zinc-500">Hover to read more</p>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {focusAreas.map(({ title, short, description, icon: Icon, accent }, index) => {
              const isActive = activeArea === index;
              return (
                <li
                  key={title}
                  tabIndex={0}
                  onMouseEnter={() => setActiveArea(index)}
                  onMouseLeave={() => setActiveArea(null)}
                  onFocus={() => setActiveArea(index)}
                  onBlur={() => setActiveArea(null)}
                  style={{ "--accent": accent } as CSSProperties}
                  className="about-focus-area rounded-[1.25rem] border border-[rgb(var(--accent)/0.3)] bg-white/55 p-4 outline-none transition-all duration-300 hover:-translate-y-[3px] hover:border-[rgb(var(--accent)/0.6)] hover:bg-[rgb(var(--accent)/0.07)] focus-visible:border-[rgb(var(--accent)/0.6)] focus-visible:bg-[rgb(var(--accent)/0.07)] dark:bg-white/[0.04]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.12)] text-[rgb(var(--accent))]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-zinc-950 dark:text-white">{title}</h3>
                  {/* Both lines share one grid cell so the card keeps the taller height and the row never jumps. */}
                  <div className="mt-1 grid text-xs leading-5">
                    <p
                      aria-hidden={isActive}
                      className={`[grid-area:1/1] text-zinc-700 transition-opacity duration-200 dark:text-zinc-300 ${isActive ? "opacity-0" : "opacity-100"}`}
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
