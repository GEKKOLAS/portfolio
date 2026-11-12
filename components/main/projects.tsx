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
  // First on purpose: it shows the whole profile in one project (process analysis,
  // automation, ad campaigns and measurable hours saved).
  {
    title: "SMB Automation Suite",
    subtitle: "n8n & Zapier workflow library",
    description:
      "The automations I build for small and medium businesses, from mapping the process to the workflow that runs it: lead capture and CRM sync, AI lead scoring, weekly Meta and Google Ads reports, and invoicing. Each workflow comes with a generated explainer video, setup steps and an import-ready n8n or Zapier file.",
    image: "/project-automation.png",
    href: "https://github.com/GEKKOLAS/smb-automations-",
    stack: ["n8n", "Zapier", "OpenAI", "Meta & Google Ads", "Next.js"],
    highlights: ["From process analysis to running automation", "Ads, CRM and follow-ups connected", "Explainer video for every workflow"],
  },
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
    subtitle: "Gamified learning platform",
    description:
      "Arcana Academy turns courses into gamified expeditions: students earn XP and mana, build streaks, unlock ranks and badges, duel on quizzes, and spend rewards in an in-app shop, while teachers build and manage structured courses. A built-in demo mode runs the whole app from the browser with no backend.",
    image: "/project-lms.png",
    href: "https://github.com/GEKKOLAS/LMS",
    stack: ["Next.js 14", "Express", "PostgreSQL", "Prisma", "Clerk", "Stripe", "Amazon S3"],
    highlights: ["XP, mana, ranks and badges", "Stripe-powered rewards shop", "No-backend demo mode"],
  },

].map((project) => {
  const screenshots = projectScreenshots[project.title];
  return screenshots?.length
    ? { ...project, image: screenshots[0].src, screenshots }
    : project;
});

type SelectedProject = { track: "dev"; project: DevProject };

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
};

const PROJECT_MODAL_TITLE_ID = "project-modal-title";

const chipsOf = (item: SelectedProject) => item.project.stack;

type RelatedProject = { item: SelectedProject; shared: string[] };

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
  const eyebrow = selected.project.subtitle;
  const screenshots = selected.project.screenshots;
  const image = screenshots?.length ? undefined : selected.project.image;
  const chips = chipsOf(selected);
  const Architecture = selected.project.architecture;
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
            <div className="relative w-full aspect-[1200/630]">
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
              {selected.project.details?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">{paragraph}</p>
              ))}
            </motion.div>

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
          </div>

          <motion.aside variants={modalReveal} className="h-fit rounded-[1.5rem] border border-zinc-950/10 bg-zinc-950/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.04]">
            <h3 className={sectionLabel}>Tech stack</h3>
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

            {selected.project.href || selected.project.liveHref ? (
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
  const [selected, setSelected] = useState<SelectedProject | null>(null);

  // The modal steps through the projects in page order.
  const visible: SelectedProject[] = projects.map((project) => ({ track: "dev" as const, project }));
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
          Full-stack products and business automations, spanning real-time experiences, e-commerce, logistics and cloud architecture.
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onOpen={() => setSelected({ track: "dev", project })} />
        ))}
      </div>

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
