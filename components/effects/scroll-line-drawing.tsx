"use client";

import React from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

function FireworkBurst({
  x,
  y,
  at,
  progress,
  rotate = 0,
}: {
  x: number;
  y: number;
  at: number;
  progress: MotionValue<number>;
  rotate?: number;
}) {
  const opacity = useTransform(
    progress,
    [Math.max(0, at - 0.025), at, Math.min(1, at + 0.07), Math.min(1, at + 0.16)],
    [0, 1, 0.85, 0]
  );
  const scale = useTransform(
    progress,
    [Math.max(0, at - 0.025), at, Math.min(1, at + 0.08), Math.min(1, at + 0.16)],
    [0.15, 0.55, 1.25, 1.55]
  );

  return (
    <motion.g
      style={{ opacity, scale, transformOrigin: `${x}px ${y}px` }}
      transform={`rotate(${rotate} ${x} ${y})`}
      fill="none"
      stroke="url(#scroll-line-gradient)"
      strokeLinecap="round"
    >
      <path strokeWidth="3" d={`M${x} ${y - 9} V${y - 35} M${x} ${y + 9} V${y + 35} M${x - 9} ${y} H${x - 35} M${x + 9} ${y} H${x + 35}`} />
      <path strokeWidth="2" d={`M${x - 7} ${y - 7} L${x - 27} ${y - 27} M${x + 7} ${y - 7} L${x + 27} ${y - 27} M${x - 7} ${y + 7} L${x - 27} ${y + 27} M${x + 7} ${y + 7} L${x + 27} ${y + 27}`} />
      <path strokeWidth="2.5" d={`M${x} ${y - 7} L${x + 7} ${y} L${x} ${y + 7} L${x - 7} ${y} Z`} />
      <g fill="url(#scroll-line-gradient)" stroke="none">
        <circle cx={x} cy={y - 43} r="3" />
        <circle cx={x + 43} cy={y} r="2.5" />
        <circle cx={x} cy={y + 43} r="2" />
        <circle cx={x - 43} cy={y} r="2.5" />
      </g>
    </motion.g>
  );
}

export function ScrollLineDrawing() {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const progress = useSpring(rawProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });
  const glowOpacity = useTransform(progress, [0, 0.08, 0.92, 1], [0, 0.55, 0.55, 0]);

  React.useEffect(() => {
    const host = hostRef.current;
    const scrollRoot = host?.closest<HTMLElement>(".right-scroll");
    if (!host || !scrollRoot) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const panelScrolls = scrollRoot.scrollHeight > scrollRoot.clientHeight + 1;
        let next = 0;

        if (panelScrolls) {
          next = scrollRoot.scrollTop / Math.max(1, scrollRoot.scrollHeight - scrollRoot.clientHeight);
        } else {
          const rect = scrollRoot.getBoundingClientRect();
          const start = window.scrollY + rect.top;
          const distance = Math.max(1, scrollRoot.offsetHeight - window.innerHeight);
          next = (window.scrollY - start) / distance;
        }

        rawProgress.set(reduceMotion ? 1 : Math.min(1, Math.max(0, next)));
      });
    };

    const target: HTMLElement | Window =
      scrollRoot.scrollHeight > scrollRoot.clientHeight + 1 ? scrollRoot : window;
    target.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [rawProgress, reduceMotion]);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none sticky top-0 z-0 -mb-[100dvh] h-[100dvh] overflow-hidden"
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 900 1000"
        preserveAspectRatio="none"
        className="h-full w-full text-fuchsia-500/45 dark:text-fuchsia-300/35"
        style={{ opacity: glowOpacity }}
      >
        <defs>
          <linearGradient id="scroll-line-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="0.48" stopColor="#a855f7" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          <filter id="scroll-line-glow" x="-40%" y="-20%" width="180%" height="140%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <motion.path
          d="M35 -25 C90 45 790 45 835 125 C875 205 85 165 55 255 C25 345 795 285 830 380 C865 475 90 415 60 515 C30 615 805 545 835 650 C865 755 95 685 60 790 C25 895 770 815 835 1035"
          fill="none"
          stroke="url(#scroll-line-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength: progress }}
          filter="url(#scroll-line-glow)"
        />
        <motion.path
          d="M35 -25 C90 45 790 45 835 125 C875 205 85 165 55 255 C25 345 795 285 830 380 C865 475 90 415 60 515 C30 615 805 545 835 650 C865 755 95 685 60 790 C25 895 770 815 835 1035"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 13"
          style={{ pathLength: progress }}
        />

        <FireworkBurst x={835} y={125} at={0.14} progress={progress} />
        <FireworkBurst x={55} y={255} at={0.29} progress={progress} rotate={22} />
        <FireworkBurst x={830} y={380} at={0.43} progress={progress} rotate={45} />
        <FireworkBurst x={60} y={515} at={0.57} progress={progress} rotate={15} />
        <FireworkBurst x={835} y={650} at={0.71} progress={progress} rotate={35} />
        <FireworkBurst x={60} y={790} at={0.85} progress={progress} rotate={55} />
      </motion.svg>
    </div>
  );
}
