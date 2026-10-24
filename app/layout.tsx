import type { Metadata } from "next";
import { Geist, Geist_Mono,  } from "next/font/google";
import "./globals.css";
import "./grimoire.css";
import "./rebel.css";
import { portfolioThemeNames } from "@/lib/portfolio-themes";
import { ThemeProvider } from "../components/ui/theme-provider";
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

export const metadata: Metadata = {
  title: "Nick Portfolio",
  description: "Created by Nick",
  
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
      </body>
    </html>
  );
}
