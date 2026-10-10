"use client";
import { useState } from "react";
import { Accordion, type Item } from "./Accordion";
import { Reveal } from "./Reveal";
import { Cloud } from "./ui";
import { Drum } from "./Mark";
import { AppleMark, LinuxMark, WindowsMark } from "./icons";

const INK = "#383838";
const items: Item[] = [
  { title: "Share what's identical", body: "The operating system, applications, and starting files are loaded once and mapped into every attempt." },
  { title: "Isolate what's different", body: "Each attempt gets its own files, browser sessions, and application state. Agents can take different actions without affecting one another." },
  { title: "Reset in an instant", body: "When an attempt ends, its changes are dropped and the next one starts from the shared state. No reboot, no re-download." },
  { title: "More attempts per machine", body: "Shared pages are loaded once; each attempt only pays memory for what it changes. That delta, not the full OS image, sets how many attempts fit on one machine." },
];

/* ---------- isometric slab ---------- */
const W = 250, D = 125, H = 34; // top rhombus width/depth, extrusion height
function Slab({ cx, cy, top, left, right, l1, l2, text = "#fff", dim, onHover, idx }: { cx: number; cy: number; top: string; left: string; right: string; l1: string; l2: string; text?: string; dim: boolean; onHover: (i: number | null) => void; idx: number }) {
  const T = `${cx},${cy - D / 2}`, R = `${cx + W / 2},${cy}`, B = `${cx},${cy + D / 2}`, L = `${cx - W / 2},${cy}`;
  const Bh = `${cx},${cy + D / 2 + H}`, Lh = `${cx - W / 2},${cy + H}`, Rh = `${cx + W / 2},${cy + H}`;
  return (
    <g style={{ transition: "transform 200ms ease-in-out", transform: dim ? "none" : "translateY(-3px)", cursor: "default" }} onMouseEnter={() => onHover(idx)} onMouseLeave={() => onHover(null)}>
      <polygon points={`${L} ${B} ${Bh} ${Lh}`} fill={left} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <polygon points={`${B} ${R} ${Rh} ${Bh}`} fill={right} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <polygon points={`${T} ${R} ${B} ${L}`} fill={top} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {/* labels sit on the two front faces, skewed to match them */}
      <text transform={`translate(${cx - W / 2 + 14} ${cy + 22}) skewY(26.57)`} fontFamily="var(--font-mono)" fontSize="12.5" fill={text} letterSpacing="0.06em">{l1}</text>
      <text transform={`translate(${cx + 14} ${cy + D / 2 + 22}) skewY(-26.57)`} fontFamily="var(--font-mono)" fontSize="12.5" fill={text} letterSpacing="0.06em">{l2}</text>
    </g>
  );
}

/* ---------- annotation card ---------- */
function Card({ x, y, w, h, fill = "#fff", raised, idx, onHover, children }: { x: number; y: number; w: number; h: number; fill?: string; raised: boolean; idx: number | null; onHover: (i: number | null) => void; children: React.ReactNode }) {
  return (
    <g style={{ transition: "transform 200ms ease-in-out", transform: raised ? "translate(3px,-3px)" : "none", cursor: "default" }} onMouseEnter={() => onHover(idx)} onMouseLeave={() => onHover(null)}>
      <rect x={x - 5} y={y + 5} width={w} height={h} fill={INK} style={{ opacity: raised ? 1 : 0, transition: "opacity 200ms ease-in-out" }} />
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={INK} strokeWidth="2" />
      <g transform={`translate(${x} ${y})`}>{children}</g>
    </g>
  );
}
const Label = ({ x, y, children }: { x: number; y: number; children: string }) => (
  <text x={x} y={y} fontFamily="var(--font-mono)" fontSize="12" fill={INK} letterSpacing="0.04em">{children}</text>
);
const Body = ({ x, y, lines }: { x: number; y: number; lines: string[] }) => (
  <text x={x} y={y} fontFamily="var(--font-sans)" fontSize="12.5" fill="#575757">
    {lines.map((l, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : 16}>{l}</tspan>)}
  </text>
);

const ATT = [
  { a: "#2ba5ff", b: "#1673c7", chip: "#ceebff", n: "01" },
  { a: "#16aa98", b: "#0d7a6d", chip: "#b0fff4", n: "02" },
  { a: "#ff7169", b: "#c94a43", chip: "#ffcbc8", n: "03" },
  { a: "#ebcd00", b: "#b39b00", chip: "#fff8b0", n: "04" },
];

function Diagram({ active: selected, onHover }: { active: number; onHover: (i: number | null) => void }) {
  const active = selected;
  const cx = 390;
  const dark = { top: "#5c5c5c", left: "#383838", right: "#2b2b2b" };
  return (
    <svg viewBox="0 0 780 600" className="w-full h-auto" role="img" aria-label="Isometric stack: a shared macOS, applications and starting files loaded once, with per-attempt state on top">
      {/* connectors, solid and thin */}
      <g fill="none" stroke={INK} strokeWidth="1.5">
        <path d="M256 160 C 300 160, 290 230, 330 240" />
        <path d="M232 470 C 280 470, 270 420, 300 410" />
        <path d="M540 130 C 500 130, 500 215, 452 235" />
        <path d="M530 430 C 500 430, 500 360, 470 330" />
      </g>

      {/* the stack, bottom to top */}
      <Slab cx={cx} cy={480} {...dark} idx={0} onHover={onHover} l1="SHARED OS" l2="MACOS" dim={active !== 0} />
      <Slab cx={cx} cy={405} {...dark} idx={0} onHover={onHover} l1="APPLICATIONS" l2="LOADED ONCE" dim={active !== 0} />
      <Slab cx={cx} cy={330} {...dark} idx={0} onHover={onHover} l1="STARTING" l2="FILES" dim={active !== 0} />
      <Slab cx={cx} cy={255} top="#ffde00" left="#e3c600" right="#c9af00" text={INK} idx={1} onHover={onHover} l1="ATTEMPT" l2="STATE" dim={active !== 1} />
      {/* attempts live on the top face */}
      {ATT.map((t, i) => {
        const px = cx - 60 + i * 40, py = 255 + 4;
        return (
          <g key={t.n} className="bob" style={{ ["--d" as string]: `${i * 0.35}s` }}>
            <Drum x={px - 16} y={py - 31} w={32} a={t.a} b={t.b} />
          </g>
        );
      })}

      {/* attempts card */}
      <Card x={20} y={110} w={236} h={118} raised={active === 1} idx={1} onHover={onHover}>
        <Label x={16} y={24}>ATTEMPTS</Label>
        {ATT.map((t, i) => (
          <g key={t.n} transform={`translate(${16 + i * 48} 36)`}>
            <rect width="42" height="42" fill={t.chip} stroke={INK} strokeWidth="1.5" />
            <Drum x={9} y={10} w={24} a={t.a} b={t.b} />
          </g>
        ))}
        <Body x={16} y={98} lines={["Own files, sessions, and state.", "No attempt sees another."]} />
      </Card>

      {/* reset card */}
      <Card x={30} y={420} w={202} h={96} fill="#ffde00" raised={active === 2} idx={2} onHover={onHover}>
        <Label x={16} y={24}>RESET</Label>
        <Body x={16} y={46} lines={["Drop the delta, start the next", "attempt from shared state.", "No reboot. No re-download."]} />
      </Card>

      {/* runs-on card */}
      <Card x={540} y={90} w={210} h={82} raised={active === 4} idx={4} onHover={onHover}>
        <Label x={16} y={24}>RUNS ON</Label>
        <g transform="translate(16 36)">
          <rect width="80" height="30" fill="#ceebff" stroke={INK} strokeWidth="1.5" />
          <foreignObject x="9" y="7" width="16" height="16"><AppleMark className="w-4 h-4 text-ink" /></foreignObject>
          <text x="31" y="20" fontFamily="var(--font-mono)" fontSize="11" fill={INK}>MACOS</text>
        </g>
        <g transform="translate(104 36)" opacity="0.55">
          <rect width="36" height="30" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <foreignObject x="10" y="7" width="16" height="16"><LinuxMark className="w-4 h-4 text-ink" /></foreignObject>
        </g>
        <g transform="translate(148 36)" opacity="0.55">
          <rect width="36" height="30" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <foreignObject x="10" y="7" width="16" height="16"><WindowsMark className="w-4 h-4 text-ink" /></foreignObject>
        </g>
      </Card>

      {/* scale card */}
      <Card x={530} y={330} w={220} h={200} raised={active === 3} idx={3} onHover={onHover}>
        <Label x={16} y={24}>ONE MACHINE</Label>
        <Body x={16} y={42} lines={["Each pays only for its delta"]} />
        {ATT.map((t, i) => (
          <g key={t.n} transform={`translate(16 ${56 + i * 30})`}>
            <rect width={100 + i * 24} height="24" fill={t.chip} stroke={INK} strokeWidth="1.5" />
            <Drum x={7} y={5} w={14} a={t.a} b={t.b} />
            <text x="28" y="16" fontFamily="var(--font-mono)" fontSize="10.5" fill={INK}>ATTEMPT {t.n}</text>
          </g>
        ))}
        <text x="16" y="190" fontFamily="var(--font-mono)" fontSize="10.5" fill="#575757">+ MANY MORE · SAME HARDWARE</text>
      </Card>
    </svg>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="how" className="relative bg-sky-3 border-y-2 border-ink overflow-hidden">
      <Cloud className="hidden md:block absolute w-[220px] -top-4 right-[6%] drift" />
      <Cloud className="absolute w-[180px] bottom-6 left-[2%] drift" flip />
      <div className="relative mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <Reveal>
          <h2 className="h-mono text-[32px] md:text-[44px]">One OS. Many attempts.</h2>
          <p className="mt-4 text-[18px] max-w-[60ch] leading-relaxed">
            Agents learn by practicing: millions of attempts, each from the same starting state. Today every attempt gets its own virtual machine, so the same OS, apps, and files load millions of times. Drums loads them once and isolates only what each attempt changes.
          </p>
        </Reveal>
        <div className="mt-10 grid lg:grid-cols-[380px_1fr] gap-10 items-start">
          <Reveal delay={100}><Accordion items={items} onChange={setActive} /></Reveal>
          <Reveal delay={200}><Diagram active={hover ?? active} onHover={setHover} /></Reveal>
        </div>
      </div>
    </section>
  );
}
