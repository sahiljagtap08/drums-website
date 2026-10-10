"use client";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./Mark";
import { Button } from "./ui";
import { CAL_URL } from "@/lib/site";

const links: [string, string][] = [
  ["How it works", "/#how"],
  ["What we measure", "/#measure"],
];
const resources = [
  { t: "Blog", d: "Engineering notes and product updates", h: "/blog", chip: "#ceebff" },
  { t: "Research", d: "What we're measuring and why", h: "/research", chip: "#fff8b0" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={`w-3 h-3 transition-transform duration-150 ease-in-out ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 4.5 6 8.5l4-4" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <header className={`sticky top-0 z-30 bg-cream transition-[box-shadow] duration-150 ease-in-out ${scrolled ? "shadow-[0_2px_0_0_var(--color-ink)]" : "shadow-none"}`}>
      <div className="mx-auto max-w-[1240px] px-5 h-[72px] flex items-center gap-8">
        <a href="/" className="flex items-center gap-2.5 wiggle">
          <Mark className="w-8 h-8" />
          <span className="font-semibold text-[22px] tracking-tight">Drums</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 ml-4">
          {links.map(([t, h]) => (
            <a key={t} href={h} className="md-link !text-[14px]"><span>{t}</span></a>
          ))}
          <div ref={wrap} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)} className="md-link !text-[14px] cursor-pointer">
              <span className={open ? "!border-sky" : ""}>Resources</span> <Chevron open={open} />
            </button>
            <div className={`absolute left-0 top-full pt-3 transition-[opacity,transform] duration-150 ease-in-out ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
              <div className="w-[300px] bg-paper border-2 border-ink p-2 shadow-[-4px_4px_0_0_var(--color-ink)]">
                {resources.map((r) => (
                  <a key={r.t} href={r.h} className="flex items-start gap-3 p-3 rounded-[2px] hover:bg-cream transition-colors duration-150">
                    <span className="mt-0.5 w-8 h-8 shrink-0 border-2 border-ink flex items-center justify-center" style={{ background: r.chip }}>
                      <Mark className="w-4 h-4" />
                    </span>
                    <span>
                      <span className="block font-semibold text-[15px] leading-tight">{r.t}</span>
                      <span className="block text-[13px] text-ink-2 mt-0.5">{r.d}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="/pricing" className="md-link !text-[14px]"><span>Pricing</span></a>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Button href={CAL_URL} external>Talk to us</Button>
        </div>
      </div>
    </header>
  );
}
