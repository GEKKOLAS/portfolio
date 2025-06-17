import { StickyScroll } from "../ui/sticky-scroll-reveal";
import React from "react";
import Image from "next/image";


const content = [
  {
    title: "Ecommerce App",
    description:
      "Ecommerce app built with ASP.NET as the backend and Angular with Angular Material as the frontend delivers a modern, scalable shopping experience. The backend, powered by ASP.NET, handles secure user authentication, product management, order processing, and database interactions using Entity Framework.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <Image
          src="/ecomercerappt.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Learning Management System (LMS)",
    description:
      "A Learning Management System (LMS) is a software application for the administration, documentation, tracking, reporting, and delivery of educational courses or training programs. It provides a centralized platform for educators and learners to interact, manage course content, and track progress.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/learning.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Real-time Chat Application",
    description:
      "A real-time chat application is a software program that enables users to communicate with each other in real-time through text, voice, or video. It typically includes features such as instant messaging, group chats, file sharing, and notifications.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/chat.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Books Store",
    description:
      "A book store is a retail establishment that sells books, magazines, and other printed materials. It may also offer related products such as stationery, gifts, and educational materials. Book stores can be independent or part of a larger chain and often provide a cozy atmosphere for browsing and reading.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/Books.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Car Rental System",
    description:
      "A car rental system is a software application that allows users to rent vehicles for a specified period. It typically includes features such as vehicle availability, booking management, payment processing, and customer support. The system can be used by both rental companies and customers to streamline the rental process.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/chat.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];

export const Projects = () => {
  return (
    <StickyScroll content={content} />
  );
};
