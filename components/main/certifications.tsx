"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type Certification = {
  title: string;
  issuer: string;
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
    issuer: "Google · via Udemy",
    date: "Oct 2026",
    meta: "37 minutes",
    id: "UC-3b756b9d-7ffb-490c-aefc-5cc9bfd2fb0c",
    href: "https://ude.my/UC-3b756b9d-7ffb-490c-aefc-5cc9bfd2fb0c",
    file: "/certificates/ai-digital-marketing-ecommerce.pdf",
    preview: { src: "/certificates/ai-digital-marketing-ecommerce.jpg", width: 1600, height: 1190 },
  },
  {
    title: "Google AI Professional Certificate",
    issuer: "Google · via Udemy",
    date: "Sep 2026",
    meta: "4.5 hours",
    id: "UC-0b50c731-3080-4ad1-9b52-53e9b2c3fcbe",
    href: "https://ude.my/UC-0b50c731-3080-4ad1-9b52-53e9b2c3fcbe",
    file: "/certificates/google-ai-professional.pdf",
    preview: { src: "/certificates/google-ai-professional.jpg", width: 1600, height: 1190 },
  },
  {
    title: "Masterclass de Python e IA Agéntica para Empresas",
    issuer: "Código Facilito",
    date: "Jun 2026",
    meta: "1h 58m",
    id: "d23cc513-7a0d-4662-a8d3-45f2109e7397",
    file: "/certificates/python-agentic-ai-business.pdf",
    preview: { src: "/certificates/python-agentic-ai-business.jpg", width: 1600, height: 1131 },
  },
  {
    title: "Registered Scrum Basics™",
    issuer: "Agile Education · Scrum Inc.",
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

  return (
    <div className="theme-paper certification-paper relative mt-5 overflow-hidden rounded-[2rem] border border-white/15 bg-white/70 p-5 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-zinc-900/70 sm:p-7 xl:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-yellow-400/[0.08] blur-3xl" />
      <div className="relative mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-yellow-500" />
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 dark:text-yellow-500">Certifications</p>
      </div>
      <ul className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {certifications.map((cert) => (
          <li
            key={cert.id}
            className="flex flex-col overflow-hidden rounded-[1.25rem] border border-zinc-200/70 bg-white/55 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
          >
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`View certificate: ${cert.title}`}
              onClick={() => setViewing(cert)}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-white"
            >
              <Image
                src={cert.preview.src}
                alt=""
                fill
                sizes="(min-width: 640px) 420px, 90vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="certificate-preview-label rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-zinc-950">View certificate</span>
              </span>
            </button>
            <div className="flex flex-1 flex-col gap-3 border-t border-zinc-200/70 p-4 dark:border-white/10">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-zinc-950 dark:text-white">{cert.title}</p>
                <p className="mt-0.5 text-[12.5px] text-zinc-600 dark:text-zinc-400">
                  {cert.issuer} · {cert.date}
                  {cert.meta ? ` · ${cert.meta}` : ""}
                </p>
                <p className="mt-0.5 truncate text-[10.5px] tracking-wide text-zinc-400 dark:text-zinc-600">{cert.id}</p>
              </div>
              {cert.href ? (
                <a href={cert.href} target="_blank" rel="noopener noreferrer" className={`${actionButton} mt-auto self-start`}>
                  Verify ↗
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {viewing ? (
        <Modal onClose={() => setViewing(null)} labelledBy={CERTIFICATE_MODAL_TITLE_ID}>
          <div className="p-6 sm:p-8">
            <p className="pr-12 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 dark:text-yellow-500">
              {viewing.issuer} · {viewing.date}
            </p>
            <h2 id={CERTIFICATE_MODAL_TITLE_ID} className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
              {viewing.title}
            </h2>
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
