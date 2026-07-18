"use client";

import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useRef } from "react";

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

type Project = (typeof projects)[number];

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

export const Projects = () => (
  <section className="w-full py-10 lg:py-16">
    <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400/80">Selected work</p>
        <h2 className="text-3xl font-semibold text-zinc-950 dark:text-white">Projects built from product idea to working software</h2>
      </div>
      <p className="max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
        Full-stack products spanning real-time experiences, cloud architecture, automation, and polished interfaces.
      </p>
    </div>

    <div className="grid gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  </section>
);
