export const portfolioThemes = [
  { id: "dark", label: "Original" },
  { id: "grimoire", label: "Ritual" },
  { id: "rebel", label: "Rebel" },
  { id: "sunset", label: "Sunset" },
] as const;

export type PortfolioTheme = (typeof portfolioThemes)[number]["id"];
export const portfolioThemeNames = portfolioThemes.map(({ id }) => id);

export const isPortfolioTheme = (value: unknown): value is PortfolioTheme =>
  portfolioThemeNames.some((name) => name === value);
