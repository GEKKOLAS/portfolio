import Image from "next/image";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { Projects } from "@/components/main/projects";
import { Profile } from "@/components/main/profile";
import { Navbar } from "@/components/main/navbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { About } from "@/components/main/about";


export default function Home() {
  return (
    <section className="bg-white antialiased dark:bg-transparent md:py-8">
      <div className="flex flex-col-1 md:grid-cols-1 sm:grid-cols-1 h-full">
        <div className="flex items-center justify-center">
          <Profile/>
        </div>
        <div className="w-3/3 flex flex-col items-center justify-center">
          <Projects />
        </div>
      </div>
    </section>
  );
}
