"use client";
import React from "react";
import Image from "next/image";
import { Navbar } from "./navbar";
import { Social } from "./socialnet";
import { ReactTyped } from "react-typed";
import { BackgroundBeams } from "../ui/background-beams";
import { AuroraText } from "../ui/aurora-text";
import { CosmicAura } from "../effects/cosmic-aura";

export const Profile = () => {
  const words =
    "I specialize in building robust web applications using the latest technologies on AI & frameworks. Let's connect.";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-5 md:pb-20 md:pt-10 sm:pb-10 2xl:h-screen 2xl:mb-10 2xl:pt-0 2xl:justify-start lg:h-screen lg:mb-10 lg:pt-10 lg:justify-center">
      <div className="absolute inset-0 -z-10 w-full h-full">
      <BackgroundBeams />
      </div>
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0 flex-1 flex flex-col justify-center 2xl:justify-start">
      <Navbar />
      <div>
        <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full overflow-visible shadow-lg p-0 bg-transparent">
            <div className="relative w-full h-full">
              {/* Three.js cosmic aura behind the avatar, bleeding outside edges */}
              <CosmicAura className="absolute -inset-3 z-0 rounded-full overflow-hidden" theme="nebula" />

              <div className="relative z-10 rounded-full overflow-hidden bg-transparent w-full h-full">
                <Image
                  className="rounded-full w-full h-full bg-transparent object-cover border-0"
                  src="/HeroProfile3.png"
                  alt="profile avatar"
                  width={500}
                  height={300}
                  style={{ objectPosition: "center 3%" }}
                  priority
                />
              </div>
            </div>
          </div>
          </div>
          <div className="text-center gap-3">
          <h2 className="scroll-m-20 tracking-tight lg:text-2xl 2xl:text-6xl font-bold font-newyork leading-none text-gray-900 dark:text-white">
            Hey there! I&apos;m{" "}
            <span className="text-yellow-500">Nicolas</span>
            <br />a{" "}
            <span className="text-rose-500">
            Passionate {""} <br />
            </span>
            
            <div>
            <ReactTyped
            strings={[
              '<span class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500  bg-clip-text text-transparent">.NET Developer</span>',
              '<span class="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Full Stack Developer</span>',
              '<span class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500  bg-clip-text text-transparent">Automation Engineer</span>',
            ]}
            typeSpeed={60}
            backSpeed={40}
            loop
            smartBackspace
            showCursor
            contentType="html"
            />
            </div>
          </h2>
          <br />
          <div className="flex items-center justify-center w-full">
            {/* <TextGenerateEffect words={words} /> */}
            <AuroraText className="text-2xl sekuya-regular">{words}</AuroraText>
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
