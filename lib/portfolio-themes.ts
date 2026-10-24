export const portfolioThemes = [
  { id: "dark", label: "Original" },
  { id: "grimoire", label: "Cult of the Lamb" },
  { id: "rebel", label: "Rebel" },
] as const;

export type PortfolioTheme = (typeof portfolioThemes)[number]["id"];
export const portfolioThemeNames = portfolioThemes.map(({ id }) => id);
