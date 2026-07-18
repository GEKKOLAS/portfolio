"use client";
import { Projects } from "@/components/main/projects";
import { Profile } from "@/components/main/profile";
import { About } from "@/components/main/about";
import { Experience } from "@/components/main/experience";
import { AnimatedTestimonialsDemo } from "@/components/main/services";
import Skills from "@/components/StackTech/SkillContent";
import SplashCursor from "@/components/ui/splashCursor";
import { FireRevealOverlay } from "@/components/effects/fire-reveal-overlay";
import { ScrollLineDrawing } from "@/components/effects/scroll-line-drawing";
import { LoaderFour } from "@/components/ui/loader";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [fireDone, setFireDone] = React.useState(false); // fire controls content entrance
  const [whiteShown, setWhiteShown] = React.useState(false); // white background visibility
  const [showContent, setShowContent] = React.useState(false); // content appears 0.5s after white background

  React.useEffect(() => {
    if (!showContent) return;

    const scrollRoot = document.querySelector<HTMLElement>(".right-scroll");
    if (!scrollRoot) return;

    const sections = Array.from(
      scrollRoot.querySelectorAll<HTMLElement>(".snap-section")
    );
    if (sections.length === 0) return;

    const animatedSections = new WeakSet<HTMLElement>();

    const setActive = (active: HTMLElement) => {
      // Each section should enter only once instead of restarting whenever
      // IntersectionObserver reports a slightly different visibility ratio.
      if (animatedSections.has(active)) return;
      animatedSections.add(active);
      active.classList.add("is-active");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = visible[0]?.target as HTMLElement | undefined;
        if (top) setActive(top);
      },
      {
        // Desktop scrolls inside this panel; mobile scrolls in the viewport.
        root:
          scrollRoot.scrollHeight > scrollRoot.clientHeight + 1
            ? scrollRoot
            : null,
        threshold: [0.15, 0.3, 0.5],
      }
    );

    for (const section of sections) observer.observe(section);

    // Initial active section
    setActive(sections[0]);

    return () => observer.disconnect();
  }, [showContent]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // loader finished, fire effect starts automatically
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-[100dvh]">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <LoaderFour />
          </motion.div>
        )}
        {!loading && !fireDone && (
          <motion.div
            key="fire"
            className="fixed inset-0 z-40 pointer-events-none w-full h-full flex items-center justify-center bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <FireRevealOverlay
              text="" // omit text drawing
              imageSrc="/2.svg"
              videoSrc="" // video fallback for animated mask
              useLogoMask // activar uso de imagen como máscara
              imageScale={1.0} // escala del contenido interno
              imageScaleY={1.0} // escala vertical relativa
              maskScale={150} // reducir ligeramente el tamaño en el viewport
              imageFit="cover" // cubrir el viewport (más grande)
              showWhiteBackground={true} // mantiene fase blanca inicial
              fireColor={[1.6,0.4,2.2]} // fuego púrpura
              startDelayMs={700} // retraso para que no aparezca tan rápido
              durationMs={9800}
              onComplete={() => setFireDone(true)}
              reveal
              onWhiteShown={() => {
                if (!whiteShown) {
                  setWhiteShown(true);
                  setTimeout(() => setShowContent(true), 500);
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Content aparece 0.5s después del fondo blanco detrás del overlay (z-40) */}
      <AnimatePresence>
      {showContent && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.3, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.9 } }}
          className="contents"
        >
          <SplashCursor />

          <div className="relative grid min-h-[100dvh] gap-3 bg-transparent antialiased lg:grid-cols-[minmax(260px,0.62fr)_minmax(0,1.38fr)] xl:grid-cols-[minmax(280px,0.58fr)_minmax(0,1.42fr)]" id="turbulent-displace">
            {/* Left panel (fixed on desktop) */}
            <div className="relative z-10 flex items-center justify-center w-full px-4 pb-8 lg:h-[100dvh] lg:sticky lg:top-0 overflow-hidden lg:px-2 xl:px-3">
              <Profile />
            </div>

            {/* Right panel (ONLY scroll container on desktop) */}
            <div className="relative z-10 right-scroll px-3 lg:pl-2 lg:pr-5 xl:pl-3 xl:pr-8">
              <ScrollLineDrawing />
              <section
                id="about"
                className="snap-section relative z-10 bg-transparent"
                data-snap-anim="zoom"
              >
                <div className="snap-content h-full w-full flex items-center justify-center overflow-hidden">
                  <About />
                </div>
              </section>

              <section
                id="timeline"
                className="snap-section relative z-10 bg-transparent"
                data-snap-anim="horizontal"
              >
                <div className="snap-content h-full w-full flex items-center justify-center">
                  <Experience />
                </div>
              </section>

              <section
                id="skills"
                className="snap-section relative z-10 bg-transparent w-full"
                data-snap-anim="rotate"
              >
                <div className="snap-content h-full w-full flex items-center justify-center overflow-hidden">
                  <Skills />
                </div>
              </section>

              <section
                id="projects"
                className="snap-section relative z-10 bg-transparent"
                data-snap-anim="backwards"
              >
                <div className="snap-content h-full w-full flex items-center justify-center">
                  <Projects />
                </div>
              </section>

              <section
                id="services"
                className="snap-section relative z-10 bg-transparent"
                data-snap-anim="blink"
              >
                <div className="snap-content h-full w-full flex items-center justify-center">
                  <AnimatedTestimonialsDemo />
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </main>
  );
}

