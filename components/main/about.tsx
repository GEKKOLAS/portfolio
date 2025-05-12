import React from 'react'
import { MaskContainer } from '../ui/svg-mask-effect'

export const About = () => {
  return (
    <div className="rounded-lg border border-transparent bg-transparent p-4 dark:border-transparent dark:bg-transparent md:p-8">
        <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-yellow-200">
             Business-minded developer with a unique blend of technical expertise and international business acumen. Professional background in International Business and Digital Marketing, bringing a holistic approach to software development.
          </p>
        }
        className="h-[40rem] rounded-md border text-white dark:text-black"
      >
        Discover the power of{" "}
        <span className="text-blue-500">Tailwind CSS v4</span> with native CSS
        variables and container queries with
        <span className="text-blue-500">advanced animations</span>.
      </MaskContainer>
        </div>
  )
}
