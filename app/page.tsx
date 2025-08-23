"use client";
import { Projects } from "@/components/main/projects";
import { Profile } from "@/components/main/profile";
import { About } from "@/components/main/about";
import { Experience } from "@/components/main/experience";
import { AnimatedTestimonialsDemo } from "@/components/main/services";
import Skills from "@/components/StackTech/SkillContent";
import SplashCursor from "@/components/ui/splashCursor";
import { LoaderFour } from "@/components/ui/loader";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import React from "react";


export default function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); // 7 seconds delay

    // Set initial opacity
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 6s ease-in-out';

    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 7000); // Start transition exactly when loader disappears

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-[200vh]">
      {/* Loader */}
      {loading ? (
        <LoaderFour />
      ) : (
        <>
          <SplashCursor />
            <section id="home" className="bg-white antialiased dark:bg-transparent">
              <div className="grid h-full lg:grid-cols-2 md:grid gap-4 ">
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
          </>
        )}
    </main>
  );
}
