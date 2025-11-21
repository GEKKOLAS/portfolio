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
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [fireDone, setFireDone] = React.useState(false); // revert to original sequence

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // loader finished, fire effect starts automatically
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-[200vh]" >
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <LoaderFour />
          </motion.div>
        ) : !fireDone ? (
          <motion.div
            key="fire"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <FireRevealOverlay
              text=""
              durationMs={6000}
              onComplete={() => setFireDone(true)}
            />
          </motion.div>
        ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
              exit={{ opacity: 0 }}
            >
              {/* Content after fire effect */}
              <SplashCursor />
              <section id="home" className="bg-white antialiased dark:bg-transparent">
                <div className="grid h-full lg:grid-cols-2 md:grid gap-4" id="turbulent-displace">
                  <div className="flex items-center justify-center h-full w-full pl-8 pr-8 pb-8 overscroll-contain md:static  sm:static  lg:sticky 2xl:top-25 md:top-0">
                    <Profile />
                    <div className="absolute top-4 right-4">
                      <AnimatedThemeToggler />
                    </div>
                  </div>
                  <div
                    id="timeline"
                    className="flex-1 pr-8 h-full flex flex-col items-center justify-center overscroll-contain"
                  >
                    <Experience />
                  </div>
                  <div />
                  <div
                    id="about"
                    className="w-full h-full py-15 flex flex-col items-center justify-center overscroll-contain overflow-hidden"
                  >
                    <About />
                  </div>
                  <div />
                  <div className="w-full h-full py-15 flex flex-col items-center justify-center overscroll-contain overflow-hidden">
                    <Skills />
                  </div>
                  <div />
                  <div
                    id="projects"
                    className="w-full py-15 flex flex-col items-center justify-center"
                  >
                    <Projects />
                  </div>
                  <div />
                  <div className="w-full h-full flex flex-col items-center justify-center" id="services">
                    <AnimatedTestimonialsDemo />
                  </div>
                </div>
              </section>
            </motion.div>
          )}
      </AnimatePresence>
    </main>
  );
}

