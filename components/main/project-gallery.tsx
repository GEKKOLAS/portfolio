"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Images } from "lucide-react";
import { type KeyboardEvent, type PointerEvent, useId, useRef, useState } from "react";
import "./project-gallery.css";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export function ProjectGallery({
  title,
  screenshots,
}: {
  title: string;
  screenshots: ProjectScreenshot[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingId = useId();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currentIndex = Math.min(activeIndex, screenshots.length - 1);
  const current = screenshots[currentIndex];
  const hasMultiple = screenshots.length > 1;

  if (!current) return null;

  const select = (index: number) => {
    const nextIndex = (index + screenshots.length) % screenshots.length;
    setActiveIndex(nextIndex);
    const strip = thumbnailStripRef.current;
    const thumbnail = thumbnailRefs.current[nextIndex];
    if (strip && thumbnail) {
      strip.scrollTo({ left: thumbnail.offsetLeft - (strip.clientWidth - thumbnail.offsetWidth) / 2 });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (!hasMultiple) return;
    if (event.key === "ArrowLeft") select(currentIndex - 1);
    if (event.key === "ArrowRight") select(currentIndex + 1);
    if (event.key === "Home") select(0);
    if (event.key === "End") select(screenshots.length - 1);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!hasMultiple || event.pointerType === "mouse") return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const horizontal = event.clientX - start.x;
    const vertical = event.clientY - start.y;
    if (Math.abs(horizontal) >= 48 && Math.abs(horizontal) > Math.abs(vertical) * 1.2) {
      select(currentIndex + (horizontal < 0 ? 1 : -1));
    }
  };

  const controlClass =
    "project-gallery-control inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-950/15 bg-white text-zinc-800 transition-colors hover:border-fuchsia-400 hover:text-fuchsia-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-fuchsia-400 dark:hover:text-fuchsia-300";

  return (
    <section
      role="region"
      aria-roledescription={hasMultiple ? "carousel" : undefined}
      aria-labelledby={headingId}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="project-gallery min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 id={headingId} className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          <Images size={16} aria-hidden="true" />
          Screenshots
          <span className="sr-only"> of {title}</span>
        </h3>
        {hasMultiple ? (
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="text-xs font-medium tabular-nums text-zinc-500">
              {String(currentIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
            </span>
            <button type="button" aria-label="Previous screenshot" onClick={() => select(currentIndex - 1)} className={controlClass}>
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next screenshot" onClick={() => select(currentIndex + 1)} className={controlClass}>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <figure>
        <div
          className="project-gallery-stage relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-2xl border border-zinc-950/10 bg-zinc-950 sm:aspect-[16/10] dark:border-white/15"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { pointerStart.current = null; }}
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(min-width: 1080px) 960px, (min-width: 640px) 90vw, 100vw"
            className="select-none object-contain"
            draggable={false}
          />
        </div>
        <figcaption className="mt-3 flex min-h-5 flex-wrap items-baseline justify-between gap-x-4 gap-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <span>{current.caption ?? current.alt}</span>
          <a
            href={current.src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 underline decoration-zinc-400/50 underline-offset-4 hover:text-fuchsia-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 dark:hover:text-fuchsia-300"
          >
            Open full-size image
            <ExternalLink size={13} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>

      {hasMultiple ? (
        <div ref={thumbnailStripRef} className="relative mt-4 flex gap-2.5 overflow-x-auto px-1 py-2" role="group" aria-label="Choose a screenshot">
          {screenshots.map((screenshot, index) => (
            <button
              key={screenshot.src}
              ref={(node) => { thumbnailRefs.current[index] = node; }}
              type="button"
              aria-label={`Show screenshot ${index + 1}: ${screenshot.caption ?? screenshot.alt}`}
              aria-pressed={currentIndex === index}
              onClick={() => select(index)}
              className={`project-gallery-thumbnail relative h-[66px] w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 bg-zinc-950 transition-[border-color,opacity] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-500 sm:h-20 sm:w-32 ${
                currentIndex === index
                  ? "border-fuchsia-500 opacity-100 dark:border-fuchsia-300"
                  : "border-transparent opacity-55 hover:opacity-100"
              }`}
            >
              <Image src={screenshot.src} alt="" fill sizes="128px" className="object-contain" draggable={false} />
            </button>
          ))}
        </div>
      ) : null}

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Screenshot {currentIndex + 1} of {screenshots.length}: {current.caption ?? current.alt}
      </p>
    </section>
  );
}
