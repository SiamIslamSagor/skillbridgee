import { Programs } from "@/components/sections/programs";
import { PageShell } from "@/components/layout/page-shell";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";

export const metadata = {
  title: "Programs",
  description:
    "Explore SkillBridge programs built around practical, job-ready skills.",
};

export default function ProgramsPage() {
  return (
    <PageShell>
      <div className="pt-16">
        <Programs />
      </div>
      <FAQ />
      <CTA />
    </PageShell>
  );
}
