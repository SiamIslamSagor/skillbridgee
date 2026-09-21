import { Instructors } from "@/components/sections/instructors";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Instructors",
  description: "Meet the practitioners and mentors who teach at SkillBridge.",
};

export default function InstructorsPage() {
  return (
    <PageShell>
      <section className="bg-background pb-10 pt-36 sm:pb-14 sm:pt-44">
        <Container>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The people behind the practice
          </span>
          <h1 className="mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.03] tracking-tight text-foreground">
            Learn from people who do the work.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our instructors bring current industry context, honest feedback, and
            the perspective that turns a lesson into a career advantage.
          </p>
        </Container>
      </section>
      <Instructors />
      <Testimonials />
      <CTA />
    </PageShell>
  );
}
