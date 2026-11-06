"use client";

import Image from "next/image";
import { type PointerEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  IconArrowUpRight,
  IconBrain,
  IconBrandPython,
  IconChartArrowsVertical,
  IconNetwork,
  IconRosette,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Modal } from "@/components/ui/modal";

type Certification = {
  title: string;
  badgeTitle: string;
  badgeIcon: typeof IconBrain;
  badgeColor: string;
  issuer: string;
  badgeIssuer: string;
  date: string;
  meta?: string;
  id: string;
  // Public verification page.
  href?: string;
  // The certificate PDF under /public.
  file: string;
  // Page 1 of the PDF rendered to an image, with its pixel size.
  preview: { src: string; width: number; height: number };
};

const certifications: Certification[] = [
  {
    title: "AI in Digital Marketing and E-commerce",
    badgeTitle: "AI & Digital Marketing",
    badgeIcon: IconChartArrowsVertical,
    badgeColor: "text-yellow-600 dark:text-yellow-300",
    issuer: "Google · via Udemy",
    badgeIssuer: "Google",
    date: "Oct 2026",
    meta: "37 minutes",
    id: "UC-3b756b9d-7ffb-490c-aefc-5cc9bfd2fb0c",
    href: "https://ude.my/UC-3b756b9d-7ffb-490c-aefc-5cc9bfd2fb0c",
    file: "/certificates/ai-digital-marketing-ecommerce.pdf",
    preview: { src: "/certificates/ai-digital-marketing-ecommerce.jpg", width: 1600, height: 1190 },
  },
  {
    title: "Google AI Professional Certificate",
    badgeTitle: "Google AI Professional",
    badgeIcon: IconBrain,
    badgeColor: "text-purple-600 dark:text-purple-300",
    issuer: "Google · via Udemy",
    badgeIssuer: "Google",
    date: "Sep 2026",
    meta: "4.5 hours",
    id: "UC-0b50c731-3080-4ad1-9b52-53e9b2c3fcbe",
    href: "https://ude.my/UC-0b50c731-3080-4ad1-9b52-53e9b2c3fcbe",
    file: "/certificates/google-ai-professional.pdf",
    preview: { src: "/certificates/google-ai-professional.jpg", width: 1600, height: 1190 },
  },
  {
    title: "Masterclass: MCP para empresas",
    badgeTitle: "MCP for Business",
    badgeIcon: IconNetwork,
    badgeColor: "text-cyan-700 dark:text-cyan-300",
    issuer: "Código Facilito",
    badgeIssuer: "Código Facilito",
    date: "Jun 2026",
    meta: "2h 27m",
    id: "5990137f-d488-4ddd-b358-150b11158fb1",
    file: "/certificates/mcp-business-masterclass.pdf",
    preview: { src: "/certificates/mcp-business-masterclass.jpg", width: 1600, height: 1131 },
  },
  {
    title: "Masterclass de Python e IA Agéntica para Empresas",
    badgeTitle: "Python & Agentic AI",
    badgeIcon: IconBrandPython,
    badgeColor: "text-fuchsia-600 dark:text-fuchsia-300",
    issuer: "Código Facilito",
    badgeIssuer: "Código Facilito",
    date: "Jun 2026",
    meta: "1h 58m",
    id: "d23cc513-7a0d-4662-a8d3-45f2109e7397",
    file: "/certificates/python-agentic-ai-business.pdf",
    preview: { src: "/certificates/python-agentic-ai-business.jpg", width: 1600, height: 1131 },
  },
  {
    title: "Registered Scrum Basics™",
    badgeTitle: "Scrum Basics™",
    badgeIcon: IconUsersGroup,
    badgeColor: "text-green-700 dark:text-green-300",
    issuer: "Agile Education · Scrum Inc.",
    badgeIssuer: "Scrum Inc.",
    date: "Jun 2026",
    id: "RSB-6487665",
    file: "/certificates/registered-scrum-basics.pdf",
    preview: { src: "/certificates/registered-scrum-basics.jpg", width: 1600, height: 1236 },
  },
];

const CERTIFICATE_MODAL_TITLE_ID = "certificate-modal-title";
const actionButton =
  "shrink-0 cursor-pointer whitespace-nowrap rounded-full border border-yellow-400/30 px-3 py-1.5 text-xs font-semibold text-yellow-700 transition-colors hover:bg-yellow-400/10 dark:text-yellow-300";

export const Certifications = () => {
  const [viewing, setViewing] = useState<Certification | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissedBadge = useRef<string | null>(null);
  const activeTrigger = useRef<HTMLButtonElement | null>(null);

  const cancelHover = useCallback(() => {
    if (hoverTimer.current !== null) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  useEffect(() => cancelHover, [cancelHover]);

  const openCertificate = (cert: Certification, trigger: HTMLButtonElement) => {
    cancelHover();
    // Native dialog restores focus here after either click or hover opens it.
    activeTrigger.current = trigger;
    trigger.focus({ preventScroll: true });
    setViewing(cert);
  };

  const previewOnHover = (event: PointerEvent<HTMLButtonElement>, cert: Certification) => {
    cancelHover();
    if (
      viewing ||
      dismissedBadge.current === cert.id ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) return;

    const trigger = event.currentTarget;
    hoverTimer.current = setTimeout(() => openCertificate(cert, trigger), 650);
  };

  return (
    <div className="theme-paper certification-paper relative mt-5 overflow-hidden rounded-[2rem] border border-white/15 bg-white/70 p-5 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-zinc-900/70 sm:p-7 xl:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-yellow-400/[0.08] blur-3xl" />
      <div className="relative mb-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-yellow-500" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 dark:text-yellow-500">Credentials</h2>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Explore a badge to view its certificate</p>
      </div>
      <ul className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-5">
        {certifications.map((cert) => {
          const BadgeIcon = cert.badgeIcon;

          return (
            <li key={cert.id} className="min-w-0">
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`View ${cert.badgeTitle} certificate: ${cert.title}`}
                onClick={(event) => openCertificate(cert, event.currentTarget)}
                onPointerEnter={(event) => previewOnHover(event, cert)}
                onPointerDown={cancelHover}
                onPointerLeave={() => {
                  cancelHover();
                  if (dismissedBadge.current === cert.id) dismissedBadge.current = null;
                }}
                onBlur={cancelHover}
                className="group relative flex h-full w-full cursor-pointer flex-col items-center rounded-2xl border border-transparent px-2 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/25 hover:bg-white/65 hover:shadow-[0_12px_30px_-20px_rgba(0,0,0,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 motion-reduce:transform-none motion-reduce:transition-none dark:hover:bg-white/[0.04]"
              >
                <span aria-hidden="true" className={`relative mb-3 flex h-[5.25rem] w-[5.25rem] items-center justify-center transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none ${cert.badgeColor}`}>
                  <span className="absolute inset-2 rounded-full bg-current opacity-10" />
                  <IconRosette className="absolute inset-0 h-full w-full" stroke={1.15} />
                  <span className="absolute inset-3 rounded-full border border-current opacity-30" />
                  <BadgeIcon className="relative h-8 w-8" stroke={1.5} />
                </span>
                <span className="text-[13px] font-semibold leading-5 text-zinc-950 dark:text-white">{cert.badgeTitle}</span>
                <span className="mt-auto pt-1 text-[11px] text-zinc-600 dark:text-zinc-400">{cert.badgeIssuer}</span>
                <span className="mt-1 text-[10px] tracking-wide text-zinc-500 dark:text-zinc-500">{cert.date}</span>
                <IconArrowUpRight aria-hidden="true" className="absolute right-2 top-2 h-3.5 w-3.5 text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </button>
            </li>
          );
        })}
      </ul>

      {viewing ? (
        <Modal onClose={() => {
          cancelHover();
          dismissedBadge.current = activeTrigger.current?.matches(":hover") ? viewing.id : null;
          setViewing(null);
        }} labelledBy={CERTIFICATE_MODAL_TITLE_ID}>
          <div className="p-6 sm:p-8">
            <p className="pr-12 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 dark:text-yellow-500">
              {viewing.issuer} · {viewing.date}
            </p>
            <h2 id={CERTIFICATE_MODAL_TITLE_ID} className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              {viewing.title}
            </h2>
            {viewing.meta ? <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{viewing.meta}</p> : null}
            <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-950/10 bg-white dark:border-white/10">
              <Image
                src={viewing.preview.src}
                alt={`${viewing.title} certificate`}
                width={viewing.preview.width}
                height={viewing.preview.height}
                sizes="(min-width: 1080px) 960px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="min-w-0 truncate text-xs tracking-wide text-zinc-500">{viewing.id}</p>
              <div className="flex flex-wrap gap-2">
                <a href={viewing.file} target="_blank" rel="noopener noreferrer" className={actionButton}>
                  Open PDF ↗
                </a>
                {viewing.href ? (
                  <a href={viewing.href} target="_blank" rel="noopener noreferrer" className={actionButton}>
                    Verify ↗
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
