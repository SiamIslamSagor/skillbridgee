"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconButton } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = testimonials[index];

  function goTo(nextIndex: number) {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex((nextIndex + testimonials.length) % testimonials.length);
  }

  return (
    <section
      id="success-stories"
      className="relative overflow-hidden bg-dark py-24 text-white sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.18),transparent)]"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Student Success Stories"
          title="Real students. Real career outcomes."
          tone="dark"
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <span
            className="absolute -top-6 left-0 text-primary/30"
            aria-hidden="true"
          >
            <Quote className="size-16" />
          </span>

          <div className="relative min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={active.name}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col gap-6 text-center"
              >
                <blockquote className="text-balance text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-snug text-white">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col items-center gap-1">
                  <span className="text-sm font-semibold text-white">
                    {active.name}
                  </span>
                  <span className="text-sm text-white/60">
                    {active.program}
                  </span>
                  <span className="text-xs text-primary/80">
                    {active.outcome}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <IconButton
              variant="outline"
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
              className="size-10 border-white/15 text-white/70 hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </IconButton>

            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => goTo(dotIndex)}
                  aria-label={`Go to testimonial ${dotIndex + 1}`}
                  aria-current={dotIndex === index}
                  className={
                    dotIndex === index
                      ? "h-2 w-6 rounded-full bg-primary transition-all"
                      : "h-2 w-2 rounded-full bg-white/25 transition-all hover:bg-white/40"
                  }
                />
              ))}
            </div>

            <IconButton
              variant="outline"
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
              className="size-10 border-white/15 text-white/70 hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
