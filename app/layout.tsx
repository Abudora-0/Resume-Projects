import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AccentProvider } from "@/components/AccentProvider";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://abudora-resume.vercel.app";

const TITLE = "Muhammad Abdullah, Frontend & Full-Stack Engineer";
const DESCRIPTION =
  "Eight shipped products, each built inside its own deliberate design language. An exhibition catalogue in Next.js and TypeScript, with no animation dependencies.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s, Abudora",
  },
  description: DESCRIPTION,
  keywords: [
    "Abudora",
    "Muhammad Abdullah",
    "frontend engineer",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
    "UI engineering",
    "design systems",
  ],
  authors: [{ name: "Muhammad Abdullah", url: "https://github.com/Abudora-0" }],
  creator: "Muhammad Abdullah",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Abudora",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Scroll reveals start hidden; without JS they must not stay that way. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.cyc-item:first-of-type{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <AccentProvider>{children}</AccentProvider>
      </body>
    </html>
  );
}
