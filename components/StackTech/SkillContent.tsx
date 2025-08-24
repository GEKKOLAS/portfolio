import React from "react";
import SkillText from "./SkillText";
import { OrbitingCirclesDemo } from "./CircleSkills";

const Skills = () => {
  return (
    // Main section for the Skills component
    <section
      id="skills"
      className="flex flex-col pt-3 pb-3 items-center justify-center gap-5 h-full relative overflow-hidden"
      style={{ transform: "scale(0.9)" }}
    >
      {/* Title or description for the skills section */}
      <SkillText />

      {/* Animated orbiting circles demo for visual effect */}
      <OrbitingCirclesDemo />

      {/* Scrollable area for skill icons 
      <ScrollArea
      style={{ height: "300px", overflow: "auto", borderRadius: "10px" }}
      >
      <div className="flex flex-row justify-around flex-wrap pt-4 pb-4 pl-2 pr-2 gap-2 items-center rounded-2xl bg-transparent">
        
        {Frontend_skill.map(
        (
          image: { skill_name: string; Image: string; width: number; height: number },
          index: number
        ) => (
          <SkillDataProvider
          key={index}
          src={image.Image}
          width={image.width}
          height={image.height}
          index={index}
          />
        )
        )}

        
        {Backend_skill.map(
        (
          image: { skill_name: string; Image: string; width: number; height: number },
          index: number
        ) => (
          <SkillDataProvider
          key={index}
          src={image.Image}
          width={image.width}
          height={image.height}
          index={index}
          />
        )
        )}
      </div>
      </ScrollArea>*/}
    </section>
  );
};

export default Skills;
