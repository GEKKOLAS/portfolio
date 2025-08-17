import { Frontend_skill, Backend_skill, Languages} from "./Index";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import Image from "next/image";

type Skill = typeof Frontend_skill[number];

const SkillIcon = ({ skill }: { skill: Skill }) => (
    <Image
        src={skill.Image}
        alt={skill.skill_name}
        width={skill.width}
        height={skill.height}
        title={skill.skill_name}
        style={{ objectFit: "contain" }}
        className="transition-transform duration-800 hover:scale-110"
        unoptimized
    />
);

export function OrbitingCirclesDemo() {
    return (
        <div className="relative flex h-[450px] w-full flex-col items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110">
            {/* Círculo exterior: Frontend */}
            <OrbitingCircles iconSize={40}>
                {Frontend_skill.map((skill) => (
                    <SkillIcon key={skill.skill_name} skill={skill} />
                ))}
            </OrbitingCircles>
            {/* Círculo interior: Backend */}
            <OrbitingCircles iconSize={30} radius={100} reverse speed={1}>
                {Backend_skill.map((skill) => (
                    <SkillIcon key={skill.skill_name} skill={skill} />
                ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={50} >
                {Languages.map((skill) => (
                    <SkillIcon key={skill.skill_name} skill={skill} />
                ))}
            </OrbitingCircles>
        </div>
    );
}
