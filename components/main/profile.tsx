"use client";
import React from "react";
import Image from "next/image";
import { Navbar } from "./navbar";
import { Social } from "./socialnet";
import { BackgroundBeams } from "../ui/background-beams";
import { AuroraText } from "../ui/aurora-text";
import { CosmicAura } from "../effects/cosmic-aura";
import { PixelFireReveal } from "../effects/pixel-fire-reveal";
import { ThemeSwitcher } from "../ui/theme-switcher";
import { useOriginalEffects, usePortfolioTheme } from "../ui/theme-provider";
import { SoundToggle } from "../ui/sound-toggle";

export const Profile = () => {
  const { isRebel } = usePortfolioTheme();
  const originalEffects = useOriginalEffects();
  const words =
    "I build web products & automations.";
  return (
    <div className="portfolio-profile relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden py-6 sm:py-10 md:py-12 lg:h-full lg:min-h-0 lg:py-4 xl:py-6 2xl:py-8">
      {originalEffects && (
        <div className="absolute inset-0 -z-10 w-full h-full">
          <BackgroundBeams />
        </div>
      )}
      <div className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col justify-center px-3 sm:px-6 lg:px-1 xl:px-3 2xl:px-4">
        <div className="portfolio-controls">
          <ThemeSwitcher />
          <SoundToggle />
        </div>
        <Navbar />
        <div>
          <div className="flex items-center justify-between lg:mb-2 xl:mb-4">
            <div className="flex w-full flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-2 2xl:gap-4">
              <div className="flex justify-center">
                <div className="profile-medallion relative h-36 w-36 overflow-visible rounded-full bg-transparent p-0 shadow-lg sm:h-44 sm:w-44 md:h-48 md:w-48 lg:h-32 lg:w-32 xl:h-40 xl:w-40 2xl:h-48 2xl:w-48">
                  <div className="relative w-full h-full">
                    {/* Three.js cosmic aura behind the avatar, bleeding outside edges */}
                    {originalEffects && <CosmicAura className="absolute -inset-3 z-0 rounded-full overflow-hidden" theme="nebula" />}

                    <div className="profile-portrait relative z-10 rounded-full overflow-hidden bg-transparent w-full h-full">
                      <PixelFireReveal>
                        <Image
                          className="rounded-full w-full h-full bg-transparent object-cover border-0"
                          src="/HeroProfile3.png"
                          alt="profile avatar"
                          width={500}
                          height={300}
                          style={{ objectPosition: "center 3%" }}
                          priority
                        />
                      </PixelFireReveal>
                    </div>
                  </div>
                  <span className="grimoire-ribbon" aria-hidden="true">Since 2019 · Full Stack</span>
                </div>
              </div>
              <div className="w-full max-w-2xl text-center">
                <p className="grimoire-chapter">{isRebel ? "Rebel" : "Grimoire"} <span aria-hidden="true">{isRebel ? "★" : "✦"}</span> Chapter I</p>
                <h1 className="profile-heading scroll-m-20 font-newyork text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-2xl lg:leading-tight xl:text-3xl 2xl:text-5xl">
                  Hey there! I&apos;m{" "}
                  <span className="profile-name text-yellow-500">
                    {isRebel ? <>
                      <span className="sr-only">Nicolás</span>
                      {Array.from("Nicolás").map((letter, index) => (
                        <span key={index} className="rebel-name-letter" aria-hidden="true">{letter}</span>
                      ))}
                    </> : "Nicolás"}
                  </span>
                  {/* The degree comes first: it is Nicolás's highest academic qualification. */}
                  {/* Pink-to-fuchsia so it doesn't blend into the yellow name above. */}
                  <span className="profile-role profile-degree block">
                    <span className="bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
                      International Business Professional
                    </span>
                  </span>
                  <span className="profile-role block">
                    <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                      &amp; Full-Stack Developer
                    </span>
                  </span>
                  <span className="profile-tagline mt-1 block text-[0.5em] font-semibold leading-snug text-zinc-600 dark:text-zinc-300">
                    bridging{" "}
                    <span className="text-amber-500">business</span>,{" "}
                    <span className="text-pink-500">design</span>,{" "}
                    <span className="text-cyan-400">marketing</span> &amp;{" "}
                    <span className="text-green-400">code</span>
                  </span>
                </h1>
                <div className="h-3 sm:h-4 lg:h-2 xl:h-3" />
                <div className="profile-description flex items-center justify-center w-full">
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
