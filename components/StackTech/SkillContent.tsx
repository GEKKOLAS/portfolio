import React from "react";
import SkillText from "./SkillText";
import SkillDataProvider from "./SkillDataProvider";
import { Frontend_skill } from "./Index";
import { ScrollArea } from "@/components/ui/scroll-area";

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col pt-3 pb-3 items-center justify-center gap-3 h-full relative overflow-hidden"
      style={{ transform: "scale(0.9" }}
    >
      <SkillText />
      <ScrollArea
        style={{ height: "300px", overflow: "auto", borderRadius: "10px" }}
      >
        <div className="flex flex-row justify-around flex-wrap pt-4 pb-4 pl-2 pr-2 gap-2 items-center rounded-2xl bg-transparent">
          {Frontend_skill.map((image: any, index: number) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>
      </ScrollArea>{" "}
    </section>
  );
};

export default Skills;
