import React from "react";

import { ScrollArea } from "@radix-ui/react-scroll-area";

export const Experience = () => {
  return (
    <section className="sticky top-0">
      <ScrollArea style={{ height: "400px", overflow: "auto" }}>
      <div className=" w-full p-4 md:h-full sm:h-full">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-yellow-400 mb-6">
          Professional Experience
        </h2>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-rose-400 dark:bg-rose-500"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-rose-500">
              February 2025 - Present
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Freelance full-stack developer in La Veleta S&S
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              Enterprise Software Development using .Net technologies. Crafting
              dynamic front-end experiences with React, Blazor, Razor Pages,
              MVC, and HTML5.
              <br />
              <br />
              Creating robust back-end systems leveraging ASP.NET Core, Entity
              Framework, and microservices architecture. Streamlining
              development and operations with Azure DevOps/AzurePipelines for
              continuous integration and delivery. Adopting Agile practices.
            </p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-yellow-400 dark:bg-yellow-400"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-yellow-500">
              Jan 2024 - July 20204
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Solution Specialist at Teleperformance
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Customer Service Client Relationship Management, Sales of devices
              such as cameras, sensors, door locks and Customer Education about
              company policies (Vivint) Troubleshooting
            </p>
          </li>
          <li className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-rose-400 dark:bg-rose-500"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-rose-500">
              Jan 2023 - Jan 2024
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Service Representative at Teleperformance
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Customer Service Client Relationship Management Sales and Booking
              of Hotel Reservations Customer Education about company policies
              (ESA)
            </p>
          </li>

          <li className=" mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-yellow-400 dark:bg-yellow-400"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-yellow-500">
              Jan 2019 - Jan 2023
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Full Stack .NET Developer at Fenix Alliance Group
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Enterprise Software Development using .Net technologies. Crafting
              dynamic front-end experiences with React, Blazor, Razor Pages,
              MVC, and HTML5.
              <br />
              <br />
              Creating robust back-end systems leveraging ASP.NET Core, Entity
              Framework, and microservices architecture. Streamlining
              development and operations with Azure DevOps/AzurePipelines for
              continuous integration and delivery. Adopting Agile practices.
            </p>
          </li>
        </ol>
      </div>
    </ScrollArea>
    </section>
  );
};
