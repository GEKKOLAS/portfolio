import { Frontend_skill, Backend_skill, Languages, DB_skill } from "./Index";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import Image from "next/image";
import { motion } from "framer-motion";

type Skill = (typeof Frontend_skill)[number];

const SkillIcon = ({ skill }: { skill: Skill }) => (
  <Image
    src={skill.Image}
    alt={skill.skill_name}
    width={skill.width}
    height={skill.height}
    title={skill.skill_name}
    style={{ objectFit: "contain" }}
    className="transition-transform duration-300 hover:scale-110"
    unoptimized
  />
);

export function OrbitingCirclesDemo() {
  return (
    <motion.div
      className="relative flex h-[620px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_55%)] p-4 shadow-[0_30px_90px_-36px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:h-[700px]"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,_rgba(34,211,238,0.14),_transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        <OrbitingCircles iconSize={56} radius={300} reverse speed={1}>
          {Frontend_skill.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.08 }}
              transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
            >
              <SkillIcon skill={skill} />
            </motion.div>
          ))}
        </OrbitingCircles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.25, duration: 0.45 }}
      >
        <OrbitingCircles iconSize={40} radius={220}>
          {DB_skill.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.06 }}
              transition={{ delay: 0.25 + index * 0.05, duration: 0.4 }}
            >
              <SkillIcon skill={skill} />
            </motion.div>
          ))}
        </OrbitingCircles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        <OrbitingCircles iconSize={46} radius={150} reverse speed={1}>
          {Backend_skill.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.07 }}
              transition={{ delay: 0.35 + index * 0.05, duration: 0.4 }}
            >
              <SkillIcon skill={skill} />
            </motion.div>
          ))}
        </OrbitingCircles>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: 0.45, duration: 0.45 }}
      >
        <OrbitingCircles iconSize={36} radius={62}>
          {Languages.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.1 }}
              transition={{ delay: 0.45 + index * 0.05, duration: 0.4 }}
            >
              <SkillIcon skill={skill} />
            </motion.div>
          ))}
        </OrbitingCircles>
      </motion.div>
    </motion.div>
  );
}
