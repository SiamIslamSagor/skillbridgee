import { trustStats } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { StatCounter } from "@/components/motion/stat-counter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by ambitious learners worldwide
          </p>
        </Reveal>

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {trustStats.map(stat => (
            <StaggerItem
              key={stat.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
