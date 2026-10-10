export function RedBand() {
  return (
    <section className="relative halftone grain overflow-hidden h-[260px] md:h-[380px]">
      <div className="absolute inset-x-0 top-3 flex justify-between px-5 label !text-white/70">
        <span>Fig. 00 — Shared state</span>
        <span>macOS · first target</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 160 120" className="w-[200px] md:w-[280px]" aria-hidden="true">
          <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M80 10 L140 40 L80 70 L20 40 Z" />
            <path d="M20 40 V80 L80 110 L140 80 V40" />
            <path d="M80 70 V110" />
            <path d="M50 25 L110 55 M110 25 L50 55" strokeOpacity=".5" />
            <ellipse cx="80" cy="60" rx="58" ry="22" strokeOpacity=".7" />
            <ellipse cx="80" cy="60" rx="58" ry="22" transform="rotate(60 80 60)" strokeOpacity=".4" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-between px-5 label !text-white/70">
        <span>One image</span>
        <span>Many attempts</span>
      </div>
    </section>
  );
}
