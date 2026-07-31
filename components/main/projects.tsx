"use client";

import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useRef, useState } from "react";

const projects = [
  {
    title: "Infinity Commerce",
    subtitle: "E-commerce platform",
    description:
      "A modern commerce platform with secure authentication, product discovery, shopping flows, order processing, and a polished responsive storefront.",
    image: "/ecomercerappt.jpg",
    href: "https://infinitycomex.com/",
    linkLabel: "Live project",
    stack: ["ASP.NET Core", "Angular", "EF Core", "Angular Material"],
    highlights: ["Secure commerce flows", "Order management", "Live deployment"],
  },
  {
    title: "Atelliers",
    subtitle: "Digital product studio",
    description:
      "A cinematic, responsive website for a technology studio, presenting product engineering, AI automation, consulting services, and measurable case studies.",
    image: "/project-atelliers.png",
    href: "https://github.com/GEKKOLAS/atelliers",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
    highlights: ["Cinematic hero reel", "Scroll parallax", "Accessible motion"],
  },
  {
    title: "Mail Template Hub",
    subtitle: "Email automation platform",
    description:
      "A full-stack platform to connect Gmail and Outlook with OAuth, design responsive MJML templates, manage assets, and schedule tracked campaigns.",
    image: "/project-smtp.png",
    href: "https://github.com/GEKKOLAS/smtp",
    stack: [".NET 10", "Next.js", "PostgreSQL", "GrapesJS", "Hangfire"],
    highlights: ["OAuth providers", "Visual email builder", "Scheduled delivery"],
  },
  {
    title: "FleetIQ",
    subtitle: "Freight and logistics platform",
    description:
      "A domain-driven logistics backend composed of 12 independent services for orders, carriers, planning, tracking, billing, documents, compliance, and analytics.",
    image: "/project-fleetiq.png",
    href: "https://github.com/GEKKOLAS/FleetIQ",
    stack: [".NET 10", "PostgreSQL", "RabbitMQ", "Redis", "YARP"],
    highlights: ["12 bounded contexts", "Transactional outbox", "OAuth2 and OIDC"],
  },
  {
    title: "Scrape Studio",
    subtitle: "AI-assisted product scraper",
    description:
      "A secure full-stack scraper that extracts structured product data and images, analyzes page layouts, and generates an initial React representation.",
    image: "/project-scrapper.png",
    href: "https://github.com/GEKKOLAS/Scrapper",
    stack: [".NET 10", "Next.js 16", "AngleSharp", "Azure", "OpenAI"],
    highlights: ["Async job processing", "SSRF protection", "React code generation"],
  },
  {
    title: "LMS Learning Hub",
    subtitle: "Learning management system",
    description:
      "A responsive learning portal focused on course discovery, structured educational content, user workflows, and a clear student experience.",
    image: "/project-lms.png",
    href: "https://github.com/GEKKOLAS/LMS/tree/main/lms-clone",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: ["Course discovery", "Structured content", "Responsive experience"],
  },
  {
    title: "Funds App on AWS",
    subtitle: "Cloud-native investment platform",
    description:
      "A full-stack funds platform deployed on AWS with atomic subscription flows, transaction history, notifications, and infrastructure automation.",
    image: "/ecomercerappt.jpg",
    href: "https://github.com/GEKKOLAS/aws-eshop",
    liveHref: "https://dvsvnp7nbzde3.cloudfront.net/",
    stack: ["ASP.NET Core", "Next.js", "DynamoDB", "CloudFront", "CloudFormation"],
    highlights: ["AWS architecture", "Atomic transactions", "Live deployment"],
  },
];

// Graphic design track. Titles and copy are scaffolding to overwrite; the
// imagery is a drop target so real artwork can be added in place.
const designProjects = [
  {
    category: "Brand identity",
    title: "Visual identity system",
    description:
      "A complete identity built as a system rather than a logo: wordmark construction, a type and colour scale, and the rules that keep it consistent across every application.",
    tools: ["Illustrator", "Figma", "Type design"],
    placeholder: "Drop the identity artwork — logo grid, wordmark, applications",
  },
  {
    category: "Packaging design",
    title: "Packaging & label suite",
    description:
      "A modular packaging language designed so new products need no new artwork — one grid, a fixed hierarchy, and colour coding that scales across the whole range.",
    tools: ["Illustrator", "Dielines", "Pantone"],
    placeholder: "Drop packaging shots — mockups, labels, dielines",
  },
  {
    category: "Editorial design",
    title: "Editorial & print series",
    description:
      "Long-form layout work where typography carries the argument: a baseline grid, a clear reading hierarchy, and covers designed to work as a set.",
    tools: ["InDesign", "Baseline grid", "Print"],
    placeholder: "Drop editorial spreads — posters, layouts, print",
  },
  {
    category: "Motion design",
    title: "Motion brand toolkit",
    description:
      "The identity in motion: logo builds, transitions and lower-thirds, specified with timings and easing so the brand animates the same way everywhere.",
    tools: ["After Effects", "Lottie", "Easing specs"],
    placeholder: "Drop a motion still or contact sheet",
  },
];

const dataProjects = [
  {
    title: "Customer churn analysis",
    subtitle: "Predictive modelling",
    description:
      "A survival model that identified which subscribers were about to leave and, more usefully, which behaviours predicted it early enough to act on.",
    metrics: [
      { v: "0.87", l: "ROC AUC" },
      { v: "−22%", l: "churn after two quarters" },
      { v: "1.4M", l: "events modelled" },
    ],
    chartLabel: "Monthly churn rate",
    chartAxis: "Jan → Sep",
    bars: [72, 68, 74, 61, 55, 48, 44, 39, 35],
    stack: ["Python", "scikit-learn", "SQL"],
  },
  {
    title: "Sales forecasting model",
    subtitle: "Time-series forecasting",
    description:
      "A demand forecast replacing a single buyer's intuition, with seasonality and promotion effects separated so the planning team could trust the numbers.",
    metrics: [
      { v: "12,3%", l: "MAPE" },
      { v: "−41%", l: "stockouts" },
      { v: "18", l: "months backtested" },
    ],
    chartLabel: "Forecast vs actual",
    chartAxis: "Q1 → Q4",
    bars: [40, 52, 47, 63, 58, 71, 66, 82, 88],
    stack: ["Prophet", "SQL", "Power BI"],
  },
  {
    title: "Operations dashboard",
    subtitle: "BI and reporting",
    description:
      "One queryable reporting surface replacing eleven spreadsheets, with the metric definitions modelled once so every team reads the same number.",
    metrics: [
      { v: "11→1", l: "spreadsheets replaced" },
      { v: "−74%", l: "time to report" },
      { v: "340ms", l: "p95 query" },
    ],
    chartLabel: "Report requests",
    chartAxis: "Week 1 → 9",
    bars: [30, 44, 58, 52, 67, 76, 71, 84, 92],
    stack: ["dbt", "PostgreSQL", "Power BI"],
  },
  {
    title: "Marketing attribution study",
    subtitle: "Statistical analysis",
    description:
      "A multi-touch attribution study that reallocated spend by measuring incremental lift instead of crediting whichever channel happened to be last.",
    metrics: [
      { v: "+18%", l: "return on ad spend" },
      { v: "6", l: "channels compared" },
      { v: "95%", l: "confidence level" },
    ],
    chartLabel: "Incremental lift by channel",
    chartAxis: "Paid → Organic",
    bars: [88, 74, 62, 55, 48, 41, 33, 27, 20],
    stack: ["R", "Bayesian MMM", "BigQuery"],
  },
];

type Project = (typeof projects)[number];
type DesignProject = (typeof designProjects)[number];
type DataProject = (typeof dataProjects)[number];
type TrackKey = "all" | "dev" | "design" | "data";
type LayoutKey = "gallery" | "feature";

const trackFilters: { key: TrackKey; label: string; count: number; dot: string }[] = [
  { key: "all", label: "All", count: projects.length + designProjects.length + dataProjects.length, dot: "#A1A1AA" },
  { key: "dev", label: "Development", count: projects.length, dot: "#D946EF" },
  { key: "design", label: "Graphic design", count: designProjects.length, dot: "#A78BFA" },
  { key: "data", label: "Data analysis", count: dataProjects.length, dot: "#22D3EE" },
];

const layoutOptions: { key: LayoutKey; label: string; hint: string }[] = [
  { key: "gallery", label: "Gallery", hint: "Two-up cards, image led — best for scanning a lot of work" },
  { key: "feature", label: "Feature", hint: "Full-width rows, image beside the write-up — best for detail" },
];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--card-rotate-x", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--card-rotate-y", `${(x - 0.5) * 10}deg`);
    card.style.setProperty("--card-glow-x", `${x * 100}%`);
    card.style.setProperty("--card-glow-y", `${y * 100}%`);
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
  };

  return (
    <div className="project-card-scene">
      <article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="project-card group relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 p-4 backdrop-blur-xl dark:bg-zinc-900/70"
      >
        <div className="project-card-glow" aria-hidden="true" />
        <div className="project-card-orb project-card-orb-one" aria-hidden="true" />
        <div className="project-card-orb project-card-orb-two" aria-hidden="true" />
        <div className="project-card-content relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-fuchsia-500/80"><span className="h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_14px_rgba(217,70,239,0.9)]" />{project.subtitle}</div>
            <h3 className="text-2xl font-semibold text-zinc-950 dark:text-white">{project.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="project-card-chip rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300">{tech}</span>)}</div>
            <div className="mt-5 flex flex-wrap gap-2">{project.highlights.map((item) => <span key={item} className="text-sm text-zinc-500 dark:text-zinc-400">• {item}</span>)}</div>
            <div className="mt-6 flex flex-wrap gap-5">
              <Link href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-950 transition-colors hover:text-fuchsia-600 dark:text-white dark:hover:text-fuchsia-300">{project.linkLabel ?? "View repository"} <span aria-hidden="true">↗</span></Link>
              {project.liveHref ? <Link href={project.liveHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-fuchsia-600 transition-colors hover:text-fuchsia-500 dark:text-fuchsia-300">Live demo <span aria-hidden="true">↗</span></Link> : null}
            </div>
          </div>
          <div className="project-card-image order-1 lg:order-2">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-zinc-950/10 shadow-2xl">
              <Image src={project.image} alt={`${project.title} project preview`} width={1200} height={630} className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] lg:h-80" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function DesignCard({ project, layout }: { project: DesignProject; layout: LayoutKey }) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-zinc-950/10 bg-white/70 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-violet-400/35 dark:border-white/[0.12] dark:bg-zinc-900/70">
      <div className={`grid items-center gap-5 p-4 ${layout === "feature" ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-zinc-950/10 bg-zinc-100/60 dark:border-white/[0.12] dark:bg-zinc-950/40">
          <div className="flex h-full w-full items-center justify-center p-6">
            <p className="max-w-[24ch] text-center text-xs leading-5 text-zinc-400 dark:text-zinc-600">{project.placeholder}</p>
          </div>
        </div>
        <div className={layout === "feature" ? "px-2 pb-3 pt-1 lg:px-2 lg:py-0" : "px-2 pb-3 pt-1"}>
          <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-violet-500/90 dark:text-violet-400/90">
            <span className="h-2 w-2 shrink-0 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,0.9)]" />
            {project.category}
          </div>
          <h3 className="text-[22px] font-semibold text-zinc-950 dark:text-white">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="shrink-0 whitespace-nowrap rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function DataCard({ project }: { project: DataProject }) {
  const max = Math.max(...project.bars);

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-zinc-950/10 bg-white/70 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-cyan-400/35 dark:border-white/[0.12] dark:bg-zinc-900/70">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[70px] -top-[70px] h-[200px] w-[200px] rounded-full bg-cyan-400/10 blur-2xl" />
      <div className="relative p-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cyan-600/90 dark:text-cyan-400/90">
          <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
          {project.subtitle}
        </div>
        <h3 className="text-[22px] font-semibold text-zinc-950 dark:text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>

        <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-zinc-950/10 bg-zinc-950/10 dark:border-white/10 dark:bg-white/10">
          {project.metrics.map((metric) => (
            <div key={metric.l} className="bg-white/80 px-3 py-3.5 dark:bg-zinc-950/75">
              <div className="text-[22px] font-semibold tracking-tight text-cyan-600 dark:text-cyan-300">{metric.v}</div>
              <div className="mt-1 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">{metric.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">{project.chartLabel}</span>
            <span className="text-[10px] tracking-[0.06em] text-zinc-400 dark:text-zinc-600">{project.chartAxis}</span>
          </div>
          <div className="flex h-[76px] items-end gap-1.5 border-b border-zinc-950/10 pb-px dark:border-white/[0.12]">
            {project.bars.map((value, index) => (
              <div
                key={index}
                title={String(value)}
                className="flex-1 rounded-t-[3px] transition-opacity duration-200 hover:opacity-75"
                style={{
                  height: `${Math.round((value / max) * 100)}%`,
                  background: `linear-gradient(to top, rgba(34,211,238,0.25), ${index === project.bars.length - 1 ? "#67E8F9" : "rgba(103,232,249,0.7)"})`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="shrink-0 whitespace-nowrap rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export const Projects = () => {
  const [track, setTrack] = useState<TrackKey>("all");
  const [layout, setLayout] = useState<LayoutKey>("gallery");

  const showDev = track === "all" || track === "dev";
  const showDesign = track === "all" || track === "design";
  const showData = track === "all" || track === "data";
  // Container-driven, not viewport-gated: gallery packs as many 320px columns
  // as fit at any width, feature is always a single full-width row.
  const groupGrid =
    layout === "gallery"
      ? "grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]"
      : "grid grid-cols-1 gap-6";

  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mb-8 flex flex-col gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400/80">Selected work</p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-white">Projects built from product idea to working software</h2>
        </div>
        <p className="max-w-[40rem] text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          Full-stack products, brand systems and data work — spanning real-time experiences, cloud architecture, visual identity and analysis.
        </p>
      </div>

      <div className="mb-7 flex flex-wrap items-center gap-4 border-b border-zinc-950/10 pb-5 dark:border-white/10">
        <div className="flex flex-wrap gap-2">
          {trackFilters.map((filter) => {
            const active = track === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setTrack(filter.key)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 ${
                  active
                    ? "border-fuchsia-400/40 bg-fuchsia-500/[0.12] text-fuchsia-700 dark:text-fuchsia-300"
                    : "border-zinc-950/10 bg-zinc-200/50 text-zinc-500 dark:border-white/10 dark:bg-zinc-800/50 dark:text-zinc-400"
                }`}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: filter.dot }} />
                {filter.label}
                <span className={`text-[11px] tracking-[0.06em] ${active ? "text-fuchsia-500/60 dark:text-fuchsia-300/60" : "text-zinc-400 dark:text-zinc-600"}`}>{filter.count}</span>
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex gap-[3px] rounded-full border border-zinc-950/10 bg-zinc-200/60 p-[3px] dark:border-white/10 dark:bg-zinc-800/60">
          {layoutOptions.map((option) => {
            const active = layout === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setLayout(option.key)}
                title={option.hint}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                  active ? "bg-zinc-700 text-zinc-50" : "bg-transparent text-zinc-500"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {showDev ? (
        <div className="grid gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : null}

      {showDesign ? (
        <div className={`${groupGrid} ${track === "all" ? "mt-6" : ""}`}>
          {designProjects.map((project) => (
            <DesignCard key={project.title} project={project} layout={layout} />
          ))}
        </div>
      ) : null}

      {showData ? (
        <div className={`${groupGrid} ${track === "all" ? "mt-6" : ""}`}>
          {dataProjects.map((project) => (
            <DataCard key={project.title} project={project} />
          ))}
        </div>
      ) : null}
    </section>
  );
};
