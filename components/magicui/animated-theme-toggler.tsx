"use client";

import { Moon, SunDim } from "lucide-react";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { CoolMode } from "./cool-mode";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 5000,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };
  return (
    <button
      ref={buttonRef }
      onClick={changeTheme}
      className={cn(
      "transition-transform duration-300 ease-in-out hover:scale-200 hover:rotate-360",
      className
      )}
    >
      <CoolMode options={{
          particle:
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzVka3FwaWx2d2l6eGM4Ym83anlsMGkxd2oxZ3NmMzh3Zmt1aHJkbiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/lQmOVHG429XNG2qNld/giphy.gif",
        }}>{isDarkMode ? <SunDim color="yellow" /> : <Moon />}</CoolMode>
    </button>
  );
};
