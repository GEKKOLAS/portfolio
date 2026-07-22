"use client";

import React from "react";
import { motion } from "framer-motion";

interface SimpleRevealOverlayProps {
  durationMs?: number;
  onComplete?: () => void;
  onWhiteShown?: () => void;
}

// Mobile-only stand-in for FireRevealOverlay: the WebGL fire shader rasterizes
// a large filtered SVG onto a big offscreen canvas right at page load, which
// was crashing iOS Safari before any content even rendered. This does the
// same "loader -> white flash -> content" handoff with a plain CSS opacity
// fade, no canvas/WebGL involved.
export const SimpleRevealOverlay: React.FC<SimpleRevealOverlayProps> = ({
  durationMs = 900,
  onComplete,
  onWhiteShown,
}) => {
  React.useEffect(() => {
    const whiteTimer = setTimeout(() => onWhiteShown?.(), 150);
    const doneTimer = setTimeout(() => onComplete?.(), durationMs);
    return () => {
      clearTimeout(whiteTimer);
      clearTimeout(doneTimer);
    };
  }, [durationMs, onComplete, onWhiteShown]);

  return (
    <motion.div
      className="fixed inset-0 bg-white dark:bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: durationMs / 1000, times: [0, 0.2, 0.75, 1], ease: "easeInOut" }}
    />
  );
};
