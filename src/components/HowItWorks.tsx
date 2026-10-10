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

/* ---------- topics: each card is threaded to one slab; hover/select colors both ---------- */
const TOPIC = [
  { fill: "#ff9538", side: "#c76f1f", chip: "#ffdcbd" },   // 0 shared OS
  { fill: "#ffde00", side: "#c9af00", chip: "#fff8b0" },   // 1 attempt state
  { fill: "#ff7169", side: "#c94a43", chip: "#ffcbc8" },   // 2 starting files / reset
  { fill: "#16aa98", side: "#0d7a6d", chip: "#b0fff4" },   // 3 applications / one machine
];
const DARK = { top: "#5c5c5c", left: "#383838", right: "#2b2b2b" };

/* rounded polygon path */
function rounded(pts: [number, number][], r: number) {
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[(i - 1 + n) % n], [cx, cy] = pts[i], [nx, ny] = pts[(i + 1) % n];
    const v1 = [px - cx, py - cy], v2 = [nx - cx, ny - cy];
    const l1 = Math.hypot(...v1), l2 = Math.hypot(...v2);
    const a = [cx + (v1[0] / l1) * r, cy + (v1[1] / l1) * r], b = [cx + (v2[0] / l2) * r, cy + (v2[1] / l2) * r];
    d += (i === 0 ? `M${a[0]},${a[1]}` : `L${a[0]},${a[1]}`) + ` Q${cx},${cy} ${b[0]},${b[1]}`;
  }
  return d + "Z";
}

/* ---------- isometric slab ---------- */
const W = 250, D = 125, H = 34;
function Slab({ cx, cy, l1, l2, on, topic, onHover }: { cx: number; cy: number; l1: string; l2: string; on: boolean; topic: number; onHover: (i: number | null) => void }) {
  const T: [number, number] = [cx, cy - D / 2], R: [number, number] = [cx + W / 2, cy], B: [number, number] = [cx, cy + D / 2], L: [number, number] = [cx - W / 2, cy];
  const Bh: [number, number] = [cx, cy + D / 2 + H], Lh: [number, number] = [cx - W / 2, cy + H], Rh: [number, number] = [cx + W / 2, cy + H];
  const c = TOPIC[topic];
  const tr = "fill 200ms ease-in-out, transform 200ms ease-in-out";
  const sil = rounded([L, T, R, Rh, Bh, Lh], 10);
  const id = `slab-${topic}-${cy}`;
  return (
    <g style={{ transition: tr, transform: on ? "translateY(-4px)" : "none", cursor: "default" }} onMouseEnter={() => onHover(topic)} onMouseLeave={() => onHover(null)}>
      <defs><clipPath id={id}><path d={sil} /></clipPath></defs>
      {/* silhouette = both side faces; right half shaded inside the clip so edges stay clean */}
      <path d={sil} fill={on ? c.side : DARK.left} style={{ transition: tr }} />
      <rect x={cx} y={cy} width={W} height={D + H} fill="#000" opacity="0.22" clipPath={`url(#${id})`} />
      <path d={`M${B[0]},${B[1]} L${Bh[0]},${Bh[1]}`} stroke={INK} strokeWidth="2" clipPath={`url(#${id})`} />
      <path d={sil} fill="none" stroke={INK} strokeWidth="2" />
      {/* top face */}
      <path d={rounded([T, R, B, L], 10)} fill={on ? c.fill : DARK.top} stroke={INK} strokeWidth="2" style={{ transition: tr }} />
      <text transform={`translate(${cx - W / 2 + 20} ${cy + 33}) skewY(26.57)`} fontFamily="var(--font-mono)" fontSize="12" fill="#fff" letterSpacing="0.06em">{l1}</text>
      <text transform={`translate(${cx + 16} ${cy + D / 2 + 17}) skewY(-26.57)`} fontFamily="var(--font-mono)" fontSize="12" fill="#fff" letterSpacing="0.06em">{l2}</text>
    </g>
  );
}

/* ---------- annotation card ---------- */
function Card({ x, y, w, h, on, topic, onHover, children }: { x: number; y: number; w: number; h: number; on: boolean; topic: number; onHover: (i: number | null) => void; children: React.ReactNode }) {
  const c = TOPIC[topic];
  return (
    <g style={{ transition: "transform 200ms ease-in-out", transform: on ? "translate(4px,-4px)" : "none", cursor: "default" }} onMouseEnter={() => onHover(topic)} onMouseLeave={() => onHover(null)}>
      <rect x={x - 6} y={y + 6} width={w} height={h} fill={INK} style={{ opacity: on ? 1 : 0, transition: "opacity 200ms ease-in-out" }} />
      <rect x={x} y={y} width={w} height={h} fill={on ? c.chip : "#fff"} stroke={INK} strokeWidth="2" style={{ transition: "fill 200ms ease-in-out" }} />
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
/* thread from a card to its slab; colored when on */
function Thread({ d, on, topic }: { d: string; on: boolean; topic: number }) {
  return <path d={d} fill="none" stroke={on ? TOPIC[topic].fill : INK} strokeWidth={on ? 3 : 1.5} style={{ transition: "stroke 200ms ease-in-out, stroke-width 200ms ease-in-out" }} />;
}

const ATT = [
  { a: "#2ba5ff", b: "#1673c7", chip: "#ceebff", n: "01" },
  { a: "#16aa98", b: "#0d7a6d", chip: "#b0fff4", n: "02" },
  { a: "#ff7169", b: "#c94a43", chip: "#ffcbc8", n: "03" },
  { a: "#ebcd00", b: "#b39b00", chip: "#fff8b0", n: "04" },
];

function Diagram({ active, onHover }: { active: number; onHover: (i: number | null) => void }) {
  const cx = 390;
  const Y = { os: 480, apps: 405, files: 330, state: 255 };
  const lf = (cy: number) => `${cx - W / 4} ${cy + D / 4 + H / 2}`; // left face midpoint
  const rf = (cy: number) => `${cx + W / 4} ${cy + D / 4 + H / 2}`; // right face midpoint
  return (
    <svg viewBox="0 95 780 490" className="w-full h-auto" role="img" aria-label="Isometric stack: a shared macOS, applications and starting files loaded once, with per-attempt state on top. Each note is linked to one layer.">
      {/* threads: drawn first so slabs and cards sit on top */}
      <Thread topic={1} on={active === 1} d={`M256 180 C 300 180, 290 ${Y.state + 60}, ${lf(Y.state)}`} />
      <Thread topic={2} on={active === 2} d={`M242 456 C 285 456, 280 ${Y.files + 60}, ${lf(Y.files)}`} />
      <Thread topic={3} on={active === 3} d={`M530 210 C 490 210, 500 ${Y.apps + 60}, ${rf(Y.apps)}`} />
      <Thread topic={0} on={active === 0} d={`M540 486 C 500 486, 500 ${Y.os + 60}, ${rf(Y.os)}`} />

      {/* the stack, bottom to top */}
      <Slab cx={cx} cy={Y.os} l1="SHARED OS" l2="MACOS" topic={0} on={active === 0} onHover={onHover} />
      <Slab cx={cx} cy={Y.apps} l1="APPLICATIONS" l2="LOADED ONCE" topic={3} on={active === 3} onHover={onHover} />
      <Slab cx={cx} cy={Y.files} l1="STARTING" l2="FILES" topic={2} on={active === 2} onHover={onHover} />
      <Slab cx={cx} cy={Y.state} l1="ATTEMPT" l2="STATE" topic={1} on={active === 1} onHover={onHover} />
      {ATT.map((t, i) => {
        const px = cx - 60 + i * 40, py = Y.state + 4;
        return (
          <g key={t.n} className="bob" style={{ ["--d" as string]: `${i * 0.35}s`, pointerEvents: "none" }}>
            <Drum x={px - 16} y={py - 31} w={32} a={t.a} b={t.b} />
          </g>
        );
      })}

      {/* attempts → attempt state */}
      <Card x={20} y={110} w={236} h={140} topic={1} on={active === 1} onHover={onHover}>
        <Label x={16} y={24}>ATTEMPTS</Label>
        {ATT.map((t, i) => (
          <g key={t.n} transform={`translate(${16 + i * 48} 36)`}>
            <rect width="42" height="42" fill="#fff" stroke={INK} strokeWidth="1.5" />
            <Drum x={9} y={10} w={24} a={t.a} b={t.b} />
          </g>
        ))}
        <Body x={16} y={104} lines={["Own files, sessions, and state.", "No attempt sees another."]} />
      </Card>

      {/* reset → starting files */}
      <Card x={30} y={400} w={212} h={112} topic={2} on={active === 2} onHover={onHover}>
        <Label x={16} y={24}>RESET</Label>
        <Body x={16} y={50} lines={["Drop the delta, start the next", "attempt from shared state.", "No reboot. No re-download."]} />
      </Card>

      {/* one machine → applications */}
      <Card x={530} y={110} w={224} h={210} topic={3} on={active === 3} onHover={onHover}>
        <Label x={16} y={24}>ONE MACHINE</Label>
        <Body x={16} y={42} lines={["Each pays only for its delta"]} />
        {ATT.map((t, i) => (
          <g key={t.n} transform={`translate(16 ${56 + i * 30})`}>
            <rect width={100 + i * 24} height="24" fill={t.chip} stroke={INK} strokeWidth="1.5" />
            <Drum x={7} y={5} w={14} a={t.a} b={t.b} />
            <text x="28" y="16" fontFamily="var(--font-mono)" fontSize="10.5" fill={INK}>ATTEMPT {t.n}</text>
          </g>
        ))}
        <text x="16" y="196" fontFamily="var(--font-mono)" fontSize="10.5" fill="#575757">+ MANY MORE · SAME HARDWARE</text>
      </Card>

      {/* runs on → shared OS */}
      <Card x={540} y={440} w={214} h={92} topic={0} on={active === 0} onHover={onHover}>
        <Label x={16} y={24}>RUNS ON</Label>
        <g transform="translate(16 40)">
          <rect width="80" height="30" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <foreignObject x="9" y="7" width="16" height="16"><AppleMark className="w-4 h-4 text-ink" /></foreignObject>
          <text x="31" y="20" fontFamily="var(--font-mono)" fontSize="11" fill={INK}>MACOS</text>
        </g>
        <g transform="translate(104 40)" opacity="0.55">
          <rect width="36" height="30" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <foreignObject x="10" y="7" width="16" height="16"><LinuxMark className="w-4 h-4 text-ink" /></foreignObject>
        </g>
        <g transform="translate(148 40)" opacity="0.55">
          <rect width="36" height="30" fill="#fff" stroke={INK} strokeWidth="1.5" />
          <foreignObject x="10" y="7" width="16" height="16"><WindowsMark className="w-4 h-4 text-ink" /></foreignObject>
        </g>
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
        <div className="mt-10 grid lg:grid-cols-[380px_1fr] gap-10 items-center">
          <Reveal delay={100}><Accordion items={items} onChange={setActive} /></Reveal>
          <Reveal delay={200}><Diagram active={hover ?? active} onHover={setHover} /></Reveal>
        </div>
      </div>
    </section>
  );
}
