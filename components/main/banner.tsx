"use client";

import React from "react";
import { Backend } from "../ui/backendStack";
import { Frontend } from "../ui/frontendStack";

export const Banner = () => {
  return (
    
    <section className="relative">
      <div>
      <div>
        <div className="mx-auto h-30  max-w-2xl px-6 lg:px-8">
          <h2
            className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0  font-newyork bg-gradient-to-r from-yellow-400 via-blue-700 to-rose-600 bg-clip-text text-transparent animate-gradient-move"
            style={{
              backgroundSize: "200% 200%",
            }}
          >
          Technology Stack
          </h2>

          <Frontend />
        </div>

        <div>
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
           <Backend />
          </div>
        </div>
      </div>
    </div>

    </section>
  );
};
