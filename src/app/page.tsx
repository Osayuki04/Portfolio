import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Mexo } from "@/components/Mexo";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Content } from "@/components/Content";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";
import { Support } from "@/components/Support";
import { Footer } from "@/components/Footer";
import { MobileResumeFab } from "@/components/ui/MobileResumeFab";

export default function Home() {
  return (
    <>
      <Navbar />
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to content
      </a>
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Content />
        <TechStack />
        <Contact />
        <Support />
      </main>
      <Footer />
      <MobileResumeFab />
    </>
  );
}
