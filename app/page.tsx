import Image from "next/image";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { Projects } from "@/components/main/projects";
import { Profile } from "@/components/main/profile";
import { Navbar } from "@/components/main/navbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { About } from "@/components/main/about";
import { Contact } from "@/components/main/contact";

import { Experience } from "@/components/main/experience";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Banner } from "@/components/main/banner";

export default function Home() {
  return (
    <section className="bg-white antialiased dark:bg-transparent md:py-8">
      <div className="grid h-full lg:grid-cols-2 md:grid gap-4 ">
        <div className="flex items-center justify-center h-full w-full pl-8 pr-8 pb-8 pt-8 overscroll-contain md:static  sm:static  lg:sticky lg:top-0">
          <Profile /> 
          <ModeToggle />
        </div>
        <div className="flex-1 pr-8 h-full flex flex-col items-center justify-center overscroll-contain">
          <About />
        </div>
        <div></div>
        <div className="w-full h-full py-15 flex flex-col items-center justify-center overscroll-contain overflow-hidden">
          <Experience />
        </div>
        <div></div>
        <div className="w-full h-full py-15 flex flex-col items-center justify-center overscroll-contain overflow-hidden">
          <Banner />
        </div>
        <div />
        <div className="w-full py-15 flex flex-col items-center justify-center">
          <Projects />
        </div>
      </div>
    </section>
  );
}
