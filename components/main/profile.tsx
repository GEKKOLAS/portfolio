import React from 'react'
import { TextGenerateEffect } from '../ui/text-generate-effect'
import { div } from 'motion/react-client';
import { ModeToggle } from '../ui/toggle-theme';

const words = "I specialize in building robust web applications using the latest technologies and frameworks. Let's connect.";
export const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center">
    <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
      <div className="py-4 md:py-8">
        <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center w-full gap-5 ">
            <div className="flex justify-center">
              <img
              className="h-30 w-30 rounded-full transform-3d transition duration-500 ease-in-out hover:scale-140"
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNThiOGF4bXhyeDZnMWJhMzM1enV5anpybHBsN21zbzk2MXZ2OGRrZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NaxKt9aSzAspO/giphy.gif"
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

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <img
                src="/icons/javascript.svg"
                alt="JavaScript"
                className="h-12 w-12"
                title="JavaScript"
              />
              <img
                src="/icons/typescript.svg"
                alt="TypeScript"
                className="h-12 w-12"
                title="TypeScript"
              />
              <img
                src="/icons/react.svg"
                alt="React"
                className="h-12 w-12"
                title="React"
              />
              <img
                src="/icons/dotnet.svg"
                alt=".NET"
                className="h-12 w-12"
                title=".NET"
              />
              <img
                src="/icons/sql-server.svg"
                alt="SQL Server"
                className="h-12 w-12"
                title="SQL Server"
              />
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}
