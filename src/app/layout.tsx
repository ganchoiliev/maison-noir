import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { ReducedMotionProvider } from "@/components/motion/reduced-motion";
import { CustomCursor } from "@/components/motion/cursor";
import { IntroAnimation } from "@/components/motion/intro-animation";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/utils/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Seasonal Tasting Menu`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable}`}>
      <body className="min-h-screen bg-ink text-bone font-sans antialiased">
        <ReducedMotionProvider>
          <LenisProvider>
            <CustomCursor />
            <IntroAnimation>
              <Navigation />
              <main>{children}</main>
              <Footer />
            </IntroAnimation>
          </LenisProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
