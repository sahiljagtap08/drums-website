import { Drum } from "./Mark";

// The hero: one big Drums drum (the shared, running OS) in front of a sun, with four
// small attempt drums around it. All drums are the real logo mark.
const INK = "#383838";
const CX = 280, CY = 290;

type Attempt = { x: number; y: number; a: string; b: string; label: string; chip: string; delay: number };
const attempts: Attempt[] = [
  { x: 60,  y: 150, a: "#2ba5ff", b: "#1673c7", label: "ATTEMPT 01", chip: "#ceebff", delay: 0 },
  { x: 440, y: 140, a: "#16aa98", b: "#0d7a6d", label: "ATTEMPT 02", chip: "#b0fff4", delay: 1.2 },
  { x: 52,  y: 330, a: "#ff7169", b: "#c94a43", label: "ATTEMPT 03", chip: "#ffcbc8", delay: 2.4 },
  { x: 448, y: 326, a: "#ebcd00", b: "#b39b00", label: "ATTEMPT 04", chip: "#fff8b0", delay: 3.6 },
];
const SMALL = 58; // width of a small drum
const BIG = 200;

export function HeroScene() {
  const bigW = BIG, bigH = BIG * (3552 / 3711);
  const bx = CX - bigW / 2, by = CY - bigH / 2 - 10;
  return (
    <svg viewBox="0 0 560 520" className="w-full h-auto overflow-visible" role="img" aria-label="One shared drum, the running OS, with four small attempt drums around it">
      {/* clouds */}
      <g className="drift" style={{ ["--d" as string]: "-3s" }}>
        <path d="M40 92c-10 0-18-7-18-16 0-8 6-14 14-15 2-13 13-22 26-22 11 0 20 6 24 14 4-3 9-5 14-5 12 0 22 8 23 20 2-1 5-1 7-1 10 0 17 7 17 15 0 5-3 10-8 13H40z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
      <g className="drift">
        <path d="M400 58c-8 0-14-5-14-12 0-6 5-11 11-12 2-10 10-17 20-17 8 0 15 4 19 11 3-2 7-4 11-4 9 0 17 6 18 16 2-1 4-1 6-1 7 0 13 5 13 12 0 4-2 8-6 10H400z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
      {/* sun: 12 wedge rays, slow spin, kept inside the frame */}
      <g className="spin-slow">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={`M${CX} ${CY - 150} L ${CX - 12} ${CY - 212} L ${CX + 12} ${CY - 212} Z`} fill="#ffde00" stroke={INK} strokeWidth="2" strokeLinejoin="round" transform={`rotate(${i * 30 + 15} ${CX} ${CY})`} />
        ))}
      </g>
      <circle cx={CX} cy={CY} r="140" fill="#fff8b0" stroke={INK} strokeWidth="2" />
      {/* attempts: the small drums pop in and out */}
      {attempts.map((t) => (
        <g key={t.label} className="pop" style={{ ["--d" as string]: `${t.delay}s` }}>
          <g transform={`translate(${t.x - 10} ${t.y - 34})`}>
            <rect width="78" height="22" fill={t.chip} stroke={INK} strokeWidth="1.5" />
            <text x="39" y="15" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={INK}>{t.label}</text>
          </g>
          <Drum x={t.x} y={t.y} w={SMALL} a={t.a} b={t.b} />
        </g>
      ))}
      {/* the shared drum, bobbing */}
      <g className="bob">
        <Drum x={bx} y={by} w={bigW} a="#413636" b="#0A0A0A" />
      </g>
      {/* ground card */}
      <g transform="translate(120 440)">
        <rect x="6" y="6" width="320" height="56" fill={INK} />
        <rect width="320" height="56" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="14" y="12" width="118" height="20" fill="#ceebff" stroke={INK} strokeWidth="1.5" />
        <text x="73" y="26" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={INK}>SHARED OS + APPS</text>
        <text x="14" y="48" fontFamily="var(--font-mono)" fontSize="10" fill="#575757">ONE RUNNING MACOS · LOADED ONCE</text>
      </g>
    </svg>
  );
}
