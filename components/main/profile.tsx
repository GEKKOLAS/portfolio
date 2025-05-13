import React from 'react'
import { TextGenerateEffect } from '../ui/text-generate-effect'
import { div } from 'motion/react-client';
import { ModeToggle } from '../ui/toggle-theme';
import { Banner } from './banner';


export const Profile = () => {
  const words = "I specialize in building robust web applications using the latest technologies and frameworks. Let's connect.";
  return (
    <div className="flex flex-col items-center justify-center">
    <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
      <div className="py-4 md:py-8">
        <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center w-full gap-5 ">
            <div className="flex justify-center">
              <img
              className="h-30 w-30 rounded-full transform-3d transition duration-500 ease-in-out hover:scale-140"
              src="https://media.giphy.com/media/eU9sk1Z80ZugM67Pse/giphy.gif?cid=ecf05e47hybpp1h7hkr0x5ba1vqfdy7rxg4e9k5w1ex665pf&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              alt="profile avatar"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
              Nicolas Murillo Arango
              </h2>
                <span className="mb-2 inline-block rounded bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text px-2.5 py-0.5 text-2xl font-medium text-transparent animate-pulse">
                .NET Full Stack Developer
                </span>
                <TextGenerateEffect words={words} className='text-sm'/>
            </div>
            <Banner />
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}
