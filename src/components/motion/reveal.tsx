"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

const baseRevealTransition = {
  duration: 0.72,
  ease: MOTION_EASE,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      filter: "blur(10px)",
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      clipPath: "inset(0 0 0% 0)",
      transition: { ...baseRevealTransition, delay },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-15% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className ? `${className} overflow-hidden` : "overflow-hidden"}
      initial={{
        opacity: 0,
        y,
        filter: "blur(10px)",
        clipPath: "inset(0 0 100% 0)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        clipPath: "inset(0 0 0% 0)",
      }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ ...baseRevealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SplitTextReveal({
  lines,
  className,
  delay = 0,
  once = true,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <motion.div
          key={`${line}-${index}`}
          className="overflow-hidden"
          initial={{
            opacity: 0,
            y: 28,
            filter: "blur(10px)",
            clipPath: "inset(0 0 100% 0)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
          }}
          viewport={{ once, margin: "-10% 0px" }}
          transition={{
            ...baseRevealTransition,
            delay: delay + index * 0.08,
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
}: StaggerGroupProps) {
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(8px)",
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.58, ease: MOTION_EASE },
  },
};

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
