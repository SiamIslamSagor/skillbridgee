import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { programs } from "@/lib/data";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";

export function generateStaticParams() {
  return programs.map(program => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find(item => item.slug === slug);
  if (!program) return { title: "Program Not Found" };
  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find(item => item.slug === slug);
  if (!program) notFound();

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-dark pb-24 pt-36 text-white sm:pb-28 sm:pt-44">
        <div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary/90">
            {program.category}
          </span>
          <h1 className="mt-6 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.03] tracking-tight">
            {program.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65">
            {program.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/60">
            <span>{program.duration}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{program.level}</span>
          </div>
          <div className="mt-10">
            <Button href="/contact" variant="light" size="lg" showArrow>
              Talk to an Advisor
            </Button>
          </div>
        </Container>
      </section>
      <section className="bg-background py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What you will build
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              A clear path from first lesson to confident practice.
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              "A mentor-led learning plan",
              "Portfolio-ready practical projects",
              "Feedback on the work that matters",
              "Career support for your next move",
            ].map(item => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-border py-4 text-base text-muted-foreground"
              >
                <CheckCircle2
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{item}</span>
                <ArrowRight
                  className="ml-auto size-4 text-muted-foreground/50"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </PageShell>
  );
}
