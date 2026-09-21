"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { programs } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Programs() {
  return (
    <section id="programs" className="relative bg-background py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Programs"
          title="Practical programs built around real careers"
          description="Every SkillBridge program is designed with industry input, so what you learn maps directly to what employers need."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map(program => (
            <StaggerItem key={program.slug}>
              <ProgramCard
                slug={program.slug}
                title={program.title}
                description={program.description}
                duration={program.duration}
                level={program.level}
                category={program.category}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

function ProgramCard({
  slug,
  title,
  description,
  duration,
  level,
  category,
}: {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
}) {
  return (
    <motion.a
      href={`/programs/${slug}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors duration-300 hover:border-primary/30"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {category}
          </span>
          <ArrowUpRight
            className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
        <span>{duration}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{level}</span>
      </div>
    </motion.a>
  );
}
