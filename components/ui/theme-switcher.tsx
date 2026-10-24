"use client";

import { Crown, Sparkles, Star } from "lucide-react";
import { portfolioThemes } from "@/lib/portfolio-themes";
import { usePortfolioTheme } from "./theme-provider";
import "./theme-switcher.css";

const icons = { dark: Sparkles, grimoire: Crown, rebel: Star };

export function ThemeSwitcher() {
  const { theme, mounted, isTransitioning, transitionToTheme } = usePortfolioTheme();
  const currentLabel = portfolioThemes.find(({ id }) => id === theme)?.label;

  return (
    <div className="theme-switcher" role="group" aria-label="Portfolio theme" aria-busy={isTransitioning}>
      {portfolioThemes.map(({ id, label }) => {
        const Icon = icons[id];
        return (
          <button
            key={id}
            type="button"
            className="theme-switcher-option"
            data-ui-sound="theme"
            data-theme-option={id}
            aria-pressed={theme === id}
            disabled={!mounted}
            aria-disabled={isTransitioning}
            onClick={() => transitionToTheme(id)}
          >
            <Icon size={14} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
      <span className="sr-only" role="status" aria-live="polite">
        {mounted ? isTransitioning ? "Changing theme" : `${currentLabel} theme selected` : ""}
      </span>
    </div>
  );
}
