import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-dark py-24 text-white sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
            Your next chapter
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
            Start learning toward the life you want.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-balance leading-relaxed text-white/65">
            Take the first step with a free conversation about your goals, your
            options, and the program that fits your future.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8">
            <Button
              href="mailto:hello@skillbridge.example"
              variant="light"
              size="lg"
              showArrow
            >
              Talk to an Advisor
            </Button>
          </div>
        </Reveal>
        <a
          href="mailto:hello@skillbridge.example"
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
        >
          hello@skillbridge.example{" "}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
