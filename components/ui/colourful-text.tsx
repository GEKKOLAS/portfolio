"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export default function ColourfulText({ text }: { text: string }) {
  // Neon color palettes
  const lightColors = ["#66ccff", "#ff2052"];
  const darkColors = ["#0099cc", "#ff003c", "#ff66a3", "#ff66cc", "#ff99e6"];

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Handle hydration
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-block sekuya-regular tracking-tight">{text}</span>;
  }

  const isDark = theme === "dark" || resolvedTheme === "dark";
  const palette = isDark ? darkColors : lightColors;

  const neonShadow = (color: string) =>
    `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`;

  // build arrays for continuous color/textShadow animation
  const colorCycle = palette;
  const shadowCycle = palette.map((c) => neonShadow(c));

  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ y: 10, opacity: 0, filter: "blur(8px)" }}
          animate={{
            // continuous cycling for color and shadow
            color: colorCycle,
            textShadow: shadowCycle,
            // single-run entrance for position/opacity/blur (will use default transition)
            y: [10, -3, 0],
            filter: ["blur(8px)", "blur(4px)", "blur(0px)"],
            opacity: [0, 0.8, 1],
          }}
          transition={{
            // color & shadow: loop continuously, staggered per letter
            color: { duration: colorCycle.length * 1.2, repeat: Infinity, ease: "linear", delay: index * 0.08 },
            textShadow: { duration: colorCycle.length * 1.2, repeat: Infinity, ease: "linear", delay: index * 0.08 },
            // entrance (y/opacity/filter): single short animation, staggered
            default: { duration: 0.55, ease: "easeOut", delay: index * 0.05 },
          }}
          className="inline-block whitespace-pre manufacturing-consent-regular tracking-tight"
          style={{ background: "transparent" }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}
