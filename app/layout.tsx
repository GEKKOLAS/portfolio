import type { Metadata } from "next";
import { Geist, Geist_Mono,  } from "next/font/google";
import "./globals.css";
import "./grimoire.css";
import "./rebel.css";
import { portfolioThemeNames } from "@/lib/portfolio-themes";
import { ThemeProvider } from "../components/ui/theme-provider";
import { VisitBeacon } from "../components/visit-beacon";
import { Tangerine } from "next/font/google";


const tangerine = Tangerine({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-tangerine",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Nicolás | Full-Stack Developer who speaks business, design & marketing";
const description =
  "Full-stack developer (.NET, React, Azure) who also works as a business analyst, designer and marketer: web products and automations built from the business problem up. Available for freelance.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${tangerine.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          themes={portfolioThemeNames}
          enableSystem={false}
          enableColorScheme={false}
        >

          {children}
        </ThemeProvider>
        <VisitBeacon />
      </body>
    </html>
  );
}
