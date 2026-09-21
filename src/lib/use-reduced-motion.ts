import { useReducedMotion as useMotionReducedMotion } from "motion/react";

export function usePrefersReducedMotion() {
  return useMotionReducedMotion() ?? false;
}
