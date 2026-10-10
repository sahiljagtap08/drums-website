import { Reveal } from "./Reveal";
import { TextLink } from "./ui";
import { IconGrid, IconChip, IconGauge, IconShield, OsTag } from "./icons";

const cards = [
  { k: "Concurrency", q: "How many independent attempts run at once?", bg: "bg-sky-2", Icon: IconGrid },
  { k: "Memory", q: "How much extra memory does each attempt need?", bg: "bg-yellow-2", Icon: IconChip },
  { k: "Throughput", q: "How many attempts complete per hour?", bg: "bg-teal-2", Icon: IconGauge },
  { k: "Correctness", q: "Are attempts isolated and reliably reset?", bg: "bg-coral-2", Icon: IconShield },
];

export function Measure() {
  return (
    <section id="measure" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <Reveal>
          <h2 className="h-mono text-[32px] md:text-[44px]">What we measure</h2>
          <p className="mt-4 text-[18px] max-w-[62ch] leading-relaxed">
            We benchmark Drums against one virtual machine per attempt, on the same hardware. Four questions, no vibes.
          </p>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.k} delay={i * 80}>
              <div className={`md-card ${c.bg} h-full`}>
                <div className="absolute -top-0.5 -right-0.5 w-11 h-11 bg-paper border-2 border-ink flex items-center justify-center" aria-hidden><c.Icon className="w-6 h-6" /></div>
                <div className="p-6 pt-14">
                  <h3 className="h-mono text-[24px]">{c.k}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed">{c.q}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-10">
          <div className="md-card p-6 md:p-8 md:flex items-center gap-8">
          <div className="shrink-0 h-mono text-[44px] md:text-[56px] leading-none">3–5×</div>
          <div>
            <div className="text-[17px] leading-relaxed">
              <strong className="font-semibold">Our target:</strong> 3 to 5 times as many concurrent training attempts on the same hardware. Benchmarks publish as they land. Book a call for current numbers.
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <OsTag os="macos" note="now" active />
              <OsTag os="linux" note="next" />
              <OsTag os="windows" note="next" />
            </div>
          </div>
          </div>
        </Reveal>
        <Reveal delay={250} className="mt-8">
          <TextLink href="#contact">Running these workloads? Compare notes with us</TextLink>
        </Reveal>
      </div>
    </section>
  );
}
