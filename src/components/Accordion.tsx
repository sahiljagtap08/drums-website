"use client";
import { useState } from "react";

export type Item = { title: string; body: string };

export function Accordion({ items, onChange }: { items: Item[]; onChange?: (i: number) => void }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      {items.map((it, i) => {
        const isOpen = i === open;
        return (
          <div key={it.title} className={`md-card ${isOpen ? "is-raised-lg" : ""}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => { setOpen(i); onChange?.(i); }}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
            >
              <span className="h-mono text-[17px]">{it.title}</span>
              <span className="relative block h-[14px] w-[14px] shrink-0" aria-hidden>
                <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-ink" />
                <span className={`absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-ink transition-transform duration-200 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`} />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className={`px-6 pb-6 text-[15.5px] leading-relaxed text-ink transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-100 delay-75" : "opacity-0 delay-0"}`}>{it.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
