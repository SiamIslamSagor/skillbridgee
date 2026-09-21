import { resultStats } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCounter } from "@/components/motion/stat-counter";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Results() {
  return (
    <section className="bg-surface py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Numbers"
          title="Progress you can measure"
          description="Our learners leave with more than a certificate. They leave with proof of what they can do next."
          align="center"
        />
        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resultStats.map(stat => (
            <StaggerItem
              key={stat.label}
              className="border-l-2 border-primary/20 px-6 py-2 first:border-primary"
            >
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
