import { Frontend_skill, Backend_skill, Languages, DB_skill} from "./Index";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import Image from "next/image";
import { motion } from "framer-motion";

type Skill = typeof Frontend_skill[number];

const SkillIcon = ({ skill }: { skill: Skill }) => (
    <Image
        src={skill.Image}
        alt={skill.skill_name}
        width={skill.width}
        height={skill.height}
        title={skill.skill_name}
        style={{ objectFit: "contain" }}
        className="transition-transform duration-800 hover:scale-250"
        unoptimized
    />
);

export function OrbitingCirclesDemo() {
    return (
        <motion.div 
            className="relative flex h-[850px] w-full flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
            }}
            transition={{ 
            duration: 0.8, 
            ease: "easeOut"
            }}
        >
            {/* Círculo exterior: Frontend */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
                y: [-5, 5, -5],
                transition: { 
                duration: 0.6, 
                repeat: Infinity, 
                repeatType: "reverse" 
                }
            }}
            transition={{ delay: 0.2, duration: 0.6 }}
            >
            <OrbitingCircles iconSize={60} radius={350} reverse speed={1}>
                {Frontend_skill.map((skill, index) => (
                <motion.div
                    key={skill.skill_name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    whileHover={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                    transition: { 
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }
                    }}
                    transition={{ 
                    delay: 0.4 + index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                    }}
                >
                    <SkillIcon skill={skill} />
                </motion.div>
                ))}
            </OrbitingCircles>
            </motion.div>
            
            {/* Círculo medio: Bases de datos */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
                x: [-3, 3, -3],
                transition: { 
                duration: 0.5, 
                repeat: Infinity, 
                repeatType: "reverse" 
                }
            }}
            transition={{ delay: 0.4, duration: 0.6 }}
            >
            <OrbitingCircles iconSize={40} radius={250}>
                {DB_skill.map((skill, index) => (
                <motion.div
                    key={skill.skill_name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    whileHover={{
                    scale: [1, 1.1, 1],
                    transition: { 
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }
                    }}
                    transition={{ 
                    delay: 0.6 + index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                    }}
                >
                    <SkillIcon skill={skill} />
                </motion.div>
                ))}
            </OrbitingCircles>
            </motion.div>
            
            {/* Círculo interior: Backend */}
            <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
                x: [3, -3, 3],
                transition: { 
                duration: 0.7, 
                repeat: Infinity, 
                repeatType: "reverse" 
                }
            }}
            transition={{ delay: 0.6, duration: 0.6 }}
            >
            <OrbitingCircles iconSize={50} radius={150} reverse speed={1}>
                {Backend_skill.map((skill, index) => (
                <motion.div
                    key={skill.skill_name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    whileHover={{
                    scale: [1, 1.15, 1],
                    rotate: [0, -5, 5, 0],
                    transition: { 
                        duration: 0.7,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }
                    }}
                    transition={{ 
                    delay: 0.8 + index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                    }}
                >
                    <SkillIcon skill={skill} />
                </motion.div>
                ))}
            </OrbitingCircles>
            </motion.div>
            
            {/* Círculo central: Lenguajes */}
            <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
                y: [5, -5, 5],
                transition: { 
                duration: 0.4, 
                repeat: Infinity, 
                repeatType: "reverse" 
                }
            }}
            transition={{ delay: 0.8, duration: 0.6 }}
            >
            <OrbitingCircles iconSize={40} radius={50}>
                {Languages.map((skill, index) => (
                <motion.div
                    key={skill.skill_name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    whileHover={{
                    scale: [1, 1.3, 1],
                    transition: { 
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }
                    }}
                    transition={{ 
                    delay: 1.0 + index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                    }}
                >
                    <SkillIcon skill={skill} />
                </motion.div>
                ))}
            </OrbitingCircles>
            </motion.div>
        </motion.div>
    );
}
