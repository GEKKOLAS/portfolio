"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/components/utils/motion";

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        className="text-[30px] font-medium mt-[10px] text-center mb-[15px] text-black dark:text-white"
      >
        Crafting seamless digital experiences with modern web technologies and
        thoughtful design.
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        className="text-[50px] font-tangerine text-rose-500 mb-10 mt-[10px] text-center"
      >
        “Never miss a chance to learn and grow.”
      </motion.div>
    </div>
  );
};

export default SkillText;
