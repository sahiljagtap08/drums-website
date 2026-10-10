const steps = [
  { n: "01", t: "Boot", s: "from shared image" },
  { n: "02", t: "Act", s: "agent drives the UI" },
  { n: "03", t: "Observe", s: "screens · rewards" },
  { n: "04", t: "Score", s: "episode outcome" },
  { n: "05", t: "Reset", s: "discard writes" },
];
const facts = [
  { k: "A01", t: "Real applications", b: "Native macOS apps and browsers, not simulations or stubs." },
  { k: "A02", t: "Independent attempts", b: "Each attempt sees its own filesystem and state, never another's." },
  { k: "A03", t: "Cheap resets", b: "Dropping an attempt's writes returns it to the shared image." },
  { k: "A04", t: "Measured honestly", b: "Published numbers against conventional VMs, as they land." },
];

export function Lifecycle() {
  const w = 1000, cx = (i: number) => 60 + i * 215;
  return (
    <section id="research" className="border-b hairline">
      <div className="mx-auto max-w-[1280px] px-5 grid md:grid-cols-[1fr_380px] gap-8 pt-16 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 bg-ink inline-block" />
            <span className="label !text-ink">Attempt lifecycle</span>
          </div>
          <h2 className="text-[34px] md:text-[48px] leading-[1.02] font-medium tracking-tight max-w-[16ch]">Practice, thousands of times, on one machine.</h2>
        </div>
        <div className="md:pt-12">
          <p className="text-[14.5px] leading-relaxed text-ink-2 max-w-[42ch]">
            Every attempt boots from the same image, runs its episode in real software, and resets by discarding only what it changed.
          </p>
          <a href="#approach" className="label !text-ink border border-ink px-4 py-2.5 inline-block mt-5 hover:bg-neutral-50">How it works ›</a>
        </div>
      </div>
      <div className="bg-mist border-t hairline">
        <div className="mx-auto max-w-[1280px] px-5">
          <div className="flex justify-between py-3 label">
            <span>Fig. 02 — Attempt loop</span>
            <span className="hidden sm:inline">Isolated · Resettable · Measured</span>
          </div>
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${w} 190`} className="w-full min-w-[760px] h-auto block" role="img" aria-label="Boot, act, observe, score, reset, then iterate until the episode budget is spent">
              <g stroke="#e3e3e3" strokeWidth="1">
                {Array.from({ length: 11 }).map((_, i) => <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="190" />)}
              </g>
              <path d={`M${cx(0)} 70 H ${cx(4) + 90}`} stroke="#413636" strokeWidth="1.2" className="flow" fill="none" />
              <path d={`M${cx(4) + 90} 70 V 150 H ${cx(0)} V 70`} stroke="#413636" strokeWidth="1.2" fill="none" className="flow" />
              <circle cx={cx(0)} cy="70" r="3.5" fill="#0a0a0a" />
              <circle cx={cx(4) + 90} cy="70" r="3.5" fill="#0a0a0a" />
              {steps.map((s, i) => (
                <g key={s.n} transform={`translate(${cx(i)} 0)`}>
                  <text x="45" y="44" textAnchor="middle" fontSize="8" letterSpacing="1.5" fill="#8a8a8a" fontFamily="var(--font-mono)">{s.n}</text>
                  <rect x="0" y="54" width="90" height="32" rx="5" fill="#fff" stroke="#0a0a0a" strokeWidth="1.2" />
                  <text x="45" y="75" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing="1" fill="#0a0a0a" fontFamily="var(--font-mono)">{s.t.toUpperCase()}</text>
                  <text x="45" y="106" textAnchor="middle" fontSize="7.5" letterSpacing="1.2" fill="#8a8a8a" fontFamily="var(--font-mono)">{s.s.toUpperCase()}</text>
                </g>
              ))}
              <text x={w / 2} y="170" textAnchor="middle" fontSize="7.5" letterSpacing="1.5" fill="#8a8a8a" fontFamily="var(--font-mono)">ITERATE UNTIL THE EPISODE BUDGET IS SPENT</text>
            </svg>
          </div>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="mx-auto max-w-[1280px] px-5 grid sm:grid-cols-2 md:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.k} className={`py-8 pr-6 ${i > 0 ? "md:pl-6 md:border-l hairline" : ""} ${i % 2 === 1 ? "sm:pl-6 sm:border-l" : ""}`}>
              <div className="label mb-3">{f.k}</div>
              <h3 className="text-[17px] font-medium tracking-tight">{f.t}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{f.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
