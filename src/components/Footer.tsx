import { Mark } from "./Mark";
import { CAL_URL, COMPANY } from "@/lib/site";

const cols = [
  { h: "Product", l: [["How it works", "/#how"], ["What we measure", "/#measure"], ["Pricing", "/pricing"]] },
  { h: "Resources", l: [["Blog", "/blog"], ["Research", "/research"]] },
  { h: "Company", l: [["Talk to us", CAL_URL], ["Terms of use", "/terms"], ["Privacy policy", "/privacy"]] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-14 grid sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <Mark className="w-8 h-8" tone="#f4efea" accent="#bdb3ab" />
            <span className="font-semibold text-[22px] tracking-tight">Drums</span>
          </div>
          <p className="mt-4 text-[14px] text-cream/70 max-w-[34ch]">Virtual computers for training computer-use agents. More training on less hardware.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div className="font-semibold text-[15px] mb-3">{c.h}</div>
            <ul className="space-y-2 text-[14px] text-cream/80">
              {c.l.map(([t, h]) => (
                <li key={t}><a href={h} className="hover:text-sky" {...(h.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>{t}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1240px] px-5 pb-8 flex flex-wrap gap-4 label !text-cream/50">
        <span>© 2026 {COMPANY}</span>
        <span>Starting with macOS</span>
      </div>
    </footer>
  );
}
