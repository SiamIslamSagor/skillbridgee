import { faqs } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="bg-background py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered clearly"
          description="Still deciding? Here are the details learners ask about most."
        />
        <Accordion items={faqs} />
      </Container>
    </section>
  );
}
