import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { profile } from "@/content/profile";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const serifDisplay = Source_Serif_4({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
});

const monoCode = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: `${profile.headline} ${profile.pitch}`,
  keywords: [
    "simulation engineer",
    "CAE engineer",
    "stress engineer",
    "finite element analysis",
    "Abaqus UEL UMAT",
    "process automation",
    "robot off-line programming",
    "composite structures",
  ],
  authors: [{ name: profile.fullName }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
    type: "profile",
    locale: "en_IE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${serifDisplay.variable} ${monoCode.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
