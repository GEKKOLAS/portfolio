"use client";

import React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export default function ColourfulText({ text }: { text: string }) {
  // Neon color palette for the effect
  const colors = [
    "#ff1744", // Neon Red
    "#ff003c", // Deep Neon Red
    "#ff2052", // Vivid Neon Red
  ];

  const colors2 = [
    "#0099cc", // Darker Blue
  ];

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  // Handle hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  // Update colors based on theme
  React.useEffect(() => {
    if (mounted) {
      setCurrentColors(isDark ? colors2 : colors);
    }
  }, [isDark, mounted]);

  // Color switching animation
  React.useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrentColors((prev) => {
        const isCurrentlyColors = prev === colors;
        return isCurrentlyColors ? colors2 : colors;
      });
      setCount((prev) => prev + 1);
    }, 9000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Neon text shadow style
  const neonShadow = (color: string) =>
    `0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`;

  // Prevent hydration mismatch
  if (!mounted) {
    return <span className="inline-block font-tangerine font-semibold tracking-tight">{text}</span>;
  }

  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{
            y: 0,
            opacity: 0,
            filter: "blur(8px)"
          }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(8px)", "blur(5px)", "blur(0px)"],
            opacity: [0, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className="inline-block whitespace-pre font-tangerine font-semibold tracking-tight"
          style={{
            textShadow: neonShadow(currentColors[index % currentColors.length]),
            background: "transparent",
          }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}
