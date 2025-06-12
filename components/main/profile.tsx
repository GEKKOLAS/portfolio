'use client'
import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Image from "next/image";
import { Navbar } from "./navbar";
import { Social } from "./socialnet";
import {ReactTyped} from "react-typed";






export const Profile = () => {
  const words =
    "I specialize in building robust web applications using the latest technologies on AI & frameworks. Let's connect.";
  return (
    <div className="flex flex-col items-center justify-center pb-5 2xl:h-full lg:h-full lg:pb-30">
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
                  <span className="text-yellow-500">Nicolas</span> a
                  <br />
                  <span className="text-rose-500">Passionate {""} <br /></span>
                    {[".NET Full Stack Developer", "React Enthusiast", "Cloud Solutions Architect"].map((role, idx) => (
                      <span
                        key={role}
                        style={{ display: "none" }}
                        className={`scroll-m-20 font-extrabold tracking-tight lg:text-5xl 2xl:text-9xl inline-block font-newyork rounded px-2.5 py-0.5 bg-clip-text text-transparent animate-pulse
                          ${idx === 0 ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent" : ""}
                          ${idx === 1 ? "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent" : ""}
                          ${idx === 2 ? "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent" : ""}
                        `}
                        id={`typed-role-${idx}`}
                      >
                        {role}
                      </span>
                    ))}
                    <ReactTyped
                      strings={[
                        '<span class="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">.NET Developer</span>',
                        '<span class="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Full Stack Developer</span>',
                        '<span class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">Automation Engineer</span>',
                      ]}
                      typeSpeed={60}
                      backSpeed={40}
                      loop
                      smartBackspace
                      showCursor
                      contentType="html"
                    />
                </h2>
                <br />
                <div className="flex items-center  justify-center w-full">
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
