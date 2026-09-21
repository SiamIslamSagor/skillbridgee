import { processSteps } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Process() {
  return (
    <section
      id="why-skillbridge"
      className="relative overflow-hidden bg-dark py-24 text-white sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why SkillBridge"
          title="A teaching method built for real outcomes"
          description="We combine structured curriculum with hands-on practice and mentorship, so skills stick and translate into results."
          tone="dark"
        />

        <StaggerGroup className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map(step => (
            <StaggerItem key={step.index}>
              <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <span className="text-sm font-semibold text-primary/80">
                  {step.index}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
