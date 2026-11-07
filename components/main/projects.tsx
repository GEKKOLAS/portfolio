"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "motion/react";
import { type ComponentType, type KeyboardEvent, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useUISounds } from "@/components/ui/ui-sound-provider";
import { useTilt } from "@/lib/use-tilt";
import { projectScreenshots } from "@/lib/project-screenshots";
import { FleetArchitecture } from "./fleet-architecture";
import { InteractiveDataChart } from "./interactive-data-chart";
import { ProjectGallery, type ProjectScreenshot } from "./project-gallery";
import "./grimoire-surfaces.css";
import "./rebel-surfaces.css";

type DevProject = {
  title: string;
  subtitle: string;
  description: string;
  // Extra paragraphs shown only in the detail modal.
  details?: string[];
  // Interactive system diagram shown in the detail modal.
  architecture?: ComponentType;
  image?: string;
  screenshots?: ProjectScreenshot[];
  imagePlaceholder?: string;
  href?: string;
  linkLabel?: string;
  liveHref?: string;
  stack: string[];
  highlights: string[];
};

const projects: DevProject[] = [
  {
    title: "Vapex",
    subtitle: "E-commerce platform",
    description:
      "A dark-themed storefront for vaporizers and accessories with a 901-product catalog, Redis-backed cart, Stripe checkout, user accounts and real-time order notifications over SignalR.",
    image: "/project-vapex.png",
    href: "https://github.com/GEKKOLAS/EShopLaVeleta",
    stack: ["ASP.NET Core 8", "Angular 18", "Redis", "SignalR", "Stripe"],
    highlights: ["901-product catalog", "Redis cart + SignalR", "Stripe checkout"],
  },
  {
    title: "JobHunter OS",
    subtitle: "Job search CRM",
    description:
      "A self-hosted job-search workspace that brings opportunities, explainable fit scoring, recruiter conversations, follow-ups, and search analytics into one place.",
    image: "/project-jobhunter.png",
    href: "https://github.com/GEKKOLAS/jobhunter-os",
    stack: [".NET 10", "Next.js 16", "React 19", "PostgreSQL", "TypeScript", "Claude"],
    highlights: ["Explainable fit scoring", "Recruiter CRM and follow-ups", "Analytics with sample sizes"],
    details: [
      "Capture opportunities from pasted text, links, or public Greenhouse, Lever, and Ashby boards, then track them through a Kanban pipeline with stage history. Fit scores compare confirmed requirements against skills and the evidence behind them.",
      "A modular .NET backend coordinates reminders through a transactional outbox. Optional Claude integration reads postings and drafts follow-ups; approved messages can be sent through Mail Template Hub. Analytics show their sample sizes and withhold rates when there is too little data.",
    ],
  },
  {
    title: "Atelliers",
    subtitle: "Digital product studio",
    description:
      "A responsive website for a digital product studio, presenting product engineering, AI automation, consulting services, and a case study through cinematic video and restrained motion.",
    image: "/project-atelliers.png",
    href: "https://github.com/GEKKOLAS/atelliers",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
    highlights: ["Cinematic hero reel", "Scroll parallax and reveals", "Responsive, accessible motion"],
    details: [
      "A locally hosted hero reel, scroll parallax, and Intersection Observer reveals give the studio a distinctive visual identity. Responsive layouts and reduced-motion support keep the experience usable across screen sizes and motion preferences.",
    ],
  },
  {
    title: "Skylift",
    subtitle: "Drone delivery platform",
    description:
      "An avionics-inspired mission-control interface for drone delivery, combining order dispatch, fleet management, live map tracking, and real-time telemetry.",
    imagePlaceholder: "No product screenshot published in the repository",
    href: "https://github.com/GEKKOLAS/frontend",
    stack: ["Next.js 15", "React 19", "TypeScript", "Clerk", "MapLibre", "STOMP"],
    highlights: ["Live tracking and telemetry", "Order dispatch workflow", "Authenticated fleet console"],
    details: [
      "Clerk protects the operations console and supplies the API token. MapLibre renders the delivery map, while STOMP over SockJS streams drone position and battery readings into a cockpit-style telemetry display.",
    ],
  },
  {
    title: "Halcyon",
    subtitle: "Peer-to-peer video calls",
    description:
      "A private, responsive video-call app that connects two peers with WebRTC, with in-call chat, screen sharing, reactions, and room links that work across desktop and mobile.",
    href: "https://github.com/GEKKOLAS/halcyon",
    stack: ["Next.js 14", "React 18", "WebRTC", "TypeScript", "shadcn/ui", "Tailwind CSS"],
    highlights: ["Peer-to-peer video and chat", "Screen sharing and reactions", "Room links and manual invites"],
    details: [
      "A short-lived signaling relay exchanges connection details, then audio, video, and chat flow between peers. Manual invite and reply codes provide an alternative connection flow, with optional TURN configuration for restrictive networks.",
      "The call interface includes draggable picture-in-picture video, speaking indicators, keyboard shortcuts, and a mobile chat sheet. Media and chat are not recorded or stored.",
    ],
  },
  {
    title: "Mail Template Hub",
    subtitle: "Email automation platform",
    description:
      "An email workspace that connects Gmail and Outlook, builds responsive templates visually or with Claude, manages brand assets, and sends or schedules tracked messages through the providers' own APIs.",
    image: "/project-smtp.png",
    href: "https://github.com/GEKKOLAS/smtp",
    stack: [".NET 10", "Next.js 16", "PostgreSQL", "GrapesJS", "Hangfire", "Claude"],
    highlights: ["Visual and AI template editor", "Gmail and Outlook inbox integration", "Brand kits and tracked sending"],
    details: [
      "Create templates with GrapesJS, MJML, or raw HTML, then preview exact desktop and mobile widths or revise an existing design with an AI prompt. Brand kits carry colors, fonts, logos, and tone into the editor and generated templates.",
      "Optional inbox access enables in-thread replies. Hangfire handles scheduled sends and retries, while delivery history, bounce reporting, and opt-in click analytics track results. Scoped API keys support integrations such as approved follow-ups from JobHunter OS.",
    ],
  },
  {
    title: "FleetIQ",
    subtitle: "Freight and logistics platform",
    description:
      "A freight and logistics platform with an Angular operations console and 12 independent .NET services covering orders, carriers, planning, live tracking, billing, and compliance.",
    image: "/project-fleetiq.png",
    href: "https://github.com/GEKKOLAS/FleetIQ",
    stack: [".NET 10", "Angular 20", "PrimeNG", "PostgreSQL", "RabbitMQ", "SignalR", "Three.js"],
    highlights: ["Angular operations console", "3D tracking with live updates", "12 event-driven services"],
    architecture: FleetArchitecture,
    details: [
      "The Angular 20 and PrimeNG console brings together operational KPIs, order lifecycle actions, carrier assignments, load planning, and invoicing. A control-tower view switches between a 3D distribution network and a map, with live position updates over SignalR.",
      "Each service owns its data and publishes domain events through a transactional outbox and RabbitMQ. A YARP gateway provides the entry point, authenticated with Duende IdentityServer and OIDC Authorization Code with PKCE for the web console.",
    ],
  },
  {
    title: "Scrape Studio",
    subtitle: "AI-assisted product scraper",
    description:
      "A full-stack product scraper that extracts catalog data and images, removes image backgrounds locally, monitors asynchronous jobs, and generates an initial React layout from page structure.",
    image: "/project-scrapper.png",
    href: "https://github.com/GEKKOLAS/Scrapper",
    stack: [".NET 10", "Next.js 16", "AngleSharp", "OpenAI", "Azure", "Docker"],
    highlights: ["Catalog crawling and JSON export", "Local background removal", "Async jobs and React generation"],
    details: [
      "The crawler follows catalog links, categories, pagination, and WordPress product sitemaps. The product gallery compares original images with transparent PNGs, supports review when segmentation fails, and exports catalog data as JSON.",
      "Deterministic extraction works without an AI key, with optional OpenAI enrichment. The backend separates domain, application, infrastructure, and API layers, with deployment templates for Azure services and optional S3/CloudFront image storage.",
    ],
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
    title: "SMB Automation Suite",
    subtitle: "n8n & Zapier workflow library",
    description:
      "A searchable library of n8n and Zapier automations for small and medium businesses — lead capture and CRM sync, AI lead scoring, ad reporting and invoicing. Every workflow gets a generated explainer video in which sample data travels through the graph step by step, alongside its setup steps, credentials and an import-ready file.",
    image: "/project-automation.png",
    href: "https://github.com/GEKKOLAS/smb-automations-",
    stack: ["n8n", "Zapier", "Next.js", "Playwright", "FFmpeg"],
    highlights: ["Generated MP4 explainer per workflow", "n8n and Zapier graphs from their definitions", "Import-ready workflow files"],
  },
].map((project) => {
  const screenshots = projectScreenshots[project.title];
  return screenshots?.length
    ? { ...project, image: screenshots[0].src, screenshots }
    : project;
});

// Graphic design track. Titles and copy are scaffolding to overwrite; the
// imagery is a drop target so real artwork can be added in place.
const designProjects = [
  {
    category: "Brand identity",
    title: "Visual identity system",
    description:
      "A complete identity built as a system rather than a logo: wordmark construction, a type and colour scale, and the rules that keep it consistent across every application.",
    tools: ["Illustrator", "Figma", "Type design"],
    image: "/project-design-identity.png",
  },
  {
    category: "Packaging design",
    title: "Packaging & label suite",
    description:
      "A modular packaging language designed so new products need no new artwork — one grid, a fixed hierarchy, and colour coding that scales across the whole range.",
    tools: ["Illustrator", "Dielines", "Pantone"],
    image: "/project-design-packaging.png",
  },
  {
    category: "Editorial design",
    title: "Editorial & print series",
    description:
      "Long-form layout work where typography carries the argument: a baseline grid, a clear reading hierarchy, and covers designed to work as a set.",
    tools: ["InDesign", "Baseline grid", "Print"],
    image: "/project-design-editorial.png",
  },
  {
    category: "Motion design",
    title: "Motion brand toolkit",
    description:
      "The identity in motion: logo builds, transitions and lower-thirds, specified with timings and easing so the brand animates the same way everywhere.",
    tools: ["After Effects", "Lottie", "Easing specs"],
    image: "/project-design-motion.png",
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

type DesignProject = (typeof designProjects)[number];
type DataProject = (typeof dataProjects)[number];
type TrackKey = "all" | "dev" | "design" | "data";
type LayoutKey = "gallery" | "feature";
type SelectedProject =
  | { track: "dev"; project: DevProject }
  | { track: "design"; project: DesignProject }
  | { track: "data"; project: DataProject };

const trackAccent: Record<
  SelectedProject["track"],
  { label: string; eyebrow: string; dot: string; chip: string; hover: string; glow: string; line: string }
> = {
  dev: {
    label: "Development",
    glow: "bg-fuchsia-500/25",
    line: "via-fuchsia-400/80",
    eyebrow: "text-fuchsia-500/80",
    dot: "bg-fuchsia-500 shadow-[0_0_14px_rgba(217,70,239,0.9)]",
    chip: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
    hover: "hover:text-fuchsia-600 dark:hover:text-fuchsia-300",
  },
  design: {
    label: "Graphic design",
    glow: "bg-violet-500/25",
    line: "via-violet-400/80",
    eyebrow: "text-violet-500/90 dark:text-violet-400/90",
    dot: "bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,0.9)]",
    chip: "border-violet-400/20 bg-violet-400/10 text-violet-700 dark:text-violet-300",
    hover: "hover:text-violet-600 dark:hover:text-violet-300",
  },
  data: {
    label: "Data analysis",
    glow: "bg-cyan-400/20",
    line: "via-cyan-400/80",
    eyebrow: "text-cyan-600/90 dark:text-cyan-400/90",
    dot: "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]",
    chip: "border-cyan-400/20 bg-cyan-400/10 text-cyan-700 dark:text-cyan-300",
    hover: "hover:text-cyan-600 dark:hover:text-cyan-300",
  },
};

const PROJECT_MODAL_TITLE_ID = "project-modal-title";

const chipsOf = (item: SelectedProject) => (item.track === "design" ? item.project.tools : item.project.stack);

type RelatedProject = { item: SelectedProject; shared: string[] };

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

// No handler of its own: the click bubbles to the card, which opens the modal.
// It exists so the card has a keyboard-reachable control.
function DetailsButton({ track }: { track: SelectedProject["track"] }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={`inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-950 transition-colors dark:text-white ${trackAccent[track].hover}`}
    >
      View details <span aria-hidden="true">→</span>
    </button>
  );
}

function ProjectCard({ project, onOpen }: { project: DevProject; onOpen: () => void }) {
  const tilt = useTilt<HTMLElement>();

  return (
    <div className="project-card-scene">
      <article
        {...tilt}
        onClick={onOpen}
        className="theme-paper portfolio-project-card project-card group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 p-4 backdrop-blur-xl dark:bg-zinc-900/70"
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
              <DetailsButton track="dev" />
              {project.href ? <Link href={project.href} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-950 transition-colors hover:text-fuchsia-600 dark:text-white dark:hover:text-fuchsia-300">{project.linkLabel ?? "View repository"} <span aria-hidden="true">↗</span></Link> : null}
              {project.liveHref ? <Link href={project.liveHref} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex items-center gap-2 text-sm font-medium text-fuchsia-600 transition-colors hover:text-fuchsia-500 dark:text-fuchsia-300">Live demo <span aria-hidden="true">↗</span></Link> : null}
            </div>
          </div>
          <div className="project-card-image order-1 lg:order-2">
            <div className="project-artwork relative overflow-hidden rounded-[1.5rem] border border-white/20 bg-zinc-950/10 shadow-2xl">
              {project.image ? (
                <Image src={project.image} alt={`${project.title} project preview`} width={1200} height={630} className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] lg:h-80" />
              ) : (
                <div className="flex h-64 w-full items-center justify-center bg-zinc-100/60 p-6 dark:bg-zinc-950/40 lg:h-80">
                  <p className="max-w-[26ch] text-center text-xs leading-5 text-zinc-400 dark:text-zinc-600">{project.imagePlaceholder ?? "Artwork coming soon"}</p>
                </div>
              )}
              {project.screenshots && project.screenshots.length > 1 ? (
                <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  {project.screenshots.length} screenshots
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function DesignCard({ project, layout, onOpen }: { project: DesignProject; layout: LayoutKey; onOpen: () => void }) {
  return (
    <article onClick={onOpen} className="theme-paper portfolio-project-card relative cursor-pointer overflow-hidden rounded-[2rem] border border-zinc-950/10 bg-white/70 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-violet-400/35 dark:border-white/[0.12] dark:bg-zinc-900/70">
      <div className={`grid items-center gap-5 p-4 ${layout === "feature" ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
        <div className="project-artwork relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-zinc-950/10 bg-zinc-100/60 dark:border-white/[0.12] dark:bg-zinc-950/40">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
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
          <div className="mt-5">
            <DetailsButton track="design" />
          </div>
        </div>
      </div>
    </article>
  );
}

function DataMetrics({ project }: { project: DataProject }) {
  return (
    <div className="project-data-metrics mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-zinc-950/10 bg-zinc-950/10 dark:border-white/10 dark:bg-white/10">
      {project.metrics.map((metric) => (
        <div key={metric.l} className="bg-white/80 px-3 py-3.5 dark:bg-zinc-950/75">
          <div className="text-[22px] font-semibold tracking-tight text-cyan-600 dark:text-cyan-300">{metric.v}</div>
          <div className="mt-1 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">{metric.l}</div>
        </div>
      ))}
    </div>
  );
}

function DataChart({ project }: { project: DataProject }) {
  const max = Math.max(...project.bars);

  return (
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
            className="project-data-bar flex-1 rounded-t-[3px] transition-opacity duration-200 hover:opacity-75"
            style={{
              height: `${Math.round((value / max) * 100)}%`,
              background: `linear-gradient(to top, rgba(34,211,238,0.25), ${index === project.bars.length - 1 ? "#67E8F9" : "rgba(103,232,249,0.7)"})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DataCard({ project, onOpen }: { project: DataProject; onOpen: () => void }) {
  return (
    <article onClick={onOpen} className="theme-paper portfolio-project-card relative cursor-pointer overflow-hidden rounded-[2rem] border border-zinc-950/10 bg-white/70 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-cyan-400/35 dark:border-white/[0.12] dark:bg-zinc-900/70">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[70px] -top-[70px] h-[200px] w-[200px] rounded-full bg-cyan-400/10 blur-2xl" />
      <div className="relative p-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cyan-600/90 dark:text-cyan-400/90">
          <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
          {project.subtitle}
        </div>
        <h3 className="text-[22px] font-semibold text-zinc-950 dark:text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{project.description}</p>

        <DataMetrics project={project} />
        <DataChart project={project} />

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="shrink-0 whitespace-nowrap rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">{tech}</span>
          ))}
        </div>
        <div className="mt-5">
          <DetailsButton track="data" />
        </div>
      </div>
    </article>
  );
}

const modalStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const modalReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function ProjectDetails({
  selected,
  index,
  total,
  previous,
  next,
  related,
  onNavigate,
  onSelect,
}: {
  selected: SelectedProject;
  index: number;
  total: number;
  previous?: SelectedProject;
  next?: SelectedProject;
  related: RelatedProject[];
  onNavigate: (step: number) => void;
  onSelect: (item: SelectedProject) => void;
}) {
  const accent = trackAccent[selected.track];
  const { title, description } = selected.project;
  const eyebrow = selected.track === "design" ? selected.project.category : selected.project.subtitle;
  const screenshots = selected.track === "dev" ? selected.project.screenshots : undefined;
  const image = selected.track === "data" || screenshots?.length ? undefined : selected.project.image;
  const chips = chipsOf(selected);
  const Architecture = selected.track === "dev" ? selected.project.architecture : undefined;
  const sectionLabel = "text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500";
  const navButton =
    "group flex min-w-0 cursor-pointer flex-col gap-1 px-6 py-5 transition-colors hover:bg-zinc-950/[0.04] dark:hover:bg-white/[0.05] sm:px-8";

  return (
    <MotionConfig reducedMotion="user">
      {/* Keyed so the entrance replays when stepping between projects. */}
      <motion.div key={title} variants={modalStagger} initial="hidden" animate="show">
        {/* Always dark: the title sits on the artwork, whatever the page theme. */}
        <header className="project-detail-hero dark relative overflow-hidden bg-zinc-950">
          {image ? (
            <div className={`relative w-full ${selected.track === "design" ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[1200/630]"}`}>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Image src={image} alt={`${title} project preview`} fill sizes="(min-width: 1080px) 1024px, 100vw" className="object-cover" />
              </motion.div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>
          ) : (
            <>
              <div aria-hidden="true" className={`pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full blur-3xl ${accent.glow}`} />
              <div aria-hidden="true" className={`pointer-events-none absolute -bottom-28 left-1/4 h-56 w-56 rounded-full blur-3xl ${accent.glow}`} />
            </>
          )}

          <div className={image ? "absolute inset-x-0 bottom-0 p-6 sm:p-8" : "relative p-6 pt-16 sm:p-8 sm:pt-[4.5rem]"}>
            <motion.div variants={modalReveal} className={`mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] ${accent.eyebrow}`}>
              <span className={`h-2 w-2 shrink-0 rounded-full ${accent.dot}`} />
              {eyebrow}
            </motion.div>
            <motion.h2 variants={modalReveal} id={PROJECT_MODAL_TITLE_ID} className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </motion.h2>
            {selected.track === "data" ? (
              <motion.div variants={modalReveal} className="project-detail-chart">
                <InteractiveDataChart bars={selected.project.bars} label={selected.project.chartLabel} axis={selected.project.chartAxis} />
              </motion.div>
            ) : null}
          </div>

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-zinc-950/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-200 backdrop-blur">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-white/25" />
            {accent.label}
          </div>
          <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${accent.line}`} />
        </header>

        <div className="theme-paper project-detail-paper grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {screenshots?.length ? (
            <motion.div variants={modalReveal} className="min-w-0 lg:col-span-2">
              <ProjectGallery key={title} title={title} screenshots={screenshots} />
            </motion.div>
          ) : null}
          <div className="min-w-0">
            <motion.div variants={modalReveal}>
              <h3 className={sectionLabel}>Overview</h3>
              <p className="mt-3 text-base leading-7 text-zinc-700 dark:text-zinc-300">{description}</p>
              {selected.track === "dev"
                ? selected.project.details?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">{paragraph}</p>
                  ))
                : null}
            </motion.div>

            {selected.track === "data" ? (
              <motion.div variants={modalReveal} className="mt-8">
                <h3 className={sectionLabel}>Key results</h3>
                <DataMetrics project={selected.project} />
              </motion.div>
            ) : null}

            {selected.track === "dev" ? (
              <motion.div variants={modalReveal} className="mt-8">
                <h3 className={sectionLabel}>Highlights</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {selected.project.highlights.map((item, itemIndex) => (
                    <li key={item} className="rounded-2xl border border-zinc-950/10 bg-zinc-950/[0.02] p-4 transition-colors hover:border-fuchsia-400/40 dark:border-white/10 dark:bg-white/[0.04]">
                      <span className={`text-xs font-semibold tabular-nums tracking-[0.2em] ${accent.eyebrow}`}>{String(itemIndex + 1).padStart(2, "0")}</span>
                      <p className="mt-2 text-sm font-medium leading-6 text-zinc-800 dark:text-zinc-200">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </div>

          <motion.aside variants={modalReveal} className="h-fit rounded-[1.5rem] border border-zinc-950/10 bg-zinc-950/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <h3 className={sectionLabel}>{selected.track === "design" ? "Tools" : "Tech stack"}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span key={chip} className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${accent.chip}`}>{chip}</span>
              ))}
            </div>

            <dl className="mt-5 space-y-3 border-t border-zinc-950/10 pt-5 text-sm dark:border-white/10">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-zinc-500">Track</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">{accent.label}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-zinc-500">Type</dt>
                <dd className="text-right font-medium text-zinc-900 dark:text-zinc-100">{eyebrow}</dd>
              </div>
            </dl>

            {selected.track === "dev" && (selected.project.href || selected.project.liveHref) ? (
              <div className="mt-5 grid gap-2.5">
                {selected.project.href ? (
                  <Link href={selected.project.href} target="_blank" rel="noopener noreferrer" className="project-primary-link inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fuchsia-600 dark:bg-white dark:text-zinc-950 dark:hover:bg-fuchsia-300">
                    {selected.project.linkLabel ?? "View repository"} <span aria-hidden="true">↗</span>
                  </Link>
                ) : null}
                {selected.project.liveHref ? (
                  <Link href={selected.project.liveHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-fuchsia-400/40 px-5 py-2.5 text-sm font-medium text-fuchsia-600 transition-colors hover:bg-fuchsia-500/10 dark:text-fuchsia-300">
                    Live demo <span aria-hidden="true">↗</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </motion.aside>

          {Architecture ? (
            <motion.div variants={modalReveal} className="min-w-0 lg:col-span-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className={sectionLabel}>Architecture</h3>
                <span className="text-xs text-zinc-500">Select a service to inspect it</span>
              </div>
              <div className="project-detail-diagram"><Architecture /></div>
            </motion.div>
          ) : null}

          {related.length > 0 ? (
            <motion.div variants={modalReveal} className="min-w-0 lg:col-span-2">
              <h3 className={sectionLabel}>Related by stack</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {related.map(({ item, shared }) => (
                  <button
                    key={item.project.title}
                    type="button"
                    onClick={() => onSelect(item)}
                    className="cursor-pointer rounded-2xl border border-zinc-950/10 bg-zinc-950/[0.02] p-4 text-left transition-colors hover:border-zinc-950/30 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/30"
                  >
                    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${trackAccent[item.track].dot}`} />
                      {trackAccent[item.track].label}
                    </span>
                    <span className="mt-2 block text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.project.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-zinc-500">Also uses {shared.join(", ")}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>

        {previous && next ? (
          <nav aria-label="Other projects" className="grid grid-cols-2 divide-x divide-zinc-950/10 border-t border-zinc-950/10 dark:divide-white/10 dark:border-white/10">
            <button type="button" onClick={() => onNavigate(-1)} className={`${navButton} items-start text-left`}>
              <span className={sectionLabel}><span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">←</span> Previous</span>
              <span className="w-full truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{previous.project.title}</span>
            </button>
            <button type="button" onClick={() => onNavigate(1)} className={`${navButton} items-end text-right`}>
              <span className={sectionLabel}>Next <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
              <span className="w-full truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{next.project.title}</span>
            </button>
          </nav>
        ) : null}
      </motion.div>
    </MotionConfig>
  );
}

export const Projects = () => {
  const { play } = useUISounds();
  const [track, setTrack] = useState<TrackKey>("all");
  const [layout, setLayout] = useState<LayoutKey>("gallery");
  const [selected, setSelected] = useState<SelectedProject | null>(null);

  const showDev = track === "all" || track === "dev";
  const showDesign = track === "all" || track === "design";
  const showData = track === "all" || track === "data";
  // Container-driven, not viewport-gated: gallery packs as many 320px columns
  // as fit at any width, feature is always a single full-width row.
  const groupGrid =
    layout === "gallery"
      ? "grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]"
      : "grid grid-cols-1 gap-6";

  // The modal steps through whatever the active filter is showing, in page order.
  const visible: SelectedProject[] = [
    ...(showDev ? projects.map((project) => ({ track: "dev" as const, project })) : []),
    ...(showDesign ? designProjects.map((project) => ({ track: "design" as const, project })) : []),
    ...(showData ? dataProjects.map((project) => ({ track: "data" as const, project })) : []),
  ];
  const selectedIndex = selected ? visible.findIndex((item) => item.project === selected.project) : -1;
  const sibling = (step: number) =>
    visible.length > 1 ? visible[(selectedIndex + step + visible.length) % visible.length] : undefined;
  const navigate = (step: number) => {
    const target = sibling(step);
    if (target) setSelected(target);
  };
  const related: RelatedProject[] = selected
    ? visible
        .filter((item) => item.project !== selected.project)
        .map((item) => ({ item, shared: chipsOf(item).filter((chip) => chipsOf(selected).includes(chip)) }))
        .filter(({ shared }) => shared.length > 0)
        .sort((a, b) => b.shared.length - a.shared.length)
        .slice(0, 3)
    : [];
  const handleModalKeyDown =(event: KeyboardEvent) => {
    if (event.defaultPrevented) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") play("navigate");
    if (event.key === "ArrowRight") navigate(1);
    if (event.key === "ArrowLeft") navigate(-1);
  };

  return (
    <section className="portfolio-projects w-full py-10 lg:py-16">
      <div className="mb-8 flex flex-col gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400/80">Selected work</p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-950 dark:text-white">Projects built from product idea to working software</h2>
        </div>
        <p className="max-w-[40rem] text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          Full-stack products, brand systems and data work — spanning real-time experiences, cloud architecture, visual identity and analysis.
        </p>
      </div>

      <div className="project-controls mb-7 flex flex-wrap items-center gap-4 border-b border-zinc-950/10 pb-5 dark:border-white/10">
        <div className="flex flex-wrap gap-2">
          {trackFilters.map((filter) => {
            const active = track === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setTrack(filter.key)}
                aria-pressed={active}
                data-active={active}
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
                aria-pressed={active}
                data-active={active}
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
            <ProjectCard key={project.title} project={project} onOpen={() => setSelected({ track: "dev", project })} />
          ))}
        </div>
      ) : null}

      {showDesign ? (
        <div className={`${groupGrid} ${track === "all" ? "mt-6" : ""}`}>
          {designProjects.map((project) => (
            <DesignCard key={project.title} project={project} layout={layout} onOpen={() => setSelected({ track: "design", project })} />
          ))}
        </div>
      ) : null}

      {showData ? (
        <div className={`${groupGrid} ${track === "all" ? "mt-6" : ""}`}>
          {dataProjects.map((project) => (
            <DataCard key={project.title} project={project} onOpen={() => setSelected({ track: "data", project })} />
          ))}
        </div>
      ) : null}

      {selected ? (
        <Modal
          onClose={() => setSelected(null)}
          onKeyDown={handleModalKeyDown}
          labelledBy={PROJECT_MODAL_TITLE_ID}
          scrollResetKey={selected.project.title}
        >
          <ProjectDetails
            selected={selected}
            index={selectedIndex}
            total={visible.length}
            previous={sibling(-1)}
            next={sibling(1)}
            related={related}
            onNavigate={navigate}
            onSelect={setSelected}
          />
        </Modal>
      ) : null}
    </section>
  );
};
