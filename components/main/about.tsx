import React from "react";
import { MaskContainer } from "../ui/svg-mask-effect";
import { Banner } from "./banner";

export const About = () => {
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="flex flex-col items-center justify-center h-50 w-full p-4 md:h-full sm:h-full">
        <div className="rounded-lg border border-transparent bg-transparent p-4 dark:border-transparent dark:bg-transparent md:p-3">
          <div className="flex flex-col-2 items-center justify-center my-4">
            <img
              src="https://media.giphy.com/media/zg9PElmesMx89m1MKH/giphy.gif?cid=ecf05e47hgm68hnk3xyz2h651nknu4310o3c1drp95m6uisr&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              alt=""
              className="w-80 h-40"
            />
            <img
              src="https://media.giphy.com/media/d3MKBzBTtCUIDwwU/giphy.gif?cid=ecf05e47ddub3o31jd5mgm9fvg72rirxga9uzmjsw78ovatw&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              alt=""
              className="w-80 h-40 rounded-b-md"
            />
          </div>
          <h2 className="text-2xl  font-bold text-center mx-auto my-1 text-slate-900 dark:text-rose-400">
            About Me
          </h2>
          <MaskContainer
            revealText={
              <div className="flex flex-col items-center justify-center w-full py-8 overflow-contain">
                <p className="text-center font-semibold md:text-2xl sm:text text-indigo-800 dark:text-yellow-400 font-serif">
                  Business-minded developer with a unique blend of technical
                  expertise and creativity. Bachelor degree in International Business & a professional
                  background in Business analisys and Digital Marketing,
                  bringing a holistic approach to software development. 
                  
                 <br />

                  My favorite Pokemon is:{" "}
                </p>
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWZ2b2thaXVrbmN3ajh0YnloNHlqMHd6MzYzb2t5ZDZhODlhNnJobyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/z8OcWLLk4SrpS/giphy.gif"
                  alt=""
                  className="h-50 w-50 rounded-full text-white dark:text-white justify-center mx-auto"
                />
              </div>
            }
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
        </div>
      </div>
    </div>
  );
};
