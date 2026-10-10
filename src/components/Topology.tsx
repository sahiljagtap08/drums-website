function Node({ x, y, w, title, sub, dark = false }: { x: number; y: number; w: number; title: string; sub?: string; dark?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={34} rx={5} fill={dark ? "#ee2a1e" : "#fff"} stroke={dark ? "#ee2a1e" : "#0b0b0b"} strokeWidth={1.2} />
      <text x={12} y={21} fontSize={11.5} fontWeight={600} fill={dark ? "#fff" : "#0b0b0b"} fontFamily="var(--font-sans)">{title}</text>
      {sub && (
        <text x={12 + title.length * 6.6 + 6} y={21} fontSize={6.5} letterSpacing={0.8} fill={dark ? "#fff" : "#ee2a1e"} fontFamily="var(--font-mono)">{sub.toUpperCase()}</text>
      )}
    </g>
  );
}

export function Topology() {
  const attempts = [
    { y: 40, label: "Attempt 01", sub: "isolated" },
    { y: 110, label: "Attempt 02", sub: "isolated" },
    { y: 180, label: "Attempt 03", sub: "isolated" },
  ];
  return (
    <section id="approach" className="border-b hairline">
      <div className="mx-auto max-w-[1280px] px-5">
        <div className="flex justify-between py-3 label border-b hairline">
          <span>Fig. 01 — Attempt topology</span>
          <span className="hidden sm:inline">Drums · research stage</span>
        </div>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 900 260" className="w-full min-w-[720px] h-auto block" role="img" aria-label="One shared macOS image fans out to isolated training attempts, which converge into isolated writes feeding your trainer">
            <defs>
              <pattern id="g" width="90" height="90" patternUnits="userSpaceOnUse">
                <path d="M90 0H0V90" fill="none" stroke="#ececec" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="900" height="260" fill="url(#g)" />
            <g fill="none" stroke="#ee2a1e" strokeWidth="1.3">
              {attempts.map((a) => (
                <path key={a.y} d={`M190 127 C 250 127, 250 ${a.y + 17}, 300 ${a.y + 17}`} className="flow" />
              ))}
              {attempts.map((a) => (
                <path key={"c" + a.y} d={`M460 ${a.y + 17} C 520 ${a.y + 17}, 520 127, 580 127`} className="flow" />
              ))}
              <path d="M770 127 H 790" className="flow" />
            </g>
            <circle cx="190" cy="127" r="3.5" fill="#ee2a1e" />
            <circle cx="580" cy="127" r="3.5" fill="#ee2a1e" />
            <Node x={40} y={110} w={150} title="Shared image" sub="macOS" />
            {attempts.map((a) => (
              <Node key={a.label} x={300} y={a.y} w={160} title={a.label} sub={a.sub} />
            ))}
            <Node x={580} y={110} w={190} title="Isolated writes" sub="per attempt" dark />
            <Node x={790} y={110} w={100} title="Your trainer" />
            <g fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2" fill="#8a8a8a">
              <text x="215" y="248">FAN-OUT</text>
              <text x="500" y="248">CONVERGE</text>
              <text x="800" y="248">RL / EVALS</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
