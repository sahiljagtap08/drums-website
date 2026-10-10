import { Reveal } from "./Reveal";

const steps = [
  { n: "01", t: "Agents learn by practicing", b: "Browsing websites, editing documents, working across apps. Millions of attempts, each starting from the same conditions." },
  { n: "02", t: "Each attempt needs its own computer", b: "Attempts must not interfere with one another, so today each one gets a separate virtual machine." },
  { n: "03", t: "That duplicates everything", b: "The same OS, apps, and starting state, loaded again and again. Memory and compute scale with the attempt count, and so does the bill." },
];

export function Problem() {
  return (
    <section className="relative border-t-2 border-ink bg-cream-2 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:py-20">
        <Reveal><h2 className="h-mono text-[28px] md:text-[36px]">Why training computer-use agents is expensive</h2></Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="md-card p-6 h-full">
                <div className="label !text-ink-2">{s.n}</div>
                <h3 className="h-mono text-[20px] mt-3">{s.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
