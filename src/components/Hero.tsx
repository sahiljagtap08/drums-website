import { Button, Arrow } from "./ui";
import { HeroScene } from "./HeroScene";
import { Reveal } from "./Reveal";
import { CAL_URL } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-14 md:pt-24 md:pb-20 grid md:grid-cols-[1.05fr_1fr] gap-10 items-center">
        <div>
          <Reveal>
            <h1 className="h-mono text-[34px] sm:text-[48px] lg:text-[56px]">
              More <span className="whitespace-nowrap">computer-use</span>{" "}
              <br className="hidden lg:block" />
              training on{" "}
              <br className="hidden lg:block" />
              less hardware
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-[18px] md:text-[20px] leading-relaxed text-ink max-w-[52ch]">
              Drums is virtual computers for training computer-use agents. Many training attempts share one running OS; each keeps its own files, sessions, and state, so the same machine runs far more of them.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={CAL_URL} external>Talk to us <Arrow /></Button>
            <Button href="#how" variant="ghost">How it works</Button>
          </Reveal>
          <Reveal delay={300} className="mt-5 label !text-ink-2">
            Starting with macOS · Linux and Windows next
          </Reveal>
        </div>
        <Reveal delay={150} className="relative">
          <HeroScene />
        </Reveal>
      </div>
    </section>
  );
}
