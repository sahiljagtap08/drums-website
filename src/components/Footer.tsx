import { CAL_URL, EMAILS } from "@/lib/site";
import { Mark } from "./Mark";

const cols = [
  { h: "Company", l: [["Approach", "#approach"], ["Research", "#research"], ["Teams", "#teams"], ["Founders", "#founders"]] },
  { h: "Contact", l: [["Book a call", CAL_URL], [EMAILS.sahil, `mailto:${EMAILS.sahil}`], [EMAILS.harun, `mailto:${EMAILS.harun}`]] },
  { h: "Platform", l: [["macOS — now", "#research"], ["Linux — planned", "#research"], ["Windows — planned", "#research"]] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white relative overflow-hidden">
      <div className="h-2 bg-smoke" />
      <div className="mx-auto max-w-[1280px] px-5 pt-5">
        <div className="bg-white text-ink grid md:grid-cols-[1fr_2fr] relative">
          <div className="p-8">
            <div className="flex items-center gap-2 font-semibold tracking-tight text-[16px]"><Mark className="w-5 h-5 text-ink" /> Drums</div>
            <p className="mt-3 text-[13px] text-ink-2 max-w-[22ch]">More computer-use training on less hardware.</p>
            <svg viewBox="0 0 160 60" className="absolute left-0 bottom-0 w-40 text-smoke" aria-hidden="true">
              {[[0,50],[10,50],[20,50],[30,50],[0,40],[10,40],[30,40],[0,30],[20,30],[10,20],[40,50],[50,50],[60,40],[80,50],[100,50],[120,50],[50,30],[0,10]].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width="8" height="8" fill="currentColor" opacity={1 - i * 0.04} />
              ))}
            </svg>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 p-8">
            {cols.map((c) => (
              <div key={c.h}>
                <div className="label !text-ink mb-4">{c.h}</div>
                <ul className="space-y-2 text-[13px]">
                  {c.l.map(([t, href]) => (
                    <li key={t}><a href={href} className="hover:text-ink-3">{t}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative h-[160px] md:h-[260px]">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-0.28em] text-[200px] md:text-[340px] leading-none font-semibold tracking-[-0.05em] text-smoke select-none whitespace-nowrap" aria-hidden="true">Drums</div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1280px] px-5 pb-4 flex flex-wrap gap-6 label !text-white/70">
          <span>© 2026 Drums</span>
          <span>Early research and development</span>
          <span className="ml-auto">More computer-use training on less hardware.</span>
        </div>
      </div>
    </footer>
  );
}
