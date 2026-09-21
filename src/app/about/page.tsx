import { Experience } from "@/components/sections/experience";
import { Process } from "@/components/sections/process";
import { Results } from "@/components/sections/results";
import { CTA } from "@/components/sections/cta";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "About SkillBridge",
  description:
    "Learn how SkillBridge turns ambition into practical skills and career momentum.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-dark pb-24 pt-36 text-white sm:pb-28 sm:pt-44">
        <Container>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
            About SkillBridge
          </span>
          <h1 className="mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.03] tracking-tight">
            Education should move you somewhere.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65">
            SkillBridge exists to make high-quality, practical education more
            accessible to people ready to build a different future.
          </p>
        </Container>
      </section>
      <Process />
      <Experience />
      <Results />
      <CTA />
    </PageShell>
  );
}
