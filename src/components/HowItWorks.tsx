"use client";
import { useState } from "react";
import { Accordion, type Item } from "./Accordion";
import { Reveal } from "./Reveal";
import { Cloud } from "./ui";

const INK = "#383838";
const items: Item[] = [
  { title: "Share what's identical", body: "Every attempt loads the same operating system, the same applications, and the same starting state. Drums loads them once and lets every attempt use them." },
  { title: "Isolate what's different", body: "Each attempt gets its own files, browser sessions, and application state. Agents can take different actions without affecting one another." },
  { title: "Reset in an instant", body: "When an attempt ends, its changes are dropped and the next one starts from the shared state. No reboot, no re-download." },
  { title: "More attempts per machine", body: "Our target is 3 to 5 times as many concurrent training attempts on the same hardware versus one virtual machine per attempt. A target, not a result yet. We publish numbers as we validate." },
];

const lanes = [
  { x: 90, label: "ATTEMPT 01", fill: "#ceebff", line: "#2ba5ff" },
  { x: 250, label: "ATTEMPT 02", fill: "#fff8b0", line: "#ebcd00" },
  { x: 410, label: "ATTEMPT 03", fill: "#ffdcbd", line: "#ff9538" },
  { x: 570, label: "AGENT FLEET", fill: "#b0fff4", line: "#16aa98" },
];

function Diagram({ active }: { active: number }) {
  return (
    <svg viewBox="0 0 660 470" className="w-full h-auto" role="img" aria-label="Four independent attempts converge into one shared running OS">
      {lanes.map((l, i) => (
        <g key={l.label}>
          <rect x={l.x - 44} y="20" width="88" height="22" fill={l.fill} stroke={INK} strokeWidth="1.5" />
          <text x={l.x} y="35" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={INK}>{l.label}</text>
          {/* small drum per lane */}
          <g className="bob" style={{ ["--d" as string]: `${i * 0.4}s` }}>
            <path d={`M${l.x - 16},62 v16 a16,7 0 0 0 32,0 v-16`} fill={l.fill} stroke={INK} strokeWidth="1.5" />
            <ellipse cx={l.x} cy="62" rx="16" ry="7" fill="#fff" stroke={INK} strokeWidth="1.5" />
            <circle cx={l.x - 5} cy="72" r="1.6" fill={INK} /><circle cx={l.x + 5} cy="72" r="1.6" fill={INK} />
          </g>
          {/* own-state pill */}
          <rect x={l.x - 40} y="100" width="80" height="20" fill={INK} />
          <text x={l.x} y="114" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#fff">OWN STATE</text>
          {/* lane line curving into the shared drum */}
          <path d={`M${l.x} 120 V 180 C ${l.x} 230, 330 220, 330 270`} fill="none" stroke={l.line} strokeWidth="5" strokeLinecap="round" opacity={active === 1 ? 1 : 0.85} />
          <path d={`M${l.x} 120 V 180 C ${l.x} 230, 330 220, 330 270`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" className="flow" />
        </g>
      ))}
      {/* shared drum in a glass */}
      <g className={active === 2 ? "bob" : ""}>
        <ellipse cx="330" cy="350" rx="90" ry="34" fill="#ceebff" stroke={INK} strokeWidth="1.5" opacity=".6" />
        <path d="M240 290 v60 a90,34 0 0 0 180,0 v-60" fill="#ceebff" stroke={INK} strokeWidth="1.5" opacity=".5" />
        <ellipse cx="330" cy="290" rx="90" ry="34" fill="#e6f4ff" stroke={INK} strokeWidth="1.5" opacity=".7" />
        <path d="M292 318 v26 a38,15 0 0 0 76,0 v-26" fill="#ffdcbd" stroke={INK} strokeWidth="2" />
        <ellipse cx="330" cy="318" rx="38" ry="15" fill="#ffe9d6" stroke={INK} strokeWidth="2" />
        <path d="M292 298 v26 a38,15 0 0 0 76,0 v-26" fill="#ff9538" stroke={INK} strokeWidth="2" />
        <ellipse cx="330" cy="298" rx="38" ry="15" fill="#ffb570" stroke={INK} strokeWidth="2" />
        <path d="M330 298 h20 v14 h-20 z" fill={INK} />
        <circle cx="320" cy="306" r="2.4" fill={INK} /><circle cx="340" cy="306" r="2.4" fill={INK} />
      </g>
      {/* base card */}
      <g transform="translate(90 396)">
        <rect x="6" y="6" width="480" height="58" fill={INK} />
        <rect width="480" height="58" fill="#f4efea" stroke={INK} strokeWidth="2" />
        <rect x="16" y="12" width="112" height="20" fill="#ceebff" stroke={INK} strokeWidth="1.5" />
        <text x="72" y="26" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={INK}>SHARED STATE</text>
        <text x="16" y="48" fontFamily="var(--font-mono)" fontSize="10.5" fill="#575757">OPERATING SYSTEM · APPLICATIONS · STARTING FILES · LOADED ONCE</text>
      </g>
    </svg>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section id="how" className="relative bg-sky-3 border-y-2 border-ink overflow-hidden">
      <Cloud className="absolute w-[220px] -top-4 right-[6%] drift" />
      <Cloud className="absolute w-[180px] bottom-6 left-[2%] drift" flip />
      <div className="relative mx-auto max-w-[1240px] px-5 py-16 md:py-24">
        <Reveal>
          <h2 className="h-mono text-[32px] md:text-[44px]">One OS. Many attempts.</h2>
          <p className="mt-4 text-[18px] max-w-[60ch] leading-relaxed">
            Today, researchers run a separate virtual computer for every attempt, even though each one loads the same OS, applications, and starting state. Drums shares the identical parts and isolates the rest.
          </p>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-[400px_1fr] gap-10 items-start">
          <Reveal delay={100}><Accordion items={items} onChange={setActive} /></Reveal>
          <Reveal delay={200}><Diagram active={active} /></Reveal>
        </div>
      </div>
    </section>
  );
}
