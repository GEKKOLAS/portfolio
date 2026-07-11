import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Infinity Commerce",
    subtitle: "E-commerce platform",
    description:
      "A modern shopping experience built with ASP.NET and Angular Material, featuring secure auth, product flows, order processing, and a polished storefront.",
    image: "/ecomercerappt.jpg",
    href: "https://infinitycomex.com/",
    stack: ["ASP.NET", "Angular", "EF Core", "Material UI"],
    highlights: ["Scalable backend", "Marketplace-ready UX", "Commercial deployment"],
  },
  {
    title: "LMS Learning Hub",
    subtitle: "Education platform",
    description:
      "A full learning portal focused on course delivery, user management, progress tracking, and a clear student-teacher experience.",
    image: "/learning.jpg",
    stack: ["Next.js", "Tailwind", "API routes", "Design system"],
    highlights: ["Structured content", "Role-based flows", "Engagement-first UI"],
  },
  {
    title: "Pulse Chat",
    subtitle: "Real-time communication",
    description:
      "A chat experience with instant messaging, responsive layout, and a modern interface built for fast collaboration.",
    image: "/chat.jpg",
    stack: ["React", "Socket.io", "Node", "Realtime UI"],
    highlights: ["Live interactions", "Fast feedback loops", "Modern messaging UX"],
  },
  {
    title: "Book Verse",
    subtitle: "Digital bookstore",
    description:
      "A curated reading experience combining browsing, filtering, and product storytelling into a calm and polished storefront.",
    image: "/Books.jpg",
    stack: ["React", "Styled Components", "CMS", "Accessibility"],
    highlights: ["Editorial feel", "Content-first layout", "Readable experience"],
  },
];

export const Projects = () => {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400/80">Selected work</p>
          <h2 className="text-3xl font-semibold text-zinc-950 dark:text-white">Projects that blend product thinking and polished UI</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          I focus on product clarity, calm visual systems, and front-end craftsmanship that make complex experiences feel effortless.
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/70 p-4 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:bg-zinc-900/70"
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-fuchsia-500/80">
                  <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
                  {project.subtitle}
                </div>
                <h3 className="text-2xl font-semibold text-zinc-950 dark:text-white">{project.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.highlights.map((item) => (
                    <span key={item} className="text-sm text-zinc-500 dark:text-zinc-400">
                      • {item}
                    </span>
                  ))}
                </div>

                {project.href ? (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-950 transition-colors hover:text-fuchsia-600 dark:text-white dark:hover:text-fuchsia-300"
                  >
                    View project
                    <span aria-hidden="true">↗</span>
                  </Link>
                ) : null}
              </div>

              <div className="order-1 lg:order-2">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-zinc-950/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={900}
                    height={600}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] lg:h-80"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
