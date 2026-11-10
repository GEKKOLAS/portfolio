"use client";

import React from "react";

/**
 * Makes each `.snap-section` in the right panel peel off like a sheet of paper
 * as its end scrolls past the top: it lifts from its bottom edge, tilts in 3D
 * and flies away. The direction comes from the section's `data-fly` attribute
 * (see `.paper-fly` in globals.css).
 *
 * The motion is tied to the scroll position, not to time, so scrolling back up
 * brings the sheet back. Only the progress (`--fly`, 0–1) is written here.
 */
export function PaperFlyOut() {
  const hostRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const scrollRoot = hostRef.current?.closest<HTMLElement>(".right-scroll");
    if (!scrollRoot) return;
    const sections = Array.from(scrollRoot.querySelectorAll<HTMLElement>(".snap-section[data-fly]"));
    if (!sections.length) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const h = scrollRoot.clientHeight;
        const scrollTop = scrollRoot.scrollTop;
        for (const section of sections) {
          // Layout position, not getBoundingClientRect(): the rect includes the
          // section's own fly transform, which would feed back into the progress.
          const bottom = section.offsetTop + section.offsetHeight - scrollTop;
          // Starts when the section's end reaches 78% of the panel height and
          // finishes as that end leaves the top.
          const start = h * 0.78;
          const end = h * 0.04;
          const raw = Math.min(1, Math.max(0, (start - bottom) / (start - end)));
          // Ease-in: the sheet lifts gently, then accelerates away.
          const p = raw * raw * (1.4 - 0.4 * raw);

          if (p <= 0) {
            if (section.classList.contains("is-flying")) {
              section.classList.remove("is-flying");
              section.style.removeProperty("--fly");
            }
          } else {
            section.classList.add("is-flying");
            section.style.setProperty("--fly", p.toFixed(4));
          }
        }
      });
    };

    scrollRoot.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      scrollRoot.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      for (const section of sections) {
        section.classList.remove("is-flying");
        section.style.removeProperty("--fly");
      }
    };
  }, []);

  return <span ref={hostRef} hidden />;
}
