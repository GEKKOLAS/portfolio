"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { startThemeTransition } from "@/components/effects/theme-transition";
import { startRebelTransition } from "@/components/effects/rebel-transition";
import { startCosmicTransition } from "@/components/effects/cosmic-transition";
import { portfolioThemeNames, type PortfolioTheme } from "@/lib/portfolio-themes";
import { UISoundProvider, useUISounds } from "./ui-sound-provider";

export type { PortfolioTheme } from "@/lib/portfolio-themes";

type PortfolioThemeContextValue = {
  theme: PortfolioTheme;
  mounted: boolean;
  isGrimoire: boolean;
  isRebel: boolean;
  isOriginal: boolean;
  isTransitioning: boolean;
  transitionToTheme: (theme: PortfolioTheme) => void;
};

const PortfolioThemeContext = React.createContext<PortfolioThemeContextValue | null>(null);

function PortfolioThemeController({ children }: { children: React.ReactNode }) {
  const { theme: savedTheme, setTheme } = useTheme();
  const { unlock, play, stop } = useUISounds();
  const [mounted, setMounted] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const busy = React.useRef(false);
  const selectionVersion = React.useRef(0);
  const cancel = React.useRef<(() => void) | null>(null);
  const theme: PortfolioTheme = mounted && (savedTheme === "grimoire" || savedTheme === "rebel") ? savedTheme : "dark";

  React.useEffect(() => {
    setMounted(true);
    return () => {
      selectionVersion.current += 1;
      cancel.current?.();
    };
  }, []);

  React.useEffect(() => {
    // next-themes may read a theme saved by an older version of the site.
    // Normalize it so the selector and the document always agree.
    if (savedTheme && !portfolioThemeNames.some((name) => name === savedTheme) && !isTransitioning) {
      setTheme("dark");
    }
  }, [savedTheme, setTheme, isTransitioning]);

  const transitionToTheme = React.useCallback((nextTheme: PortfolioTheme) => {
    if (busy.current || nextTheme === theme) return;
    const selection = ++selectionVersion.current;
    const applyTheme = () => {
      const panel = document.querySelector<HTMLElement>(".right-scroll");
      const panelTop = panel?.scrollTop ?? 0;
      const panelLeft = panel?.scrollLeft ?? 0;
      const windowTop = window.scrollY;
      const windowLeft = window.scrollX;
      flushSync(() => setTheme(nextTheme));
      panel?.scrollTo({ top: panelTop, left: panelLeft, behavior: "instant" });
      window.scrollTo({ top: windowTop, left: windowLeft, behavior: "instant" });
    };
    stop();
    const audioReady = unlock();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme();
      void audioReady.then((ready) => {
        if (ready && selectionVersion.current === selection) play("arrive", nextTheme);
      });
      return;
    }
    busy.current = true;
    setIsTransitioning(true);
    // The destination owns the transition, regardless of the previous theme.
    const startTransition = {
      dark: startCosmicTransition,
      grimoire: startThemeTransition,
      rebel: startRebelTransition,
    }[nextTheme];
    let started = false;
    let aborted = false;
    const complete = () => {
      stop();
      busy.current = false;
      cancel.current = null;
      setIsTransitioning(false);
      play("arrive", nextTheme);
    };
    const begin = () => {
      if (started || aborted || selectionVersion.current !== selection) return;
      started = true;
      window.clearTimeout(audioGate);
      if (document.hidden) {
        applyTheme();
        complete();
        return;
      }
      // Begin the cover sound and visual together after the audio device is
      // ready. A short timeout keeps unavailable audio from delaying the UI.
      play("transition", nextTheme);
      const cancelTransition = startTransition(applyTheme, complete, () => {
        stop();
        play("reveal", nextTheme);
      });
      if (busy.current) cancel.current = () => {
        aborted = true;
        cancelTransition();
        stop();
      };
      else cancelTransition();
    };
    cancel.current = () => {
      aborted = true;
      window.clearTimeout(audioGate);
      stop();
    };
    const audioGate = window.setTimeout(begin, 180);
    void audioReady.then(begin, begin);
  }, [setTheme, theme, unlock, play, stop]);

  const value = React.useMemo(() => ({
    theme,
    mounted,
    isGrimoire: theme === "grimoire",
    isRebel: theme === "rebel",
    isOriginal: theme === "dark",
    isTransitioning,
    transitionToTheme,
  }), [theme, mounted, isTransitioning, transitionToTheme]);

  return <PortfolioThemeContext.Provider value={value}>{children}</PortfolioThemeContext.Provider>;
}

export function usePortfolioTheme() {
  const context = React.useContext(PortfolioThemeContext);
  if (!context) throw new Error("usePortfolioTheme must be used within ThemeProvider");
  return context;
}

// Keep outgoing effects until the theme swaps, but mount incoming WebGL only
// after the portal has finished so shader setup cannot stall its audio phases.
export function useOriginalEffects() {
  const { isOriginal, isTransitioning } = usePortfolioTheme();
  const [ready, setReady] = React.useState(isOriginal && !isTransitioning);
  React.useEffect(() => {
    if (!isOriginal) setReady(false);
    else if (!isTransitioning) setReady(true);
  }, [isOriginal, isTransitioning]);
  return isOriginal && ready;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="dark" themes={portfolioThemeNames} enableSystem={false} {...props}>
      <UISoundProvider>
        <PortfolioThemeController>{children}</PortfolioThemeController>
      </UISoundProvider>
    </NextThemesProvider>
  );
}
