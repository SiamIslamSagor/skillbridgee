"use client";

import { motion } from "motion/react";
import { Briefcase, Compass, GraduationCap, Users } from "lucide-react";
import { experienceFeatures } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const icons = [Briefcase, GraduationCap, Compass, Users];

export function Experience() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-surface to-background py-24 sm:py-28">
      <Container className="relative">
        <SectionHeading
          eyebrow="Learning Experience"
          title="Learning designed around your career, not a syllabus"
          description="From your first lesson to your first offer, every part of the experience is built to move you forward."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {experienceFeatures.map((feature, index) => {
            const Icon = icons[index % icons.length];
            return (
              <StaggerItem key={feature.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full gap-5 rounded-2xl border border-border bg-surface p-7"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
