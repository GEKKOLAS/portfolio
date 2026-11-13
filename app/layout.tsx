import type { Metadata } from "next";
import { Geist, Geist_Mono,  } from "next/font/google";
import "./globals.css";
import "./grimoire.css";
import "./rebel.css";
import { portfolioThemeNames } from "@/lib/portfolio-themes";
import { ThemeProvider } from "../components/ui/theme-provider";
import { VisitBeacon } from "../components/visit-beacon";
import { Tangerine } from "next/font/google";
import { FULL_NAME, PROFILES, ROLE, SITE_URL } from "@/lib/site";


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

const title = `${FULL_NAME} | ${ROLE}`;
const description = `${FULL_NAME}: International Business professional and full-stack developer (.NET, React, Azure) bridging business, design, marketing and code. Web products and automations built from the business problem up. Available for freelance.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  // Two Vercel projects serve this site; point search engines at the real domain.
  alternates: { canonical: "/" },
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  keywords: [
    FULL_NAME,
    "Full-Stack Developer",
    "International Business",
    ".NET developer",
    "React developer",
    "Business automation",
    "n8n",
    "Colombia",
    "Freelance developer",
  ],
  openGraph: { title, description, type: "profile", url: SITE_URL, siteName: FULL_NAME },
  twitter: { card: "summary_large_image", title, description },
  // Set GOOGLE_SITE_VERIFICATION in Vercel to verify the site in Google Search Console.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

// schema.org Person: lets search engines show the name, role and profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: ROLE,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Santo Tomás University" },
  address: { "@type": "PostalAddress", addressCountry: "CO" },
  knowsLanguage: ["es", "en"],
  knowsAbout: [
    "International Business",
    "Business Analysis",
    "Full-Stack Development",
    ".NET",
    "React",
    "Azure",
    "AWS",
    "Business Process Automation",
    "Digital Marketing",
  ],
  sameAs: [PROFILES.linkedin, PROFILES.github],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
