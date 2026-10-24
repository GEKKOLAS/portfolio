"use client";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  radius: number;
};

/** Burn the current theme to charcoal, swap under cover, then burn it away. */
export function startThemeTransition(onMidpoint: () => void, onComplete: () => void, onReveal?: () => void) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // The fire field deliberately renders below native resolution. Its soft,
  // organic edges stay inexpensive even on a large, high-DPI display.
  const pixelSize = Math.max(4, Math.sqrt((width * height) / 180_000));
  const cols = Math.ceil(width / pixelSize);
  const rows = Math.ceil(height / pixelSize);
  const fire = document.createElement("canvas");
  const sparks = document.createElement("canvas");
  fire.width = cols;
  fire.height = rows;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  sparks.width = Math.ceil(width * dpr);
  sparks.height = Math.ceil(height * dpr);
  for (const canvas of [fire, sparks]) {
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.themeTransition = "";
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "10000",
      pointerEvents: "none",
    });
  }

  let frame = 0;
  let finished = false;
  let swapped = false;
  let revealStarted = false;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const swap = () => {
    if (swapped) return;
    swapped = true;
    onMidpoint();
  };
  const cleanup = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", finish);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    motionQuery.removeEventListener("change", onMotionChange);
    fire.remove();
    sparks.remove();
  };
  const finish = () => {
    if (finished) return;
    finished = true;
    cleanup();
    swap();
    onComplete();
  };
  const onVisibilityChange = () => {
    if (document.hidden) finish();
  };
  const onMotionChange = (event: MediaQueryListEvent) => {
    if (event.matches) finish();
  };

  try {
    const ctx = fire.getContext("2d");
    const ex = sparks.getContext("2d");
    if (!ctx || !ex || width === 0 || height === 0) {
      finish();
      return cleanup;
    }
    ex.scale(dpr, dpr);
    const image = ctx.createImageData(cols, rows);
    const pixels = image.data;
    const field = new Float32Array(cols * rows);
    const grain = new Float32Array(cols * rows);
    const random = (x: number, y: number, seed: number) => {
      const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
      return value - Math.floor(value);
    };
    const noise = (x: number, y: number, cell: number, seed: number) => {
      const gx = Math.floor(x / cell);
      const gy = Math.floor(y / cell);
      const fx = x / cell - gx;
      const fy = y / cell - gy;
      const sx = fx * fx * (3 - 2 * fx);
      const sy = fy * fy * (3 - 2 * fy);
      const a = random(gx, gy, seed);
      const b = random(gx + 1, gy, seed);
      const c = random(gx, gy + 1, seed);
      const d = random(gx + 1, gy + 1, seed);
      return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
    };
    let low = Infinity;
    let high = -Infinity;
    const diagonal = Math.hypot(cols, rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const n = noise(x, y, 26, 1) * 0.6 + noise(x, y, 9, 2) * 0.3 + noise(x, y, 3, 3) * 0.1;
        const value = (0.6 * Math.hypot(x, rows - y)) / diagonal + 0.4 * n;
        const i = y * cols + x;
        field[i] = value;
        grain[i] = noise(x, y, 2, 4);
        low = Math.min(low, value);
        high = Math.max(high, value);
      }
    }
    const span = high - low || 1;
    for (let i = 0; i < field.length; i++) field[i] = (field[i] - low) / span;

    const embers: Ember[] = [];
    const band = 0.035;
    const scorch = 0.03;
    const started = performance.now();
    let lastFrame = started;
    let coveredAt: number | null = null;
    const render = (now: number) => {
      if (finished) return;
      try {
        const elapsed = now - started;
        if (coveredAt === null && elapsed >= 1000) {
          // Paint a fully opaque frame before React updates the page. Keep
          // it for a real 120 ms even if the browser skipped earlier frames.
          ctx.fillStyle = "#1c090b";
          ctx.fillRect(0, 0, cols, rows);
          coveredAt = now;
          swap();
          frame = requestAnimationFrame(render);
          return;
        }
        const revealElapsed = coveredAt === null ? -1 : now - coveredAt - 120;
        const revealing = revealElapsed >= 0;
        if (revealing && !revealStarted) {
          revealStarted = true;
          onReveal?.();
        }
        const progress = Math.min(1, revealing ? revealElapsed / 1300 : elapsed / 1000);
        const eased = revealing ? 1 - (1 - progress) ** 2 : progress * progress * (3 - 2 * progress);
        const p = eased * (1 + band * 2 + scorch) - band;
        for (let i = 0, j = 0; i < field.length; i++, j += 4) {
          const edge = p - field[i];
          const g = grain[i];
          let red = 0;
          let green = 0;
          let blue = 0;
          let alpha = 0;
          if (edge >= 0 && edge < band) {
            const q = edge / band;
            const flicker = 0.85 + Math.random() * 0.15;
            red = 255 * flicker;
            green = (220 - 170 * q) * flicker;
            blue = (120 - 110 * q) * flicker;
            alpha = 255;
            if (embers.length < 160 && Math.random() < 0.0016) {
              embers.push({
                x: ((i % cols) / cols) * width,
                y: (Math.floor(i / cols) / rows) * height,
                vx: (Math.random() - 0.5) * 1.2,
                vy: -1 - Math.random() * 2.4,
                life: 1,
                radius: 1 + Math.random() * 2.2,
              });
            }
          } else if (!revealing) {
            if (edge >= band) {
              red = 14 + g * 22;
              green = 5 + g * 8;
              blue = 6 + g * 6;
              alpha = 255;
            } else if (edge > -scorch) {
              red = 70;
              green = 30;
              blue = 12;
              alpha = 160 * (1 + edge / scorch);
            }
          } else if (edge < 0) {
            red = 14 + g * 22;
            green = 5 + g * 8;
            blue = 6 + g * 6;
            alpha = 255;
          }
          pixels[j] = red;
          pixels[j + 1] = green;
          pixels[j + 2] = blue;
          pixels[j + 3] = alpha;
        }
        ctx.putImageData(image, 0, 0);
        ex.clearRect(0, 0, width, height);
        const dt = Math.min(3, (now - lastFrame) / (1000 / 60));
        lastFrame = now;
        for (let i = embers.length - 1; i >= 0; i--) {
          const ember = embers[i];
          ember.x += ember.vx * dt;
          ember.y += ember.vy * dt;
          ember.vy -= 0.02 * dt;
          ember.life -= 0.018 * dt;
          if (ember.life <= 0) {
            embers.splice(i, 1);
            continue;
          }
          ex.fillStyle = `rgba(255, ${Math.round(120 + 100 * ember.life)}, 40, ${ember.life})`;
          ex.beginPath();
          ex.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
          ex.fill();
        }
        if (revealing && progress >= 1) finish();
        else frame = requestAnimationFrame(render);
      } catch {
        finish();
      }
    };
    document.body.append(fire, sparks);
    window.addEventListener("resize", finish, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionChange);
    frame = requestAnimationFrame(render);
  } catch {
    finish();
  }

  return () => {
    finished = true;
    cleanup();
  };
}
