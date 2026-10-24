"use client";

/** A cyan/violet portal closes over the page, then disperses into starlight. */
export function startCosmicTransition(onMidpoint: () => void, onComplete: () => void, onReveal?: () => void) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const overlay = document.createElement("div");
  const animations: Animation[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  let finished = false;
  let swapped = false;
  let revealStarted = false;

  const swap = () => {
    if (swapped || finished) return;
    swapped = true;
    onMidpoint();
  };
  const cleanup = () => {
    timers.forEach(clearTimeout);
    animations.forEach((animation) => animation.cancel());
    overlay.remove();
    window.removeEventListener("resize", finish);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    motionQuery.removeEventListener("change", onMotionChange);
  };
  const finish = () => {
    if (finished) return;
    // A fallback must still select the requested theme, even if it happens
    // before the portal covers the page. Cancellation below never swaps.
    if (!swapped) {
      swapped = true;
      try { onMidpoint(); } finally {
        finished = true;
        cleanup();
        onComplete();
      }
      return;
    }
    finished = true;
    cleanup();
    onComplete();
  };
  const onVisibilityChange = () => { if (document.hidden) finish(); };
  const onMotionChange = (event: MediaQueryListEvent) => { if (event.matches) finish(); };

  if (motionQuery.matches || typeof overlay.animate !== "function") {
    finish();
    return () => {};
  }

  try {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.ceil(Math.hypot(width, height) / 2) + 12;
    const ringSize = Math.max(120, Math.min(width, height) * 0.6);
    const coverScale = (radius * 2) / ringSize;
    overlay.dataset.themeTransition = "cosmic";
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed", inset: "0", zIndex: "10000", overflow: "hidden",
      pointerEvents: "none", isolation: "isolate",
    });

    const veil = document.createElement("div");
    veil.dataset.cosmicVeil = "";
    Object.assign(veil.style, {
      position: "absolute", inset: "0", backgroundColor: "#070916",
      backgroundImage: "radial-gradient(ellipse at 30% 50%, #0b355b 0%, transparent 55%), radial-gradient(ellipse at 70% 45%, #351358 0%, transparent 55%)",
      clipPath: "circle(0px at 50% 50%)", willChange: "clip-path, opacity",
    });
    overlay.append(veil);

    const frontier = document.createElement("div");
    frontier.dataset.cosmicFrontier = "";
    Object.assign(frontier.style, {
      position: "absolute", left: "50%", top: "50%", width: `${ringSize}px`,
      height: `${ringSize}px`, border: "1px solid #67e8f9", borderRadius: "50%",
      boxShadow: "0 0 20px #22d3ee90, inset 0 0 18px #a855f780",
      transform: "translate(-50%, -50%) scale(0)", opacity: "0",
      willChange: "transform, opacity",
    });
    overlay.append(frontier);

    const orbits = Array.from({ length: 3 }, (_, index) => {
      const orbit = document.createElement("div");
      const size = 112 + index * 34;
      orbit.dataset.cosmicOrbit = "";
      Object.assign(orbit.style, {
        position: "absolute", left: "50%", top: "50%", width: `${size}px`,
        height: `${size}px`, border: `1px solid ${index === 1 ? "#c4b5fd" : "#67e8f9"}`,
        borderRadius: "50%", opacity: "0",
        boxShadow: `0 0 18px ${index === 1 ? "#a855f770" : "#22d3ee70"}`,
        transform: `translate(-50%, -50%) rotate(${index * 60}deg) scale(0.1, 0.05)`,
        willChange: "transform, opacity",
      });
      overlay.append(orbit);
      return orbit;
    });

    const specks = Array.from({ length: 24 }, (_, index) => {
      const speck = document.createElement("div");
      speck.dataset.cosmicStar = "";
      Object.assign(speck.style, {
        position: "absolute", left: "50%", top: "50%", width: index % 3 === 0 ? "3px" : "2px",
        height: index % 3 === 0 ? "3px" : "2px", borderRadius: "50%",
        background: index % 2 === 0 ? "#a5f3fc" : "#ddd6fe",
        boxShadow: "0 0 7px #67e8f9", opacity: "0", willChange: "transform, opacity",
      });
      veil.append(speck);
      return speck;
    });

    document.body.append(overlay);
    window.addEventListener("resize", finish, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionChange);

    const animate = (element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, { ...options, fill: "forwards" });
      animations.push(animation);
      // Animation cancellation is part of normal disposal.
      void animation.finished.catch(() => {});
      return animation;
    };

    const cover = animate(veil, [
      { clipPath: "circle(0px at 50% 50%)" },
      { clipPath: `circle(${radius}px at 50% 50%)` },
    ], { duration: 520, easing: "cubic-bezier(.65, 0, .35, 1)" });
    animate(frontier, [
      { transform: "translate(-50%, -50%) scale(0.02)", opacity: 0 },
      { transform: `translate(-50%, -50%) scale(${coverScale * 0.35})`, opacity: 0.95, offset: 0.42 },
      { transform: `translate(-50%, -50%) scale(${coverScale})`, opacity: 0 },
    ], { duration: 560, easing: "cubic-bezier(.65, 0, .35, 1)" });
    orbits.forEach((orbit, index) => {
      animate(orbit, [
        { transform: `translate(-50%, -50%) rotate(${index * 60 - 65}deg) scale(0.1, 0.05)`, opacity: 0 },
        { transform: `translate(-50%, -50%) rotate(${index * 60}deg) scale(1, 0.48)`, opacity: 0.85 },
      ], { duration: 520, easing: "cubic-bezier(.22, 1, .36, 1)" });
    });
    specks.forEach((speck, index) => {
      const angle = index * 2.399963;
      const distance = radius * (0.15 + ((index * 7) % 19) / 28);
      animate(speck, [
        { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
        { opacity: 0.85, offset: 0.25 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`, opacity: 0 },
      ], { duration: 1080, delay: index % 4 * 35, easing: "cubic-bezier(.22, 1, .36, 1)" });
    });

    void cover.finished.then(() => {
      if (finished) return;
      // Remove clipping at the midpoint: the opaque veil covers every corner
      // when React changes the page, including on an ultrawide monitor.
      veil.style.clipPath = "none";
      swap();
      timers.push(setTimeout(() => {
        if (finished) return;
        try {
          orbits.forEach((orbit, index) => animate(orbit, [
            { transform: `translate(-50%, -50%) rotate(${index * 60}deg) scale(1, 0.48)`, opacity: 0.85 },
            { transform: `translate(-50%, -50%) rotate(${index * 60 + 80}deg) scale(2.4, 1.15)`, opacity: 0 },
          ], { duration: 640, easing: "cubic-bezier(.22, 1, .36, 1)" }));
          if (!revealStarted) {
            revealStarted = true;
            onReveal?.();
          }
          const reveal = animate(veil, [
            { opacity: 1 },
            { opacity: 0 },
          ], { duration: 640, easing: "cubic-bezier(.4, 0, .2, 1)" });
          void reveal.finished.then(finish).catch(finish);
        } catch { finish(); }
      }, 100));
    }).catch(finish);
    timers.push(setTimeout(finish, 2800));
  } catch { finish(); }

  return () => {
    if (finished) return;
    finished = true;
    cleanup();
  };
}
