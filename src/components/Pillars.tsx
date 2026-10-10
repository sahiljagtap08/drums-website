const items = [
  {
    n: "01",
    title: "The problem",
    body: "Training an agent to use real software means thousands of attempts, each from a known state and isolated from the rest. Today that is a virtual machine per attempt, and memory and compute scale with the count.",
  },
  {
    n: "02",
    title: "The approach",
    body: "Most attempts begin from the same OS, apps, and files. Drums shares those common resources and keeps only the changes each agent makes separate, without giving up isolation or real application behavior.",
  },
  {
    n: "03",
    title: "The target",
    body: "3–5× more concurrent attempts on the same hardware versus conventional VMs. A research target, not an achieved result. We publish measurements as we validate the architecture.",
  },
];

export function Pillars() {
  return (
    <section className="border-b hairline">
      <div className="mx-auto max-w-[1280px] px-5 grid md:grid-cols-3">
        {items.map((it, i) => (
          <div key={it.n} className={`py-10 md:pr-10 ${i > 0 ? "md:pl-10 md:border-l hairline border-t md:border-t-0" : ""}`}>
            <h2 className="text-[20px] font-medium tracking-tight flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-ink-3">{it.n}</span> {it.title}
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
