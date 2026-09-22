import { CTA } from "@/components/sections/cta";
import { Experience } from "@/components/sections/experience";
import { FAQ } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Instructors } from "@/components/sections/instructors";
import { Process } from "@/components/sections/process";
import { Programs } from "@/components/sections/programs";
import { Results } from "@/components/sections/results";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Programs />
        <Process />
        <Experience />
        <Instructors />
        <Testimonials />
        <Results />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
