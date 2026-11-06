export const portfolioThemes = [
  { id: "dark", label: "Original" },
  { id: "grimoire", label: "Ritual" },
  { id: "rebel", label: "Rebel" },
] as const;

export type PortfolioTheme = (typeof portfolioThemes)[number]["id"];
export const portfolioThemeNames = portfolioThemes.map(({ id }) => id);
