import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { DrumScene } from "@/components/DrumScene";
import { Lifecycle } from "@/components/Lifecycle";
import { Footer } from "@/components/Footer";
import { Topology } from "@/components/Topology";
import { Pillars } from "@/components/Pillars";
import { Teams } from "@/components/Teams";
import { Measure } from "@/components/Measure";
import { Founders } from "@/components/Founders";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DrumScene />
        <Topology />
        <Pillars />
        <Lifecycle />
        <Teams />
        <Measure />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
