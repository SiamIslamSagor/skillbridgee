"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type PointerEvent, useRef } from "react";
import { MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 });

  const orbOneX = springX;
  const orbOneY = springY;
  const orbTwoX = useTransform(springX, v => v * -0.6);
  const orbTwoY = useTransform(springY, v => v * -0.6);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType === "touch") return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 60;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 60;
    pointerX.set(offsetX);
    pointerY.set(offsetY);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden bg-background pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl"
        style={{ x: orbOneX, y: orbOneY }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute top-40 left-[-10%] h-[24rem] w-[24rem] rounded-full bg-secondary/20 blur-3xl"
        style={{ x: orbTwoX, y: orbTwoY }}
        aria-hidden="true"
      />

      <Container className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col items-start gap-7">
          <TextReveal
            delay={0.05}
            className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Build Skills. Build Your Future.
          </TextReveal>

          <TextReveal delay={0.1} className="w-full">
            <h1 className="text-balance text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
              Where ambition
              <br />
              meets <span className="text-primary">opportunity.</span>
            </h1>
          </TextReveal>

          <TextReveal
            delay={0.18}
            className="max-w-xl text-balance text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-muted-foreground"
          >
            SkillBridge helps ambitious learners gain practical, job-ready
            skills through mentor-led programs, real-world projects, and
            dedicated career support.
          </TextReveal>

          <TextReveal
            delay={0.24}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="/programs" size="lg" showArrow className="text-white">
              Explore Programs
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Talk to an Advisor
            </Button>
          </TextReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:mx-0"
        >
          <HeroVisual pointerX={springX} pointerY={springY} />
        </motion.div>
      </Container>
    </section>
  );
}

function HeroVisual({
  pointerX,
  pointerY,
}: {
  pointerX: ReturnType<typeof useSpring>;
  pointerY: ReturnType<typeof useSpring>;
}) {
  const rotateX = useTransform(pointerY, v => v * 0.15);
  const rotateY = useTransform(pointerX, v => v * -0.15);

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative rounded-2xl border border-border bg-surface p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Your Learning Path
              </p>
              <p className="text-xs text-muted-foreground">
                Web Development Track
              </p>
            </div>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            68%
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {[
            { label: "Fundamentals", done: true },
            { label: "React & Component Design", done: true },
            { label: "APIs & Data Fetching", done: false },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span
                className={
                  item.done
                    ? "size-2.5 rounded-full bg-primary"
                    : "size-2.5 rounded-full border-2 border-border"
                }
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        className="absolute -bottom-8 -left-10 hidden w-52 rounded-xl border border-border bg-surface p-4 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.4)] sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-accent/15 text-accent">
            <TrendingUp className="size-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-semibold text-foreground">
            Career progress
          </p>
        </div>
        <p className="mt-2 text-2xl font-semibold text-foreground">+42%</p>
        <p className="text-xs text-muted-foreground">
          Salary growth after graduation
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
        className="absolute -right-6 -top-8 hidden items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.4)] sm:flex"
      >
        <MessageCircle className="size-4 text-primary" aria-hidden="true" />
        <p className="text-xs font-medium text-foreground">
          Mentor feedback ready
        </p>
      </motion.div>
    </div>
  );
}
