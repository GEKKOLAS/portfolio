import React from "react";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export const Navbar = () => {
  return (
    <header className="w-full">
      <nav aria-label="Portfolio sections" className="px-1 py-4 sm:px-2 xl:py-5 2xl:py-7">
        <div className="mx-auto flex max-w-xl items-center justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] sm:gap-x-6 sm:text-sm lg:gap-x-3 lg:text-[0.7rem] xl:gap-x-5 xl:text-xs 2xl:gap-x-7 2xl:text-sm">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="nav-item group relative py-1.5 text-rose-500 transition-colors duration-200 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/70"
              >
                About
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-rose-400 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="nav-item group relative py-1.5 text-blue-500 transition-colors duration-200 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
              >
                Projects
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-blue-400 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  scrollToSection("services");
                  window.dispatchEvent(new CustomEvent("triggerSocialAnimation"));
                }}
                className="nav-item group relative py-1.5 text-cyan-500 transition-colors duration-200 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
              >
                Services
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan-400 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  scrollToSection("skills");
                  window.dispatchEvent(new CustomEvent("triggerSocialAnimation"));
                }}
                className="nav-item group relative py-1.5 text-purple-500 transition-colors duration-200 hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70"
              >
                Stack
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-purple-400 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("timeline")}
                className="nav-item group relative py-1.5 text-yellow-500 transition-colors duration-200 hover:text-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
              >
                Timeline
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-yellow-400 transition-transform duration-200 group-hover:scale-x-100" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
