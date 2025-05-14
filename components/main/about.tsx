import React from "react";
import { MaskContainer } from "../ui/svg-mask-effect";
import { Banner } from "./banner";

export const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-50 w-full p-8">
        <div className="rounded-lg border border-transparent bg-transparent p-4 dark:border-transparent dark:bg-transparent md:p-8">
          <div className="flex flex-col-2 items-center justify-center">
            <img
              src="https://media.giphy.com/media/zg9PElmesMx89m1MKH/giphy.gif?cid=ecf05e47hgm68hnk3xyz2h651nknu4310o3c1drp95m6uisr&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              alt=""
              className="w-80 h-50"
            />
            <img
              src="https://media.giphy.com/media/d3MKBzBTtCUIDwwU/giphy.gif?cid=ecf05e47ddub3o31jd5mgm9fvg72rirxga9uzmjsw78ovatw&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              alt=""
              className="w-80 h-50 rounded-b-md"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mx-auto my-8 text-slate-900 dark:text-rose-600">
            About Me
          </h2>
          <MaskContainer
            revealText={
              <p className="mx-auto max-w-4xl text-center text-3xl font-extralight text-slate-800 dark:text-green-600 font-serif">
                Business-minded developer with a unique blend of technical
                expertise and creativity. Bachelor degree in International Business & a professional
                background in Business analisys and Digital Marketing,
                bringing a holistic approach to software development. 
                
                Passionate about creating innovative solutions that drive
                results and enhance user experiences. Committed to continuous learning and staying ahead of industry trends to deliver impactful, user-centric applications.
              </p>
            }
            className="h-[40rem] rounded-full text-white dark:text-white"
          >
            <div className="flex col-span-1 items-center justify-center">
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNwNnE4OWxvNWRrMGhha3l2enl3ZnRkdWxpczJkajgzM2hjdWo2bCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/qlOso7alCUTiAX7aG5/giphy.gif"
                alt=""
                className="justify-end"
              />
              <div>
                I thrive to create {" "}
                <span className="text-green-400">amazing</span>{" "}websites  with
               the use of the latest technologies like{" "}
                <span className="bg-gradient-to-r from-blue-300 via-cyan-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-move">
                  AI{" "}
                </span>
                and{" "}
                <span className="bg-gradient-to-r from-green-300 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-move">
                  advanced animations 
                </span>
                .
              </div>
            </div>
          </MaskContainer>
          <Banner />
        </div>
      </div>
    </div>
  );
};
