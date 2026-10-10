import { Mark } from "./Mark";
import { CAL_URL, EMAILS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-14 grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <Mark className="w-8 h-8" tone="#f4efea" />
            <span className="font-semibold text-[22px] tracking-tight">Drums</span>
          </div>
          <p className="mt-4 text-[14px] text-cream/70 max-w-[34ch]">More computer-use training on less hardware. Early research and development.</p>
        </div>
        <div>
          <div className="font-semibold text-[15px] mb-3">Site</div>
          <ul className="space-y-2 text-[14px] text-cream/80">
            <li><a href="#how" className="hover:text-sky">How it works</a></li>
            <li><a href="#measure" className="hover:text-sky">What we measure</a></li>
            <li><a href="#contact" className="hover:text-sky">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-[15px] mb-3">Talk to us</div>
          <ul className="space-y-2 text-[14px] text-cream/80">
            <li><a href={CAL_URL} target="_blank" rel="noopener" className="hover:text-sky">Book a call</a></li>
            <li><a href={`mailto:${EMAILS.sahil}`} className="hover:text-sky">{EMAILS.sahil}</a></li>
            <li><a href={`mailto:${EMAILS.harun}`} className="hover:text-sky">{EMAILS.harun}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] px-5 pb-8 flex flex-wrap gap-4 label !text-cream/50">
        <span>© 2026 Drums</span>
        <span>Starting with macOS</span>
      </div>
    </footer>
  );
}
