"use client";

import Script from "next/script";
import React from "react";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      isInitialized?: boolean;
    };
  }
}

type UnicornStudioDividerProps = {
  projectId: string;
  className?: string;
  style?: React.CSSProperties;
};

export function UnicornStudioDivider({
  projectId,
  className,
  style,
}: UnicornStudioDividerProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // If the script is already present (hot reload / navigation), re-init.
    window.UnicornStudio?.init?.();
  }, []);

  if (!mounted || resolvedTheme !== "dark") {
    return null;
  }

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.UnicornStudio?.init?.();
        }}
      />
      <div
        data-us-project={projectId}
        className={className}
        style={style}
      />
    </>
  );
}
