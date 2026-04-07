import type { Metadata } from "next";
import { Outfit, Playfair_Display, Bebas_Neue } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
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
      suppressHydrationWarning
      className={`${outfit.variable} ${playfair.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="grain-overlay min-h-full flex flex-col bg-background text-foreground selection:bg-accent-500/25 selection:text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Ambient glow background */}
          <div className="ambient-bg" aria-hidden="true" />
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
