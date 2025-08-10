"use client"
import React from 'react'
import {motion} from 'framer-motion'
import { slideInFromLeft, slideInFromRight, slideInFromTop  } from '@/components/utils/motion'



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
            I create beautiful and functional websites using the latest technologies.
        </motion.div>
        <motion.div
        variants={slideInFromRight(0.5)}
        className='font-serif text-[40px] text-red-500 mb-10 mt-[10px] text-center italic'
        >
            Never miss a task, deadline or idea
        </motion.div>
    </div>
  )
}

export default SkillText