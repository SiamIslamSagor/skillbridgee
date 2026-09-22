"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { usePreloaderReady } from "@/lib/preloader-context";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const preloaderReady = usePreloaderReady();
  // Tracks whether we've already done the initial preloader -> content swap,
  // so that first swap skips the fade-in and reveals fire immediately.
  const [hasRevealed, setHasRevealed] = useState(false);
  const isFirstReveal = preloaderReady && !hasRevealed;
  if (isFirstReveal) setHasRevealed(true);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  if (!preloaderReady) {
    // Render plain (no motion wrapper) while hidden behind the preloader, so
    // there's nothing to exit-animate once it's time to reveal the page.
    return (
      <>
        <TopProgressBar pathname={pathname} />
        {children}
      </>
    );
  }

  return (
    <>
      <TopProgressBar pathname={pathname} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={isFirstReveal ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function TopProgressBar({ pathname }: { pathname: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="pointer-events-none fixed inset-x-0 top-0 z-999999 h-0.5 origin-left bg-primary"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{
          scaleX: 1,
          opacity: 0,
          transition: {
            scaleX: { duration: 0.5, ease: EASE },
            opacity: { duration: 0.3, delay: 0.4, ease: EASE },
          },
        }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      />
    </AnimatePresence>
  );
}
