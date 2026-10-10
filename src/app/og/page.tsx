import type { Metadata } from "next";
import { Mark, Drum } from "@/components/Mark";
import { APPLE_PATH } from "@/components/icons";

// Source for public/og.png (1200×630). Regenerate with a 1200×630 headless screenshot of /og.
export const metadata: Metadata = { title: "Drums", robots: { index: false, follow: false } };

const ATT = [
  { a: "#2ba5ff", b: "#1673c7" }, { a: "#16aa98", b: "#0d7a6d" }, { a: "#ff7169", b: "#c94a43" }, { a: "#ebcd00", b: "#b39b00" },
];

export default function OG() {
  return (
    <div className="w-[1200px] h-[630px] bg-cream relative overflow-hidden" style={{ fontFamily: "var(--font-sans)" }}>
      <div className="absolute left-[72px] top-[64px] flex items-center gap-3">
        <Mark className="w-12 h-12" />
        <span className="font-semibold text-[34px] tracking-tight">Drums</span>
      </div>
      <h1 className="absolute left-[72px] top-[200px] h-mono text-[64px] leading-[1.08] w-[700px] whitespace-nowrap">
        More computer-use<br />training on<br />less hardware
      </h1>
      <p className="absolute left-[72px] top-[500px] label !text-[18px] !text-ink-2">Starting with macOS · drums.run</p>
      <svg viewBox="0 0 420 420" className="absolute right-[72px] top-[80px] w-[440px] h-[440px]">
        <Drum x={60} y={70} w={300} a="#413636" b="#0A0A0A" />
        <circle cx={330} cy={104} r={30} fill="#fff" stroke="#383838" strokeWidth="3" />
        <path d={APPLE_PATH} fill="#383838" transform={`translate(${330 - 18} ${104 - 18}) scale(1.5)`} />
        {ATT.map((t, i) => (
          <Drum key={i} x={20 + i * 100} y={352} w={56} a={t.a} b={t.b} />
        ))}
      </svg>
    </div>
  );
}
