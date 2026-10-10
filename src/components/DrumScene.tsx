// Isometric drums. One drum is one computer. The centre stack is the shared image;
// the small drums are independent training attempts spawning from it.
const RX = 0.45; // ellipse ratio for the isometric top

function Drum({ x, y, r, h, tiers = 1, tone = "light" }: { x: number; y: number; r: number; h: number; tiers?: number; tone?: "light" | "dark" | "ghost" }) {
  const ry = r * RX;
  const side = tone === "dark" ? "#413636" : tone === "ghost" ? "#141414" : "#1c1c1c";
  const top = tone === "dark" ? "#5a4c4c" : tone === "ghost" ? "#1a1a1a" : "#2a2a2a";
  const stroke = tone === "ghost" ? "#333" : "#9a9a9a";
  const gap = h * 0.18;
  const tierH = (h - gap * (tiers - 1)) / tiers;
  return (
    <g>
      {Array.from({ length: tiers }).map((_, t) => {
        const yb = y - t * (tierH + gap);
        const yt = yb - tierH;
        return (
          <g key={t}>
            <path d={`M${x - r},${yt} v${tierH} a${r},${ry} 0 0 0 ${2 * r},0 v${-tierH}`} fill={side} stroke={stroke} strokeWidth="1" />
            <ellipse cx={x} cy={yt} rx={r} ry={ry} fill={top} stroke={stroke} strokeWidth="1" />
            {/* the notch from the logo */}
            <path d={`M${x},${yt} h${r * 0.5} v${tierH * 0.5} h${-r * 0.5} z`} fill="#0a0a0a" opacity="0.85" />
          </g>
        );
      })}
    </g>
  );
}

export function DrumScene() {
  const attempts = [
    { x: 210, y: 300, d: 0 }, { x: 330, y: 360, d: 0.5 }, { x: 150, y: 380, d: 1.0 }, { x: 290, y: 440, d: 1.5 },
    { x: 890, y: 300, d: 0.3 }, { x: 770, y: 360, d: 0.8 }, { x: 950, y: 380, d: 1.3 }, { x: 810, y: 440, d: 1.8 },
    { x: 470, y: 450, d: 2.2 }, { x: 630, y: 450, d: 2.6 },
  ];
  return (
    <section className="relative bg-ink text-white overflow-hidden">
      <div className="absolute inset-x-0 top-3 flex justify-between px-5 label !text-white/50 z-10">
        <span>Fig. 00 — One drum is one computer</span>
        <span className="hidden sm:inline">Shared image · independent attempts</span>
      </div>
      <svg viewBox="0 0 1100 500" className="w-full h-auto block min-w-[760px] ml-[calc(50%-380px)] md:min-w-0 md:ml-0" role="img" aria-label="A large stacked drum in the centre with smaller drums spawning around it, each an independent training attempt">
        <defs>
          <pattern id="dg" width="50" height="25" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
            <path d="M50 0H0V25" fill="none" stroke="#1f1f1f" strokeWidth="1" />
          </pattern>
          <linearGradient id="scanline" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".06" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1100" height="500" fill="url(#dg)" />
        <rect width="1100" height="40" fill="url(#scanline)" className="scan" />
        <g className="flow" fill="none" stroke="#444" strokeWidth="1">
          {attempts.map((a) => (
            <path key={`${a.x}${a.y}`} d={`M550 330 C ${550 + (a.x - 550) * 0.4} 330, ${a.x} ${a.y - 60}, ${a.x} ${a.y - 10}`} />
          ))}
        </g>
        <g className="breathe">
          <Drum x={550} y={360} r={95} h={170} tiers={3} tone="dark" />
        </g>
        {attempts.map((a) => (
          <g key={`${a.x}-${a.y}`} className="spawn" style={{ ["--d" as string]: `${a.d}s` }}>
            <Drum x={a.x} y={a.y} r={30} h={34} tone="light" />
          </g>
        ))}
        <g fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.6" fill="#777">
          <text x="550" y="470" textAnchor="middle">SHARED MACOS IMAGE</text>
          <text x="210" y="482" textAnchor="middle">ATTEMPTS</text>
          <text x="890" y="482" textAnchor="middle">ATTEMPTS</text>
        </g>
      </svg>
    </section>
  );
}
