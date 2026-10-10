// One big drum (the shared image) with little drums (attempts) popping up around it.
// Drawn in the motherduck outline style: white fills, 2px #383838 strokes, pastel accents.
const INK = "#383838";

function DrumTier({ x, y, r, h, fill, top }: { x: number; y: number; r: number; h: number; fill: string; top: string }) {
  const ry = r * 0.42;
  return (
    <g>
      <path d={`M${x - r},${y} v${h} a${r},${ry} 0 0 0 ${2 * r},0 v${-h}`} fill={fill} stroke={INK} strokeWidth="2" />
      <ellipse cx={x} cy={y} rx={r} ry={ry} fill={top} stroke={INK} strokeWidth="2" />
      <path d={`M${x},${y} h${r * 0.52} v${h * 0.55} h${-r * 0.52} z`} fill={INK} />
    </g>
  );
}

function LittleDrum({ x, y, fill, top, delay, label, labelFill }: { x: number; y: number; fill: string; top: string; delay: number; label: string; labelFill: string }) {
  return (
    <g className="pop" style={{ ["--d" as string]: `${delay}s` }}>
      <DrumTier x={x} y={y} r={22} h={22} fill={fill} top={top} />
      <g transform={`translate(${x - 34} ${y - 42})`}>
        <rect width="68" height="20" fill={labelFill} stroke={INK} strokeWidth="1.5" />
        <text x="34" y="14" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill={INK}>{label}</text>
      </g>
      {/* eyes */}
      <g className="blink">
        <circle cx={x - 7} cy={y + 9} r="2.2" fill={INK} /><circle cx={x + 7} cy={y + 9} r="2.2" fill={INK} />
      </g>
    </g>
  );
}

export function HeroScene() {
  return (
    <svg viewBox="0 0 560 440" className="w-full h-auto" role="img" aria-label="One shared drum with many small drums, each an independent training attempt, popping up around it">
      {/* clouds */}
      <g className="drift" style={{ ["--d" as string]: "-3s" }}>
        <path d="M40 120c-10 0-18-7-18-16 0-8 6-14 14-15 2-13 13-22 26-22 11 0 20 6 24 14 4-3 9-5 14-5 12 0 22 8 23 20 2-1 5-1 7-1 10 0 17 7 17 15 0 5-3 10-8 13H40z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
      <g className="drift">
        <path d="M430 70c-8 0-14-5-14-12 0-6 5-11 11-12 2-10 10-17 20-17 8 0 15 4 19 11 3-2 7-4 11-4 9 0 17 6 18 16 2-1 4-1 6-1 7 0 13 5 13 12 0 4-2 8-6 10H430z" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
      {/* sun rays, slow spin */}
      <g className="spin-slow" opacity=".55">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1="280" y1="300" x2={280 + 230 * Math.cos((i / 16) * Math.PI * 2)} y2={300 + 230 * Math.sin((i / 16) * Math.PI * 2)} stroke="#ffde00" strokeWidth="10" strokeLinecap="round" opacity=".35" />
        ))}
      </g>
      <circle cx="280" cy="300" r="150" fill="#fff8b0" stroke={INK} strokeWidth="2" />
      {/* ground card */}
      <g transform="translate(120 352)">
        <rect x="6" y="6" width="320" height="56" fill={INK} />
        <rect width="320" height="56" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="14" y="12" width="118" height="20" fill="#ceebff" stroke={INK} strokeWidth="1.5" />
        <text x="73" y="26" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill={INK}>SHARED OS + APPS</text>
        <text x="14" y="48" fontFamily="var(--font-mono)" fontSize="10" fill="#575757">ONE RUNNING MACOS · LOADED ONCE</text>
      </g>
      {/* big drum = shared image, bobbing */}
      <g className="bob">
        <DrumTier x={280} y={292} r={70} h={38} fill="#ffdcbd" top="#ffe9d6" />
        <DrumTier x={280} y={246} r={70} h={38} fill="#ffdcbd" top="#ffe9d6" />
        <DrumTier x={280} y={200} r={70} h={38} fill="#ff9538" top="#ffb570" />
        <g className="blink"><circle cx="262" cy="216" r="3.5" fill={INK} /><circle cx="298" cy="216" r="3.5" fill={INK} /></g>
        <path d="M268 232q12 8 24 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* lines from big drum to little drums */}
      <g fill="none" stroke={INK} strokeWidth="1.5" className="flow" opacity=".7">
        <path d="M225 250 C 170 250, 160 230, 120 226" />
        <path d="M335 250 C 390 250, 400 220, 440 216" />
        <path d="M232 300 C 180 310, 170 330, 128 322" />
        <path d="M328 300 C 380 310, 390 330, 432 322" />
      </g>
      {/* little drums = attempts */}
      <LittleDrum x={100} y={214} fill="#ceebff" top="#e6f4ff" delay={0} label="ATTEMPT 01" labelFill="#ceebff" />
      <LittleDrum x={460} y={204} fill="#b0fff4" top="#dcfff9" delay={1.2} label="ATTEMPT 02" labelFill="#b0fff4" />
      <LittleDrum x={108} y={312} fill="#ffcbc8" top="#ffe3e1" delay={2.4} label="ATTEMPT 03" labelFill="#ffcbc8" />
      <LittleDrum x={452} y={312} fill="#fff8b0" top="#fffbd6" delay={3.6} label="ATTEMPT 04" labelFill="#fff8b0" />
      {/* doodles */}
      <path d="M500 400 l10 -18 l10 18 z" fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="40" cy="400" r="8" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M30 40 h14 v10 h-14 z" fill="#6fc2ff" stroke={INK} strokeWidth="2" transform="rotate(-12 37 45)" />
    </svg>
  );
}
