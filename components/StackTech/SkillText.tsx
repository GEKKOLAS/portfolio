"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromRight } from "@/components/utils/motion";
import ColourfulText from "../ui/colourful-text";

const SkillText = () => {
  return (
    <div className="w-fit h-auto flex flex-col items-center justify-center">
      
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        className="text-6xl text-center text-transparent"
      > 
        <ColourfulText text="I like crafting seamless digital experiences with modern technologies and thoughtful design." />

      </motion.div>
    </div>
  );
};

export default SkillText;
