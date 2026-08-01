"use client";

import React from "react";

const COLS = 12;
const ROWS = 12;
const BURN_MS = 950;
const ROW_STAGGER_MS = 85;
const JITTER_MS = 220;

// Deterministic jitter so SSR and client render identical delays
// (Math.random() here would cause a hydration mismatch).
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Renders its child image behind a grid of glowing blue "fire pixels" that
 * ignite from the bottom up and burn away, while the image itself sharpens
 * from a blue-hot blur. Plays on mount and replays on hover; the overlay
 * unmounts between runs.
 */
export function PixelFireReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [burning, setBurning] = React.useState(true);
  // Remount key: bumping it restarts every CSS animation for a new run.
  const [run, setRun] = React.useState(0);

  const totalMs = (ROWS - 1) * ROW_STAGGER_MS + JITTER_MS + BURN_MS;

  React.useEffect(() => {
    const timer = setTimeout(() => setBurning(false), totalMs + 200);
    return () => clearTimeout(timer);
  }, [run, totalMs]);

  const ignite = () => {
    if (burning) return;
    setBurning(true);
    setRun((r) => r + 1);
  };

  return (
    <div className={`pixel-fire-scene ${className}`} onPointerEnter={ignite}>
      <div key={run} className="pixel-fire-img">{children}</div>
      {burning ? (
        <div
          className="pixel-fire-grid"
          aria-hidden="true"
          style={{ "--pfr-cols": COLS } as React.CSSProperties}
        >
          {Array.from({ length: COLS * ROWS }, (_, i) => {
            const row = Math.floor(i / COLS);
            const delay = (ROWS - 1 - row) * ROW_STAGGER_MS + seeded(i, 1) * JITTER_MS;
            const duration = BURN_MS * (0.75 + seeded(i, 2) * 0.5);
            return (
              <span
                key={i}
                className="pixel-fire-cell"
                style={
                  {
                    "--pfr-delay": `${delay.toFixed(0)}ms`,
                    "--pfr-dur": `${duration.toFixed(0)}ms`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
