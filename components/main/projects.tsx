import { StickyScroll } from "../ui/sticky-scroll-reveal";
import React, { Children } from 'react'
import { About } from "./about";


const content = [
  {
    title: "Ecommerce App",
    description:
      "Ecommerce app built with ASP.NET as the backend and Angular with Angular Material as the frontend delivers a modern, scalable shopping experience. The backend, powered by ASP.NET, handles secure user authentication, product management, order processing, and database interactions using Entity Framework.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <img
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
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        Version control
      </div>
    ),
  },
];



export const Projects = () => {
  return (
    <div className="col-span-1 flex flex-col items-center justify-center h-full">
  <StickyScroll content={content} />
</div>
  )
}

