import { StickyScroll } from "../ui/sticky-scroll-reveal";
import Image from "next/image";

const ProjectImageCard = ({
  href,
  src,
  alt,
}: {
  href?: string;
  src: string;
  alt: string;
}) => {
  const content = (
    <div className={`group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 ${href ? "cursor-pointer hover:scale-[1.03] hover:shadow-2xl hover:border-white/20" : "shadow-sm"}`}>
      <Image
        src={src}
        width={300}
        height={300}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        alt={alt}
      />
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Ver proyecto ${alt}`}>
      {content}
    </a>
  ) : (
    content
  );
};

const content = [
  {
    title: "Ecommerce App",
    description:
      "Ecommerce app built with ASP.NET as the backend and Angular with Angular Material as the frontend delivers a modern, scalable shopping experience. The backend, powered by ASP.NET, handles secure user authentication, product management, order processing, and database interactions using Entity Framework.",
    content: (
      <ProjectImageCard
        href="https://infinitycomex.com/"
        src="/ecomercerappt.jpg"
        alt="Ecommerce App"
      />
    ),
  },
  {
    title: "Learning Management System (LMS)",
    description:
      "A Learning Management System (LMS) is a software application for the administration, documentation, tracking, reporting, and delivery of educational courses or training programs. It provides a centralized platform for educators and learners to interact, manage course content, and track progress.",
    content: (
      <ProjectImageCard src="/learning.jpg" alt="Learning Management System" />
    ),
  },
  {
    title: "Real-time Chat Application",
    description:
      "A real-time chat application is a software program that enables users to communicate with each other in real-time through text, voice, or video. It typically includes features such as instant messaging, group chats, file sharing, and notifications.",
    content: (
      <ProjectImageCard src="/chat.jpg" alt="Real-time Chat Application" />
    ),
  },
  {
    title: "Books Store",
    description:
      "A book store is a retail establishment that sells books, magazines, and other printed materials. It may also offer related products such as stationery, gifts, and educational materials. Book stores can be independent or part of a larger chain and often provide a cozy atmosphere for browsing and reading.",
    content: (
      <ProjectImageCard src="/Books.jpg" alt="Books Store" />
    ),
  },
  {
    title: "Car Rental System",
    description:
      "A car rental system is a software application that allows users to rent vehicles for a specified period. It typically includes features such as vehicle availability, booking management, payment processing, and customer support. The system can be used by both rental companies and customers to streamline the rental process.",
    content: (
      <ProjectImageCard src="/chat.jpg" alt="Car Rental System" />
    ),
  },
];

export const Projects = () => {
  return (
    <StickyScroll content={content} />
  );
};
