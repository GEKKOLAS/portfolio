"use client";
import { div } from "motion/react-client";
import React from "react";
import { Backend } from "../ui/backendStack";

export const Banner = () => {
  return (
    <div>
      <div>
        <div className="mx-auto h-30 max-w-2xl px-6 lg:px-8">
          <h2
            className="text-center text-2xl font-semibold bg-gradient-to-r from-green-400 via-cyan-400 to-cyan-600 bg-clip-text text-transparent animate-gradient-move"
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Frontend Developer
          </h2>

          <div className="relative overflow-hidden mt-1 bg-transparent rounded-full py-2 px-4">
            <div
              className="flex animate-scroll-logos gap-x-8 items-center"
              style={{ width: "max-content" }}
            >
              <img
                className="max-h-12 w-full object-contain"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width="158"
                height="48"
                color="white"
              />
              <img
                className="max-h-12 w-full object-contain"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width="158"
                height="48"
              />
              <img
                className="max-h-12 w-full object-contain"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                width="158"
                height="48"
              />
              <img
                className="max-h-12 w-full object-contain"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width="158"
                height="48"
              />
              <img
                className="max-h-12 w-full object-contain"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width="158"
                height="48"
              />
            </div>
          </div>
          <style jsx>{`
            @keyframes scroll-logos {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll-logos {
              animation: scroll-logos 20s linear infinite;
            }
            @keyframes gradient-move {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animate-gradient-move {
              animation: gradient-move 4s ease-in-out infinite;
            }
          `}</style>
        </div>

        <div>
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <h2
              className="text-center text-2xl font-semibold bg-gradient-to-r from-orange-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-move"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Backend Developer
            </h2>
           <Backend />
          </div>
        </div>
      </div>
    </div>
  );
};
