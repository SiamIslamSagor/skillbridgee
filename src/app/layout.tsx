import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { PageTransition } from "@/components/layout/page-transition";
import { Preloader } from "@/components/layout/preloader";
import { PreloaderProvider } from "@/lib/preloader-context";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SkillBridge | Learn Skills. Build Your Future.",
    template: "%s | SkillBridge",
  },
  description:
    "SkillBridge helps ambitious learners build practical, job-ready skills through mentor-led programs, real-world projects, and career support.",
  keywords: [
    "SkillBridge",
    "online learning",
    "career development",
    "web development courses",
    "digital marketing courses",
  ],
  openGraph: {
    title: "SkillBridge | Learn Skills. Build Your Future.",
    description:
      "Practical programs, expert mentors, and the support to turn your ambition into opportunity.",
    type: "website",
    siteName: "SkillBridge",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <PreloaderProvider>
            <Preloader />
            <CustomCursor />
            <PageTransition>{children}</PageTransition>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
