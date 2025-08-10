"use client"
import React from 'react'
import {motion} from 'framer-motion'
import { slideInFromLeft, slideInFromRight } from '@/components/utils/motion'



const SkillText = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
<motion.div
        >
        </motion.div>
        <motion.div
        variants={slideInFromLeft(0.5)}
        className='text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]'
        >
            Crafting seamless digital experiences with modern web technologies and thoughtful design.
        </motion.div>
        <motion.div
        variants={slideInFromRight(0.5)}
        className='font-serif text-[40px] text-red-500 mb-10 mt-[10px] text-center italic'
        >
            “The best way to get the right answer on the internet is not to ask a question; it's to post the wrong answer.” – Phil Karlton
        </motion.div>
    </div>
  )
}

export default SkillText