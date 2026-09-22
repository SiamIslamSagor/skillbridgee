import { Testimonials } from "@/components/sections/testimonials";
import { Results } from "@/components/sections/results";
import { CTA } from "@/components/sections/cta";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Success Stories",
  description:
    "See how SkillBridge graduates turn practical learning into new opportunities.",
};

export default function SuccessStoriesPage() {
  return (
    <PageShell>
      <section className="bg-background pb-20 pt-36 sm:pb-24 sm:pt-44">
        <Container>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Student success stories
          </span>
          <h1 className="mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.03] tracking-tight text-foreground">
            New skills are powerful when they open new doors.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            These are a few of the learners who used SkillBridge to move from
            possibility to progress.
          </p>
        </Container>
      </section>
      <Testimonials />
      <Results />
      <CTA />
    </PageShell>
  );
}
