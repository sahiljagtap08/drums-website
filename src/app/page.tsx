import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { RedBand } from "@/components/RedBand";
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
        <RedBand />
        <Topology />
        <Pillars />
        <Teams />
        <Measure />
        <Founders />
        <Contact />
      </main>
    </>
  );
}
