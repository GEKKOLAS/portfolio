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
    "I turn ambitious ideas into scalable, intelligent web experiences built for real people and real-world impact.";
  return (
    <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden py-6 sm:py-10 md:py-12 lg:h-full lg:min-h-0 lg:py-4 xl:py-6 2xl:py-8">
      <div className="absolute inset-0 -z-10 w-full h-full">
        <BackgroundBeams />
      </div>
      <div className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col justify-center px-3 sm:px-6 lg:px-1 xl:px-3 2xl:px-4">
        <Navbar />
        <div>
          <div className="flex items-center justify-between lg:mb-2 xl:mb-4">
            <div className="flex w-full flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-2 2xl:gap-4">
              <div className="flex justify-center">
                <div className="relative h-36 w-36 overflow-visible rounded-full bg-transparent p-0 shadow-lg sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-32 lg:w-32 xl:h-40 xl:w-40 2xl:h-48 2xl:w-48">
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
              <div className="w-full max-w-2xl text-center">
                <h2 className="scroll-m-20 font-newyork text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-2xl lg:leading-tight xl:text-3xl 2xl:text-5xl">
                  Hey there! I&apos;m{" "}
                  <span className="text-yellow-500">Nicolás</span>
                  <br />a{" "}
                  <span className="text-rose-500">
                    Passionate {""} <br />
                  </span>

                  <div className="min-h-[1.25em]">
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
                <div className="h-3 sm:h-4 lg:h-2 xl:h-3" />
                <div className="flex items-center justify-center w-full">
                  <AuroraText className="px-2 text-lg leading-snug sekuya-regular sm:text-xl md:text-2xl lg:text-base xl:text-lg 2xl:text-2xl">
                    {words}
                  </AuroraText>
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
