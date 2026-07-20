"use client";

import { useEffect, useState } from "react";

// Mirrors the `lg` breakpoint already used across the layout to switch
// between the mobile single-column scroll and the desktop two-panel grid.
const MOBILE_QUERY = "(max-width: 1023px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
