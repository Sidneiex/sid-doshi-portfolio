import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Playfair_Display, Fira_Code } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { IntroGate } from "@/components/ui/IntroGate";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sid Doshi — Filmmaker & Developer",
    template: "%s | Sid Doshi",
  },
  description:
    "Sid Doshi — a personal portfolio blending cinematic filmmaking with modern software engineering. Based in Pune, India.",
  keywords: [
    "Sid Doshi",
    "filmmaker",
    "developer",
    "portfolio",
    "cinematic",
    "web developer",
    "video production",
    "AI agents",
  ],
  openGraph: {
    title: "Sid Doshi — Filmmaker & Developer",
    description:
      "Where film direction meets software engineering. A portfolio by Sid Doshi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} ${playfair.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="grain-overlay min-h-full flex flex-col bg-background text-foreground selection:bg-accent-500/20 selection:text-foreground">
        <SmoothScroll>
          <IntroGate>
            {/* Ambient glow background */}
            <div className="ambient-bg" aria-hidden="true" />
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </IntroGate>
        </SmoothScroll>
      </body>
    </html>
  );
}
