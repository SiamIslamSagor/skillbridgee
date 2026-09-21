"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export function StatCounter({
  value,
  suffix = "",
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }
    motionValue.set(value);
  }, [isInView, motionValue, prefersReducedMotion, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", latest => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [springValue]);

  const isDecimal = value % 1 !== 0;
  const formatted = isDecimal
    ? display.toFixed(1)
    : Math.round(display).toLocaleString();

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
      {suffix}
    </motion.span>
  );
}
