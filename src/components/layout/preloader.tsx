"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DISPLAY_DURATION = 2000;
const SESSION_KEY = "sb-preloader-shown";

export function Preloader() {
  // Assume loading by default so the server-rendered markup matches a fresh visit.
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  // Cached across React Strict Mode's dev-only double effect invocation so the
  // sessionStorage write on the first run doesn't shorten the delay on the second.
  const isFirstLoadRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (isFirstLoadRef.current === null) {
      isFirstLoadRef.current = !sessionStorage.getItem(SESSION_KEY);
      if (isFirstLoadRef.current) sessionStorage.setItem(SESSION_KEY, "1");
    }
    const timer = setTimeout(
      () => setIsLoading(false),
      isFirstLoadRef.current ? DISPLAY_DURATION : 0,
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          className="fixed inset-0 z-200000000000000000 flex items-center justify-center bg-dark"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: EASE, delay: 2 },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: EASE,
              }}
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
                SB
              </span>
              <span className="text-xl font-semibold tracking-tight text-white">
                SkillBridge
              </span>
            </motion.div>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-primary"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1, ease: EASE }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
