import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { div } from "motion/react-client";
import { ModeToggle } from "../ui/toggle-theme";
import { Banner } from "./banner";
import { Navbar } from "./navbar";

export const Profile = () => {
  const words =
    "I specialize in building robust web applications using the latest technologies and frameworks. Let's connect.";
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <div className="py-4 md:py-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center w-full gap-5 ">
              <div className="flex justify-center">
                <img
                  className="h-30 w-30 rounded-full transform-3d transition duration-500 ease-in-out hover:scale-110 hover:rotate-12"
                  src="https://media.giphy.com/media/eU9sk1Z80ZugM67Pse/giphy.gif?cid=ecf05e47hybpp1h7hkr0x5ba1vqfdy7rxg4e9k5w1ex665pf&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                  alt="profile avatar"
                />
              </div>
              <div className="text-center">
                <h2 className=" scroll-m-20 text-4xl tracking-tight lg:text-5xl font-bold font-newyork leading-none text-gray-900 dark:text-white sm:text-2xl">
                  Hey there! I'm{" "}
                  <span className="text-yellow-500">Nicolas</span>
                  <br />
                  <span className="text-rose-500">a passionate</span>
                  <span className="mb-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl inline-block font-newyork rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text px-2.5 py-0.5  text-transparent animate-pulse">
                    .NET Full Stack Developer
                  </span>
                </h2>

                <div className="flex items-center justify-center w-full">
                  <TextGenerateEffect words={words} />
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazVtaTl6M2x2eGtmMzhpaWlhczcxcGNranAzdnJieGtlMHR3OHgzaCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/iFaPIqooUgZ2MkVNJI/giphy.gif"
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
