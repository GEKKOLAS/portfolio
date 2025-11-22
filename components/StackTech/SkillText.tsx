"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromRight } from "@/components/utils/motion";
import ColourfulText from "../ui/colourful-text";

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center" style={{ background: "transparent" }}>
      <motion.div
      variants={slideInFromRight(0.5)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      className="text-8xl text-center text-transparent w-11/12"
      >
      <ColourfulText text="I like crafting digital experiences with modern technologies and thoughtful design." />
      </motion.div>
    </div>
  );
};

export default SkillText;
