"use client";

/** Six diagonal blades cover the viewport before the theme changes. */
export function startRebelTransition(onMidpoint: () => void, onComplete: () => void, onReveal?: () => void) {
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
    overlay.dataset.themeTransition = "rebel";
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed", inset: "0", zIndex: "10000",
      overflow: "hidden", pointerEvents: "none",
    });
    const width = window.innerWidth;
    const height = window.innerHeight;
    const angle = 14 * Math.PI / 180;
    // Extend past the diagonal corners on both wide and tall screens.
    const slant = Math.tan(angle) * width;
    const step = (height + slant + 100) / 6;
    const bladeHeight = step * Math.cos(angle) + 18;
    const bladeWidth = Math.max(width * 1.6, width + height * 0.6);
    const colors = ["#000", "#E5001C", "#FFF", "#000", "#E5001C", "#000"];
    const blades = colors.map((color, index) => {
      const blade = document.createElement("div");
      blade.dataset.rebelBlade = "";
      Object.assign(blade.style, {
        position: "absolute", left: `${(width - bladeWidth) / 2}px`,
        top: `${-slant / 2 - 50 + step * (index + 0.5) - bladeHeight / 2}px`,
        width: `${bladeWidth}px`, height: `${bladeHeight}px`, background: color,
        transform: "rotate(-14deg) translateX(-130%)",
        boxShadow: color === "#FFF" ? "none" : "0 0 0 6px #000",
        willChange: "transform",
      });
      overlay.append(blade);
      return blade;
    });
    const star = document.createElement("div");
    star.textContent = "★";
    Object.assign(star.style, {
      position: "absolute", left: "50%", top: "50%", fontSize: "38vmin",
      lineHeight: "1", color: "#E5001C", WebkitTextStroke: "10px #000",
      transform: "translate(-50%,-50%) scale(0) rotate(-40deg)",
      fontFamily: "Arial, sans-serif",
    });
    overlay.append(star);
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
    const easing = "cubic-bezier(.7,0,.2,1)";
    const entrance = blades.map((blade, index) => animate(blade, [
      { transform: "rotate(-14deg) translateX(-130%)" },
      { transform: "rotate(-14deg) translateX(0%)" },
    ], { duration: 380, delay: index * 55, easing }));

    void Promise.all(entrance.map((animation) => animation.finished)).then(() => {
      if (finished) return;
      animate(star, [
        { transform: "translate(-50%,-50%) scale(0) rotate(-40deg)" },
        { transform: "translate(-50%,-50%) scale(1.15) rotate(8deg)" },
        { transform: "translate(-50%,-50%) scale(1) rotate(0deg)" },
      ], { duration: 320, easing: "cubic-bezier(.34,1.56,.64,1)" });
      swap();
      timers.push(setTimeout(() => {
        if (finished) return;
        try {
          if (!revealStarted) {
            revealStarted = true;
            onReveal?.();
          }
          animate(star, [
            { transform: "translate(-50%,-50%) scale(1) rotate(0deg)", opacity: 1 },
            { transform: "translate(-50%,-50%) scale(2.6) rotate(30deg)", opacity: 0 },
          ], { duration: 300, easing: "ease-in" });
          const exit = blades.map((blade, index) => animate(blade, [
            { transform: "rotate(-14deg) translateX(0%)" },
            { transform: "rotate(-14deg) translateX(130%)" },
          ], { duration: 360, delay: 80 + index * 45, easing }));
          void Promise.all(exit.map((animation) => animation.finished)).then(finish).catch(finish);
        } catch { finish(); }
      }, 420));
    }).catch(finish);
    timers.push(setTimeout(finish, 3500));
  } catch { finish(); }

  return () => {
    if (finished) return;
    finished = true;
    cleanup();
  };
}
