'use client'
import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Image from "next/image";
import { Navbar } from "./navbar";
import { Social } from "./socialnet";






export const Profile = () => {
  const words =
    "I specialize in building robust web applications using the latest technologies and frameworks. Let's connect.";
  return (
    <div className="flex flex-col items-center justify-center pb-5 2xl:h-full lg:h-full">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <Navbar />
        <div >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center w-full gap-2 ">
                <div className="flex justify-center">
                <div className="relative w-50 h-50 rounded-full overflow-hidden shadow-lg p-1 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 animate-gradient-border">
                  <div className="rounded-full overflow-hidden bg-cyan-300 dark:bg-rose-500 w-full h-full">
                    <Image
                      className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg"
                      src="/GRR.jpeg"
                      alt="profile avatar"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
                </div>
              <div className="text-center gap-3">
                <h2 className=" scroll-m-20  tracking-tight lg:text-2xl 2xl:text-6xl font-bold font-newyork leading-none text-gray-900 dark:text-white">
                  Hey there! I&apos;m{" "}
                  <span className="text-yellow-500">Nicolas</span>
                  <br />
                  <span className="text-rose-500">a passionate</span>
                  <span className="scroll-m-20 font-extrabold tracking-tight lg:text-3xl 2xl:text-7xl  inline-block font-newyork rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text px-2.5 py-0.5  text-transparent animate-pulse">
                    .NET Full Stack Developer
                  </span>
                </h2>
                <div className="flex items-center lg:pt-5 justify-center w-full">
                  <TextGenerateEffect words={words} />
                </div>    
                <Social />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
