import { Reveal } from "./Reveal";
import { TextLink } from "./ui";

const cards = [
  { k: "Concurrency", q: "How many independent attempts run at once?", bg: "bg-sky-2", icon: "▦" },
  { k: "Memory", q: "How much extra memory does each attempt need?", bg: "bg-yellow-2", icon: "◫" },
  { k: "Throughput", q: "How many attempts complete per hour?", bg: "bg-teal-2", icon: "⟳" },
  { k: "Correctness", q: "Are attempts isolated and reliably reset?", bg: "bg-coral-2", icon: "✓" },
];

export function Measure() {
  return (
    <section id="measure" className="relative overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <Reveal>
          <h2 className="h-mono text-[32px] md:text-[44px]">What we measure</h2>
          <p className="mt-4 text-[18px] max-w-[62ch] leading-relaxed">
            We evaluate Drums against one virtual machine per attempt, on the same hardware. Four questions, no vibes.
          </p>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.k} delay={i * 80}>
              <div className={`md-card ${c.bg} h-full`}>
                <div className="absolute -top-0.5 -right-0.5 w-11 h-11 bg-paper border-2 border-ink flex items-center justify-center font-mono text-[18px]" aria-hidden>{c.icon}</div>
                <div className="p-6 pt-14">
                  <h3 className="h-mono text-[24px]">{c.k}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed">{c.q}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-10 md-card p-6 md:p-8 md:flex items-center gap-8">
          <div className="shrink-0 h-mono text-[44px] md:text-[56px] leading-none">3–5×</div>
          <div>
            <div className="text-[17px] leading-relaxed">
              <strong className="font-semibold">Our research target:</strong> 3 to 5 times as many concurrent training attempts on the same hardware. This is a target, not an achieved result. We&apos;ll publish measurements as we validate the architecture.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="tag bg-sky-2">macOS · now</span>
              <span className="tag">Linux · planned</span>
              <span className="tag">Windows · planned</span>
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
