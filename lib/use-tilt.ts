"use client";

import { type PointerEvent, useRef } from "react";

// Cursor-reactive 3D tilt. Spread the result onto an element with the
// `project-card` class (inside a `project-card-scene`), which reads these vars.
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = (event: PointerEvent<T>) => {
    if (event.pointerType === "touch") return;

    const card = ref.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--card-rotate-x", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--card-rotate-y", `${(x - 0.5) * 10}deg`);
    card.style.setProperty("--card-glow-x", `${x * 100}%`);
    card.style.setProperty("--card-glow-y", `${y * 100}%`);
  };

  const onPointerLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
  };

  return { ref, onPointerMove, onPointerLeave };
}
