import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact",
  description:
    "Talk with a SkillBridge advisor about your learning goals and next program.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="bg-background pb-24 pt-36 sm:pb-28 sm:pt-44">
        <Container className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Start a conversation
            </span>
            <h1 className="mt-5 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.03] tracking-tight text-foreground">
              Your next chapter starts with a question.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Tell us what you want to learn, where you want to go, and what is
              getting in the way. An advisor will help you find the right
              starting point.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-7">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Talk to an advisor
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              hello@skillbridge.example
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We typically respond within one business day.
            </p>
            <Button href="mailto:hello@skillbridge.example" className="mt-6">
              Send an email
            </Button>
          </div>
        </Container>
      </section>
      <FAQ />
      <CTA />
    </PageShell>
  );
}
