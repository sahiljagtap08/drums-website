const rows = [
  { k: "Concurrency", v: "Independent attempts running at once" },
  { k: "Memory", v: "Additional memory per attempt" },
  { k: "Throughput", v: "Attempts completed per hour" },
  { k: "Correctness", v: "Isolated, and reliably reset" },
  { k: "Reset", v: "Time back to a known state" },
];

export function Measure() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-5 py-20 md:py-28 grid md:grid-cols-[1fr_1.4fr] gap-12">
        <div>
          <div className="label mb-4">The benchmark</div>
          <h2 className="text-[30px] md:text-[36px] leading-[1.05] font-medium tracking-tight max-w-[16ch]">
            More useful training per machine.
          </h2>
          <p className="mt-6 text-[14px] text-white/55 max-w-[38ch] leading-relaxed">
            We evaluate Drums against conventional virtual-machine setups on five measurements, starting on macOS. Linux and Windows planned.
          </p>
        </div>
        <ul className="group">
          {rows.map((r) => (
            <li key={r.k} className="flex items-baseline justify-between border-b border-white/15 py-3 md:py-4 transition-colors group-hover:text-white/25 hover:!text-white">
              <span className="text-[34px] md:text-[48px] font-medium tracking-tight leading-none">{r.k}</span>
              <span className="label !text-current opacity-70 text-right max-w-[22ch]">{r.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
