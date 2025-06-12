import { ModeToggle } from "@/components/ui/toggle-theme";

import { Projects } from "@/components/main/projects";
import { Profile } from "@/components/main/profile";

import { About } from "@/components/main/about";

import { Experience } from "@/components/main/experience";

import { Banner } from "@/components/main/banner";

export default function Home() {
  return (
    <section id="home" className="bg-white antialiased dark:bg-transparent">
      <div className="grid h-full lg:grid-cols-2 md:grid gap-4 ">
        <div className="flex items-center justify-center h-full w-full pl-8 pr-8 pb-8 overscroll-contain md:static  sm:static  lg:sticky 2xl:top-25 md:top-0">
          <Profile />
          <ModeToggle />
        </div>
        <div
          id="timeline"
          className="flex-1 pr-8 h-full flex flex-col items-center justify-center overscroll-contain"
        >
          <Experience />
        </div>
        <div></div>
        <div
          id="about"
          className="w-full h-full py-15 flex flex-col items-center justify-center overscroll-contain overflow-hidden"
        >
          <About />
        </div>
        <div></div>
        <div className="w-full h-full py-15 flex flex-col items-center justify-center overscroll-contain overflow-hidden">
          <Banner />
        </div>
        <div />
        <div
          id="projects"
          className="w-full py-15 flex flex-col items-center justify-center"
        >
          <Projects />
        </div>
      </div>
    </section>
  );
}
