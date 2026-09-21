"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { instructors } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Instructors() {
  return (
    <section id="instructors" className="bg-background py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Instructors"
          title="Learn from people who do the work"
          description="Our instructors are practitioners first — actively working in the fields they teach."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map(instructor => (
            <StaggerItem key={instructor.name}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                  {instructor.initials}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-primary">{instructor.role}</p>
                </div>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <p>{instructor.expertise}</p>
                  <p>{instructor.experience}</p>
                </div>
                <a
                  href="#"
                  aria-label={`${instructor.name} on LinkedIn`}
                  className="mt-1 flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
