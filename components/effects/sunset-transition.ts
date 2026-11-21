"use client";

/**
 * Six dusk-coloured bands rise over the viewport, a striped retro sun with palm
 * silhouettes rises behind a horizon, the theme swaps, then everything lifts away.
 */
const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="sunset-sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe36e"/>
      <stop offset="0.55" stop-color="#ff8a3d"/>
      <stop offset="1" stop-color="#ff2e88"/>
    </linearGradient>
    <mask id="sunset-stripes">
      <rect width="200" height="200" fill="#fff"/>
      <rect y="112" width="200" height="5" fill="#000"/>
      <rect y="128" width="200" height="7" fill="#000"/>
      <rect y="146" width="200" height="9" fill="#000"/>
      <rect y="166" width="200" height="11" fill="#000"/>
    </mask>
  </defs>
  <circle cx="100" cy="100" r="92" fill="url(#sunset-sun)" mask="url(#sunset-stripes)"/>
  <g fill="#1a0b2e">
    <path d="M38 200 C40 170 44 140 52 118 L56 119 C50 142 47 170 47 200 Z"/>
    <path d="M54 118 C40 104 22 104 8 114 C24 106 40 110 52 121 Z"/>
    <path d="M54 118 C48 98 34 88 18 88 C34 94 46 104 51 121 Z"/>
    <path d="M54 118 C62 100 78 94 94 98 C78 100 66 108 57 121 Z"/>
    <path d="M54 118 C70 112 86 118 96 130 C82 120 68 118 56 122 Z"/>
    <path d="M154 200 C156 176 158 152 164 134 L168 135 C163 154 162 176 162 200 Z"/>
    <path d="M166 134 C154 122 138 122 126 130 C140 124 154 128 164 137 Z"/>
    <path d="M166 134 C174 120 188 116 200 120 C188 122 176 128 169 137 Z"/>
    <path d="M166 134 C162 118 152 110 140 108 C152 114 160 124 164 137 Z"/>
    <path d="M166 134 C178 130 192 134 200 144 C188 136 178 134 168 137 Z"/>
  </g>
</svg>`;

export function startSunsetTransition(onMidpoint: () => void, onComplete: () => void, onReveal?: () => void) {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const overlay = document.createElement("div");
  const animations: Animation[] = [];
  const timers: ReturnType<typeof setTimeout>[] = [];
  let finished = false;
  let swapped = false;
  let revealStarted = false;

  const swap = () => {
    if (swapped) return;
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
    finished = true;
    cleanup();
    swap();
    onComplete();
  };
  const onVisibilityChange = () => { if (document.hidden) finish(); };
  const onMotionChange = (event: MediaQueryListEvent) => { if (event.matches) finish(); };

  if (motionQuery.matches || typeof overlay.animate !== "function") {
    finish();
    return () => {};
  }

  try {
    overlay.dataset.themeTransition = "sunset";
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed", inset: "0", zIndex: "10000",
      overflow: "hidden", pointerEvents: "none",
    });
    // Top of the sky to the horizon glow.
    const colors = ["#1a0b2e", "#3b0f5c", "#7a1fa2", "#d42a8c", "#ff5a5f", "#ff9a3d"];
    const bands = colors.map((color, index) => {
      const band = document.createElement("div");
      Object.assign(band.style, {
        position: "absolute", left: "0", right: "0",
        top: `${(index * 100) / colors.length}%`,
        height: `${100 / colors.length + 0.5}%`,
        background: color,
        transform: "translateY(110vh)",
        willChange: "transform",
      });
      overlay.append(band);
      return band;
    });
    const sun = document.createElement("div");
    sun.innerHTML = SUN_SVG;
    Object.assign(sun.style, {
      position: "absolute", left: "50%", top: "50%",
      width: "52vmin", height: "52vmin",
      transform: "translate(-50%, 60vh)",
      filter: "drop-shadow(0 0 40px #ff2e88aa)",
    });
    overlay.append(sun);
    document.body.append(overlay);
    window.addEventListener("resize", finish, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionChange);

    const animate = (element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, { ...options, fill: "forwards" });
      animations.push(animation);
      void animation.finished.catch(() => {});
      return animation;
    };
    const easing = "cubic-bezier(.65,0,.25,1)";
    // The horizon bands arrive first, then the sky fills upward.
    const entrance = bands.map((band, index) => animate(band, [
      { transform: "translateY(110vh)" },
      { transform: "translateY(0)" },
    ], { duration: 420, delay: (colors.length - 1 - index) * 60, easing }));

    void Promise.all(entrance.map((animation) => animation.finished)).then(() => {
      if (finished) return;
      animate(sun, [
        { transform: "translate(-50%, 60vh)" },
        { transform: "translate(-50%, -50%)" },
      ], { duration: 380, easing: "cubic-bezier(.2,.9,.3,1.1)" });
      swap();
      timers.push(setTimeout(() => {
        if (finished) return;
        try {
          if (!revealStarted) {
            revealStarted = true;
            onReveal?.();
          }
          animate(sun, [
            { transform: "translate(-50%, -50%)", opacity: 1 },
            { transform: "translate(-50%, -160vh)", opacity: 1 },
          ], { duration: 420, easing: "ease-in" });
          const exit = bands.map((band, index) => animate(band, [
            { transform: "translateY(0)" },
            { transform: "translateY(-110vh)" },
          ], { duration: 400, delay: 60 + (colors.length - 1 - index) * 50, easing }));
          void Promise.all(exit.map((animation) => animation.finished)).then(finish).catch(finish);
        } catch { finish(); }
      }, 480));
    }).catch(finish);
    timers.push(setTimeout(finish, 3800));
  } catch { finish(); }

  return () => {
    if (finished) return;
    finished = true;
    cleanup();
  };
}
