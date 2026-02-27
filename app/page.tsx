"use client";
import { Projects } from "@/components/main/projects";
import { Profile } from "@/components/main/profile";
import { About } from "@/components/main/about";
import { Experience } from "@/components/main/experience";
import { AnimatedTestimonialsDemo } from "@/components/main/services";
import Skills from "@/components/StackTech/SkillContent";
import SplashCursor from "@/components/ui/splashCursor";
import { FireRevealOverlay } from "@/components/effects/fire-reveal-overlay";
import { LoaderFour } from "@/components/ui/loader";
import { UnicornStudioDivider } from "@/components/effects/unicornstudio-divider";
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

    const setActive = (active: HTMLElement) => {
      for (const section of sections) section.classList.remove("is-active");

      // Force restart of the keyframe animation when re-activating.
      active.classList.remove("is-active");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      active.offsetHeight;
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
        root: scrollRoot,
        threshold: [0.35, 0.5, 0.65, 0.8],
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

          <div className="relative grid min-h-[100dvh] lg:grid-cols-2 gap-4 bg-transparent antialiased" id="turbulent-displace">
            {/* Background divider (between left/right panels on desktop) */}
            <UnicornStudioDivider
              projectId="87f73EZDBHyi74vnR17e"
              className="pointer-events-none hidden lg:block absolute inset-0 z-0"
              style={{ width: "100%", height: "100%" }}
            />

            {/* Left panel (fixed on desktop) */}
            <div className="relative z-10 flex items-center justify-center w-full px-8 pb-8 lg:h-[100dvh] lg:sticky lg:top-0 overflow-hidden">
              <Profile />
            </div>

            {/* Right panel (ONLY scroll container on desktop) */}
            <div className="relative z-10 right-scroll pr-8">
              <section
                id="about"
                className="snap-section bg-transparent"
                data-snap-anim="zoom"
              >
                <div className="snap-content h-full w-full flex items-center justify-center overflow-hidden">
                  <About />
                </div>
              </section>

              <section
                id="timeline"
                className="snap-section bg-transparent"
                data-snap-anim="backwards"
              >
                <div className="snap-content h-full w-full flex items-center justify-center">
                  <Experience />
                </div>
              </section>

              <section
                id="skills"
                className="snap-section bg-transparent"
                data-snap-anim="horizontal"
              >
                <div className="snap-content h-full w-full flex items-center justify-center overflow-hidden">
                  <Skills />
                </div>
              </section>

              <section
                id="projects"
                className="snap-section bg-transparent"
                data-snap-anim="blink"
              >
                <div className="snap-content h-full w-full flex items-center justify-center">
                  <Projects />
                </div>
              </section>

              <section
                id="services"
                className="snap-section bg-transparent"
                data-snap-anim="zoom"
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

